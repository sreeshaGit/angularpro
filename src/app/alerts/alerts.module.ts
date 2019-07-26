import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RemovePopUpComponent } from './remove-pop-up/remove-pop-up.component';
import { SuccessPopUpComponent } from './success-pop-up/success-pop-up.component';
import { MessageEmailComponent } from './message-email/message-email.component';
@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule
  ],
  declarations: [RemovePopUpComponent, SuccessPopUpComponent, MessageEmailComponent],
  exports: [RemovePopUpComponent, SuccessPopUpComponent, MessageEmailComponent]
})
export class AlertsModule { }
