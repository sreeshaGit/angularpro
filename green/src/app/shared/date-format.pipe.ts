/**
 * @fileoverview contains all logic for date format.
 */
import { Pipe, PipeTransform } from '@angular/core';

import { DateFormatService } from '../shared/date-format.service';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
    /**
     * Constructor for date pipe
     * @param dateFormatter
     */
    constructor(private dateFormatter: DateFormatService) {}

    /**
     * Format date
     * @param value the date
     * @param args formatting format
     * @return {promise} formatted date
     */
    transform(value: any, args: string): any {
        return this.dateFormatter.format(value, args);
    }
}
