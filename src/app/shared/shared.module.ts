import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignUpModule } from '../sign-up/sign-up.module';
import { DialogModule } from '../dialog/dialog.module';
import { SideMenuBarComponent } from './side-menu-bar/side-menu-bar.component';
import { DropdownModule } from 'angular-custom-dropdown';
import { FormatNumberPipe } from './format-number.pipe';
import { FindPmIpPipe } from './find-pm-ip.pipe';
import { LoaderComponent } from './loader/loader.component';
import { TableColTotalsPipe } from './table-col-totals.pipe';

@NgModule({
  imports: [
      CommonModule,
      SignUpModule,
      DialogModule,      
      DropdownModule
  ],
  declarations: [HeaderComponent, SideMenuBarComponent, FooterComponent, FormatNumberPipe, FindPmIpPipe, LoaderComponent, TableColTotalsPipe],
  exports: [
      HeaderComponent,
      SideMenuBarComponent,
      FooterComponent,
      FormatNumberPipe,
      FindPmIpPipe,
      LoaderComponent,
      TableColTotalsPipe
  ],
  
})
export class SharedModule { }
