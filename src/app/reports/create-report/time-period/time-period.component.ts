/**
 *  A class representing a TimePeriodComponent and its functionality.
 */
import { Component, OnInit, Input,ViewEncapsulation } from '@angular/core';

import * as global from '../../../config/config';
import { CreateReportService } from '../../../services/create-report.service';
@Component({
  selector: 'app-time-period',
  templateUrl: './time-period.component.html',
  styleUrls: ['./time-period.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimePeriodComponent implements OnInit {
    @Input() reportId: any;
    @Input() queryJson: any;
    dayFields = [];

    timeActions = [];
    selectedTimeActions : any;

    timeDayHours = [];
    selectedTimeOfDayHours : any;

    timePriorDay = [];
    timePriorHours = [];
    timePriorMin = [];
    selectedPriorDay :any;
    selectedPriorHours: any;
    selectedTimePriorMin: any;
    /**
     * 
     * @param createReportService - {CreateReportService} instance of CreateReportService.
     */
    constructor(public createReportService: CreateReportService) {
        this.dayFields = [
            { "dispalyName": "Mon", "checked": false, "value": 1 },
            { "dispalyName": "Tue", "checked": false, "value": 2 },
            { "dispalyName": "Wed", "checked": false, "value": 3 },
            { "dispalyName": "Thu", "checked": false, "value": 4 },
            { "dispalyName": "Fri", "checked": false, "value": 5 },
            { "dispalyName": "Sat", "checked": false, "value": 6 },
            { "dispalyName": "Sun", "checked": false, "value": 7 }
        ];

        this.timeActions = global.Config().timeActions;
        this.timeDayHours = global.Config().hours;        
        this.timePriorDay = global.Config().days;
        this.timePriorHours = global.Config().hours;
        this.timePriorMin = global.Config().minutes;

    }

  ngOnInit() {
      this.createReportService.daySelected.subscribe(
          resData => {
              if (resData.length > 0) {
                  this.dayFields = resData;
              }
          }
      );
      
      this.setPeriodData(this.dayFields);



      this.createReportService.priorEvtDays.subscribe(
          priorEvtDays => {
              if (priorEvtDays != null){
                  this.selectedPriorDay = priorEvtDays;
              }              
          }
      );
      this.createReportService.priorEvtHours.subscribe(
          priorEvtHours => {
              if (priorEvtHours != null){
                  this.selectedPriorHours = priorEvtHours;
              }            
          }
      );
      this.createReportService.priorEvtMins.subscribe(
          priorEvtMins => {
              if (priorEvtMins != null) {
                  this.selectedTimePriorMin = priorEvtMins;
              }         
          }
      );
      this.createReportService.timeDay.subscribe(
          timeDay => {              
              if (timeDay.operator != null && timeDay.value != null ){
                  this.selectedTimeActions = timeDay.operator;
                  this.selectedTimeOfDayHours = timeDay.value;
              }            
          }
      );

      this.setTimeOfDay();
      this.setTimePrior();
      

  }

  /**
  * This function used to set the default value.
  * @param data
  */
  setPeriodData(data) {
      let arrData = this.queryJson;     
      let latPeriodData = data;
      if (arrData.length > 0) {
          for (let i = 0; i < data.length; i++) {
              for (let j = 0; j < arrData.length; j++) {
                  if (arrData[j].value){
                      for (let day of arrData[j].value) {
                          if (arrData[j].id == "daysofWeek" && data[i].value == day) {
                              data[i].checked = true;
                          }
                      }
                  }
                 
                  
              }
          }         
          this.dayFields = data;
      }
      this.createReportService.daySelected.next(data);
  }
  /**
   * This function used to update day selected.
   * @param option 
   * @param event 
   * @param ind 
   */
  updateDateSel(option, event, ind) {
      if (option) {        
          this.dayFields[ind].checked = !this.dayFields[ind].checked;         
          this.createReportService.daySelected.next(this.dayFields);
      }
  }
  /**
   * This function used to select time of day.
   */
  selectTimeOfDay() {
      if (this.selectedTimeActions != null) {          
          let data = {
              "operator": this.selectedTimeActions,
              "value": this.selectedTimeOfDayHours,
          }
          this.createReportService.timeDay.next(data);
      }
  }
  /**
   * This method used to select hours.
   */
  selectTimeOfDayHours() {
      if (this.selectedTimeOfDayHours != null) {
          let hours = {
              "operator": this.selectedTimeActions,
              "value": this.selectedTimeOfDayHours,
          }
          this.createReportService.timeDay.next(hours);         
      }
  }
    /**
     * This function used to select day prior.
     */  
  selectPriorDay() {
      if (this.selectedPriorDay != null) {          
          this.createReportService.priorEvtDays.next(this.selectedPriorDay);
      }
  }
  /**
   * This function used to set hour prior.
   */
  selectPriorHours() {
      if (this.selectedPriorHours != null) {         
          this.createReportService.priorEvtHours.next(this.selectedPriorHours);
      }
  }
  /**
   * This function used to set minute.
   */
  selectPriorMin() {
      if (this.selectedTimePriorMin != null) {         
          this.createReportService.priorEvtMins.next(this.selectedTimePriorMin);
      }
  }
  /**
   * This function used to set time of day.
   */
  setTimeOfDay() {
      for (let action of this.timeActions) {
          for (let data of this.queryJson) {
              if (data.id == "timeofDay" && data.operator == action.value) {
                  this.selectedTimeActions = action.value;
              }
          }
      }

      for (let dayHour of this.timeDayHours) {
          for (let data of this.queryJson) {
              if (data.id == "timeofDay" && data.value == dayHour.value) {
                  this.selectedTimeOfDayHours = dayHour.value;
              }
          }
      }

      let data = {
          "operator": this.selectedTimeActions,
          "value": this.selectedTimeOfDayHours,
      }
      this.createReportService.timeDay.next(data);
  }
  /**
   * This function used to set time prior.
   */
  setTimePrior() {
      for (let priorday of this.timePriorDay) {
          for (let data of this.queryJson) {
              if (data.id == "timePriortoEventDay" && data.value == priorday.value) {
                  this.selectedPriorDay = priorday.value;
              }
          }
      }

      for (let priorHour of this.timePriorHours) {
          for (let data of this.queryJson) {
              if (data.id == "timePriortoEventHour" && data.value == priorHour.value) {
                  this.selectedPriorHours = priorHour.value;
              }
          }
      }

      for (let priorMin of this.timePriorMin) {
          for (let data of this.queryJson) {
              if (data.id == "timePriortoEventMin" && data.value == priorMin.value) {
                  this.selectedTimePriorMin = priorMin.value;
              }
          }
      }

      this.createReportService.priorEvtDays.next(this.selectedPriorDay);
      this.createReportService.priorEvtHours.next(this.selectedPriorHours);
      this.createReportService.priorEvtMins.next(this.selectedTimePriorMin);
  }
}
