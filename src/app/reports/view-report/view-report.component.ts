import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { AppComponent } from '../../app.component';
import { CreateReportService } from '../../services/create-report.service';
import { BetPropensityApiService } from '../../services/bet-propensity-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as global from '../../config/config';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewReportComponent implements OnInit {
  avgodds: any;
  actions = [];
  cols: any[];
  columns: any;
  dropdownSettings = {};
  disableButton = false;
  displayReportTime: any;
  displayMessage: any;
  displayError = "Query execution failed.Please contact the support team with details of the query you were trying to execute.";
  displayPopUpText: any;  
  error = false;
  fromPage: any;
  hideDropdown = true;
  isReportCompare = true;
  isEmailChecked = false;
  showUpdate: any;
  limit = 100;
  loader = true;
  loadPlayerData = false;
  outputColumnData = [];
  outputColumn = [];
  outputColumnDropdownSettings = {};
  outputBy = [];
  oddBandRange = [];
  openAlert = false;
  openMsgAlert = false;
  previewId: any;
  pageNo = 1;
  playersData: any;
  rows = [];
  rowsData: any;
  reportName: any;
  reportId: any;
  responseData: any;
  selectedColumns = [];
  selectedOutputBy = [];
  selectedPage :any;
  multiSortMeta: any[];
  typeOfReport = '';
  tableData = [];
  tableDataEmpty = false;
  total = 0;
  msgType: any;
  singleTabTotal : any;
  selectedOutputColumn = [];
  showDropDown = false;
  stakeBandRange = [];
  selectedActions = "";
  summaryRowHeader = [];
  reportCol = [];
  width1 = { width: '350px' };
/**
 * 
 * @param appCom - {AppComponent} instance of AppComponent
 * @param createReportService - {CreateReportService} instance of CreateReportService
 * @param betPropensityApi - {BetPropensityApiService} instance of BetPropensityApiService
 * @param router - {Router} instance of Router
 * @param route - {ActivatedRoute} instance  of ActivatedRoute
 */
  constructor(public appCom: AppComponent,
      public createReportService: CreateReportService,
      public betPropensityApi :BetPropensityApiService,
      private router: Router,
      private route: ActivatedRoute) {
      this.appCom.headerQueryString.next("View Report");

     
  }

  ngOnInit() {
      this.selectedPage = 0;
      this.actions = global.Config().exportDataActions;
      this.selectedActions = "Actions";
      this.getReportColumns();
      this.outputColumnDropdownSettings = {
          singleSelection: false,
          text: "Select Fields",
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          searchPlaceholderText: 'Search Fields',
          enableSearchFilter: true,
          badgeShowLimit: 20,        
      };

      this.dropdownSettings = {
          singleSelection: true,
          text: "Select Fields",
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          searchPlaceholderText: 'Search Fields',
          enableSearchFilter: true,
          badgeShowLimit: 20
      };

      this.getOutputColumnData();
      this.getOutputByData();
      this.getStakebandConfig();
      this.getOddsBandConfig();
      this.createReportService.hideUpdate.subscribe(
          hideUpdate => {
              this.showUpdate = hideUpdate;
          }
      );    
      this.fromPage = this.createReportService.getPageFrom();
      this.reportId = this.route.snapshot.params.id;
      this.createReportService.typeOfView.subscribe(
          resData => {             
                  this.typeOfReport = resData;                      
          }
      );

      let date = new Date();      
      this.displayReportTime = this.getDateFormat(date);
    
      if (this.reportId && !this.fromPage) {        
              this.getReportWithId();        
          this.reportName = this.route.snapshot.params.name;
      } else if (!this.reportId || this.reportId && this.fromPage) {         
          this.getReportWithJson();
      } 

      this.createReportService.hideDropdown.subscribe(
          hideDropdown => {              
              this.hideDropdown = hideDropdown;
          }
      );
     
  }
/**
 * This function gets the stake band data.
 */
  getStakebandConfig() {
      this.betPropensityApi.getStakeRange().subscribe(
          resData => {              
              this.stakeBandRange = resData.stakerange;
              if (this.responseData && this.reportCol.length > 0 && this.stakeBandRange.length > 0) {
                  this.getvalidData(this.responseData);
              }
          }
      );
  }
/**
 * This function gets the odds range Data.
 */
  getOddsBandConfig() {
      this.betPropensityApi.getOddsRange().subscribe(
          resData => {             
              this.oddBandRange = resData.outputrange;
              if (this.responseData && this.reportCol.length > 0 && this.oddBandRange.length > 0) {
                  this.getvalidData(this.responseData);
              }
          }
      );
  }
/**
 * 
 * @param obj 
 */
  isObjectEmpty(obj){    
    return Object.getOwnPropertyNames(obj).length >= 1
  }

/**
 * This function checks and appends data to Table parameters.
 * @param resData - response data
 */
  getvalidData(resData) {   
     if (resData.data && resData.data.result == "success") {           
          let newCol = [];
          this.summaryRowHeader =[];
          for (let col of this.reportCol) {             
              for (let dataCol of resData.data.columns) {                 
                  if (dataCol == col.column_name) {
                      newCol.push(col)
                  }
              }   
              if(resData['data']['summary']['current_period'] && resData['data']['summary']['current_period'] != null && this.isObjectEmpty(resData['data']['summary']['current_period'])){
                for(let data in resData['data']['summary']['current_period']){
                    if (data == col.column_name) {                   
                       resData['data']['summary']['current_period'][data].displayText = col.display_text;   
                    }
                  }
              }
             
          }
     if(resData['data']['summary']['current_period'] && resData['data']['summary']['current_period'] != null && this.isObjectEmpty(resData['data']['summary']['current_period'])){                     
        for(let keysData in resData['data']['summary']['current_period']){
            for(let data in resData['data']['summary']['previous_period']){              
                if(keysData === data){                                       
                    for(let current of resData['data']['summary']['current_period'][keysData]){
                        for(let previous of resData['data']['summary']['previous_period'][data]){                           
                           if(current.from == previous.from){                                                                 
                                let pcrt = ((current['value'] - previous['value']) / previous['value']) * 100;                            
                                current.percentage =  pcrt.toFixed(2);                     
                           }
                        }                        
                    }
                
                }
            }
            resData['data']['summary']['current_period'][keysData].valueTo = keysData;                   
            this.summaryRowHeader.push(resData['data']['summary']['current_period'][keysData]);
          }  
        } 
        
          this.rows = resData.data.rows;
          this.columns = resData.data.columns;         
          let newRowData = [];
          let latCol = [];
                      
          for (let data of newCol){
              data.field = data.column_name;
              data.header = data.display_text;
          }
         
          this.cols = newCol;

          for (let i = 0; i < this.rows.length; i++) {
              let obj = {};
              for (let j = 0; j < this.rows[i].length; j++) {                
                  obj[this.columns[j]] = this.rows[i][j];
              }

              newRowData.push(obj);
          }
         
         
          if (newRowData.length > 0){
              for (let data of newRowData) {
                  for (let stake of this.stakeBandRange) {
                      if (data.stake_band == stake.display_text) {
                          data.display_order = stake.display_order;
                      }
                  }
              }

              for (let data of newRowData) {
                  for (let oddRange of this.oddBandRange) {
                      if (data.odds_band == oddRange.display_text || data.avg_odds_band == oddRange.display_text) {
                          data.display_order = oddRange.display_order;
                      }
                  }
              }

          }
          
          this.rowsData = newRowData.sort(function (order1, order2) {
              return order1.display_order - order2.display_order;
          });
        
          this.selectedColumns = this.cols.sort(function (order1, order2) {
              return order1.display_order - order2.display_order;
          });
        
          let colWid = this.cols.length * 130 + 1;
          this.width1 = { width: colWid+"px"};         
          this.singleTabTotal =   this.getTotalOfRecordsforMultiple(this.rowsData); 
      } else {          
          this.displayMessage = this.displayError;
      }
  }
/**
 * This function used to apply custom sort for table.
 * @param evt  - table event.
 */
  customSort(evt) {      
      let sortData = [];
      if (evt.column_name == "stake_band" || evt.column_name == "odds_band" || evt.column_name == "avg_odds_band"){         
          if (this.rowsData[0].display_order == 1) {
              this.rowsData = this.rowsData.sort(function (order1, order2) {
                  return order2.display_order - order1.display_order;
              });
          } else {
              this.rowsData = this.rowsData.sort(function (order1, order2) {
                  return order1.display_order - order2.display_order;
              });
          }                    
      }   
  }
/**
 * This function used to apply custom sort for compare report type table.
 * @param evt - table event.
 * @param index - table selected index
 */
  customSortForCompare(evt, index) {     
      let sortData = [];
      if (evt.column_name == "stake_band" || evt.column_name == "odds_band" || evt.column_name == "avg_odds_band") {
          if (this.tableData[index].rowsData[0].display_order == 1) {
              this.tableData[index].rowsData = this.tableData[index].rowsData.sort(function (order1, order2) {
                  return order2.display_order - order1.display_order;
              });
          } else {
              this.tableData[index].rowsData = this.tableData[index].rowsData.sort(function (order1, order2) {
                  return order1.display_order - order2.display_order;
              });
          }
      }   
  }
/**
 * This function used to navigate to back page.
 * @param fromWhere 
 */
  back(fromWhere) {     
      if (this.reportId){         
              this.router.navigate(['create-report', this.reportId]);        
      } else {
              let reportData = this.createReportService.getCompareReportObj();
              this.createReportService.selReportIds.next(reportData.compare ? reportData.compare.report_ids : []);
              this.router.navigate(['create-report']); 
      }        
  }
/**
 * This function used to save the report with the selected details.
 */
  saveReport() {      
      this.displayMessage = '';
      this.error = false;
      this.disableButton = true;
      if (!this.reportName) {         
          this.error = true;
          return;
      }
      if (this.typeOfReport === 'New report') {
          let data = this.createReportService.getReportObj();
          let outputCol = [];
          this.createReportService.outputCol.subscribe(
              resData => {                 
                  outputCol = [];
                //  this.selectedOutputColumn = resData;
                  for (let data of resData) {                   
                      outputCol.push(data);
                  }
              }
          );

          let outputBy = [];
          this.createReportService.outputBy.subscribe(
              resData => {
                  outputBy = [];
                //  this.selectedOutputBy = resData;
                  for (let data of resData) {
                      outputBy.push(data);
                  }
              }
          );
          this.reportId = 0;
          let reportObj = {
              "id": 0,
              "name": this.reportName,
              "top_count": data.top ? data.top.count : '',
              "top_by": outputBy.toString(),
              "queryJSON": data.queryJSON,
              "outputColumns": outputCol,
              "outputData": data.outputData,
          }

          this.createReportService.setReportObj(reportObj);

          this.betPropensityApi.createReport(reportObj).subscribe(
              resData => {
                  this.disableButton = false;
                  this.displayMessage = "Report saved successfully.";
                  this.reportId = resData.id;
                  reportObj.id = resData.id;
                  this.createReportService.setReportObj(reportObj);
                  let data = {
                      "id": resData.id,
                      "name": resData.name,
                      "top_count": resData.top_count,
                      "top_by": resData.top_by,
                      "queryJSON": resData.queryJSON,
                      "outputColumns": resData.outputColumns,
                      "outputData": resData.outputData,
                      "top": { "count": resData.top_count, "by": resData.top_by }
                  }


              },
              error => {
                  this.disableButton = false;
                  this.displayMessage = this.displayError;
              }
          );
      }
      if (this.typeOfReport === 'Report Comparison'){
          let reportData = this.createReportService.getCompareReportObj();
          // this.reportName = reportData.name;
          let Com = {

              "compare": reportData.compare
          }
          let reportCom = {
              "id": 0,
              "name": this.reportName,
              "top_count": '',
              "top_by": '',
              "queryJSON": Com,
              "outputColumns": [],
              "outputData": [],              
          }
          this.betPropensityApi.createReport(reportCom).subscribe(
              resData => {
                  this.disableButton = false;
                  this.displayMessage = "Report saved successfully.";
                  this.reportId = resData.id;
                  let data = {
                      "id": resData.id,
                      "name": resData.name,
                      "top_count": resData.top_count,
                      "top_by": resData.top_by,
                      "queryJSON": resData.queryJSON,
                      "outputColumns": resData.outputColumns,
                      "outputData": resData.outputData,
                      "top": { "count": resData.top_count, "by": resData.top_by }
                  }


              },
              error => {
                  this.disableButton = false;
                  this.displayMessage = this.displayError;
              }
          );
      } 

     
  }
/**
 * This method used to update the report data.
 */
  updateReport() {
      this.displayMessage = '';
      this.error = false;
      if (!this.reportName) {
          this.error = true;
          return;
      }
      this.disableButton = true;
      if (this.typeOfReport === 'New report') {
          let data = this.createReportService.getReportObj();
          let outputCol = [];
          this.createReportService.outputCol.subscribe(
              resData => {
                  outputCol = [];
                  for (let data of resData) {
                      outputCol.push(data);
                  }
              }
          );
          let outputBy = [];
          this.createReportService.outputBy.subscribe(
              resData => {
                  outputBy = [];
                  for (let data of resData) {
                      outputBy.push(data);
                  }
              }
          );

          let reportObj = {
              "id": data.id,
              "name": this.reportName,
              "top_count": data.top_count,
              "top_by": outputBy.toString(),
              "queryJSON": data.queryJSON,
              "outputColumns": outputCol,
              "outputData": data.outputData,
             // "top": { "count": data.top_count, "by": outputBy.toString() }
          }

          this.createReportService.setReportObj(reportObj);
          this.betPropensityApi.updateReport(reportObj, data.id).subscribe(
              resData => {
                  this.disableButton = false;
                  this.loader = false;
                  this.displayMessage = "Report updated successfully.";
              },
              error => {
                  this.disableButton = false;
                  this.loader = false;
                  this.displayMessage = this.displayError;
              }

          );     
      }
      if (this.typeOfReport === 'Report Comparison'){          
          let reportData = this.createReportService.getCompareReportObj();       
          let compare = {
              "report_ids": reportData.compare ? reportData.compare.report_ids : ''
          }
          let reportObj = {
              "id": reportData.compare ? reportData.compare.id : '',
              "name": this.reportName,
              "top_count": '',
              "top_by": [],
              "queryJSON": { "compare": compare},
              "outputColumns": [],
              "outputData": [],
              "top": { "count": '', "by": '' }
          }          
          this.betPropensityApi.updateReport(reportObj, reportData.compare.id).subscribe(
              resData => {
                  this.disableButton = false;
                  this.loader = false;
                  this.displayMessage = "Report updated successfully.";
              },
              error => {
                  this.disableButton = false;
                  this.loader = false;
                  this.displayMessage = this.displayError;
              }

          );     
      }   
  }
/**
 * This function used to get report data based on the report Id.
 */
  getReportWithId() {
      let queryparams = {
          id: this.reportId,
          limit: this.limit,
          page: this.pageNo
      }
      this.loader = true;
      this.betPropensityApi.executeReportWithId(queryparams).subscribe(
          resData => {            
              this.loader = false;             
              if (resData && resData.hasOwnProperty('data')) {                
                  this.responseData = resData;
                  if (this.responseData && this.reportCol.length > 0) {
                      this.getvalidData(resData);
                  }
                 
                  this.total = resData.data.count;
                  this.createReportService.typeOfView.next('New report');
              } else if (resData && resData.length > 0) {
                 
                  let tableData = [];
                  for (let data of resData) {
                      tableData.push(this.formatTableData(data));
                  }                  
                  this.tableData = tableData;
                  this.createReportService.typeOfView.next('Report Comparison');
              }
             
          },
          error => {
              this.loader = false;
              this.displayMessage = this.displayError;
          }
      );

  }
/**
 * This function used to get the report data based on the selections made.
 */
  getReportWithJson() {     
      let reportObj = {};
      this.displayMessage = '';
      if (this.typeOfReport === 'New report') {
          let outputCol = [];         
          this.showDropDown = true;
          this.createReportService.outputCol.subscribe(
              resData => {                 
                  outputCol = [];
               //   this.selectedOutputColumn = resData;
                  for (let data of resData) {                   
                      outputCol.push(data);
                  }
              }
          );
         
          let outputBy = [];
          this.createReportService.outputBy.subscribe(
              resData => {                 
                  outputBy = [];
                 // this.selectedOutputBy = resData;                  
                  for (let data of resData) {                
                      outputBy.push(data);
                  }
              }
          );
          
          let data = this.createReportService.getReportObj();
          this.reportName = data.name;
          reportObj = {
              "top": { "count": data.top_count, "by": outputBy},
              "outputColumns": outputCol,
              "outputData": data.outputData,
              "queryJSON": data.queryJSON,
              "limit": this.limit,
              "page": this.pageNo,
          }
          this.loader = true;
          this.betPropensityApi.getReportResult(reportObj).subscribe(
              resData => {
                  this.loader = false;
                  this.responseData = resData;
                  if (this.responseData && this.reportCol.length > 0) {
                    this.getvalidData(resData);
                  }
                  this.total = resData.data.count;
              },
              error => {
                  this.loader = false;
                  this.displayMessage = this.displayError;
              }
          );
     
      }
      if (this.typeOfReport === 'Report Comparison') {
        
        let reportData = this.createReportService.getCompareReportObj();
        this.reportId = reportData.compare? reportData.compare.id :'';
        this.reportName = reportData.compare? reportData.compare.name:'';
        let reportCom = {
            "compare": reportData.compare
        }

        this.betPropensityApi.getReportsCompare(reportCom).subscribe(
            resData => {
                this.loader = false;
                let tableData = [];
                if (resData.length > 0) {
                    for (let data of resData) {
                        tableData.push(this.formatTableData(data));
                    }
                    this.tableData = tableData;
                } else {
                    this.tableDataEmpty = true;
                }
            },
            error => {
                this.loader = false;
                this.displayMessage = this.displayError;
            }
        );
     
      }

  }
/**
 * This function used to get the totals of the column data.
 * @param event 
 */
  onColumnChange(event) {         
      this.getTotalOfRecordsforMultiple(event.filteredValue);

  }
/**
 * This method used to get the multiple table data.
 * @param evt 
 * @param ind 
 */
  onDropdown(evt, ind) {     
      for (let i = 0; i <= this.tableData.length;i++){
          if (ind == i) {             
              this.tableData[i].count = evt.value.length;
          }
      }      
  }
/**
 * This function formats the date.
 * @param date 
 */
  getDateFormat(date) {
      return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
  }
/**
 * This function used to format the response data to append table.
 * @param resData - response data
 */
  formatTableData(resData) {
   
      let rows = resData.results.data.rows;
      let columns = resData.results.data.columns;     
          let newRowData = [];
          let latCol = [];

          let newCol = [];
          for (let col of this.reportCol) {
              for (let dataCol of resData.results.data.columns) {
                  if (dataCol == col.column_name) {
                      newCol.push(col)
                  }
              }
          }

          for (let data of newCol) {
              data.field = data.column_name;
              data.header = data.display_text;
          }

          for (let i = 0; i < rows.length; i++) {
              let obj = {};
              for (let j = 0; j < rows[i].length; j++) {
                  obj[columns[j]] = rows[i][j];
              }
              newRowData.push(obj);
          }


          if (newRowData.length > 0) {
              for (let data of newRowData) {
                  for (let stake of this.stakeBandRange) {
                      if (data.stake_band == stake.display_text) {
                          data.display_order = stake.display_order;
                      }
                  }
              }

              for (let data of newRowData) {
                  for (let oddRange of this.oddBandRange) {                     
                      if (data.odds_band == oddRange.display_text || data.avg_odds_band == oddRange.display_text) {
                          data.display_order = oddRange.display_order;
                      }
                  }
              }

          }

          for (let k = 0; k < newCol.length; k++) {
              latCol.push({ "field": newCol[k].field, "header": newCol[k].header });
          }
          let cols = latCol;
          let rowsData = newRowData.sort(function (order1, order2) {
              return order1.display_order - order2.display_order;
          });
          let totals = this.getTotalOfRecordsforMultiple(rowsData);         
          let selectedColumns = newCol.sort(function (order1, order2) {
              return order1.display_order - order2.display_order;
          });
          let colWid = cols.length * 130 + 1;
          let width = { width: colWid + "px" };

          let formattedData = {
              "cols": selectedColumns,
              "rowsData": rowsData,
              "selectedColumns": selectedColumns,
              "columns": columns,
              "rows": rows,
              "totals": totals,
              "reportName": resData.report_name,
              "count": columns.length,
              "width": width,
              "totalRecords": resData.results.data.count,
              "limit": 100,
              "selectedPage": 0,
              "reportId": resData.report_id,
              "pageNo": 1,
              "loader": false
          };
        
          return formattedData;
     
  }
/**
 * This method makes the records total and returns data.
 * @param data responce data
 */
  getTotalOfRecordsforMultiple(data) {     
      let turnover = 0;
      let pl = 0;
      let num_bets = 0;
      let avgodds = 0;
      let num_bets_percent = 0;
      let pl_percent = 0;
      let turnover_percent = 0;     
      let yieldVal = 0;
      let num_selections = 0;
      let num_selections_percent = 0;
      let roi = 0;
      let multiples = 0;
      let trebles = 0;
      let doubles = 0;
      let singles = 0;
      let num_players = 0;

      for (let tot of data) {         
          if ('turnover' in tot) {
              turnover += tot.turnover;
          }
          if ('pl' in tot) {
              pl += tot.pl;
          }
          if ('num_bets' in tot) {
              num_bets += tot.num_bets;
          }
          if ('avgOdds' in tot) {
              avgodds += tot.avgOdds;
          }
          if ('num_bets_percent' in tot) {
              num_bets_percent += tot.num_bets_percent;
          }
          if ('pl_percent' in tot) {
              pl_percent += tot.pl_percent;
          }
          if ('turnover_percent' in tot) {
              turnover_percent += tot.turnover_percent;
          }
          if ('yield' in tot) {
              yieldVal += tot.yield;

          }
          if ('num_selections' in tot) {
              num_selections += tot.num_selections;
          }
          if ('num_selections_percent' in tot) {
              num_selections_percent += tot.num_selections_percent;
          }
          if ('roi' in tot) {
              roi += tot.roi;
          }
          if ('multiples' in tot) {
              multiples += tot.multiples;
          }
          if ('trebles' in tot) {
              trebles += tot.trebles;
          }
          if ('doubles' in tot) {
              doubles += tot.doubles;
          }
          if ('singles' in tot) {
              singles += tot.singles;
          }
          if ('num_players' in tot) {
              num_players += tot.num_players;
          }
      }
    
      let totalData = {
          "turnover": turnover.toLocaleString(),
          "pl": pl.toLocaleString(),
          "num_bets": num_bets.toLocaleString(),
          "avgodds": avgodds.toLocaleString(),
          "pl_percent": Math.round(pl_percent).toLocaleString() + '%',
          "turnover_percent": Math.round(turnover_percent).toLocaleString() + '%',
          "num_bets_percent": Math.round(num_bets_percent).toLocaleString() + '%',
          "yieldVal": Math.round(yieldVal).toLocaleString() + '%',
          "num_selections": num_selections.toLocaleString(),
          "num_selections_percent": Math.round(num_selections_percent).toLocaleString() + '%',
          "roi": Math.round(roi).toLocaleString() + '%',
          "multiples": multiples.toLocaleString(),
          "trebles": trebles.toLocaleString(),
          "doubles": doubles.toLocaleString(),
          "singles": singles.toLocaleString(),
          "num_players": num_players.toLocaleString()
         // "playerTotal" : this.total
    
      };     
      return totalData;
  }
/**
 * This method used to valided the report info.
 * @param evt 
 */
  reportValid(evt) {      
      if (evt.target.value != "" && evt.target.value != null) {
          this.disableButton = false;
          this.error = false;         
      } else {         
          this.disableButton = true;
          this.error = true;          
      }
  }
/**
 * This method used to call api based on page numbers.
 * @param event 
 */
  paginate(event) {    
      this.limit = event.rows;
      this.pageNo = event.page + 1;
      this.selectedPage = event.first;
      if (this.reportId && !this.fromPage) {
          this.getReportWithId();
      } else {
          this.getReportWithJson();
      }
  }
/**
 * This method used to call api based on page numbers for compare report type of reports.
 * @param event 
 * @param tableData 
 * @param ind 
 */
  paginateRepCom(event, tableData, ind) {    
      let queryparams = {
          id: tableData.reportId,
          limit: tableData.limit,        
          page: event.page + 1
      }
     
      this.tableData[ind].loader = true;
      this.betPropensityApi.executeReportWithId(queryparams).subscribe(
          resData => {
              this.loader = false;
              if (resData && resData.hasOwnProperty('data')) {
                  let rows = resData.data.rows;
                  let columns = resData.data.columns;
                  let newRowData = [];
                  let latCol = [];

                  let newCol = [];
                  for (let col of this.reportCol) {
                      for (let dataCol of resData.data.columns) {
                          if (dataCol == col.column_name) {
                              newCol.push(col)
                          }
                      }
                  }

                  for (let data of newCol) {
                      data.field = data.column_name;
                      data.header = data.display_text;
                  }

                  for (let i = 0; i < rows.length; i++) {
                      let obj = {};
                      for (let j = 0; j < rows[i].length; j++) {
                          obj[columns[j]] = rows[i][j];
                      }
                      newRowData.push(obj);
                  }


                  if (newRowData.length > 0) {
                      for (let data of newRowData) {
                          for (let stake of this.stakeBandRange) {
                              if (data.stake_band == stake.display_text) {
                                  data.display_order = stake.display_order;
                              }
                          }
                      }

                      for (let data of newRowData) {
                          for (let oddRange of this.oddBandRange) {
                              if (data.odds_band == oddRange.display_text) {
                                  data.display_order = oddRange.display_order;
                              }
                          }
                      }

                  }

                  for (let k = 0; k < newCol.length; k++) {
                      latCol.push({ "field": newCol[k].field, "header": newCol[k].header });
                  }
                  let cols = latCol;
                  let rowsData = newRowData.sort(function (order1, order2) {
                      return order1.display_order - order2.display_order;
                  });
                  let totals = this.getTotalOfRecordsforMultiple(rowsData);
                  let selectedColumns = newCol.sort(function (order1, order2) {
                      return order1.display_order - order2.display_order;
                  });
                  let colWid = cols.length * 130 + 1;
                  let width = { width: colWid + "px" };            
                  let formattedData = {
                      "cols": cols,
                      "rowsData": rowsData,
                      "selectedColumns": selectedColumns,
                      "columns": columns,
                      "rows": rows,
                      "totals": totals,
                      "reportName": tableData.reportName,
                      "count": columns.length,
                      "width": width,
                      "totalRecords": resData.data.count,
                      "limit": event.rows,
                      "pageNo": event.page + 1,                      
                      "selectedPage": event.first,
                      "reportId": tableData.reportId,
                      "loader": false
                  };
                
                  this.tableData[ind] = formattedData;
              } 
          },
          error => {
              this.loader = false;
              this.displayMessage = this.displayError;
          }
      );
      

  }
  /**
    * This function used to get output columns.
    */
  getOutputColumnData() {
      this.betPropensityApi.getAttributesList().subscribe(
          resData => {
              if (resData) {                                       
                  this.outputColumnData = resData;
                  if (this.reportCol.length > 0 && this.outputColumnData.length > 0) {
                     
                      this.generateOutputColData();
                      this.setOutputColData();
                  }              
              }
          }
      );
  }
/**
 * This method used to format outputColumns data.
 */
  generateOutputColData() {
      let outputColumn = [];
      let count = 1;
      for (let i = 0; i < this.outputColumnData.length; i++) {
          if (this.outputColumnData[i].table == 'outputColumns') {
              for (let j = 0; j < this.outputColumnData[i].columns.length; j++) {
                  for (let col of this.reportCol) {
                      if (this.outputColumnData[i].columns[j] == col.column_name) {
                          outputColumn.push({ "id": count, "itemName": col.display_text, "category": this.outputColumnData[i].table, "name": this.outputColumnData[i].columns[j] });
                      }
                  }
                  count++
              }
          }
      }
      this.outputColumn = outputColumn;
  }
  /**
   * This method used to set the default data to Output Columns.
   * @param data 
   */
  setDefaultOutputColData(data) {
      let reportObj = this.createReportService.getReportObj();    
      let latOutputColData = [];
      if (reportObj.outputColumns.length > 0) {
          for (let i = 0; i < data.length; i++) {
              for (let j = 0; j < reportObj.outputColumns.length; j++) {
                  if (data[i].itemName == reportObj.outputColumns[j]) {
                      latOutputColData.push(data[i]);
                  }
              }

          }
          this.selectedOutputColumn = latOutputColData;
      }
      this.createReportService.outputCol.next(this.selectedOutputColumn);

  }

   /**
    * 
    * @param item
    * @param from 
    */
  onItemSelect(item: any, from) {
      this.disableButton = false;    
      switch (from) {
          case 'outputCol':             
              let outputColumndata = [];
              for (let data of this.selectedOutputColumn) {
                  outputColumndata.push(data.name);
              }
              this.createReportService.outputCol.next(outputColumndata);
              this.getReportWithJson();
              break;
          case 'outputBy':
              let outputBy = [];            
              for (let data of this.selectedOutputBy) {
                  outputBy.push(data.key);
              }
              this.createReportService.outputBy.next(outputBy);
              this.getReportWithJson();
              break;        
      }               
  }
  /**
   * 
   * @param item
   * @param from
   */
  OnItemDeSelect(item: any, from) {
      this.disableButton = false;
      switch (from) {
          case 'outputCol':             
              let outputColumndata = [];
              for (let data of this.selectedOutputColumn){
                  outputColumndata.push(data.name);
              }
             this.createReportService.outputCol.next(outputColumndata);
              this.getReportWithJson();
              break;
          case 'outputBy':
              let outputBy = [];
              for (let data of this.selectedOutputBy) {
                  outputBy.push(data.key);
              }
              this.createReportService.outputBy.next(outputBy);
              this.getReportWithJson();
              break;
      }           
  }
  /**
   * 
   * @param items
   * @param from
   */
  onSelectAll(items: any, from) {
      this.disableButton = false;
      if (from == 'outputCol') {
          let outputColumndata = [];
          for (let data of this.selectedOutputColumn) {
              outputColumndata.push(data.name);
          }
          this.createReportService.outputCol.next(outputColumndata);
          this.getReportWithJson();
      }  
  }
  /**
   * 
   * @param items
   * @param from
   */
  onDeSelectAll(items: any, from) {
      this.disableButton = false;
      if (from == 'outputCol') {
          let outputColumndata = [];
          for (let data of this.selectedOutputColumn) {
              outputColumndata.push(data.name);
          }
          this.createReportService.outputCol.next(outputColumndata);
          this.getReportWithJson();
      }   
  }
  /**
   * This function used to navigate to profile details page.
   * @param id - player Id
   */
  gotoUserSummary(id) {
      let link = window.location.origin
      window.open(link + '/#/profile-details/' + id);
  }
  /**
   * This function used to get the table columns data.
   */
  getReportColumns() {
      this.betPropensityApi.getReportColumns().subscribe(
          resCol => {                         
              this.reportCol = resCol.columns;
              if (this.reportCol.length > 0 && this.outputColumnData.length > 0) {
                  
                  this.generateOutputColData();
                  this.setOutputColData();
              }
              if (this.responseData && this.reportCol.length > 0) {
                  this.getvalidData(this.responseData);
              }

          }

      );
  }

  /**
    * This function used to get the outputby.
    */
  getOutputByData() {
      this.betPropensityApi.getOutputBy().subscribe(resData => {
          let count = 1;
          let outputBy = [];
          for (let j = 0; j < resData.outputby.length; j++) {
              outputBy.push({ "id": count, "itemName": resData.outputby[j].display_text, "key": resData.outputby[j].value });
              count++
          }
          this.outputBy = outputBy;
          this.setOutputBy(this.outputBy);
      });
  }
/**
 * This function used to set outputBy data of report.
 * @param data 
 */
  setOutputBy(data) {
  
      let latOutputByData = [];
      this.selectedOutputBy = [];
      this.createReportService.outputBy.subscribe(
          resData => {
              latOutputByData = [];            
              for (let col of resData) {
                  for (let data of this.outputBy) {
                      if (col == data.key) {
                          latOutputByData.push(data);

                      }
                  }
              }
              this.selectedOutputBy = latOutputByData;
          }
      );
  }
/**
 * This function used to export selection.
 * @param dt - table object
 * @param opt - option selected text.
 */
  exportData(dt, opt) {     
      switch (opt){
          case 'Export to CSV':
              dt.exportCSV();
              this.openAlert = true; 
              this.displayPopUpText = "Data exported to CSV successfully.";             
              break;
          case 'Export to CRM':
              this.openAlert = true; 
              this.displayPopUpText = "Data exported to CRM successfully.";
              break;
          case 'Send Email':            
              this.openMsgAlert = true;
              this.msgType = 'Send Email';                         
              break;
          case 'Send SMS':
              this.openMsgAlert = true;
              this.msgType = 'Send SMS';          
              break;
          case 'Send WhatsApp':
              this.openMsgAlert = true;
              this.msgType = 'Send WhatsApp';           
              break;
      }
  }
/**
 * This function used to close the success popup.
 * @param evt 
 */
  closePopup(evt) {      
      if (evt) {
          this.openAlert = false;
      }
  }
/**
 * This function used to close email check popup.
 * @param evt 
 */
  closeMessagePopup(evt) {      
      if (evt) {
          this.openMsgAlert = false;
      }

  }
/**
 * This function used to display success popup when data exported to email.
 * @param evt 
 */
  dispalySuccessPopUp(evt) {
      if (evt) {
          this.openMsgAlert = false;
          this.openAlert = true;

          switch (this.msgType) {             
              case 'Send Email':             
                  this.displayPopUpText = "Email sent successfully.";
                  break;
              case 'Send SMS':               
                  this.displayPopUpText = this.isEmailChecked ? "SMS and Email sent successfully." : "SMS sent successfully.";
                  break;
              case 'Send WhatsApp':                
                  this.displayPopUpText = this.isEmailChecked ? "WhatsApp message and Email sent successfully." : "WhatsApp message sent successfully.";
                  break;
          }

      }
  }
/**
 * This function get the event.
 * @param evt 
 */
  isEmailCheck(evt) {
      this.isEmailChecked = evt;
  }
  /**
   * This function used to get the output columns data from servcie.
   */
  setOutputColData() {
      let outputCol = [];
      this.selectedOutputColumn = [];     
      this.createReportService.outputCol.subscribe(
          resData => {             
              outputCol = [];
              for (let col of resData){
                  for (let data of this.outputColumn) {                     
                      if (col == data.name) {
                          outputCol.push(data);
                          
                      }
                  }
              }
              this.selectedOutputColumn = outputCol;
          }
      );
  }
}
