import { Component, OnInit,Input } from '@angular/core';
import {WidgetApiService} from '../services/widget-api.service';
import {CommonService} from '../services/common.service';

@Component({
  selector: 'app-soccer',
  templateUrl: './soccer.component.html',
  styleUrls: ['./soccer.component.scss']
})

export class SoccerComponent implements OnInit {
  private alive = true;
  displayError = false; 
  footballData =[];
  interval: any  
  selectedBets =[];
  @Input() betsToDisplay:any;
  
  constructor(private widgetApiService:WidgetApiService, private commonService:CommonService) { }
  /**
   * This function calls initially.
   */
  ngOnInit() {
    this.getSoccerBets();
  }
  /**
   * This function calls after a component's view.
   */
  ngAfterViewInit() {
    if (this.alive) {
        this.interval = setInterval(() => { this.getSoccerBets() }, 5000);
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
   * This methos used to get the best bets of soccer.
   */
  getSoccerBets(){
    this.widgetApiService.getSoccerBets().subscribe(resData => {         
      if(resData && resData.length > 0){
        this.displayError = false; 
        for(let data of resData){      
          data.homeScore = []; 
          data.awayScore = [];  
          if(data.score != ''){       
            let val = data.score.split('/');                           
              if(val.length > 0){
                data.homeScore.push(val[0]); 
                data.awayScore.push(val[1]); 
              }           
          }               
        }     
        this.footballData = resData;             
        this.commonService.betsData.next(this.footballData);      
        this.commonService.selBets.subscribe(
          selBets => {         
            this.selectedBets = selBets;
        });
      } else {
        this.footballData = [];
        this.displayError = true; 
        this.commonService.betsData.next(this.footballData); 
      }      
    },
    error => {     
      this.footballData = []; 
      this.commonService.betsData.next(this.footballData);    
      this.displayError = true;
    });
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
        window['ngwAjax'].betSlipAdd(parseInt(data.propId), parseInt(data.position),parseInt(data.oddsDecimal).toFixed(2), parseInt(data.subMarketName), window['betSlipAddComplete'], 'bettorlogicSwitch');   
      // window['ngwAjax'].betSlipAdd(3150953, 1,3.2, 52.5, window['betSlipAddComplete'], 'bettorlogicSwitch');       
      } 
    }
    this.commonService.selBets.next(this.selectedBets);  
  }
}
