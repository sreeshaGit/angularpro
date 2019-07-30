import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginAuthGuard } from '../../services/login.authGuard';
import { PlayerProfileReportListComponent } from './player-profile-report-list.component';
const routes: Routes = [{ path: 'profile-list', component: PlayerProfileReportListComponent, canActivate: [LoginAuthGuard] }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerProfileReportListRoutingModule { }
