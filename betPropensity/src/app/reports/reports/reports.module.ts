import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { DropdownModule } from 'angular-custom-dropdown';
import { TableModule } from 'primeng/table';
import { AlertsModule } from '../../alerts/alerts.module';
import { DialogModule } from 'primeng/dialog';
import { ReportCompareComponent } from '../report-compare/report-compare.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
@NgModule({
  imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
    ReportsRoutingModule,
    DropdownModule,
    TableModule,
    DialogModule,
    AlertsModule,
    AngularMultiSelectModule
  ],
  declarations: [ReportsComponent, ReportCompareComponent]
})
export class ReportsModule { }
