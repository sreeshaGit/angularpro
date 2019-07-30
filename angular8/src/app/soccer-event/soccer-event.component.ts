import { Component, OnInit,Input } from '@angular/core';
import {WidgetApiService} from '../services/widget-api.service';
@Component({
  selector: 'app-soccer-event',
  templateUrl: './soccer-event.component.html',
  styleUrls: ['./soccer-event.component.scss']
})
export class SoccerEventComponent implements OnInit {
  private alive = true;
  addBetHome :any;
  addBetAway :any;
  data :any; 
  @Input() eventId:any;
  interval: any;
  isCollapse: true;
  h2hData :any;
  homeId :any;
  awayId:any;
  constructor(private widgetApiService:WidgetApiService) { }
  /**
   * This function calls initially.
   */
  ngOnInit() {
    this.isCollapse = true;
    if(this.eventId){
      this.getSoccerEventData(this.eventId);
      this.getHtoHData(this.eventId);
  
    }   
  }
  /**
   * This function calls after a component's view.
   */
  ngAfterViewInit() {
    if (this.alive) {
        this.interval = setInterval(() => {  this.getSoccerEventData(this.eventId); }, 5000);
    }
  }
  /**
   * This function called before destroying  the component.
   */
  ngOnDestroy() {    
    clearInterval(this.interval);
    this.alive = false;
  }
  /**
   * This method used to get the event info of tennis matches.
   * @param eventId 
   */
  getSoccerEventData(eventId){
    this.widgetApiService.getSoccerEvent(eventId).subscribe(
      resData => {       
        if(resData && this.isObjectEmpty(resData)){
          if(resData.hasOwnProperty('matchInfo') && resData['matchInfo'].hasOwnProperty('score') && resData['matchInfo'].score != ''){       
            let val = resData['matchInfo'].score.split('/');                         
              if(val.length > 0){
                resData['matchInfo'].homeTeamScore = (val[0]); 
                resData['matchInfo'].awayTeamScore = (val[1]); 
              }           
          }           
          this.data = resData;
        }     
      },
      error => {
        this.data = null;
      });   
  }
  /**
   * This function used get Head to head data.
   * @param obj 
   */
  getHtoHData(eventId){
    this.widgetApiService.getHtoHData(this.eventId).subscribe(
      resData => {            
        if(resData && this.isObjectEmpty(resData)){
           this.h2hData = resData;
        } else{
          this.h2hData = null
        }    
      },  error => {
        this.h2hData = null;
      }
    );
  }
 /**
   * This method checks whether the object has properties or not.
   * @param obj 
   */
  isObjectEmpty(obj){    
    return Object.getOwnPropertyNames(obj).length >= 1;
  }
  /**
   * This function used for adding bets to betslip.
   */
  addToBetslip(from,data){   
    if(from == 'home'){
      if(this.addBetHome){
        this.addBetHome = false;
      } else {
        this.addBetHome = true;
        if(window &&  window['ngwAjax']){    
          window['ngwAjax'].betSlipAdd(parseInt(data.propId), parseInt(data.position),parseInt(data.oddsDecimal).toFixed(2), parseInt(data.subMarketName), window['betSlipAddComplete'], 'bettorlogicSwitch');        
        }    
      }
      
    } else if(from == 'away'){
      if(this.addBetAway){
        this.addBetAway = false;
      } else {
        this.addBetAway = true;
        if(window &&  window['ngwAjax']){    
          window['ngwAjax'].betSlipAdd(parseInt(data.propId), parseInt(data.position),parseInt(data.oddsDecimal).toFixed(2), parseInt(data.subMarketName), window['betSlipAddComplete'], 'bettorlogicSwitch');   
        }   
      }
    }
  }

  selectedMatchDetails(eventId,from){
    if(from == 'home'){
      if(this.homeId != eventId){
        this.homeId = eventId;
      } else {
        this.homeId = 0;
      }    
    } else if(from == 'away'){
      if(this.awayId != eventId){
        this.awayId = eventId;
      } else{
        this.awayId = 0;
      }
    }
  }

}
