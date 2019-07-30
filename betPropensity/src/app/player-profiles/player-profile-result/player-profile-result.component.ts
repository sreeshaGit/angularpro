/**
 *  A class representing a PlayerProfileResultComponent and its functionality.
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppComponent } from '../../app.component';
import { BetPropensityApiService } from '../../services/bet-propensity-api.service';
import { CreatePlayerProfileService } from '../../services/create-player-profile.service';

@Component({
  selector: 'app-player-profile-result',
  templateUrl: './player-profile-result.component.html',
  styleUrls: ['./player-profile-result.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerProfileResultComponent implements OnInit {
    disableButton = false;
    displayMessage: any;
    displayError = "Query execution failed.Please contact the support team with details of the query you were trying to execute.";
    error = false;
    fromPage: any;
    loadPlayerData = false;
    loader = true;
    nameError = false;
    previewId: any;
    pageNo = 1;
    reportId: any;
    reportName: any;
    playersData:any = [];
    showUpdate :any;
    totalRecords = 0;
    selectedPage = 0;
    columns: any;
    cols: any;
    displayReportTime: any;   
    limit = 100;
    playerProfileColumns = [];
    rowsData = [];
    selectedColumns = [];
    total = 0;
    width1 = { width: '350px' };
    /**
     * @param appCom - {AppComponent} instance of AppComponent
     * @param createPlayerProfile - {CreatePlayerProfileService} instance of CreatePlayerProfileService
     * @param betPropensityApi - {BetPropensityApiService} instance of BetPropensityApiService
     * @param router - {Router} instance of Router
     * @param route - {ActivatedRoute} instance of ActivatedRoute
     */
  constructor(public appCom: AppComponent,
      public createPlayerProfile: CreatePlayerProfileService,
      public betPropensityApi: BetPropensityApiService,
      private router: Router,
      private route: ActivatedRoute) {
      this.appCom.headerQueryString.next("Profile Result");
  }

  ngOnInit() {
      this.selectedPage = 0;
      this.reportId = this.route.snapshot.params.id;   
      this.createPlayerProfile.hideUpdate.subscribe(
          hideUpdate => {
              this.showUpdate = hideUpdate;
          }
      );

      this.fromPage = this.createPlayerProfile.getPageFrom();
      if (this.reportId && !this.fromPage){
          this.getProfileWithId(this.reportId, this.limit, this.pageNo);
          this.reportName = this.route.snapshot.params.name;
      } else {
          this.getReportWithJson();
      }

      let date = new Date();
      this.displayReportTime = this.getDateFormat(date);
      this.getPlayerProfileColumns();
  }
  /**
   * This function used to get the columns data of player profiles.
   */
  getPlayerProfileColumns() {
      this.betPropensityApi.getPlayerProfileColumns().subscribe(
          columnsData => {

              if (columnsData.columns.length > 0) {
                  this.playerProfileColumns = columnsData.columns;
                  this.profilePreview();
              }
              if (this.playersData.length > 0 && this.playerProfileColumns.length > 0) {

                  this.formatTableData(this.playersData);
              }

          }
      );
  }
  /**
   * This function used to get the player profile data with previewId.
   * @param previewId - its token 
   * @param pageNo - page number
   * @param limit - page limit
   */
  playerProfilePreview(previewId, pageNo, limit) {
      this.loader = true;
      this.betPropensityApi.playerProfilePreviewPaging(previewId, pageNo,limit).subscribe(
          resData => {
              this.loader = false;
              if (resData && resData.result == "success") {
                  if (resData.players.length > 0) {
                      this.error = false;
                      this.playersData = resData.players;
                      this.formatTableData(resData);
                  } else {
                      this.error = true;
                  }
              }
              if (this.playersData.length > 0 && this.playerProfileColumns.length > 0) {
                  
                  this.formatTableData(this.playersData);
              }
          },
          error => {
              this.loader = false;
              this.displayMessage = this.displayError;
          }
      );
  }
  /**
   * This function used to get profile data when there is previewId.
   */
  profilePreview() {
      if (this.previewId) {
          this.playerProfilePreview(this.previewId, this.pageNo, this.limit);
      }
  }
/**
 * This function used to get data format for table display.
 * @param resData 
 */
  formatTableData(resData) {
          if (resData.length > 0) {
              this.error = false;
              this.rowsData = resData;
              this.columns = Object.keys(resData[0]);
              this.selectedColumns = this.columns;          
              let latCol = [];
              for (let k = 0; k < this.columns.length; k++) {
                  for (let j = 0; j < this.playerProfileColumns.length; j++) {
                      if (this.columns[k] == this.playerProfileColumns[j].column_name) {
                          this.playerProfileColumns[j].field = this.playerProfileColumns[j].column_name;
                          this.playerProfileColumns[j].header = this.playerProfileColumns[j].display_text;
                      }
                  }
              }
              this.cols = this.playerProfileColumns.sort(function (order1, order2) {
                  return order1.display_order - order2.display_order;
              });
              this.selectedColumns = this.cols;
              let colWid = this.cols.length * 130 + 1;
              this.width1 = { width: colWid + "px" };
          } else {
              this.error = true;
          }
  }
/**
 * This function used to export the csv file.
 * @param dt 
 */
  exportCSVFile(dt) {
      dt.exportCSV();
    
  }
/**
 * This function used to format the date.
 * @param date 
 */
  getDateFormat(date) {
      return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
  }

/**
 * This function used to navigate to player summary page.
 * @param id 
 */
  gotoUserSummary(id) {
      let link = window.location.origin
      window.open(link + '/#/profile-details/' + id);
  }
/**
 * This function used to show pagination for table.
 * @param event 
 */
  paginate(event) {    
      this.limit = event.rows;
      this.pageNo = event.page + 1;
      this.selectedPage = event.first;
      if (this.reportId) {
          this.getProfileWithId(this.reportId, this.limit, this.pageNo);       
      } else {
          this.playerProfilePreview(this.previewId, this.pageNo, this.limit);
      }
    
  }
/**
 * This function used to get the profile data with JSON.
 */
  getReportWithJson() {
      let reportObj = {};
          let playerProfile = this.createPlayerProfile.getProfileInfo();
          this.reportId = playerProfile.id;
          this.reportName = playerProfile.name;
          let profileObj = {
              "periodrange": playerProfile.periodrange,
              "frequency": playerProfile.frequency,
              "type": playerProfile.type,
              "primary1": playerProfile.primary1,
              "primary2": playerProfile.primary2,
              "secondary": playerProfile.secondary,
          }
          this.loader = true;
          this.betPropensityApi.getPlayerProfileReport(profileObj).subscribe(
              resData => {              
                  this.loader = false;
                  this.previewId = resData.previewId;                 
                  this.totalRecords = resData.totalCount;                 
                  this.playerProfilePreview(resData.previewId, this.pageNo,this.limit) 
                
              },
                error => {
                  this.loader = false;
                  this.displayMessage = this.displayError;
              }
          );
  }


/**
 * This function used to navigate to back page.
 */
  back() {
      if (this.reportId) {         
          this.router.navigate(['create-profile', this.reportId]);      
      } else {         
          this.router.navigate(['create-profile']);
      }
  }
/**
 * This function used to save the report dat to service.
 */
  saveReport() {
      this.nameError = false;
      this.disableButton = true;
      if (!this.reportName) {
          this.nameError = true;
          return;
      }
      
      let playerProfile = this.createPlayerProfile.getProfileInfo();

          let profileInfo = {
              "id": 0,
              "name": this.reportName,
              "frequency": playerProfile.frequency,
              "periodrange": playerProfile.periodrange,
              "primary1": playerProfile.primary1,
              "primary2": playerProfile.primary2,
              "secondary": playerProfile.secondary,
              "type": playerProfile.type
          }

          this.betPropensityApi.savePlayerProfile(profileInfo).subscribe(
              resData => {
                  this.displayMessage = "successfully saved query";
                  this.reportId = resData.id;
                  this.disableButton = false;
                  let data = {
                      "id": resData.id,
                      "name": resData.name,
                      "frequency": resData.frequency,
                      "periodrange": resData.periodrange,
                      "primary1": resData.primary1,
                      "primary2": resData.primary2,
                      "secondary": resData.secondary,
                      "type": resData.type
                  }
                  this.createPlayerProfile.setProfileInfo(data);

              }
          );      
  }
/**
 * This function used to valid the report name.
 * @param evt 
 */
  reportValid(evt) {
      if (evt.target.value != "" && evt.target.value != null) {
          this.disableButton = false;
          this.nameError = false;
      } else {
          this.disableButton = true;
          this.nameError = true;
      }
  }
/**
 * This function used to get the data  of profile with there IDS.
 * @param reportId - report Id
 * @param limit - limit of records to display.
 * @param pageNo - page number.
 */
  getProfileWithId(reportId, limit, pageNo) {
      this.totalRecords = 0;
      this.loader = true;
      this.betPropensityApi.executePlayerProfReport(this.reportId, this.limit, this.pageNo).subscribe(
          data => {                         
              this.loader = false;
              if (data && data.result == "success") {
                  this.totalRecords = data.count;  
                  if (data.players.length > 0) {
                      this.error = false;
                      this.playersData = data.players;
                      this.formatTableData(data);
                  } else {
                      this.error = true;
                  }
              }            
              if (this.playersData.length > 0 && this.playerProfileColumns.length > 0) {
                  this.formatTableData(this.playersData);
              }
                                      
          }
      );
  }
/**
 * This method used to update the player profile reports.
 */
  updateReport() {
      this.nameError = false;
      if (!this.reportName) {
          this.nameError = true;
          return;
      }
      this.disableButton = true;
     
      let resData = this.createPlayerProfile.getProfileInfo();

          let profileObj = {
              "periodrange": resData.periodrange,
              "frequency": resData.frequency,
              "type": resData.type,
              "primary1": resData.primary1,
              "primary2": resData.primary2,
              "secondary": resData.secondary,
              "id": resData.id,
              "name": this.reportName,
          }
         
          this.betPropensityApi.updatePlayerProfile(resData.id, profileObj).subscribe(
              resData => {
                  this.createPlayerProfile.setPageFrom(false);
                  this.loader = false;
                  this.disableButton = false;
                  this.displayMessage = "successfully updated player profile report";
                  let data = {
                    "id": resData.id,
                    "name": resData.name,
                    "frequency": resData.frequency,
                    "periodrange": resData.periodrange,
                    "primary1": resData.primary1,
                    "primary2": resData.primary2,
                    "secondary": resData.secondary,
                    "type": resData.type
                }
                this.createPlayerProfile.setProfileInfo(data);
              },
              error => {
                  this.loader = false;
                  this.displayMessage = this.displayError;
              }
          );
      
  }
}
