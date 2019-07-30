import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CommonService {
  public sport = new BehaviorSubject<any>("Soccer");
  public oddsMultiple = new BehaviorSubject<any>(0);
  public betsData = new BehaviorSubject<any>([]);
  public betsToDisplay =  new BehaviorSubject<any>(0);
  public eventId = new BehaviorSubject<any>(0);
  public selBets = new BehaviorSubject<any>([]);
  public sportDisplay  = new BehaviorSubject<any>('');

  constructor() { 
    this.eventId.next(this.getQueryVariable('eventId'));
    this.sportDisplay.next(this.getQueryVariable('sport'));
  }

  getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
  //  console.log('params',vars)
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (pair[0] === variable) {
       //   console.log('params1',pair[1])
            return pair[1];
        }
    }
}
}
