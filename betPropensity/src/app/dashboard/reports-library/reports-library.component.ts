/**
 *  A class representing a ReportsLibraryComponent and its functionality.
 */
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Subject } from 'rxjs/Subject';

import { BetPropensityApiService } from '../../services/bet-propensity-api.service';
import { DashboardService } from '../../services/dashboard.service';
@Component({
  selector: 'app-reports-library',
  templateUrl: './reports-library.component.html',
  styleUrls: ['./reports-library.component.scss']
})
export class ReportsLibraryComponent implements OnInit {
    cols = [];
    columns = [];
    displayValidationMsg = false;
    displayOrder: any;
    displayColumns: any;
    finalArray = [];
    hideOption = false;
    noColData = false;
    nameOption = [];
    oddBandRange: any;  
    pieData = [];
    pieDataCol = [];
    rows: any = [];
    reportIdSel: any;
    reportName: any;   
    reportData: any;
    reportList: any;
    repTypes: any;
    selectedReportType: any;
    selectedName: any;
    selectedValues: any = [];
    selectedValuesForPie: string;
    showTable = false;
    showDropdownForPie = false;
    showMsg = false;
    stakeBandRange: any;
    updateMode = false;
    tableWidth = { width: '350px' };
    @Input() reportCol: any;
    @Input() editReportDetails :any;
    @Output() closeReport: EventEmitter<any> = new EventEmitter();
    @Output() editReportData: EventEmitter<any> = new EventEmitter();
    
  Highcharts = Highcharts;
    /**
     * @param betPropensityApi - {BetPropensityApiService} instance of BetPropensityApiService.
     * @param dashboardService -{DashboardService} instance of DashboardService.
     */
  constructor(public betPropensityApi: BetPropensityApiService, public dashboardService: DashboardService) { }

  ngOnInit() {
      this.getStakebandConfig();
      this.getOddsBandConfig();
     
      this.getReportList();
      this.dashboardDisplayTypes();     
  }
  /**
   * This function used to close the report.
   */
  close() {
      this.closeReport.emit(true);
  }
  /**
   * This function used to select the type of chart.
   */
  selReportType() {
      this.showTable = false;
     
      this.displayValidationMsg = false;
   
      if(this.selectedReportType == 'gauge'){
        return;
      }
      if (this.selectedReportType == 'table') {     
          this.hideOption = true;        
          this.showTable = true;
      } else {
          this.hideOption = false;
      }
      if (this.selectedReportType == 'pie') {   
        this.showDropdownForPie = true;     
          if (this.selectedValuesForPie['header'] == this.selectedName['header']){
              this.displayValidationMsg = true;   
              return;        
          } else {
              this.displayValidationMsg = false;
          }
         
      } else {
          this.showDropdownForPie = false;
      }     
      if (this.selectedValues.length > 0){
          for (let val of this.selectedValues) {             
              if (val.header == this.selectedName['header'] && this.selectedReportType != 'table' && this.selectedReportType != 'pie') {                
                  this.displayValidationMsg = true;
                  return;
              } else {
                  this.displayValidationMsg = false;
              }
          }
      }

      let column_name = this.selectedValues.map((row, ind) => {
          return row;
      });  
      this.dashboardService.reportSelectedOptions.next([{ name: this.selectedName, reportType: this.selectedReportType, value: column_name, rowData: this.rows, pieVal: this.selectedValuesForPie, id: this.reportIdSel }]);    
  }
  /**
   * This function used to set report type.
   */
  dashboardDisplayTypes() {
      this.betPropensityApi.dashboardDisplayTypes().subscribe(
          resData => {             
              if (resData.display_types.length > 0) {
                  for (let repType of resData.display_types) {
                      repType.label = repType.display_text;                                           
                  }                
                  this.repTypes = resData.display_types;
              }
          }
      );
  }
  /**
   * This function gets the reports list.
   */
  getReportList() {
      this.betPropensityApi.getReportList().subscribe(
          resData => {
              this.reportList = resData;
              if (this.editReportDetails.length > 0) {                
                  this.updateMode = true;
                  this.selectedReportType = this.editReportDetails[0].chartData.display_type;
                  this.reportName = this.editReportDetails[0].chartData.name;
                  this.displayOrder = this.editReportDetails[0].chartData.display_order;
                  this.displayColumns = this.editReportDetails[0].chartData.display_columns;
                  this.editReport(this.editReportDetails);
              }
          }
      );
  }
  /**
   * This function used to select report type.
   * @param id 
   * @param name 
   * @param reportsData 
   */
  selectReport(id, name, reportsData) {
      this.showMsg = true;
      this.nameOption = [];    
      this.reportIdSel = id;
      this.reportName = name;
      this.selectedValues = [];
      this.selectedName = '';
      this.selectedValuesForPie = '';
      this.columns = [];
      this.rows = [];
      if (!this.selectedReportType || this.selectedReportType == '') {
          this.selectedReportType = "line";
      }
      let queryparams = {
          id: id,
          limit: 0,
          page: 1
      }
      this.betPropensityApi.executeReportWithId(queryparams).subscribe(
          resData => {            
              this.reportData = resData.data;            
              let ind = 0;
              let colDataInd = 0;
              let checkedInd =1;
              let columns = [];
              if (reportsData.is_comparison) {
                  this.columns = [];
                  this.rows = [];
                  for (let item of resData) {
                      columns = [];
                      item.results.data.report_name = item.report_name;
                      item.results.data.report_id = item.report_id;
                      
                      for (let dataCol of item.results.data.columns) {
                      for (let col of this.reportCol) {                                                                             
                              if (dataCol == col.column_name) {
                                  let data = {
                                      "field": col.column_name + ' '+ item.results.data.report_name,
                                      "header": col.display_text + ' '+ item.results.data.report_name,
                                      "value": col.column_name + ' '+ item.results.data.report_name,
                                      "label": col.display_text + ' '+ item.results.data.report_name,
                                      "id": ind,
                                      "show_percentage_sign": col.show_percentage_sign,
                                      "data_type": col.data_type,
                                      "display_text": col.display_text,
                                      "isCompare": true
                                  }
                                  col.field = col.column_name;
                                  col.header = col.display_text;
                                  col.value = col.column_name;
                                  col.label = col.display_text;
                                  col.id = ind;                                   
                                  ind++;
                                  columns.push(col);
                                  this.columns.push(data); 
                              }
                          }
                      }                    
                      let newRowData = [];                  
                      let latCol = [];
                     
                      for (let i = 0; i < item.results.data.rows.length; i++) {
                          let obj = {};
                          for (let j = 0; j < item.results.data.rows[i].length; j++) {
                              
                              obj[columns[j]['header'] +' '+ item.results.data.report_name ]  = item.results.data.rows[i][j];
                          }

                          this.rows.push(obj);
                      }
                      this.cols = columns.sort(function (order1, order2) {
                          return order1.display_order - order2.display_order;
                      });
                  }

                  let allInt = 1;
                  let colIndex = 0;

                  if (this.columns.length > 0) {
                      for (let col of this.columns) {                        
                          if (!this.selectedName && col.data_type == 'text') {                            
                              this.selectedName = col;
                              if (colIndex == 0) {
                                  this.selectedValuesForPie = this.columns[1];
                                  this.selectedValues.push(this.columns[1]);
                              } else if (colIndex > 0) {
                                  this.selectedValuesForPie = this.columns[0];
                                  this.selectedValues.push(this.columns[0]);
                              }
                          } else if (col.data_type == "integer" || col.data_type == "number") {                             
                              allInt++;
                          }
                        
                          if (allInt == this.columns.length) {                            
                              this.selectedName = this.columns[0];
                              if (this.selectedValuesForPie.length <= 0)
                              this.selectedValuesForPie = this.columns[1];
                              if (this.selectedValues.length <= 0)
                              this.selectedValues.push(this.columns[1]);
                          }

                          colIndex++;



                      }
                  }
                 
                  if (this.columns.length <= 0 || this.rows.length <= 0) {
                      this.noColData = true;
                  } else {
                      this.noColData = false;
                  }

                  // this.rows = newRowData;
                  let colWid = this.cols.length * 130 + 1;
                  this.tableWidth = { width: colWid + "px" };
                  this.nameOption = this.columns;
                 // this.pieData = resData.data.rows;
                  this.selReportType();
              } else {
                  if (resData.data.columns.length <= 0) {
                      this.noColData = true;
                  } else {
                      this.noColData = false;

                      for (let dataCol of resData.data.columns) {
                      for (let col of this.reportCol) {
                         
                              if (dataCol == col.column_name) {
                                  col.field = col.column_name;
                                  col.header = col.display_text;
                                  col.value = col.column_name;
                                  col.label = col.display_text;
                                  col.id = ind;
                                  ind++;
                                  columns.push(col);
                              }
                          }
                      }

                      this.columns = resData.data.columns;
                      let newRowData = [];
                      let latCol = [];
                      
                      for (let i = 0; i < resData.data.rows.length; i++) {
                          let obj = {};
                          for (let j = 0; j < resData.data.rows[i].length; j++) {
                              obj[columns[j]['header']] = resData.data.rows[i][j];
                          }

                          newRowData.push(obj);
                      }

                      this.cols = columns.sort(function (order1, order2) {
                          return order1.display_order - order2.display_order;
                      });

                      let allInt = 1;
                      let colIndex = 0;

                      if (columns.length > 0) {
                          for (let col of columns) {

                              if (!this.selectedName && col.data_type == 'text') {                                
                                  this.selectedName = col;
                                  if (colIndex == 0) {
                                      this.selectedValuesForPie = columns[1];
                                      this.selectedValues.push(columns[1]);
                                  } else if (colIndex > 0) {
                                      this.selectedValuesForPie = columns[0];
                                      this.selectedValues.push(columns[0]);
                                  }
                              } else if (col.data_type == "integer" || col.data_type == "number") {                                 
                                  allInt++;
                              }
                             
                              if (allInt == columns.length) {                                
                                  this.selectedName = columns[0];
                                  if (this.selectedValuesForPie.length <= 0)
                                  this.selectedValuesForPie = columns[1];
                                  if (this.selectedValues.length <= 0)
                                  this.selectedValues.push(columns[1]);                                 
                              }

                              colIndex++;
                          }
                      }
                    
                      if (newRowData.length > 0) {                         
                          for (let data of newRowData) {
                              for (let stake of this.stakeBandRange) {
                                  if (data['Stake Band'] == stake.display_text) {                                 
                                      data.display_order = stake.display_order;                                 
                                  }
                              }
                          }

                          for (let data of newRowData) {
                              for (let oddRange of this.oddBandRange) {
                                  if (data['Average Odds Band'] == oddRange.display_text || data['Odds Band'] == oddRange.display_text) {
                                      data.display_order = oddRange.display_order;                                    
                                  }
                              }
                          }

                      }
                     
                      this.rows = newRowData.sort(function (order1, order2) {
                          return order1.display_order - order2.display_order;
                      });
                     

                      let colWid = this.cols.length * 130 + 1;
                      this.tableWidth = { width: colWid + "px" };
                      this.nameOption = columns;
                      this.pieData = resData.data.rows;
                      this.selReportType();
                  }

              }
          },
          err => {
              this.noColData = true;
          }
      );
     
  }
  /**
   * This function used to edit the report.
   * @param editDetails 
   */
  editReport(editDetails) {     
      this.showTable = false;
      if (this.selectedReportType == "table") {
          this.showTable = true;
          this.hideOption = true;     
      }
      this.showMsg = true;
      this.nameOption = [];
      this.reportIdSel = editDetails[0].chartData.id;
      let is_comparison: any;
      
      if (this.reportList.length > 0) {
          let tempReportList = this.reportList;
          is_comparison = tempReportList.filter((item) => {
              return item.id == editDetails[0].chartData.id;
          })[0].is_comparison;        
      }
  
      this.selectedValues = [];
      this.selectedName = editDetails[0].chartData.name_column;
    //   if (typeof editDetails[0].chartData.value_columns == "object"){
    //       this.selectedValuesForPie = editDetails[0].chartData.value_columns[0];
    //   } else if (typeof editDetails[0].chartData.value_columns == "string"){
    //       this.selectedValuesForPie = editDetails[0].chartData.value_columns[0];
    //   }
     // if (this.selectedReportType != "table") {
          let queryparams = {
              id: editDetails[0].chartData.id,
              limit: 0,
              page: 1
          }
          this.betPropensityApi.executeReportWithId(queryparams).subscribe(
              resData => {
                  this.reportData = resData.data;
                  let ind = 0;
                  let columns = [];
                  if (is_comparison) {
                      for (let item of resData) {
                          columns = [];
                          item.results.data.report_name = item.report_name;
                          item.results.data.report_id = item.report_id;
                          for (let dataCol of item.results.data.columns) {
                          for (let col of this.reportCol) {
                             
                                  if (dataCol == col.column_name) {
                                      col.field = col.column_name;
                                      col.header = col.display_text;
                                      col.value = col.column_name;
                                      col.label = col.display_text;
                                      col.id = ind;
                                      let data = {
                                          "field": col.column_name + ' ' + item.results.data.report_name,
                                          "header": col.display_text + ' ' + item.results.data.report_name,
                                          "value": col.column_name + ' ' + item.results.data.report_name,
                                          "label": col.display_text + ' ' + item.results.data.report_name,
                                          "id": ind,
                                          "show_percentage_sign": col.show_percentage_sign,
                                          "data_type": col.data_type,
                                          "display_text": col.display_text
                                      }

                                      if (typeof editDetails[0].chartData.value_columns == "object" && editDetails[0].chartData.value_columns.length > 0) {

                                          for (let val of editDetails[0].chartData.value_columns) {                                           
                                              if (data.header == val.header) {
                                                  this.selectedValues.push(data);
                                              }
                                          }
                                      } else if (ind == 1) {                                                                     
                                          this.selectedValues.push(col);
                                      }

                                      ind++;
                                      columns.push(col);
                                      this.columns.push(data); 
                                  }
                              }

                          }
                          let newRowData = [];
                                                 
                          let latCol = [];
                        
                          for (let i = 0; i < item.results.data.rows.length; i++) {
                              let obj = {};
                              for (let j = 0; j < item.results.data.rows[i].length; j++) {

                                  obj[columns[j]['header'] + ' ' + item.results.data.report_name] = item.results.data.rows[i][j];
                              }

                              this.rows.push(obj);
                          }

                          this.cols = columns.sort(function (order1, order2) {
                              return order1.display_order - order2.display_order;
                          });
                      }
                      let colWid = this.cols.length * 130 + 1;
                      this.tableWidth = { width: colWid + "px" };
                      this.nameOption = this.columns;
                      // this.pieData = resData.data.rows;
                      this.selReportType();
                  } else {
                      for (let dataCol of resData.data.columns) {
                      for (let col of this.reportCol) {
                         
                              if (dataCol == col.column_name) {
                                  col.field = col.column_name;
                                  col.header = col.display_text;
                                  col.value = col.column_name;
                                  col.label = col.display_text;
                                  col.id = ind;
                                 

                                  if (typeof editDetails[0].chartData.value_columns == "object" && editDetails[0].chartData.value_columns.length > 0) {
                                    this.selectedValuesForPie = editDetails[0].chartData.value_columns[0];
                                      for (let val of editDetails[0].chartData.value_columns) {                                        
                                          if (col.column_name == val.column_name) {
                                              this.selectedValues.push(col);
                                          }
                                      }
                                  } else if (ind == 1) {
                                     this.selectedValuesForPie = editDetails[0].chartData.value_columns;

                                      //   this.selectedValuesForPie = col.column_name;                            
                                      this.selectedValues.push(col);
                                  }

                                  ind++;
                                  columns.push(col);
                              }
                          }
                      }

                      this.columns = resData.data.columns;
                      let newRowData = [];
                      let latCol = [];
                     
                      for (let i = 0; i < resData.data.rows.length; i++) {
                          let obj = {};
                          for (let j = 0; j < resData.data.rows[i].length; j++) {
                              obj[columns[j]['header']] = resData.data.rows[i][j];
                          }

                          newRowData.push(obj);
                      }
                      this.cols = columns.sort(function (order1, order2) {
                          return order1.display_order - order2.display_order;
                      });
                      if (newRowData.length > 0 ) {
                          for (let data of newRowData) {
                              if( this.stakeBandRange.length > 0)
                              for (let stake of this.stakeBandRange) {
                                  if (data['Stake Band'] == stake.display_text) {
                                      data.display_order = stake.display_order;
                                  }
                              }
                          }

                          for (let data of newRowData) {
                              if(this.oddBandRange.length > 0)
                              for (let oddRange of this.oddBandRange) {
                                  if (data['Average Odds Band'] == oddRange.display_text || data['Odds Band'] == oddRange.display_text) {
                                      data.display_order = oddRange.display_order;
                                  }
                              }
                          }

                      }

                      this.rows = newRowData.sort(function (order1, order2) {
                          return order1.display_order - order2.display_order;
                      });

                    //  this.rows = newRowData;
                      let colWid = this.cols.length * 130 + 1;
                      this.tableWidth = { width: colWid + "px" };
                      this.nameOption = columns;
                      this.pieData = resData.data.rows;
                      this.selReportType();
                  }
                  
              }
          );
   //   }
  }  
  /**
   * This function used to add report to dashboard.
   */
  addReportToDashboard() {
      let column_name = this.selectedValues.map((row, ind) => {
          return row;
      });
      
      let report = {
          "id": this.reportIdSel,                     
          "name": this.reportName,                       
          "display_type": this.selectedReportType,
          "display_order": 1,
          "display_columns": 2,
          "name_column": this.selectedName,
          "value_columns": this.selectedReportType == 'pie' ? this.selectedValuesForPie : column_name,
          "tableRowData": this.rows,
          "tableColData": this.cols,
          "tableWidth": this.tableWidth
      }
      let arr = {};
      arr[this.selectedReportType] = report;      
      this.finalArray.push(report);    
      this.dashboardService.reports.next(this.finalArray);     
      this.closeReport.emit(true);
  }
  /**
   * This function used to update report to dashboard.
   */
  updateReportToDashboard(){    
      let column_name = this.selectedValues.map((row, ind) => {
        return row;
    });
    let report = {
        "id": this.reportIdSel,                     
        "name": this.reportName,                       
        "display_type": this.selectedReportType,
        "display_order": this.displayOrder,
        "display_columns": this.displayColumns,
        "name_column": this.selectedName,
        "value_columns": this.selectedReportType == 'pie' ? this.selectedValuesForPie : column_name,
        "tableRowData": this.rows,
        "tableColData": this.cols,
        "tableWidth": this.tableWidth
    }
    let arr = {};
    arr[this.selectedReportType] = report;   
    this.editReportData.emit({"ind":this.editReportDetails[0].editInd,"editData":report});
    this.closeReport.emit(true);
  }
  /**
   * this function used to get stake band range.
   */
  getStakebandConfig() {
      this.betPropensityApi.getStakeRange().subscribe(
          resData => {
              this.stakeBandRange = resData.stakerange;
          }
      );
  }
  /**
   * This function used to get odds band range.
   */
  getOddsBandConfig() {
      this.betPropensityApi.getOddsRange().subscribe(
          resData => {
              this.oddBandRange = resData.outputrange;
          }
      );
  }
}
