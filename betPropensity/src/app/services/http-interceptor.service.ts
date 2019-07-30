import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from "@angular/core"

import { HomeService } from '../services/home.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

// operators
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { timeout } from 'rxjs/operators';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');
const defaultTimeout = 180000;
@Injectable()

export class HttpInterceptorService implements HttpInterceptor {
    cookieToken = '';
    constructor(public homeService: HomeService,
                private cookieService: CookieService,
                public router: Router,@Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number) {
       
    }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.cookieService.get('Token');
     
        if (token) {
            request = request.clone({ headers: request.headers.set('x-api-key', token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        const timeoutValue = Number(request.headers.get('timeout')) || this.defaultTimeout;
        return next.handle(request).pipe(
           timeout(timeoutValue),
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                  
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {                
                if (error.error.message === "Unauthorized") {                  
                    this.router.navigate(['']);
                    this.cookieService.delete('Token');
                    this.homeService.isUser.next(false);
                } else {                 
                    return Observable.throw(error);
                }              
            }));
    }
}
