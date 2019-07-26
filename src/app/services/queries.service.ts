import { Injectable } from '@angular/core';

import { BetPropensityApiService } from './bet-propensity-api.service';
import { AppComponent } from '../app.component';

@Injectable()
export class QueriesService {

  constructor(public betPropensityApi: BetPropensityApiService,public appCom: AppComponent) { 

  }

  getQueriesList(){
      if(this.appCom.isUserLoggedIn){
          return this.betPropensityApi.getQueriesList();  
      	}      		       
      }

  removeQuery(Id){
    return this.betPropensityApi.removeQuery(Id);
  }
}
