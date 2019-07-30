import { Component, OnInit,Input } from '@angular/core';
import {WidgetApiService} from '../services/widget-api.service';

@Component({
  selector: 'app-ice-hockey-event',
  templateUrl: './ice-hockey-event.component.html',
  styleUrls: ['./ice-hockey-event.component.scss']
})
export class IceHockeyEventComponent implements OnInit {
  private alive = true;
  addBetHome :any;
  addBetAway :any;
  data :any; 
  @Input() eventId:any;
  interval: any;
  constructor(private widgetApiService:WidgetApiService ) { }
  /**
   * This function calls initially.
   */
  ngOnInit() {   
    this.getIceHockeyEvent(this.eventId);
  }
  /**
   * This function calls after a component's view.
   */
  ngAfterViewInit() {
    if (this.alive) {
        this.interval = setInterval(() => {  this.getIceHockeyEvent(this.eventId); }, 5000);
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
   * This function used to get the data of IceHockey event details.
   * @param eventId 
   */
  getIceHockeyEvent(eventId){
    this.widgetApiService.getIceHockeyEvent(eventId).subscribe(resData => {     
      if(resData && this.isObjectEmpty(resData) && this.isObjectEmpty(resData['matchInfo'])){    
          if(resData.hasOwnProperty('matchInfo') && resData['matchInfo'].hasOwnProperty('score') && resData['matchInfo'].score != ''){       
            let val = resData['matchInfo'].score.split(' ');        
            for(let setVal of val){          
              if(setVal.split(':').length > 0){
                resData['matchInfo'].homeTeamScore = (setVal.split(':')[0]); 
                resData['matchInfo'].awayTeamScore = (setVal.split(':')[1]); 
              }
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

}
