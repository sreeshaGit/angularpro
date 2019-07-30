import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerProfileResultRoutingModule } from './player-profile-result-routing.module';
import { PlayerProfileResultComponent } from './player-profile-result.component';
//import { PlayerTableComponent } from '../player-table/player-table.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    PlayerProfileResultRoutingModule,
    TableModule,
    MultiSelectModule,
    PaginatorModule,
    SharedModule
  ],
  declarations: [PlayerProfileResultComponent]
})
export class PlayerProfileResultModule { }
