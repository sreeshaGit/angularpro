import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateDashboardRoutingModule } from './create-dashboard-routing.module';
import { CreateDashboardComponent } from './create-dashboard.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { HighchartsChartModule } from 'highcharts-angular';
import { ReportsLibraryComponent } from '../reports-library/reports-library.component';
import { HighChartsModule } from '../../high-charts/high-charts.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { DragulaModule } from 'ng2-dragula';
import { DragDropModule } from 'primeng/dragdrop';
import { AlertsModule } from '../../alerts/alerts.module';
import { SharedModule } from '../../shared/shared.module';
import {ResizableModule} from 'angular-resizable-element';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    DropdownModule,
    CreateDashboardRoutingModule,
    HighchartsChartModule,
    HighChartsModule,
    MultiSelectModule,
    DragDropModule,
    AlertsModule,
    SharedModule,
    DragulaModule.forRoot(),
    ResizableModule
  ],
  declarations: [CreateDashboardComponent, ReportsLibraryComponent]
})
export class CreateDashboardModule { }
