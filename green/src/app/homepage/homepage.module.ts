/**
 * @fileoverview contains all dependencies.
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import 'hammerjs';
import { MdButtonModule, MdCheckboxModule, MdSliderModule, MdSelectModule } from '@angular/material';

import { DialogComponent } from '../Dialog/dialog.component';
import { HomepageComponent } from './homepage.component';
import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageService } from './homepage.service';
import { SharedModule } from '../shared/shared.module';

import { FootballBestBetsComponent } from '../Football/football-best-bets/football-best-bets.component';
import { FootballBestBetsService } from '../Football/football-best-bets/football-best-bets.service';
import { FootballLiveBetsComponent } from '../Football/football-live-bets/football-live-bets.component';
import { FootballMultiBetsComponent } from '../Football/football-multi-bets/football-multi-bets.component';
import { LiveSoccerSpinComponent } from '../Football/live-soccer-spin/live-soccer-spin.component';
import { PreSoccerSpinComponent } from '../Football/pre-soccer-spin/pre-soccer-spin.component';

import { AnalyticsService } from '../shared/analytics.service';
import { BetCardsComponent } from '../Football/football-multi-bets/bet-cards/bet-cards.component';
import { BettorLogicApiService } from '../shared/bettor-logic-api.service';
import { DisplayTennisImageComponent } from './display-tennis-image/display-tennis-image.component';
import { DynamicBannerComponent } from './dynamic-banner/dynamic-banner.component';
import { HighlightsTodayComponent } from './highlights-today/highlights-today.component';
import { HomepageSubMethodsService } from './homepage-sub-methods.service';
import { HomeTennisLiveScoreComponent } from './home-tennis-live-score/home-tennis-live-score.component';
import { HorseFinderComponent } from '../horse-racing/horse-finder/horse-finder.component';
import { HorseFinderService } from '../horse-racing/horse-finder/horse-finder.service';
import { LiveOddsComponent } from '../live-odds/live-odds.component';
import { LiveOddsService } from '../live-odds/live-odds.service';
import { MatchOfTheDayComponent } from './match-of-the-day/match-of-the-day.component';
import { MultibetFooterComponent } from '../Football/football-multi-bets/multibet-footer/multibet-footer.component';
import { ProductCarouselComponent } from './product-carousel/product-carousel.component';
import { RightNowComponent } from './right-now/right-now.component';
import { TodaysAssistComponent } from './todays-assist/todays-assist.component';
import { UpcomingMatchComponent } from './upcoming-match/upcoming-match.component';
import { TennisBestBetsComponent } from '../tennis/tennis-best-bets/tennis-best-bets.component';
import { TennisBestBetsService } from '../tennis/tennis-best-bets/tennis-best-bets.service';
import { TennisLiveBetsComponent } from '../tennis/tennis-live-bets/tennis-live-bets.component';
import { TennisLiveBetsService } from '../tennis/tennis-live-bets/tennis-live-bets.service';
import { TennisLiveScoreComponent } from '../live-score/tennis-live-score/tennis-live-score.component';
import { TennisLiveScoreService } from '../live-score/tennis-live-score/tennis-live-score.service';
import { IceHockeyPreSpinComponent } from '../ice-hockey/ice-hockey-pre-spin/ice-hockey-pre-spin.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        MdButtonModule,
        MdCheckboxModule,
        MdSliderModule,
        MdSelectModule,
        HomepageRoutingModule
    ],
    declarations: [
        BetCardsComponent,
        DialogComponent,
        DisplayTennisImageComponent,
        DynamicBannerComponent,
        FootballBestBetsComponent,
        FootballLiveBetsComponent,
        FootballMultiBetsComponent,
        HighlightsTodayComponent,
        HomepageComponent,
        HomeTennisLiveScoreComponent,
        HorseFinderComponent,
        LiveOddsComponent,
        LiveSoccerSpinComponent,
        MatchOfTheDayComponent,
        MultibetFooterComponent,
        PreSoccerSpinComponent,
        ProductCarouselComponent,
        RightNowComponent,
        TodaysAssistComponent,
        UpcomingMatchComponent,
        TennisBestBetsComponent,
        TennisLiveBetsComponent,
        TennisLiveScoreComponent,
        IceHockeyPreSpinComponent
    ],
    exports: [
        HomepageComponent,
        TodaysAssistComponent
    ],
    providers: [
        HomepageService,
        FootballBestBetsService,
        HorseFinderService,
        HomepageSubMethodsService,
        LiveOddsService,
        TennisBestBetsService,
        TennisLiveBetsService,
        TennisLiveScoreService
    ],
})
export class HomepageModule { }
