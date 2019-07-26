/**
 *  A class representing a PeriodComponent and its functionality.
 */
import { Component, OnInit,Input} from '@angular/core';

import { BetPropensityApiService } from '../../../services/bet-propensity-api.service';
import { CreateReportService } from '../../../services/create-report.service';
import { CreateReportComponent } from '../create-report.component';
@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit {
  public dateTimeRange;
  public periodRange: any;
  public isChecked = false;
  @Input() reportId: any;
  @Input() queryJson: any;
 /**
  * 
  * @param betPropensityApi - {BetPropensityApiService} instance of BetPropensityApiService.
  * @param createReportService - {CreateReportService} instance of CreateReportService.
  */
  constructor(public betPropensityApi: BetPropensityApiService,
              public createReportService: CreateReportService) { }

  ngOnInit() {
      this.getPeriodData();
      this.createReportService.periodSel.subscribe(
          resData => {
              if (resData.length > 0) {
                  this.periodRange = resData;
              }              
          }
      );

      this.createReportService.dateSelected.subscribe(
          resData => {              
              if (resData.length>0 && resData[0].operator == "between") {
                  this.dateTimeRange = [new Date(resData[0].value[0]), new Date(resData[0].value[1])];
              } else if (resData.length > 0 && resData[0].operator == "less") {
                  this.dateTimeRange = [new Date(resData[0].value[0])];
              } else if (resData.length > 0 && resData[0].operator == "greater") {
                  this.dateTimeRange = [new Date(resData[0].value[0])];
              }
          }
      );
  }

  /**
   * This function used to get the details of Period.
   */
  getPeriodData() {
      this.betPropensityApi.getPeriodData().subscribe(resData => {
          for (let data of resData.periodrange) {
              if (Object.keys(data).indexOf('checked') == -1) {
                  data.checked = false;
              }
          }
          this.periodRange = resData.periodrange;
       //   if (this.reportId) {
              this.setPeriodData(this.periodRange);
        //  }
      });
  }
  /**
   * This function used to set the default value.
   * @param data
   */
  setPeriodData(data) {      
      let arrData = this.queryJson;     
      let latPeriodData = data;
      if (arrData.length > 0) {
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < arrData.length; j++) {
                if (data[i].value == arrData[j].value) {
                    data[i].checked = true;                    
                }
            }
          }        
          this.periodRange = data;
      }
      this.createReportService.periodSel.next(data);
  }
/**
 * This function used to check the options selected.
 * @param option 
 * @param event 
 * @param ind 
 */
  updateCheckedOptions(option, event, ind) {  
    if (option) {
        for(let radio of this.periodRange){
            if(radio.value===option.value){
                radio.checked=true;
            }
            else{
                radio.checked=false;
            }
        }        
        this.createReportService.periodSel.next(this.periodRange);
      }
  }
/**
 * This method used to get and set the date range.
 * @param evt 
 */
  getDate(evt) {    
     
      if (this.dateTimeRange.length > 0 && this.dateTimeRange[0] && this.dateTimeRange[1]) {

          let fromAndToDate = {
              "id": "slipCreated",
              "field": "slipCreated",
              "operator": "between",
              "value": [(this.dateTimeRange[0].toISOString()).split(".")[0] + "Z", (this.dateTimeRange[1].toISOString()).split(".")[0] + "Z"],
              "optgroup": "betderived",
              "option": "manualDate"
          }
          this.createReportService.dateSelected.next([fromAndToDate]);
      } else if (this.dateTimeRange.length > 0 && this.dateTimeRange[0]) {
          let date1 = {
              "id": "slipCreated",
              "field": "slipCreated",
              "operator": "greater",
              "value": (this.dateTimeRange[0].toISOString()).split(".")[0] + "Z",
              "optgroup": "betderived",
              "option": "manualDate"
          }         
          this.createReportService.dateSelected.next([date1]);
      } else if (this.dateTimeRange.length > 0 && this.dateTimeRange[1]) {
          let date2 = {
              "id": "slipCreated",
              "field": "slipCreated",
              "operator": "less",
              "value": (this.dateTimeRange[1].toISOString()).split(".")[0] + "Z",
              "optgroup": "betderived",
              "option": "manualDate"
          }
          this.createReportService.dateSelected.next([date2]);
      } else if(this.dateTimeRange[0] == null  && this.dateTimeRange[1] == null ){
        this.createReportService.dateSelected.next([]);
      }
  }
  
}
