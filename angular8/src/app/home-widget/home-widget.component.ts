import { Component, OnInit } from '@angular/core';
import {CommonService} from '../services/common.service';
import {WidgetApiService} from '../services/widget-api.service';
@Component({
  selector: 'bl-root',
  templateUrl: './home-widget.component.html',
  styleUrls: ['./home-widget.component.scss']
})
export class HomeWidgetComponent implements OnInit {
  sportSel:any;
  betsToDisplay:any;
  eventId:any;
  eventSport :any;
  constructor(private commonService:CommonService, private widgetApiService:WidgetApiService) { } 
  ngOnInit() {
  //  this.eventId = 11125;
  console.log(window['gvGameID'],window['SportName'])
    this.commonService.sport.subscribe(sport => {     
      this.sportSel = sport;
    });

    this.commonService.eventId.subscribe(eventId => {  
      this.eventId = eventId;    
    });
    
    this.commonService.sportDisplay.subscribe(sport => {     
      this.eventSport = sport;
    });

    this.widgetApiService.getConfig().subscribe(
      config =>{   
        this.betsToDisplay =  config.betsDisplayed;       
      }
    );
  }
  

}
