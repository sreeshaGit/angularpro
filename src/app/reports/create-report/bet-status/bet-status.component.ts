/**
 * A class representing a BetStatusComponent and its functionality.
 */
import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import { BetPropensityApiService } from '../../../services/bet-propensity-api.service';
import { CreateReportService } from '../../../services/create-report.service';

@Component({
  selector: 'app-bet-status',
  templateUrl: './bet-status.component.html',
  styleUrls: ['./bet-status.component.scss']
})
export class BetStatusComponent implements OnInit {
  public betStatus: any;
  @Input() reportId: any;
  @Input() queryJson: any;

  sameEvent = [{ "dispalyName": "Yes", "checked": false },
      { "dispalyName": "No", "checked": false }];

  sameMarket = [{ "dispalyName": "Yes", "checked": false },
  { "dispalyName": "No", "checked": false }];

  /**
   * 
   * @param betPropensityApi - {BetPropensityApiService} instance of BetPropensityApiService.
   * @param createReportService - {CreateReportService} instance of CreateReportService.
   */
  constructor(public betPropensityApi: BetPropensityApiService,
              public createReportService: CreateReportService) { }

  ngOnInit() {
      this.getBetStatus();
    //   this.createReportService.betStatus.subscribe(
    //       resData => {
    //           if (resData.length > 0) {
    //               this.betStatus = resData;
    //           } 
    //       }
    //   );

    //   this.createReportService.sameEvent.subscribe(
    //       sameEvent => {              
    //           if (sameEvent.length > 0){
    //               this.sameEvent = sameEvent;
    //           }
    //       }
    //   );

    //   this.createReportService.sameMarket.subscribe(
    //       sameMarket => {             
    //           if (sameMarket.length > 0) {
    //               this.sameMarket = sameMarket;
    //           }
    //       }
    //   );

      for (let event of this.sameEvent){
          for (let data of this.queryJson) {
              if (data.id == "sameEvent" && data.value == true && event.dispalyName == "Yes") {
                  event.checked = true;
              } else if (data.id == "sameEvent" && data.value == false && event.dispalyName == "No"){
                  event.checked = true;
              }
              this.createReportService.sameEvent.next(this.sameEvent);
          }
      }

      for (let market of this.sameMarket) {
          for (let data of this.queryJson) {
              if (data.id == "sameMarket" && data.value == true && market.dispalyName == "Yes") {
                  market.checked = true;
              } else if (data.id == "sameMarket" && data.value == false && market.dispalyName == "No") {
                  market.checked = true;
              }
              this.createReportService.sameMarket.next(this.sameMarket);
          }
      }
    
  }
  /**
   * This method used to get betStatus data.
   */
  getBetStatus() {
      this.betPropensityApi.getBetStatus().subscribe(
          resData => {
              for (let data of resData.betstatus) {
                  if (Object.keys(data).indexOf('checked') == -1) {
                      data.checked = false;
                  }
              }
              this.betStatus = resData.betstatus;          
              this.setBetStatus(this.betStatus);            
          }
      );
  }
  /**
    * This function used to set the default value.
    * @param data
    */
  setBetStatus(data) {
      let arrData = this.queryJson;     
      if (arrData.length > 0) {
          for(let mulRules of arrData){
            if (mulRules.hasOwnProperty('rules')) {              
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < mulRules.rules.length; j++) {
                        if (data[i].id == mulRules.rules[j].id && data[i].display_text == mulRules.rules[j].display_text) {
                            data[i].checked = true;
                        }
                    }
                }
                this.betStatus = data;
                this.createReportService.betStatus.next(this.betStatus);
            } else {               
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < arrData.length; j++) {
                        if (data[i].id == arrData[j].id && data[i].display_text == arrData[j].display_text) {
                            data[i].checked = true;
                        }
                    }
                }
                this.betStatus = data;
                this.createReportService.betStatus.next(this.betStatus);
            }
          }
         
        
      }

  }
/**
 * This method used to update the bet status.
 * @param option 
 * @param event - event
 * @param ind - index
 */
  updateCheckedOptions(option, event, ind) {          
        if(option){
            this.betStatus[ind].checked = !this.betStatus[ind].checked;           
            this.createReportService.betStatus.next(this.betStatus);
        }    
  }
/**
 * This method used to update same event Data
 * @param option 
 * @param event - {event}
 * @param ind - {index}
 */
  updateSameEvent(option, event, ind) {
      if (option) {        
          for (let radio of this.sameEvent) {            
              if (option.dispalyName == radio.dispalyName){
                  radio.checked = !radio.checked;
              } else {
                  radio.checked = false;
              }
          }                 
          this.createReportService.sameEvent.next(this.sameEvent);
      }
  }
/**
 * This method used to update same market Data.
 * @param option 
 * @param event - {event}
 * @param ind - {index}
 */
  updateSameMarket(option, event, ind) {
      if (option) {
          for (let radio of this.sameMarket) {              
              if (option.dispalyName == radio.dispalyName) {
                  radio.checked = !radio.checked;
              } else {
                  radio.checked = false;
              }
          }         
          this.createReportService.sameMarket.next(this.sameMarket);
      }
  }
}
