 /**
  * @fileoverview contains all service call for tennis best bets.
  */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { BettorLogicApiService } from '../../shared/bettor-logic-api.service';
@Injectable()
export class TennisBestBetsService {
    /**
     * @ constructor
     * @param http - instance of Http service.
     * @param bettorLogicAPI - instance of BettorLogicApiService to access its methods.
     */
    constructor(private http: Http, private bettorLogicAPI: BettorLogicApiService) { }
    /**
     * This method get tennis bets and returns.
     */
    getTennisBestBets() {
        return this.bettorLogicAPI.getTennisBestBets();
    }

}
