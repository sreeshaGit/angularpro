/**
 *  A class representing a EventComponent and its functionality.
 */
import { Component, OnInit ,OnDestroy } from '@angular/core';

import { BetPropensityApiService } from '../../../services/bet-propensity-api.service';
import { CreateReportService } from '../../../services/create-report.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit,OnDestroy  {
  text = '';
  itemList: any = [];
  tempEvents = [];
  selectedItems = [];
  settings = {};
  sportId = [];
  sportSubscription :any;
  loader=false;
  timeout=null;


  /**
   * 
   * @param betPropensityApi - {BetPropensityApiService } instance of BetPropensityApiService.
   * @param createReportService - {CreateReportService} instance of CreateReportService.
   */
  constructor(public betPropensityApi: BetPropensityApiService, 
    public createReportService: CreateReportService) {  
  }

  ngOnInit() {
      this.settings = {
          text: "Select",
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          classes: "myclass custom-class",         
          labelKey: "name",
          noDataLabel: "No Events found",
          enableSearchFilter: true,
          searchBy: ['name']
      };

      this.getEventData();

     this.sportSubscription = this.createReportService.sportsSel.subscribe(
          resData => {             
              this.tempEvents = [];
              if (resData.length > 0) {              
                  let sportIds = [];
                  for (let data of resData){
                      sportIds.push(data.sportIds);
                  }             
                  this.sportId = sportIds;
                  this.getEventDataWithId('', this.sportId)            
              } else {
                  this.sportId = [];
                  this.tempEvents = this.itemList;
              }   
          }
      );
   
      this.createReportService.eventSel.subscribe(
          resData => {
              this.selectedItems = [];
              if (resData) {
                  this.selectedItems = resData;
              }             
          }
      );
  }
/**
 * This function performs search operation.
 * @param evt 
 */
  onSearch(evt: any) {          
      this.tempEvents = [];
      if (evt.target.value.length >= 3) {
        if(this.timeout){ clearTimeout(this.timeout);}
        var self=this;
        // after the key press code should be waiting for 500ms.
        this.timeout = setTimeout(function() {
            self.loader = true;
            self.getEventDataWithId(evt.target.value, self.sportId);          
       },500); 
      } else {         
          if (this.sportId.length > 0) {             
              this.tempEvents = this.sportBasedFilter(this.itemList, this.sportId);
          } else {
              this.tempEvents = this.itemList;
          }     
      }     
  }
/**
 * This method gets events Data.
 */
  getEventData() {      
      this.betPropensityApi.getEventName('','').subscribe(resData => {
        this.loader = false;
        if (resData.data.length > 0) {
            this.itemList = this.setDisplayName(resData.data);            
            this.tempEvents = this.itemList;                                    
        }
      },
      error => {
        this.loader = false;
      }
      );
  }
/**
 * This function gets data of events based on sport ids.
 * @param text 
 * @param sportId 
 */
  getEventDataWithId(text, sportId) {     
      this.betPropensityApi.getEventName(text, sportId.toString()).subscribe(resData => {
          this.loader = false;
          if (resData.data.length > 0) {            
              this.tempEvents = this.setDisplayName(resData.data);
          }
      },
          error => {
              this.loader = false;
          }
      );
  }
/**
 * This function performs item selection.
 * @param item 
 */
  onItemSelect(item: any) {     
      this.setEventData(this.selectedItems);
  }
  /**
   * This function performs item deselection.
   * @param item 
   */
  OnItemDeSelect(item: any) {    
      this.setEventData(this.selectedItems);
  }
  /**
   * This function performs select all.
   * @param items 
   */
  onSelectAll(items: any) {    
      this.setEventData(this.selectedItems);
  }
  /**
   * This function performs deselect all.
   * @param items 
   */
  onDeSelectAll(items: any) {    
      this.setEventData(this.selectedItems);
  }
/**
 * This function set event data to observable
 * @param selectedItems 
 */
  setEventData(selectedItems) {
      let selectedEvent = [];
      for (let data of selectedItems) {
          selectedEvent.push(data.name);
      }
      let selEvent = {
          "id": "eventId1",
          "field": "eventId",
          "operator": "equal",
          "value": selectedEvent.join(","),
          "optgroup": "betderived",
          "name": selectedItems,
          "option": "manualEvent"
      }
      
      this.createReportService.setFilterData(selEvent);
      this.createReportService.eventSel.next(selectedItems);
  }
/**
 * This method used set display name.
 * @param resData 
 */
  setDisplayName(resData) {
      for (let data of resData) {          
          data.name = data.sport_name + ' : ' + data.name
      }
      return resData;
  }
  /**
   * This function used to filter data based on sport.
   * @param itemList 
   * @param sportId 
   */
  sportBasedFilter(itemList, sportId) {     
      let sportEvents = [];
      for (let data of sportId) {
          for (let item of itemList) {
              if (item.sport_id == data) {
                  sportEvents.push(item);
              }
          }
      }
      return sportEvents;
  }
  /**
   * This function called before destroying  the component.
   */
  ngOnDestroy() {
    this.sportSubscription.unsubscribe();
  }
    
}
