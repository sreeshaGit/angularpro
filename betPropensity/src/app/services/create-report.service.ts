import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//import { Subject } from 'rxjs/Subject';

@Injectable()
export class CreateReportService {
  public outputData = new BehaviorSubject<any>("sport");
  public outputCol = new BehaviorSubject<any>(["turnover", "pl"]);
  public outputBy = new BehaviorSubject<any>([
      "pl"
  ]);

  public profileSelected = new BehaviorSubject<any>([]);
  public numOfRec = new BehaviorSubject<any>(10);
  public storeFilterData = [];

  public stakeSel = new BehaviorSubject<any>([]);
  public betStatus = new BehaviorSubject<any>([]);
  public betType = new BehaviorSubject<any>([]);
  public oddsSel = new BehaviorSubject<any>([]);
  public freqSel = new BehaviorSubject<any>([]);
  public periodSel = new BehaviorSubject<any>([]);
  public eventSel = new BehaviorSubject<any>([]);
  public sportsSel = new BehaviorSubject<any>([]);
  public marketSel = new BehaviorSubject<any>([]);
  public oddsBand = new BehaviorSubject<any>([]);
  public country = new BehaviorSubject<any>([]);
  public betFold = new BehaviorSubject<any>([]);

  public stakeRange = new BehaviorSubject<any>([]);
  public betNumber = new BehaviorSubject<any>([]);
  public winPrct = new BehaviorSubject<any>([]);
  public lossPrct = new BehaviorSubject<any>([]);

  public dateSelected = new BehaviorSubject<any>([]);
  public reportSel = new BehaviorSubject<any>([]);
  public compareRep = new BehaviorSubject<any>([]);
  public typeOfView = new BehaviorSubject<any>('New report');
  public selReportIds = new BehaviorSubject<any>([]);

  public profileTypeSel = new BehaviorSubject<any>(0);

  public profileFreq = new BehaviorSubject<any>([]);
  public profilePeriod = new BehaviorSubject<any>([]);
  
  public hideUpdate = new BehaviorSubject<any>(false);

  public sameEvent = new BehaviorSubject<any>([]);

  public sameMarket = new BehaviorSubject<any>([]);

  public daySelected = new BehaviorSubject<any>([]);

  public priorEvtDays = new BehaviorSubject<any>(null);
  public priorEvtHours = new BehaviorSubject<any>(null);
  public priorEvtMins = new BehaviorSubject<any>(null);

  public timeDay = new BehaviorSubject<any>({     
      "operator": null,
      "value": null  
  }
 );

  public hideDropdown = new BehaviorSubject<any>(true);

  public reportObj = {
      "id": 0,
      "name": "",
      "queryJSON": {},     
      "outputColumns": ["turnover","pl"],
      "outputData": "sport",
      "top_by": "pl",
      "top_count": 0,
      "top": { "count": "", "by": "" },      
  };

  public compareReportData = {     
      "compare": {
          "report_ids": [],
          "id": 0,
          "name": "",
      }
  };

  public primary = {
      "sport": [],
      "pmip": 0,
      "leagues": [],
      "markets": []
  }

  public primary2 = {
      "sport": [],
      "pmip": 0,
      "leagues": [],
      "markets": []
  }

  public secondary = {
      "sport": [],
      "pmip": 0,
      "leagues": [],
      "markets": []
  }
  public profileObj = {
      "id": 0,
      "name": "",  
      "periodrange": "",
      "frequency": "",
      "type": '',
      "primary1": {},
      "primary2": {},
      "secondary": {}
  }
  
  public fromReportPage = false;

  public showUpdate = false;

  constructor() { }
  
  public setFilterData(data){
      this.storeFilterData.push(data);
  }

  public getFilterData(){
      return this.storeFilterData;
  }

  public setReportObj(data) {
      this.reportObj = data;
  }

  public getReportObj() {
      return this.reportObj;
  }

  public setPageFrom(value) {
      this.fromReportPage = value;
  }

  public getPageFrom() {
      return this.fromReportPage;
  }

  public setEditMode(value) {
      this.showUpdate = value;
  }

  public getEditMode() {
      return this.showUpdate;
  }


  public setCompareReportObj(data) {
      this.compareReportData = data;
  }

  public getCompareReportObj() {
      return this.compareReportData;
  }

  public setProfileInfo(data) {
      this.profileObj = data;
  }

  public getProfileInfo() {
      return this.profileObj;
  }
}
