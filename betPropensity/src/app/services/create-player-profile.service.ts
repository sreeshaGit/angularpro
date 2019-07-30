import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CreatePlayerProfileService {
    public primary1 = {
        "sport": [],
        "pmip": null,
        "leagues": [],
        "markets": []
    }

    public primary2 = {
        "sport": [],
        "pmip": null,
        "leagues": [],
        "markets": []
    }

    public secondary = {
        "sport": [],
        "pmip": null,
        "leagues": [],
        "markets": []
    }
    public profileObj = {
        "id": 0,
        "name": "",
        "periodrange": ["12months"],
        "frequency": ["all"],
        "type": 3,
        "primary1": {},
        "primary2": {},
        "secondary": {}
    }

    public profileTypeSel = new BehaviorSubject<any>([]);

    public profileFreq = new BehaviorSubject<any>([]);
    public profilePeriod = new BehaviorSubject<any>([]);

    public fromEdit = false;
    public showUpdate = false;
    public hideUpdate = new BehaviorSubject<any>(false);

  constructor() { }

  public setProfileInfo(data) {
      this.profileObj = data;
  }

  public getProfileInfo() {
      return this.profileObj;
  }

  public setPageFrom(value) {
      this.fromEdit = value;
  }

  public getPageFrom() {
      return this.fromEdit;
  }
  
}
