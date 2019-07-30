/**
 * @fileoverview contains all service call for home page.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { KambiService } from '../Kambi/Kambi.service';
import { BettorLogicApiService } from '../shared/bettor-logic-api.service';
@Injectable()
export class HomepageService {
    language: string;
    locale: string;
    market: string;
    /**
    *
    * @constructor
    * @param {Http} http - instance of Http service.
    * @param {KambiService} kambiService - instance of KambiService to access kambi methods.
    * @param {BettorLogicApiService} bettorLogicAPI - instance of BettorLogicApiService to access services.
    */
    constructor(private http: Http, private kambiService: KambiService, private bettorLogicAPI: BettorLogicApiService) {
    }
    /**
    * gets RightNow data from service
    */
    getRightNowData() {
        return this.bettorLogicAPI.getRightNowData();
    }
    /**
    * gets banner data from service
    */
    getBannerData(userId) {
        return this.bettorLogicAPI.getBannerData(userId);
    }
    /**
     * gets banner data from service
     */
    getBannerDataOnPriority(userId) {
        return this.bettorLogicAPI.getBannerDataOnPriority(userId);
    }
    /**
    * gets match of the day data from service
    */
    getMatchOfTheDay() {
        return this.bettorLogicAPI.getMatchOfTheDay();
    }
    /**
    * gets upcoming data from service
    */
    getUpcomingMatches() {
        return this.bettorLogicAPI.getUpcomingMatches();
    }
    /**
    * gets today assist data from service
    */
    getTodaysAssists() {
        return this.bettorLogicAPI.getTodaysAssists();
    }
}
