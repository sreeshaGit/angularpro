import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateReportComponent } from './create-report.component';
import { LoginAuthGuard } from '../../services/login.authGuard';
const routes: Routes = [{ path: 'create-report', component: CreateReportComponent, canActivate: [LoginAuthGuard] },
                        { path: 'create-report/:id', component: CreateReportComponent, canActivate: [LoginAuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateReportRoutingModule { }
