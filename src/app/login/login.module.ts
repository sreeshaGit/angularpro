import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SignUpModule } from '../sign-up/sign-up.module';
import { DialogModule } from '../dialog/dialog.module';
import { LoginRoutingModule } from './login-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SignUpModule,
    DialogModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }
