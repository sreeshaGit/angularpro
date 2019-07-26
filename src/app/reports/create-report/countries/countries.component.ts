/**
 *  A class representing a BetStatusComponent and its functionality.
 */
import { Component, OnInit ,OnDestroy} from '@angular/core';

import { BetPropensityApiService } from '../../../services/bet-propensity-api.service';
import { CreateReportService } from '../../../services/create-report.service';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit, OnDestroy {
    dropdownSettings = {};
    countriesData = [];
    selectedCountriesData = [];
    sportId = [];
    sportSubscription :any;
    toggle = true;
    tempEvents = [];
    /**
     * 
     * @param betPropensityApi - { BetPropensityApiService} instance of BetPropensityApiService
     * @param createReportService - {CreateReportService} instance of CreateReportService
     */
    constructor(public betPropensityApi: BetPropensityApiService,
        public createReportService: CreateReportService) {

       this.sportSubscription =  this.createReportService.sportsSel.subscribe(
            resData => {
                if (resData.length > 0) {
                    this.tempEvents = [];                    
                    this.sportId = resData;                    
                    this.tempEvents = this.setCountryBasedOnSport(this.countriesData, this.sportId);
                } else {                    
                    this.tempEvents = this.countriesData;
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
        this.getCountriesData();
        this.createReportService.country.subscribe(
            resData => {
                this.selectedCountriesData = [];
                if (resData.length > 0) {
                   
                    this.selectedCountriesData = resData;                   
                    for (let data of resData) {                       
                        this.toggle = data.include;
                    }
                } else {

                }

            }
        );
    }
    /**
    * 
    * @param item
    * @param from 
    */
    onItemSelect(item: any) {      
        for (let data of this.selectedCountriesData) {           
            data.include = this.toggle;
        }        
        this.setCountriesData(this.selectedCountriesData);
    }
    /**
     * 
     * @param item
     * @param from
     */
    OnItemDeSelect(item: any) {
        this.setCountriesData(this.selectedCountriesData);        
    }
    /**
     * 
     * @param items
     * @param from
     */
    onSelectAll(items: any) {
        this.setCountriesData(this.selectedCountriesData);
    }
    /**
     * 
     * @param items
     * @param from
     */
    onDeSelectAll(items: any) {
        this.setCountriesData(this.selectedCountriesData);        
    }
    /**
     * This function used to get countries Data.
     */
    getCountriesData() {
        this.betPropensityApi.getCountries().subscribe(resData => {         
            let count = 1;
            let countriesData = [];

            resData.countries.sort(function (country1, country2) {                
                return (country1.value).localeCompare(country2.value);
            });
            
            for (let j = 0; j < resData.countries.length; j++) {
                countriesData.push({ "id": count, "itemName": resData.countries[j].value, "key": resData.countries[j].key, "include": this.toggle, "sports": resData.countries[j].sports});
                count++
            }
            this.countriesData = countriesData;          
            if (this.sportId.length > 0) {
                this.tempEvents = this.setCountryBasedOnSport(this.countriesData, this.sportId);
            } else {
                this.tempEvents = this.countriesData;
            }
          
        });
    }
    /**
     * This method used set the country selected
     * @param selectedSportData 
     */
    setCountriesData(selectedSportData) {
        this.createReportService.country.next(selectedSportData);
    }
    
    include(toggle) {        
        this.toggle = toggle;
        if (this.selectedCountriesData.length > 0) {
            for (let data of this.selectedCountriesData) {
                data.include = this.toggle;
            }           
            this.setCountriesData(this.selectedCountriesData);
        }        
    }
    /**
     * This method used to set the country based on sport.
     * @param countriesData 
     * @param sportId 
     */
    setCountryBasedOnSport(countriesData, sportId) {
        let tempEvents = [];
        for (let data of sportId) {
            for (let item of countriesData) {
                for (let country of item.sports) {
                    if (country == data.sportIds) {
                        tempEvents.push(item);
                    }
                }
            }
        }        
        return tempEvents;
    }

    ngOnDestroy() {
        this.sportSubscription.unsubscribe();
    }
}
