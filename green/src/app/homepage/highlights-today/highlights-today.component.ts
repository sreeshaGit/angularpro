/**
 * @fileoverview contains all logic for highlights today.
 */

import { Component, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/takeWhile';

import { HighlightsTodayService } from './highlights-today.service';
import { KambiService } from '../../Kambi/Kambi.service';
import { HomepageSubMethodsService } from '../homepage-sub-methods.service';
import { environment } from '../../../environments/environment';
import { SharedWordsService } from '../../shared/shared-words.service';
@Component({
  selector: 'app-highlights-today',
  templateUrl: './highlights-today.component.html',
  styleUrls: ['./highlights-today.component.css'],
  providers: [HighlightsTodayService, SharedWordsService]
})
export class HighlightsTodayComponent implements OnInit, OnDestroy, AfterViewInit {
    private alive = true;
    isDataResponse = false;
    highlights: any;
    @Input() staticWord;

    /**
     *
     * @param {HighlightsTodayService} - highlightsTodayService - instance of highlightsTodayService to access its methods.
     * @param {KambiService} - kambiService - instance of kambiService.
     * @param {HomepageSubMethodsService} - homepageSubMethodsService - instance of homepageSubMethodsService to access its methods.
     * @param {SharedWordsService} - sharedWordsService - instance of SharedWordsService to access shared words.
     */
    constructor(private highlightsTodayService: HighlightsTodayService,
        public kambiService: KambiService,
        public homepageSubMethodsService: HomepageSubMethodsService,
        public sharedWordsService: SharedWordsService) { }
    /**
     * This function calls initial and gets data.
     */
    ngOnInit() {
        if (this.alive) {
            this.kambiService.currentLanguage.asObservable().subscribe(() => {
                this.getHighlightsTodayData();
            });
        }
    }
    /**
     * This function calls after a component's view.
     */
    ngAfterViewInit() {
        IntervalObservable.create(environment.refreshPre)
            .takeWhile(() => this.alive) // only fires when component is alive
            .subscribe(() => {
                this.getHighlightsTodayData();
            });
    }
    /**
     * This fuction is to get data of highlights of the day.
     */
    getHighlightsTodayData() {
        this.highlightsTodayService.getHighlightsToday().subscribe(resData => {
            if (resData.result !== null && resData.result instanceof Array) {
                this.isDataResponse = true;
                const highlightsOfDay = [];
                for (const result of resData.result) {
                    if (result.name === 'highlights') {
                        for (const event of result.events) {
                            if (event['event'].sport === this.sharedWordsService.football ||
                                event['event'].sport === this.sharedWordsService.tennis) {
                                if (highlightsOfDay.length < 4) {
                                    highlightsOfDay.push(event['event']);
                                }
                            }
                        }
                        break;
                    }
                }
                this.highlights = highlightsOfDay;
                let indexOfHighlightsOfDay = 0;
                for (const data of highlightsOfDay) {
                    let indexOfPathData = 0;
                    for (const pathData of data['path']) {
                        if (indexOfPathData === 0) {
                            highlightsOfDay[indexOfHighlightsOfDay]['tsport'] = pathData.name;
                        } else if ((highlightsOfDay[indexOfHighlightsOfDay]['path'].length === 3 && indexOfPathData === 2) ||
                            (highlightsOfDay[indexOfHighlightsOfDay]['path'].length === 2 && indexOfPathData === 1)) {
                            highlightsOfDay[indexOfHighlightsOfDay]['tgroup'] = pathData.name;
                        }
                        indexOfPathData++;
                    }
                    this.getHighlights(indexOfHighlightsOfDay, data.boUri);
                    indexOfHighlightsOfDay++;
                }
            }
        });
    }
    /**
     * This function get data for highlights today
     * @param ind this parameter is outcome index
     * @param url this url used to get the data of markets
     */
    getHighlights(ind, url) {
        this.highlightsTodayService.getHighlights(url).subscribe(resData => {
            let i = 0;
            for (const betOffer of resData.betoffers) {
                if (betOffer.criterion.label === this.sharedWordsService.fullTime ||
                    betOffer.criterion.label === this.sharedWordsService.matchOdds) {
                    this.highlights[ind].outcomes = betOffer['outcomes'];
                    let j = 0;
                    for (const outcomes of this.highlights[ind].outcomes) {
                        this.highlights[ind].outcomes[j].oddsDecimal = (betOffer['outcomes'][j].odds / 1000).toFixed(2);
                        this.highlights[ind].outcomes[j].oddsFractional = betOffer['outcomes'][j].oddsFractional;
                        this.highlights[ind].outcomes[j].oddsAmerican = betOffer['outcomes'][j].oddsAmerican;
                        j++;
                    }
                    i++;
                }
            }
        });
    }
    /**
     * This fuction used to navigate to event page.
     * @param eventId - this hold the eventId of that match.
     * @param typeOfEvent -this hold data from where it is clicked.
     */
    goToEventPage(eventId, typeOfEvent) {
        this.homepageSubMethodsService.goToEventPage(eventId, typeOfEvent);
    }
    /**
     * This fuction used to add to betslip.
     * @param outcome - this hold the eventId of that match.
     * @param typeOfClick - this hold data from where it is clicked.
     */
    addToBetslip(outcome, typeOfClick) {
        this.homepageSubMethodsService.addToBetslipGA(outcome, typeOfClick);
        this.kambiService.addToBetslip([outcome], 'single');
    }
    /**
     * This function called before destroying  the component.
     */
    ngOnDestroy() {
        this.alive = false;
    }
}
