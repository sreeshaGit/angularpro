import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnalyticsService } from './shared/analytics.service';
import { BettorLogicApiService } from './shared/bettor-logic-api.service';
import { ConfigParamsService } from './shared/config-params.service';
import { DateFormatService } from './shared/date-format.service';
import { DynamicBannerService } from './homepage/dynamic-banner/dynamic-banner.service';
import { FootballBetsModule } from './Football/Football.module';
import { HomepageModule } from './homepage/homepage.module';
import { HorseRacingModule } from './horse-racing/horse-racing.module';
import { KambiService } from './Kambi/Kambi.service';
import { MdButtonModule, MdCheckboxModule, MdSliderModule, MdSelectModule } from '@angular/material';
import { MrGreenApiService } from './shared/mr-green-api.service';
import { StaticWordsService } from './StaticWords/static-words.service';
import { WindowRef } from './Kambi/Window.service';
import 'hammerjs';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HomepageModule,
        HttpModule,
        MdButtonModule,
        MdCheckboxModule,
        MdSelectModule,
        MdSliderModule
    ],
    exports: [RouterModule],
    providers: [
        AnalyticsService,
        BettorLogicApiService,
        ConfigParamsService,
        DateFormatService,
        DynamicBannerService,
        KambiService,
        MrGreenApiService,
        StaticWordsService,
        WindowRef
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
