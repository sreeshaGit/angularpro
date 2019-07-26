import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignUpComponent } from './sign-up.component'
@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule
  ],
  declarations: [SignUpComponent],
  exports: [SignUpComponent]
})
export class SignUpModule { }
