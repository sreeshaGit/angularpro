/**
 * @fileoverview  This multibets component contains logic for footballMultibets.
 */
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer';
import { Observable } from 'rxjs/Observable';

import { FootballMultiBetsService } from './football-multi-bets.service';
import { KambiService } from '../../Kambi/Kambi.service';
import { StaticWordsService } from '../../StaticWords/static-words.service';
import { environment } from '../../../environments/environment';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { BettorLogicApiService } from '../../shared/bettor-logic-api.service';
import { AnalyticsService } from '../../shared/analytics.service';
import { SharedMethodsService } from '../../shared/shared-methods.service';

@Component({
  selector: 'app-football-multi-bets',
  templateUrl: './football-multi-bets.component.html',
  styleUrls: ['./football-multi-bets.component.css'],
  providers: [FootballMultiBetsService]
})
export class FootballMultiBetsComponent implements OnInit, AfterViewInit, OnDestroy {
    private alive = true;
    betAmount: any = 10;
    betToReplace = [];
    betAmountMax = 100;
    betAmountTextHide = false;
    displayError = '';
    hideData = false;
    initialOdd = 1;
    invalidBet = false;
    invalidWin = false;
    interval: any;
    isServiceLoader = true;
    multiBetData: any;
    minAmount = 0;
    replaceEventId = '';
    subArrayOfMultiBets: any[];
    totalOdds: any;
    winAmount: any = 100;
    winAmountTextHide = false;
    winAmountMax = 5000;
   /**
    *
    * @param {FootballMultiBetsService} multiBetsData - instance of FootballMultiBetsService service.
    * @param {KambiService} kambiService - instance of KambiService to access kambi methods.
    * @param {Staticwordsdata} staticWordsData - instance of staticWordsData to access translation words.
    * @param {AnalyticsService} analytics - instance of AnalyticsService to send analytics.
    */
    constructor(
        private multiBetsData: FootballMultiBetsService,
        private kambiService: KambiService,
        public staticWordsData: StaticWordsService,
        private analytics: AnalyticsService,
        private sharedMethods: SharedMethodsService
    ) { }
    /**
     * This function calls initially and gets data.
     */
    ngOnInit() {
        this.kambiService.currentLanguage.asObservable().subscribe(() => {
            this.getDataFromService();
        });
    }
    /**
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
    * This function subscribes and gets data from getMultibetData method in FootballMultiBetsService.
    */
    getDataFromService() {
        if ((this.betAmount > this.minAmount && this.betAmount <= this.betAmountMax) &&
            (this.winAmount > this.minAmount && this.winAmount <= this.winAmountMax)) {
            this.multiBetsData.getMultiBetData(this.betAmount, this.winAmount)
                .subscribe((resData) => {
                    this.fetchDataFromLiveBets(resData);
                }
            );
        }
    }
    /**
    * This function fetches data from service response.
    * @param {Response} resData - instance of response contains data from multibets Data.
    */
    fetchDataFromLiveBets(resData) {
        this.isServiceLoader = false;
        if (resData === null || resData === '') {
            return;
        } else if (resData.Message === 'Successed') {
            if (Array.isArray(resData.MultibetItems) && resData.MultibetItems.length > 0) {
                this.multiBetData = resData.MultibetItems;
                this.multiBetData = this.sharedMethods.addOddsKeys(this.multiBetData);
                this.rowFormation(this.multiBetData);
                this.getOddsMultipled(this.multiBetData);
                this.hideData = false;
            }
        } else {
            this.multiBetData = [];
            this.subArrayOfMultiBets = [];
            this.hideData = true;
        }
    }
    /**
    * This Function refers to submit the bet-mount and win-amount.
    */
    submitAmount() {
        this.analytics.sendAnalytics(environment.widgetsCategories.footballMultiBet, 'Multibet.Submit', '');
        this.hideData = false;
        if (this.checkBetAmount(this.betAmount) && this.checkWinAmount(this.winAmount)) {
            this.getDataFromService();
        } else {
            this.subArrayOfMultiBets = [];
        }

    }
    /**
     * This function validates the bet amount.
     * @param betAmount - bet amount value.
     */
    checkBetAmount(betAmount) {
        this.invalidBet = false;
        this.betAmountTextHide = false;
        this.hideData = false;
        if (!betAmount) {
            this.betAmountTextHide = true;
            this.subArrayOfMultiBets = [];
            return false;
        } else if (betAmount <= this.minAmount || betAmount > this.betAmountMax ) {
            this.invalidBet = true;
            this.subArrayOfMultiBets = [];
            return false;
        }
        return true;
    }
    /**
     * This function validates the win amount.
     * @param winAmount- win amount value.
     */
    checkWinAmount(winAmount) {
        this.winAmountTextHide = false;
        this.invalidWin = false;
        this.hideData = false;
       if (!this.winAmount) {
           this.winAmountTextHide = true;
           this.subArrayOfMultiBets = [];
           return false;
       } else if (this.winAmount <= this.minAmount || this.winAmount > this.winAmountMax) {
           this.invalidWin = true;
           this.subArrayOfMultiBets = [];
            return false;
       }
       return true;
    }
    /**
    * Function to multiply odds and get total odds.
    * @param {response} data - instance of response contains Multibetdata
    */
    getOddsMultipled(data) {
        this.initialOdd = 1;
        for (const value of data) {
            const mulOdd: number = value['Odds'];
            this.initialOdd *= mulOdd;
            this.totalOdds = this.initialOdd.toFixed(2);
        }
    }
    /**
    * This function is to validate the bet amount as a number.
    * @param evt - its an keyboard event when keypress on input field
    */
    validateAmount(evt) {
        evt = (evt) ? evt : window.event;
        const charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            // This checks that the key pressed is numerical, the keyCode is between 48 and 57
            return false;
        }
        return true;
    }
    /**
    * This function is to validate number only for bet amount in blur.
    */
    onBlurGetBetValue() {
        this.checkBetAmount(this.betAmount);
        this.analytics.sendAnalytics(environment.widgetsCategories.footballMultiBet, 'Multibet.Bet', this.betAmount);
    }
    /**
    *This function is to validate number only for win amount in blur.
    */
    onBlurWinValue() {
        this.checkWinAmount(this.winAmount);
        this.analytics.sendAnalytics(environment.widgetsCategories.footballMultiBet, 'Multibet.ToWin', this.winAmount);
    }
    /**
    * This function is to add bets with stake.
    */
    addToBetslip() {
        const data = this.multiBetData;
        const selectionIds = [];
        for (const value of data) {
            selectionIds.push(value.SelectionID);
        }
        this.kambiService.addToBetslipStake(selectionIds, 'multi', this.betAmount);
        this.analytics.sendAnalytics(environment.widgetsCategories.footballMultiBet, 'MultiBet.AddAllToBetSlip', selectionIds.join(','));
    }
    /**
     * This function is used to replace a bet.
     * @param {number} multiGroupId - its refer multibet group id of that bet.
     * @param { number } row- it refer row number
     * @param {number} col - it refer column number
     * @param {eventID} -event id of that bet.
     */
    replaceBet(multiGroupId, row, col, eventID) {
        this.analytics.sendAnalytics(environment.widgetsCategories.footballMultiBet, 'Multibet.BetReplacement', eventID);
        const matches = this.multiBetData;
        const marketids = [];
        for (const value of matches) {
            marketids.push(value['MatchID']);
        }
        this.multiBetsData.getSwapedBet(marketids, multiGroupId)
            .subscribe((resData) => {
                if (resData === null || resData === '') {
                    return;
                } else if (resData.Message === 'Successed' && Array.isArray(resData.MultibetItems) &&
                    resData.MultibetItems.length > 0) {
                    this.betToReplace = resData.MultibetItems[0];
                    this.replaceEventId = resData.MultibetItems[0].EventID;
                    this.multiBetData.splice(row * 2 + col, 1, this.betToReplace);
                    this.rowFormation(this.multiBetData);
                    this.getOddsMultipled(this.multiBetData);
                    this.multiBetData = this.sharedMethods.addOddsKeys(this.multiBetData);
                }
            }
        );
    }
    /**
    * Function to form rows in display.
    * @param {response} data - instance of response contains multibetsdata
    */
    rowFormation(data) {
        const mainArrayLength = data.length;
        const itemShow = 2;
        const totPages = Math.ceil(mainArrayLength / itemShow);
        const subArrayOfMultiBets = [];
        for (let i = 0; i < totPages; i++) {
            subArrayOfMultiBets.push(data.slice(i * itemShow, (i + 1) * itemShow));
        }
        this.subArrayOfMultiBets = subArrayOfMultiBets;
    }
    /**
    * This function called before destroying  the component.
    */
    ngOnDestroy() {
        this.alive = false;
    }
}
