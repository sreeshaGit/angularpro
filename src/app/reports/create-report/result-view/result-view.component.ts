/**
 *  A class representing a ResultViewComponent and its functionality.
 */
import { Component, OnInit, Input } from '@angular/core';

import { BetPropensityApiService } from '../../../services/bet-propensity-api.service';
import { CreateReportService } from '../../../services/create-report.service';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.scss']
})
export class ResultViewComponent implements OnInit {
   
    dropdownSettings = {};
    outputColumnDropdownSettings = {};
    outputData = [];
    outputBy = [];
    outputColumn = [];
    noOfRecords = 10;
    selectedOutputData = [];       
    selectedOutputBy = [];   
    selectedOutputColumn = [];
    @Input() reportId: any;
   
    /**
     * 
     * @param betPropensityApi - { BetPropensityApiService} instance of BetPropensityApiService
     * @param createReportService - {CreateReportService} instance of CreateReportService
     */
    constructor(public betPropensityApi: BetPropensityApiService,
                public createReportService: CreateReportService) {}

    ngOnInit() {   

        let resultData = this.createReportService.getReportObj();

        
        
        this.dropdownSettings = {
            singleSelection: true,
            text: "Select Fields",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            searchPlaceholderText: 'Search Fields',
            enableSearchFilter: true,
            badgeShowLimit: 20           
        };

        this.outputColumnDropdownSettings = {
            singleSelection: false,
            text: "Select Fields",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            searchPlaceholderText: 'Search Fields',
            enableSearchFilter: true,
            badgeShowLimit: 20
        };       
       this.createReportService.numOfRec.subscribe(
           resData=>{
            this.noOfRecords= resData;
       });
        this.getOutputData();
        this.getOutputByData();
        this.getOutputColumnData();
    }
    /**
     * 
     * @param item
     * @param from 
     */
    onItemSelect(item: any, from) {
        switch (from) {
            case 'outputData':               
              this.createReportService.outputData.next(this.selectedOutputData);               
                break;
            case 'outputBy':               
                this.createReportService.outputBy.next(this.selectedOutputBy);
                break;
            case 'outputColumn':               
                this.createReportService.outputCol.next(this.selectedOutputColumn);
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
            case 'outputData':
                this.createReportService.outputData.next(this.selectedOutputData);               
                break;
            case 'outputBy':
                this.createReportService.outputBy.next(this.selectedOutputBy);
                break;
            case 'outputColumn':
                this.createReportService.outputCol.next(this.selectedOutputColumn);
                break;
        }        
    }
    /**
     * 
     * @param items
     * @param from
     */
    onSelectAll(items: any, from) {        
        if (from == 'outputColumn') {
            this.createReportService.outputCol.next(this.selectedOutputColumn);
        }
    }
    /**
     * 
     * @param items
     * @param from
     */
    onDeSelectAll(items: any, from) {     
        if (from == 'outputColumn') {
            this.createReportService.outputCol.next(this.selectedOutputColumn);
        }
    }
    /**
     * This function used to get output columns.
     */
    getOutputColumnData() {
        this.betPropensityApi.getAttributesList().subscribe(
            resData => {
                if (resData) {
                    let outputColumn = [];
                    let count = 1;
                    for (let i = 0; i < resData.length; i++) {
                        if (resData[i].table == 'outputColumns') {
                            for (let j = 0; j < resData[i].columns.length; j++) {
                                outputColumn.push({ "id": count, "itemName": resData[i].columns[j], "category": resData[i].table });
                                count++
                            }
                        }
                    }
                    this.outputColumn = outputColumn;                                   
                    this.setDefaultOutputColData(this.outputColumn);
                }
            }
        );       
    }
    /**
     * This function used to set the default output col data.
     * @param data 
     */
    setDefaultOutputColData(data) {
        let reportObj = this.createReportService.getReportObj();        
        let latOutputColData = [];
        if (reportObj.outputColumns.length > 0) {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < reportObj.outputColumns.length; j++) {
                    if (data[i].itemName == reportObj.outputColumns[j]) {
                        latOutputColData.push(data[i]);
                    }
                }

            }
            this.selectedOutputColumn = latOutputColData;
        }        
        this.createReportService.outputCol.next(this.selectedOutputColumn);

    }

    /**
     * This function used to get the outputby.
     */
    getOutputByData() {
        this.betPropensityApi.getOutputBy().subscribe(resData => {
            let count = 1;
            let outputBy = [];
            for (let j = 0; j < resData.outputby.length; j++) {
                outputBy.push({ "id": count, "itemName": resData.outputby[j].display_text, "key": resData.outputby[j].value });
                count++
            }
            this.outputBy = outputBy;
            this.setOutputBy(this.outputBy);
        });
    }
    /**
     * This method used to set the outputby.
     * @param data 
     */
    setOutputBy(data) {
        let reportObj = this.createReportService.getReportObj();
        let latOutputByData = [];
        if (reportObj.top_by != '') {
            for (let i = 0; i < data.length; i++) {
                if (data[i].key == reportObj.top_by) {
                    latOutputByData.push(data[i]);
                }
            }
            this.selectedOutputBy = latOutputByData;
        }
        this.createReportService.outputBy.next(this.selectedOutputBy);
    }

    /**
     * This function used to get output data.
     */
    getOutputData() {
        this.betPropensityApi.getOutputData().subscribe(resData => {
            let count = 1;
            let outputData = [];
            for (let j = 0; j < resData.outputdata.length; j++) {
                outputData.push({ "id": count, "itemName": resData.outputdata[j].display_text, "key": resData.outputdata[j].value });
                count++
            }
            this.outputData = outputData;         
            this.setOutputData(this.outputData);      
        });
    }
    /**
     * This method used to set the output data.
     * @param data 
     */
    setOutputData(data) {
        let reportObj = this.createReportService.getReportObj();       
        let latOutputData = [];
        if (reportObj.outputData != '') {
            for (let i = 0; i < data.length; i++) {
                if (data[i].key == reportObj.outputData) {
                    latOutputData.push(data[i]);
                }
            }            
            this.selectedOutputData = latOutputData;
        } 
        this.createReportService.outputData.next(this.selectedOutputData);
    }
    /**
     * This method used to get number of records.
     * @param evt 
     */
    noOfRecordChange(evt) {       
        this.createReportService.numOfRec.next(this.noOfRecords);
    }
}
