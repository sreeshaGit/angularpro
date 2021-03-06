/**
 * @fileoverview contains all service call for Soccerprespin.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BettorLogicApiService } from '../../shared/bettor-logic-api.service';

@Injectable()
export class PreSoccerSpinService {
    constructor(private http: Http, private bettorLogicAPI: BettorLogicApiService) {

    }
    /**
    * This method is used to get all data.
    */
    getData() {
        return this.bettorLogicAPI.getSoccerPreBets();
    }
}
