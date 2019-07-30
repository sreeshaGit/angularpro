import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginAuthGuard } from '../../services/login.authGuard';
import { ProfileDetailsComponent } from './profile-details.component';
const routes: Routes = [{ path: 'profile-details', component: ProfileDetailsComponent, canActivate: [LoginAuthGuard] },
                        { path: 'profile-details/:id', component: ProfileDetailsComponent, canActivate: [LoginAuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileDetailsRoutingModule { }
