import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LoginAuthGuard implements CanActivate {
	constructor( private cookieService: CookieService, private router: Router){

	}

	canActivate() {
		// if(this.router.url != '/login'){
        if (!this.cookieService.get('Token')) {            
				this.router.navigate(['login']);
				return true;
        } else {
            
				return true;
			}
				
		// }else{
		// 	console.log("I am Login");
		// }
	}
} 
