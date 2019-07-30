import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';

import { LoginService } from '../services/login.service';
import { ValidationService } from '../services/validation.service';
import { AppComponent } from '../app.component';
import { HomeService } from '../services/home.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  cookieValue = 'UNKNOWN';
  errorMessage: any;
  public loginForm: FormGroup;
  isModalOpen: boolean;
  openSignUp: boolean;
  status: any;
  unAuth: boolean;
  showRegister = false;
  showAdmin = false;
  
    /**
     * 
     * @param formBuilder {FormBuilder} -instance of FormBuilder.
     * @param loginService {LoginService}- instance of LoginService.
     * @param router {Router}- instance of Router.
     * @param appCom {AppComponent}-instance of AppComponent.
     * @param cookieService {CookieService} - instance of cookie service.
     */    
  constructor(private formBuilder: FormBuilder,
              public loginService: LoginService,
              public router: Router,
              public location: Location,
              public appCom: AppComponent,
              private cookieService: CookieService, public homeService: HomeService, private http: Http) {
              this.appCom.signUpPopup.subscribe(value => {
                  this.openSignUp = value;
              });
              
              this.getJSON().subscribe(data => {
                
                  this.showRegister = data.isRegister;
                 
              }, error => { console.log(error) });

              router.events.subscribe((val) => {
                  if (location.path() == '/login_admin') {                  
                      this.showAdmin = true;
                  } 
              });

  }

  public getJSON(): Observable<any> {
      return this.http.get("../../assets/js/checkRegisteration.json")
          .map((res: any) => res.json())

  }
  /**
    * This function calls initial and gets data.
    */
  ngOnInit() {
      this.buildLoginForm();
  }
  /**
   * This method initializes login form.
   */
    buildLoginForm() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, ValidationService.emailValidator]],
            password: ['', [Validators.required, ValidationService.passwordValidator]]
        });
    }
  /**
   * This method used to get the sign up pop-up
   */
    goToSignUp() {
        this.isModalOpen = true;
        this.openSignUp = true;
    }
  /**
   * This function used to show pop-up.
   * @param event - boolean value.
   */
  modalPopupClosedCallback(event) {
      if (event === false) {
          this.isModalOpen = false;
      }
  }
  /**
   * This method used to get the auth from service.
   * @param value
   */
  onLogin(value) {     
      this.loginService.getAuth(this.loginForm.value).subscribe(
          resData => {
              if (resData.token) {                
                  this.cookieService.set('Token', resData.token);
                  this.router.navigate(['/home']);                
                  this.cookieValue = this.cookieService.get('Token');  
                  //  this.appCom.isUserLoggedIn.next(true);
                  this.appCom.isSideBar.next(false);
                  this.homeService.isUser.next(true);            
              } else {
                  this.router.navigateByUrl(''); 
              }
          },
          error => {              
              if (error != null && error!=''){
                  this.errorMessage = error.error.message;                  
              }              
          }
      );
  }
}
