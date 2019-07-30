
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FootballMultiBetsComponent } from './football-multi-bets/football-multi-bets.component';
import { FootballLiveBetsComponent } from './football-live-bets/football-live-bets.component';
export const routes: Routes = [

];

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'FbMultiBet', component: FootballMultiBetsComponent },
        { path: 'LiveFootball', component: FootballLiveBetsComponent },
    ])],
    exports: [RouterModule]
})
export class FootballRoutingModule { }
