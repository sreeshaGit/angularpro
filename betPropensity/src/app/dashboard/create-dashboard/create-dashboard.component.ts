/**
 *  A class representing a CreateDashboardComponent and its functionality.
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { DashboardService } from '../../services/dashboard.service';
import { BetPropensityApiService } from '../../services/bet-propensity-api.service';
import { DragulaService } from 'ng2-dragula';
import {ResizeEvent} from 'angular-resizable-element';

@Component({
  selector: 'app-create-dashboard',
  templateUrl: './create-dashboard.component.html',
  styleUrls: ['./create-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateDashboardComponent implements OnInit {
    chartsData = [];
    disableButton = false;
    displayUpdate = false;
    displaySuccessMsg = false;
    displayMsg = '';
    draggedChart: any;
    dragChartInd: any;
    deleteConfirmation = false;
    error = false;
    editReportDetails: any = [];
    editView = false;
    isReportLib = false;
    oddBandRange: any;   
    tableData = [];    
    reportName: any;
    reportCol: any;
    reportId: any;
    removeId: any;
    showOptions = false;
    selIndex: any;
    stakeBandRange: any;
    subs = new Subscription();   

    public myOptions = {
        transitionDuration: '0.8s',        
        horizontalOrder: true,
        percentPosition: true,
        
    };
    /**     
     * @param appCom - {AppComponent} instance of AppComponent 
     * @param dashboardService - {DashboardService} instance of DashboardService
     * @param betPropensityApi - {BetPropensityApiService} instance of BetPropensityApiService.
     * @param route - {ActivatedRoute} instance of ActivatedRoute.
     * @param dragulaService - {DragulaService} instance of DragulaService.
     */
    constructor(public appCom: AppComponent,
                public dashboardService: DashboardService,
                public betPropensityApi: BetPropensityApiService,
                private route: ActivatedRoute,
                private dragulaService: DragulaService) {

          this.appCom.headerQueryString.next("Create Dashboard");
            this.dragulaService.createGroup ('charts', {
              // revertOnSpill: true,
              moves: function (el:any, container:any, handle:any):any {
                if(el.id == 'addbutton'){
                  return false;
                }else{
                    return handle.className === 'BP-DB-chartBox__header-content'; 
                }
              }
            });
          this.subs.add(this.dragulaService.dropModel("charts").subscribe(args => {
      
            args.sourceModel.filter(function(item,index){
                item.display_order = index+1;
            })
            this.chartsData = args.sourceModel;
            this.updateDashboard();
          }));
    }

 

    ngOnInit() {
        this.getStakebandConfig();
        this.getOddsBandConfig();
        this.dashboardService.fromPage.subscribe(
            fromPage => {            
                if (fromPage == 'view') {
                    this.displayUpdate = true;
                } else {
                    this.displayUpdate = false;
                }
            }
        );
        if (this.route.snapshot.params.id){         
            this.reportId = this.route.snapshot.params.id; 
            this.editView = true;
            this.getDashboardDetails(this.route.snapshot.params.id);
        } else {
            this.editView = false;
        }

      this.dashboardService.reports.subscribe(
          resData => {              
              if (resData.length > 0) {                 
                  for (let data of resData) {                    
                      this.chartsData.push(data);
                  }
                                    
              }
          }
      );
      this.getReportColumns();
    }
    /**
     * This function used to resize the chart.
     * @param event 
     * @param ind 
     */
    onResizeEnd(event: ResizeEvent, ind): void {
        var data = this.chartsData[ind];
        this.chartsData[ind] = {};
        var self = this;
        setTimeout(function () {
            self.chartsData[ind] = data;
            if (event.edges.right > 0) {
                self.chartsData[ind].display_columns = 2;
                self.updateDashboard();
            } else if (event.edges.bottom < 0 || event.edges.top > 0) {
                self.chartsData[ind].display_columns = 2;
                self.updateDashboard();
            } else if (event.edges.bottom > 0 || event.edges.top < 0) {
                self.chartsData[ind].display_columns = 4;
                self.updateDashboard();
            }
        }, 10)
    }
    /**
     * This function used to add reports.
     */
  addReport() {
      this.editReportDetails = []; 
      this.isReportLib = true;
  }
  /**
   * This function used to close the report library popup.
   * @param evt 
   */
  close(evt) {
      if (evt) {
          this.isReportLib = false;
      }
  }
  /**
   * This function used to validate the report.
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
   * This function used to save dashboard.
   */
  saveDashboard() {
      this.showOptions = false;
      this.error = false;
      this.disableButton = true;
      if (!this.reportName) {
          this.error = true;
          return;
      }
      let reports = [];
      if (this.chartsData.length > 0) {
          let ind = 1;
          for (let data of this.chartsData) {                          
              reports.push({
                  "id": data.id,
                  "name": data.name,
                  "display_type": data.display_type,
                  "display_order": ind,
                  "display_columns": data.display_columns,
                  "name_column": data.name_column,
                  "value_columns": data.value_columns,
              });
              ind++;
          }
      }

       let data = {
            "id": 0,
            "name": this.reportName,
            "reports": reports
       }      
        this.betPropensityApi.createDashboard(data).subscribe(
            resData => {
                this.displaySuccessMsg = true;
                this.editView = true;
                this.displayUpdate = true;
                this.displayMsg = "dashboard saved successfully.";
                this.reportId = resData.id;
                this.reportName = resData.name;             
            },
            error => {
                this.displaySuccessMsg = false;
                
            }
        );
      
  }
  /**
   * This function used to get dashboard details.
   * @param id 
   */
  getDashboardDetails(id) {
      this.betPropensityApi.getDashboardDetails(id).subscribe(
          details => {
            
              this.reportName = details.name;
              this.reportId = details.id;
           
              for (let rep of details.reports) {
                  if (rep.display_type != "table"){
                      let queryparams = {
                          id: rep.id,
                          limit: 0,
                          page: 1
                      }
                      this.betPropensityApi.executeReportWithId(queryparams).subscribe(
                          reportdetails => {
                            
                              let columns = [];
                              let newRowData = [];
                              let ind = 0;
                              if (reportdetails.hasOwnProperty('data')) {                              
                                
                                  for (let col of this.reportCol) {
                                      for (let dataCol of reportdetails.data.columns) {
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

                                  for (let data of columns) {
                                      data.field = data.column_name;
                                      data.header = data.display_text;
                                  }

                                  let cols = columns.sort(function (order1, order2) {
                                      return order1.display_order - order2.display_order;
                                  });


                                  for (let i = 0; i < reportdetails.data.rows.length; i++) {
                                      let obj = {};
                                      for (let j = 0; j < reportdetails.data.rows[i].length; j++) {
                                          obj[columns[j]['header']] = reportdetails.data.rows[i][j];
                                      }

                                      newRowData.push(obj);
                                  }
                                  let colWid = cols.length * 130 + 1;
                                  let tableWidth = { width: colWid + "px" };
                                

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
                                  
                                  rep.tableRowData = newRowData.sort(function (order1, order2) {
                                      return order1.display_order - order2.display_order;
                                  });
                                  rep.tableColData = cols;
                                  rep.tableWidth = tableWidth;
                                  rep.hideWidget = false;
                              } else if (reportdetails && reportdetails.length > 0) {
                                
                                  for (let item of reportdetails) {
                                      columns = [];
                                      for (let col of this.reportCol) {
                                          
                                          for (let dataCol of item.results.data.columns) {
                                              if (dataCol == col.column_name) {
                                                 
                                                  let data:any = {
                                                      "field": col.column_name + ' ' + item.report_name,
                                                      "header": col.display_text + ' ' + item.report_name,
                                                      "value": col.column_name + ' ' + item.report_name,
                                                      "label": col.display_text + ' ' + item.report_name,
                                                      "id": ind,
                                                      "show_percentage_sign": col.show_percentage_sign,
                                                      "data_type": col.data_type,
                                                      "display_text": col.display_text
                                                  }
                                                 
                                                  col.field = col.column_name;
                                                  col.header = col.display_text;
                                                  col.value = col.column_name;
                                                  col.label = col.display_text;
                                                  col.id = ind;
                                                  ind++;                                                
                                                  columns.push(data);
                                              }
                                          }
                                      }

                                      let cols = columns.sort(function (order1, order2) {
                                          return order1.display_order - order2.display_order;
                                      });


                                      for (let i = 0; i < item.results.data.rows.length; i++) {
                                          let obj = {};
                                          for (let j = 0; j < item.results.data.rows[i].length; j++) {
                                              obj[columns[j]['header']] = item.results.data.rows[i][j];
                                          }

                                          newRowData.push(obj);
                                      }
                                      let colWid = cols.length * 130 + 1;
                                      let tableWidth = { width: colWid + "px" };

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
                                                  if (data.odds_band == oddRange.display_text || data['avg_odds_band'] == oddRange.display_text) {
                                                      data.display_order = oddRange.display_order;
                                                  }
                                              }
                                          }

                                      }

                                      rep.tableRowData = newRowData.sort(function (order1, order2) {
                                          return order1.display_order - order2.display_order;
                                      });
                                      rep.tableColData = cols;
                                      rep.tableWidth = tableWidth;
                                      rep.hideWidget = false;
                                  }
                                     


                              }
                             
                          },
                          err => {
                              if (err.status === 400) {
                                  rep.hideWidget = true;

                              }
                          }
                      );
                  }                  
              }

            
              this.dashboardService.reports.next(details.reports);
             
          },
          err => {
          
          }
      );
  }
  /**
   * This function used to get report columns.
   */
  getReportColumns() {
      this.betPropensityApi.getReportColumns().subscribe(
          resCol => {
              if (resCol){
                  this.reportCol = resCol.columns;
              }            
          }
      );
  }
  /**
   * This function used to update dashboard details.
   */
  updateDashboard() {     
      this.dragChartInd = null;
      this.showOptions = false;
      this.error = false;
      this.disableButton = true;
      if (!this.reportName) {
          this.error = true;
          return;
      }
      let reports = [];
      if (this.chartsData.length > 0) {
          for (let data of this.chartsData) {            
              reports.push({
                  "id": data.id,
                  "name": data.name,
                  "display_type": data.display_type,
                  "display_order": data.display_order,
                  "display_columns": data.display_columns,
                  "name_column": data.name_column,
                  "value_columns": data.value_columns,
              });
          }
      }

      let data = {
          "id": this.reportId,
          "name": this.reportName,
          "reports": reports
      }
    
      this.betPropensityApi.updateDashboard(this.reportId, data).subscribe(
          resData => {              
              this.displaySuccessMsg = true;
              this.editView = true;
              this.displayUpdate = true;
              this.displayMsg = "dashboard updated successfully.";
          },
          error => {
              this.displaySuccessMsg = false;
          }
      );
  }
  /**
   * This function used to edit the dashboard.
   */
  edit() {
      this.displayUpdate = false;
      this.displaySuccessMsg = false;
  }
  /**
   * This function used to edit dashboard report.
   * @param ind 
   * @param id 
   */
  editReport(ind, id) {     
    this.showOptions = true;
    this.selIndex = ind;
  }
  /**
   * This function used to close option.
   * @param ind 
   */
  closeOptions(ind) {     
    this.showOptions = false;    
    this.selIndex = ind;
  }
  /**
   * This function used to delete the dashboard.
   * @param ind 
   * @param id 
   */
  deleteDashboard(ind, id) {      
      this.selIndex = ind;
      this.removeId = id;
      this.deleteConfirmation = true;    
  }
  /**
   * This function used to edit charts.
   */
  editChart(ind, chartData) {      
    this.editReportDetails = [];   
    this.editReportDetails.push({ "chartData": chartData, "editInd": ind });
    this.isReportLib = true;
  }
  /**
   * This function used to remove previous data.
   * @param evt 
   */
  removePreviousData(evt) {
      this.showOptions = false; 
      this.chartsData.splice(evt.ind, 1, evt.editData);
      this.updateDashboard();
  }
  /**
   * This function used to drag start.
   * @param event 
   * @param index 
   */
  dragStart(event, index) {     
      this.dragChartInd = index;
      this.draggedChart = index;
  }
  /**
   * This function used drag end.
   * @param event 
   * @param index 
   */
  dragEnd(event, index) {     
      let sports = [];
      this.dragChartInd = null;
      var dropChart = this.chartsData[index];
      var dragChart = this.chartsData[this.draggedChart];
      this.chartsData[index] = dragChart;
      this.chartsData[this.draggedChart] = dropChart;

     
      this.chartsData[index].display_order = index + 1;
      this.chartsData[this.draggedChart].display_order = this.draggedChart + 1;

      this.updateDashboard();
   
  }
  /**
   * This function used to close delete popup.
   * @param evt 
   */
  closeDeletePopup(evt) {     
      if (evt){
          this.deleteConfirmation = false;
      }
     
  }
  /**
   * This function used to delete options.
   * @param evt 
   */
  deleteOpt(evt) {     
      if (evt) {
        this.deleteConfirmation = false;
        let data = [];      
        this.chartsData.filter((item, index) => {          
            if (index != this.selIndex) {
                data.push(item)
            }
        });

        this.chartsData = data;        
        this.updateDashboard();
      }   
  }
  /**
   * This function used to get stake band range.
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
  /**
   * This function used to increase the chart size.
   * @param ind 
   */
  zoomIn(ind) {    
      var data = this.chartsData[ind];
      this.chartsData[ind] = {};
      var self = this;
      setTimeout(function () {
          self.chartsData[ind] = data;
          self.chartsData[ind].display_columns = 4;
          self.updateDashboard();
      }, 10)
      
  }
  /**
   * This function used to decrease the chart size.
   * @param ind 
   */
  zoomOut(ind) {     
      var data = this.chartsData[ind];
      this.chartsData[ind] = {};
      var self = this;
      setTimeout(function () {
          self.chartsData[ind] = data;
          self.chartsData[ind].display_columns = 2;
          self.updateDashboard();
      }, 10)
      
  }
  /**
   * This function used to end unsubscribe the elements.
   */
    ngOnDestroy() {
    // destroy all the subscriptions at once
    this.subs.unsubscribe();
    this.dragulaService.destroy("charts");
  }
}
