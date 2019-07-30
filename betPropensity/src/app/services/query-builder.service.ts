import { Injectable } from '@angular/core';

import { AppComponent } from '../app.component';
import { BetPropensityApiService } from './bet-propensity-api.service';

@Injectable()
export class QueryBuilderService {

   

    constructor(public appCom: AppComponent, public betPropensityApi: BetPropensityApiService) {

    }

    createQuery(jsonData) {
        if (this.appCom.isUserLoggedIn){
            this.betPropensityApi.createQuery(jsonData).subscribe(
                resData => {
                    console.log(resData,"resData")
                },
            );           
        }       
    }

    update(id,jsonData){
        this.betPropensityApi.updateQuery(id,jsonData).subscribe(
                    resData => {
                        console.log(resData,"resData")
                    },
         );         
    }
}
