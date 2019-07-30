import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeModule } from './home/home.module';
import { HomeRoutingModule } from './home/home-routing.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { ImportDataModule } from './import-data/import-data.module';
import { ViewReportModule } from './reports/view-report/view-report.module';
import { CreateReportModule } from './reports/create-report/create-report.module';
import { ReportsModule } from './reports/reports/reports.module';
import { BetPropensityApiService } from './services/bet-propensity-api.service';
import { HttpInterceptorService,DEFAULT_TIMEOUT } from "./services/http-interceptor.service";
import { CookieService } from 'ngx-cookie-service';
import { LoginAuthGuard } from './services/login.authGuard';
import { DropdownModule } from 'angular-custom-dropdown';
import { CreateQueryService } from './services/create-query.service';
import { DashboardService } from './services/dashboard.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeService } from './services/home.service';
import { AuthGuard } from './services/auth.guard';
import { CreateReportService } from './services/create-report.service';
import { CreatePlayerProfileService } from './services/create-player-profile.service';
import { CreatePlayerProfileModule } from './player-profiles/create-player-profile/create-player-profile.module';
import { PlayerProfileResultModule } from './player-profiles/player-profile-result/player-profile-result.module';
import { PlayerProfileReportListModule } from './player-profiles/player-profile-report-list/player-profile-report-list.module';
import { ProfileDetailsModule } from './player-profiles/profile-details/profile-details.module';
import { CreateDashboardModule } from './dashboard/create-dashboard/create-dashboard.module';
import { DashboardListModule } from './dashboard/dashboard-list/dashboard-list.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { AboutUsModule } from './about-us/about-us.module';
import { ContactModule } from './contact/contact.module';
import { HelpModule } from './help/help.module';
import { DragulaModule } from 'ng2-dragula';
import {ResizableModule} from 'angular-resizable-element';

@NgModule({
  declarations: [
      AppComponent,                
  ],
  imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
      BrowserAnimationsModule,
      HighchartsChartModule,
      AppRoutingModule,
      SharedModule,    
      HomeModule,     
      LoginModule,  
      ImportDataModule,
      ViewReportModule,
      CreateReportModule,
      ReportsModule,
      RouterModule,
      DropdownModule,
      HttpClientModule,
      CreatePlayerProfileModule,
      PlayerProfileResultModule,
      PlayerProfileReportListModule,
      ProfileDetailsModule,     
      CreateDashboardModule,
      DashboardListModule,
      AboutUsModule,
      ContactModule,
      HelpModule,
      DragulaModule.forRoot(),
      ResizableModule
  ],
  exports: [      
      SignUpModule,
      LoginModule
  ],
  providers: [
      BetPropensityApiService,
   //   HttpInterceptorService,
      AuthGuard,
      CookieService,
      LoginAuthGuard,
      CreateQueryService,
      HomeService,
      CreateReportService,
      CreatePlayerProfileService,
      DashboardService,
      { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi:true },
      [{ provide: DEFAULT_TIMEOUT, useValue: 180000 }],
      { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
