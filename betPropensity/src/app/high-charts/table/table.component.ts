/**
 *  A class representing a TableComponent and its functionality.
 */
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { BetPropensityApiService } from '../../services/bet-propensity-api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() id: any;
  @Input() name: any;
  @Input() values: any;
  @Input() tableRowData: any;
  @Input() tableColData: any;
  @Input() tableWidth = { width: '350px' };
  @Input() reportCol = [];
  @Input() oddBandRange = [];
  @Input() stakeBandRange = [];
  hideTable = true;
  limit = 100;
  totalRecords = 0;
  selectedPage: any;
  pageNo = 1;
  constructor(public betPropensityApi: BetPropensityApiService) {
      
  }

  ngOnInit() {
      this.selectedPage = 0;
      this.pageNo = 1;
    
  }

  ngOnChanges(changes) {
      // only run when property "data" changed      
      if (changes['id'] || changes['stakeBandRange'] || changes['oddBandRange'] || changes['reportCol']) {         
          this.selectedPage = 0;
          this.limit = 100;
          this.pageNo = 1;
          if (this.reportCol && this.reportCol.length > 0 && this.id && this.stakeBandRange && this.stakeBandRange.length > 0 && this.oddBandRange && this.oddBandRange.length > 0) {              
              this.getDataFromService(this.limit, this.pageNo, this.id);
          }
      }
  }
  /**
   * This function used to get the data from service.
   * @param limit - limit of records 
   * @param page - page number
   * @param id
   */
  getDataFromService(limit, page, id) {
      let queryparams = {
          id: id,
          limit: limit,
          page: page
      }
      this.betPropensityApi.executeReportWithId(queryparams).subscribe(
          reportdetails => {             
              this.totalRecords = reportdetails.data.count;
              let columns = [];
              let newRowData = [];
              for (let col of this.reportCol) {
                  for (let dataCol of reportdetails.data.columns) {
                      if (dataCol == col.column_name) {
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
                      obj[reportdetails.data.columns[j]] = reportdetails.data.rows[i][j];
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
                          if (data.odds_band == oddRange.display_text || data['avg_odds_band'] == oddRange.display_text) {
                              data.display_order = oddRange.display_order;
                          }
                      }
                  }

              }

              let colWid = cols.length * 130 + 1;
              let tableWidth = { width: colWid + "px" };
              this.tableRowData = newRowData.sort(function (order1, order2) {
                  return order1.display_order - order2.display_order;
              });
              this.tableColData = cols;
              this.tableWidth = tableWidth;
              this.hideTable = false;             
          },
          err => {
              if (err.status === 400) {
                  this.hideTable = true;

              }
          }
      );
  }
  /**
   * This function used for paginatation.
   * @param event
   */
  paginate(event) {
      this.limit = event.rows;
      this.pageNo = event.page + 1;
      this.selectedPage = event.first;
      this.getDataFromService(this.limit, this.pageNo, this.id);
  }
  /**
   * This function used for custom sort.
   * @param evt
   */
  customSort(evt) {
      let sortData = [];
      if (evt.column_name == "stake_band" || evt.column_name == "odds_band" || evt.column_name == "avg_odds_band") {
          if (this.tableRowData[0].display_order == 1) {
              this.tableRowData = this.tableRowData.sort(function (order1, order2) {
                  return order2.display_order - order1.display_order;
              });
          } else {
              this.tableRowData = this.tableRowData.sort(function (order1, order2) {
                  return order1.display_order - order2.display_order;
              });
          }
      }
  }
}
