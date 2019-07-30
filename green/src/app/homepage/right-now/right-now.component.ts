/**
 * @fileoverview contains all the logic to display upcoming match.
 */
import { Component, OnInit, Input, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer';

import { environment } from '../../../environments/environment';
import { DynamicBannerService } from '../dynamic-banner/dynamic-banner.service';
import { HomepageService } from '../homepage.service';
import { HomepageSubMethodsService } from '../homepage-sub-methods.service';
import { KambiService } from '../../Kambi/Kambi.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-right-now',
    templateUrl: './right-now.component.html',
    styleUrls: ['./right-now.component.css']
})
export class RightNowComponent implements OnInit, AfterViewInit, OnDestroy {
    private alive = true;
    isRightLoader = true;
    isFootball: boolean;
    isTennies: boolean;
    isRightNowImage: boolean;
    rightNowData: any;
    rightNowFootballData: any[];
    rightNowTennisData: any[];
    rightNowDataFB: any;
    rightNowDataTennis: any;
    radixParameter = 10;
    rightNowEventId = '';
    showRightNow = false;
    showUpcoming = false;
    @Input() bannerEventId;
    @Input() staticWords;
    @Output() setUpcomingDisplay: EventEmitter<any> = new EventEmitter();
    @Output() setRightNow: EventEmitter<any> = new EventEmitter();
    subscription: Subscription;
    /**
     * @param kambiService -instance of kambi service.
     * @param HomePageSubMethodsService -instance of HomepageSubMethodsService to access its methods.
     * @param {HomepageService} homePageData - instance of HomepageService to access HomepageService methods.
     * @param {DynamicBannerService} dynamicBanner - instance of DynamicBannerService
     */
    constructor(
        public kambiService: KambiService,
        public homePageSubMethodsService: HomepageSubMethodsService,
        public homePageData: HomepageService,
        public dynamicBanner: DynamicBannerService
    ) { }

    ngOnInit() {
        this.isRightNowImage = true;
        this.kambiService.currentLanguage.asObservable().subscribe(() => {
            this.getRightNow();
        });
    }
    /**
     * This function calls after a component's view.
     */
    ngAfterViewInit() {
        IntervalObservable.create(environment.refreshMin)
            .takeWhile(() => this.alive) // only fires when component is alive
            .subscribe(() => {
                this.getRightNow();
            });
    }
    /**
     * This fuction is to get data right now .
     */
    getRightNow() {
        this.homePageData.getRightNowData().subscribe(resData => {
            this.isRightLoader = false;
            const rightNowBets = [];
            if ((resData === null) || (resData.Football === null && resData.Tennis === null) ||
                (Array.isArray(resData.Football) && resData.Football.length === 0 &&
                    Array.isArray(resData.Tennis) && resData.Tennis.length === 0)) {
                this.setUpcomingDisplay.emit(true);
                this.setRightNow.emit();
                this.rightNowData = [];
                this.rightNowFootballData = [];
                this.rightNowTennisData = [];
                this.rightNowDataFB = {};
                this.rightNowDataTennis = {};
                this.showRightNow = false;
                this.isTennies = false;
                this.isFootball = false;
            }
            if (Array.isArray(resData.Football) && resData.Football.length > 0) {
                this.rightNowFootballData = resData.Football;
            } else {
                this.rightNowFootballData = [];
            }
            if (Array.isArray(resData.Tennis) && resData.Tennis.length > 0) {
                this.rightNowTennisData = resData.Tennis;
            } else {
                this.rightNowTennisData = [];
            }
            if (Array.isArray(resData.Football) && resData.Football.length > 0 ||
                Array.isArray(resData.Tennis) && resData.Tennis.length > 0) {
                rightNowBets.push.apply(rightNowBets, resData.Football);
                rightNowBets.push.apply(rightNowBets, resData.Tennis);
                this.rightNowData = rightNowBets;
            }
            this.subscription = this.dynamicBanner.currentlyDisplayedEventId.asObservable()
                .subscribe(eventId => {
                    if (eventId) {
                        this.bannerEventId = eventId;
                        this.compareRightNowMatches();
                    }
                });
            this.setRightNow.emit({ rightNowData: this.rightNowData, rightNowEventId: this.rightNowEventId });
        });
    }
    /**
     * This function used to get different matches after comparing with banner.
     */
    compareRightNowMatches() {
        const self = this;
        let isRightFound = false;
        if (this.rightNowFootballData && Array.isArray(this.rightNowFootballData) && this.rightNowFootballData.length > 0) {
            for (const value of this.rightNowFootballData) {
                if (parseInt(this.bannerEventId, this.radixParameter) !== parseInt(value['EventId'], this.radixParameter)) {
                    this.rightNowDataTennis = {};
                    this.isFootball = true;
                    this.isTennies = false;
                    this.setUpcomingDisplay.emit(false);
                    this.showRightNow = true;
                    this.rightNowDataFB = value;
                    isRightFound = true;
                    this.rightNowEventId = this.rightNowFootballData[0].EventId;
                    break;
                }
            }
        }
        if (!isRightFound && this.rightNowTennisData && Array.isArray(this.rightNowTennisData) && this.rightNowTennisData.length > 0) {
            for (const value of this.rightNowTennisData) {
                if (parseInt(this.bannerEventId, this.radixParameter) !== parseInt(value['EventID'], this.radixParameter)) {
                    this.rightNowDataFB = {};
                    this.rightNowDataTennis = value;
                    this.isFootball = false;
                    this.isTennies = true;
                    this.setUpcomingDisplay.emit(false);
                    this.showRightNow = true;
                    isRightFound = true;
                    this.rightNowEventId = this.rightNowTennisData[0].EventID;
                    break;
                }
            }
        }
        if (!isRightFound) {
            this.setUpcomingDisplay.emit(true);
            this.showRightNow = false;
            this.isFootball = false;
            this.isTennies = false;
            this.rightNowDataFB = {};
            this.rightNowDataTennis = {};
        }
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
     *  If there is no jersey then it removes the other.
     */
    imageError() {
        this.isRightNowImage = false;
    }
    /**
     * This function called before destroying  the component.
     */
    ngOnDestroy() {
        this.alive = false;
    }
}
