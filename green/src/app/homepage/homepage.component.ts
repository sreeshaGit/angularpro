/**
 * @fileoverview contains all logic for homepage.
 */
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer';
import { ConfigParamsService } from '../shared/config-params.service';
import { DynamicBannerService } from './dynamic-banner/dynamic-banner.service';
import { HomepageService } from './homepage.service';
import { HomepageSubMethodsService } from './homepage-sub-methods.service';
import { KambiService } from '../Kambi/Kambi.service';
import { StaticWordsService } from '../StaticWords/static-words.service';
import { environment } from '../../environments/environment';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { SharedMethodsService } from '../shared/shared-methods.service';
import { BettorLogicApiService } from '../shared/bettor-logic-api.service';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css'],
    providers: [HomepageService, SharedMethodsService]
})
export class HomepageComponent implements OnInit, OnDestroy, AfterViewInit {
    private alive = true;
    bannerEventId = '';
    combinedLiveData: any[];
    interval: any;
    isInitial = true;
    isUpcomingLoader = true;
    isFootball: boolean;
    isTennies: boolean;
    isTodaysAssistData = false;
    isInApp: boolean;
    modEventId = '';
    matchUpcoming: any;
    matchBestBetsFb: any[];
    matchBestBetsTennis: any[];
    promoLink: SafeUrl;
    preMatches: any;
    radixParameter = 10;
    rightNowData: any[];
    rightNowEventId: '';
    showUpcoming = false;
    todaysAssist: any[];
    todaysAssistData: any[];
    upcomingEventId = '';
    upcomingMatch = [];
    /**
     * @param {HomepageService} homePageData - instance of HomepageService to access HomepageService methods.
     * @param {KambiService} kambiService - instance of KambiService to access kambi methods.
     * @param {StaticWordsService} staticWordsData - instance of Staticwordsdata to access translation words.
     * @param {HomepageSubMethodsService} homepageSubMethodsService - instance of HomePageSubMethodsService to access methods.
     * @param {SharedMethodsService} sharedMethods - instance of SharedMethodsService to access its methods.
     * @param sanitizer
     */
    constructor(
        private configuration: ConfigParamsService,
        private dynamicBanner: DynamicBannerService,
        private homePageData: HomepageService,
        public kambiService: KambiService,
        public staticWordsData: StaticWordsService,
        public homepageSubMethodsService: HomepageSubMethodsService,
        private sanitizer: DomSanitizer,
        private sharedMethods: SharedMethodsService
    ) { }

    /**
     * This function calls initial and gets data.
     */
    ngOnInit() {

        this.kambiService.currentLanguage.asObservable().subscribe(() => {
            this.getUpcomingMatches();
        });
        this.configuration.params.subscribe((config) => {
            this.getPromoUrl(config);
            this.detectInAppMode(config);
        });
        window.addEventListener('message', (event) => {
            if (event.origin === 'https://embed.mrgreen.com') {
                parent.postMessage(event.data, '*');
            }
        }, false);

        this.dynamicBanner.currentlyDisplayedEventId.asObservable()
            .subscribe(eventId => {
                if (eventId > 0) {
                    this.bannerEventId = eventId;
                    this.removeDuplicatesFromUpcomingData();
                }
            });
    }

    /**
     * This function calls after a component's view.
     */
    ngAfterViewInit() {
        IntervalObservable.create(environment.refreshPre)
            .takeWhile(() => this.alive) // only fires when component is alive
            .subscribe(() => {
                this.getUpcomingMatches();
            });
    }

    /**
     * Determine if the app is run inside an app or not.
     * @param params Object containing the url query params.
     */
    detectInAppMode(params) {
        this.isInApp = params.client === 'app';
    }
    /**
     * Generates the correct promotion url for the MrG promo carousel.
     * @param params Object containing the url query params.
     */
    getPromoUrl(params) {
        this.promoLink = this.sanitizer.bypassSecurityTrustResourceUrl(
            'https://embed.mrgreen.com/embedded-promo'
            + '?cu=' + params.cu
            + '&ma=' + params.ma
            + '&lang=' + params.lang
            + '&context=' + (params.context || 'sportsbook')
            + '&target=' + (params.target || 'sportsbook')
            + '&client=' + (params.client || 'web')
            + '&user=' + params.user);
    }

    /**
     * This fuction is to get data to Upcoming and todays Assist data.
     */
    getUpcomingMatches() {
        this.homePageData.getUpcomingMatches().subscribe(resData => {
            this.preMatches = resData;
            const upcomingMatch = [];
            this.isUpcomingLoader = false;
            if ((resData === null) || (resData.Football === null && resData.Tennis === null) ||
                typeof resData.Football !== 'object' && typeof resData.Tennis !== 'object' ||
                (Array.isArray(resData.Football.Bestbets) && Array.isArray(resData.Tennis.Matches) &&
                resData.Football.Bestbets === null && resData.Tennis.Matches === null)) {
                    this.isUpcomingLoader = false;
                    return;
            }
            if (resData.Football.Bestbets !== null &&
                Array.isArray(resData.Football.Bestbets) &&
                resData.Football.Bestbets.length > 0) {
                upcomingMatch.push.apply(upcomingMatch, this.formatArrayData(resData.Football.Bestbets));
            }
            if (resData.Tennis.Matches !== null && Array.isArray(resData.Tennis.Matches) && resData.Tennis.Matches.length > 0) {
                this.matchBestBetsTennis = resData.Tennis.Matches;
                upcomingMatch.push.apply(upcomingMatch, this.formatArrayData(resData.Tennis.Matches));
            }
            if (upcomingMatch && Array.isArray(upcomingMatch) && upcomingMatch.length > 0) {
                upcomingMatch.sort(function (time1, time2) {
                     return Date.parse(time1.matchkickofftime) - Date.parse(time2.matchkickofftime);
                });
            }
            this.upcomingMatch = upcomingMatch;
            this.removeDuplicatesFromUpcomingData();

        });
    }
    /**
     * This function used to formated Array data.
     * @param arrayData - it contents array.
     */
    formatArrayData(arrayData) {
        const formatedArrayData = [];
        for (const data of arrayData) {
            formatedArrayData.push(data);
        }
        return formatedArrayData;
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
     * This fuction used to navigate to event page.
     * @param eventId - this hold the eventId of that match.
     * @param typeOfEvent -this hold data from where it is clicked.
     */
    goToEventPage(eventId, typeOfEvent) {
        this.homepageSubMethodsService.goToEventPage(eventId, typeOfEvent);
    }
    /**
     * This method gets the eventId from match of the day component.
     * @param eventId - MOD eventId.
     */
    setMODEventId(eventId) {
        this.modEventId = eventId;
        this.removeDuplicatesFromUpcomingData();
    }
    /**
     * This method gets the eventId from upcoming component.
     * @param eventId - Upcoming eventId.
     */
    setUpcomingDisplay(event) {
        this.showUpcoming = event;
    }
    /**
     * This method gets the eventId and data from right now component.
     * @param event -  array of data.
     */
    setRightNow(event) {
        if (event) {
            this.rightNowData = event.rightNowData;
            this.rightNowEventId = event.rightNowEventId;
        }
    }
    /**
     * This function used to remove duplicate events from upcoming data.
     */
    removeDuplicatesFromUpcomingData() {
        let isUpcomingFound = false;
        if (this.upcomingMatch && Array.isArray(this.upcomingMatch) && this.upcomingMatch.length > 0) {
            for (const value of this.upcomingMatch) {
                const parsedEventId = parseInt(value['EventId'], this.radixParameter);
                if (parseInt(this.bannerEventId, this.radixParameter) !== parsedEventId &&
                    parseInt(this.modEventId, this.radixParameter) !== parsedEventId) {
                    this.matchUpcoming = value;
                    this.upcomingEventId = value['EventId'];
                    isUpcomingFound = true;
                    break;
                }
            }
        }
        if (!isUpcomingFound && Array.isArray(this.upcomingMatch) && this.upcomingMatch.length > 0) {
            this.matchUpcoming = this.upcomingMatch[0];
        }
    }
    /**
     * This function called before destroying  the component.
     */
    ngOnDestroy() {
        this.alive = false;
    }
}
