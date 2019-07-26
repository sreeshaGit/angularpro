/**
 *  A class representing a OddsComponent and its functionality.
 */
import { Component, OnInit } from '@angular/core';

import { CreateReportService } from '../../../services/create-report.service';
import { BetPropensityApiService } from '../../../services/bet-propensity-api.service';
@Component({
  selector: 'app-output-data',
  templateUrl: './output-data.component.html',
  styleUrls: ['./output-data.component.scss']
})
export class OutputDataComponent implements OnInit {
    displayInput = false;
    dropdownSettings = {};
    outputDataList = [];
    outputDataFields = [{ "itemName": "Player", "checked": false, "key": "player" },
        { "itemName": "Sport", "checked": false, "key": "sport" },
        { "itemName": "Event", "checked": false, "key": "event"},
        { "itemName": "Market", "checked": false, "key": "market"},
        { "itemName": "Stake Band", "checked": false, "key": "stake_band" },
        { "itemName": "Odds Band", "checked": false, "key": "odds_band" },
        { "itemName": "Other", "checked": false, "key": null }
    ];
    selectedOutputData = []; 
    /**
     * 
     * @param createReportService - {CreateReportService} instance of CreateReportService.
     * @param betPropensityApi - {BetPropensityApiService} instance of BetPropensityApiService.
     */   
    constructor(public createReportService: CreateReportService,
        public betPropensityApi: BetPropensityApiService) {
        let reportObj = this.createReportService.getReportObj();       
        for (let selnum of this.outputDataFields) {
          
            if (reportObj.outputData == selnum.key) {
                selnum.checked = true;
                this.displayInput = false;
            } else if (reportObj.outputData != "player" && reportObj.outputData != "sport" && reportObj.outputData != "event" && reportObj.outputData != "market" && reportObj.outputData != "stake_band" && reportObj.outputData != "odds_band" && selnum.key == null) {
                this.displayInput = true;
                selnum.checked = true;                        
            }
        }      
    }

  ngOnInit() {
      this.dropdownSettings = {
          singleSelection: true,
          text: "Select Fields",
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          searchPlaceholderText: 'Search Fields',
          enableSearchFilter: true,
          badgeShowLimit: 20
      };
      this.getOutputData();
  }
/**
 * This method used to get the outputfield data.
 */
  getOutputData() {
      this.betPropensityApi.getOutputData().subscribe(resData => {
          let count = 1;
          let outputData = [];        
          for (let item of this.outputDataFields) {
              let ind = 0;
              for (let data of resData.outputdata) {
                  if (item.key === data.value) {
                      resData.outputdata.splice(ind, 1);
                  }
                  ind++;
              }
          }
         
          for (let j = 0; j < resData.outputdata.length; j++) {              
                      outputData.push({ "id": count, "itemName": resData.outputdata[j].display_text, "key": resData.outputdata[j].value });
                      count++                    
          }      
          this.outputDataList = outputData;
          if (this.displayInput){
              this.setOutputData(this.outputDataList);
          }        
      });
  }

  /**
   * 
   * @param item
   * @param from 
   */
  onItemSelect(item: any, from) {
      if (this.selectedOutputData.length > 0) {          
          this.createReportService.outputData.next(this.selectedOutputData[0].key); 
      }
                      
  }
  /**
   * 
   * @param item
   * @param from
   */
  OnItemDeSelect(item: any, from) {
      if (this.selectedOutputData.length > 0) {          
          this.createReportService.outputData.next(this.selectedOutputData[0].key);
      }         
  }
/**
 * This method used to set the output data.
 * @param data 
 */
  setOutputData(data) {
      let reportObj = this.createReportService.getReportObj();
      let latOutputData = [];
      if (reportObj.outputData != '') {
          for (let i = 0; i < data.length; i++) {
              if (data[i].key == reportObj.outputData) {
                  latOutputData.push(data[i]);
              }
          }
          this.selectedOutputData = latOutputData;
      }
      if (this.selectedOutputData.length > 0) {        
          this.createReportService.outputData.next(this.selectedOutputData[0].key);
      }   
  }
/**
 * This function used to update checked option
 * @param option 
 * @param event  event
 * @param ind  index
 */
  updateCheckedOptions(option, event, ind) {
      if (option) {
          for (let radio of this.outputDataFields) {
              if (radio.itemName === option.itemName) {
                  radio.checked = true;
                  if (radio.key == null) {
                      this.displayInput = true;                   
                  } else {
                      this.displayInput = false;
                      let outputData = [];
                      outputData.push(radio.key);                     
                      this.createReportService.outputData.next(radio.key);
                  }
              }
              else {
                  radio.checked = false;
              }
          }
      }
  }

}
