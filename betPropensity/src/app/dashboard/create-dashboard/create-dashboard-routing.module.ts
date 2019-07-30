import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateDashboardComponent } from './create-dashboard.component';
import { LoginAuthGuard } from '../../services/login.authGuard';

const routes: Routes = [{ path: 'create-dashboard', component: CreateDashboardComponent, canActivate: [LoginAuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateDashboardRoutingModule { }
