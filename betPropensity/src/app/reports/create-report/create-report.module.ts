import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateReportRoutingModule } from './create-report-routing.module';
import { CreateReportComponent } from './create-report.component';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { ResultViewComponent } from './result-view/result-view.component';
import { PlayerComponent } from './player/player.component';
import { PeriodComponent } from './period/period.component';
import { EventComponent } from './event/event.component';
import { SportComponent } from './sport/sport.component';
import { MarketComponent } from './market/market.component';
import { FrequencyComponent } from './frequency/frequency.component';
import { BetNumberComponent } from './bet-number/bet-number.component';
import { TimePeriodComponent } from './time-period/time-period.component';
import { StakeComponent } from './stake/stake.component';
import { BetTypeComponent } from './bet-type/bet-type.component';
import { OddsComponent } from './odds/odds.component';
import { BetStatusComponent } from './bet-status/bet-status.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { CountriesComponent } from './countries/countries.component';
import { BetFoldComponent } from './bet-fold/bet-fold.component';
import { ReportComparisonComponent } from './report-comparison/report-comparison.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { OutputDataComponent } from './output-data/output-data.component';
import { NumberOfRecordsComponent } from './number-of-records/number-of-records.component';
import { ProfilePopUpComponent } from './profile-pop-up/profile-pop-up.component';
import { DialogModule } from 'primeng/dialog';
import {ListboxModule} from 'primeng/listbox';
import {CalendarModule} from 'primeng/calendar';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      CreateReportRoutingModule,
      AccordionModule,
      AngularMultiSelectModule,
      MultiSelectModule,
      DropdownModule,
      OwlDateTimeModule,
      OwlNativeDateTimeModule,
      DialogModule,
      ListboxModule,
      CalendarModule,
      SharedModule
  ],
  declarations: [
      CreateReportComponent,
      ResultViewComponent,
      PlayerComponent,
      PeriodComponent,
      EventComponent,
      SportComponent,
      MarketComponent,
      FrequencyComponent,
      BetNumberComponent,
      TimePeriodComponent,
      StakeComponent,
      BetTypeComponent,
      OddsComponent,
      BetStatusComponent,
      CountriesComponent,
      BetFoldComponent,
      ReportComparisonComponent,
      OutputDataComponent,
      NumberOfRecordsComponent,
      ProfilePopUpComponent     
  ],
  
})
export class CreateReportModule { }
