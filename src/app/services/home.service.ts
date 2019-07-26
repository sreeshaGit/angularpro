import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class HomeService {
    public firstSignUp: boolean;
    public isUser = new BehaviorSubject<boolean>(false);
    
  constructor() { }
  public setFirstTimeSignUp(value) {     
      this.firstSignUp = value;
  }

  public getFirstTimeSignUp() {    
      return this.firstSignUp;
  }
}
