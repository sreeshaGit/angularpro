import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAuthGuard } from '../../services/login.authGuard';
import { DashboardListComponent } from './dashboard-list.component';

const routes: Routes = [{ path: 'dashboard-list', component: DashboardListComponent, canActivate: [LoginAuthGuard] }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardListRoutingModule { }
