import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DashboardListRoutingModule } from './dashboard-list-routing.module';
import { DashboardListComponent } from './dashboard-list.component';

import { AlertsModule } from '../../alerts/alerts.module';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  imports: [
    CommonModule,
    DashboardListRoutingModule,
    TableModule,
    DialogModule,
    AlertsModule
  ],
  declarations: [DashboardListComponent]
})
export class DashboardListModule { }
