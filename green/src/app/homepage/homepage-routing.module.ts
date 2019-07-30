/**
 * @fileoverview contains routing to home page.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'Homepage', component: HomepageComponent },
        { path: '', component: HomepageComponent }
    ])],
    exports: [RouterModule]
})
export class HomepageRoutingModule { }
