import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { LoginAuthGuard } from '../../services/login.authGuard';
const routes: Routes = [{ path: 'reports', component: ReportsComponent, canActivate: [LoginAuthGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
