import { NgModule, ModuleWithProviders  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FootballRoutingModule } from './Football-routing.module';

import { FootballMultiBetsService } from './football-multi-bets/football-multi-bets.service';
import { FootballLiveBetsService } from './football-live-bets/football-live-bets.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FootballRoutingModule,
    ],
    declarations: [],
    providers: [FootballMultiBetsService, FootballLiveBetsService],
    exports: []
})
export class FootballBetsModule {
}
