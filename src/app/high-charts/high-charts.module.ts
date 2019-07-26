import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { TableModule } from 'primeng/table';
import { TableComponent } from './table/table.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { SharedModule } from '../shared/shared.module';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
  imports: [
    CommonModule,
    HighchartsChartModule,
    TableModule,
    SharedModule,
    PaginatorModule
  ],
  declarations: [TableComponent, LineChartComponent],
  exports: [TableComponent, LineChartComponent]
})
export class HighChartsModule { }
