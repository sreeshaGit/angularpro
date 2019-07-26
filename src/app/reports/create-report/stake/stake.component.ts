/**
 *  A class representing a StakeComponent and its functionality.
 */
import { Component, OnInit, Input } from '@angular/core';
import { BetPropensityApiService } from '../../../services/bet-propensity-api.service';
import { CreateReportService } from '../../../services/create-report.service';
import { CreateReportComponent } from '../create-report.component';
@Component({
  selector: 'app-stake',
  templateUrl: './stake.component.html',
  styleUrls: ['./stake.component.scss']
})
export class StakeComponent implements OnInit {
    public stakeRange: any;
    public stakeFrom: number;
    public stakeTo: number;
    public selRange = [];
    @Input() reportId: any;
    @Input() queryJson: any;
    /**
     * 
     * @param betPropensityApi  - {BetPropensityApiService} instance of BetPropensityApiService
     * @param createReportService  - {CreateReportService} instance of CreateReportService
     */
    constructor(public betPropensityApi: BetPropensityApiService,
                public createReportService: CreateReportService) { }

    ngOnInit() {
      this.getStakeRange();
    //   this.createReportService.stakeSel.subscribe(
    //       resData => {              
    //           if (resData.length > 0) {
    //               this.stakeRange = resData;
    //           }             
    //       }
    //   );

      this.createReportService.stakeRange.subscribe(
          resData => {              
              if (resData.length>0 && resData[0].operator == "between") {
                  this.stakeFrom = resData[0].value[0] ? resData[0].value[0] : '';
                  this.stakeTo = resData[0].value[1] ? resData[0].value[1] : '';
              } else if (resData.length > 0 && resData[0].operator == "less") {                  
                  this.stakeFrom = resData[0].value ? resData[0].value : '';                  
              } else if (resData.length > 0 && resData[0].operator == "greater") {
                  this.stakeTo = resData[0].value ? resData[0].value : '';
              }
          }
      );
     
  }

  /**
   * This method used get stake range.
   */
  getStakeRange() {
      this.betPropensityApi.getStakeRange().subscribe(resData => {
          for (let data of resData.stakerange) {
              if (Object.keys(data).indexOf('checked') == -1) {
                  data.checked = false;
              }              
          }
          this.stakeRange = resData.stakerange;
        //  if (this.createReportComp.reportId) {
              this.setStakeRangeData(this.stakeRange);
       //   }
      });
  }

  /**
   * This function used to set the default value.
   * @param data
   */
  setStakeRangeData(data) {
      let arrData = this.queryJson;      
      if (arrData.length > 0) {
        for(let mulData of arrData){
          if (mulData.hasOwnProperty('rules')) {
              for (let i = 0; i < data.length; i++) {
                  for (let j = 0; j < mulData.rules.length; j++) {
                      if (data[i].id == mulData.rules[j].id && data[i].display_text == mulData.rules[j].display_text) {
                          data[i].checked = true;
                      }
                  }
              }
              this.stakeRange = data;
          } else {
              for (let i = 0; i < data.length; i++) {
                  for (let j = 0; j < arrData.length; j++) {
                      if (data[i].id == arrData[j].id && data[i].display_text == arrData[j].display_text) {
                          data[i].checked = true;
                      }
                  }
              }
              this.stakeRange = data;
          }
        }
          this.createReportService.stakeSel.next(this.stakeRange);
      }
  }
  /**
   * This funcion used to update options.
   * @param option 
   * @param event 
   * @param ind 
   */
  updateCheckedOptions(option, event, ind) {          
    if(option){
        this.stakeRange[ind].checked = !this.stakeRange[ind].checked;
        this.createReportService.stakeSel.next(this.stakeRange);
    }
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
  /**
   * This function used to get the stake values.
   * @param val 
   */
  getValue(val) {
      if (this.stakeTo && this.stakeTo >= 0 && this.stakeFrom && this.stakeFrom >= 0) {
          let stakeBtw = {
              "id": "stake1",
              "field": "stake",
              "operator": "between",
              "value": [this.stakeFrom.toString(), this.stakeTo.toString()],
              "optgroup": "betderived",
              "option": "manualStake"
          }
          this.createReportService.stakeRange.next([stakeBtw]);
      } else if (this.stakeFrom && this.stakeFrom >= 0 && !this.stakeTo) {
          let stakeFrom = {
              "id": "stake1",
              "field": "stake",
              "operator": "less",
              "value": this.stakeFrom,
              "optgroup": "betderived",
              "option": "manualStake"
          }
          this.createReportService.stakeRange.next([stakeFrom]);
      } else if (this.stakeTo && this.stakeTo >= 0 && !this.stakeFrom) {
          let stakeTo = {
              "id": "stake1",
              "field": "stake",
              "operator": "greater",
              "value": this.stakeTo,
              "optgroup": "betderived",
              "option": "manualStake"
          }
          this.createReportService.stakeRange.next([stakeTo]);
      } else {
          this.createReportService.stakeRange.next([]);
      }
  }
}
