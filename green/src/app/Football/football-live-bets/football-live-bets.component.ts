/**
 * @fileoverview contains all logic for football live bets.
 */
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/takeWhile';

import { FootballLiveBetsService } from './football-live-bets.service';
import { KambiService } from '../../Kambi/Kambi.service';
import { StaticWordsService } from '../../StaticWords/static-words.service';
import { FootballBestBetsService } from '../football-best-bets/football-best-bets.service';
import { environment } from '../../../environments/environment';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { BettorLogicApiService } from '../../shared/bettor-logic-api.service';
import { AnalyticsService } from '../../shared/analytics.service';
declare var ga;

@Component({
  selector: 'app-football-live-bets',
  templateUrl: './football-live-bets.component.html',
  styleUrls: ['./football-live-bets.component.css'],
  providers: [FootballLiveBetsService]
})
export class FootballLiveBetsComponent implements OnInit, OnDestroy {

    bestBetsData: any;
    filterData: any;
    leagueFilterData: any;
    marketFilterData: any;
    selectedLeague = 0;
    selectedMarket = 0;
    showHideData = false;
    liveFootballData: any;
    showError: boolean;
    interval: any;
    selectionId = [];
    isServiceLoader = true;
    private alive = true;
    /**
    *
    * @constructor
    * @param {FootballLiveBetsService} liveBetsData - instance of FootballLiveBetsService service.
    * @param {KambiService} kambiService - instance of KambiService to access kambi methods.
    * @param {Staticwordsdata} staticWordsData - instance of Staticwordsdata to access translation words.
    * @param {LiveoddsComponent} liveOdds - instance of LiveoddsComponent to get live odds.
    * @param {FbBestbetsdata} bestBetsService - instance of FbBestbetsdata to get football pre matches.
    * @param {AnalyticsService} analytics - instance of AnalyticsService to send analytics.
    */
    constructor(private liveBetsData: FootballLiveBetsService,
        private kambiService: KambiService,
        public staticWordsData: StaticWordsService,
        private bestBetsService: FootballBestBetsService,
        private analytics: AnalyticsService) {}

    /**
    *
    * This function calls initially and gets data.
    */
    ngOnInit() {
        this.getDataFromService();
        this.getBestDataFromService();
    }
    /**
    *
    * This function subscribes and gets data from getLiveFootballData method in FootballLiveBetsService.
    */
    getDataFromService() {
        this.liveBetsData.getLiveFootballData()
            .subscribe(resData => {
                this.fetchDataFromLiveBets(resData);
            }
        );
        IntervalObservable.create(environment.refreshLive)
            .takeWhile(() => this.alive) // only fires when component is alive
            .subscribe(() => {
                this.liveBetsData.getLiveFootballData()
                    .subscribe(resData => {
                        this.fetchDataFromLiveBets(resData);
                    });
            });
    }

    /**
    *
    * This function fetches data from service response.
    * @param {Response} resData - instance of response contains data from liveBetsData.
    */
    fetchDataFromLiveBets(resData) {
        if (resData === null || !Array.isArray(resData) || resData.length === 0) {
            this.showError = true;
            this.liveFootballData = [];
        } else if (Array.isArray(resData) && resData.length > 0) {
            this.showError = false;
            this.liveFootballData = resData;
        }
        this.isServiceLoader = false;
    }

    /**
    *
    * This function subscribes and gets data from getBestbetsData method in FbBestbetsdata.
    */
    getBestDataFromService() {
        this.bestBetsService.getBestBetsData(this.selectedLeague, this.selectedMarket)
            .subscribe(resData => {
                this.fetchDataFromBestBets(resData);
            });
        IntervalObservable.create(environment.refreshPre)
            .takeWhile(() => this.alive) // only fires when component is alive
            .subscribe(() => {
                this.bestBetsService.getBestBetsData(this.selectedLeague, this.selectedMarket)
                    .subscribe(resData => {
                        this.fetchDataFromBestBets(resData);
                    });
            });
    }

    /**
    *
    * This function fetches data from service response.
    * @param {Response} resData - instance of response contains data from bestBetsService.
    */
    fetchDataFromBestBets(resData) {
        if (resData === null || resData === '' || resData.Bestbets === null) {
            return;
        }
        if (Array.isArray(resData.Bestbets) && resData.Bestbets.length > 0) {
            this.isServiceLoader = false;
            this.bestBetsData = resData.Bestbets;
        } else if (Array.isArray(resData.Bestbets) && resData.Bestbets.length <= 0) {
            this.isServiceLoader = false;
            this.showHideData = true;
        }
    }

    /**
    *
    * This function is to add single bets.
    * @param {any} outcome - this variable contains outcome to add to betslip.
    */
    addToBetslip(outcome) {
        this.analytics.sendAnalytics('MrGreen.LiveFootball', 'LiveFootball.OddsClick', outcome);
        this.kambiService.addToBetslip([outcome], 'single');
    }

    /**
    *
    * This function is to add all bets to betslip.
    */
    addAllToBetslip() {
        const selectionIds = [];
        for (const data of this.liveFootballData) {
            selectionIds.push(data.SelectionId);
        }
        this.analytics.sendAnalytics('MrGreen.LiveFootball', 'LiveFootball.AddAllToBetSlip', selectionIds.join(','));
        this.kambiService.addToBetslip(selectionIds, 'multi');
    }

    /**
    *
    * This function called before destroying  the component.
    */
    ngOnDestroy() {
        this.alive = false;
    }

}
