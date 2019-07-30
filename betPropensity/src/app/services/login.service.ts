import { Injectable } from '@angular/core';

import { BetPropensityApiService } from './bet-propensity-api.service';

@Injectable()
export class LoginService {
   
    constructor(public betPropensityApi: BetPropensityApiService) {
       
    }

    getAuth(userDetails) {           
       return  this.betPropensityApi.getLogin(userDetails);             
    }
   
}
