/**
 *  A class representing a HomeComponent and its functionality.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { HomeService } from '../services/home.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  
})
export class HomeComponent implements OnInit {
    onSuccess: boolean;
    constructor(private router: Router, public appCom: AppComponent,public homeService: HomeService) {
        this.appCom.headerQueryString.next(""); 
    }

  ngOnInit() {
      this.onSuccess = this.homeService.getFirstTimeSignUp();
     
      IntervalObservable.create(5000)         
          .subscribe(() => {
              this.onSuccess = false;
              this.homeService.setFirstTimeSignUp(false);
          });

  }
  /**
   * This function used to navigate to data analysis page.
   */
  goToDataAnalysis() {
      this.router.navigateByUrl('/queries');
  }
  /**
   * This function used to navigate to dashboard list page.
   */
  goToDashboard() {
      this.router.navigateByUrl('/dashboard-list');
  }
  /**
   * This function used to navigate to reports page.
   */
  goToReports() {
      this.router.navigateByUrl('/reports');
  }
  /**
   * This function used to navigate to import page.
   */
  goToImportData() {
      this.router.navigateByUrl('/import');
  }
  /**
   * This function used to navigate to user profile.
   */
  goToUserProfile() {
      this.router.navigateByUrl('/profile-list');
  }
  /**
   * This function used to close.
   */
  close() {      
      this.onSuccess = false;
      this.homeService.setFirstTimeSignUp(false);
  }
  /**
   * This function used to show pop-up.
   * @param event - boolean value.
   */
  modalPopupClosedCallback(event) {
      if (event === false) {
         
      }
  }
  /**
   * This function used to navigate to help page.
   */
  gotoHelp() {
        window.open("http://www.bettorlogic.com/downloads/BetPropensity-UserGuide2019/index.html#other", "_blank");            
    }
}
