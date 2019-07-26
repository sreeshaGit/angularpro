/**
 *  A class representing a MarketComponent and its functionality.
 */
import { Component, OnInit,OnDestroy} from '@angular/core';
import { BetPropensityApiService } from '../../../services/bet-propensity-api.service';
import { CreateReportService } from '../../../services/create-report.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit,OnDestroy {
  itemList: any = [];
  tempArray = [];
  selectedItems = [];
  settings = {};
  sportId =[];
  sportSubscription :any;
  loader=false;
  timeout=null;
  /**
   * 
   * @param betPropensityApi - {BetPropensityApiService} instance of BetPropensityApiService
   * @param createReportService - {createReportService} instance of createReportService
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
          labelKey: "displayName",
          noDataLabel: "No Markets found",
          enableSearchFilter: true,
          searchBy: ['displayName']
      };
      this.getMarketsData();

      this.sportSubscription = this.createReportService.sportsSel.subscribe(
          resData => {
              this.tempArray = [];
              if (resData.length > 0) {                
                  let sportIds = [];
                  for (let data of resData) {
                      sportIds.push(data.sportIds);
                  }
                  this.sportId = sportIds;
                  this.getMarketsDataWithId('', this.sportId.toString());
              } else {
                  this.sportId = [];
                  this.tempArray = this.itemList;
              }
          }
      );

      this.createReportService.marketSel.subscribe(
          resData => {
              this.selectedItems = [];
              if (resData.length > 0) {                 
                  this.selectedItems = resData;
              }
          }
      );
  }
  /**
   * This methos performs search operation 
   */  
  onSearch(evt: any) {   
      this.tempArray = [];
      if (evt.target.value.length >= 3) {
        if(this.timeout){ clearTimeout(this.timeout);}
        var self=this;
        // after the key press code should be waiting for 500ms.
        this.timeout = setTimeout(function() {
            self.loader=true;
            self.getMarketsDataWithId(evt.target.value, self.sportId);
       
       },500); 
      } else {         
          if (this.sportId.length > 0) {           
              this.sportBasedFilter(this.itemList, this.sportId);
          } else {
              this.tempArray = this.itemList;
          }
      } 
  }
/**
 * This method used to get markets data.
 */
  getMarketsData(){
    this.betPropensityApi.getMarketName('','').subscribe(resData => {
        this.loader = false;          
        if (resData.data.length > 0) {             
            this.itemList = this.setDisplayName(resData.data);          
            this.tempArray = this.itemList;           
        }
    }, error => {
        this.loader = false;
    });
  }
/**
 * This method used to get markets data based on sport ids.
 * @param text 
 * @param sportId 
 */
  getMarketsDataWithId(text,sportId) {
      this.betPropensityApi.getMarketName(text, sportId).subscribe(resData => {
          this.loader = false;
          if (resData.data.length > 0) {           
              this.tempArray = this.setDisplayName(resData.data);            
          }
      }, error => {
          this.loader = false;
      });
  }
/**
 * This method used to item selection.
 * @param item 
 */
  onItemSelect(item: any) { 
      this.setMarketData(this.selectedItems);
  }
  /**
   * This method used to deselect item.
   * @param item 
   */
  OnItemDeSelect(item: any) {    
      this.setMarketData(this.selectedItems);
  }
  /**
   * This method used for selecting all items.
   * @param items 
   */
  onSelectAll(items: any) {
     
      this.setMarketData(this.selectedItems);
  }
  /**
   * This method used for deselecting all items.
   * @param items 
   */
  onDeSelectAll(items: any) {      
      this.setMarketData(this.selectedItems);
  }
/**
 * This method used to set the market data.
 * @param selectedItems 
 */
  setMarketData(selectedItems) {      
      let selectedData = [];
      for (let data of selectedItems) {
          selectedData.push(data.name);
      }
      let marketData = {
          "id": "marketName1",
          "field": "marketName",
          "operator": "equal",
          "value": selectedData.join(","),
          "optgroup": "betderived"
      }
      this.createReportService.setFilterData(marketData);    
      this.createReportService.marketSel.next(selectedItems);
  }
/**
 * This method used to set the display name.
 */
  setDisplayName(resData) {
      for (let data of resData) {
          data.displayName = data.sport_name + ' : ' + data.name
      }
      return resData;  
  }
/**
 * This method used to filter data based on sport.
 * @param itemList 
 * @param sportId 
 */
  sportBasedFilter(itemList, sportId) {
      for (let data of sportId) {
          for (let item of itemList) {
              if (item.sport_id == data) {
                  this.tempArray.push(item);
              }
          }
      }
  }

  ngOnDestroy() {
    this.sportSubscription.unsubscribe();
  }
}
