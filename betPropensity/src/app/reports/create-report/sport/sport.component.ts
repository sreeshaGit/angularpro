/**
 *  A class representing a SportComponent and its functionality.
 */
import { Component, OnInit } from '@angular/core';

import { BetPropensityApiService } from '../../../services/bet-propensity-api.service';
import { CreateReportService } from '../../../services/create-report.service';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.scss']
})
export class SportComponent implements OnInit {
    countryData = [];
    dropdownSettings = {};
    sportsData = [];
    selectedSportData = [];
    tempSports = [];
    /**
     * 
     * @param betPropensityApi - {BetPropensityApiService} instance of BetPropensityApiService
     * @param createReportService - {CreateReportService} instance of CreateReportService
     */
    constructor(public betPropensityApi: BetPropensityApiService,
        public createReportService: CreateReportService) {
        this.createReportService.country.subscribe(
            country => {
                this.tempSports = [];
                if (country.length > 0) {
                    this.countryData = country;                 
                    this.tempSports = this.sportBasedOncountry(this.sportsData,this.countryData);
                } else {
                    this.tempSports = this.sportsData;
                }
               
            }
        );
    }

    ngOnInit() {
        this.dropdownSettings = {
            singleSelection: false,
            text: "Select",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            searchPlaceholderText: 'Search Fields',
            enableSearchFilter: true,
            badgeShowLimit: 20
        };
        this.getSportsData();
        this.createReportService.sportsSel.subscribe(
            resData => {
                this.selectedSportData = [];
                if (resData.length > 0) {
                    this.selectedSportData = resData; 
                }
                             
            }
        );
      
    }

    /**
     * 
     * @param item
     * @param from 
     */
    onItemSelect(item: any, from) {       
        this.setSportData(this.selectedSportData);
    }
    /**
     * 
     * @param item
     * @param from
     */
    OnItemDeSelect(item: any, from) {     
        this.setSportData(this.selectedSportData);
    }
    /**
     * 
     * @param items
     * @param from
     */
    onSelectAll(items: any, from) {     
        this.setSportData(this.selectedSportData);
    }
    /**
     * 
     * @param items
     * @param from
     */
    onDeSelectAll(items: any, from) {       
        this.setSportData(this.selectedSportData);
    }
    /**
     * This function gets the sports data.
     */
    getSportsData() {
        this.betPropensityApi.getSportNames().subscribe(resData => {
            let count = 1;
            let sportsData = [];
            for (let j = 0; j < resData.data.length; j++) {
                sportsData.push({ "id": count, "itemName": resData.data[j].name, "sportIds": resData.data[j].id});
                count++
            }
            this.sportsData = sportsData;
           
            if (this.countryData.length > 0){
                this.tempSports = this.sportBasedOncountry(this.sportsData, this.countryData);
            } else {
                this.tempSports = this.sportsData;
            }
        });
    }
    /**
     * This function used to set the sports data.
     * @param selectedSportData 
     */
    setSportData(selectedSportData) {

        this.createReportService.sportsSel.next(selectedSportData);
    }
    /**
     * This function used to get sport based on country.
     * @param sportsData 
     * @param country 
     */
    sportBasedOncountry(sportsData, country) {
        let tempSports = [];
        for (let sport of sportsData) {
            for (let cty of country) {
                for (let data of cty.sports) {
                    if (data == sport.sportIds) {
                        tempSports.push(sport);
                    }
                }
            }
        }
       let  filteredSports = this.removeDuplicates(tempSports)
       return filteredSports;
    }
    /**
     * This function used to remove duplicates.
     * @param tempSports 
     */
    removeDuplicates(tempSports) {
        let uniqueSport = []
        for (let i = 0; i < tempSports.length; i++) {
            if (uniqueSport.indexOf(tempSports[i]) == -1) {
                uniqueSport.push(tempSports[i])
            }
        }
        return uniqueSport
    }
}
