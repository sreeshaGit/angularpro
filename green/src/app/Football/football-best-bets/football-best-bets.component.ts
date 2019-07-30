/**
 * @fileoverview contains all logic for football best bets.
 */

import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/takeWhile';

import { FootballBestBetsService } from './football-best-bets.service';
import { KambiService } from '../../Kambi/Kambi.service';
import { StaticWordsService } from '../../StaticWords/static-words.service';
import { environment } from '../../../environments/environment';
import { AnalyticsService } from '../../shared/analytics.service';
@Component({
    selector: 'app-football-best-bets',
    templateUrl: './football-best-bets.component.html',
    styleUrls: ['./football-best-bets.component.css']
})
export class FootballBestBetsComponent implements OnInit, OnDestroy {
    bestBetsData: any;
    filterData: any;
    leagueFilterData: any;
    marketFilterData: any;
    selectedLeague = 0;
    selectedMarket = 0;
    hideData = false;
    private alive = true;
    /**
    *
    * @constructor
    * @param {FootballBestBetsService} bestBetsDataService - instance of FbBestbetsdata service.
    * @param {KambiService} kambiService - instance of KambiService to access kambi methods.
    * @param {Staticwordsdata} staticWordsData - instance of Staticwordsdata to access translation words.
    * @param {AnalyticsService} analytics - instance of AnalyticsService to send analytics.
    */
    constructor(
        private bestBetsDataService: FootballBestBetsService,
        private kambiService: KambiService,
        public staticWordsData: StaticWordsService,
        private analytics: AnalyticsService
    ) { }

    /**
    * This function calls initially and gets data.
    */
    ngOnInit() {
        this.kambiService.currentLanguage.asObservable().subscribe(() => {
            this.getDataFromService();
            this.getDataForFilter();
        });
    }
    /**
    * This function gets latest data from service continuously.
    */
    getDataFromService() {
        this.getResponseFromService(this.selectedLeague, this.selectedMarket);
        IntervalObservable.create(environment.refreshPre)
        .takeWhile(() => this.alive) // only fires when component is alive
        .subscribe(() => {
            this.getResponseFromService(this.selectedLeague, this.selectedMarket);
        });
    }
    /**
     * This function subscribes to service api  and gets data of best bets with corresponding leagueId and marketId.
     * @param selectedLeague - selectedLeagueId of that particular league.
     * @param selectedMarket - selectedMarketId of that particular market.
    */
    getResponseFromService(selectedLeague, selectedMarket) {
        this.bestBetsDataService.getBestBetsData(selectedLeague, selectedMarket).subscribe(resData => {
            if (resData === null || resData === '' || resData.Bestbets === null) {
                return;
            }
            if (Array.isArray(resData.Bestbets) && resData.Bestbets.length > 0) {
                this.bestBetsData = resData.Bestbets;
                this.hideData = false;
            } else if (Array.isArray(resData.Bestbets) && resData.Bestbets.length <= 0) {
                this.hideData = true;
                this.bestBetsData = [];
            }
        });
    }
    /**
     *  This function subscribes and gets data of filters.
     */
    getDataForFilter() {
        this.bestBetsDataService.getLeagueMarketFilterData()
            .subscribe(resData => {
                this.filterData = resData;
                if (Array.isArray(this.filterData) && this.filterData.length > 0 ) {
                    this.leagueFilterData = this.filterData[0].Leagues;
                    this.marketFilterData = this.filterData[0].Markets;
                }
            });
    }

    /**
     * This gets the selected League id from the dropdown and updates the service api.
     * @param {any} selectedLeague - selected LeagueId which is selected from dropdown.
     */
    selectLeague(selectedLeague) {
        let leagueId;
        leagueId = parseInt(selectedLeague, 10);
        const selcLeague = this.leagueFilterData.filter(function (d, index) {
            if (d.LeagueId === leagueId) {
                return true;
            }
        });
        if (Array.isArray(selcLeague) && selcLeague.length > 0) {
            this.analytics.sendAnalytics(environment.widgetsCategories.footballTopAssist,
                'FootballTopBets.AllLeagues', selcLeague[0].LeagueName);
        }
        this.selectedLeague = selectedLeague;
        this.getResponseFromService(this.selectedLeague, this.selectedMarket);
    }
    /**
    * This gets the selected Market id from the dropdown and updates the service api.
    * @param {number} selectedMarket - selected marketId which is selected from dropdown.
    */
    selectMarket(selectedMarket) {
        const marketId = parseInt(selectedMarket, 10);
        const selcMarket = this.marketFilterData.filter(function (d, index) {
            if (d.MarketId === marketId) {
                return true;
            }
        });
        if (Array.isArray(selcMarket) && selcMarket.length > 0) {
            this.analytics.sendAnalytics(environment.widgetsCategories.footballTopAssist,
                'FootballTopBets.AllMarkets', selcMarket[0].MarketName);
        }
        this.selectedMarket = selectedMarket;
        this.getResponseFromService(this.selectedLeague, this.selectedMarket);
    }
   /**
    * This function is to add single bet to betslip.
    *  @param {any} outcome - Selection Id of that bet.
    */
    addToBetslip(outcome) {
        this.analytics.sendAnalytics(environment.widgetsCategories.footballTopAssist, 'FootballTopBets.OddsClick', outcome);
        this.kambiService.addToBetslip([outcome], 'single');
    }
    /**
     *This function is used to add multiple bets to betslip.
     */
    addAllToBetslip() {
        const selectionIds = [];
        for (const betsData of this.bestBetsData) {
            selectionIds.push(betsData.SelectionId);
        }
        this.kambiService.addToBetslip(selectionIds, 'multi');
        this.analytics.sendAnalytics(environment.widgetsCategories.footballTopAssist,
            'FootballTopBets.AddAllToBetSlip', selectionIds.join(','));
    }
    /**
     *This function called before destroying  the component.
     */
    ngOnDestroy() {
        this.alive = false;
    }

}
