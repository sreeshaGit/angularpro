/**
 *  A class representing a PlayerComponent and its functionality.
 */
import { Component, OnInit,ViewEncapsulation,Input } from '@angular/core';


import { BetPropensityApiService } from '../../../services/bet-propensity-api.service';
import { CreateReportService } from '../../../services/create-report.service';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerComponent implements OnInit {
  profile = [];
  selectedProfile = [];
  showProfilePopUp = false;
  isModalOpen: any;
  listOfProfileReports = [];
  @Input() queryJson: any;
  /**
   * 
   * @param betPropensityApi - {BetPropensityApiService} instance of BetPropensityApiService
   * @param createReportService - {CreateReportService} instance of CreateReportService
   */
  constructor(public betPropensityApi: BetPropensityApiService, public createReportService: CreateReportService) { }

  ngOnInit() {
      this.profile = [];
      this.selectedProfile = [];  
      this.createReportService.profileSelected.subscribe(
          proSel => {           
              if (proSel.length > 0)
              this.selectedProfile = [];          
              this.profile = proSel;
              this.selectedProfile = proSel;             
          }
      );
      this.getPlayerProfileList();
  }
  /**
   * This function used for setting selected profiles
   */
  selectProfile() {      
      this.createReportService.profileSelected.next(this.selectedProfile);
  }
  /**
   * This function used to close popup.
   * @param evt 
   */
  close(evt){
      if(evt){
        this.showProfilePopUp = false;
        this.isModalOpen = false;
      }
  }
  /**
   * This function used to check profile click.
   */
  onProfileClick() {   
      this.showProfilePopUp = true;
      this.isModalOpen = true;
  }
  /**
   * This function used to get player profile list.
   */
  getPlayerProfileList() {
      this.listOfProfileReports = [];
      this.betPropensityApi.getPlayerProfilesList().subscribe(
          resData => {
              this.sortResponceData(resData);
              this.listOfProfileReports.sort(function (first, second) {
                  return first.id - second.id;
              });

              this.setDataForProfile();
          }
      );
  }
  /**
   * This function used to sort the profile list.
   * @param listRep 
   */
  sortResponceData(listRep) {
      if (listRep.length > 0) {
          for (let data of listRep) {
              data['label'] = data.name;
              data['value'] = data.id;
              this.listOfProfileReports.push(data);
          }
      }
  }
  /**
   * This function used to set the profile.
   */
  setDataForProfile() {
      this.selectedProfile = [];
      this.profile = [];
      let data = this.queryJson;
      let profileIds = [];
      let profileObj = [];
      for (let prof of this.listOfProfileReports) {
          for (let data of this.queryJson) {
              if (data.id == "userProfileID") {
                  for (let ids of data.value) {
                      if (prof.id == ids) {
                          profileIds = data.value;
                          profileObj.push(prof);
                      }
                  }
              }
          }
      }
      this.selectedProfile = profileObj;      
      this.profile = profileObj;    
      this.createReportService.profileSelected.next(profileObj);
  }
}
