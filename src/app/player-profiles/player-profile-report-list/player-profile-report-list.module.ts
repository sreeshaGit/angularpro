import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

import { PlayerProfileReportListRoutingModule } from './player-profile-report-list-routing.module';
import { PlayerProfileReportListComponent } from './player-profile-report-list.component';
import { AlertsModule } from '../../alerts/alerts.module';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  imports: [
    CommonModule,
    PlayerProfileReportListRoutingModule,
    TableModule,
    DialogModule,
    AlertsModule
  ],
  declarations: [PlayerProfileReportListComponent]
})
export class PlayerProfileReportListModule { }
