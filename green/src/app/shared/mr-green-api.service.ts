/**
 * @fileoverview contains all the service of MrGreen.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/publishReplay';

import { ConfigParamsService } from '../shared/config-params.service';
import { KambiService } from '../Kambi/Kambi.service';

@Injectable()
export class MrGreenApiService {
    private baseUrl = 'https://casino.mrgreen.com/api';
    private mrGreenBaseUrl = 'https://odds.mrgreen.com/offering/api';
    private storeFrontBaseUrl = 'https://www.mrgreen.com/wp-json/wp';
    private market: string;
    private cache = {};

    /**
     * @constructor
     * @param {Http} http - instance of Http service.
     * @param {KambiService} kambiService - instance of KambiService to access kambi methods.
     */
    constructor(
        private configuration: ConfigParamsService,
        private http: Http,
        private kambiService: KambiService
    ) {
        this.configuration.params.subscribe((config) => {
            this.market = config.ma || this.kambiService.market;
        });
    }

    /**
     * Get data from an url and store
     * cache for a cooldown period
     * @param {string} url path for request
     * @param {int} cooldown in milliseconds
     * @param {string} cacheKey (optional) key to cache on instead of url
     */
    fetchWithCooldownCache(url, cooldown, cacheKey = null) {
        const key = cacheKey || url;
        const currentTime = (new Date()).getTime();
        const cachedMeta = this.cache[key];

        if (cachedMeta && (currentTime - cachedMeta.lastRequest < cooldown)) {
            return cachedMeta.request;
        } else {
            const request = this.http.get(url).map((res: Response) => res.json()).publishReplay(1).refCount();
            this.cache[key] = {
                lastRequest: currentTime,
                request: request
            };
            return request;
        }
    }

    /**
     * Formats boUri to remove stuff already present in baseUrl
     * @param boUri
     */
    formatBoUri(boUri) {
        return boUri.replace('/offering/api', '');
    }

    /**
     * gets highlites today events data from service
     */
    getHighlights(boUri) {
        return this.http.get(this.mrGreenBaseUrl + this.formatBoUri(boUri))
            .map((res: Response) => res.json());
    }

    /**
     * gets highlites today data from service
     */
    getHighlightsToday() {
        const market = this.kambiService.market;
        const locale = this.kambiService.locale;
        return this.http.get(`${this.getMrGreenBaseUrl(2)}/betoffer/landing.json?market=${market}&lang=${locale}`)
            .map((res: Response) => res.json());
    }

    /**
     * This fuction used to get live odds.
     * @param eventId -eventId of corresponding game.
     */
    getLiveOdds(eventId: any) {
        const url = this.getMrGreenBaseUrl(2) + '/betoffer/live/event/' + '' + eventId + '.json?v=' + (new Date()).getTime();
        return this.fetchWithCooldownCache(url, 1000, `getLiveEventOdds${eventId}`);
    }

    /**
     * Get the Mr Green api base url
     * @param version version of the API to use
     */
    getMrGreenBaseUrl(version) {
        return `${this.mrGreenBaseUrl}/v${version}/mg`;
    }

    /**
     * gets soccer spin data from service
     */
    getSpinData() {
        const url = this.getMrGreenBaseUrl(2) + '/event/live/open.json';
        return this.fetchWithCooldownCache(url, 2000);
    }

    /**
     * gets tennis live data from service
     */
    getTennisMgData() {
        const url = this.getMrGreenBaseUrl(2) + '/event/live/open.json?include=participants';
        return this.fetchWithCooldownCache(url, 2000);
    }

    /**
     * gets tennis player country name  from service.
     * @param participantId - participantId of that player.
     */
    getTennisPlayerCountry(participantId) {
        return this.http.get(this.baseUrl + '/v2/bet/tennis/player/' + participantId)
            .map((res: Response) => res.json());
    }

    /**
     * gets tennis pregame data from service
     */
    getTennisPregameFromMg() {
        const url = this.getMrGreenBaseUrl(2) + '/event/group/1000093193.json?include=participants';
        return this.fetchWithCooldownCache(url, 2000);
    }

    /**
     * Gets a list of top banners
     */
    getTopBanners() {
        return this.http.get(`${this.storeFrontBaseUrl}/v2/mood-data?target=sportsbook&ma=${this.market}`)
            .map((res: Response) => res.json());
    }
}
