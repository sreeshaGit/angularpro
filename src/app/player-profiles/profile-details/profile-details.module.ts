import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileDetailsRoutingModule } from './profile-details-routing.module';
import { ProfileDetailsComponent } from './profile-details.component';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      ProfileDetailsRoutingModule
  ],
  declarations: [ProfileDetailsComponent]
})
export class ProfileDetailsModule { }
