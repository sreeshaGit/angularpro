/**
 * A class representing a SignUpComponent and its functionality.
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SignUpService } from '../services/sign-up.service';
import { ValidationService } from '../services/validation.service';
import { AppComponent } from '../app.component';
import { HomeService } from '../services/home.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [SignUpService]
})
export class SignUpComponent implements OnInit {   
  confirmTC = false;
  cookieValue = 'UNKNOWN';
  public displayError: any;
  isConfirmPassword = false;
  public signUpForm: FormGroup;
  

  /**
   * 
   * @param formBuilder {FormBuilder} instance of FormBuilder.
   * @param signUpService - {SignUpService} instance of SignUpService.
   */
  constructor(private formBuilder: FormBuilder,
              public signUpService: SignUpService,
              private cookieService: CookieService,
              public appCom: AppComponent,
              public router: Router, public homeService: HomeService) { }

  ngOnInit() {
      this.buildSignUpForm();

      this.signUpForm.statusChanges.subscribe(
          result => {
              this.displayError = '';
          }
      );
  }
  /**
   * This method used to initilize signup form.
   */
  buildSignUpForm() {
      this.signUpForm = this.formBuilder.group({
          fullname: ['', [Validators.required, ValidationService.emailValidator]],
          username: ['', [Validators.required,]],
          password: ['', [Validators.required, ValidationService.passwordValidator]],
          confirmPassword: ['', [Validators.required]],
          confirm: ['',[Validators.requiredTrue]]
      });


  }
  /**
   * This methos call on submit of form.
   * @param signUpForm
   */
  onSubmit(signUpForm) {
      
      if (this.signUpForm.valid) {
          this.displayError = '';
          if (signUpForm.value.password != signUpForm.value.confirmPassword) {
              this.isConfirmPassword = true;
              return;
          } else {
              this.isConfirmPassword = false;
          }
          
          if (!signUpForm.value.confirm) {              
              this.confirmTC = !this.confirmTC;
              return;
          }   
        let signUpData = {
            "fullname": this.signUpForm.value.fullname,
            "username": this.signUpForm.value.username,
            "password": this.signUpForm.value.password,
            "tel": ""
        };
        this.signUpService.createAccount(signUpData).subscribe(
            resData => {
                if (resData.token) {
                    this.appCom.signUpPopup.next(false);
                    this.homeService.setFirstTimeSignUp(true);
                    this.cookieService.set('Token', resData.token);
                    this.router.navigate(['/home']);
                    this.cookieValue = this.cookieService.get('Token');
                   // this.appCom.isUserLoggedIn.next(true);
                   this.homeService.isUser.next(true);
                    this.displayError = '';
                }
            },
            error => {                                
                this.displayError = error.error.message;                
            }
        );
   
    } else {        
    this.validateAllFormFields(this.signUpForm);
    }        
  }

  /**
   * This methos used to validate the form.
   * @param formGroup
   */
  validateAllFormFields(formGroup: FormGroup) {      
    Object.keys(formGroup.controls).forEach(field => {      
      const control = formGroup.get(field);
      if (control instanceof FormControl) {       
        control.markAsTouched({ onlySelf: true });       
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
 
}
