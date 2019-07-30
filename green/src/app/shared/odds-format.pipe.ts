/**
 * @fileoverview contains all logic for odds format.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'oddsFormat'
})
export class OddsFormatPipe implements PipeTransform {
    transform(value: any, args: string): any {
        if (value) {
            switch (args) {
                case 'fractional':
                    return value.oddsFractional;
                case 'american':
                    return value.oddsAmerican;
                default:
                    return value.oddsDecimal;
            }
        }
    }
}
