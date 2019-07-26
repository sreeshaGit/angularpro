/**
 *  A class representing a FrequencyComponent and its functionality.
 */
import { Component, OnInit, Input} from '@angular/core';

import { BetPropensityApiService } from '../../../services/bet-propensity-api.service';
import { CreateReportService } from '../../../services/create-report.service';
@Component({
  selector: 'app-frequency',
  templateUrl: './frequency.component.html',
  styleUrls: ['./frequency.component.scss']
})
export class FrequencyComponent implements OnInit {
    public frequency: any;
    @Input() queryJson: any;
    /**
     * @param betPropensityApi instance of BetPropensityApiService.
     * @param createReportService instance of CreateReportService.
     */
    constructor(public betPropensityApi: BetPropensityApiService,
    public createReportService:CreateReportService) { }

    ngOnInit() {
        this.getFrequencyData();
      
    }
    /**
     * This function get data from frequency service.
     */
    getFrequencyData() {
        this.betPropensityApi.getFrequency().subscribe(resData => {
            for (let data of resData.frequency) {
                if (Object.keys(data).indexOf('checked') == -1) {
                    data.checked = false;
                    data.id = "frequency";
                    data.field = "frequency";
                    data.operator = "equal";
                    data.optgroup = "betderived";
                }
            }
            this.frequency = resData.frequency;
            this.setFrequencyData(this.frequency);
        });
    }
    /**
  * This function used to set the default value.
  * @param data
  */
    setFrequencyData(data) {
        let arrData = this.queryJson;      
        if (arrData.length > 0) {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < arrData.length; j++) {
                    if (data[i].value == arrData[j].value) {
                        data[i].checked = true;
                    }
                }
            }
            this.frequency = data;
        }
        this.createReportService.freqSel.next(data);
    }
    /**
     * This function used to update checked options to observable
     * @param option 
     * @param event 
     * @param ind 
     */
    updateCheckedOptions(option, event , ind) {       
        if (option) {

            for (let radio of this.frequency) {
                if (radio.value === option.value) {
                    radio.checked = true;                  
                }
                else {
                    radio.checked = false;
                }
            }              
          
            this.createReportService.freqSel.next(this.frequency);
        }
        
    }
    
}
