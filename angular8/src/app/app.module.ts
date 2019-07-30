import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {createCustomElement} from '@angular/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeWidgetComponent } from './home-widget/home-widget.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { TennisComponent } from './tennis/tennis.component';
import {WidgetApiService} from './services/widget-api.service';
import {CommonService} from './services/common.service';
import { SoccerComponent } from './soccer/soccer.component';
import { IceHockeyComponent } from './ice-hockey/ice-hockey.component';
import { TennisEventComponent } from './tennis-event/tennis-event.component';
import { SoccerEventComponent } from './soccer-event/soccer-event.component';
import { IceHockeyEventComponent } from './ice-hockey-event/ice-hockey-event.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeWidgetComponent,
    HeaderComponent,
    FooterComponent,
    TennisComponent,
    SoccerComponent,
    IceHockeyComponent,
    TennisEventComponent,
    SoccerEventComponent,
    IceHockeyEventComponent   
  ],
  imports: [
    BrowserModule,   
    AppRoutingModule,
    HttpClientModule
  ],
  entryComponents: [HomeWidgetComponent],
  providers: [WidgetApiService,CommonService],
  bootstrap: [HomeWidgetComponent]
})
export class AppModule { 
  constructor(private injector: Injector) {}

  ngDoBootstrap() {    
    const el = createCustomElement(HomeWidgetComponent, 
                                 { injector: this.injector });
    customElements.define('bl-root', el);
  }
}
