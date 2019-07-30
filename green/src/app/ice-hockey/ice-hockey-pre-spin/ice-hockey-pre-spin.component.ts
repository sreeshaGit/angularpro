/**
 * @fileoverview contains all logic for icehockeyprespin.
 */
import { Component, OnInit, AfterViewInit, OnDestroy, NgZone} from '@angular/core';
import { IntervalObservable} from 'rxjs/observable/IntervalObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer';

import { IceHockeyPreSpinService } from './ice-hockey-pre-spin.service';
import { KambiService } from '../../Kambi/Kambi.service';
import { StaticWordsService } from '../../StaticWords/static-words.service';
import { SharedMethodsService } from '../../shared/shared-methods.service';
import { BettorLogicApiService } from '../../shared/bettor-logic-api.service';
import { AnalyticsService } from '../../shared/analytics.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-ice-hockey-pre-spin',
  templateUrl: './ice-hockey-pre-spin.component.html',
  styleUrls: ['./ice-hockey-pre-spin.component.css'],
  providers: [IceHockeyPreSpinService, SharedMethodsService, BettorLogicApiService, AnalyticsService]
})
export class IceHockeyPreSpinComponent implements OnInit, AfterViewInit, OnDestroy {
    addMatch: boolean;
    americanSlideValue: any = '200';
    betType: any;
    counter = 0;
    count = 0;
    disableIcon: boolean;
    disabledIcon: boolean;
    displayOutcomeId = [];
    fractionSlideValue: any = '2/1';
    isInitialLoad = true;
    isSpin: boolean;
    isLock: boolean;
    interval: any;
    isGotResponse = true;
    isDisable: boolean;
    marketsDisplay = [];
    marketsShownIndex = [];
    marketsFilter = [];
    markets = [];
    marketEventId = [];
    marketId = [];
    nextMarkets: any;
    returns = 10;
    removeInd: any;
    removeIconDisable: boolean;
    removedBet = [];
    randomNumber = [];
    randomBet = [];
    slideValue = 3;
    showErrorText: boolean;
    selectionId = [];
    spinDisable: boolean;
    showErrorMessage: boolean;
    sliderValues = {
        'oddsDecimal': '3.00',
        'oddsFractional': '2/1',
        'oddsAmerican': '200',
    };
    totalOdds: any;
    totalMatches = [];
    private alive = true;
    /**
   *
   * @constructor
   * @param {iceHockeyPreSpinData} spinData - instance of IceHockeyPreSpinService service.
   * @param {KambiService} kambiService - instance of KambiService to access kambi methods.
   * @param {staticWordsData} staticWordsData - instance of Staticwordsdata to access translation words.
   * @param {SharedmethodsService} Sharedmethods - instance of SharedmethodsService to get common functions.
   * @param {analytics} AnalyticsService - instance of AnalyticsService service.
   */
    constructor(private iceHockeyPreSpinData: IceHockeyPreSpinService, public kambiService: KambiService,
        public staticWordsData: StaticWordsService,
        public sharedMethodsService: SharedMethodsService,
        private analytics: AnalyticsService,
        private ngZone: NgZone) {}
    /**
    *
    * This function calls initially and gets data.
    */
    ngOnInit() {
        this.getDataFromService();
    }
    /**
    *
    * This function subscribes and gets data from getData method in IceHockeyPreSpinService.
    */
    getDataFromService() {
        this.iceHockeyPreSpinData.getData()
            .subscribe(resData => {
                if (resData !== null && Array.isArray(resData)) {
                    this.isGotResponse = false;
                    this.markets = resData;
                    for (let i = 0; i < this.markets.length; i++) {
                        this.markets[i]['isLock'] = false;
                        this.markets[i]['isRemove'] = false;
                        if (this.isInitialLoad || this.marketsDisplay.length < 2) {
                            this.getBetsAtInitialLoad(i);
                            this.betCalc();
                        } else {
                            for (let j = 0; j < this.marketsDisplay.length; j++) {
                                if (this.checkOdds(i)) {
                                    this.getBetsAtServiceRefresh(i, j);
                                }
                            }
                            this.betCalc();
                        }
                    }

                    if (this.marketEventId.length < 2) {
                        this.showErrorText = true;
                    }
                    this.isInitialLoad = false;
                }
            });
    }
    /**
*
* This function used to get bets on initial load.
*/
    getBetsAtInitialLoad(i) {
        if (this.checkOdds(i)) {
            if (this.totalMatches.indexOf(this.markets[i].eventId) === -1) {
                this.totalMatches.push(this.markets[i].eventId);
            }
            if (this.marketEventId.indexOf(this.markets[i].eventId) === -1) {
                if (this.marketsDisplay.length < 2) {
                    this.marketEventId.push(this.markets[i].eventId);
                    this.marketId.push(this.markets[i].eventId);
                    this.displayOutcomeId.push(this.markets[i].outcomeId);
                    this.marketsDisplay.push(this.markets[i]);
                    this.returns *= this.markets[i].oddsDecimal;
                    this.totalOdds = this.returns.toFixed(2);
                }
                if (this.marketsDisplay.length === 2) {
                    this.disableIcon = true;
                } else {
                    this.disableIcon = false;
                }
                if (this.marketsDisplay.length === this.totalMatches.length || this.marketsDisplay.length === 6) {
                    this.isDisable = true;
                } else {
                    this.isDisable = false;
                }
            }
        }
    }
    /**
*
* This function used to get bets on service refresh.
*/
    getBetsAtServiceRefresh(i, j) {
        if (this.marketsDisplay.length < 2) {
            this.showErrorText = true;
        } else if (this.marketsDisplay[j].outcomeId === this.markets[i].outcomeId) {
            this.showErrorText = false;
            this.markets[i]['isLock'] = this.marketsDisplay[j]['isLock'];
            this.marketsDisplay[j] = this.markets[i];
            if (this.marketsDisplay[j]['isLock'] === true) {
                this.marketsDisplay[j]['disabledIcon'] = true;
            } else {
                this.marketsDisplay[j]['disabledIcon'] = false;
            }
            if (this.marketsDisplay.length === 2) {
                this.disableIcon = true;
            } else {
                this.disableIcon = false;
            }
            if (this.marketsDisplay.length === this.totalMatches.length || this.marketsDisplay.length === 6) {
                this.isDisable = true;
            } else {
                this.isDisable = false;
            }
        }
    }
    /**
    *
    * This function calls after a component's view.
    */
    ngAfterViewInit() {
        IntervalObservable.create(environment.refreshPre)
            .takeWhile(() => this.alive) // only fires when component is alive
            .subscribe(() => {
                this.getDataFromService();
            });
    }
    /**
    *
    * This function returns the displayed bets count.
    */
    betCalc() {
        if (this.marketsDisplay.length === 3) {
            this.betType = this.staticWordsData.staticWords.Trebles;
        } else if (this.marketsDisplay.length < 2) {
            this.betType = '0' + ' ' + this.staticWordsData.staticWords.folds;
        } else {
            this.betType = this.marketsDisplay.length + ' ' + this.staticWordsData.staticWords.folds;
        }
    }
    /**
    *
    * This function calls when click on spin.
    */
    spin() {
        this.analytics.sendAnalytics(environment.widgetsCategories.iceHockey, 'PreSpinIceHockey.Spin', '');
        const self = this;
        this.isSpin = true;
        this.removeIconDisable = true;
        this.counter = 0;
        this.returns = 10;
        this.marketsFilter = [];
        let unlockIndexs = [];
        const randomDisplay = '';
        this.showErrorMessage = false;
        const randomIndex = '';

        if (this.marketEventId.length < 2) {
            this.isSpin = false;
            return;
        }
        this.sharedMethodsService.getUnlockBetsCount(unlockIndexs, this.marketsDisplay, this.counter, (data) => {
            unlockIndexs = data.unlockIndexs;
            this.marketsDisplay = data.marketsDisplay;
            this.counter = data.counter;
        });
        this.betsPickOnSpin();
        this.spinRandomBetGeneration(randomIndex, unlockIndexs);
        this.sharedMethodsService.compareRandomBetWithDisplayedBet(this.markets, this.marketsDisplay,
            this.randomNumber, randomDisplay, (data) => {
                this.randomNumber = data.randomNumber;
            });
        if (this.marketsDisplay.length === 2) {
            this.disableIcon = true;
        } else {
            this.disableIcon = false;
        }
        this.sharedMethodsService.getBetsUnderSlidevalue(this.marketsDisplay, this.slideValue,
            this.marketEventId, this.displayOutcomeId, (data) => {
                this.marketsDisplay = data.marketsDisplay;
                this.marketEventId = data.marketEventId;
                this.displayOutcomeId = data.displayOutcomeId;
            });
        this.disableAddMatchButton();
        this.spinAnimationTimer();
        this.betCalc();
    }
    /**
    *
    * This function used to get non suspended bets when user clicks on spin.
    */
    betsPickOnSpin() {
        let oddsCheck = 0;
        for (const value of this.markets) {
            value.isSpin = true;
            if (this.checkOdds(oddsCheck)) {
                this.marketsFilter.push(value);
                this.showErrorText = false;
            }
            oddsCheck++;
        }
    }
    /**
    *
    * This function used to generate random bets when user clicks on spin.
    */
    spinRandomBetGeneration(randomIndex, unlockIndexs) {
        for (let i = 0; i < this.counter; i++) {
            if (this.marketsFilter.length !== 0 && this.marketsDisplay.length > 1) {
                this.showErrorText = false;
                let generateNumber = true;
                let loopIndex = 1;
                do {
                    this.nextMarkets = Math.floor(Math.random() * this.marketsFilter.length);
                    let spinId = 0;
                    for (const value of this.markets) {
                        if (this.marketsFilter[this.nextMarkets].eventId === value.eventId &&
                            this.marketsFilter[this.nextMarkets].outcomeId === value.outcomeId) {
                            randomIndex = spinId;
                            break;
                        }
                        spinId++;
                    }
                    this.randomBet = randomIndex;
                    generateNumber = this.getUniqueBets(i, unlockIndexs);
                    loopIndex++;
                    if (loopIndex === 200) {
                        this.showErrorMessage = true;
                        this.removedBet = [];
                        this.randomNumber = [];
                        break;
                    }
                } while (generateNumber);
            } else {
                this.isInitialLoad = true;
            }
        }
    }
    /**
    *
    * This function used to disable add match button.
    */
    disableAddMatchButton() {
        if (this.marketsDisplay.length <= 1) {
            this.showErrorText = true;
        }
        if (this.marketsDisplay.length === this.totalMatches.length || this.marketsDisplay.length === 6) {
            this.isDisable = true;
        } else {
            this.isDisable = false;
        }
    }
    /**
    *
    * This function used for spin animation effect.
    */
    spinAnimationTimer() {
        for (const value of this.marketsDisplay) {
            this.returns *= value.oddsDecimal;
        }
        Observable.timer(500)
            .subscribe(() => {
                let i = 0;
                const spinInt = IntervalObservable.create(1000)
                    .takeWhile(() => this.alive) // only fires when component is alive
                    .subscribe(() => {
                        this.marketsDisplay[i]['isSpin'] = false;
                        i++;
                        if (i === this.marketsDisplay.length) {
                            spinInt.unsubscribe();
                            this.removeIconDisable = false;
                            this.isSpin = false;
                            this.totalOdds = this.returns.toFixed(2);
                        }
                    });
            });
    }
    /**
    *
    * This function used to generate unique bets.
    */
    getUniqueBets(i, unlockIndexs) {
        let genNumber = true;
        if (this.removedBet.indexOf(this.randomBet) === -1 && this.randomNumber.indexOf(this.randomBet) === -1) {
            if (this.marketEventId.indexOf(this.marketsFilter[this.nextMarkets].eventId) === -1 ||
                unlockIndexs.indexOf(this.marketEventId.indexOf(this.marketsFilter[this.nextMarkets].eventId)) !== -1 &&
            this.displayOutcomeId.indexOf(this.marketsFilter[this.nextMarkets].outcomeId) === -1) {
                genNumber = false;
                if (this.marketsFilter !== []) {
                    this.marketsFilter[this.nextMarkets].isSpin = true;
                    this.marketsDisplay[unlockIndexs[i]] = this.marketsFilter[this.nextMarkets];
                    this.marketEventId[unlockIndexs[i]] = this.marketsFilter[this.nextMarkets]['eventId'];
                    this.displayOutcomeId[unlockIndexs[i]] = this.marketsFilter[this.nextMarkets]['outcomeId'];
                }
                if (unlockIndexs.indexOf(this.marketEventId.indexOf(this.marketsFilter[this.nextMarkets].eventId)) !== -1) {
                    unlockIndexs[i] = '';
                }
            }
        } else {
            this.removedBet = [];
            this.randomNumber = [];
        }
        return genNumber;
    }
    /**
    *
    * This function used to lock and unlock bet.
    * @param {any} ind - this variable contain index of the locked or unlocked bet.
    */
    lock(ind) {
        if (!this.isSpin) {
            this.sharedMethodsService.spinLock(this.marketsDisplay, ind, (data) => {
                this.count = data.count;
                this.marketsDisplay = data.marketDisplay;
                this.spinDisable = data.spinDisable;
            });
            if (this.marketsDisplay[ind]['isLock']) {
                this.analytics.sendAnalytics(environment.widgetsCategories.iceHockey, 'PreSpinIceHockey.LockClick', '');
            } else {
                this.analytics.sendAnalytics(environment.widgetsCategories.iceHockey, 'PreSpinIceHockey.UnlockClick ', '');
            }
        }
    }
    /**
    *
    * This function calls when odds slider moves on.
    * @param {any} event - jQuery object.
    */
    slidevalue(event) {
        this.slideValue = event.value;
        if (this.kambiService.oddsFormat === 'fractional') {
            this.kambiService.convertOddsToFractional(event.value, (value) => {
                this.fractionSlideValue = value;
                this.ngZone.runOutsideAngular(() => {
                    this.getSliderValues();
                });
            });
        } else if (this.kambiService.oddsFormat === 'american') {
            this.kambiService.convertOddsToAmerican(event.value, (value) => {
                this.americanSlideValue = value.replace('+', ' ');
                this.ngZone.runOutsideAngular(() => {
                    this.getSliderValues();
                });
            });
        } else {
            this.slideValue = event.value;
            this.getSliderValues();
        }
    }
    /**
    *
    * This function used to get slider values when odds format is changed.
    */
    getSliderValues() {
        this.sliderValues = {
            'oddsDecimal': this.slideValue.toFixed(2),
            'oddsFractional': this.fractionSlideValue,
            'oddsAmerican': this.americanSlideValue,
        };
    }
    /**
    *
    * This function calls when odds slider moves on and used for GA tracking.
    */
    oddsclick() {
        this.analytics.sendAnalytics(environment.widgetsCategories.iceHockey, 'PreSpinIceHockey.OddsBar', '');
    }
    /**
    *
    * This function used to add another bet.
    */
    add() {
        this.analytics.sendAnalytics(environment.widgetsCategories.iceHockey, 'PreSpinIceHockey.AddMatch', '');
        this.returns = 10;
        this.marketsFilter = [];
        this.showErrorMessage = false;
        this.marketsFilter = [];
        const randomIndex = '';
        if (!this.isSpin) {
            const generateNumber = true;
            let oddCheck = 0;
            for (const value of this.markets) {
                if (this.checkOdds(oddCheck)) {
                    this.marketsFilter.push(value);
                }
                oddCheck++;
            }
            this.addMatchRandomBetGeneration(randomIndex, generateNumber);
            if (this.marketsDisplay.length === 2) {
                this.disableIcon = true;
            } else {
                this.disableIcon = false;
            }
            if (this.count === this.marketsDisplay.length) {
                this.spinDisable = true;
            } else {
                this.spinDisable = false;
            }
            for (const value of this.marketsDisplay) {
                this.returns *= value.oddsDecimal;
                this.totalOdds = this.returns.toFixed(2);
            }
        }
        this.isInitialLoad = true;
        this.betCalc();
    }
    /**
    *
    * This function used to generate random bets when user clicks on add match button.
    */
    addMatchRandomBetGeneration(randomIndex, generateNumber) {
        if (this.marketsFilter.length !== 0 && this.marketsDisplay.length > 1) {
            let loopIndex = 1;
            do {
                this.nextMarkets = Math.floor(Math.random() * this.marketsFilter.length);
                let addIndex = 0;
                for (const value of this.markets) {
                    if (this.marketsFilter[this.nextMarkets].eventId === value.eventId &&
                        this.marketsFilter[this.nextMarkets].outcomeId === value.outcomeId) {
                        randomIndex = addIndex;
                        break;
                    }
                    addIndex++;
                }
                this.randomBet = randomIndex;
                if (this.removedBet.indexOf(this.randomBet) === -1) {
                    const marketlength = this.marketsFilter.length;
                    const marketEventId = this.marketEventId.indexOf(this.marketsFilter[this.nextMarkets].eventId);
                    if (this.marketEventId.indexOf(this.marketsFilter[this.nextMarkets].eventId) === -1) {
                        generateNumber = false;
                        if (this.marketsDisplay.length < 6) {
                            this.marketsFilter[this.nextMarkets].isSpin = false;
                            this.marketsDisplay.push(this.marketsFilter[this.nextMarkets]);
                            this.marketEventId.push(this.marketsFilter[this.nextMarkets].eventId);
                        }
                        if (this.marketsDisplay.length === this.totalMatches.length || this.marketsDisplay.length === 6) {
                            this.isDisable = true;
                        } else {
                            this.isDisable = false;
                        }
                    }
                }
                loopIndex++;
                if (loopIndex === 200) {
                    this.showErrorMessage = true;
                    this.removedBet = [];
                    break;
                }
            } while (generateNumber);
        }
    }
    /**
    *
    * This function used to remove the bet.
    * @param {any} ind - this variable contain index of the removed bet.
    */
    isRemove(ind) {
        this.analytics.sendAnalytics(environment.widgetsCategories.iceHockey, 'PreSpinIceHockey.Xclick', '');
        this.returns = 10;
        if (!this.isSpin && this.marketsDisplay[ind]['isLock'] === false && this.marketsDisplay.length > 2) {
            this.removeInd = ind;
            this.sharedMethodsService.remove(this.markets, this.marketsDisplay,
                this.marketEventId, this.totalMatches, ind, this.showErrorMessage, this.removedBet, this.marketsFilter, (data) => {
                    Observable.timer(200)
                        .subscribe(() => {
                            this.removeInd = -1;
                            this.marketsDisplay = data.marketDisplay;
                            this.spinDisable = data.spinDisable;
                            this.count = data.count;
                            this.totalOdds = data.totalodds;
                            this.returns = data.returns;
                            this.isDisable = data.isdisable;
                            this.disableIcon = data.disableIcon;
                            this.marketEventId = data.marketeventid;
                            this.removeInd = data.removeind;
                            this.showErrorMessage = data.errormessage;
                            this.removedBet = data.removedBet;
                            this.marketsFilter = data.marketsFilter;
                            this.betCalc();
                        });
                });
        }
    }
    /**
    *
    * This function is used to check odds condition.
    */
    checkOdds(indexValue) {
        return (this.markets[indexValue].oddsDecimal > 1 && this.markets[indexValue].oddsDecimal <= this.slideValue);
    }
    /**
    *
    * This function is used to add all bets to betslip.
    */
    AddtoBetslip() {
        this.sharedMethodsService.addAllToBetslip(this.marketsDisplay, this.kambiService, (selectedids) => {
            this.analytics.sendAnalytics(environment.widgetsCategories.iceHockey, 'PreSpinIceHockey.AddAllToBetSlip', selectedids);
        });
    }
    /**
    *
    * This function called before destroying  the component.
    */
    ngOnDestroy() {
        this.alive = false;
    }

}
