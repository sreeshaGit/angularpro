import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BettorLogicApiService } from '../../shared/bettor-logic-api.service';
@Injectable()
export class TennisLiveBetsService {
    /**
     * @param http - instance of Http service.
     * @param bettorLogicAPI - instance of BettorLogicApiService to access its methods.
     */
    constructor(private http: Http, private bettorLogicAPI: BettorLogicApiService) { }
    /**
     * gets live logic data tennis from service
     */
    getTennisLiveLogic() {
        return this.bettorLogicAPI.getTennisLiveLogic();
    }
    /**
     * This method get tennis bets and returns.
     */
    getTennisBestBets() {
        return this.bettorLogicAPI.getTennisBestBets();
    }
}
