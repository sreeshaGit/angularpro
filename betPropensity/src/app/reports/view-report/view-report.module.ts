import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewReportRoutingModule } from './view-report-routing.module';
import { ViewReportComponent } from './view-report.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';
import { SharedModule } from '../../shared/shared.module';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { AlertsModule } from '../../alerts/alerts.module';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    ViewReportRoutingModule,
    TableModule,
    MultiSelectModule,
    PaginatorModule,
    SharedModule,
    AngularMultiSelectModule,
    AlertsModule,
    DialogModule    
  ],
  declarations: [ViewReportComponent]
})
export class ViewReportModule { }
