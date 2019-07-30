import { Injectable } from '@angular/core';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { WindowRef } from './Window.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ConfigParamsService } from '../shared/config-params.service';
import { environment } from '../../environments/environment';

function _window(): any {
    // return the global native browser window object
    return window;
}
let localWapi: any;
// let self: any;
@Injectable()

export class KambiService {
    private winRef = _window();
    oddsFormat: string;
    language = 'en';
    locale = 'en_GB';
    currency: string;
    market = 'GB';
    country = 'GB';
    readonly currentLanguage = new BehaviorSubject<any>(0);

    constructor(
        private configuration: ConfigParamsService
    ) {
        const self = this;

        const apiReadyHandler = function(wapi) {
            localWapi = wapi;
            wapi.request(wapi.CLIENT_ODDS_FORMAT);
            wapi.request(wapi.ODDS_FRACTIONAL);
            const height = document.body.offsetHeight;
            wapi.set(wapi.WIDGET_HEIGHT, height);
            const interval = setInterval(() => {
                const setheight = document.body.offsetHeight;
                if (height !== setheight) {
                    wapi.set(wapi.WIDGET_HEIGHT, setheight);
                }
            }, 500);

            wapi.requestSetup(function(setup) {
                self.reConfigureClient(setup.clientConfig);
            });
        };

        const responseReceiver = function(response, wapi) {
            switch (response.type) {
                case wapi.CLIENT_ODDS_FORMAT:
                    self.oddsFormat = response.data;
                    break;
                case wapi.CLIENT_CONFIG:
                case 'sharedInstanceManager.configuration':
                    self.reConfigureClient(response.data);
                    break;

                default:
                    break;
            }
        };

        // attach event listener, if available
        // otherwise - use native kambi listener
        if (this.winRef.SharedInstanceManager) {
            this.winRef.SharedInstanceManager.kambi.receiveResponse(responseReceiver);
            this.winRef.SharedInstanceManager.kambi.apiReady(function(wapi) {
                localWapi = wapi;
            });
        } else {
            this.winRef.KambiWidget.receiveResponse = responseReceiver;

            if (this.winRef.KambiWidget.onApiReady) {
                this.winRef.KambiWidget.onApiReady(apiReadyHandler);
            } else {
                this.winRef.KambiWidget.apiReady = apiReadyHandler;
            }
        }

        let lang;
        let odds;
        let country;
        let locale;
        lang = self.getQueryVariable('lang');
        odds = self.getQueryVariable('odds');
        country = self.getQueryVariable('country');
        locale = self.getQueryVariable('locale');
        if (lang && lang !== '') {
            self.language = lang;
        }
        if (odds && odds !== '') {
            if (odds === 'f') {
                self.oddsFormat = 'fractional'
            } else if (odds === 'd') {
                self.oddsFormat = 'decimal'
            } else {
                self.oddsFormat = 'american'
            }
        }
        if (country && country !== '') {
            self.country = country;
        }
        if (locale && locale !== '') {
            self.locale = locale;
        }
    }

    getQueryVariable(variable) {
        const query = window.location.search.substring(1);
        const vars = query.split('&');
        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split('=');
            if (pair[0] === variable) {
                return pair[1];
            }
        }
    }

    /**
     * This function used to add bet to betslip.
     * @param outcome - Events outcomeId.
     * @param type - multi or single.
     */
    addToBetslip(outcome: number[], type) {
        if (type === 'single') {
            localWapi.set(localWapi.BETSLIP_OUTCOMES, {
                updateMode: localWapi.BETSLIP_OUTCOMES_ARGS.UPDATE_APPEND,
                outcomes: outcome, couponType: localWapi.BETSLIP_OUTCOMES_ARGS.TYPE_SINGLE
            });
        } else if (type === 'multi') {
            localWapi.set(localWapi.BETSLIP_OUTCOMES, {
                updateMode: localWapi.BETSLIP_OUTCOMES_ARGS.UPDATE_APPEND,
                outcomes: outcome, couponType: localWapi.BETSLIP_OUTCOMES_ARGS.TYPE_COMBINATION
            });
        }
    }

    /**
     * This function used to add bet to betslip with stake.
     * @param outcome - Events outcomeId.
     * @param type - multi or single
     * @param stake - stake amount.
     */
    addToBetslipStake(outcome: number[], type, stake) {
        if (type === 'single') {
            localWapi.set(localWapi.BETSLIP_OUTCOMES, {
                updateMode: localWapi.BETSLIP_OUTCOMES_ARGS.UPDATE_APPEND,
                outcomes: outcome, stakes: [stake], couponType: localWapi.BETSLIP_OUTCOMES_ARGS.TYPE_SINGLE
            });
        } else if (type === 'multi') {
            localWapi.set(localWapi.BETSLIP_OUTCOMES, {
                updateMode: localWapi.BETSLIP_OUTCOMES_ARGS.UPDATE_APPEND,
                outcomes: outcome, stakes: [stake], couponType: localWapi.BETSLIP_OUTCOMES_ARGS.TYPE_COMBINATION
            });
        }
    }

    /**
     * This method gets Fractional odds from kambi.
     * @param odds
     * @param callback
     */
    convertOddsToFractional(odds, callback: (value) => void) {
        localWapi.requestOddsAsFractional(odds * 1000, function (fractionalOdds) {
            callback(fractionalOdds);
        });
    }

    /**
     * This method get the american odds from kambi.
     * @param odds - odds of that event.
     * @param callback
     */
    convertOddsToAmerican(odds, callback: (value) => void) {
        localWapi.requestOddsAsAmerican(odds * 1000, function (americanOdds) {
            callback(americanOdds);
        });
    }

    /**
     * This function used to navigate to event page of MrGreen.
     * @param eventId
     */
    navigateToEvent(eventId: number) {
        const url = 'event/' + eventId;
        this.configuration.params.subscribe((config) => {
            if (config.enableNavigationEvents === 'true') {
                parent.postMessage({
                    kambiPath: url,
                    type: 'kambi.navigate'
                }, '*');
            } else {
                const isHybridMode = !!this.winRef.SharedInstanceManager;

                const clientUrl = localWapi.createUrl(url, (isHybridMode ? this.locale.replace('_', '-') : null));
                localWapi.navigateClient(clientUrl);
            }
        });
    }

    /**
     * Reconfigure all client setup from Kambi
     * @param {object} clientConfig
     */
    reConfigureClient(clientConfig) {
        console.warn(clientConfig, 'clientConfig');
        const oldLanguage = this.language;
        this.language = clientConfig.locale.split('_')[0];
        this.country = clientConfig.locale.split('_')[1];
        this.oddsFormat = clientConfig.oddsFormat;
        this.locale = clientConfig.locale;
        this.currency = clientConfig.currency;
        this.market = clientConfig.market;

        if (this.language !== oldLanguage) {
            this.currentLanguage.next(this.language);
        }
    }
}
