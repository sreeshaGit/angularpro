import { Injectable } from '@angular/core';
import { BetPropensityApiService } from './bet-propensity-api.service';

@Injectable()
export class SignUpService {

    constructor(public betPropensityApi: BetPropensityApiService) { }

    createAccount(accountInfo) {      
        return this.betPropensityApi.createAccount(accountInfo);
    }

  
}
