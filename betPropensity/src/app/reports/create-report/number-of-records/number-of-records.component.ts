/**
 *  A class representing a NumberOfRecordsComponent and its functionality.
 */
import { Component, OnInit } from '@angular/core';

import { CreateReportService } from '../../../services/create-report.service';
@Component({
  selector: 'app-number-of-records',
  templateUrl: './number-of-records.component.html',
  styleUrls: ['./number-of-records.component.scss']
})
export class NumberOfRecordsComponent implements OnInit {
  displayInput = false;

  recordFields = [{ "dispalyName": "All", "checked":false,"value":1000000 },
              { "dispalyName": "Top 10", "checked": false,"value":10},
              { "dispalyName": "Top 20", "checked":false,"value":20 },
              { "dispalyName": "Top 50", "checked":false,"value":50 },
              { "dispalyName": "Top 100", "checked":false,"value":100 },
              { "dispalyName": "Other", "checked":false,"value":null }
              ];

  noOfRecords :any;
  /**   
   * @param createReportService - {CreateReportService} instance of CreateReportService.
   */
  constructor(public createReportService: CreateReportService) { }

  ngOnInit() {
    this.createReportService.numOfRec.subscribe(
        resData => {
            for (let selnum of this.recordFields) {
                if (resData == selnum.value) {                    
                    selnum.checked = true;
                    this.displayInput = false;
                } else if (resData != 1000000 && resData != 10 && resData != 20 && resData != 50 && resData != 100 && selnum.value == null ) {                  
                    selnum.checked = true;
                    this.displayInput = true;
                    this.noOfRecords = resData;
                }               
            }
      }
    );
  }
/**
 * This function used to update the options.
 * @param option 
 * @param event 
 * @param ind 
 */
  updateCheckedOptions(option, event, ind) {  
    if (option) {
        for (let radio of this.recordFields){
            if(radio.dispalyName === option.dispalyName){ 
                radio.checked=true;
             
              if(radio.value == null){
                this.displayInput =true;
              } else{
                this.displayInput = false;
                this.createReportService.numOfRec.next(radio.value);
              }
            }
            else{
                radio.checked=false;
            }
        }              
      }
  }
/**
 * This method used to set number of records.
 * @param evt 
 */
  noOfRecordChange(evt) {       
    this.createReportService.numOfRec.next(this.noOfRecords);
  }
  /**
   * This method used to check the input.
   * @param evt 
   */
  onlyNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
  }
}
