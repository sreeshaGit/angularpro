import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module'
import { DialogModule } from '../dialog/dialog.module';

@NgModule({
  imports: [
    CommonModule,
      HomeRoutingModule,
      SharedModule,
      DialogModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
