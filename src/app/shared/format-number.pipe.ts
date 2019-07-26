/**
 * This Pipe used to format the given number in percent and returned the result.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

    transform(value: any, args?: any): any {      
        if (typeof value === "number" && args != 'playerid' && args != 'year') {          
            switch(args) {
                case 'turnover_percent':
                    return this.getPercentage(value) + '%';
                case 'pl_percent':
                    return this.getPercentage(value) + '%';
                case 'num_bets_percent':
                    return this.getPercentage(value) + '%';
                case 'yield':
                    return this.getPercentage(value) + '%';
                case 'num_selections_percent':
                    return this.getPercentage(value) + '%';
                case 'num_player_percent':
                    return this.getPercentage(value) + '%';
                case 'single/pre-match':                 
                    return this.getPercentage(value) + '%';
                case 'single/in-play':
                    return this.getPercentage(value) + '%';
                case 'non-single/pre-match':
                    return this.getPercentage(value) + '%';
                case 'non-single/in-play':
                    return this.getPercentage(value) + '%';
                case 'roi':
                    return this.getPercentage(value) + '%';              
                default:
                return value.toLocaleString();
            }

        } else {
            return value;
        }
        
  }

getPercentage(x) {
    return parseFloat(x).toFixed(2);
}
  
}
