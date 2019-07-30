/**
 *  A class representing a LineChartComponent and its functionality.
 */
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

import { DashboardService } from '../../services/dashboard.service';
import { BetPropensityApiService } from '../../services/bet-propensity-api.service';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

    @Input() name: any;
    @Input() values: any;
    @Input() rowData: any;
    @Input() fromPage: any;
    @Input() colData: any;
    @Input() reportType: any;
    @Input() pieVal: any;
    displayOnDemand = false;
    Highcharts = Highcharts;
    chartConstructor = 'chart';
    chartOptions: any;
    updateFlag = false; 
    categories: any;
    oneToOneFlag = true;
    oddBandRange = [];
    data = [];
    stakeBandRange = [];
    pieError = false;
    yAxis = [];
    /**     
     * @param dashboardService - {DashboardService} instance of DashboardService.
     * @param betPropensityApi - {BetPropensityApiService} instance of BetPropensityApiService.
     */
    constructor(public dashboardService: DashboardService, public betPropensityApi: BetPropensityApiService) { }

    ngOnInit() {       
        this.chartOptions = {};
       
        if (this.fromPage == 'create') {         
          if (this.reportType == 'pie') {
              let pieData = this.getPieChartFormatData(this.name, this.values, this.rowData);
              this.pieChartFormation(pieData, this.name, this.reportType);             
            //  this.updateFlag = true;
          } else {
                        
              if (this.values.length > 0) {
                  let isPercent = false;
                  let isNotPercent = false;
                  for (let selected of this.values){                                     
                      for (let item of this.colData) {
                          if (selected.display_text == item.header && item.show_percentage_sign) {                                             
                              isPercent = true;
                          } else if (selected.display_text == item.header && !item.show_percentage_sign){                                              
                              isNotPercent = true;
                          }
                      }
                  }
                  if (this.name.data_type != "number" && this.name.data_type != "integer" && this.name.display_text != "Player ID" && this.name.display_text != 'Stake Band' && this.name.display_text != 'Average Odds Band' && this.name.display_text != 'Odds Band' && !this.name.isCompare ) {                     
                      this.rowData = this.rowData.sort(this.dynamicSort(this.name.display_text));                     
                  } else if (this.name.data_type == "integer" || this.name.data_type == "number" && !this.name.isCompare) {
                      var self = this;
                      this.rowData = this.rowData.sort(function (a, b) { return a[self.name.display_text] - b[self.name.display_text] });
                  }
                  if (isPercent && isNotPercent) {                                      
                      this.categories = this.getNameData(this.name.header, this.rowData);
                      let details = this.fromMultiAxisChartData(this.values, this.rowData);
                      this.data = details.data;
                      this.yAxis = details.yAxis;

                      this.chartFromationMultiAxis(this.data, this.categories, this.name, this.reportType, this.yAxis); 
                  } else if ((isPercent && !isNotPercent) || (!isPercent && isNotPercent)) {
                     
                      this.categories = this.getNameData(this.name.header, this.rowData);                      
                      let details= this.fromSingleAxisChartData(this.values, this.rowData);
                      this.chartFromationSingleAxis(details.data, this.categories, this.name, this.reportType, details.yAxis); 
                  }
              }                     
          }
        } else {
           
          this.dashboardService.reportSelectedOptions.subscribe(
              options => {                              
                  if (options.length > 0) {                     
                      this.displayOnDemand = false;
                      for (let opt of options) {                          
                          if (opt.reportType == 'table') {
                              this.chartOptions = {};
                          } else if (opt.reportType == 'pie') {
                           
                              let pieData = this.getPieChartFormatData(opt.name, opt.pieVal, opt.rowData);                              
                              this.pieChartFormation(pieData, opt.name, opt.reportType);
                             // this.updateFlag = true;
                              break;
                          } else {
                              let isPcrt = false;
                              let prct = false;
                        
                              this.data = [];
                              this.yAxis = [];
                              this.categories = [];                           
                              if (opt.value.length > 0) {
                                  let isPercent = false;
                                  let isNotPercent = false;                               
                                  for (let selected of opt.value) {                                     
                                      for (let item of this.colData) {
                                          if (selected.display_text == item.header && item.show_percentage_sign) {                                             
                                              isPercent = true;
                                          } else if (selected.display_text == item.header && !item.show_percentage_sign){                                              
                                              isNotPercent = true;
                                          }
                                      }
                                  }
                                  if (opt.name.data_type != "number" && opt.name.data_type != "integer" && opt.name.display_text != "Player ID" && opt.name.display_text != 'Stake Band' && opt.name.display_text != 'Average Odds Band' && opt.name.display_text != 'Odds Band' && !opt.name.isCompare) {                                     
                                      opt.rowData = opt.rowData.sort(this.dynamicSort(opt.name.display_text));                                     
                                  } else if (opt.name.data_type == "integer" || opt.name.data_type == "number" && !opt.name.isCompare) {                                      
                                      opt.rowData = opt.rowData.sort(function (a, b) { return a[opt.name.display_text] - b[opt.name.display_text] });
                                  }

                                  if (isPercent && isNotPercent) {                                      
                                      this.categories = this.getNameData(opt.name.header, opt.rowData);                                      
                                      let details = this.fromMultiAxisChartData(opt.value, opt.rowData);
                                      this.data = details.data;
                                      this.yAxis = details.yAxis;
                                      this.chartFromationMultiAxis(this.data, this.categories, opt.name, opt.reportType, this.yAxis); 
                                  } else if ((isPercent && !isNotPercent) || (!isPercent && isNotPercent)) {                                                                          
                                      this.categories = this.getNameData(opt.name.header, opt.rowData);                                     
                                      let details = this.fromSingleAxisChartData(opt.value, opt.rowData);                                      
                                      this.chartFromationSingleAxis(details.data, this.categories, opt.name, opt.reportType, details.yAxis); 
                                  }
                              }                                       
                          }
                      }
                  }
              }
          );
      }     
    }
    /**
     * This function used to sort the text based on the property.
     * @param property
     */
    dynamicSort(property) {
        var sortOrder = 1;

        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }

        return function (a, b) {
            if (sortOrder == -1) {
                return b[property].localeCompare(a[property]);
            } else {
                return a[property].localeCompare(b[property]);
            }
        }
    }
    
    /**
     * This function used format single axis chart.
     * @param values 
     * @param rowData 
     */
    fromSingleAxisChartData(values, rowData) {
       
        let data1 = [];
        let yAxis = [];
        for (let val of values) {
            for (let col of this.colData) {
                if (col.header == val.display_text) {
                    yAxis.push({
                        title: {
                            text: col.header,
                        }

                    });
                    data1.push({
                        "name": col.header,
                        "data": this.getNameData(val.header, rowData)
                    });
                }
            }
        }      
        return { yAxis: yAxis, data : data1};
    }
    /**
     * This function used to format multi axis charts.
     * @param values 
     * @param rowData 
     */
    fromMultiAxisChartData(values, rowData) {       
      let data1 = [];
      let yAxis = [];
      let ind = 1;
      for (let val of values) {           
          for (let col of this.colData) {            
              if (col.header == val.display_text) {                                   
                  if (col.show_percentage_sign){
                      yAxis.push({
                          title: {
                              text: col.display_text,
                          },
                          labels: {
                              align: 'right'
                          },
                          opposite: true
                      });
                     
                      data1.push({
                          "name": col.display_text,
                          "data": this.getNameData(val.header, rowData),
                          "yAxis": ind
                      });
                      ind++;
                  } else {
                      yAxis.push({
                          title: {
                              text: col.display_text,
                          }                         

                      });

                      data1.push({
                          "name": col.display_text,
                          "data": this.getNameData(val.header, rowData),                          
                      });
                  }
                  
               
              } 

              
          }   
         
        
      }   
      return { yAxis: yAxis, data: data1 };
  }
  /**
   * This function used to format name data to display in charts.
   * @param value 
   * @param rowData 
   */
    getNameData(value, rowData) {   
      let nameData = [];
      for (let data of rowData) {     
          if (data.hasOwnProperty(value)) {
              nameData.push(data[value])
              
          }
      }    
      return nameData;
  }
  /**
   * This function used to format pie chart header data.
   * @param name 
   * @param value 
   * @param rowData 
   */
  getPieChartData(name, value, rowData) {    
      let row = [];
      for (let val of rowData) {          
          if (typeof val[value['header']] != 'string' && val[value['header']] && val[name['header']]){           
              row.push({
                  name: val[name['header']],
                  y: val[value['header']],
              });
          }          
      }
      return row;
  }
  /**
   * This function used to format pie chart data to display pie chart.
   * @param name 
   * @param value 
   * @param rowData 
   */
  getPieChartFormatData(name, value, rowData) {       
      let valParam: any;
      for (let data of this.colData) {          
          if (data.display_text == value.display_text) {
              valParam = data.display_text;
              break;
          }
      }
      let data1 = [];   
      data1.push({           
              "boostThreshold": 1,
              "name": valParam,
              "data": this.getPieChartData(name, value, rowData)
          });
      return data1;
  }
  /**
   * This function used to formation of pie chart.
   * @param seriesData 
   * @param name 
   * @param reportType 
   */
  pieChartFormation(seriesData, name, reportType) {      
      if (seriesData && seriesData[0].hasOwnProperty('data') && seriesData[0].data.length <= 0){         
          this.pieError = true;
          return;
      }
      setTimeout(() => {
      this.pieError = false;
      this.chartOptions = {};
      this.chartOptions = {         
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: reportType,
              reflow: true,             
          },
          boost: {
              enabled: true,
              useGPUTranslations: false
          },         
          title: {
              text: ''
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}</b>',
             
          },
          plotOptions: {
             
              pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: true,
                      format: '<b>{point.name}</b>: {point.percentage:.1f} %',                     
                  },
                  showInLegend: true,
                  borderWidth: 0
              },
              series: {
                  turboThreshold: 5000//larger threshold or set to 0 to disable
              }
          },
          series: seriesData        
      };
      this.displayOnDemand = true;
      }, 10);
  }
  /**
   * This function used to form multi axis chart.
   * @param seriesData 
   * @param categories 
   * @param name 
   * @param reportType 
   * @param yAxis 
   */
  chartFromationMultiAxis(seriesData, categories, name, reportType, yAxis) {
      let latestData = [];
      if (name.display_text != "Player ID" && name.display_text != 'Stake Band' && name.display_text != 'Average Odds Band' && name.display_text != 'Odds Band') {
          categories = categories.sort();
      }
      let nameParam :any;
      for(let data of this.colData){
          if (data.header == name.display_text){
              nameParam = name.header;
            break;
        }
      }
      setTimeout(() => {    //<<<---    using ()=> syntax        
          this.displayOnDemand = true;
          this.chartOptions = {};
          this.chartOptions = {
              chart: {
                  type: reportType ? reportType : '',
                  //height: 300,                  
                  style: {
                      fontFamily: 'Montserrat',
                      fontSize: '14px'
                  }
              },


              xAxis: {
                  categories: categories.length > 0 ? categories : [],
                  title: {
                      text: nameParam
                  }
              },
              
              yAxis: yAxis.length > 0 ? yAxis :[],
             
              legend: {
                  layout: 'horizontal',
                  align: 'center',
                  // verticalAlign: 'bottom',
                  //floating: true,
              },

              plotOptions: {
                  series: {
                      label: {
                          connectorAllowed: false,
                      },
                      turboThreshold: 5000//larger threshold or set to 0 to disable
                  }
              },

              credits: {
                  enabled: false
              },
              exporting: {
                  enabled: false
              },
              title: {
                  text: ''
              },

              series: seriesData.length > 0 ? seriesData : [],

              responsive: {
                  rules: [{
                      condition: {
                          maxWidth: 500
                      },

                  }]
              }

          }

      }, 10);
     
   
  }
  /**
   * This function used to form single axis charts.
   * @param seriesData 
   * @param categories 
   * @param name 
   * @param reportType 
   * @param yAxis 
   */
  chartFromationSingleAxis(seriesData, categories, name, reportType, yAxis) {      
      let latestData = [];     
      //if (name.data_type != "number" && name.data_type != "integer" && name.display_text != "Player ID" && name.display_text != 'Stake Band' && name.display_text != 'Average Odds Band' && name.display_text != 'Odds Band') {
      //    categories = categories.sort();
      //} else if (name.data_type == "integer" || name.data_type == "number") {         
      //    categories = categories.sort(function (a, b) { return a - b });
      //}
     
     
      let nameParam: any;
      for (let data of this.colData) {
          if (data.header == name.display_text) {
              nameParam = name.header;
              break;
          }
      }
      setTimeout(() => {    //<<<---    using ()=> syntax        
          this.displayOnDemand = true;
          this.chartOptions = {};
          this.chartOptions = {
              chart: {
                  type: reportType ? reportType : '',
                  //height: 300,
                  reflow: true,
                  style: {
                      fontFamily: 'Montserrat',
                      fontSize: '14px'
                  }
              },


              xAxis: {
                  categories: categories.length > 0 ? categories : [],
                  title: {
                      text: nameParam
                  }
              },
              yAxis: yAxis,
              legend: {
                  layout: 'horizontal',
                  align: 'center',
                  // verticalAlign: 'bottom',
                  //floating: true,
              },

              plotOptions: {
                  series: {
                      label: {
                          connectorAllowed: false
                      },
                      turboThreshold: 5000//larger threshold or set to 0 to disable
                  }
              },

              credits: {
                  enabled: false
              },
              exporting: {
                  enabled: false
              },
              title: {
                  text: ''
              },

              series: seriesData.length > 0 ? seriesData : [],

              responsive: {
                  rules: [{
                      condition: {
                          maxWidth: 500
                      },

                  }]
              }

          }

      }, 10);


  }
}
