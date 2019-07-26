/**
 *  A class representing a BetTypeComponent and its functionality.
 */
import { Component, OnInit, Input } from '@angular/core';
import { BetPropensityApiService } from '../../../services/bet-propensity-api.service';
import { CreateReportService } from '../../../services/create-report.service';
import { CreateReportComponent } from '../create-report.component';
@Component({
  selector: 'app-bet-type',
  templateUrl: './bet-type.component.html',
  styleUrls: ['./bet-type.component.scss']
})
export class BetTypeComponent implements OnInit {
  public betType: any;
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
      this.getBetType();
    //   this.createReportService.betType.subscribe(
    //       resData => {
    //           if (resData.length > 0) {
    //               this.betType = resData
    //           }
    //       }
    //   );     
  }
  /**
   * This method used to get bet type data.
   */
  getBetType() {
      this.betPropensityApi.getBetType().subscribe(
          resData => {
              for (let data of resData.bettype) {
                  if (Object.keys(data).indexOf('checked') == -1) {
                      data.checked = false;
                  }
              }
              this.betType = resData.bettype;
              //if (this.reportId) {
                  this.setBetTypeData(this.betType);
            //  }
          }
      );
  }

  /**
     * This function used to set the default value.
     * @param data
     */
  setBetTypeData(data) {
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
                this.betType = data;
                this.createReportService.betType.next(this.betType);
            } else {
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < arrData.length; j++) {
                        if (data[i].id == arrData[j].id && data[i].display_text == arrData[j].display_text) {
                            data[i].checked = true;
                        }
                    }
                }
                this.betType = data;
                this.createReportService.betType.next(this.betType);
            }
          }
          
      }

  }
/**
 * This function used to update checked options
 * @param option 
 * @param event - {event}
 * @param ind - {index}
 */
  updateCheckedOptions(option, event, ind) {
     if(option){
        this.betType[ind].checked = !this.betType[ind].checked;
        this.createReportService.betType.next(this.betType);
     }
  }
}
