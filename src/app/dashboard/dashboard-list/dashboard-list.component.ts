/**
 *  A class representing a DashboardListComponent and its functionality.
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router, ActivatedRoute } from '@angular/router';

import { DashboardService } from '../../services/dashboard.service';
import { BetPropensityApiService } from '../../services/bet-propensity-api.service';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardListComponent implements OnInit {
    deleteConfirm = false;
    deleteId: any;
    listOfDashboards = [];
    cols: any[];
    finalArray = [];
    removeReportName: any;
    /**     
     * @param appCom - {AppComponent} instance of AppComponent.
     * @param betPropensityApi - {BetPropensityApiService} instance of BetPropensityApiService.
     * @param router - {Router} instance of Router.
     * @param dashboardService - {DashboardService} instance of DashboardService.
     */
    constructor(public appCom: AppComponent,
        public betPropensityApi: BetPropensityApiService,
        private router: Router,
        private dashboardService: DashboardService) {
        this.appCom.headerQueryString.next("Dashboards");       
    }

    ngOnInit() {
        this.dashboardService.fromPage.next('');
        this.cols = [
            { field: 'Dashboard Id', header: 'Dashboard Id' },
            { field: 'Dashboard Name', header: 'Dashboard Name' },
            //{ field: 'Updated', header: 'Updated' }

        ];
        this.getDashboardList();
    }
    /**
     * This function used to get the dashboard list.
     */
    getDashboardList() {
        this.finalArray = [];
        this.betPropensityApi.getDashboardList().subscribe(
            resData => {
                if (resData.length > 0) {
                    this.sortResponceData(resData);             
                    this.listOfDashboards = this.finalArray.sort(function (first, second) {
                        return first.id - second.id;
                    });
                }               
            }, (err) => {
                this.finalArray = [];
                this.listOfDashboards =[];
            }
        );
    }
    /**
     * This Function used to delete Dashboard.
     * @param id 
     * @param name 
     */
    deleteDashboard(id,name) {      
        this.deleteId = id;
        this.removeReportName = name; 
        this.deleteConfirm = true;      
    }
    /**
     * This method used to close the delete popup.
     * @param evt 
     */
    closeDeletePopup(evt) {
        if (evt) {
            this.deleteConfirm = false;
        }

    }
    /**
     * This function used to delete the options.
     * @param evt 
     */
    deleteOpt(evt) {
        if (evt) {
          this.deleteConfirm = false;
          this.betPropensityApi.deleteDashboard(this.deleteId).subscribe(
            resData => {               
                this.getDashboardList();
            },
            error => {
                this.getDashboardList();
            }
          );
        }
    }
    /**
     * This function used to navigate to dashboard view page.
     * @param reportId 
     * @param reportName 
     */
    goToDashboard(reportId, reportName) {
        this.dashboardService.reports.next([]);
        this.router.navigate(['create-dashboard', { id: reportId, name: reportName }]);
        this.dashboardService.fromPage.next('view');
    }
    /**
     * This function used to edit the dashboard.
     * @param reportId 
     */
    goToEditDashboard(reportId) {
        this.dashboardService.reports.next([]);
        this.router.navigate(['create-dashboard', { id: reportId}]);
        this.dashboardService.fromPage.next('edit');
    }
    /**
     * This function used to sort the Data.
     * @param listRep 
     */
    sortResponceData(listRep) {
        if (listRep.length > 0) {       
            for (let data of listRep) {
                data['Dashboard Id'] = data.id;
                data['Dashboard Name'] = data.name;
                data['Updated'] = data.created;             
                this.finalArray.push(data); 
            }
        }              
    }
}
