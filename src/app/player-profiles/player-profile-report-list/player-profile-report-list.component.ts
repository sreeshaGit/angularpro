/**
 *  A class representing a PlayerProfileReportListComponent and its functionality.
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';

import { BetPropensityApiService } from '../../services/bet-propensity-api.service';
import { CreatePlayerProfileService } from '../../services/create-player-profile.service';

@Component({
  selector: 'app-player-profile-report-list',
  templateUrl: './player-profile-report-list.component.html',
  styleUrls: ['./player-profile-report-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerProfileReportListComponent implements OnInit {
    deleteConfirm = false;
    deleteId: any;
    listOfProfileReports = [];
    sortProfileReports = [];
    cols: any[];
/**
 * @param appCom - {AppComponent} instance of AppComponent
 * @param router - {Router} instance of Router
 * @param betPropensityApi  - {BetPropensityApiService} instance of BetPropensityApiService
 * @param createPlayerProfile - {CreatePlayerProfileService} instance of CreatePlayerProfileService
 */
  constructor(public appCom: AppComponent,
      private router: Router,   
      public betPropensityApi: BetPropensityApiService,
      public createPlayerProfile: CreatePlayerProfileService) {
      this.appCom.headerQueryString.next("Player Profile Report");
  }

  ngOnInit() {
      this.cols = [
          { field: 'Profile Id', header: 'Profile Id' },
          { field: 'Player Profiles', header: 'Player Profiles' },
          { field: 'Updated', header: 'Updated' }

      ];
      this.getPlayerProfileList();
  }
  /**
   * This function used to get the profiles list from service.
   */
  getPlayerProfileList() {
      this.sortProfileReports = [];
      this.betPropensityApi.getPlayerProfilesList().subscribe(
          resData => {
              this.sortResponceData(resData);
              this.listOfProfileReports = this.sortProfileReports.sort(function (first, second) {
                  return first.id - second.id;
              });
          }, (err) => {
              this.sortProfileReports = [];
              this.listOfProfileReports = [];
          }
      );
  }
/**
 * This function used to sort the given data.
 * @param listRep 
 */
  sortResponceData(listRep) {
      if (listRep.length > 0) {
          for (let data of listRep) {
              data['Profile Id'] = data.id;
              data['Player Profiles'] = data.name;
              data['Updated'] = data.created;             
              this.sortProfileReports.push(data);
          }
      }
  }

  /**
* This method used to navigate based on the report Id to report result page.
* @param reportId {number}
*/
  goToReport(reportId, reportName) {     
      this.createPlayerProfile.setPageFrom(false);     
      this.createPlayerProfile.hideUpdate.next(true);
      this.router.navigate(['profile-result', { id: reportId, name: reportName}]);
  }
  /**
   * This method used to navigate based on the report Id to report result page.
   * @param reportId {number}
   */
  goToEdit(reportId) {            
      this.createPlayerProfile.setPageFrom(false);
      this.router.navigate(['create-profile', reportId]);  
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
   * This function used to close the delete popup.
   * @param evt 
   */
  closeDeletePopup(evt) {
      if (evt) {
          this.deleteConfirm = false;
      }

  }
  /**
   * This function used to delete the selected report from service.
   * @param evt 
   */
  deleteOpt(evt) {
      if (evt) {
         this.deleteConfirm = false;
         this.betPropensityApi.deletePlayerProfile(this.deleteId).subscribe(
              (data) => {
                  this.getPlayerProfileList();                
              }, (err) => {
                  this.getPlayerProfileList();                 
              }
          );
      }
  }
}
