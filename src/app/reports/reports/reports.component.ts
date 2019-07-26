/**
 *  A class representing a ReportsComponent and its functionality.
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';

import { BetPropensityApiService } from '../../services/bet-propensity-api.service';
import { CreateReportService } from '../../services/create-report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportsComponent implements OnInit {
    deleteConfirm = false;
    deleteId: any;    
    cols: any[];
    finalArray = [];
    listOfReports = [];
    openCompareRep = false;
    selectedReportId: any;
    /**     
     * @param appCom - { AppComponent} instance of AppComponent.
     * @param router - {Router} instance of Router.
     * @param createReportService - {CreateReportService} instance of CreateReportService.
     * @param betPropensityApi - {BetPropensityApiService} instance of BetPropensityApiService.
     */
    constructor(public appCom: AppComponent,
                private router: Router,
                public createReportService: CreateReportService,
                public betPropensityApi:BetPropensityApiService) {
        this.appCom.headerQueryString.next("Report");
    }

    ngOnInit() {
        this.finalArray = [];
        this.cols = [
            { field: 'Report Id', header: 'Report Id' },
            { field: 'Report Name', header: 'Report Name' },
            { field: 'Updated', header: 'Updated' }
           
        ];
        this.getAllReportsList();        
    }


  /**
   * This method used to get the list of report data.
   */
    getAllReportsList() {
      this.finalArray = [];
      this.betPropensityApi.getReportList().subscribe(
          (data) => {            
              this.sortResponceData(data);             
              this.listOfReports = this.finalArray.sort(function (first, second) {
                  return first.id - second.id;
              });
          }, (err) => {
          }
      );
  }
  /**
  * This method used to navigate based on the report Id to report result page.
  * @param reportId {number}
  */
  goToReport(reportData) {     
      this.createReportService.setPageFrom(false);
      this.createReportService.hideUpdate.next(true);
      this.createReportService.hideDropdown.next(false);
      if (reportData.is_comparison){
          this.createReportService.typeOfView.next('Report Comparison');
      } else {
          this.createReportService.typeOfView.next('New report');
      }
      this.router.navigate(['view-reports', { id: reportData.id, name: reportData.name}]);
  }
  /**
   * This method used to navigate based on the report Id to report result page.
   * @param reportId {number}
   */
  goToEdit(reportId,is_comparison) {
    
          this.createReportService.stakeSel.next([]);
          this.createReportService.stakeRange.next([]);
          this.createReportService.oddsSel.next([]);
          this.createReportService.freqSel.next([]);
          this.createReportService.periodSel.next([]);
          this.createReportService.eventSel.next([]);
          this.createReportService.sportsSel.next([]);
          this.createReportService.marketSel.next([]);
          this.createReportService.oddsBand.next([]);
          this.createReportService.dateSelected.next([]);
          this.createReportService.betFold.next([]);
          this.createReportService.country.next([]);
          this.createReportService.reportSel.next([]);
          this.createReportService.betType.next([]);
          this.createReportService.numOfRec.next(10);
          this.createReportService.betStatus.next([]);
          this.createReportService.lossPrct.next([]);
          this.createReportService.winPrct.next([]);
          this.createReportService.betNumber.next([]);
          this.createReportService.daySelected.next([]);
          this.createReportService.sameEvent.next([]);
          this.createReportService.sameMarket.next([]);
          this.createReportService.timeDay.next({
              "operator": null,
              "value": null
          });
          this.createReportService.priorEvtDays.next(null);
          this.createReportService.priorEvtHours.next(null);
          this.createReportService.priorEvtMins.next(null);
          this.createReportService.reportSel.next([]);
          this.createReportService.compareRep.next([]);
          this.createReportService.selReportIds.next([]);
          this.createReportService.profileSelected.next([]);
          this.createReportService.setPageFrom(false);
          this.router.navigate(['create-report', reportId]);   
  }
  /**
   * This method used to delete the selected report.
   * @param reportId {number}
   */
  deleteReport(reportId) {    
      this.deleteId = reportId;
      this.deleteConfirm = true;         
  }
  /**
   * This function used to close popup.
   * @param evt 
   */
  closeDeletePopup(evt) {
      if (evt) {
          this.deleteConfirm = false;
      }

  }
  /**
   * This function used to delete the option.
   * @param evt 
   */
  deleteOpt(evt) {
      if (evt) {
          this.deleteConfirm = false;
          this.betPropensityApi.removeReport(this.deleteId ).subscribe(
              (data) => {
                  this.getAllReportsList();                  
              }, (err) => {
                  this.getAllReportsList();                 
              }
          );   
      }
  }
  /**
   * This function used to sort the response data.
   * @param listRep 
   */
  sortResponceData(listRep) {
      if (listRep.length > 0) {       
          for (let data of listRep) {
              data['Report Id'] = data.id;
              data['Report Name'] = data.name;
              data['Updated'] = data.created;             
              this.finalArray.push(data); 
          }
      }              
  }
  /**
   * This function used to showhide the popup.
   * @param id 
   */
  goToCompareReport(id) {    
      this.openCompareRep = true;
      this.selectedReportId = id;
  }
  /**
   * This function used to close the popup.
   * @param evt 
   */
  closePopup(evt) {
      if (evt) {
          this.openCompareRep = false;
      }

  }
}
