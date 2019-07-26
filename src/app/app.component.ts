import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';
    public isUserLoggedIn = new BehaviorSubject<boolean>(false);
    public headerQueryString = new BehaviorSubject<string>('');
    public isSideBar = new BehaviorSubject<boolean>(false);
    public signUpPopup = new BehaviorSubject<boolean>(false);
    public fromPage = new BehaviorSubject<string>('');
    isLoggedIn = false;
    sideBarVar = false;
    constructor(public router: Router, private cookieService: CookieService, location: Location,public homeService:HomeService) {
        router.events.subscribe((val) => {           
            if (location.path() != '') {         
                if (location.path() == '/login' || location.path() == '/login_admin' || location.path() == '') {               
                  this.homeService.isUser.next(false);
                } else {                  
                  this.homeService.isUser.next(true);
                }
               this.fromPage.next(location.path());
            } else {
                this.homeService.isUser.next(false);
                this.fromPage.next('');
            }
        });
    this.homeService.isUser.subscribe(value => {        
        this.isLoggedIn = value;
    });
    this.isSideBar.subscribe( value => {
        this.sideBarVar = value;

    });
    if(this.cookieService.get('Token')){
		this.isLoggedIn = true;	
	}
    }
}
