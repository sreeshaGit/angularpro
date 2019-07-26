/**
 *  A class representing a PlayerProfileSelectionComponent and its functionality.
 */
import { Component, OnInit } from '@angular/core';
import { BetPropensityApiService } from '../../../services/bet-propensity-api.service';
import { CreatePlayerProfileService } from '../../../services/create-player-profile.service';

@Component({
  selector: 'app-player-profile-selection',
  templateUrl: './player-profile-selection.component.html',
  styleUrls: ['./player-profile-selection.component.scss']
})
export class PlayerProfileSelectionComponent implements OnInit {
  dropdownSettings = {};
  freqData = [];
  multiDropdownSettings = {};
  periodData = [];
  playerType = [];
  selectedFreq = [];
  selectedPeriod = [];
  selectedType = [];
  profileInfo: any;
  

  constructor(public betPropensityApi: BetPropensityApiService,
              public createPlayerProfile: CreatePlayerProfileService) { }

  ngOnInit() {

      this.dropdownSettings = {
          singleSelection: true,
          text: "Select Fields",
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          searchPlaceholderText: 'Search Fields',
          enableSearchFilter: true,
          badgeShowLimit: 20
      };
      this.multiDropdownSettings = {
          singleSelection: false,
          text: "Select Fields",
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          searchPlaceholderText: 'Search Fields',
          enableSearchFilter: true,
          badgeShowLimit: 20
      };
    
      this.profileInfo = this.createPlayerProfile.getProfileInfo();      
      this.getFrequencyData();
      this.getPeriodData();
      this.getPlayerType();
  }

  /**
   * This function used to select the items of dropdown.
   * @param item
   * @param from 
   */
  onItemSelect(item: any, from) {     
      switch (from) {
          case 'typeSel':              
              this.createPlayerProfile.profileTypeSel.next(this.selectedType[0].id);
              break;
          case 'period':
              let periodData = this.getSelectedValues(this.selectedPeriod);          
              this.createPlayerProfile.profilePeriod.next(periodData);
              break;
          case 'freq':
              let freqData = this.getSelectedValues(this.selectedFreq);            
              this.createPlayerProfile.profileFreq.next(freqData);
              break;
      }
  }
  /**
   * 
   * @param item
   * @param from
   */
  OnItemDeSelect(item: any, from) {
      switch (from) {
          case 'typeSel':
              this.createPlayerProfile.profileTypeSel.next(0);
              break;
          case 'period':
              let periodData = this.getSelectedValues(this.selectedPeriod); 
              this.createPlayerProfile.profilePeriod.next(periodData);
              break;
          case 'freq':
              let freqData = this.getSelectedValues(this.selectedFreq);
              this.createPlayerProfile.profileFreq.next(freqData);
              break;
      }
  }
  /**
   * 
   * @param items
   * @param from
   */
  onSelectAll(items: any, from) {
      if (from == 'freq'){
          let freqData = this.getSelectedValues(this.selectedFreq);
          this.createPlayerProfile.profileFreq.next(freqData);
      }
  }
  /**
   * 
   * @param items
   * @param from
   */
  onDeSelectAll(items: any, from) {
      if (from == 'freq') {
          let freqData = this.getSelectedValues(this.selectedFreq);
          this.createPlayerProfile.profileFreq.next(freqData);
      }
  }

  getFrequencyData() {     
      this.betPropensityApi.getFrequency().subscribe(
          resData => {             
              let count = 1;
              let frequency = [];
              for (let j = 0; j < resData.frequency.length; j++) {
                  frequency.push({ "id": count, "itemName": resData.frequency[j].display_text, "value": resData.frequency[j].value });
                  count++
              }
              this.freqData = frequency;            
              for (let freq of this.freqData) {                  
                  if (Array.isArray(this.profileInfo.frequency)) {
                      for (let frequency of this.profileInfo.frequency) {                          
                          if (freq.value == frequency) {                             
                              this.selectedFreq.push(freq); 
                          }
                      }                                         
                  } else if (freq.value == this.profileInfo.frequency) {                        
                          this.selectedFreq.push(freq);
                  }                  
              }             
              let freqData = this.getSelectedValues(this.selectedFreq);
              this.createPlayerProfile.profileFreq.next(freqData);
          }
      );
  }

  getPeriodData() {
      this.betPropensityApi.getProfilePeriodData().subscribe(
          resData => {
              let count = 1;
              let periodData = [];
              for (let j = 0; j < resData.playerprofileperiodrange.length; j++) {
                  periodData.push({ "id": count, "itemName": resData.playerprofileperiodrange[j].display_text, "value": resData.playerprofileperiodrange[j].value });
                  count++
              }
              this.periodData = periodData;             
              for (let period of this.periodData){
                  if (this.profileInfo.periodrange && period.value == this.profileInfo.periodrange) {
                      this.selectedPeriod.push(period);                    
                  }
              }
              let periodSel = this.getSelectedValues(this.selectedPeriod);
              this.createPlayerProfile.profilePeriod.next(periodSel);
          }
      );
  }

  getPlayerType() {
      this.betPropensityApi.getPlayerType().subscribe(
          resData => {              
              let count = 1;
              let playerType = [];
              for (let j = 0; j < resData.playerprofiletype.length; j++) {
                  playerType.push({ "id": count, "itemName": resData.playerprofiletype[j].display_text });
                  count++
              }
              this.playerType = playerType;              
              for (let pType of this.playerType) {                
                  if (this.profileInfo.type && pType.id == this.profileInfo.type) {                   
                      this.selectedType.push(pType);
                      this.createPlayerProfile.profileTypeSel.next(pType.id);
                  }
              }
          }
      );
  }

  getSelectedValues(data) {
      let selVal = [];
      if (data.length > 0) {
          for (let selData of data) {
              selVal.push(selData.value)
          }
      }
      return selVal;
  }

}
