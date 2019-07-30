/**
 * @fileoverview contains all logic for analytics code.
 */
import { Injectable } from '@angular/core';

declare var ga;
@Injectable()
export class AnalyticsService {
    constructor() {}
    /**
     * @param category - category of ga.
     * @param action - action of ga.
     * @param label - label of ga.
     */
    sendAnalytics(category, action, label) {
        ga('send', 'event', category, action, label);
    }

}
