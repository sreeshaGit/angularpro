/**
 * @fileoverview contains http methods which gets data from link.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { KambiService } from '../Kambi/Kambi.service';
import { environment } from '../../environments/environment';

@Injectable()
export class BettorLogicApiService {
    /**
     * @constructor
     * @param {Http} http - instance of Http service.
     * @param {KambiService} kambiService - instance of KambiService to access kambi methods.
     */
    constructor(private http: Http, private kambiService: KambiService) { }
    /**
     * gets data from url
     */
    getLiveLogicBestBets() {
        return this.http.get(environment.baseUrl +
            '/stats/Services/FootballService.svc/GetLivelogicBestbets?lang=' +
            this.kambiService.language)
            .map((res: Response) => res.json());
    }
    /**
     * This method is used to get all race course data for horse finder.
     */
    getRaceCourseData() {
        return this.http.get(environment.baseUrl +
            '/HorseRacing/HorseRaceService.svc/getallmrgreenracecourses')
            .map((res: Response) => res.json());
    }
    /**
     * gets Filters data from service
     */
    getLeagueMarketFilterData() {
        const lang = 'lang=' + this.kambiService.language;
        return this.http.get(environment.baseUrl + '/stats/Services/FootballService.svc/GetLeaguesAndMarkets' + '?' + lang)
            .map((res: Response) => res.json());
    }
    /**
     * gets betsbets data from service
     * @param {any} leagueId of the league selected.
     * @param {any} marketId of the market selected.
     */
    getBestBetsData(leagueId, marketId) {
        const lang = 'lang=' + this.kambiService.language;
        const serviceParams = '?' + 'leagueID=' + leagueId + '&' + 'marketID=' + marketId + '&' + lang;
        return this.http.get(environment.baseUrl + '/stats/Services/FootballService.svc/GetNewDailyBestbets' + serviceParams)
            .map((res: Response) => res.json());
    }
    /**
     * This method is used to get all horses data based on filters for horse finder.
     * @param {any} selectedOptions - this variable contain selected filters.
     * @param {any} slideValue - this variable contain selected odds values from odds slider.
     * @param {any} slideValue - this variable contain selected race courses names.
     */
    getHorseData(selectedOptions, slideValue, races) {
        return this.http.get(environment.baseUrl +
            '/HorseRacing/HorseRaceService.svc/GetMrGreenHorsesInformationBasedOnFilterv3/' +
            selectedOptions + '/' + slideValue + '/' + races + '/0')
            .map((res: Response) => res.json());
    }
    /**
     * This method is used to get all the filter data.
     */
    getFilterData() {
        return this.http.get(environment.baseUrl +
            '/HorseRacing/HorseRaceService.svc/GetAllTimeformCategories_mrgreen')
            .map((res: Response) => res.json());
    }
    /**
     * This method is used to get slider values for horse finder odds slider.
     */
    getSliderData() {
        return this.http.get('assets/js/hf-slider.json')
            .map((res: Response) => res.json());
    }
    /**
     * gets Multibetdata from service using stack and win as input parameter
     * @param {number} stake  it holds stakeAmount value
     * @param {number} win   it holds winAmount value
     */
    getMultiBetData(stake, win) {
        const serviceParams = '?' + 'stake=' + stake + '&' + 'win=' + win + '&' + 'lang=' + this.kambiService.language;
        return this.http.get(environment.baseUrl + '/multibet/MrGreenService.svc/GetMyMultiBetsJson' + serviceParams)
            .map((res: Response) => res.json());
    }
    /**
     *  This function refers to get the swapedBet from service using match id and multiGroupId as parameter
     * @param {number} matchId- it refers match id
     * @param {number} multiGroupId - it refers multiGroupId
     */
    getSwapedBet(matchId, multiGroupId) {
        const serviceParams = '?' + 'ExcludeMatches=' + matchId + '&' + 'multiGroupId=' + multiGroupId +
            '&' + 'lang=' + this.kambiService.language;
        return this.http.get(environment.baseUrl + '/multibet/MrGreenService.svc/GetReplaceBet' + serviceParams)
            .map((res: Response) => res.json());
    }
    /**
     * This function returns data of pre combi spin.
     */
    getSoccerPreBets() {
      //  return this.http.get(environment.baseUrl + '/Soccerspin/SoccerspinService.svc/GetPreMatchSoccerSpin')
        return this.http.get('http://qamrgreen.bettorlogic.com/Spins/SoccerspinService.svc/GetPreMatchSoccerSpin')
            .map((res: Response) => res.json());
    }
    /**
     * This function returns of live combi spin data
     */
    getSoccerLiveBets() {
        return this.http.get(environment.baseUrl + '/Soccerspin/SoccerspinService.svc/GetSoccerspinOdds')
            .map((res: Response) => res.json());
    }
    /**
     * gets RightNow data from service
     */
    getRightNowData() {
        return this.http.get(environment.baseUrl + '/LiveLogic/Services/FootballService.svc/GetCommonLivelogic'
            + '?' + 'lang=' + this.kambiService.language)
            .map((res: Response) => res.json());
    }
    /**
     * gets banner data from service
     * @param {number} - userId this is used to get data based on the banner user settings.
     */
    getBannerData(userId) {
          return this.http.get(environment.baseUrl + '/BannerService/v4/Rules/Services/BannerService.svc/getbannerstats/'
            + '?userId=' + userId + '&country=' + this.kambiService.country + '&' + 'language=' + this.kambiService.language)
            .map((res: Response) => res.json());
    }
    /**
     * gets banner data from service
     * @param {number} - userId this is used to get data based on the banner user settings.
     */
    getBannerDataOnPriority(userId) {
        // return this.http.get(environment.baseUrl + '/BannerService/v4/Rules/Services/BannerService.svc/getbannerstats/'
        return this.http.get('http://qabanners.bettorlogic.com/Services/Services/BannerService.svc/getbannerstats/'
            + '?userId=' + userId + '&country=' + this.kambiService.country + '&' + 'language=' + this.kambiService.language)
            .map((res: Response) => res.json());
    }
    /**
     * gets match of the day data from service
     */
    getMatchOfTheDay() {
        return this.http.get(environment.baseUrl + '/stats/Services/FootballService.svc/GetMODCommonBestBets'
            + '?' + 'lang=' + this.kambiService.language)
            .map((res: Response) => res.json());
    }
    /**
     * gets carousel data from service
     */
    getCarouselData() {
        return this.http.get('http://qamrgreen.bettorlogic.com/Carousel/Services/TennisService.svc/getCarousal'
       // return this.http.get(environment.baseUrl + '/Carousal/Services/TennisService.svc/getcarousal'
            + '?' + 'region=' + this.kambiService.country + '&lang=' + this.kambiService.language)
            .map((res: Response) => res.json());
    }

    /**
     * This function gets data from service.
     */
    getStaticData() {
      //  return this.http.get(environment.baseUrl + '/StaticData/V2/Services/FootballService.svc/GetFTPStaticDataByLanguage'
        return this.http.get('http://qamrgreen.bettorlogic.com/StaticData/Services/FootballService.svc/GetFTPStaticDataByLanguage'
            + '?' + 'lang=' + this.kambiService.language)
            .map((res: Response) => res.json());
    }
    /**
     * gets today assist data from service.
     */
    getTodaysAssists() {
        return this.http.get(
            environment.baseUrl +
            '/TodaysAssists/Services/TodaysAssistService.svc/GetTodaysAssitsbets?lang=' + this.kambiService.language)
     //   return this.http.get('http://qamrgreen.bettorlogic.com/TodaysAssist/Services/TodaysAssistService.svc/GetTodaysAssitsbets?lang=' + this.kambiService.language)
            .map((res: Response) => res.json());
    }
    /**
     * gets upcoming data from service.
     */
    getUpcomingMatches() {
        return this.http.get(environment.baseUrl +
            '/CommonRTB/Services/FootballService.svc/GetCommonBestBets?lang=' +
            this.kambiService.language)
            .map((res: Response) => res.json());
    }
    /**
     * This method used to get the tennis best bets.
     */
    getTennisBestBets() {
        return this.http.get('http://qamrgreen.bettorlogic.com/TennisBestbets/Services/TennisService.svc/getMrgreenBestbets?lang=' +
            this.kambiService.language)
            .map((res: Response) => res.json());
    }
    /**
     * This function used to gets live logic for tennis from service.
     */
    getTennisLiveLogic() {
        return this.http.get('http://qamrgreen.bettorlogic.com/TennisLivebets/Services/TennisService.svc/getMG_TennisLivebets?lang=' +
            this.kambiService.language)
            .map((res: Response) => res.json());
    }
    /**
     * This function returns data of ice hockey pre spin.
     */
    getIceHockeyPreBets() {
        return this.http.get('http://qamrgreen.bettorlogic.com/IcehockeySpin/Services/SpinsService.svc/prespin?sportid=1'
            + '&' + 'lang=' + this.kambiService.language)
            .map((res: Response) => res.json());
    }
}
