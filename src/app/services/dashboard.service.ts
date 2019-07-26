import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DashboardService {
    public reports = new BehaviorSubject<any>([]);
    public fromPage = new BehaviorSubject<any>('');
    public reportSelectedOptions = new BehaviorSubject<any>([]);
  constructor() { }

}
