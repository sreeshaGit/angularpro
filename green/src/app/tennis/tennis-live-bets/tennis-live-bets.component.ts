/**
 * @fileoverview contains all logic for tennis live bets.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/takeWhile';

import { TennisLiveBetsService } from './tennis-live-bets.service';
import { KambiService } from '../../Kambi/Kambi.service';
import { StaticWordsService } from '../../StaticWords/static-words.service';
import { environment } from '../../../environments/environment';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { BettorLogicApiService } from '../../shared/bettor-logic-api.service';
import { AnalyticsService } from '../../shared/analytics.service';
import { SharedMethodsService } from '../../shared/shared-methods.service';
@Component({
  selector: 'app-tennis-live-bets',
  templateUrl: './tennis-live-bets.component.html',
  styleUrls: ['./tennis-live-bets.component.css']
})
export class TennisLiveBetsComponent implements OnInit, OnDestroy {
    private alive = true;
    errorText: boolean;
    liveBetsData: any[];
    preErrorText: boolean;
    tennisBets: any[];
    /**
     *
     * @param tennisLiveLogic {TennisLiveBetsService} - instance of TennisLiveBetsService.
     * @param kambiService {KambiService} - instance of KambiService to access kambi methods.
     * @param staticWordsData {StaticWordsService} - instance of StaticWordsService to access static data.
     * @param analytics {AnalyticsService} - instance of AnalyticsService to send analytics.
     */
    constructor(private tennisLiveLogic: TennisLiveBetsService,
                private kambiService: KambiService,
                public staticWordsData: StaticWordsService,
                private analytics: AnalyticsService,
                private sharedMethods: SharedMethodsService) { }
    /**
     * This function calls initially and gets data.
     */
    ngOnInit() {
        this.getTennisLiveLogic();
        this.getTennisBestBets();
    }
    /**
     * This function subscribes and gets data from getTennisLiveLogic method in TennisLiveBetsService.
     */
    getTennisLiveLogic() {
        this.getTennisLiveLogicData();
        IntervalObservable.create(environment.refreshLive)
            .takeWhile(() => this.alive) // only fires when component is alive
            .subscribe(() => {
                this.getTennisLiveLogicData();
            });
    }
    /**
     * This function subscribes and gets data from getTennisLiveLogic method in TennisLiveBetsService.
     */
    getTennisLiveLogicData() {
        this.tennisLiveLogic.getTennisLiveLogic()
            .subscribe(resData => {
                if (this.sharedMethods.validateArray(resData)) {
                    this.errorText = false;
                    this.liveBetsData = resData;
                } else {
                    this.errorText = true;
                    this.liveBetsData = [];
                }
            });
    }
    /**
     * This function gets the tennis best bets data.
     */
    getTennisBestBets() {
        this.getTennisBestBetsData();
        IntervalObservable.create(environment.refreshPre)
            .takeWhile(() => this.alive) // only fires when component is alive
            .subscribe(() => {
                this.getTennisBestBetsData();
            });
    }
    /**
     * This function gets the tennis best bets data from r.
     */
    getTennisBestBetsData() {
        this.tennisLiveLogic.getTennisBestBets()
            .subscribe(resData => {
                this.tennisBets = [];
                if (resData === null || resData === '' || resData.Matches === null) {
                    this.preErrorText = true;
                    return;
                } else if (this.sharedMethods.validateArray(resData.Matches)) {
                    this.preErrorText = false;
                    this.tennisBets = resData.Matches;
                }
            });
    }
    /**
     *
     * This function is to add single bets.
     * @param {any} outcome - this variable contains outcome to add to betslip.
     */
    addToBetslip(outcome) {
        this.analytics.sendAnalytics(environment.widgetsCategories.liveTennis, 'LiveTennis.OddsClick', outcome);
        this.kambiService.addToBetslip([outcome], 'single');
    }

    /**
     * This function is to add all bets to betslip.
     */
    addAllToBetslip() {
        const selectionIds = [];
        for (const data of this.liveBetsData) {
            selectionIds.push(data.outcomeId);
        }
        this.analytics.sendAnalytics(environment.widgetsCategories.liveTennis, 'LiveTennis.AddAllToBetSlip', selectionIds.join(','));
        this.kambiService.addToBetslip(selectionIds, 'multi');
    }

    /**
     * This function called before destroying  the component.
     */
    ngOnDestroy() {
        this.alive = false;
    }
}
