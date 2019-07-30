/**
 * @fileoverview contains all service call for footballMultiBets.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { KambiService } from '../../Kambi/Kambi.service';

import { BettorLogicApiService } from '../../shared/bettor-logic-api.service';
@Injectable()
export class FootballMultiBetsService {

    /**
    * @constructor
    * @param {Http} http - instance of Http service.
    * @param {KambiService} kambiService - instance of KambiService to access kambi methods.
    */
    constructor(private http: Http, private kambiService: KambiService, private bettorLogicAPI: BettorLogicApiService) {
    }
    /**
     *  gets Multibetdata from service using stack and win as input parameter
     * @param {number} stake  it holds stakeAmount value
     * @param {number} win   it holds winAmount value
     */
    getMultiBetData(stake, win) {
        return this.bettorLogicAPI.getMultiBetData(stake, win);
    }
    /**
     *  This function refers to get the swapedBet from service useing match id and multiGroupId as parameter
     * @param {number} matchId- it refers match id
     * @param {number} multiGroupId - it refers multiGroupId
     */
    getSwapedBet(matchId, multiGroupId) {
        return this.bettorLogicAPI.getSwapedBet(matchId, multiGroupId);
    }

}
