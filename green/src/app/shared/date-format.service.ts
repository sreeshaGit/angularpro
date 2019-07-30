import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { StaticWordsService } from '../StaticWords/static-words.service';

@Injectable()
export class DateFormatService {
    private languageIsLoaded = new BehaviorSubject<boolean>(false);
    private months = [];

    constructor(private staticWordsService: StaticWordsService) {
        this.staticWordsService.isLoaded.asObservable().subscribe((isLoaded) => {
            if (isLoaded) {
                this.months = [
                    this.staticWordsService.staticWords.Jan,
                    this.staticWordsService.staticWords.Feb,
                    this.staticWordsService.staticWords.Mar,
                    this.staticWordsService.staticWords.Apr,
                    this.staticWordsService.staticWords.May,
                    this.staticWordsService.staticWords.Jun,
                    this.staticWordsService.staticWords.Jul,
                    this.staticWordsService.staticWords.Aug,
                    this.staticWordsService.staticWords.Sep,
                    this.staticWordsService.staticWords.Oct,
                    this.staticWordsService.staticWords.Nov,
                    this.staticWordsService.staticWords.Dec
                ];
                this.languageIsLoaded.next(true);
            }
        });
    }

    /**
     * This function formats the time format
     * @param {number} num this parameter hold the value of time
     */
    private addZero(num) {
        return num < 10 ? '0' + num : num;
    }

    /**
     * Get formatted date
     * @param value the date
     * @param args formatting format
     */
    private getFormattedDate(value: any, args: string) {
        const self = this;
        let d;

        if (parseInt(value, 10) === value || value.includes('Z')) {
            d = value;
        } else {
            d = value + ' UTC';
        }
        const date = new Date(d);
        const today = new Date();
        if (args.length > 0) {
            if (args === 'DT') {
                if (date.getDate() === today.getDate()) {
                    return self.staticWordsService.staticWords.Today + ' '
                        + this.addZero(date.getHours()) + ':' + this.addZero(date.getMinutes());
                } else if (date.getDate() - today.getDate() === 1) {
                    return self.staticWordsService.staticWords.Tomorrow + ' '
                        + this.addZero(date.getHours()) + ':' + this.addZero(date.getMinutes());
                } else {
                    return this.addZero(date.getDate()) + ' '
                        + self.months[date.getMonth()] + ' ' + ' - ' + ' '
                        + this.addZero(date.getHours()) + ':' + this.addZero(date.getMinutes());
                }
            } else if (args === 'D') {
                if (date.getDate() === today.getDate()) {
                    return self.staticWordsService.staticWords.Today;
                } else if (date.getDate() - today.getDate() === 1) {
                    return self.staticWordsService.staticWords.Tomorrow;
                } else {
                    return this.addZero(date.getDate()) + ' ' + self.months[date.getMonth()];
                }
            } else if (args === 'T') {
                return this.addZero(date.getHours()) + ':' + this.addZero(date.getMinutes());
            } else if (args === 'DTT') {
                if (date.getDate() === today.getDate()) {
                    return self.staticWordsService.staticWords.Today + ' '
                        + this.addZero(date.getHours()) + ':' + this.addZero(date.getMinutes());
                } else if (date.getDate() - today.getDate() === 1) {
                    return self.staticWordsService.staticWords.Tomorrow
                        + ' ' + this.addZero(date.getHours()) + ':' + this.addZero(date.getMinutes());
                } else {
                    return this.addZero(date.getDate()) + ' ' + self.months[date.getMonth()] + ' '
                        + ' - ' + ' ' + this.addZero(date.getHours()) + ':' + this.addZero(date.getMinutes());
                }
            } else if (args === 'HF') {
                if (date.getDate() === today.getDate()) {
                    return self.staticWordsService.staticWords.HF_Today + ' '
                        + this.addZero(date.getHours()) + ':' + this.addZero(date.getMinutes());
                } else if (date.getDate() - today.getDate() === 1) {
                    return self.staticWordsService.staticWords.HF_Tomorrow + ' '
                        + this.addZero(date.getHours()) + ':' + this.addZero(date.getMinutes());
                }
            }
        }
    }

    /**
     * Get formatted date promise
     * @param value the date
     * @param args formatting format
     * @return {promise} formatted date
     */
    format(value: any, args: string): any {
        return new Observable<any>((observer) => {
            this.languageIsLoaded.asObservable().subscribe((isLoaded) => {
                if (isLoaded) {
                    observer.next(this.getFormattedDate(value, args));
                }
            });
        });
    }

}
