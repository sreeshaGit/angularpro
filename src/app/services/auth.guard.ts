/**
  * This service used to check for user authentication.  
  */
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
//import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private cookieService: CookieService, private router: Router) {

    }
  /**
   * This method used to show pre and post login pages based on token.
   * @param next
   * @param state
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
      if (!this.cookieService.get('Token')) {
          return true;
      } else {
          	this.router.navigate(['home']);
            return true;
      }
  }
}
