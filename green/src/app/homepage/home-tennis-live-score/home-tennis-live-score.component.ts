/**
 * @fileoverview contains all logic for homepage live tennis score.
 */
import { Component, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/takeWhile';

import { HomeTennisLiveScoreService } from './home-tennis-live-score.service';
import { StaticWordsService } from '../../StaticWords/static-words.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home-tennis-live-score',
  templateUrl: './home-tennis-live-score.component.html',
  styleUrls: ['./home-tennis-live-score.component.css'],
  providers: [HomeTennisLiveScoreService]
})
export class HomeTennisLiveScoreComponent implements OnInit, OnDestroy, AfterViewInit {
    private alive = true;
    awayScore: any;
    awaySetWinner = 0;
    bannerHomeScore: any;
    bannerAwayScore: any;
    bannerStatsData: any;
    bannerScoreData: any;
    currentSetScore: any;
    currentSetNumber: any;
    homeScore: any;
    homeSetWinner = 0;
    interval: any;
    playerPointScore: any;
    rightNowScore: any;
    rightNowPosition: any;
    @Input() eventId;
    @Input() scorePosition;
    @Input() pointScore;
    @Input() playerPosition;
    @Input() position;
    @Input() isBannerHome;
    @Input() isBannerAway;
    /**
     *
     * @param {HomeTennisLiveScoreService} - homeTennisLiveScoreService - instance of homeTennisLiveScoreService to access its methods.
     * @param {StaticWordsService} - staticWordsData  - instance of  staticWordsData.
     */
    constructor(private homeTennisLiveScoreService: HomeTennisLiveScoreService, public staticWordsData: StaticWordsService) { }
    /**
     * This function calls initial and gets data.
     */
    ngOnInit() {
        if (this.alive) {
            this.homeTennisLiveScoreService.getTennisMgData()
                .subscribe(resData => {
                    for (let i = 0; i < resData.liveEvents.length; i++) {
                        if (parseInt(resData.liveEvents[i].liveData.eventId, 10) === parseInt(this.eventId, 10)) {
                            if (this.scorePosition === 'rightnow') {
                                this.rightNowScore = this.getTennisScoreRightNow(resData.liveEvents[i].liveData.statistics.sets.home,
                                    resData.liveEvents[i].liveData.statistics.sets.away);
                            }
                            if (this.isBannerHome || this.isBannerAway) {
                                this.bannerScoreData = resData.liveEvents[i].liveData;
                                this.bannerStatsData = resData.liveEvents[i].liveData.statistics.sets;
                                this.getBannerSetScore(resData.liveEvents[i].liveData.statistics.sets);
                                this.bannerHomeScore = this.formScore(resData.liveEvents[i].liveData.statistics.sets.home);
                                this.bannerAwayScore = this.formScore(resData.liveEvents[i].liveData.statistics.sets.away);
                            }
                            this.rightNowPosition = resData.liveEvents[i].liveData.statistics.sets.homeServe;
                            this.playerPointScore = resData.liveEvents[i].liveData.score.home + ' - '
                                + resData.liveEvents[i].liveData.score.away;
                            this.homeScore = this.formScore(resData.liveEvents[i].liveData.statistics.sets.home);
                            this.awayScore = this.formScore(resData.liveEvents[i].liveData.statistics.sets.away);
                            this.currentSetScore = this.homeScore + ' ' + '-' + ' ' + this.awayScore;
                            this.currentSetNumber = this.getTennisSet(resData.liveEvents[i].liveData.statistics.sets.home);
                        }
                    }

                });
        }
    }
    /**
     * This function calls after a component's view.
     */
    ngAfterViewInit() {
        IntervalObservable.create(environment.refreshLive)
            .takeWhile(() => this.alive) // only fires when component is alive
            .subscribe(() => {
                this.ngOnInit();
            });
    }
    /**
     * This function used to form score form given array.
     * @param {array} - data we get an array to be formated .
     */
    formScore(data) {
        let updatedScore: any;
        for (let i = 0; i < data.length; i++) {
            if (i < data.length - 1) {
                if (data[i] !== -1 && data[i + 1] === -1) {
                    updatedScore = data[i];
                } else if (data[i] !== -1) {
                    updatedScore = data[i];
                }
            } else if (data[i] !== -1) {
                updatedScore = data[i];
            }
        }
        return updatedScore;
    }
    /**
     * This function used to form set number form given array.
     * @param {array} - data we get an array to be formated .
     */
    getTennisSet(data) {
        let set: any;
        for (let i = 0; i < data.length; i++) {
            if (i < data.length - 1) {
                if (data[i] !== -1 && data[i + 1] === -1) {
                    set = (i + 1);
                } else if (data[i] !== -1) {
                    set = (i + 1);
                }
            } else if (data[i] !== -1) {
                set = (i + 1);
            }
        }
        return set;
    }
   /**
    * This function used to form set number form given array.
    * @param {array} homeScore- data we get an array to be formated.
    * @param {array} awayScore- data we get an array to be formated.
    */
    getTennisScoreRightNow(homeScore, awayScore) {
        let homeScoreArray;
        let awayScoreArray;
        const displayScore = [];
        for (let j = 0; j < homeScore.length; j++) {
            homeScoreArray = (homeScore[j] >= 0 ? homeScore[j] : 0);
            awayScoreArray = (awayScore[j] >= 0 ? awayScore[j] : 0);
            displayScore.push(homeScoreArray + ' - ' + awayScoreArray);
        }
        return displayScore;
    }
   /**
    * This function used to form set winner form given array.
    * @param {array} data - data we get an array to be formated .
    */
    getBannerSetScore(data) {
        this.homeSetWinner = 0;
        this.awaySetWinner = 0;
        for (let j = 0; j < data.home.length - 1; j++) {
            if (data.home[j + 1] >= 0) {
                if (data.home[j] > data.away[j]) {
                    this.homeSetWinner += 1;
                } else if (data.home[j] < data.away[j]) {
                    this.awaySetWinner += 1;
                }
            }
        }
    }
    /**
     * This function called before destroying  the component.
     */
    ngOnDestroy() {
        this.alive = false;
    }

}
