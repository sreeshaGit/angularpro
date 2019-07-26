/**
 *  A class representing a ReportCompareComponent and its functionality.
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BetPropensityApiService } from '../../services/bet-propensity-api.service';
import { CreateReportService } from '../../services/create-report.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-report-compare',
  templateUrl: './report-compare.component.html',
  styleUrls: ['./report-compare.component.scss']
})
export class ReportCompareComponent implements OnInit {
   @Input() compareReportId: any;
   @Input() reportsData1: any;
   @Output() closeDeletePopup: EventEmitter<any> = new EventEmitter(false);
   @Input() reportId;
   dropdownSettings = {};
   dropdownSettingsForCompare = {};
   compatableReports = [];
   errorMsg = false;
   reportsData = [];
   selectedReportData = [];
   selectCompatableReports = [];
   selReportIdsFromService = [];
    /**     
     * @param betPropensityApi - {BetPropensityApiService} instance of BetPropensityApiService
     * @param createReportService - {CreateReportService} instance of CreateReportService.
     * @param router - {Router} instance of Router.
     * @param route - {ActivatedRoute} instance of ActivatedRoute.
     */
   constructor(public betPropensityApi: BetPropensityApiService,
               public createReportService: CreateReportService,
               private router: Router,
               private route: ActivatedRoute) { }

   ngOnInit() {
      
       this.selectCompatableReports = [];
       this.selectedReportData = [];     
       this.dropdownSettingsForCompare = {
           singleSelection: false,
           text: "Select Fields",
           selectAllText: 'Select All',
           unSelectAllText: 'UnSelect All',
           searchPlaceholderText: 'Search Fields',
           enableSearchFilter: true,
           badgeShowLimit: 20,
           labelKey: "name",
       };

       this.createReportService.selReportIds.subscribe(
           resData => {
               this.selectCompatableReports = [];
               if (resData.length > 0) {
                 
                   this.selReportIdsFromService = resData;

                   for (let data of this.reportsData1) {
                       for (let ids of resData){
                           if (ids == data.id){                              
                               this.selectCompatableReports.push(data);
                           }
                       }
                   }
               }
           }
       );
  }

  ngOnChanges(changes) {
      // only run when property "data" changed
      if (changes['compareReportId'] || changes['reportsData1']) {        
          if (this.compareReportId && this.reportsData1.length > 0) {
              this.setReportData(this.compareReportId, this.reportsData1, this.selReportIdsFromService);            
              this.createReportService.reportSel.next([this.compareReportId]); 
          }
      }
  }

  popUpClose() {
      this.closeDeletePopup.emit(true);
  }

  
    /**
     * 
     * @param item
     * @param from 
     */
  onItemSelect(item: any, from) {        
            if (from == 'compare') {          
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
        if (from == 'compare') {          
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
        if (from == 'compare') {
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
        
        if (from == 'compare') {
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
     * This function used to set report data.
     * @param selectedReportData 
     * @param reportsData 
     * @param selReportIdsFromService 
     */
    setReportData(selectedReportData, reportsData, selReportIdsFromService) {       
        this.compatableReports = [];
        this.selectCompatableReports = [];
        let selReports = [];
    
             this.betPropensityApi.getReportCompatible(selectedReportData).subscribe(
                 resData => {                    
                    if (resData.compare != null && resData.compare.hasOwnProperty('report_ids')) {                      
                        for (let data of resData.compare.report_ids) {
                            for (let reports of reportsData) {
                                if (data == reports.id && data != selectedReportData ) {
                                    this.compatableReports.push(reports);
                                }
                            }

                        }
                        this.compatableReports.sort(function (first, second) {
                            return first.id - second.id;
                        });         
                    }
                              
                    if (selReportIdsFromService.length > 0) {                        
                        this.setCompare(this.compatableReports, selReportIdsFromService)
                    } 
                }

            );       
    }
    /**
     * This function used to set compare report parameters.
     * @param compatableReports 
     * @param selReportIdsFromService 
     */
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
    /**
     * This function used to get report details.
     */
    preview() {       
        if (this.selectCompatableReports.length <= 0) {
            this.errorMsg = true;
            return;
        }
        if (this.reportId) {
            let data = this.getComparedReportData();
            if (data.length <= 1) {
                return;
            } else {
                let reportObj = {
                    "compare": {
                        "report_ids": this.getComparedReportData(),
                        "id": this.reportId,
                      //  "name": this.reportname,
                    }
                }
                this.createReportService.setCompareReportObj(reportObj);
                this.createReportService.setEditMode(true);
                this.createReportService.setPageFrom(true);
                this.router.navigate(['view-reports', this.reportId]);
                this.createReportService.typeOfView.next('Report Comparison');
            }

        } else if (!this.reportId) {
          
            let data = this.getComparedReportData();          
            if (data.length <= 1) {
                return;
            } else {
                this.createReportService.setEditMode(false);
                this.reportId = 0;
                let reportObj = {
                    "compare": { "report_ids": this.getComparedReportData() }
                }
                this.createReportService.setCompareReportObj(reportObj);
                this.router.navigate(['view-reports']);
                this.createReportService.typeOfView.next('Report Comparison');
            }
        }

       
    }
    /**
     * This function used to get compared reports data.
     */
    getComparedReportData() {      
        let reportSel = [];
        this.createReportService.reportSel.subscribe(
            resData => {              
                if (resData.length > 0) {
                    reportSel = [];
                    for (let data of resData) {
                        reportSel.push(data.id);
                    }
                }
            }
        );

        let compareRep = [];
        this.createReportService.compareRep.subscribe(
            resData => {
                if (resData.length > 0) {
                    compareRep = [];
                    for (let data of resData) {
                        compareRep.push(data.id);
                    }
                }
            }
        );

        let reportIds = [];       
        reportIds = reportIds.concat(this.compareReportId, compareRep);

        this.createReportService.selReportIds.next(reportIds);
        return reportIds;
    }

}
