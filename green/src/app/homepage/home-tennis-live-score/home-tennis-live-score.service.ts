/**
 * @fileoverview contains all service call for tennis live score page.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { MrGreenApiService } from '../../shared/mr-green-api.service';
@Injectable()
export class HomeTennisLiveScoreService {
    /**
     * @constructor
     * @param {Http} http - instance of Http service.
     * @param {MrgreenApiService} mrGreenApiService - instance of MrgreenApiService to access mrgreen methods.
     */
    constructor(private http: Http, private mrGreenApiService: MrGreenApiService) { }
    /**
     * gets tennis live data from service
     */
    getTennisMgData() {
        return this.mrGreenApiService.getTennisMgData();
    }
}
