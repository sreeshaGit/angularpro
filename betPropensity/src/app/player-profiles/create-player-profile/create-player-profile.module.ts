import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { CreatePlayerProfileRoutingModule } from './create-player-profile-routing.module';
import { PlayerProfileSelectionComponent } from './player-profile-selection/player-profile-selection.component';
import { ProfileTypeComponent } from './profile-type/profile-type.component';
import { CreatePlayerProfileComponent } from './create-player-profile.component';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      AngularMultiSelectModule,
      CreatePlayerProfileRoutingModule,
      SharedModule
  ],
  declarations: [
      PlayerProfileSelectionComponent,
      ProfileTypeComponent,
      CreatePlayerProfileComponent
  ]
})
export class CreatePlayerProfileModule { }
