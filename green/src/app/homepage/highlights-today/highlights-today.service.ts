/**
 * @fileoverview contains all service call for highlights today.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { KambiService } from '../../Kambi/Kambi.service';
import { MrGreenApiService } from '../../shared/mr-green-api.service';
@Injectable()
export class HighlightsTodayService {
    /**
     * @constructor
     * @param {Http} http - instance of Http service.
     * @param {KambiService} kambiService - instance of KambiService to access kambi methods.
     * @param {MrgreenApiService} mrGreenApiService - instance of MrgreenApiService to access mrgreen methods.
     */
    constructor(private http: Http,
                private kambiService: KambiService,
                private mrGreenApiService: MrGreenApiService) {}
   /**
    * gets highlites today data from service
    */
    getHighlightsToday() {
        return this.mrGreenApiService.getHighlightsToday();
    }
    /**
     * gets highlites today events data from service
     */
    getHighlights(event) {
        return this.mrGreenApiService.getHighlights(event);
    }
}
