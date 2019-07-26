/**
 *  A class representing a ProfilePopUpComponent and its functionality.
 */
import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input, OnDestroy } from '@angular/core';


import { BetPropensityApiService } from '../../../services/bet-propensity-api.service';
import { CreateReportService } from '../../../services/create-report.service';

@Component({
  selector: 'app-profile-pop-up',
  templateUrl: './profile-pop-up.component.html',
  styleUrls: ['./profile-pop-up.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilePopUpComponent implements OnInit, OnDestroy {

  listOfProfileReports = [];
  
  latestProfileData: any;
  playerType = [];  
  profileSelectedSubscription: any;
  selectListOfProfile = [];
  showProfileData = false;
  hasOwnProperty = Object.prototype.hasOwnProperty;
  @Input() ProfilesArray: any;
  @Output() profilesSelect: EventEmitter<any> = new EventEmitter();
  /**
   * 
   * @param betPropensityApi  - {BetPropensityApiService} instance of BetPropensityApiService.s
   * @param createReportService - {CreateReportService} instance of CreateReportService.
   */
  constructor(public betPropensityApi: BetPropensityApiService,public createReportService:CreateReportService) {}

  ngOnInit() {     
      this.listOfProfileReports = [];
      this.listOfProfileReports = this.ProfilesArray;
      this. getPlayerType();
      let selProf =[];
      this.profileSelectedSubscription = this.createReportService.profileSelected.subscribe(
          profiles => {             
              selProf = [];              
              this.selectListOfProfile = [];
              if(profiles.length > 0){
                for(let data of profiles){
                    selProf.push(data.id);
                  }
                this.selectListOfProfile = selProf;
                this.getPlayerProfileReportDetails(this.selectListOfProfile[this.selectListOfProfile.length - 1]);
              }                           
          }
      );
    
  }
  /**
   * This function used to select profiles.
   * @param event 
   */
  profileSelect(event) {      
     let selectList=[];             
      if(this.selectListOfProfile.length > 0){        
        this.latestProfileData={};
        this.getPlayerProfileReportDetails(event.value[event.value.length - 1]);
      }
  }
  /**
   * This function used get the player profile reports details.
   * @param id 
   */
  getPlayerProfileReportDetails(id) {     
      if (id) {         
         this.betPropensityApi.getPlayerProfileReportDetails(id).subscribe(
              resData => {                  
                  this.latestProfileData = resData;
                  this.showProfileData = true;

              },
              error => {
                  this.showProfileData = false;
              }
          );
      }   
  }
  /**
   * This method used to for closing the popup.
   */
  closePopUp() {
      let selectList = [];
      if (this.selectListOfProfile.length > 0) {
          for (let data of this.listOfProfileReports) {
              for (let selectId of this.selectListOfProfile) {
                  if (data.id == selectId) {
                      selectList.push(data);
                  }
              }
          }
          if (selectList.length > 0)              
             this.createReportService.profileSelected.next(selectList);
             this.latestProfileData = {};       
      } else {         
          this.createReportService.profileSelected.next([]);
      }
    this.profilesSelect.emit(true);
  }
  /**
   * This method used to get player profile type data.
   */
  getPlayerType() {
    this.betPropensityApi.getPlayerType().subscribe(
        resData => {            
            this.playerType = resData.playerprofiletype;              
        }
    );
    }
    /**
     * This method checks for empty object.
     * @param obj 
     */
 isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (this.hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  }
/**
 *This function called before destroying  the component.
 */
 ngOnDestroy() {   
     this.profileSelectedSubscription.unsubscribe();
 }
}
