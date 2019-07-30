import { extendObservable } from 'mobx';
import superagent from 'superagent';
import OddsConversion from '../common/oddsConversion';
import { findLanguage } from '../common/commonFunctions';
import ENV from '../common/environment.json';


var BetSlipUtil;
class FootballLiveBetsStore {
    constructor() {
        extendObservable(this, {
            errorMessage: false,
            filterLeagueData : [],
            filterMarketData: [],
            filterClick: false,
            getBetsData: [],
            hideData: false,
            hideCarousel: true,
            isLoader: true,
            leagueId: 21,
            marketId: 0,
            inputValue:'',
            noDataErrorMessage: false,
            oddsMultiply : 1,
            returns: '',
            showFilterData: false,
            stakeError: false,
            totalBets: [],
            top5betsid: [],
            isBestBets:false,
            leagueName:'',
            slectedBets: []
        });
    }



    getLiveBetsData(store){
        const LiveBetsurl = ENV.serviceURL + 'LiveBestBets/Football/FootballService.svc/GetLiveLogicBestbet' + '?' + 'ProviderId=' + ENV.fbProviderId + '&' + 'lang=' + findLanguage();
        //const LiveBetsurl = 'http://192.168.2.136/SBTech/LiveBets/Football/FootballService.svc/GetLiveLogicBestbet?providerid=50';
            superagent
              .get(LiveBetsurl)
              .query(null)
              .set('Accept', 'application/json')
              .end((error, response) => {
                  const LiveBetsresult = response.body
                  if (LiveBetsresult === null || LiveBetsresult === '' || LiveBetsresult.lstLiveBets === null || LiveBetsresult.lstLiveBets instanceof Array && LiveBetsresult.lstLiveBets.length === 0) {
                      this.filterClick = false;
                      this.noDataErrorMessage = true;
                      store.hideLiveBets = true;
                  }
                  if (LiveBetsresult.lstLiveBets instanceof Array && LiveBetsresult.lstLiveBets.length > 0) {
                      this.noDataErrorMessage = false;
                      for (var i = 0; i < LiveBetsresult.lstLiveBets.length; i++) {
                          LiveBetsresult.lstLiveBets[i]['isAddedBet'] = false;
                          LiveBetsresult.lstLiveBets[i]['isremoved'] = false;
                          LiveBetsresult.lstLiveBets[i]['isnextbet'] = false;
                          LiveBetsresult.lstLiveBets[i]['isremovedat'] = '';
                          LiveBetsresult.lstLiveBets[i]['fractional'] = OddsConversion.oddsConversionDecimalToFractional(LiveBetsresult.lstLiveBets[i]['odds']);
                          LiveBetsresult.lstLiveBets[i]['american'] = OddsConversion.oddsConversionDecimalToAmerican(LiveBetsresult.lstLiveBets[i]['odds']);
                          LiveBetsresult.lstLiveBets[i]['hongKong'] = OddsConversion.oddsConversionDecimalToHongKong(LiveBetsresult.lstLiveBets[i]['odds']);
                          LiveBetsresult.lstLiveBets[i]['indonesian'] = OddsConversion.oddsConversionDecimalToIndonesian(LiveBetsresult.lstLiveBets[i]['odds']);
                          LiveBetsresult.lstLiveBets[i]['malay'] = OddsConversion.oddsConversionDecimalToMalay(LiveBetsresult.lstLiveBets[i]['odds']);
                      }
                      this.getBetsData = LiveBetsresult.lstLiveBets;
                      this.errorMessage = false;
                      this.isLoader = false;
                      store.hideLiveBets = false;
                  } else if (LiveBetsresult.lstLiveBets instanceof Array && LiveBetsresult.lstLiveBets.length <= 0) {
                      this.noDataErrorMessage = true;
                      store.hideLiveBets = true;
                  }
              })
    }
    /**
     * This method is used to add all bets at a time
     * @param {item} data
     */
    addAllToBetslip() {
        for (let i = 0; i < this.getBetsData.length; i++) {
            var item = this.getBetsData[i];
            if (window.BetSlipUtil) {
                window.BetSlipUtil.addOddToSlip(item.MEID, item.eventId, item.lineID, item.odds, item.lineGroupID, item.lineTypeID, item.rowTypeID, item.points, item.isLive, item.isQA, item.marketId, item.sbLeagueId, item.betId);
            }
            var betInd = this.slectedBets.indexOf(this.getBetsData[i].lineID);

                if (betInd != -1) {
                    this.slectedBets.splice(betInd, 1);
                } else {
                    this.slectedBets.push(this.getBetsData[i].lineID)
                }
        }
    }
}
export default FootballLiveBetsStore;
