/**
 * @fileoverview contains all common functions for Soccer pre spin and Soccer live spin.
 */
import { Injectable } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer';

@Injectable()
export class SharedMethodsService {
    count = 0;
    disableIcon: boolean;
    isDisable: boolean;
    returns = 10;
    removeInd: any;
    spinDisable: boolean;
    selectionId = [];
    totalOdds: any;
    constructor() { }
    /**
    *
    * This common function is used to lock and unlock the bets.
    * @param {Data} marketDisplay - instance of Data contains data from soccer spin.
    * @param {index} - instance of index contains index of bet.
    */
    spinLock(marketDisplay, index, callback: (data) => void) {
        marketDisplay[index]['isLock'] = !marketDisplay[index]['isLock'];
        if (marketDisplay[index]['isLock'] === true) {
            marketDisplay[index]['disabledIcon'] = true;
            this.count += 1;
        } else {
            marketDisplay[index]['disabledIcon'] = false;
            this.count -= 1;
        }
        if (this.count === marketDisplay.length) {
            this.spinDisable = true;
        } else {
            this.spinDisable = false;
        }
        callback({
            marketDisplay: marketDisplay,
            spinDisable: this.spinDisable,
            count: this.count
        });
    }
    /**
    *
    * This common function is used to remove the bets.
    * @param {markets} - instance of markets contains data from soccer spin.
    * @param {Data} marketDisplay - instance of Data contains data from soccer spin.
    * @param {marketeventid} - instance of marketeventid contains eventid of bet.
    * @param {totalmatches} - instance of totalmatches contains array of bets.
    * @param {index} - instance of index contains index of bet.
    * @param {errorMessage} - instance of errorMessage contains boolean value.
    */
    remove(markets, marketDisplay, marketeventid, totalmatches, index, errorMessage, removedBet, marketsFilter, callback: (data) => void) {
        this.returns = 10;
        let removedIndex;
        markets[index]['isRemove'] = true;
        if (marketDisplay.length > 2) {
            this.removeInd = index;
            Observable.timer(500)
                .subscribe(() => {
                    this.removeInd = -1;
                    let removeId = 0;
                    for (const value of markets) {
                        if (marketDisplay[index].EventId === value.EventId &&
                            marketDisplay[index].OutcomeId === value.OutcomeId) {
                            removedIndex = removeId;
                            break;
                        }
                        removeId++;
                    }
                    removedBet.push(removedIndex);
                    if (marketsFilter.length - 2 === removedBet.length) {
                        removedBet = [];
                    }
                    marketDisplay[index]['isLock'] = false;
                    marketDisplay.splice(index, 1);
                    marketeventid.splice(index, 1);
                    errorMessage = false;
                    if (marketDisplay.length === 2) {
                        this.disableIcon = true;
                    } else {
                        this.disableIcon = false;
                    }
                    if (marketDisplay.length === totalmatches.length) {
                        this.isDisable = true;
                    } else if (marketDisplay.length === 6) {
                        this.isDisable = true;
                    } else {
                        this.isDisable = false;
                    }
                    if (this.count === marketDisplay.length) {
                        this.spinDisable = true;
                    } else {
                        this.spinDisable = false;
                    }
                    for (const value of marketDisplay) {
                        this.returns *= value.Odds;
                        this.totalOdds = this.returns.toFixed(2);
                    }
                    callback({
                        marketDisplay: marketDisplay,
                        spinDisable: this.spinDisable,
                        count: this.count,
                        totalodds: this.totalOdds,
                        returns: this.returns,
                        isdisable: this.isDisable,
                        disableIcon: this.disableIcon,
                        marketeventid: marketeventid,
                        removeind: this.removeInd,
                        errormessage: errorMessage,
                        removedBet: removedBet,
                        marketsFilter: marketsFilter
                    });
                });
        }
    }
    /**
    *
    * This common function used to get count of unlocked bets.
    * @param {Data} marketDisplay - instance of Data contains data from soccer spin.
    * @param {unlockIndexs} - instance of unlockIndexs contains index of unlock bets.
    * @param {counter} - instance of counter contains count of unlock bets.
    */
    getUnlockBetsCount(unlockIndexs, marketsDisplay, counter, callback: (data) => void) {
        let displayInd = 0;
        for (const value of marketsDisplay) {
            if (value['isLock'] === false) {
                value['isSpin'] = true;
                counter += 1;
                unlockIndexs.push(displayInd);
            }
            displayInd++;
        }
        callback({
            unlockIndexs: unlockIndexs,
            marketsDisplay: marketsDisplay,
            counter: counter
        });
    }
    /**
    *
    * This common function used to splice bets which are greater than slider value when slider value decreased.
    * @param {Data} marketDisplay - instance of Data contains data from soccer spin.
    * @param {slideValue} - instance of slideValue contains sliderValue.
    * @param {Data} marketEventId - instance of Data contains data from soccer spin.
    * @param {Data} displayOutcomeId - instance of Data contains data from soccer spin.
    */
    getBetsUnderSlidevalue(marketsDisplay, slideValue, marketEventId, displayOutcomeId, callback: (data) => void) {
        for (let i = 0; i < marketsDisplay.length; i++) {
            if (marketsDisplay.length >= 2) {
                if (marketsDisplay[i]['isLock'] === false) {
                    if (marketsDisplay[i].Odds > slideValue) {
                        marketsDisplay.splice(i, 1);
                        marketEventId.splice(i, 1);
                        displayOutcomeId.splice(i, 1);
                        i--;
                    }
                }
            }
        }
        callback({
            marketsDisplay: marketsDisplay,
            marketEventId: marketEventId,
            displayOutcomeId: displayOutcomeId
        });
    }
    /**
    *
    * This common function used to compare random generated bets with dispalyed bets.
    * @param {markets} - instance of markets contains data from soccer spin.
    * @param {Data} marketDisplay - instance of Data contains data from soccer spin.
    * @param {randomNumber} - instance of randomNumber contains index of random generated bet.
    * @param {randomDisplay} - instance of randomDisplay contains index of displayed bets.
    */
    compareRandomBetWithDisplayedBet(markets, marketDisplay, randomNumber, randomDisplay, callback: (data) => void) {
        let spinInd = 0;
        for (const value of markets) {
            for (const display of marketDisplay) {
                if (value.EventId === display.EventId &&
                    value.OutcomeId === display.OutcomeId) {
                    randomDisplay = spinInd;
                    randomNumber.push(randomDisplay);
                    break;
                }
            }
            spinInd++;
        }
        callback({
            randomNumber: randomNumber
        });
    }
    /**
    *
    * This function is used to add all bets to betslip.
    * @param {Data} marketDisplay - instance of Data contains data from soccer spin.
    * @param {KambiService} kambiService - instance of KambiService to access kambi methods.
    */
    addAllToBetslip(marketDisplay, kambiService, callback: (selectedids) => void) {
        const selectionids = [];
        let selectedids = '';
        if (marketDisplay.length >= 2) {
            for (const marketValue of marketDisplay) {
                selectionids.push(marketValue.OutcomeId);
            }
        }
        this.selectionId = selectionids;
        selectedids = selectionids.join(',');
        kambiService.addToBetslip(this.selectionId, 'multi');
        callback(selectedids);
    }
    /**
     * this function will validate given data
     * @param {array} - data this variable contain array
     */
    validateArray(data) {
        return (data !== null && Array.isArray(data) && data.length > 0);
    }
    /**
     * This function used to add odds Keys for different types.
     * @param data its an object array.
     */
    addOddsKeys(data) {
        for (const item of data) {
            item.oddsDecimal = item.Odds;
            item.oddsFractional = item.Fractional;
            item.oddsAmerican = item.AmericanOdds;
        }
        return data;
    }
}

