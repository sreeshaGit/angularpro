/**
 *  A class representing a ReportComparisonComponent and its functionality.
 */
import { Component, OnInit } from '@angular/core';

import { BetPropensityApiService } from '../../../services/bet-propensity-api.service';
import { CreateReportService } from '../../../services/create-report.service';
@Component({
  selector: 'app-report-comparison',
  templateUrl: './report-comparison.component.html',
  styleUrls: ['./report-comparison.component.scss']
})
export class ReportComparisonComponent implements OnInit {

    dropdownSettings = {};
    dropdownSettingsForCompare = {};
    compatableReports = [];
    errorMsg = false;
    reportsData = [];
    selectedReportData = [];
    selectCompatableReports = [];
    selReportIdsFromService = [];
    /**
     * 
     * @param betPropensityApi  - {BetPropensityApiService} instance of BetPropensityApiService.
     * @param createReportService - {CreateReportService}  instance of CreateReportService.
     */
    constructor(public betPropensityApi: BetPropensityApiService, public createReportService: CreateReportService) { }

    ngOnInit() {
        this.selectCompatableReports = [];
        this.selectedReportData = [];
        this.dropdownSettings = {
            singleSelection: true,
            text: "Select Fields",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            searchPlaceholderText: 'Search Fields',
            enableSearchFilter: true,
            badgeShowLimit: 20
        };
        this.dropdownSettingsForCompare = {
            singleSelection: false,
            text: "Select Fields",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            searchPlaceholderText: 'Search Fields',
            enableSearchFilter: true,
            badgeShowLimit: 20
        };
       
      
        this.getAllReportsList();
        this.createReportService.selReportIds.subscribe(
            resData => {
             
                if (resData.length > 0) {                    
                    this.selReportIdsFromService = resData;
                  
               }
            }
        );
    }

  /**
   * This method used to get the list of report data.
   */
    getAllReportsList() {
       
        this.selectedReportData = [];
        this.betPropensityApi.getReportList().subscribe(
            (resData) => {
                if (resData && resData.length > 0){
                    for (let data of resData) {
                        data.itemName = data.name;
                        data.disabled = false;
                        if (this.selReportIdsFromService.length > 0) {
                            if (this.selReportIdsFromService[0] == data.id) {
                                this.selectedReportData.push(data);
                                this.setReportData(this.selectedReportData, this.selReportIdsFromService);
                            }
                        }
                    }
                    resData.sort(function (first, second) {
                        return first.id - second.id;
                    });                    
                    this.reportsData = resData;
                }
                           
            }, (err) => {
            }
        );
    }

    /**
     * 
     * @param item
     * @param from 
     */
    onItemSelect(item: any, from) {        
        if (from == 'selectReport') {
            this.setReportData(this.selectedReportData, this.selReportIdsFromService);
        } else if (from == 'compare') {
          
            if (this.selectCompatableReports.length >= 1) {
                this.errorMsg = false;
                this.createReportService.compareRep.next(this.selectCompatableReports);
            } else {
                this.errorMsg = true;
                this.createReportService.compareRep.next([]);
            }
        }
                
    }
    /**
     * 
     * @param item
     * @param from
     */
    OnItemDeSelect(item: any, from) {        
        if (from == 'selectReport') {
            this.setReportData(this.selectedReportData, this.selReportIdsFromService);
        } else if(from == 'compare') {          
          if (this.selectCompatableReports.length >= 1) {
              this.errorMsg = false;
              this.createReportService.compareRep.next(this.selectCompatableReports);
          } else {
              this.errorMsg = true;
              this.createReportService.compareRep.next([]);
          }
        }

    }
    /**
     * 
     * @param items
     * @param from
     */
    onSelectAll(items: any, from) {       
        if (from == 'selectReport') {
            this.setReportData(this.selectedReportData, this.selReportIdsFromService);
        } else if (from == 'compare') {
            if (this.compatableReports.length <= 0) {
                this.errorMsg = false;
                return;
            }
            if (this.selectCompatableReports.length >= 1) {
                this.errorMsg = false;
                this.createReportService.compareRep.next(this.selectCompatableReports);
            } else {
                this.errorMsg = true;
                this.createReportService.compareRep.next([]);
            }
        }      
    }
    /**
     * 
     * @param items
     * @param from
     */
    onDeSelectAll(items: any, from) {
        
        if (from == 'selectReport') {
            this.setReportData(this.selectedReportData, this.selReportIdsFromService);
        } else if (from == 'compare') {
            if (this.selectCompatableReports.length >= 1) {
                this.errorMsg = false;
                this.createReportService.compareRep.next(this.selectCompatableReports);               
            } else {
                this.errorMsg = true;
                this.createReportService.compareRep.next([]);
            }
        }
    }
    /**
     * This method used to set the repor data.
     * @param selectedReportData 
     * @param selReportIdsFromService 
     */
    setReportData(selectedReportData, selReportIdsFromService) {       
        this.compatableReports = [];
        this.selectCompatableReports = [];
        let selReports = [];
        if (selectedReportData.length == 1) {        
            this.betPropensityApi.getReportCompatible(selectedReportData[0].id).subscribe(
                resData => {                   
                    if (resData.compare != null && resData.compare.hasOwnProperty('report_ids')){ }
                    for (let data of resData.compare.report_ids) {
                        for (let reportData of this.reportsData) {
                            if (data == reportData.id) {                                                         
                                this.compatableReports.push(reportData);
                            }                         
                        }
                      
                    }
                    this.compatableReports.sort(function (first, second) {
                        return first.id - second.id;
                    });                    
                    if (selReportIdsFromService.length > 0) {
                        this.setCompare(this.compatableReports, selReportIdsFromService)
                    } 
                }

            );
            this.createReportService.reportSel.next(selectedReportData);            
        }
    }

    setCompare(compatableReports, selReportIdsFromService) {      
        this.selectCompatableReports = [];
        if (selReportIdsFromService.length > 0) {
            for (let comp of this.compatableReports) {
                for (var selRep = 1; selRep <= selReportIdsFromService.length; selRep++) {
                    if (selReportIdsFromService[selRep] == comp.id) {                     
                        this.selectCompatableReports.push(comp);                      
                    }
                }
            }
            this.createReportService.compareRep.next(this.selectCompatableReports);
        }
    }
  
}
