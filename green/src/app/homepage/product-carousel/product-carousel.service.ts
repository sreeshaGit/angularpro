/**
 * @fileoverview contains all service call for carousel page.
 */
import { Injectable } from '@angular/core';

import { BettorLogicApiService } from '../../shared/bettor-logic-api.service';
import { MrGreenApiService } from '../../shared/mr-green-api.service';

@Injectable()
export class ProductCarouselService {
    /**
     * @param {BettorLogicApiService} bettorLogicAPI - instance of BettorLogicApiService to access services.
     * @param {MrgreenApiService} mrGreenApiService - instance of MrgreenApiService to access mrgreen methods.
     */
    constructor(
        private bettorLogicAPI: BettorLogicApiService,
        private mrGreenApiService: MrGreenApiService
    ) { }

    /**
     * gets carousel data from service
     */
    getCarouselData() {
        return this.bettorLogicAPI.getCarouselData();
    }

    /**
     * gets soccer spin data from service
     */
    getSpinData() {
        return this.mrGreenApiService.getSpinData();
    }
}
