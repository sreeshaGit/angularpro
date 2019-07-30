import { Component, OnInit,Input } from '@angular/core';
import {WidgetApiService} from '../services/widget-api.service';
import {CommonService} from '../services/common.service';
@Component({
  selector: 'app-tennis',
  templateUrl: './tennis.component.html',
  styleUrls: ['./tennis.component.scss']
})

export class TennisComponent implements OnInit {
  private alive = true;
  awayScore =[];
  @Input() betsToDisplay:any;
  displayError = false; 
  homeScore =[];
  interval: any  
  oddMultiply = 1;
  tennisData = [];
  selectedBets = [];
 // ngwAjax:any;
  constructor(private widgetApiService:WidgetApiService, private commonService:CommonService) { }
  /**
   * This function calls initially.
   */
  ngOnInit() {   
    
    this.getTennisBets();
  }
  /**
   * This function calls after a component's view.
   */
  ngAfterViewInit() {
    if (this.alive) {
        this.interval = setInterval(() => { this.getTennisBets() }, 5000);
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
   * This method gets tennis bets from service.
   */
  getTennisBets(){     
    this.widgetApiService.getTennisBets().subscribe(resData => {   
      if(resData && resData.length > 0){
        this.displayError = false;
        for(let data of resData){                   
          data.homeScore = []; 
          data.awayScore = [];  
          if(data.score != ''){       
            let val = data.score.split(' ');        
            for(let setVal of val){          
              if(setVal.split('-').length > 0){
                data.homeScore.push(setVal.split('-')[0]); 
                data.awayScore.push(setVal.split('-')[1]); 
              }
            }
          }                
        }
        this.tennisData = resData;    
        this.commonService.betsData.next(this.tennisData);
        this.commonService.selBets.subscribe(
          selBets => {        
            this.selectedBets = selBets;
        });
      } else {   
      this.tennisData  =[];  
      this.commonService.betsData.next(this.tennisData); 
      this.displayError = true;
      }
      
    },error =>{
      this.tennisData = [];  
      this.commonService.betsData.next(this.tennisData);  
      this.displayError = true;
    }
    ); 
  }
  /**
   * This function used for adding bets to betslip.
   */
  addToBetslip(data){   
      var betInd = this.selectedBets.indexOf(data.eventId);   
      if(betInd != -1){             
        this.selectedBets.splice(betInd, 1);
      } else {        
        this.selectedBets.push(data.eventId);    
        if(window &&  window['ngwAjax']){    
          window['ngwAjax'].betSlipAdd(parseInt(data.propId), parseInt(data.position),parseInt(data.oddsDecimal).toFixed(2), data.subMarketName, window['betSlipAddComplete'], 'bettorlogicSwitch');   
        }    
      } 
      this.commonService.selBets.next(this.selectedBets);  
    
  }
}
