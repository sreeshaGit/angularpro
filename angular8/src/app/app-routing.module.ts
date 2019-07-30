import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeWidgetComponent} from './home-widget/home-widget.component';
const routes: Routes = [{ path: '',  pathMatch: 'full',component: HomeWidgetComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
