/**
 *  A class representing a ProfileDetailsComponent and its functionality.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as FileSaver from 'file-saver';

import { AppComponent } from '../../app.component';
import { BetPropensityApiService } from '../../services/bet-propensity-api.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
    errorMsg = false;
    disabled = true;
    disabledExport = false;
    displayError = false;
    hideData = true;
    playerId: any;
    playerSummary: any;
    /**
     * @param betPropensityApi - {BetPropensityApiService} instance of BetPropensityApiService
     * @param route -{ActivatedRoute} instance of ActivatedRoute
     * @param appCom - {AppComponent} instance of AppComponent
     */
    constructor(public betPropensityApi: BetPropensityApiService, private route: ActivatedRoute, public appCom: AppComponent) {
        this.appCom.headerQueryString.next("Player Summary");
    }

    ngOnInit() {       
        let id = this.route.snapshot.params.id;
        this.playerId = this.route.snapshot.params.id;
        if (this.playerId){
            this.getPlayerSummaryData(this.playerId); 
        }
    }
    /**
     * This function used to get player summary data.
     * @param id 
     */
    getPlayerSummaryData(id) {
        this.betPropensityApi.getPlayerSummary(id).subscribe(
            resData => {
                if (resData.result == "unknown_player"){
                    this.hideData = true;
                    this.displayError = true;
                } else if (resData.result == "success") {
                    this.displayError = false;
                    this.hideData = false;
                    this.playerSummary = resData;
                }               
            },
            error => {
                this.displayError = true;
                this.hideData = true;
            }
        );
    }
    /**
     * This function used to validate the input field.
     * @param evt 
     */
    onlyNumber(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
    /**
     * This function used to disable.
     * @param evt 
     */
    onPlayerIdChange(evt) {       
        this.disabled = false;
        this.errorMsg = false;       
    }
    /**
     * This fucntion used to get player details.
     */
    getPlayerDetails() {
        this.playerSummary = [];
        if (this.playerId) {
            this.disabled = true;
            this.getPlayerSummaryData(this.playerId);
        } else {          
            this.errorMsg = true;
            this.displayError = false;
        }   
    }
    /**
     * This function used to export csv file of player.
     * @param playerId 
     */
    getExportCSV(playerId) {       
        this.betPropensityApi.getProfileCsvData(playerId).subscribe(
            resData => {
                this.disabledExport = true;
                let parsedResponse = resData;
                this.downloadFile(parsedResponse);
            },
            error => {
                this.disabledExport = true;
            }
        );
    }
    /**
     * This function used to download files in csv format.
     * @param data 
     */
    downloadFile(data: any) {
        let blob = new Blob([data], { type: 'csv' });
        let fileName = this.playerId + ".csv";
        FileSaver.saveAs(blob, fileName);
    }
}
