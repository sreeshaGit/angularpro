import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewReportComponent } from './view-report.component';
import { LoginAuthGuard } from '../../services/login.authGuard';
const routes: Routes = [{ path: 'view-reports', component: ViewReportComponent, canActivate: [LoginAuthGuard] },
                        { path: 'view-reports/:id', component: ViewReportComponent, canActivate: [LoginAuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewReportRoutingModule { }
