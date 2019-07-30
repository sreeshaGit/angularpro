import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value === 'GBP') {
            return '&pound;';
        } else if (value === 'SEK') {
            return 'kr';
        } else if (value === 'EUR') {
            return '&euro;';
        } else {
            return value;
        }

    }

}
