import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginAuthGuard } from '../../services/login.authGuard';
import { CreatePlayerProfileComponent } from './create-player-profile.component';
const routes: Routes = [{ path: 'create-profile', component: CreatePlayerProfileComponent, canActivate: [LoginAuthGuard] },
                        { path: 'create-profile/:id', component: CreatePlayerProfileComponent, canActivate: [LoginAuthGuard] }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePlayerProfileRoutingModule { }
