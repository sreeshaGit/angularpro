/**
 *  A class representing a CreateReportComponent and its functionality.
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppComponent } from '../../app.component';

import { BetPropensityApiService } from '../../services/bet-propensity-api.service';
import { CreateReportService } from '../../services/create-report.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateReportComponent implements OnInit {
    editInfo = [];
    filterSel = true;
    numOfRec:any
    outputData:any;
    outputCol:any;
    outputBy: any;
    playerProfile = false;
    ruleArray = [];
    reportId: any;
    reportname: any;
    reportSelected = true;
    reportCompare = false;
    reportCol = [];
    selEvent: any;
    selPeriod: any;
    toggle = false;

    checkData = false;
    
    tabSel = [{ "value": "New report", "checked":true },
              { "value": "Report Comparison", "checked": false}]
    /**
     * @param appCom - { AppComponent} instance of AppComponent.
     * @param betPropensityApi - {BetPropensityApiService} instance of BetPropensityApiService.
     * @param createReportService - {createReportService} instance of createReportService.
     * @param router - { Router} instance of Router.
     * @param route - {ActivatedRoute} instance of ActivatedRoute.
     */
    constructor(public appCom: AppComponent,
                public betPropensityApi: BetPropensityApiService,
                public createReportService: CreateReportService,
                private router: Router,
                private route: ActivatedRoute) {
        this.appCom.headerQueryString.next("Create Report");      
    }

    ngOnInit() {       
        this.createReportService.typeOfView.subscribe(
            resData => {                
                this.setReportType(resData);
            }
        );

        this.reportId = this.route.snapshot.params.id;
        let fromPage = this.createReportService.getPageFrom();
       
        let event = [];
        let market = [];
        let sport = [];
        let country = [];
        let betFold = [];
        let reportData = [];
        this.createReportService.selReportIds.next([]);
       
        if (this.reportId && !fromPage) {                    
                this.betPropensityApi.getReportDetails(this.reportId).subscribe(
                    resData => {                       
                        this.checkData = true;
                        this.createReportService.setReportObj(resData);
                        this.reportname = resData.name;                    
                        this.createReportService.outputBy.next([resData.top_by]);
                        this.createReportService.numOfRec.next(resData.top_count);
                        this.createReportService.outputCol.next(resData.outputColumns);
                        this.createReportService.outputData.next(resData.outputData);
                        let queryJsonData = JSON.parse(resData.queryJSON)

                        if (queryJsonData.hasOwnProperty('compare') && queryJsonData.compare) {

                            this.setReportType('Report Comparison');
                            this.createReportService.typeOfView.next('Report Comparison');
                            this.createReportService.setCompareReportObj(queryJsonData.compare);
                            if (queryJsonData.compare.report_ids) {
                                this.createReportService.selReportIds.next(queryJsonData.compare.report_ids);
                            }
                        }
                        if (queryJsonData.hasOwnProperty('rules')) {
                            this.setReportType('New report');
                            this.createReportService.typeOfView.next('New report');
                            this.createReportService.selReportIds.next([]);
                        }

                        if (queryJsonData.rules && queryJsonData.rules.length > 0) {
                            this.setReportType('New report');
                            this.createReportService.typeOfView.next('New report');
                            for (let i = 0; i < queryJsonData.rules.length; i++) {
                                this.editInfo.push(queryJsonData.rules[i]);                               
                                switch (queryJsonData.rules[i].option) {
                                    case "manualDate":
                                        let date = queryJsonData.rules[i];
                                        this.createReportService.dateSelected.next([date]);
                                        break;
                                    case "manualStake":
                                        let stake = queryJsonData.rules[i];
                                        this.createReportService.stakeRange.next([stake]);
                                        break;
                                    case "manualEvent":                                       
                                        let event1 = queryJsonData.rules[i].name;
                                        this.createReportService.eventSel.next([event1]);
                                        break;
                                    case "manualMarket":
                                        let market1 = queryJsonData.rules[i].name;
                                        this.createReportService.marketSel.next([market1]);
                                        break;
                                    case "manualSport":
                                        let sport1 = queryJsonData.rules[i].name;
                                        this.createReportService.sportsSel.next([sport1]);
                                        break;
                                    case "manualCountry":
                                        let country1 = queryJsonData.rules[i].name;
                                        this.createReportService.country.next([country1]);
                                        break;
                                    case "betFold1":
                                        let betFold1 = queryJsonData.rules[i];
                                        this.createReportService.betFold.next([betFold1]);
                                        break;
                                    case "manualReport":
                                        let reportSel = queryJsonData.rules[i].name;
                                        this.createReportService.reportSel.next([reportSel]);
                                        break;                                   
                                }
                               
                                if (queryJsonData.rules[i].rules) {
                                
                                    for (let j = 0; j < queryJsonData.rules[i].rules.length; j++) {

                                        if (queryJsonData.rules[i].rules[j].option == "manualEvent") {
                                            event.push(queryJsonData.rules[i].rules[j].name)
                                            this.createReportService.eventSel.next(event);
                                        } else if (queryJsonData.rules[i].rules[j].option == "manualMarket") {
                                            market.push(queryJsonData.rules[i].rules[j].name)
                                            this.createReportService.marketSel.next(market);
                                        } else if (queryJsonData.rules[i].rules[j].option == "manualSport") {
                                            sport.push(queryJsonData.rules[i].rules[j].name)
                                            this.createReportService.sportsSel.next(sport);
                                        } else if (queryJsonData.rules[i].rules[j].option == "manualCountry") {
                                            country.push(queryJsonData.rules[i].rules[j].name)
                                            this.createReportService.country.next(country);
                                        } else if (queryJsonData.rules[i].rules[j].option == "betFold1") {
                                            betFold.push(queryJsonData.rules[i].rules[j])
                                            this.createReportService.betFold.next(betFold);
                                        } else if (queryJsonData.rules[i].rules[j].option == "manualReport") {
                                            reportData.push(queryJsonData.rules[i].rules[j].name)
                                            this.createReportService.reportSel.next(reportData);  
                                        }
                                    }
                                                                                            
                                }
                            }
                        }
                    }
                );            
        } else {
           
            this.checkData = true;
            let compareReportObj = this.createReportService.getCompareReportObj();           
            this.createReportService.selReportIds.next(compareReportObj.compare ? compareReportObj.compare.report_ids : '');

            let data = this.createReportService.getReportObj();           
            this.reportname = data.name;                     
            let queryJsonData :any;
            queryJsonData = data.queryJSON;
            if (queryJsonData.hasOwnProperty('compare') && queryJsonData.compare) {

                this.setReportType('Report Comparison');
                this.createReportService.typeOfView.next('Report Comparison');
                this.createReportService.setCompareReportObj(queryJsonData.compare);
                if (queryJsonData.compare.report_ids) {
                    this.createReportService.selReportIds.next(queryJsonData.compare.report_ids);
                }
            }
            if (queryJsonData.hasOwnProperty('rules')) {
                
                this.setReportType('New report');
                this.createReportService.typeOfView.next('New report');
                this.createReportService.selReportIds.next([]);
            }

            if (queryJsonData.rules && queryJsonData.rules.length > 0) {
                this.setReportType('New report');
                this.createReportService.typeOfView.next('New report');
                for (let i = 0; i < queryJsonData.rules.length; i++) {
                    this.editInfo.push(queryJsonData.rules[i]);                   
                 
                }
            }                  

        } 
    }
    /**
     * This function used to get the report details.
     */
    previewReport() {
        if (this.reportCompare) {           
            if (this.reportId) {
                let data = this.getComparedReportData();
                if (data.length <= 1){
                    return;
                } else {
                    let reportObj = {
                        "compare": {
                            "report_ids": this.getComparedReportData(),
                            "id": this.reportId,
                            "name": this.reportname,
                        }
                    }
                    this.createReportService.setCompareReportObj(reportObj);
                    this.createReportService.setEditMode(true);
                    this.createReportService.setPageFrom(true);
                    this.router.navigate(['view-reports', this.reportId]);
                }
                
            } else if (!this.reportId) {
                let data = this.getComparedReportData();
                if (data.length <= 1) {
                    return;
                } else {
                    this.createReportService.setEditMode(false);
                    this.reportId = 0;
                    let reportObj = {
                        "compare": { "report_ids": this.getComparedReportData() }
                    }
                    this.createReportService.setCompareReportObj(reportObj);
                    this.router.navigate(['view-reports']);
                }
            }

        }

        if (this.filterSel) {
            this.createReportService.hideDropdown.next(true);
            this.ruleArray = [];        
            this.outputData = this.getOutputData();

            this.outputCol = this.getOutputCol();           
            this.outputBy = this.getOutputBy();            
            this.createReportService.numOfRec.subscribe(
                numOfRec => {
                    this.numOfRec = numOfRec;
                }
            );

            let queryJSON;
            this.createReportService.freqSel.subscribe(
                resData => {
                    if (resData.length > 0) {
                        this.addToRuleArray(resData);
                    }
                }
            );
            let stakeSel = [];
            this.createReportService.stakeSel.subscribe(
                resData => {
                    for (let data of resData) {
                        if (data.checked) {
                            stakeSel.push(data);
                        }
                    }
                }
            );
            let stakeRange = [];
            this.createReportService.stakeRange.subscribe(
                resData => {
                    if (resData.length > 0) {
                        stakeRange = (resData);
                    }

                }
            );

            if (stakeSel.length > 0 && stakeRange.length > 0) {
                let data = [];
                data = data.concat(stakeSel, stakeRange);
                let multiSel = {
                    "condition": "OR",
                    "rules": data
                }
                this.ruleArray.push(multiSel);

            } else if (stakeSel.length > 0 && stakeRange.length == 0) {
                this.addToRuleArray(stakeSel);
            } else if (stakeSel.length == 0 && stakeRange.length > 0) {
                this.ruleArray.push(stakeRange[0]);
            }

            this.createReportService.oddsSel.subscribe(
                resData => {
                    if (resData.length > 0) {                       
                        this.addToRuleArray(resData);
                    }
                }
            );

            this.createReportService.periodSel.subscribe(
                resData => {
                    if (resData.length > 0) {
                        this.addToRuleArray(resData);
                    }
                }
            );

            this.createReportService.betType.subscribe(
                resData => {
                    if (resData.length > 0) {
                        this.addToRuleArray(resData);
                    }
                }
            );

            this.createReportService.betStatus.subscribe(
                resData => {                  
                    if (resData.length > 0) {                       
                        this.addToRuleArray(resData);
                    }
                }
            );

            this.createReportService.betFold.subscribe(
                resData => {
                    if (resData.length > 0 && resData.length === 1) {
                        this.ruleArray.push(resData[0]);
                    } else if (resData.length > 1) {
                        let betFold = {
                            "condition": "OR",
                            "rules": resData
                        }
                        this.ruleArray.push(betFold);
                    }
                }
            );
            this.createReportService.eventSel.subscribe(
                resData => {
                    if (resData.length > 0) {
                        let selectedEvent = [];
                        for (let data of resData) {
                            let selEvent = {
                                "id": "eventId1",
                                "field": "eventId",
                                "operator": "equal",
                                "value": data.id.toString(),
                                "optgroup": "betderived",
                                "name": data,
                                "option": "manualEvent"
                            }
                            selectedEvent.push(selEvent);

                        }
                        if (selectedEvent.length === 1) {
                            this.ruleArray.push(selectedEvent[0]);
                        }
                        else {
                            let multiSelEvent = {
                                "condition": "OR",
                                "rules": selectedEvent
                            }
                            this.ruleArray.push(multiSelEvent);
                        }

                    }
                }
            );

            this.createReportService.marketSel.subscribe(
                resData => {                   
                    if (resData.length > 0) {
                        let selectedData = [];
                        for (let data of resData) {
                            let marketData = {
                                "id": "marketName1",
                                "field": "marketName",
                                "operator": "equal",
                                "value": data.name,
                                "optgroup": "betderived",
                                "name": data,
                                "option": "manualMarket"
                            }
                            selectedData.push(marketData);
                        }
                        if (selectedData.length === 1) {
                            this.ruleArray.push(selectedData[0]);
                        }
                        else {
                            let multiSelMarket = {
                                "condition": "OR",
                                "rules": selectedData
                            }
                            this.ruleArray.push(multiSelMarket);
                        }
                    }
                }
            );

            this.createReportService.sportsSel.subscribe(
                resData => {
                    if (resData.length > 0) {
                        let selectedSport = [];

                        for (let data of resData) {
                            selectedSport.push({
                                "id": "sportsid1",
                                "field": "sportsid",
                                "operator": "equal",
                                "value": data.sportIds.toString(),
                                "optgroup": "betderived",
                                "name": data,
                                "option": "manualSport"
                            });
                        }

                        if (selectedSport.length === 1) {
                            this.ruleArray.push(selectedSport[0]);
                        }
                        else {
                            let multiSelSport = {
                                "condition": "OR",
                                "rules": selectedSport
                            }
                            this.ruleArray.push(multiSelSport);
                        }
                    }
                }
            );

            this.createReportService.country.subscribe(
                resData => {
                    if (resData.length > 0) {
                        let selectedCountry = [];
                        for (let data of resData) {
                            selectedCountry.push({
                                "id": "country",
                                "field": "country",
                                "operator": "equal",
                                "optgroup": "player",
                                "include": data.include,
                                "value": data.key,
                                "name": data,
                                "option": "manualCountry"
                            });
                        }

                        if (selectedCountry.length === 1) {
                            this.ruleArray.push(selectedCountry[0]);
                        }
                        else {
                            let multiSelSport = {
                                "condition": "OR",
                                "rules": selectedCountry
                            }
                            this.ruleArray.push(multiSelSport);
                        }
                    }
                }
            );

            this.createReportService.daySelected.subscribe(
                resData => {                  
                    let daysel = [];
                    if (resData.length > 0){
                        for (let data of resData){
                            if (data.checked){
                                daysel.push(data.value);
                            }
                        }
                       
                        if (daysel.length > 0){
                            let daySelec = {
                                "id": "daysofWeek",
                                "field": "daysofWeek",
                                "operator": "in",                              
                                "value": daysel,
                                "optgroup": "slipderived"
                            };
                            this.ruleArray.push(daySelec);
                        }
                    }
                }
            );

            this.createReportService.sameEvent.subscribe(
                sameEvent => {
                    if (sameEvent.length){                        
                        for (let evt of sameEvent) {                                                       
                            if (evt.checked && evt.dispalyName == "Yes" || evt.field == 'sameEvent' && evt.value){                               
                                    let eventData = {
                                        "id": "sameEvent",
                                        "field": "sameEvent",
                                        "operator": "equal",
                                        "value": true,
                                        "optgroup": "slipderived"
                                    }
                                    this.ruleArray.push(eventData);                              
                            } else if (evt.checked && evt.dispalyName == "No" || evt.field == 'sameEvent' && !evt.value){
                                let eventDataSel = {
                                    "id": "sameEvent",
                                    "field": "sameEvent",
                                    "operator": "equal",
                                    "value": false,
                                    "optgroup": "slipderived"
                                }
                                this.ruleArray.push(eventDataSel);
                            }
                        }
                    }
                }
            );

            this.createReportService.sameMarket.subscribe(
                sameMarket => {
                    if (sameMarket.length) {
                        for (let evt of sameMarket) {                                                     
                              if (evt.checked && evt.dispalyName == "Yes" || evt.field == 'sameMarket' && evt.value) {
                                  let marketData = {
                                      "id": "sameMarket",
                                      "field": "sameMarket",
                                      "operator": "equal",
                                      "value": true,
                                      "optgroup": "slipderived"
                                  }
                                  this.ruleArray.push(marketData);
                              } else if (evt.checked && evt.dispalyName == "No" || evt.field == 'sameMarket' && !evt.value) {
                                  let marketDataSel = {
                                      "id": "sameMarket",
                                      "field": "sameMarket",
                                      "operator": "equal",
                                      "value": false,
                                      "optgroup": "slipderived"
                                  }
                                  this.ruleArray.push(marketDataSel);
                              }                               
                        }
                    }
                }
            );

            this.createReportService.priorEvtDays.subscribe(
                priorEvtDays => {
                    if (priorEvtDays != null){
                        let evtDays = {
                            "id": "timePriortoEventDay",
                            "field": "timePriortoEventDay",
                            "operator": "equal",
                            "value": priorEvtDays,
                            "optgroup": "slipderived"  
                        }
                        this.ruleArray.push(evtDays);
                    }
                }
            );

            this.createReportService.priorEvtHours.subscribe(
                priorEvtHours => {
                    if (priorEvtHours != null) {
                        let evtHours = {
                            "id": "timePriortoEventHour",
                            "field": "timePriortoEventHour",
                            "operator": "equal",
                            "value": priorEvtHours,
                            "optgroup": "slipderived"
                        }
                        this.ruleArray.push(evtHours);
                    }
                }
            );

            this.createReportService.priorEvtMins.subscribe(
                priorEvtMins => {
                    if (priorEvtMins != null){
                        let evtMin = {
                            "id": "timePriortoEventMin",
                            "field": "timePriortoEventMin",
                            "operator": "equal",
                            "value": priorEvtMins,
                            "optgroup": "slipderived"
                        }
                        this.ruleArray.push(evtMin);
                    }                   
                }
            );

            this.createReportService.timeDay.subscribe(
                timeDay => {                   
                    if (timeDay.operator != null || timeDay.value != null){
                        let timeOfDay = {
                            "id": "timeofDay",
                            "field": "timeofDay",
                            "operator": timeDay.operator,
                            "value": timeDay.value,
                            "optgroup": "slipderived"

                        }
                        this.ruleArray.push(timeOfDay);
                    }                   
                }
            );

            this.createReportService.dateSelected.subscribe(
                resData => {
                    if (resData.length > 0) {
                        this.ruleArray.push(resData[0]);
                    }
                }
            );

            this.createReportService.betNumber.subscribe(
                resData => {
                    if (resData.length > 0) {                        
                        this.ruleArray.push(resData[0]);
                    }
                }
            );
          
            this.createReportService.winPrct.subscribe(
                resData => {
                    if (resData.length > 0) {
                        this.ruleArray.push(resData[0]);
                    }
                }
            );

            this.createReportService.lossPrct.subscribe(
                resData => {
                    if (resData.length > 0) {                       
                        this.ruleArray.push(resData[0]);
                    }
                }
            );
            this.createReportService.profileSelected.subscribe(
                profiles => {
                    if(profiles.length >0){                     
                        let selProfiles =[];
                        for(let ids of profiles){
                            selProfiles.push(ids.id);
                        }
                        let profileObj ={
                            "id": "userProfileID",
                            "field": "userProfileID",
                             "operator": "in",
                             "value": selProfiles,
                             "optgroup": "slipderived"
 
                        }
                        this.ruleArray.push(profileObj);
                    }
                }
            );
            if (this.ruleArray.length > 0) {
                queryJSON = {
                    "condition": "AND",
                    "rules": this.ruleArray,
                    "valid": true
                }
            } else {
                queryJSON = {
                    "condition": "AND",
                    "rules": []
                }
            }

            if (this.reportId) {
                let reportObj = {
                    "id": parseInt(this.reportId),
                    "name": this.reportname,
                    "queryJSON": queryJSON,
                    "top_count": parseInt(this.numOfRec),
                    "top_by": this.outputBy.toString(),
                    "outputColumns": this.outputCol,
                    "outputData": this.outputData.toString(),
                    "top": { "count": parseInt(this.numOfRec), "by": this.outputBy.toString() },
                }
                this.createReportService.setReportObj(reportObj);               
                this.createReportService.hideUpdate.next(false);
                this.createReportService.setPageFrom(true);                
                this.router.navigate(['view-reports', this.reportId]);
            } else if (!this.reportId) {
                this.createReportService.setEditMode(false);
                this.reportId = 0;
                let reportObj = {
                    "id": 0,
                    "name": this.reportname,
                    "top": { "count": parseInt(this.numOfRec), "by": this.outputBy.toString() },
                    "outputColumns": this.outputCol,
                    "outputData": this.outputData.toString(),
                    "queryJSON": queryJSON,
                    "top_count": parseInt(this.numOfRec),
                    "top_by": this.outputBy.toString(),
                }
                this.createReportService.setReportObj(reportObj);                
                this.router.navigate(['view-reports']);
            }

        }
              
    }
    /**
     * This function used to format the data array.
     * @param resData 
     */
    addToRuleArray(resData) {       
        let ruleSubArray = [];
        for (let data of resData) {           
            if (data.checked) {
                ruleSubArray.push(data);
            }
        }
    
        if (ruleSubArray.length === 1) {
            this.ruleArray.push(ruleSubArray[0]);
        }
        else if(ruleSubArray.length>1){
            let selEvent = {
                "condition": "OR",
                "rules": ruleSubArray
            }
            this.ruleArray.push(selEvent);
        }
    }
    /**
     * This function gets output data from observer.
     */
    getOutputData() {
        let outputData = [];
        this.createReportService.outputData.subscribe(
            resData => {              
                outputData = resData;                            
            }            
        );
        return outputData;
    }
    /**
     * This function gets output column data from observer.
     */
    getOutputCol() {
        let outputCol = [];
        this.createReportService.outputCol.subscribe(
            resData => {
                outputCol = [];               
                for (let data of resData) {
                    outputCol.push(data);
                }                
            }
        );
        return outputCol;
    }
    /**
     * This function gets output group by  from observer.
     */
    getOutputBy() {
        let outputBy = [];
        this.createReportService.outputBy.subscribe(
            resData => {               
                outputBy = [];
                for (let data of resData) {
                    outputBy.push(data);
                }              
            }             
        );
        return outputBy;
    }
    /**
     * This function used to get report selected list.
     */
    getComparedReportData() {
        let reportSel = [];        
        this.createReportService.reportSel.subscribe(
            resData => {
                if (resData.length > 0) {
                    reportSel = [];
                    for (let data of resData) {
                        reportSel.push(data.id);
                    }      
                }
            }
        );

        let compareRep = [];
        this.createReportService.compareRep.subscribe(
            resData => {
                if (resData.length > 0) {
                    compareRep = [];
                    for (let data of resData) {                     
                        compareRep.push(data.id);
                    }
                }
            }
        );

        let reportIds = [];
        reportIds = reportIds.concat(reportSel, compareRep);
    
        this.createReportService.selReportIds.next(reportIds);
        return reportIds;
    }
    /**
     * This function used to update the view.
     * @param option 
     * @param event 
     * @param ind 
     */
    updateCheckedOptions(option, event, ind) {      
        if (option) {
            this.setReportType(option.value);
            this.createReportService.typeOfView.next(option.value);           
        }
    }
    /**
     * This function used for dispaly checks of data.
     * @param typeSel 
     */
    setReportType(typeSel) {       
        for (let radio of this.tabSel) {
            if (radio.value === typeSel) {
                radio.checked = true;
                switch (typeSel) {
                    case 'New report':                      
                        this.filterSel = true;
                        this.reportCompare = false;
                        this.playerProfile = false;
                        break;
                    case 'Report Comparison':                      
                        this.reportCompare = true;
                        this.playerProfile = false;
                        this.filterSel = false;
                        break;                   
                 }            
            } else {
                radio.checked = false;
            }
        }
    }
    /**
     * This function used to get report columns data.
     */
    getReportColumns() {
        this.betPropensityApi.getReportColumns().subscribe(
            resCol => {
                this.reportCol = resCol.columns;
               
            }
        );
    }
}
