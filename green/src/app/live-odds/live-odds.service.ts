/**
 * @fileoverview contains all logic to get odds from api service.
 */
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { MrGreenApiService } from '../shared/mr-green-api.service';
@Injectable()
export class LiveOddsService {
    /**
	 *
     * @param {Http} http - instance of Http service.
     * @param {MrgreenApiService} mrGreenApiService - instance of MrgreenApiService to access mrgreen methods.
     */
    constructor(private http: Http, private mrGreenApiService: MrGreenApiService) {}
    /**
	 * gets data from thst service.
     * @param eventId -eventid of corresponding game.
	 */
    getLiveOdds(eventId: any) {
        return this.mrGreenApiService.getLiveOdds(eventId);
    }
    /**
     * @param marketId- marketId of that game.
     * @param outcomeId- outcomeId of that game.
     * @param betoffers- betoffers of that game.
     */
    getOdds(marketId: any, outcomeId: any, betoffers: any) {
        if ((marketId !== '' && marketId !== null) && (outcomeId !== '' && outcomeId !== null) &&
            (betoffers !== '' && betoffers !== null)) {

            for (let i = 0; i < betoffers.length; i++) {
                if (parseInt(betoffers[i].id, 10) === parseInt(marketId, 10)) {
                    for (let j = 0; j < betoffers[i]['outcomes'].length; j++) {
                        if (parseInt(betoffers[i]['outcomes'][j]['id'], 10) === parseInt(outcomeId, 10)) {
                            const dec = betoffers[i]['outcomes'][j]['odds'] / 1000;
                            const odds = {
                                oddsAmerican: betoffers[i]['outcomes'][j]['oddsAmerican'],
                                oddsFractional: betoffers[i]['outcomes'][j]['oddsFractional'],
                                oddsDecimal: dec.toFixed(2)
                            };

                            return odds;
                        }
                    }
                }

            }
        } else {
            const odds1 = {
                oddsAmerican: '',
                oddsFractional: '',
                oddsDecimal: ''
            };
            return odds1;
        }
    }
}
