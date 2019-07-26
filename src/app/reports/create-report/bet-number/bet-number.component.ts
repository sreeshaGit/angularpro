/**
 * A class representing a BetNumberComponent and its functionality.
 */
import { Component, OnInit, Input } from '@angular/core';

import { CreateReportService } from '../../../services/create-report.service';

@Component({
  selector: 'app-bet-number',
  templateUrl: './bet-number.component.html',
  styleUrls: ['./bet-number.component.scss']
})
export class BetNumberComponent implements OnInit {
  betFrom: number;
  betTo: number;
  betNoOrder = false;
  lossFrom: any;
  lossTo: any;
  winFrom: any;
  winTo: any;
  @Input() queryJson: any;
  /**
   * 
   * @param createReportService - {CreateReportService} instance of CreateReportService.
   */
  constructor(public createReportService: CreateReportService) { }

  ngOnInit() {
      this.createReportService.betNumber.subscribe(
          resData => {
              if (resData.length > 0 && resData[0].operator == "between") {                
                  this.betFrom = resData[0].value[0] ;
                  this.betTo = resData[0].value[1];                
              } else if (resData.length > 0 && resData[0].operator == "less") {
                  this.betTo = resData[0].value;
              } else if (resData.length > 0 && resData[0].operator == "greater") {
                  this.betFrom = resData[0].value;
              }
          }
      );
      this.createReportService.winPrct.subscribe(
          resData => {
              if (resData.length > 0 && resData[0].operator == "between") {
                  this.winFrom = resData[0].value[0];
                  this.winTo = resData[0].value[1];
              } else if (resData.length > 0 && resData[0].operator == "less") {
                  this.winTo = resData[0].value;
              } else if (resData.length > 0 && resData[0].operator == "greater") {
                  this.winFrom = resData[0].value;
              }
          }
      );
      this.createReportService.lossPrct.subscribe(
          resData => {
              if (resData.length > 0 && resData[0].operator == "between") {
                  this.lossFrom = resData[0].value[0];
                  this.lossTo = resData[0].value[1];
              } else if (resData.length > 0 && resData[0].operator == "less") {
                  this.lossTo = resData[0].value;
              } else if (resData.length > 0 && resData[0].operator == "greater") {
                  this.lossFrom = resData[0].value;
              }
          }
      );

      this.setBetNum();
      this.setWinPercent();
      this.setLossPercent();
      
  }
 
/**
 * This method used to validate the given input values.
 * @param evt 
 * @param val 
 */
  onlyTwoDigitsNumber(evt, val) {
      if (val && val.toString().length >= 3 && val > 100) {
          return false
      }
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
      }
      return true;
  }
/**
 * This function used to get the value out of focus.
 * @param val 
 * @param text 
 */
  onOutOfFocus(val, text) {
      if (val > 100){
          if (text == 'betFrom') {
              this.betFrom = 100;
          } else if (text == 'betTo') {
              this.betTo = 100;
          } else if (text == 'winFrom') {
              this.winFrom = 100;
          } else if (text == 'winTo') {
              this.winTo = 100;
          } else if (text == 'lossFrom') {
              this.lossFrom = 100;
          } else if (text == 'lossTo'){
              this.lossTo = 100;
          }
      }
  }
/**
 * This method used to validate bet number ,win and loss values and set them to observable.
 * @param from - From where the changes as been made.
 * @param val - value of input.
 * @param text - text from input.
 */
  getValue(from, val, text) {
      this.onOutOfFocus(val, text);
      if (from == 'betnumber'){          
          if (this.betFrom != null && this.betFrom > -1 && this.betTo != null && this.betTo > -1) {
              let betBtw = {
                  "id": "betnumber",
                  "field": "betnumber",
                  "operator": "between",
                  "reverse_numbering": this.betNoOrder,
                  "value": [this.betFrom, this.betTo],
                  "optgroup": "betderived"
              }
              this.createReportService.betNumber.next([betBtw]);
          } else if (this.betFrom && this.betFrom > -1 && typeof this.betTo === 'undefined') {
              let betFrom = {
                  "id": "betnumber",
                  "field": "betnumber",
                  "operator": "greater",
                  "value": this.betFrom,
                  "optgroup": "betderived"
              }
              this.createReportService.betNumber.next([betFrom]);
          } else if (this.betTo && this.betTo > -1 && typeof this.betFrom === 'undefined') {
              let betTo = {
                  "id": "betnumber",
                  "field": "betnumber",
                  "operator": "less",
                  "value": this.betTo,
                  "optgroup": "betderived"
              }
              this.createReportService.betNumber.next([betTo]);
          } else {
              this.createReportService.betNumber.next([]);
          }
      } else if (from == 'win') {          
          if (this.winFrom != null && this.winFrom > -1 && this.winTo!= null && this.winTo > -1) {
              let winBtw = {
                  "id": "betwinpercentage",
                  "field": "betwinpercentage",
                  "operator": "between",
                  "value": [this.winFrom, this.winTo],
                  "optgroup": "betderived"
              }
              this.createReportService.winPrct.next([winBtw]);
          } else if (this.winFrom && this.winFrom > -1 && typeof this.winTo === 'undefined') {
              let winFrom = {
                  "id": "betwinpercentage",
                  "field": "betwinpercentage",
                  "operator": "greater",
                  "value": this.winFrom,
                  "optgroup": "betderived"
              }
              this.createReportService.winPrct.next([winFrom]);
          } else if (this.winTo && this.winTo > -1 && typeof this.winFrom === 'undefined') {
              let winTo = {
                  "id": "betwinpercentage",
                  "field": "betwinpercentage",
                  "operator": "less",
                  "value": this.winTo,
                  "optgroup": "betderived"
              }
              this.createReportService.winPrct.next([winTo]);
          } else {
              this.createReportService.winPrct.next([]);
          }
      } else if (from == 'loss') {
          if (this.lossFrom != null && this.lossFrom > -1 && this.lossTo != null && this.lossTo > -1) {
              let lossBtw = {
                  "id": "betlostpercentage",
                  "field": "betlostpercentage",
                  "operator": "between",
                  "value": [this.lossFrom, this.lossTo],
                  "optgroup": "betderived"
              }
              this.createReportService.lossPrct.next([lossBtw]);
          } else if (this.lossFrom && this.lossFrom > -1 && typeof this.lossTo === 'undefined') {
              let lossFrom = {
                  "id": "betlostpercentage",
                  "field": "betlostpercentage",
                  "operator": "greater",
                  "value": this.lossFrom,
                  "optgroup": "betderived"
              }
              this.createReportService.lossPrct.next([lossFrom]);
          } else if (this.lossTo && this.lossTo > -1 && typeof this.lossFrom === 'undefined') {
              let lossTo = {
                  "id": "betlostpercentage",
                  "field": "betlostpercentage",
                  "operator": "less",
                  "value": this.lossTo,
                  "optgroup": "betderived"
              }
              this.createReportService.lossPrct.next([lossTo]);
          } else {
              this.createReportService.lossPrct.next([]);
          }
      }
  
  }
/**
 * This function used to set the bet number details.
 */
  setBetNum() {
      for (let data of this.queryJson) {      
          if (data.id == "betnumber") {
              if (data.operator == "between") {                
                  this.betFrom = data.value[0];
                  this.betTo = data.value[1];
                  this.betNoOrder = data.reverse_numbering
                  let betBtw = {
                      "id": "betnumber",
                      "field": "betnumber",
                      "operator": "between",
                      "value": [this.betFrom, this.betTo],
                      "optgroup": "betderived",
                      "reverse_numbering": data.reverse_numbering
                  }
                  this.createReportService.betNumber.next([betBtw]);
              } else if (data.operator == "greater") {
                  this.betFrom = data.value ? data.value : '';
                  let betFrom = {
                      "id": "betnumber",
                      "field": "betnumber",
                      "operator": "greater",
                      "value": this.betFrom,
                      "optgroup": "betderived"
                  }
                  this.createReportService.betNumber.next([betFrom]);
              } else if (data.operator == "less") {
                  this.betTo = data.value ? data.value : '';
                  let betTo = {
                      "id": "betnumber",
                      "field": "betnumber",
                      "operator": "less",
                      "value": this.betTo,
                      "optgroup": "betderived"
                  }
                  this.createReportService.betNumber.next([betTo]);
              }
          }
      }
  }
/**
 * This function used to set the win details
 */
  setWinPercent() {
      for (let data of this.queryJson) {
          if (data.id == "betwinpercentage") {
              if (data.operator == "between") {
                  this.winFrom = data.value[0];
                  this.winTo = data.value[1];
                  let winBtw = {
                      "id": "betwinpercentage",
                      "field": "betwinpercentage",
                      "operator": "between",
                      "value": [this.winFrom, this.winTo],
                      "optgroup": "betderived"
                  }
                  this.createReportService.winPrct.next([winBtw]);
              } else if (data.operator == "greater") {
                  this.winFrom = data.value ? data.value : '';
                  let winFrom = {
                      "id": "betwinpercentage",
                      "field": "betwinpercentage",
                      "operator": "greater",
                      "value": this.winFrom,
                      "optgroup": "betderived"
                  }
                  this.createReportService.winPrct.next([winFrom]);
              } else if (data.operator == "less") {
                  this.winTo = data.value ? data.value : '';
                  let winTo = {
                      "id": "betwinpercentage",
                      "field": "betwinpercentage",
                      "operator": "less",
                      "value": this.winTo,
                      "optgroup": "betderived"
                  }
                  this.createReportService.winPrct.next([winTo]);
              }
          }
      }
  }
/**
 * This function used to set the loss details.
 */
  setLossPercent() {
      for (let data of this.queryJson) {
          if (data.id == "betlostpercentage") {
              if (data.operator == "between") {
                  this.lossFrom = data.value[0];
                  this.lossTo = data.value[1];
                  let lossBtw = {
                      "id": "betlostpercentage",
                      "field": "betlostpercentage",
                      "operator": "between",
                      "value": [this.lossFrom, this.lossTo],
                      "optgroup": "betderived"
                  }
                  this.createReportService.lossPrct.next([lossBtw]);
              } else if (data.operator == "greater") {
                  this.lossFrom = data.value ? data.value : '';
                  let lossFrom = {
                      "id": "betlostpercentage",
                      "field": "betlostpercentage",
                      "operator": "greater",
                      "value": this.lossFrom,
                      "optgroup": "betderived"
                  }
                  this.createReportService.lossPrct.next([lossFrom]);
              } else if (data.operator == "less") {
                  this.lossTo = data.value ? data.value : '';
                  let lossTo = {
                      "id": "betlostpercentage",
                      "field": "betlostpercentage",
                      "operator": "less",
                      "value": this.lossTo,
                      "optgroup": "betderived"
                  }
                  this.createReportService.lossPrct.next([lossTo]);
              }
          }
      }
  }
/**
 * This function used to update the bet no order.
 */
  updateBetNoOrder() {
      this.betNoOrder = !this.betNoOrder;
      if (this.betFrom != null && this.betFrom > -1 && this.betTo != null && this.betTo > -1) {
          let betBtw = {
              "id": "betnumber",
              "field": "betnumber",
              "operator": "between",
              "value": [this.betFrom, this.betTo],
              "optgroup": "betderived",
              "reverse_numbering": this.betNoOrder
          }
          this.createReportService.betNumber.next([betBtw]);
      }
  }
}
