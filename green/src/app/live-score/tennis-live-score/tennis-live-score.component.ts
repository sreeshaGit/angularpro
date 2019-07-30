/**
 * @fileoverview contains all logic for homepage live tennis score.
 */
import { Component, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/takeWhile';

import { TennisLiveScoreService } from './tennis-live-score.service';
import { StaticWordsService } from '../../StaticWords/static-words.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-tennis-live-score',
  templateUrl: './tennis-live-score.component.html',
  styleUrls: ['./tennis-live-score.component.css']
})
export class TennisLiveScoreComponent implements OnInit, OnDestroy, AfterViewInit {
    private alive = true;
    awayScore: any;
    awaySetWinner = 0;
    bannerHomeScore: any;
    bannerAwayScore: any;
    bannerStatsData: any;
    bannerScoreData: any;
    currentSetScore: any;
    currentSetNumber: any;
    gameScore: any;
    homeScore: any;
    homeSetWinner = 0;
    interval: any;
    playerPointScore: any;
    rightNowScore: any;
    rightNowHomeServe: any;
    todaysAssistHomeScore: any;
    todaysAssistAwayScore: any;
    @Input() away;
    @Input() eventId;
    @Input() home;
    @Input() isBannerHome;
    @Input() isBannerAway;
    @Input() pointScore;
    @Input() playerPosition;
    @Input() position;
    @Input() scorePosition;
    /**
     *
     * @param {HomeTennisLiveScoreService} - homeTennisLiveScoreService - instance of homeTennisLiveScoreService to access its methods.
     * @param {StaticWordsService} - staticWordsData  - instance of  staticWordsData.
     */
    constructor(private homeTennisLiveScoreService: TennisLiveScoreService, public staticWordsData: StaticWordsService) { }
    /**
     * This function calls initial and gets data.
     */
    ngOnInit() {
        if (this.alive) {
            this.homeTennisLiveScoreService.getTennisMgData()
                .subscribe(resData => {
                    for (const liveEvents of resData.liveEvents) {
                        if (parseInt(liveEvents.liveData.eventId, 10) === parseInt(this.eventId, 10)) {
                            if (this.scorePosition === 'rightnow') {
                                this.rightNowScore = this.getTennisScoreRightNow(liveEvents.liveData.statistics.sets.home,
                                    liveEvents.liveData.statistics.sets.away);
                            }
                            if (this.isBannerHome || this.isBannerAway) {
                                this.bannerScoreData = liveEvents.liveData;
                                this.bannerStatsData = liveEvents.liveData.statistics.sets;
                                this.getBannerSetScore(liveEvents.liveData.statistics.sets);
                                this.bannerHomeScore = this.formScore(liveEvents.liveData.statistics.sets.home);
                                this.bannerAwayScore = this.formScore(liveEvents.liveData.statistics.sets.away);
                            }
                            this.rightNowHomeServe = liveEvents.liveData.statistics.sets.homeServe;
                            this.playerPointScore = liveEvents.liveData.score.home + ' - '
                                + liveEvents.liveData.score.away;
                            this.currentSetScore = this.formScore(liveEvents.liveData.statistics.sets.home)
                                + ' ' + '-' + ' ' + this.formScore(liveEvents.liveData.statistics.sets.away);
                            this.currentSetNumber = this.getTennisSet(liveEvents.liveData.statistics.sets.home);
                            this.gameScore = liveEvents.liveData;
                            this.homeScore = this.getScoreForTodaysAssist(liveEvents.liveData.statistics.sets.home);
                            this.awayScore = this.getScoreForTodaysAssist(liveEvents.liveData.statistics.sets.away);
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
     * This function used to form set number form given array.
     * @param {array} - set score array.
     */
    getScoreForTodaysAssist(score) {
        const displayScore = [];
        for (const setScore of score) {
            displayScore.push(setScore >= 0 ? setScore : 0);
        }
        return displayScore;
    }
    /**
     * This function called before destroying  the component.
     */
    ngOnDestroy() {
        this.alive = false;
    }
}
