/**
  * @fileoverview contains all service call for football best bets.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { KambiService } from '../../Kambi/Kambi.service';
import { environment } from '../../../environments/environment';
import { BettorLogicApiService } from '../../shared/bettor-logic-api.service';
@Injectable()
export class FootballBestBetsService {
    /**
     * @constructor
     * @param {Http} http - instance of Http service.
     * @param {KambiService} kambiService - instance of KambiService to access kambi methods.
     * @param {BettorLogicApiService} bettorLogicAPI - instance of BettorLogicApiService to access BettorLogicApiService.
     */
    constructor(private http: Http, private kambiService: KambiService, private bettorLogicAPI: BettorLogicApiService) {}
    /**
     * gets Filters data from service
     */
    getLeagueMarketFilterData() {
        return this.bettorLogicAPI.getLeagueMarketFilterData();
    }
    /**
     * gets betsbets data from service
     * @param {any} leagueId of the league selected.
     * @param {any} marketId of the market selected.
     */
    getBestBetsData(leagueId, marketId) {
        return this.bettorLogicAPI.getBestBetsData(leagueId , marketId);
    }


}
