import { Component, OnInit,Input } from '@angular/core';
import {WidgetApiService} from '../services/widget-api.service';
@Component({
  selector: 'app-tennis-event',
  templateUrl: './tennis-event.component.html',
  styleUrls: ['./tennis-event.component.scss']
})
export class TennisEventComponent implements OnInit {
  private alive = true;
  addBetHome :any;
  addBetAway :any;
  data :any; 
  @Input() eventId:any;
  interval: any;

  constructor(private widgetApiService:WidgetApiService) { }
  /**
   * This function calls initially.
   */
  ngOnInit() {
    this.getTennisEventData(this.eventId);

  }
  /**
   * This function calls after a component's view.
   */
  ngAfterViewInit() {
    if (this.alive) {
       this.interval = setInterval(() => {  this.getTennisEventData(this.eventId); }, 5000);
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
  getTennisEventData(eventId){
    this.widgetApiService.getTennisEvent(eventId).subscribe(
      resData => {        
        if(resData && this.isObjectEmpty(resData)){
          this.data = resData;
          if(resData['matchInfo'] && this.isObjectEmpty(resData['matchInfo'])){
            resData['matchInfo']['homeScore'] =[];
            resData['matchInfo']['awayScore'] =[];
              if(resData['matchInfo'].hasOwnProperty('score')){               
                if(resData['matchInfo']['score'] != ''){       
                  let val = resData['matchInfo']['score'].split(' ');        
                  for(let setVal of val){          
                    if(setVal.split('-').length > 0){
                      resData['matchInfo']['homeScore'].push(setVal.split('-')[0]); 
                      resData['matchInfo']['awayScore'].push(setVal.split('-')[1]); 
                    }
                  }
                }               
              }             
          }
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
