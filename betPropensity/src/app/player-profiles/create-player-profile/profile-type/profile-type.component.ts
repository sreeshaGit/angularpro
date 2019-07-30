/**
 *  A class representing a ProfileTypeComponent and its functionality.
 */
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BetPropensityApiService } from '../../../services/bet-propensity-api.service';
import { CreatePlayerProfileService } from '../../../services/create-player-profile.service';
@Component({
  selector: 'app-profile-type',
  templateUrl: './profile-type.component.html',
  styleUrls: ['./profile-type.component.scss']
})
export class ProfileTypeComponent implements OnInit {
  betStatus: any;
  betStatusPrimary2: any;
  betStatusSecondary: any;
  dropdownSettings = {};
  displayPrimary = false;
  displayPrimary2 = false;
  displaySecondary = false;
  leagueData = [];
  loader = false;
  marketsData = [];
  proileInfo: any;
  sportData = [];
  selectedSport = [];
  selectedLeague = [];
  selectedMarkets = [];
  selectedSportPrimary2 = [];
  selectedLeaguePrimary2 = [];
  selectedMarketsPrimary2 = [];
  selectedSportSecondary = [];
  selectedLeagueSecondary = [];
  selectedMarketsSecondary = [];
  multiSettings = {};
  timeout = null;
    /**
     * 
     * @param betPropensityApi  instance of BetPropensityApiService
     * @param createPlayerProfile instance of CreatePlayerProfileService
     */
  constructor(public betPropensityApi: BetPropensityApiService,
              public createPlayerProfile: CreatePlayerProfileService) { }

  ngOnInit() {
      this.createPlayerProfile.profileTypeSel.subscribe(
          resData => {            
              switch (resData) {
                  case 0:
                      this.displayPrimary = false;
                      this.displaySecondary = false;
                      this.displayPrimary2 = false;
                      break;
                  case 1:
                      this.displayPrimary = true;
                      this.displayPrimary2 = false;
                      this.displaySecondary = false;
                      break;
                  case 2:
                      this.displayPrimary2 = true;
                      this.displayPrimary = true;
                      this.displaySecondary = false;
                      break;
                  case 3:
                      this.displayPrimary = true;
                      this.displaySecondary = true;
                      this.displayPrimary2 = false;
                      break;
              }
          }
      );
      this.proileInfo = this.createPlayerProfile.getProfileInfo();
     
      this.dropdownSettings = {
          singleSelection: true,
          text: "Select Fields",
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          searchPlaceholderText: 'Search Fields',
          enableSearchFilter: true,
          badgeShowLimit: 20
      };

      

      this.multiSettings = {
          text: "Select",
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          classes: "myclass custom-class",
          labelKey: "name",
          noDataLabel: "Search Markets",
          enableSearchFilter: true,
          searchBy: ['displayName']
      };

      
      this.getMarkets();
      this.getSports();
      this.getLeagues();
      this.getBetStatus();

  }

 
  
  /**
   * 
   * @param item
   * @param from 
   */
  onItemSelect(item: any, from) {
      this.setDataSelected(from);   
  }
  /**
   * 
   * @param item
   * @param from
   */
  OnItemDeSelect(item: any, from) {
      this.setDataSelected(from);
  }
  /**
   * 
   * @param items
   * @param from
   */
  onSelectAll(items: any, from) {
      this.setDataSelected(from);    
  }
  /**
   * 
   * @param items
   * @param from
   */
  onDeSelectAll(items: any, from) {
      this.setDataSelected(from);
   
  }
  /**
   * This method used to set the selected data of dropdown.
   * @param from 
   */
  setDataSelected(from) {
      switch (from) {
          case 'sportPrimary':
              let sport = this.getSelectedIds(this.selectedSport);
              this.createPlayerProfile.primary1.sport = sport[0];
              break;
          case 'leaguePrimary':
              this.createPlayerProfile.primary1.leagues = this.getSelectedIds(this.selectedLeague);
              break;
          case 'marketPrimary':
              this.createPlayerProfile.primary1.markets = this.getSelectedIds(this.selectedMarkets);
              break;
          case 'sportPrimary2':
              let sport2 = this.getSelectedIds(this.selectedSportPrimary2);
              this.createPlayerProfile.primary2.sport = sport2[0];
              break;
          case 'leaguePrimary2':
              this.createPlayerProfile.primary2.leagues = this.getSelectedIds(this.selectedLeaguePrimary2);
              break;
          case 'marketPrimary2':
              this.createPlayerProfile.primary2.markets = this.getSelectedIds(this.selectedMarketsPrimary2);
              break;
          case 'sportSecondary':
              let sport3 = this.getSelectedIds(this.selectedSportSecondary);
              this.createPlayerProfile.secondary.sport = sport3[0];
              break;
          case 'leagueSecondary':
              this.createPlayerProfile.secondary.leagues = this.getSelectedIds(this.selectedLeagueSecondary);
              break;
          case 'marketSecondary':
              this.createPlayerProfile.secondary.markets = this.getSelectedIds(this.selectedMarketsSecondary);
              break;
      }
  }
  /**
   * This method used to get sport data.
   */
  getSports() {
      this.betPropensityApi.getSportNames().subscribe(
          resData => {
              let count = 1;
              let sportsData = [];
              for (let j = 0; j < resData.data.length; j++) {
                  sportsData.push({ "id": count, "itemName": resData.data[j].name, "selIds": resData.data[j].id });
                  count++
              }
              this.sportData = sportsData;
              let primary1Sport = [];
              let primary2Sport = [];
              let secondarySport = [];
              for (let data of this.sportData) {                
                  if (this.proileInfo.primary1.sport && data.selIds == this.proileInfo.primary1.sport ) {
                      this.selectedSport.push(data);
                      primary1Sport.push(data.selIds);
                  }
                  if (this.proileInfo.primary2.sport && data.selIds == this.proileInfo.primary2.sport) {
                      this.selectedSportPrimary2.push(data);
                      primary2Sport.push(data.selIds);
                  }
                  if (this.proileInfo.secondary.sport && data.selIds == this.proileInfo.secondary.sport) {
                      this.selectedSportSecondary.push(data);
                      secondarySport.push(data.selIds);
                  }
              }

              this.createPlayerProfile.primary1.sport = primary1Sport[0];
              this.createPlayerProfile.primary2.sport = primary2Sport[0];
              this.createPlayerProfile.secondary.sport = secondarySport[0];
          }
      );
  }
  /**
   * This method used to get the search data of league.
   * @param evt 
   */
  onSearch(evt: any) {      
      this.marketsData = [];
      if (evt.target.value.length >= 3) {
          if (this.timeout) { clearTimeout(this.timeout); }
          var self = this;
          // after the key press code should be waiting for 500ms.
          this.timeout = setTimeout(function () {
              self.loader = true;
              self.betPropensityApi.getMarketName(evt.target.value,'').subscribe(resData => {
                  self.loader = false;
                  if (resData.data.length > 0) {
                      self.marketsData = self.setDisplayName(resData.data);
                  }
              });

          }, 500);
      } else if(evt.target.value.length == 0){
        this.getMarkets();
      }
  }
  /**
   * This method used to search the league data.
   * @param evt 
   */
 onLeague(evt: any) {    
      this.leagueData = [];
      if (evt.target.value.length >= 3) {
          if (this.timeout) { clearTimeout(this.timeout); }
          var self = this;
          // after the key press code should be waiting for 500ms.
          this.timeout = setTimeout(function () {
              self.loader = true;
              self.betPropensityApi.getLeagueName(evt.target.value,'').subscribe(resData => {
                  self.loader = false;
                  if (resData.data.length > 0) {
                    let count = 1;
                     let leagueData = [];
                    for (let j = 0; j < resData.data.length; j++) {
                        leagueData.push({ "id": count, "name": resData.data[j].sport_name + ' : ' + resData.data[j].name, "selIds": resData.data[j].id });
                        count++
                    }
                      self.leagueData = leagueData;
                  }
              });

          }, 500);
      }else if(evt.target.value.length == 0){
        this.getLeagues();
      }
  }
  /**
   * This method used to set the display name.
   * @param resData 
   */
  setDisplayName(resData) {
      for (let data of resData) {
          data.name = data.sport_name + ' : ' + data.name;
          data.selIds = parseInt(data.id)
      }
      return resData;
  }
  /**
   * This method used to get league data.
   */
  getLeagues() {
      this.betPropensityApi.getLeagueName('','').subscribe(resData => {         
          if (resData.data.length > 0) {            
              let count = 1;
              let leagueData = [];
              for (let j = 0; j < resData.data.length; j++) {
                  leagueData.push({ "id": count, "name": resData.data[j].sport_name + ' : ' + resData.data[j].name, "selIds": resData.data[j].id });
                  count++
              }
              let primary1League = [];
              let primary2League = [];
              let secondaryLeague = [];
              this.leagueData = leagueData;      
                  for (let data of this.leagueData) {
                      if (this.proileInfo.primary1.leagues) {
                          for (let league of this.proileInfo.primary1.leagues) {
                             
                              if (data.selIds == league) {                              
                                  this.selectedLeague.push(data);
                                  primary1League.push(data.selIds);
                              }
                          }
                      }
                      if (this.proileInfo.primary2.leagues) {
                         for (let league of this.proileInfo.primary2.leagues) {
                            if (data.selIds == league) {                              
                                this.selectedLeaguePrimary2.push(data);
                                primary2League.push(data.selIds);
                            }
                        }
                      }
                       if (this.proileInfo.secondary.leagues) {
                            for (let league of this.proileInfo.secondary.leagues) {
                              if (data.selIds == league) {                              
                                  this.selectedLeagueSecondary.push(data);
                                  secondaryLeague.push(data.selIds);
                              }
                            }
                       }                                        
              }
                  this.createPlayerProfile.primary1.leagues = primary1League;
                  this.createPlayerProfile.primary2.leagues = primary2League;
                  this.createPlayerProfile.secondary.leagues = secondaryLeague;
          }
      });
  }
  /**
   * This method used to set bet status.
   */
  getBetStatus() {
      this.betPropensityApi.getBetStatus().subscribe(
          resData => {
              for (let data of resData.betstatus) {
                  if (Object.keys(data).indexOf('checked') == -1) {
                      data.checked = false;
                  }
              }
              this.betStatus = resData.betstatus;
              this.betStatusPrimary2 = JSON.parse(JSON.stringify(resData.betstatus));
              this.betStatusSecondary = JSON.parse(JSON.stringify(resData.betstatus));
             
                  for (let betStatus of this.betStatus) {                    
                      if (this.proileInfo.primary1.pmip == betStatus.value) {                         
                          betStatus.checked = true;
                      }
                  }
           
                  for (let betStatus1 of this.betStatusPrimary2) {
                      if ( this.proileInfo.primary2.pmip == betStatus1.value) {
                          betStatus1.checked = true;
                      }
                  }
        
                  for (let betStatus2 of this.betStatusSecondary) {
                      if (this.proileInfo.secondary.pmip == betStatus2.value) {
                          betStatus2.checked = true;
                      }
                  }     

                  this.createPlayerProfile.primary1.pmip = this.proileInfo.primary1.pmip;
                  this.createPlayerProfile.primary2.pmip = this.proileInfo.primary2.pmip;
                  this.createPlayerProfile.secondary.pmip = this.proileInfo.secondary.pmip;
          }
      );
    
  }
  /**
   * This method used to check pmip values.
   * @param option 
   * @param event 
   * @param ind 
   * @param from 
   */
  updateCheckedOptions(option, event, ind, from) {     
      if (option) {        
          switch (from) {
              case 'Primary':             
                  this.betStatus[ind].checked = !this.betStatus[ind].checked;     
                  if(this.betStatus[ind].checked) {
                    this.createPlayerProfile.primary1.pmip = parseInt(this.betStatus[ind].value);
                  } else {
                    delete this.createPlayerProfile.primary1["pmip"];
                  }
                                                 
                  break;
              case 'Primary2':              
                  this.betStatusPrimary2[ind].checked = !this.betStatusPrimary2[ind].checked;
                  if(this.betStatusPrimary2[ind].checked) {
                    this.createPlayerProfile.primary2.pmip = parseInt(this.betStatusPrimary2[ind].value);
                  } else {
                    delete this.createPlayerProfile.primary2["pmip"];
                  }
                 
                  break;
              case 'Secondary':
                  this.betStatusSecondary[ind].checked = !this.betStatusSecondary[ind].checked;
                  if(this.betStatusSecondary[ind].checked){
                    this.createPlayerProfile.secondary.pmip = parseInt(this.betStatusSecondary[ind].value);
                  } else {
                    delete this.createPlayerProfile.secondary["pmip"];
                  }                             
                  break;
              
          }
               
      }
  }
  /**
   * This method used to pick up selection Ids.
   * @param data 
   */
  getSelectedIds(data) {
      let selIds = [];
      for (let seldata of data) {
          selIds.push(seldata.selIds)
      }
      return selIds;
  }
  /**
   * This method used to get markets data.
   */
  getMarkets(){
    this.betPropensityApi.getMarketName('','').subscribe(resData => {
          this.loader = false;
          if (resData.data.length > 0) {
              let primary1Market = [];
              let primary2Market = [];
              let secondaryMarket = [];
              this.marketsData = this.setDisplayName(resData.data);             
                  for (let data of this.marketsData) {
                     if (this.proileInfo.primary1.markets) {
                         for (let market of this.proileInfo.primary1.markets) {                           
                              if (data.selIds == market) {
                                  this.selectedMarkets.push(data);
                                  primary1Market.push(data.selIds);
                              }
                          }
                     }
                     if (this.proileInfo.primary2.markets) {
                        for (let market of this.proileInfo.primary2.markets) {
                            if (data.selIds == market) {
                                this.selectedMarketsPrimary2.push(data);
                                primary2Market.push(data.selIds);
                            }
                        }
                     }
                    if (this.proileInfo.secondary.markets) {
                        for (let market of this.proileInfo.secondary.markets) {
                            if (data.selIds == market) {
                                this.selectedMarketsSecondary.push(data);
                                secondaryMarket.push(data.selIds);
                            }
                        }
                    }
                      
              }
                  this.createPlayerProfile.primary1.markets = primary1Market;
                  this.createPlayerProfile.primary2.markets = primary2Market;
                  this.createPlayerProfile.secondary.markets = secondaryMarket;
          }
      });
  }
}
