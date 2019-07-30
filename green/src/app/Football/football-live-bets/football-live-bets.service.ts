/**
 * @fileoverview contains all service call for football live bets.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { KambiService } from '../../Kambi/Kambi.service';
import { environment } from '../../../environments/environment';
import { BettorLogicApiService } from '../../shared/bettor-logic-api.service';

@Injectable()
export class FootballLiveBetsService {
    /**
     *
     * @constructor
     * @param {Http} http - instance of Http service.
     * @param {KambiService} kambiService - instance of KambiService to access kambi methods.
     */
    constructor(private http: Http, private kambiService: KambiService, private bettorLogicAPI: BettorLogicApiService) {}
    /**
     * gets live data from service
     */
    getLiveFootballData() {
        return this.bettorLogicAPI.getLiveLogicBestBets();
    }

}
