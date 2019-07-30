import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../../environments/environment';

import { BettorLogicApiService } from '../shared/bettor-logic-api.service';
import { KambiService } from '../Kambi/Kambi.service';

@Injectable()
export class StaticWordsService {
    readonly isLoaded = new BehaviorSubject<boolean>(false);
    staticWords: any;

    /**
     *
     * @param {Http} http - instance of Http service.
     * @param {KambiService} kambiService - instance of KambiService to access kambi methods.
     */
    constructor(
        public bettorLogicApi: BettorLogicApiService,
        private http: Http,
        private kambiService: KambiService
    ) {
        this.getStaticData();
    }

    /**
     * This service static words data based on language.
     */
    getStaticData() {
        this.kambiService.currentLanguage.asObservable()
            .subscribe(() => {
                this.getData();
            });
    }

    /**
     * This function gets data from service.
     */
    getData() {
        this.bettorLogicApi.getStaticData().subscribe(resData => {
                if (resData !== null && resData !== '') {
                    this.staticWords = resData;
                    this.isLoaded.next(true);
                }
            });
    }
}
