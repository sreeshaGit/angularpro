import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginAuthGuard } from '../../services/login.authGuard';
import { PlayerProfileResultComponent } from './player-profile-result.component';
const routes: Routes = [{ path: 'profile-result', component: PlayerProfileResultComponent, canActivate: [LoginAuthGuard] },
                        { path: 'profile-result/:id', component: PlayerProfileResultComponent, canActivate: [LoginAuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerProfileResultRoutingModule { }
