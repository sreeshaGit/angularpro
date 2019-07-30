import { Component, OnInit } from '@angular/core';
import {CommonService} from '../services/common.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  winAmt =1;

  stake =10;
  betsData = [];
  selectedbets = [];
  constructor(private commonService:CommonService) { }

  ngOnInit() {
    
    this.commonService.betsData.subscribe(betsData =>{    
      if(betsData.length > 0){
        this.winAmt =1;  
        let bestBets = [];           
        for(let i=0; i < betsData.length; i++){
          if(bestBets.length < 10){
            if(betsData[i].hasOwnProperty('oddsDecimal') && betsData[i]['oddsDecimal'] != 0 && betsData[i]['oddsDecimal'] != ''){
              bestBets.push(betsData[i])           
              this.winAmt = this.winAmt * betsData[i]['oddsDecimal'];          
              this.betsData.push(betsData[i]); 
            }                    
        }        
        }           
      } else {
        this.winAmt = 0;
      }
    });
    this.commonService.selBets.subscribe(selBets => {    
      this.selectedbets = selBets;
    });
  }
  /**
   * This function used for add all bets to betslip.
   */
  addAllToBetslip(betsData){  
    for(let data of betsData){
      if(data.hasOwnProperty('oddsAmerican') && data.oddsAmerican && data.oddsAmerican != null && data.oddsAmerican != ''){
        var betInd =this.selectedbets.indexOf(data['eventId']);        
        if (betInd != -1) {
         // this.selectedbets.splice(betInd, 1);
        } else {
          this.selectedbets.push(data['eventId']);         
          if(window &&  window['ngwAjax']){               
             window['ngwAjax'].betSlipAdd(parseInt(data.propId), parseInt(data.position),parseInt(data.oddsDecimal).toFixed(2), parseInt(data.subMarketName), window['betSlipAddComplete'], 'bettorlogicSwitch');        
          }     
        }
      }     
    }
    
    this.commonService.selBets.next(this.selectedbets);
  }
}
