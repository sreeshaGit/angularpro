import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help.component';
@NgModule({
  imports: [
    CommonModule,
    HelpRoutingModule
  ],
  declarations: [HelpComponent],
  exports: [HelpComponent]
})
export class HelpModule { }
