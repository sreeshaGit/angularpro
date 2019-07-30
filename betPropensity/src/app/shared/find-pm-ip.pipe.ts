/**
 * This pipe used to get the PMIP value based on the conditions.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findPmIp'
})
export class FindPmIpPipe implements PipeTransform {

    transform(value: any, args?: any): any {        
        if (args == 'pri_1_pmip' || args == 'sec_pmip' || args == 'pri_2_pmip' && value != '') {
            if(value == 0){
                return "Pre-match";
            } else if(value == 1){
                return "In-play";
            }                       
        } else if (args == 'pri_1_sport_bet_percent' || args == 'sec_sport_bet_percent' || args == 'sec_sport_bet_percent' || args == 'pri_2_sport_bet_percent'){
            return this.getPercentage(value) +'%';
        }
        else {
                  return value;
        }                                 
    }

    getPercentage(x) {
        return parseFloat(x).toFixed(2);
    }
}
