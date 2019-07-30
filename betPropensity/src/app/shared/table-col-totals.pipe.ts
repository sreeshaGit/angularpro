/**
 * This file used to get the total values of columns.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableColTotals'
})
export class TableColTotalsPipe implements PipeTransform {

    transform(value: any, args?: any): any {    
      switch (args) {        
      case 'turnover':
          return value.turnover;
      case 'pl':
          return value.pl;
      case 'num_bets':
          return value.num_bets;
      case 'avgOdds':
          return value.avgodds;
      //case 'pl_percent':
      //    return value.pl_percent;
      //case 'turnover_percent':
      //    return value['turnover_percent'];
      //case 'num_bets_percent':
      //        return value['num_bets_percent'];
      //case 'single/pre-match':           
      //    return value['single_pre_match'];
      //case 'single/in-play':
      //    return value['single_in_play'];
      //case 'non-single/pre-match':
      //    return value['non_single_pre_match'];
      //case 'non-single/in-play':
      //    return value['non_single_in_play'];
      //case 'yield':
      //    return   value.yieldVal;
      case 'num_selections':
          return   value.num_selections;
      //case 'num_selections_percent':
      //    return    value.num_selections_percent;           
      //case 'roi':
      //   return   value.roi;
      case 'multiples':
         return  value.multiples;
      case 'trebles':
          return value.trebles;
      case 'doubles':
        return value.doubles;
      case 'singles':          
         return value.singles; 
      case 'num_players':
        return value.num_players;
      default:
      return "";
  }
  }

}
