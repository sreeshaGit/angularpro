/**
 *  A class representing a OddsComponent and its functionality.
 */
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';

import { BetPropensityApiService } from '../../../services/bet-propensity-api.service';
import { CreateReportService } from '../../../services/create-report.service';


@Component({
  selector: 'app-odds',
  templateUrl: './odds.component.html',
  styleUrls: ['./odds.component.scss']
})
export class OddsComponent implements OnInit {
  private alive = true;
  public oddsBand: any;
  public oddsRange: any;
  @Input() reportId:any;
  @Input() queryJson: any;
/**
 * 
 * @param betPropensityApi  - {BetPropensityApiService} instance of BetPropensityApiService.
 * @param createReportService - {CreateReportService} instance of CreateReportService.
 */
  constructor(public betPropensityApi: BetPropensityApiService,
              public createReportService: CreateReportService) { }

  ngOnInit() {
      this.getOddsBand();
      this.getOddsRange();
    //   this.createReportService.oddsSel.subscribe(
    //       resData => {
    //           if (resData.length > 0) {               
    //               this.oddsRange = resData;
    //           }
                       
    //       }
    //   );
      this.createReportService.oddsBand.subscribe(
          resData => {
              if (resData.length > 0) {
                  this.oddsBand = resData;
              }            
          }
      );
  }

  /**
   * This method used to get the odds band data from service.
   */
  getOddsBand() {
      this.betPropensityApi.getOddsBand().subscribe(resData => {
          for (let data of resData.outputband) {
              if (Object.keys(data).indexOf('checked') == -1) {
                  data.checked = false;
                  data.id = "placedOdds1";
                  data.field = "placedOdds";
                  data.operator = "less";
                  data.optgroup = "betderived";
              }
          }
          this.oddsBand = resData.outputband;         
      });
  }
  /**
   * This function used to get odds range data.
   */
  getOddsRange() {
      this.betPropensityApi.getOddsRange().subscribe(resData => {
          for (let data of resData.outputrange) {
              if (Object.keys(data).indexOf('checked') == -1) {
                  data.checked = false;
              }
          }
          this.oddsRange = resData.outputrange;
          this.setOddsRangeData(this.oddsRange);
        
      })
  }

  /**
   * This function used to set the default value.
   * @param data
   */
  setOddsRangeData(data) {
      let arrData = this.queryJson;        
      if (arrData.length > 0) {
          for(let mulData of arrData){
            if (mulData.hasOwnProperty('rules')){
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < mulData.rules.length; j++) {
                        if (data[i].id == mulData.rules[j].id && data[i].display_text == mulData.rules[j].display_text) {
                            data[i].checked = true;
                        }
                    }
                }
                this.oddsRange = data;
            } else {
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < arrData.length; j++) {
                        if (data[i].id == arrData[j].id && data[i].display_text == arrData[j].display_text) {
                            data[i].checked = true;
                        }
                    }
                }
                this.oddsRange = data;
            }
          }         
         this.createReportService.oddsSel.next(this.oddsRange);
      } 

  }
/**
 * This method used for checking options.
 * @param option 
 * @param event - event
 * @param ind - index
 * @param from 
 */
  updateCheckedOptions(option, event, ind, from) {        
      switch (from) {
          case 'oddsRange': 
              if(option){
                  this.oddsRange[ind].checked = !this.oddsRange[ind].checked;
                  this.createReportService.oddsSel.next(this.oddsRange);
              }
              break;
          case 'oddsBand':
               if(option){
                  this.oddsBand[ind].checked = !this.oddsBand[ind].checked;
                  this.createReportService.oddsBand.next(this.oddsBand);
                }
              break;
         
      }        
  }
  /**
    * This function called before destroying  the component.
    */
  ngOnDestroy() {
      this.alive = false;
  }
}
