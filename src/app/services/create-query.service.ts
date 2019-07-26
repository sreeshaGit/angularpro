import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BetPropensityApiService } from './bet-propensity-api.service';
import { CookieService } from 'ngx-cookie-service';

declare var $: any;
@Injectable()
export class CreateQueryService {
  public sqlJson = new BehaviorSubject<any>({});
  public detail = new BehaviorSubject<any>({});
  public queryId = new BehaviorSubject<any>(0);
  public hideUpdate = new BehaviorSubject<any>(false);
  public edit: false;
  public details = {
      "id": 0,
      "name": "",
      "queryJSON": "",
      "querySQL": "",
      "tables": "",
      "aggregationSpec": "",
      "groupBy": "",
      "outputColumns":[]
  };

  public groupData = new BehaviorSubject<any>([]);
  public outputcolData = new BehaviorSubject<any>([]);

  public sports = [];

  constructor(public betPropensityApi: BetPropensityApiService, private cookieService: CookieService) {
    //  this.getSports();
  }

  public setEdit(value) {
      this.edit = value;
  }

  public getEdit() {
      return this.edit;
  }

  public setDetails(obj) {  
      this.details = obj;
  }

  public getDetails(){
      return this.details;
  }


  public getConfig() {
      let cookie = this.cookieService.get('Token');
    
      return {          
          filters: [{
              id: 'gender',
              label: 'gender',
              type: 'string',
              input: 'checkbox',
              values: [
                  { value: 'M', label: 'Male' },
                  { value: 'F', label: 'Female' }
              ],
          }, {
              id: 'id',
              field: 'id',
              label: 'id',
              input: 'number',
              optgroup: 'Slip',
              validation: {
                  min: 0
              }
          }, {
              id: 'playerId',
              field: 'playerId',
              label: 'playerId',
              input: 'number',
              optgroup: 'Slip',
              validation: {
                  min: 0
              }
          }, {
              id: 'isLiveBet',
              field: 'isLiveBet',
              label: 'isLiveBet',
              type: 'string',
              input: 'checkbox',
              values: [{ value: 1, label: 'In-play' },
              { value: 0, label: 'Pre-event' }],
              optgroup: 'Slip',
          }, {
              id: 'isFreeBet',
              field: 'isFreeBet',
              label: 'isFreeBet',
              type: 'string',
              input: 'checkbox',
              values: [{ value: 1, label: 'Free bet' },
              { value: 0, label: 'regular bet' }],
              optgroup: 'Slip',
          }, {
              id: 'isComboBet',
              field: 'isComboBet',
              label: 'isComboBet',
              type: 'string',
              input: 'checkbox',
              values: [{ value: 1, label: 'Multiple' },
              { value: 0, label: 'Single' }],
              optgroup: 'Slip',
          }, {
              id: 'betFold',
              field: 'betFold',
              label: 'betFold',
              type: 'integer',
              optgroup: 'Slip',
              validation: {
                  min: 0,
                  max: 2
              }
          }, {
              id: 'created',
              field: 'created',
              label: 'created',
              type: 'date',
              validation: {
                  format: 'yyyy-mm-dd hh:ii'
              },
              plugin: 'datetimepicker',
              plugin_config: {
                  format: 'yyyy-mm-dd hh:ii',
                  todayBtn: 'linked',
                  todayHighlight: true,
                  autoclose: true
              },
              optgroup: 'Slip',
          }, {
              id: 'placedOdds',
              field: 'placedOdds',
              label: 'placedOdds',
              type: 'integer',
              input: 'number',
              optgroup: 'Slip',
              validation: {
                  min: 0
              }
          }, {
              id: 'settledTs',
              field: 'settledTs',
              label: 'settledTs',
              type: 'date',
              validation: {
                  format: 'yyyy-mm-dd hh:ii'
              },
              plugin: 'datetimepicker',
              plugin_config: {
                  format: 'yyyy-mm-dd hh:ii',
                  todayBtn: 'linked',
                  todayHighlight: true,
                  autoclose: true
              },
              optgroup: 'Slip',
          }, {
              id: 'settledOdds',
              field: 'settledOdds',
              label: 'settledOdds',
              type: 'integer',
              input: 'number',
              optgroup: 'Slip',
              validation: {
                  min: 0
              }
          }, {
              id: 'status',
              field: 'status',
              label: 'status',
              type: 'integer',
              input: 'checkbox',
              optgroup: 'Slip',
              values: [{ value: 0, label: 'Lost' },
              { value: 1, label: 'Won' },
              { value: 2, label: 'Active' }],
          }, {
              id: 'stake',
              field: 'stake',
              label: 'stake',
              type: 'integer',
              input: 'number',
              optgroup: 'Slip',
              validation: {
                  min: 0
              }
          }, {
              id: 'winnings',
              field: 'winnings',
              label: 'winnings',
              type: 'integer',
              optgroup: 'Slip',
          },
          {
              id: 'playerDataId',
              field: 'id',
              label: 'id',
              type: 'integer',
              input: 'number',
              optgroup: 'player',
              validation: {
                  min: 0
              }
          }, {
              id: 'playerGender',
              field: 'gender',
              label: 'gender',
              type: 'string',
              input: 'checkbox',
              values: [
                  { value: 'M', label: 'M' },
                  { value: 'F', label: 'F' },
              ],
              optgroup: 'player',
          },
          {
              id: 'age',
              field: 'age',
              label: 'age',
              type: 'integer',
              validation: {
                  max: 3
              },
              optgroup: 'player',
          }, {
              id: 'country',
              field: 'country',
              label: 'country',
              type: 'string',
              optgroup: 'player',
          }, {
              id: 'registrationDate',
              field: 'registrationDate',
              label: 'registrationDate',
              type: 'date',
              validation: {
                  format: 'yyyy-mm-dd hh:ii'
              },
              plugin: 'datetimepicker',
              plugin_config: {
                  format: 'yyyy-mm-dd hh:ii',
                  todayBtn: 'linked',
                  todayHighlight: true,
                  autoclose: true,
                  minuteStep: 5
              },
              optgroup: 'player'
          }, {
              id: 'betId',
              field: 'betId',
              label: 'betId',
              type: 'integer',
              optgroup: 'betderived',
              validation: {
                  min: 0
              }
          }, {
              id: 'sportsId',
              field: 'sportsId',
              label: 'sportsId',
              type: 'integer',
              optgroup: 'betderived',
          }, {
              id: 'slipCreated',
              field: 'slipCreated',
              label: 'slipCreated',
              type: 'date',
              validation: {
                  format: 'yyyy-mm-dd hh:ii'
              },
              plugin: 'datetimepicker',
              plugin_config: {
                  format: 'yyyy-mm-dd hh:ii',
                  todayBtn: 'linked',
                  todayHighlight: true,
                  autoclose: true
              },
              optgroup: 'betderived',
          }, {
              id: 'slipId',
              field: 'slipId',
              label: 'slipId',
              type: 'integer',
              optgroup: 'betderived',
              validation: {
                  min: 0
              }
          }, {
              id: 'playerIdBet',
              field: 'playerId',
              label: 'playerId',
              type: 'integer',
              input: 'number',
              optgroup: 'betderived',
              validation: {
                  min: 0
              }
          }, {
              id: 'leagueId',
              field: 'leagueId',
              label: 'leagueId',
              type: 'integer',
              optgroup: 'betderived',
          }, {
              id: 'eventId',
              field: 'eventId',
              label: 'eventId',
              type: 'integer',
              optgroup: 'betderived',
          }, {
              id: 'isLiveBet1',
              field: 'isLiveBet',
              label: 'isLiveBet',
              type: 'string',
              input: 'checkbox',
              values: [{ value: '1', label: 'In-play' },
              { value: '0', label: 'Pre-event' }],
              optgroup: 'betderived',
          }, {
              id: 'isFreeBet1',
              field: 'isFreeBet',
              label: 'isFreeBet',
              type: 'string',
              input: 'checkbox',
              values: [{ value: '1', label: 'Free bet' },
              { value: '0', label: 'regular bet' }],
              optgroup: 'betderived',
          }, {
              id: 'isComboBet1',
              field: 'isComboBet',
              label: 'isComboBet',
              input: 'checkbox',
              values: [{ value: '1', label: 'Multiple' },
              { value: '0', label: 'Single' }],
              optgroup: 'betderived',
          },
          {
              id: 'betFold1',
              field: 'betFold',
              label: 'betFold',
              type: 'integer',
              optgroup: 'betderived',
              validation: {
                  min: 0,
                  max: 2
              }
          },
          {
              id: 'placedOdds1',
              field: 'placedOdds',
              label: 'placedOdds',
              type: 'integer',
              input: 'number',
              optgroup: 'betderived',
          },
          {
              id: 'settledTs1',
              field: 'settledTs',
              label: 'settledTs',
              type: 'date',
              validation: {
                  format: 'yyyy-mm-dd hh:ii'
              },
              plugin: 'datetimepicker',
              plugin_config: {
                  format: 'yyyy-mm-dd hh:ii',
                  todayBtn: 'linked',
                  todayHighlight: true,
                  autoclose: true
              },
              optgroup: 'betderived',
          }, {
              id: 'settledOdds1',
              field: 'settledOdds',
              label: 'settledOdds',
              type: 'integer',
              input: 'number',
              optgroup: 'betderived',
              validation: {
                  min: 0
              }
          }, {
              id: 'status1',
              field: 'status',
              label: 'status',
              type: 'string',
              optgroup: 'betderived',
              input: 'checkbox',
              values: [{ value: 0, label: 'Lost' },
              { value: 1, label: 'Won' },
              { value: 2, label: 'Active' }],
          }, {
              id: 'stake1',
              field: 'stake',
              label: 'stake',
              type: 'integer',
              input: 'number',
              optgroup: 'betderived',
              validation: {
                  min: 0
              }
          }, {
              id: 'turnover',
              field: 'turnover',
              label: 'turnover',
              type: 'integer',
              input: 'number',
              optgroup: 'betderived',
              validation: {
                  min: 0
              }
          },
          {
              id: 'winnings1',
              field: 'winnings',
              label: 'winnings',
              type: 'integer',
              input: 'number',
              optgroup: 'betderived',
              validation: {
                  min: 0
              }
          },
          {
              id: 'pl',
              field: 'pl',
              label: 'pl',
              type: 'integer',
              input: 'number',
              optgroup: 'betderived',
              validation: {
                  min: 0
              }
          },
          {
              id: 'avgOdds',
              field: 'avgOdds',
              label: 'avgOdds',
              type: 'integer',
              input: 'number',
              optgroup: 'betderived',
              validation: {
                  min: 0
              }
          },
          //{
          //    id: 'node',
          //    field: 'node',
          //    label: 'node',
          //    type: 'string',
          //    optgroup: 'multi_bet_claim',
          //},
          {
              id: 'sports',
              field: 'name',
              label: 'sportName',
              type: 'string',
              optgroup: 'sports',             
              plugin: 'selectize',
              plugin_config: {                 
                  valueField: 'name',
                  labelField: 'name',
                  searchField: 'name',
                  sortField: 'name',
                  create: true,                  
                  plugins: ['remove_button'],
                  onInitialize: function () {
                      var elem = $(this.$input[0]);
                      if (elem.length) {
                          elem.closest('.rule-value-container').css('min-width', '200px')
                              .find('.selectize-control').removeClass('form-control');
                      }
                      var that = this;                 
                      $.ajax({
                          beforeSend: function (request) {
                              request.setRequestHeader("x-api-key" , cookie);
                          },
                          dataType: "json",
                          url: 'https://betprop.uat.truewavetech.com/v1/config/sports',
                          success: function (resData) {                         
                              that.addOption(resData.data);
                          }
                      });
                      
                  },
                                  
              },
              valueSetter: function (rule, value) {                
                  rule.$el.find('.rule-value-container input')[0].selectize.setTextboxValue(value);                 
              }
          }, {
              id: 'leagueName',
              field: 'name',
              label: 'leagueName',
              type: 'string',             
              optgroup: 'league',             
              plugin: 'selectize',
              plugin_config: {
                  valueField: 'name',
                  labelField: 'name',
                  searchField: 'name',
                  sortField: 'name',
                  plugins: ['remove_button'],
                  delimiter: ',',
                  create: true,
                  option: [],                  
                  onInitialize: function () {
                      var elem = $(this.$input[0]);
                      if (elem.length) {
                          elem.closest('.rule-value-container').css('min-width', '200px')
                              .find('.selectize-control').removeClass('form-control');
                      }
                      var that = this;
                      $.ajax({
                          beforeSend: function (request) {
                              request.setRequestHeader("x-api-key", cookie);
                          },
                          dataType: "json",
                          url: 'https://betprop.uat.truewavetech.com/v1/config/leagues',
                          success: function (resData) {
                              that.addOption(resData.data);
                          }
                      });
                  },                 
              },
              valueSetter: function (rule, value) {                 
                  rule.$el.find('.rule-value-container input')[0].selectize.setTextboxValue(value);
              }
          }, {
              id: 'eventName',
              field: 'name',
              label: 'eventName',
              type: 'string',
              optgroup: 'event',             
              plugin: 'selectize',
              plugin_config: {
                  valueField: 'name',
                  labelField: 'name',
                  searchField: 'name',
                  sortField: 'name',
                  create: true,                
                  plugins: ['remove_button'],
                  load: function (query, callback) {                     
                      if (!query.length) return callback();
                      var elem = $(this.$input[0]);
                      if (elem.length) {
                          elem.closest('.rule-value-container').css('min-width', '200px')
                              .find('.selectize-control').removeClass('form-control');
                      }
                      if (query.length >= 3){
                      var that = this;
                      $.ajax({
                          beforeSend: function (request) {
                              request.setRequestHeader("x-api-key", cookie);
                          },
                          dataType: "json",
                          url: 'https://betprop.uat.truewavetech.com/v1/config/events?search=' + encodeURIComponent(query),
                          success: function (resData) {
                              that.addOption(resData.data);
                          }
                      });
                      }
                  },
                  valueSetter: function (rule, value) {
                      rule.$el.find('.rule-value-container input')[0].selectize.setTextboxValue(value);
                  }
              },
          }, {
              id: 'marketName',
              field: 'name',
              label: 'marketName',
              type: 'string',
              optgroup: 'market',             
              plugin: 'selectize',
              plugin_config: {
                  valueField: 'name',
                  labelField: 'name',
                  searchField: 'name',
                  sortField: 'name',
                  create: true,
                  option: [],
                  plugins: ['remove_button'],
                  onInitialize: function () {
                      var elem = $(this.$input[0]);
                      if (elem.length) {
                          elem.closest('.rule-value-container').css('min-width', '200px')
                              .find('.selectize-control').removeClass('form-control');
                      }
                      var that = this;
                      $.ajax({
                          beforeSend: function (request) {
                              request.setRequestHeader("x-api-key", cookie);
                          },
                          dataType: "json",
                          url: 'https://betprop.uat.truewavetech.com/v1/config/markets',
                          success: function (resData) {
                              that.addOption(resData.data);
                          }
                      });

                  },
                  valueSetter: function (rule, value) {
                      rule.$el.find('.rule-value-container input')[0].selectize.setTextboxValue(value);
                  }
              },
          }, {
              id: 'selectionsName',
              field: 'name',
              label: 'selectionsName',
              type: 'string',
              optgroup: 'selections',             
              plugin: 'selectize',
              plugin_config: {
                  valueField: 'name',
                  labelField: 'name',
                  searchField: 'name',
                  sortField: 'name',
                  create: true,                 
                  plugins: ['remove_button'],
                  load: function (query, callback) {
                      if (!query.length) return callback();
                      var elem = $(this.$input[0]);
                      if (elem.length) {
                          elem.closest('.rule-value-container').css('min-width', '200px')
                              .find('.selectize-control').removeClass('form-control');
                      }
                      if (query.length >= 3) {
                          var that = this;
                          $.ajax({
                              beforeSend: function (request) {
                                  request.setRequestHeader("x-api-key", cookie);
                              },
                              dataType: "json",
                              url: 'https://betprop.uat.truewavetech.com/v1/config/selections?search=' + encodeURIComponent(query),
                              success: function (resData) {
                                  that.addOption(resData.data);
                              }
                          });
                      }
                  },
                  valueSetter: function (rule, value) {
                      rule.$el.find('.rule-value-container input')[0].selectize.setTextboxValue(value);
                  }
              },
          }
          ]
      }
  }

  getSports() {
      this.betPropensityApi.getSportNames().subscribe(resData => {
          this.sports = resData.data;
      //    console.log(this.sports)
      })
  }

  setSportsArray() {
      return this.sports;
  }
}
