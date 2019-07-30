/**
 * @fileoverview contains all service call for horse finder.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { BettorLogicApiService } from '../../shared/bettor-logic-api.service';
@Injectable()
export class HorseFinderService {

    /**
    * @constructor
    * @param {Http} http - instance of Http service.
    * @param {BettorLogicApiService} bettorLogicAPI - instance of BettorLogicApiService service to call services.
    */
    constructor(private http: Http, private bettorLogicAPI: BettorLogicApiService) {}
    /**
    * This method is used to get all race course data.
    */
    getRaceCourseData() {
        return this.bettorLogicAPI.getRaceCourseData();
    }
    /**
    * This method is used to get all horses data based on filters.
    * @param {any} selectedOptions - this variable contain selected filters.
    * @param {any} slideValue - this variable contain selected odds values from odds slider.
    * @param {any} slideValue - this variable contain selected race courses names.
    */
    getHorseData(selectedOptions, slideValue, races) {
        if (slideValue <= 1.01) {
            slideValue = 1;
        } else {
            slideValue = slideValue;
        }
        return this.bettorLogicAPI.getHorseData(selectedOptions, slideValue, races);
    }
    /**
    * This method is used to get all the filter data.
    */
    getFilterData() {
        return this.bettorLogicAPI.getFilterData();
    }
    /**
    * This method is used to get slider values.
    */
    getSliderData() {
        return this.bettorLogicAPI.getSliderData();
    }
}
