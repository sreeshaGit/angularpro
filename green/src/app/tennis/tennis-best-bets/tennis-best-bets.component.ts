/**
 * This component contains all the logic for tennis best bets.
 */
import { Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/takeWhile';

import { TennisBestBetsService } from './tennis-best-bets.service';
import { KambiService } from '../../Kambi/Kambi.service';
import { StaticWordsService } from '../../StaticWords/static-words.service';
import { environment } from '../../../environments/environment';
import { AnalyticsService } from '../../shared/analytics.service';
import { SharedMethodsService } from '../../shared/shared-methods.service';
@Component({
  selector: 'app-tennis-best-bets',
  templateUrl: './tennis-best-bets.component.html',
  styleUrls: ['./tennis-best-bets.component.css']
})
export class TennisBestBetsComponent implements OnInit, AfterViewInit, OnDestroy {
    private alive = true;
    tennisBets: any[];
    displayErrorText: boolean;
    /**
     * @constructor
     * @param tennisBestBetsService - TennisBestBetsService instance of TennisBestBetsService.
     * @param kambiService - instance of kambiService to access kambi methods.
     * @param staticWordsData - instance of StaticWordsService to access static words.
     * @param analytics  - instance of AnalyticsService to send analytics.
     */
  constructor(
      private tennisBestBetsService: TennisBestBetsService,
      private kambiService: KambiService,
      public  staticWordsData: StaticWordsService,
      private analytics: AnalyticsService,
      private sharedMethods: SharedMethodsService) { }
  /**
   * This function calls initially and gets data.
   */
  ngOnInit() {
      this.getTennisBestBets();
  }
  /**
   * This function calls after a component's view.
   */
  ngAfterViewInit() {
      IntervalObservable.create(environment.refreshPre)
          .takeWhile(() => this.alive) // only fires when component is alive
          .subscribe(() => {
              this.getTennisBestBets();
          });
  }
  /**
   * This function gets the tennis best bets data.
   */
  getTennisBestBets() {
      this.tennisBestBetsService.getTennisBestBets()
          .subscribe(resData => {
              this.tennisBets = [];
              this.displayErrorText = false;
              if (resData === null || resData === '' || resData.Matches === null) {
                  this.displayErrorText = true;
                  return;
              } else if (this.sharedMethods.validateArray(resData.Matches)) {
                  this.tennisBets = resData.Matches;
              }
          });
  }
  /**
   * This function is to add single bet to betslip.
   * @param {any} outcome - Selection Id of that bet.
   */
  addToBetslip(outcome) {
      this.analytics.sendAnalytics(environment.widgetsCategories.tennisTopbets,
          'TennisTopBets.OddsClick', outcome);
      this.kambiService.addToBetslip([outcome], 'single');
  }
  /**
   * This function is used to add multiple bets to betslip.
   */
  addAllToBetslip() {
      const selectionIds = [];
      for (const betsData of this.tennisBets) {
          selectionIds.push(betsData.outcomeId);
      }
      this.kambiService.addToBetslip(selectionIds, 'multi');
      this.analytics.sendAnalytics(environment.widgetsCategories.tennisTopbets,
          'TennisTopBets.AddAllToBetSlip', selectionIds.join(','));
  }
  /**
   * This function called before destroying  the component.
   */
  ngOnDestroy() {
      this.alive = false;
  }
}
