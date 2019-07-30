/**
 * This function used to display side menu bar in the app.
 */
import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../app.component';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute  } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { CreateReportService } from '../../services/create-report.service';
import { CreatePlayerProfileService } from '../../services/create-player-profile.service';
import { DashboardService } from '../../services/dashboard.service';
@Component({
  selector: 'app-side-menu-bar',
  templateUrl: './side-menu-bar.component.html',
  styleUrls: ['./side-menu-bar.component.scss']
})
export class SideMenuBarComponent {
    activeClass = 'queries';
    isUserLoggedIn: boolean;
    /**
     * 
     * @param appCom - {AppComponent} instance of AppComponent.
     * @param cookieService - {CookieService} instance of CookieService.
     * @param router - {Router} instance of Router.
     * @param createReportService - {CreateReportService} instance of CreateReportService.
     * @param createPlayerProfile - {createPlayerProfile} instance of createPlayerProfile.
     * @param dashboardService - {DashboardService} instance of DashboardService.
     */
  
    constructor(public appCom: AppComponent,
                private cookieService: CookieService,
                private router: Router, public homeService: HomeService,
                public createReportService: CreateReportService,
                public createPlayerProfile: CreatePlayerProfileService,
                public dashboardService: DashboardService) {
                this.homeService.isUser.subscribe(
                    value => {                      
                     this.isUserLoggedIn = value;
                    }
                );
                            
	              if(this.cookieService.get('Token')){
		              this.isUserLoggedIn = true;	
                }
                  this.appCom.headerQueryString.subscribe(value => {                     
                      this.activeClass = value;
                  });
    }
    /**
     * This method used to navigate the user to relevent path.
     * @param path
     */
    navigate(path) {        
        if (path == 'reports') {
            this.createReportService.setReportObj({
                "id": 0,
                "name": "",
                "queryJSON": {},
                "outputColumns": ["turnover", "pl"],
                "outputData": "sport",
                "top_by": "pl",
                "top_count": 0
            });
            
            this.createReportService.stakeSel.next([]);
            this.createReportService.stakeRange.next([]);
            this.createReportService.outputData.next("sport");
            this.createReportService.outputCol.next(["turnover", "pl"]);
            this.createReportService.outputBy.next(["pl"]);

            this.createReportService.oddsSel.next([]);
            this.createReportService.freqSel.next([]);
            this.createReportService.periodSel.next([]);
            this.createReportService.eventSel.next([]);
            this.createReportService.sportsSel.next([]);
            this.createReportService.marketSel.next([]);
            this.createReportService.oddsBand.next([]);
            this.createReportService.dateSelected.next([]);
            this.createReportService.betFold.next([]);
            this.createReportService.country.next([]);
            this.createReportService.reportSel.next([]);
            this.createReportService.betType.next([]);
            this.createReportService.numOfRec.next(10);
            this.createReportService.betStatus.next([]);
            this.createReportService.typeOfView.next('New report');
            this.createReportService.selReportIds.next([]);
            this.createReportService.reportSel.next([]);
            this.createReportService.compareRep.next([]);
            this.createReportService.setCompareReportObj([]);
            this.createReportService.profilePeriod.next([]);
            this.createReportService.profileFreq.next([]);
            this.createReportService.profileTypeSel.next(0);
            this.createReportService.lossPrct.next([]);
            this.createReportService.winPrct.next([]);
            this.createReportService.betNumber.next([]);
            this.createReportService.daySelected.next([]);
            this.createReportService.sameEvent.next([]);
            this.createReportService.sameMarket.next([]);
            this.createReportService.timeDay.next({
                "operator": null,
                "value": null
            });
            this.createReportService.priorEvtDays.next(null);
            this.createReportService.priorEvtHours.next(null);
            this.createReportService.priorEvtMins.next(null);
            this.createReportService.profileSelected.next([]);
            this.createReportService.hideDropdown.next(true);
        } else if (path == 'profile-list') {
            let profileObj = {
                "id": 0,
                "name": "",
                "periodrange": ["12months"],
                "frequency": ["all"],
                "type": 3,
                "primary1": {},
                "primary2": {},
                "secondary": {}
            }
            this.createPlayerProfile.setProfileInfo(profileObj);            
        } else if (path == 'dashboard-list') {           
            this.dashboardService.fromPage.next('');
            this.dashboardService.reports.next([]);
        }          
     // this.activeClass = path;
      this.router.navigate([path]);
    }

    /**
     * This function used to navigate to help page.
     */
    gotoHelp() {
        window.open("http://www.bettorlogic.com/downloads/BetPropensity-UserGuide2019/index.html#other", "_blank");            
    }
}
