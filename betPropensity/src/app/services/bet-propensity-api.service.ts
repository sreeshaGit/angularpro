/*
 * This service used to call all the APIs. 
 */
import { Injectable } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, } from '@angular/common/http';
import { HttpInterceptorService } from "./http-interceptor.service";
import { CookieService } from 'ngx-cookie-service';
import { apiConfigurations } from '../config/end-point-config.service';

@Injectable()
export class BetPropensityApiService {
    cookieToken = '';
    baseApiLink = apiConfigurations.baseUrl;
    constructor(private http: HttpClient, private cookieService: CookieService) {
        this.cookieToken = this.cookieService.get('Token');      
    }
    /**
     * This function used to login the user to app.
     * @param userDetails
     */
    getLogin(userDetails) {   
        return this.http.post<any>(`${this.baseApiLink}/v1/auth/login`, userDetails);           
    }
    /**
     * This function used to create account with givendetails to service.
     * @param accountInfo
     */
    createAccount(accountInfo) {
        return this.http.post<any>(`${this.baseApiLink}/v1/account/create`, accountInfo);  
    }
    /**
     * This function used to create query from service.
     * @param data
     */
    createQuery(data) {               
        return this.http.post<any>(`${this.baseApiLink}/v1/query`, data);  
    }
    /**
     * This function used to get queries list from service.
     */
    getQueriesList(){    
        return this.http.get<any>(`${this.baseApiLink}/v1/query`);
    }
    /**
     * This function used to execute the query.
     * @param data
     */
    executeQuery(data) {             
        let jsonData = {
            "querySQL": data.querySQL,
            "tables": data.tables,            
            "aggregationSpec": data.aggregationSpec,
            "groupBy": data.groupBy,
            "queryJSON": data.queryJSON,
            "outputColumns": data.outputColumns
        }
        return this.http.post<any>(`${this.baseApiLink}/v1/query/aggregate` + '?limit=' + data.limit + '&' + 'page=' + data.page, jsonData);
    }
    /**
     * This function used to execute the query with Query ID.
     * @param data
     */
    executeQueryWithId(data) {                   
        return this.http.get<any>(`${this.baseApiLink}/v1/query/execute/` + data.id + '?limit=' + data.limit +'&'+ 'page=' + data.page);      
    }
    /**
     * This function used to get query details with ID.
     * @param Id
     */
    getQueryDetails(Id) {       
        return this.http.get<any>(`${this.baseApiLink}/v1/query/`+ Id);
    }
    /**
     * This function used to logout the user from app.
     */
    logout() {
        return this.http.post<any>(`${this.baseApiLink}/v1/auth/logout`,'');
    }
    /**
     * This function used to delete the query.
     * @param Id
     */
    removeQuery(Id){      
        return this.http.delete<any>(`${this.baseApiLink}/v1/query/`+ Id);
    }
    /**
     * This function used to update the query.
     * @param Id
     * @param jsonData
     */
    updateQuery(Id,jsonData){       
        return this.http.put<any>(`${this.baseApiLink}/v1/query/`+ Id, jsonData);
    }
    /**
     * This function used to get attributes list.
     */
    getAttributesList() {        
        return this.http.get<any>(`${this.baseApiLink}/v1/query/supportedAttributes`);
    }
    /**
     * This function used to get all sports names data.
     */
    getSportNames() {       
        return this.http.get<any>(`${this.baseApiLink}/v1/config/sports`);
    }
    /**
     * This function used to get all countries data.
     */
    getCountries() {       
        return this.http.get<any>(`${this.baseApiLink}/v1/config/countries`);
    }
    /**
     * This function used to get bet fold data.
     */
    getBetFold() {      
        return this.http.get<any>(`${this.baseApiLink}/v1/config/betfold`);
    }
    /**
     * This function used to get leaguename details.
     * @param text
     * @param sportId
     */
    getLeagueName(text,sportId) {      
        return this.http.get<any>(`${this.baseApiLink}/v1/config/leagues?search=`+ text + '&' + 'sport=' + sportId);
    }
    /**
     * This function used to get eventname details.
     * @param text
     * @param sportId
     */
    getEventName(text,sportId) {       
        return this.http.get<any>(`${this.baseApiLink}/v1/config/events?search=` + text + '&' + 'sport=' + sportId);
    }
    /**
     * This function used to get marketname details.
     * @param text
     * @param sportId
     */
    getMarketName(text, sportId) {       
        return this.http.get<any>(`${this.baseApiLink}/v1/config/markets?search=` + text + '&' + 'sport=' + sportId);
    }
    /**
     * This function used to get the frequency data.
     */
    getFrequency() {      
        return this.http.get<any>(`${this.baseApiLink}/v1/config/frequency`);
    }
    /**
     * This function used to get output data.
     */
    getOutputData() {     
        return this.http.get<any>(`${this.baseApiLink}/v1/config/outputdata`);
    }
    /**
     * This function used to get output by data.
     */
    getOutputBy() {        
        return this.http.get<any>(`${this.baseApiLink}/v1/config/outputby`);
    }
    /**
     * This function used to get bet status data from service.
     */
    getBetStatus() {       
        return this.http.get<any>(`${this.baseApiLink}/v1/config/betstatus`);
    }
    /**
     * This function used to get time period data.
     */
    getPeriodData() {       
        return this.http.get<any>(`${this.baseApiLink}/v1/config/period`);
    }
    /**
     * This function used to get odds band data.
     */
    getOddsBand() {       
        return this.http.get<any>(`${this.baseApiLink}/v1/config/odds/band`);
    }
    /**
     * This function used to get odds range.
     */
    getOddsRange() {       
        return this.http.get<any>(`${this.baseApiLink}/v1/config/odds/range`);
    }
    /**
     * This function used to get stake range.
     */
    getStakeRange() {      
        return this.http.get<any>(`${this.baseApiLink}/v1/config/stake/range`);
    }
    /**
     * This function used to get bet type data.
     */
    getBetType() {       
        return this.http.get<any>(`${this.baseApiLink}/v1/config/bettype`);
    }
    /**
     * This function used to profile period data.
     */
    getProfilePeriodData() {       
        return this.http.get<any>(`${this.baseApiLink}/v1/config/playerprofileperiod`);
    }
    /**
     * This function used to get player type.
     */
    getPlayerType() {       
        return this.http.get<any>(`${this.baseApiLink}/v1/config/playerprofiletype`);
    }
    /**
     * This function used to get reports result data.
     * @param data
     */
    getReportResult(data) {              
        let jsonData = {
            "top": data.top,
            "outputColumns": data.outputColumns,
            "outputData": data.outputData,
            "queryJSON": data.queryJSON,
        }
        return this.http.post<any>(`${this.baseApiLink}/v1/query/aggregateTop` + '?limit=' + data.limit + '&' + 'page=' + data.page, jsonData);
    }
    /**
     * This function used to get reports list.
     */
    getReportList() {       
        return this.http.get<any>(`${this.baseApiLink}/v1/report`);
    }
    /**
     * This function used to delete report from the service.
     * @param Id
     */
    removeReport(Id) {        
        return this.http.delete<any>(`${this.baseApiLink}/v1/report/` + Id);
    }
    /**
     * This function used to create report.
     * @param data
     */
    createReport(data) {       
        return this.http.post<any>(`${this.baseApiLink}/v1/report`, data);
    }
    /**
     * This function used execute report with its ID.
     * @param data
     */
    executeReportWithId(data) {
        return this.http.get<any>(`${this.baseApiLink}/v1/report/execute/` +  data.id + '?limit=' + data.limit + '&' + 'page=' + data.page);
    }
    /**
     * This function used to get report details.
     * @param Id
     */
    getReportDetails(Id) {
        return this.http.get<any>(`${this.baseApiLink}/v1/report/` + Id);
    }
    /**
     * This function used to update reports data.
     * @param data
     * @param Id
     */
    updateReport(data,Id) {       
        return this.http.put<any>(`${this.baseApiLink}/v1/report/`+ Id,data);
    }
    /**
     * This function used to Compatible reports list.
     * @param Id
     */
    getReportCompatible(Id) {        
        return this.http.get<any>(`${this.baseApiLink}/v1/report/compatible/` + Id);
    }
    /**
     * This function used to get compare type reports list.
     * @param data
     */
    getReportsCompare(data) {       
        return this.http.post<any>(`${this.baseApiLink}/v1/report/compare`, data);
    }
    /**
     * This function used to get player profile reports data.
     * @param data
     */
    getPlayerProfileReport(data) {        
        return this.http.post<any>(`${this.baseApiLink}/v1/playerprofile/preview`, data);
    }
    /**
     * This function used to save player profile data.
     * @param data
     */
    savePlayerProfile(data) {       
        return this.http.post<any>(`${this.baseApiLink}/v1/playerprofile`, data);
    }
    /**
     * This function used to execute player profile report based on ID.
     * @param Id
     * @param limit
     * @param page
     */
    executePlayerProfReport(Id, limit, page) {       
        return this.http.get<any>(`${this.baseApiLink}/v1/playerprofile/report/execute/` + Id+'?limit=' + limit + '&' + 'page=' + page);
    }
    /**
     * This function used to delete player profiles by there IDs.
     * @param Id
     */
    deletePlayerProfile(Id) {       
        return this.http.delete<any>(`${this.baseApiLink}/v1/playerprofile/report/` + Id);
    }
    /**
     * This function used to export player profile data based on IDs.
     * @param Id
     */
    exportPlayerProfile(Id) {        
        return this.http.get<any>(`${this.baseApiLink}/v1/playerprofile/report/export/` + Id);
    }
    /**
     * This service used to get player profile list.
     */
    getPlayerProfilesList() {        
        return this.http.get<any>(`${this.baseApiLink}/v1/playerprofile`);
    }
  /**
   * This function used to get the player profile data.
   * @param previewId
   * @param page
   * @param limit
   */
    playerProfilePreviewPaging(previewId,page,limit) {       
        return this.http.get<any>(`${this.baseApiLink}/v1/playerprofile/preview_paging?` + 'previewId=' + previewId + '&' + 'page=' + page + '&' +'limit=' + limit);
    }
  /**
    * This function used to get player profile reports details.
    * @param Id
    */
  getPlayerProfileReportDetails(Id) {            
      return this.http.get<any>(`${this.baseApiLink}/v1/playerprofile/report/` + Id);
  }
  /**
   * This function used to update the player profile reports.
   * @param Id
   * @param jsonData
   */
    updatePlayerProfile(Id, jsonData) {       
        return this.http.put<any>(`${this.baseApiLink}/v1/playerprofile/` + Id, jsonData);
    }
    /**
     * This function used to get player summary based on player ID.
     * @param Id
     */
    getPlayerSummary(Id) {        
        return this.http.get<any>(`${this.baseApiLink}/v1/playerprofile/` + Id);
    }
  /**
   * This function used to get reports columns data.
   */
    getReportColumns() {        
        return this.http.get<any>(`${this.baseApiLink}/v1/config/report-columns`);
    }
    /**
     * This function used to get profile columns data.
     */
    getPlayerProfileColumns() {        
        return this.http.get<any>(`${this.baseApiLink}/v1/config/player-profile-columns`);
    }
    /**
     * This function used to get Profile data in csv format from service.
     * @param playerId
     */
    getProfileCsvData(playerId) {        
        return this.http.get(`${this.baseApiLink}/v1/playerprofile/raw_data/${playerId}`, { responseType: 'text'});
    }
    /**
     * This function used to get the dashboard list.
     */
    getDashboardList() {       
        return this.http.get<any>(`${this.baseApiLink}/v1/dashboard`);
    }
    /**
     * This function used to create dashboards.
     * @param data
     */
    createDashboard(data) {       
        return this.http.post<any>(`${this.baseApiLink}/v1/dashboard`, data);
    }
    /**
     * This function gets the details of dashboards to display.
     */
    dashboardDisplayTypes() {      
        return this.http.get<any>(`${this.baseApiLink}/v1/config/dashboard/displaytypes`);
    }
    /**
     * This function used to delete dashboard with its ID.
     * @param id
     */
    deleteDashboard(id) {        
        return this.http.delete<any>(`${this.baseApiLink}/v1/dashboard/` + id);
    }
    /**
     * This method used to get dashboard details.
     * @param id
     */
    getDashboardDetails(id) {        
        return this.http.get<any>(`${this.baseApiLink}/v1/dashboard/` + id);
    }
    /**
     * This function used to update the dashboard.
     * @param Id - dashboard Id.
     * @param jsonData - data to update.
     */
    updateDashboard(Id, jsonData) {       
        return this.http.put<any>(`${this.baseApiLink}/v1/dashboard/` + Id, jsonData);
    }
} 
