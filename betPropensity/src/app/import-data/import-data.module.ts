import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportDataRoutingModule } from './import-data-routing.module';
import { ImportDataComponent } from './import-data.component'
import { ErrorPopUpComponent } from '../alerts/error-pop-up/error-pop-up.component';
//import { SuccessPopUpComponent } from '../alerts/success-pop-up/success-pop-up.component'
import { DialogModule } from '../dialog/dialog.module';
import { AlertsModule } from '../alerts/alerts.module';
@NgModule({
  imports: [
    CommonModule,
    ImportDataRoutingModule,
    DialogModule,
    AlertsModule
  ],
  declarations: [ImportDataComponent, ErrorPopUpComponent]
})
export class ImportDataModule { }
