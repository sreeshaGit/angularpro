import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [{ path: '', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'login_admin', component: LoginComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
