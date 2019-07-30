/**
 * @fileoverview contains all the logic to display todays assist.
 */
import { Component, OnInit, Injectable, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer';
import { Observable } from 'rxjs/Observable';

import { KambiService } from '../../Kambi/Kambi.service';
import { HomepageSubMethodsService } from '../homepage-sub-methods.service';
import { HomepageService } from '../homepage.service';
import { BettorLogicApiService } from '../../shared/bettor-logic-api.service';
import { environment } from '../../../environments/environment';
import Flickity from 'flickity';

@Component({
  selector: 'app-todays-assist',
  templateUrl: './todays-assist.component.html',
  styleUrls: ['./todays-assist.component.css']
})
export class TodaysAssistComponent implements OnInit, OnDestroy, AfterViewInit {
    private alive = true;
    combinedLiveData: any[];
    homeUpcomingEventId: any;
    homeRightNowEventId: any;
    isInitial = true;
    private liveMaxLength = 3;
    matchOfTheDayEventId: any;
    private preFootballMaxLengthWhenLiveMatches = 5;
    private preTennisMaxLengthWhenLiveMatches = 2;
    private preFootballMaxLengthWhenNoLiveMatches = 7;
    private preTennisMaxLengthWhenNoLiveMatches = 3;
    topBannerEventId: any;
    todaysAssistCarousel: any;
    todaysAssistSeeAll = true;
    todaysAssistBets = [];
    todaysAssistData: any[];
    private todaysAssistDataAfterFilter = [];
    private todaysAssistDataId = [];
    @Input() staticWord;
    @Input() rightNowDataFB;
    @Input() rightNowDataTennis;
    @Input() todaysAssist;

    /**
     * @param kambiService -instance of kambi service.
     * @param HomePageSubMethodsService -instance of HomepageSubMethodsService to access its methods.
     * @param HomepageService -instance of HomepageService to access its methods.
     * @param BettorLogicApiService -instance of BettorLogicApiService to access its methods.
     */
    constructor(public kambiService: KambiService,
                public homePageSubMethodsService: HomepageSubMethodsService,
                private homePageData: HomepageService,
                private bettorLogicAPI: BettorLogicApiService) { }
    /**
     * This function calls initial and gets data.
     */
    ngOnInit() {
        if (this.alive) {
            this.kambiService.currentLanguage.asObservable().subscribe(() => {
                 this.getTodaysAssist();
            });
        }
    }
    /**
     * this is the setter to set upcomingEventId
     */
    @Input()
    set upcomingEventId(id: string) {
        this.homeUpcomingEventId = id;
        this.updateTodaysAssist();
    }
    /**
     * this is the setter to set modEventId
     */
    @Input()
    set modEventId(id) {
        this.matchOfTheDayEventId = id;
        this.updateTodaysAssist();
    }
    /**
     * this is the setter to set bannerEventId
     */
    @Input()
    set bannerEventId(id) {
        this.topBannerEventId = id;
        this.updateTodaysAssist();
    }
    /**
     * this is the setter to set bannerEventId
     */
    @Input()
    set rightNowEventId(id) {
        this.homeRightNowEventId = id;
        this.updateTodaysAssist();
    }
    /**
     * This function calls after a component's view.
     */
    ngAfterViewInit() {
        IntervalObservable.create(environment.refreshMin)
            .takeWhile(() => this.alive) // only fires when component is alive
            .subscribe(() => {
                this.getTodaysAssist();
            });
    }
    /**
     * This fuction used to create and destroy todays assist carousel.
     */
    loadTodaysAssist() {
        const timer = Observable.timer(500);
        timer.subscribe(() => {
            if (this.isInitial) {
                this.isInitial = false;
            } else {
                this.todaysAssistCarousel.destroy();
            }
            this.todaysAssistCarousel = new Flickity('.carousel-TodaysAssist', {
                freeScroll: true,
                cellAlign: 'left',
                contain: true,
                prevNextButtons: false,
                pageDots: false,
                imagesLoaded: true,
                autoPlay: 10000,
            });
        });
    }
    /*******  This fuction is to get data to todays assist. ********/
    getTodaysAssist() {
        this.homePageData.getTodaysAssists().subscribe(resData => {
            this.todaysAssistData = resData;
            this.updateTodaysAssist();
        });
    }
    /**
     * this method will update todays assist data.
     */
    updateTodaysAssist() {
        this.todaysAssistWithLive(this.todaysAssistData, [this.homeUpcomingEventId, this.topBannerEventId,
            this.matchOfTheDayEventId, this.homeRightNowEventId], (data) => {
                this.todaysAssistBets = data;
                this.loadTodaysAssist();
            });
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
     * This function used to show less or more of todaysassist.
     */
    todaysAssistToggle() {
        this.todaysAssistSeeAll = !this.todaysAssistSeeAll;
    }
    /**
     * this method is used to check todays assist with live condition
     * Todays with live condition is:
     *  3 live events – 3 x Football Tier 1, if not enough then Tennis Tier 1, if none Football Tier 2,
        if none then Tennis Tier 2, if none then condition 2 (todays assist with out live)
     *  5 x Pre-event Football Tier 1, if no Tier 1 use Tier 2, 2 x Tennis Tier 1, if no Tier 1 use Tier 2.
     * @param {array} todaysData - contains bets.
     * @param {array} excludeEventIds - contains event id's to exclude.
     * @param {callback function} callback - defines callback function.
     */
    todaysAssistWithLive(todaysData, excludeEventIds, callback: (data) => void) {
        this.todaysAssistDataAfterFilter = [];
        this.todaysAssistDataId = [];
        if (todaysData && todaysData != null &&
            (Array.isArray(todaysData.FootballLive.Tier1) && todaysData.FootballLive.Tier1.length === 0) &&
            (Array.isArray(todaysData.FootballLive.Tier2) && todaysData.FootballLive.Tier2.length === 0) &&
            (Array.isArray(todaysData.TennisLive.Tier1) && todaysData.TennisLive.Tier1.length === 0) &&
            (Array.isArray(todaysData.TennisLive.Tier2) && todaysData.TennisLive.Tier2.length === 0)) {
            this.todaysAssistWithOutLive(todaysData, excludeEventIds);
        } else if (todaysData && todaysData != null) {
            // find liveMaxLength number of live bets
            this.checkLiveMatches(todaysData, excludeEventIds);
            let totalMatches = this.liveMaxLength + this.preFootballMaxLengthWhenLiveMatches;
            // find preFootballMaxLength number of pre Football bets
            this.checkPreFootballMatches(todaysData.FootballPre.TodayMatches, excludeEventIds, totalMatches);
            totalMatches = this.liveMaxLength + this.preFootballMaxLengthWhenLiveMatches + this.preTennisMaxLengthWhenLiveMatches;
            // find preTennisMaxLengthC1 number of pre Football bets
            this.checkPreTennisMatches(todaysData.TennisPre.TodayMatches.Tier1, excludeEventIds, totalMatches);
            this.checkPreTennisMatches(todaysData.TennisPre.TodayMatches.Tier2, excludeEventIds, totalMatches);

            // find preFootballMaxLength number of pre Football bets
            this.checkPreFootballMatches(todaysData.FootballPre.TodayMatches, excludeEventIds, totalMatches);

            if (this.todaysAssistDataAfterFilter.length < totalMatches) {
                totalMatches = this.liveMaxLength + this.preFootballMaxLengthWhenLiveMatches;
                this.checkPreFootballMatches(todaysData.FootballPre.NextdayMatches, excludeEventIds, totalMatches);
                totalMatches = this.liveMaxLength + this.preFootballMaxLengthWhenLiveMatches + this.preTennisMaxLengthWhenLiveMatches;
                this.checkPreTennisMatches(todaysData.TennisPre.NextdayMatches.Tier1, excludeEventIds, totalMatches);
                this.checkPreTennisMatches(todaysData.TennisPre.NextdayMatches.Tier2, excludeEventIds, totalMatches);
                this.checkPreFootballMatches(todaysData.FootballPre.NextdayMatches, excludeEventIds, totalMatches);
            }
        }
        callback(this.todaysAssistDataAfterFilter);
    }
    /**
     * this method is used to check todays assist with out live condition.
     * Todays assist with out live condition is:
     * 7 x Football Tier 1, if not enough make up with Tier 2
     * 3 x Tennis Tier 1, if no Tier 1, make up with Football Tier 1,
       if no Tier 1 football make up with Football Tier 2, if no Football Tier use Tennis Tier 2
     * 3 Events in Today’s assists when they go live show Livelogic,
       if event is scheduled for Banner or Match of the Day, then use condition 2 (todaysAssistWithOutLive) to fill.
     * @param {array} todaysData - contains bets.
     * @param {array} excludeEventIds - contains event id's to exclude.
     */
    todaysAssistWithOutLive(todaysData, excludeEventIds) {
        const totalMatches = this.preFootballMaxLengthWhenNoLiveMatches + this.preTennisMaxLengthWhenNoLiveMatches;
        this.checkPreFootballMatches(todaysData.FootballPre.TodayMatches, excludeEventIds, this.preFootballMaxLengthWhenNoLiveMatches);
        this.checkPreTennisMatches(todaysData.TennisPre.TodayMatches.Tier1, excludeEventIds, totalMatches);
        this.checkPreFootballMatches(todaysData.FootballPre.TodayMatches, excludeEventIds, totalMatches);
        this.checkPreTennisMatches(todaysData.TennisPre.TodayMatches.Tier2, excludeEventIds, totalMatches);

        if (this.todaysAssistDataAfterFilter.length < totalMatches) {
            this.checkPreFootballMatches(todaysData.FootballPre.NextdayMatches, excludeEventIds, totalMatches);
            this.checkPreTennisMatches(todaysData.TennisPre.NextdayMatches.Tier1, excludeEventIds, totalMatches);
            this.checkPreFootballMatches(todaysData.FootballPre.NextdayMatches, excludeEventIds, totalMatches);
            this.checkPreTennisMatches(todaysData.TennisPre.NextdayMatches.Tier2, excludeEventIds, totalMatches);
        }
    }
    /**
     * This function will check for live matches
     * @param {array} todaysData - contains bets.
     * @param {array} excludeEventIds - contains event id's to exclude
     */
    checkLiveMatches(todaysData, excludeEventIds) {
        this.findBets(todaysData.FootballLive.Tier1, excludeEventIds, this.liveMaxLength, true);
        this.findBets(todaysData.TennisLive.Tier1, excludeEventIds, this.liveMaxLength, true);
        this.findBets(todaysData.FootballLive.Tier2, excludeEventIds, this.liveMaxLength, true);
        this.findBets(todaysData.TennisLive.Tier2, excludeEventIds, this.liveMaxLength, true);
    }
    /**
     * This function is used to check pre football matches.
     * @param {array} todaysData - contains bets.
     * @param {array} excludeEventIds - contains event id's to exclude
     * @param {Integer} totalMatches - number of matches to check
     */
    checkPreFootballMatches(matches, excludeEventIds, totalMatches) {
        this.findBets(matches.Tier1, excludeEventIds, totalMatches, false);
        this.findBets(matches.Tier2, excludeEventIds, totalMatches, false);
    }
    /**
     * This function is used to check pre tennis matches.
     * @param {array} todaysData - contains bets.
     * @param {array} excludeEventIds - contains event id's to exclude
     * @param {Integer} totalMatches - number of matches to check
     */
    checkPreTennisMatches(matches, excludeEventIds, totalMatches) {
        this.findBets(matches, excludeEventIds, totalMatches, false);
    }
    /**
     * this method will find the bets from provided array
     * @param {array} sourceData - contains bets.
     * @param {array} excludeEventIds - contains event id's to exclude.
     * @param {number} maxLength - contains number of bets to select.
     * @param {boolean} isLive - contains true/false.
     */
    findBets(sourceData, excludeEventIds, maxLength, isLive) {
        if (Array.isArray(sourceData) && sourceData.length !== 0 && this.todaysAssistDataAfterFilter.length < maxLength) {
            for (const data of sourceData) {
                if (excludeEventIds.indexOf(data.eventId) === -1 &&
                    this.todaysAssistDataId.indexOf(data.eventId) === -1) {
                    data.isLive = isLive;
                    this.todaysAssistDataAfterFilter.push(data);
                    this.todaysAssistDataId.push(data.eventId);
                }
                if (this.todaysAssistDataAfterFilter.length >= maxLength) {
                    break;
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
