/**
 * @fileoverview contains all the logic to display upcoming match.
 */
import { Component, OnInit, Input, OnDestroy, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer';

import { environment } from '../../../environments/environment';
import { HomepageComponent } from '../homepage.component';
import { KambiService } from '../../Kambi/Kambi.service';
import { HomepageService } from '../homepage.service';
import { HomepageSubMethodsService } from '../homepage-sub-methods.service';
import { SharedMethodsService } from '../../shared/shared-methods.service';
@Component({
    selector: 'app-match-of-the-day',
    templateUrl: './match-of-the-day.component.html',
    styleUrls: ['./match-of-the-day.component.css']
})
export class MatchOfTheDayComponent implements OnInit, AfterViewInit {
    private alive = true;
    hideMatchOfDay = false;
    isMatchOfDayLoader = true;
    isMODImage: boolean;
    modUserId = 7;
    matchOfTheDay: any;
    modEventId = '';
    radixParameter = 10;
    showMatchOfTheDay: any;
    topBannerEventId: any;
    homeUpcomingEventId: any;
    @Input() staticWords;
    @Output() setMODEventId: EventEmitter<any> = new EventEmitter();

    /**
     * @param kambiService -instance of kambi service.
     * @param HomePageSubMethodsService -instance of HomepageSubMethodsService to access its methods.
     * @param homePageData -instance of homePageData to access its methods
     * @param homePageComponent -instance of homePageComponent to access its methods
     */
    constructor(
        public kambiService: KambiService,
        public homePageData: HomepageService,
        public homePageSubMethodsService: HomepageSubMethodsService,
        public homePageComponent: HomepageComponent,
        private sharedMethods: SharedMethodsService
    ) { }

    ngOnInit() {
        this.isMODImage = true;
        this.kambiService.currentLanguage.asObservable().subscribe(() => {
            this.getMatchOfTheDayBets();
        });
    }
    /**
    * this is the setter to set bannerEventId
    */
    @Input()
    set bannerEventId(id) {
        this.topBannerEventId = id;
        this.compareMatchOfTheDay();
    }
    /**
     * this is the setter to set upcomingEventId
     */
    @Input()
    set upcomingEventId(id: string) {
        this.homeUpcomingEventId = id;
        this.compareMatchOfTheDay();
    }
    /**
     * This function calls after a component's view.
     */
    ngAfterViewInit() {
        IntervalObservable.create(environment.refreshPre)
            .takeWhile(() => this.alive) // only fires when component is alive
            .subscribe(() => {
                this.getMatchOfTheDayBets();
            });
    }
    /**
     * This fuction is to get data to match of the day.
     */
    getMatchOfTheDayBets() {
        this.homePageData.getBannerData(this.modUserId).subscribe(resData => {
            this.isMatchOfDayLoader = false;
            const matchOfTheDay = [];
            if ((resData === null) ||
                (resData.Default === null) ||
                (resData.Default.FootBall === null && resData.Default.Tennis === null) ||
                (!this.sharedMethods.validateArray(resData.FootBall.Easibet) &&
                    !this.sharedMethods.validateArray(resData.Tennis.Easibet) &&
                    !this.sharedMethods.validateArray(resData.Default.FootBall.Easibet) &&
                    !this.sharedMethods.validateArray(resData.Default.Tennis.Easibet))
            ) {
                this.hideMatchOfDay = true;
                return;
            }
            this.addMatchOfTheDayBets(resData.FootBall.Easibet, matchOfTheDay);
            this.addMatchOfTheDayBets(resData.Tennis.Easibet, matchOfTheDay);
            this.addMatchOfTheDayBets(resData.Default.FootBall.Easibet, matchOfTheDay);
            this.addMatchOfTheDayBets(resData.Default.Tennis.Easibet, matchOfTheDay);
            this.matchOfTheDay = matchOfTheDay;
            this.compareMatchOfTheDay();
            this.homePageComponent.removeDuplicatesFromUpcomingData();
        });
    }
    /**
    * This fuction is to merge parameter1 bets to parameter2 and returns result array.
    * @param {array} bets - this contains array of bets.
    * @param {array} matchoftheday - this parameter contains array of bets.
    */
    addMatchOfTheDayBets(bets, matchOfTheDay) {
        if (this.sharedMethods.validateArray(bets)) {
            matchOfTheDay.push.apply(matchOfTheDay, bets);
        }
        return matchOfTheDay;
    }
    /**
     * This fuction used to add to betslip.
     * @param outcome - this hold the eventId of that match.
     * @param typeOfClick - this hold data from where it is clicked.
     */
    addToBetslip(outcome, typeOfClick) {
        this.homePageSubMethodsService.addToBetslipGA(outcome, typeOfClick);
        this.kambiService.addToBetslip([outcome], 'single');
    }
    /**
     * This fuction used to navigate to event page.
     * @param eventId - this hold the eventId of that match.
     * @param typeOfEvent -this hold data from where it is clicked.
     */
    goToEventPage(eventId, typeOfEvent) {
        this.homePageSubMethodsService.goToEventPage(eventId, typeOfEvent);
    }
    /**
     * This function used to get different matches out of upcoming and banner.
     */
    compareMatchOfTheDay() {
        let isMODFound = false;
        if (this.matchOfTheDay && Array.isArray(this.matchOfTheDay) && this.matchOfTheDay.length > 0) {
            for (const value of this.matchOfTheDay) {
                const parsedEventId = parseInt(value['eventId'], this.radixParameter);
                if (parseInt(this.topBannerEventId, this.radixParameter) !== parsedEventId &&
                    parseInt(this.homePageComponent.rightNowEventId, this.radixParameter)
                    !== parsedEventId) {
                    this.showMatchOfTheDay = value;
                    this.modEventId = value['eventId'];
                    this.setMODEventId.emit(value['eventId']);
                    isMODFound = true;
                    break;
                }
            }
        }
        if (!isMODFound && Array.isArray(this.matchOfTheDay) && this.matchOfTheDay.length > 0) {
            this.showMatchOfTheDay = this.matchOfTheDay[0];
        }
    }
    /**
     *  If there is no jersey then it removes the other.
     */
    imageError() {
        this.isMODImage = false;
    }
}
