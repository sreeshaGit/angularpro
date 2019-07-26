/**
 * This component used for header operation on the page.
 */
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CreateQueryService } from '../../services/create-query.service';
import { BetPropensityApiService } from '../../services/bet-propensity-api.service';
import { AppComponent } from '../../app.component';
import { CreateReportService } from '../../services/create-report.service';
import { CreatePlayerProfileService } from '../../services/create-player-profile.service';
import { HomeService } from '../../services/home.service';
import { DashboardService } from '../../services/dashboard.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [BetPropensityApiService]
})
export class HeaderComponent {
    @Input() isUserLoggedIn;
    headerQueryString = '';
    cookieToken = '';
    isModalOpen: boolean;
    openSignUp: boolean;
    subscription: Subscription;
    showRegister = false;
    toggle = false;
    rules_basic: any = {};
    localPath :any;
    /**
     * 
     * @param appCom - {AppComponent} instance of AppComponent.
     * @param cookieService - {CookieService} instance of CookieService.
     * @param betPropensityApi - {BetPropensityApiService} instance of BetPropensityApiService.
     * @param router - {Router} instance of Router.
     * @param createQueryService - {CreateQueryService} instance of CreateQueryService.
     * @param location - {Location} instance of Location.
     * @param createPlayerProfile -{CreatePlayerProfileService} instance of CreatePlayerProfileService.
     * @param createReportService - {CreateReportService} instance of CreateReportService.
     * @param homeService - {HomeService} instance of HomeService.
     * @param dashboardService - {DashboardService} instance of DashboardService.
     * @param http - {Http} instance of Http.
     */
    constructor(public appCom: AppComponent,
                private cookieService: CookieService,
                public betPropensityApi: BetPropensityApiService,
                public router: Router,
                public location: Location,
                public createQueryService: CreateQueryService,
                public createPlayerProfile: CreatePlayerProfileService,
                public createReportService: CreateReportService, 
                public homeService: HomeService, 
                public dashboardService: DashboardService, 
                private http: Http) {
                this.headerQueryString = ''; 
                this.cookieToken = this.cookieService.get('Token');     
                this.appCom.headerQueryString.subscribe(value => {                   
                      this.headerQueryString = value;          
                  });
                this.appCom.isSideBar.subscribe( () => {
                      this.toggle = !this.toggle;
                  });        
                if (this.cookieToken) {
                    this.isUserLoggedIn = true;
                } else {
                    this.isUserLoggedIn = false;
                }

                router.events.subscribe((val) => {
                    if (location.path() != '') {                    
                        this.localPath = location.path();                     
                    } 
                });


                this.getJSON().subscribe(data => {
                  //  obj = data;
                    this.showRegister = data.isRegister;

                }, error => {  });
    }
    /**
     * This function used to read the checkRegisteration json.
     */
    public getJSON(): Observable<any> {
        return this.http.get("../../../assets/js/checkRegisteration.json")
            .map((res: any) => res.json())

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
   * This method used to show hide the sign up model.
   */
  goToSignUp() {
      this.isModalOpen = true;
      this.openSignUp = true;
  }
  /**
   * This method used to logout the user out of app.
   */
  profileClick() {
      this.betPropensityApi.logout().subscribe(
          resData => {             
                 // this.appCom.isUserLoggedIn.next(false);
              this.router.navigate(['login']);
                  this.cookieService.delete('Token'); 
                  this.homeService.isUser.next(false);                            
          },
      );
  }
  /**
   * This method navigate the user to create query.
   */
  createQuery(navString) {
      if (navString == 'Report' || navString == 'View Report') {
          this.createReportService.setReportObj({
              "id": 0,
              "name": "",
              "queryJSON": {},
              "outputColumns":["turnover", "pl"],
              "outputData": "sport",
              "top_by": "pl",
              "top_count": 0
          });
          this.router.navigate(['create-report']);
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
      } else if (navString == 'Player Profile Report' || navString == 'Profile Result') {
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
          this.router.navigate(['create-profile']); 
      } else if(navString == 'Query Result' || navString == 'Query List') {
          this.createQueryService.setDetails({});
          this.router.navigate(['create-queries']); 
      } else if (navString == 'Dashboards' || navString == 'View Dashboard'){
          this.router.navigate(['create-dashboard']);
          this.dashboardService.fromPage.next('');
          this.dashboardService.reports.next([]);
      }          
  }

  /**
   * This method used to toggle side menu.
   */  
  toggleSideBar(){
    this.appCom.isSideBar.next(this.toggle);
  }
/**
 * This method used to clear previous state and navigate to home page.
 */
  goToHome() {
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

      this.dashboardService.fromPage.next('');
      this.dashboardService.reports.next([]);

      this.appCom.headerQueryString.next('');
      this.router.navigate(['home']); 
  }
}
