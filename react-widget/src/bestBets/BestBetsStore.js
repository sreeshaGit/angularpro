/*This file contains logics of bestBets*/
import { extendObservable } from 'mobx';
import superagent from 'superagent';
import ENV from '../common/environment.json';
// import { apiCaller } from '../common/apiStore';
import { removeBet, findLanguage} from '../common/commonFunctions';
import OddsConversion from '../common/oddsConversion';

class BestBetsStore {
    constructor() {
        extendObservable(this, {
            errorMessage: false,
            filterLeagueData: [],
            filterMarketData: [],
            showBetsData: [],
            inputValue: '',
            isBestBets: false,
            isAddClass: false,
            leagueId: 0,
            marketId: 0,
            noDataErrorMessage: false,
            oddsMultiply: 1,
            returns: '',
            stakeError: false,
            totalBets: [],
            top5BetsId: [],
            bestBetsArray: [],
            slectedBets: []

        });
    }
    /**
     *  This function is used to accquire data from the service.
    */
    getBestBetsData() {
        const url = ENV.serviceURL + 'LeaguesandMarkets/Football/FootballService.svc/GetLeaguesAndMarkets' + '?' + 'lang=' + findLanguage();
        superagent
            .get(url)
            .query(null)
            .set('Accept', 'application/json')
            .end((error, response) => {
                const result = response.body
                if (result.length <= 0 || result === null || result === '') {
                    return;
                } else {
                    this.filterLeagueData = result[0].Leagues;
                    this.filterMarketData = result[0].Markets;
                }
            })

        //var promise = apiCaller(url, 'GET', '');
        //promise.then((result) => {
        //    console.log("api caller===", result);
        //})
    }
    /**
     * This function is used to display bets based on filter selection.
     */
    getFilterData(store, fil) {
        let dataurl = ENV.serviceURL + 'Bestbets/Football/FootballService.svc/GetDailyBestbets' + '?' + 'leagueGroupID=' + this.leagueId + '&' + 'marketID=' + this.marketId + '&' + 'lang=' + findLanguage() + '&' + 'ProviderId=' + ENV.fbProviderId;
        superagent
            .get(dataurl)
            .query(null)
            .set('Accept', 'application/json')
            .end((error, response) => {
                if (response !== null) {
                    const bestBetsResult = response.body
                    if (bestBetsResult === null || bestBetsResult === '' || bestBetsResult.Bestbets === null) {
                        if (fil == "filter") {
                            this.noDataErrorMessage = true;
                        } else {
                            this.noDataErrorMessage = true;
                            store.hideBestBets = true;
                            store.lookCarouselNames();
                            return;
                        }
                    } else if (bestBetsResult.Bestbets instanceof Array && bestBetsResult.Bestbets.length <= 0) {
                        if (fil == "filter") {
                            this.noDataErrorMessage = true;
                        } else {
                            this.noDataErrorMessage = true;
                            store.hideBestBets = true;
                            store.lookCarouselNames();
                            return;
                        }
                    } else if (bestBetsResult.Bestbets instanceof Array && bestBetsResult.Bestbets.length > 0) {
                        let getBestBets = [];
                        this.oddsMultiply = 1;
                        this.noDataErrorMessage = false;
                        store.hideBestBets = false;
                        store.lookCarouselNames();
                        for (var i = 0; i < bestBetsResult.Bestbets.length; i++) {
                            bestBetsResult.Bestbets[i]['isAddedBet'] = false;
                            bestBetsResult.Bestbets[i]['isRemoved'] = false;
                            bestBetsResult.Bestbets[i]['isNextBet'] = false;
                            bestBetsResult.Bestbets[i]['isRemoveDat'] = '';
                            bestBetsResult.Bestbets[i]['fractional'] = OddsConversion.oddsConversionDecimalToFractional(bestBetsResult.Bestbets[i]['odds']);
                            bestBetsResult.Bestbets[i]['american'] = OddsConversion.oddsConversionDecimalToAmerican(bestBetsResult.Bestbets[i]['odds']);
                            bestBetsResult.Bestbets[i]['hongKong'] = OddsConversion.oddsConversionDecimalToHongKong(bestBetsResult.Bestbets[i]['odds']);
                            bestBetsResult.Bestbets[i]['indonesian'] = OddsConversion.oddsConversionDecimalToIndonesian(bestBetsResult.Bestbets[i]['odds']);
                            bestBetsResult.Bestbets[i]['malay'] = OddsConversion.oddsConversionDecimalToMalay(bestBetsResult.Bestbets[i]['odds']);
                        }
                        this.showBetsData = getBestBets;
                        this.totalBets = [],
                        this.totalBets = bestBetsResult.Bestbets;
                        if (this.totalBets.length <= 5) {
                            this.isBestBets = true;
                        } else {
                            this.isBestBets = false;
                        }
                        var top5BetsId = [];
                        for (let i = 0; i < this.totalBets.length; i++) {
                            let isSameMatch_totalBets = false;
                            if (this.totalBets[i] && this.showBetsData.length < 5) {
                                for (let t = 0; t < this.showBetsData.length; t++) {
                                    if (this.showBetsData[t]["MEID"] === this.totalBets[i]["MEID"]) {
                                        isSameMatch_totalBets = true;
                                    }
                                }
                                if (!isSameMatch_totalBets) {
                                    this.showBetsData[this.showBetsData.length] = this.totalBets[i];
                                    top5BetsId[top5BetsId.length] = this.totalBets[i]["MEID"]
                                }
                            } else {
                                break;
                            }
                        }
                        this.top5BetsId = top5BetsId;
                    }
                }
            })

    }
    /**
     * This function is used to get LeagueId
     * @param {val} event it reserve LeagueId
    */
    getLeagueId(val, store) {
        this.leagueId = val;
        this.getFilterData(store, "filter");
    }
    /**
     * This function is used to get MarketId
     * @param {val} event it reserve MarketId
    */
    getMarketId(val, store) {
        this.marketId = val;
        this.getFilterData(store, "filter");
    }
    /**
     * This function is used to remove bet from betReplacement
     * @param {val} MEID
     * @param {val} index
    */
    removeBets(MEID, index) {
        let element = document.getElementById("bb_" + index);
        if (element.classList.contains('active')) {
            element.className -= " active";
            element.className += " BLSBT-btn-marketOdds";
        }
        let removeBetParams = {
            totalBets: this.totalBets,
            showBetsData: this.showBetsData,
            top5BetsId: this.top5BetsId,
            MEID: MEID,
            index: index,
            id: "bestBets"
        };
        var oddsMul = removeBet(removeBetParams);
        this.oddsMultiply = oddsMul;
    }
}

export default BestBetsStore;
