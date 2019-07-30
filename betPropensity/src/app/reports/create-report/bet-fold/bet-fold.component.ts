/**
 * A class representing a BetFoldComponent and its functionality.
 */
import { Component, OnInit } from '@angular/core';

import { BetPropensityApiService } from '../../../services/bet-propensity-api.service';
import { CreateReportService } from '../../../services/create-report.service';

@Component({
  selector: 'app-bet-fold',
  templateUrl: './bet-fold.component.html',
  styleUrls: ['./bet-fold.component.scss']
})
export class BetFoldComponent implements OnInit {
    dropdownSettings = {};
    betfoldData = [];
    selectedBetfoldData = [];
    /**
     * 
     * @param betPropensityApi - {BetPropensityApiService} instance of BetPropensityApiService.
     * @param createReportService - {CreateReportService} instance of CreateReportService.
     */
    constructor(public betPropensityApi: BetPropensityApiService,
                public createReportService: CreateReportService) { }

    ngOnInit() {
        this.dropdownSettings = {
            singleSelection: false,
            text: "Select Fields",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            searchPlaceholderText: 'Search Fields',
            enableSearchFilter: true,
            badgeShowLimit: 20
        };
        this.getBetFoldData();
        this.createReportService.betFold.subscribe(
            resData => {               
                this.selectedBetfoldData = [];
                if (resData.length > 0) {                    
                    this.selectedBetfoldData = resData;
                }

            }
        );
    }
    /**
    * This function used to select the selected option.
    * @param item    
    */
    onItemSelect(item: any) {
        this.setBetfoldData(this.selectedBetfoldData);
    }
    /**
     * This function used to deselect single selected option.
     * @param item    
     */
    OnItemDeSelect(item: any) {
        this.setBetfoldData(this.selectedBetfoldData);
    }
    /**
     * This function used to select all the options.
     * @param items    
     */
    onSelectAll(items: any) {
        this.setBetfoldData(this.selectedBetfoldData);
    }
    /**
     * This function used to deselect the selected option.
     * @param items     
     */
    onDeSelectAll(items: any) {
        this.setBetfoldData(this.selectedBetfoldData);
    }
    /**
     * This function gets bet fold data from service.
     */
    getBetFoldData() {
        this.betPropensityApi.getBetFold().subscribe(resData => {
            let count = 1;
            let betfoldData = [];
            for (let j = 0; j < resData.betfolds.length; j++) {
                resData.betfolds[j].id = count;
                resData.betfolds[j].itemName = resData.betfolds[j].display_text;
                resData.betfolds[j].option = 'betFold1'; 
                count++
            }
            this.betfoldData = resData.betfolds;           
        });
    }
   /**
    * This method updates the observable.
    * @param selectedBetfoldData 
    */
    setBetfoldData(selectedBetfoldData) {      
       this.createReportService.betFold.next(selectedBetfoldData);
    }

 
}
