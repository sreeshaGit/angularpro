/**
 * @fileoverview contains http methods which gets data from link.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MrGreenApiService } from '../../shared/mr-green-api.service';

@Injectable()
export class DisplayTennisImageService {
    fallbackFlag = 'no-flag';
    private cache = {};

    /**
     * @constructor
     * @param {MrgreenApiService} mrGreenApiService - instance of MrgreenApiService to access mrgreen methods.
     */
    constructor(private mrGreenApiService: MrGreenApiService) { }

    /**
     * gets tennis live data from service
     */
    getTennisMgData() {
        return this.mrGreenApiService.getTennisMgData();
    }

    /**
     * gets tennis player country name  from service
     */
    getTennisPlayerCountry(participantId) {
        const flag = new BehaviorSubject<string>(this.fallbackFlag);

        if (this.cache[participantId]) {
            flag.next(this.cache[participantId]);
        } else {
            this.mrGreenApiService.getTennisPlayerCountry(participantId).subscribe((data) => {
                flag.next(data.country ? data.country.toUpperCase() : this.fallbackFlag);
            }, error => {
                flag.next(this.fallbackFlag);
            });
        }

        flag.subscribe((flagToCache) => {
            this.cache[participantId] = flagToCache;
        });

        return flag;
    }

    /**
     * gets tennis pregame data from service
     */
    getTennisPregameFromMg() {
        return this.mrGreenApiService.getTennisPregameFromMg();
    }
}
