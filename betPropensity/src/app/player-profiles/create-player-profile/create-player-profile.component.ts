/**
 *  A class representing a CreatePlayerProfileComponent and its functionality.
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppComponent } from '../../app.component';
import { BetPropensityApiService } from '../../services/bet-propensity-api.service';
import { CreatePlayerProfileService } from '../../services/create-player-profile.service';

@Component({
  selector: 'app-create-player-profile',
  templateUrl: './create-player-profile.component.html',
  styleUrls: ['./create-player-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreatePlayerProfileComponent implements OnInit {
  checkData= false;
  reportId: any;
  reportname: any;
  /**
   * 
   * @param appCom instance of AppComponent
   * @param betPropensityApi instance of BetPropensityApiService
   * @param createPlayerProfile  instance of CreatePlayerProfileService
   * @param router  instance of Router
   * @param route  instance of ActivatedRoute
   */
  constructor(public appCom: AppComponent,
              public betPropensityApi: BetPropensityApiService,
              public createPlayerProfile:CreatePlayerProfileService,
              private router: Router,
              private route: ActivatedRoute) {
      this.appCom.headerQueryString.next("Create profile");  
  }

  ngOnInit() {
      this.reportId = this.route.snapshot.params.id;
      let fromPage = this.createPlayerProfile.getPageFrom();
      if (this.reportId && !fromPage) {         
          this.betPropensityApi.getPlayerProfileReportDetails(this.reportId).subscribe(
              resData => {
                   this.checkData = true;              
                  this.reportname = resData.name;
                  let profileObj = {
                      "periodrange": resData.periodrange,
                      "frequency": resData.frequency,
                      "type": resData.type,
                      "primary1": resData.type == 1 || resData.type == 3 || resData.type == 2 ? this.dataFormation(resData.primary1) : {},
                      "primary2": resData.type == 2 ? this.dataFormation(resData.primary2) : {},
                      "secondary": resData.type == 3 ? this.dataFormation(resData.secondary) : {},
                      "id": resData.id,
                      "name": resData.name,
                  }
                 
                  this.createPlayerProfile.setProfileInfo(profileObj);
              }
          );
      } else {          
          this.checkData = true;
          let data = this.createPlayerProfile.getProfileInfo();
          this.reportname = data.name; 
      }

  }
/**
 * This is method used for forming data object to display.
 * @param data 
 */
  dataFormation(data){          
    let obj ={
        sport : data.sport ? data.sport.id : '',
        pmip:data.pmip,
        leagues : this.getOnlyIds(data.leagues),
        markets : this.getOnlyIds(data.markets)
    }    
    return obj;    
  }
  /**
   * This method used to pickup ids from service.
   * @param resData 
   */
  getOnlyIds(resData){
    let id =[];
    for(let data of resData){
        id.push(data.id);
    }
    return id;
  }
  /**
   * This method used to navigate to result page and handles preview functionality.
   */
  previewReport() {
      let profilePeriod = [];
      let profileFreq = [];
      let profileTypeSel: any;

      this.createPlayerProfile.profilePeriod.subscribe(
          resData => {
              if (resData.length > 0) {
                  profilePeriod = resData;
              }
          }
      );
      this.createPlayerProfile.profileFreq.subscribe(
          resData => {
              if (resData.length > 0) {
                  profileFreq = resData;
              }
          }
      );
      this.createPlayerProfile.profileTypeSel.subscribe(
          resData => {
              profileTypeSel = resData;
          }
      );

      if (profilePeriod.length <= 0) {
          return;
      }

     
      if (!this.reportId) {
          let profileObj = {
              "periodrange": profilePeriod.length > 1 ? profilePeriod : profilePeriod[0],
              "frequency": profileFreq.length > 1 ? profileFreq : profileFreq[0],
              "type": profileTypeSel,
              "primary1": profileTypeSel == 1 || profileTypeSel == 2 || profileTypeSel == 3 ? this.createPlayerProfile.primary1 : {},
              "primary2":  profileTypeSel == 2 ? this.createPlayerProfile.primary2 : {},
              "secondary": profileTypeSel == 3 ? this.createPlayerProfile.secondary : {}
          }

          this.createPlayerProfile.setProfileInfo(profileObj);         
        
          this.router.navigate(['profile-result']);
      } else {
          let profileData = {
              "periodrange": profilePeriod.length > 1 ? profilePeriod : profilePeriod[0],
              "frequency": profileFreq.length > 1 ? profileFreq : profileFreq[0],
              "type": profileTypeSel,
              "primary1": profileTypeSel == 1 || profileTypeSel == 2 || profileTypeSel == 3 ? this.createPlayerProfile.primary1 : {},
              "primary2": profileTypeSel == 2 ? this.createPlayerProfile.primary2 : {},
              "secondary": profileTypeSel == 3 ? this.createPlayerProfile.secondary : {},
              "id": this.reportId,
              "name": this.reportname,
          }                  
          this.createPlayerProfile.setPageFrom(true);
          this.createPlayerProfile.hideUpdate.next(false);
          this.createPlayerProfile.setProfileInfo(profileData);          
          this.router.navigate(['profile-result', this.reportId]);
      }
  }
  
}
