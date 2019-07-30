import { Component, OnInit,Input } from '@angular/core';
import {WidgetApiService} from '../services/widget-api.service';
import {CommonService} from '../services/common.service';
@Component({
  selector: 'app-ice-hockey',
  templateUrl: './ice-hockey.component.html',
  styleUrls: ['./ice-hockey.component.scss']
})
export class IceHockeyComponent implements OnInit {
  private alive = true;
  @Input() betsToDisplay:any;
  displayError = false; 
  interval: any;
  iceHockeyBets :any;
  selectedBets = [];
  constructor(private widgetApiService:WidgetApiService, private commonService:CommonService) { }
  /**
   * This function calls initially.
   */
  ngOnInit() {
    this.getIceHockeyBets();
  }
  /**
   * This function calls after a component's view.
   */
  ngAfterViewInit() {
    if (this.alive) {
        this.interval = setInterval(() => { this.getIceHockeyBets() }, 5000);
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
   * This function used to get Ice hockey bets.
   */
  getIceHockeyBets(){
    this.widgetApiService.getIceHockeyBets().subscribe(
        resData => {        
        if(resData && resData.length > 0){
          this.displayError = false;
          for(let data of resData){      
            data.homeScore = []; 
            data.awayScore = [];  
            if(data.score != ''){       
              let val = data.score.split(' ');        
              for(let setVal of val){          
                if(setVal.split(':').length > 0){
                  data.homeScore.push(setVal.split(':')[0]); 
                  data.awayScore.push(setVal.split(':')[1]); 
                }
              }
            }               
          }
          this.iceHockeyBets = resData;        
          this.commonService.betsData.next(this.iceHockeyBets);
        } else {  
         this.iceHockeyBets = [];    
         this.commonService.betsData.next(this.iceHockeyBets);
         this.displayError = true;
        }
      },
      error =>{
        this.iceHockeyBets = [];   
        this.commonService.betsData.next(this.iceHockeyBets); 
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
        window['ngwAjax'].betSlipAdd(parseInt(data.propId), parseInt(data.position),parseInt(data.oddsDecimal).toFixed(2), parseInt(data.subMarketName), window['betSlipAddComplete'], 'bettorlogicSwitch');          
      }    
    } 
    this.commonService.selBets.next(this.selectedBets);  
  
}
}
