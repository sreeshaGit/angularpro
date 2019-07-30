/*This file contains logics of popularBets */
import { extendObservable } from 'mobx';
import superagent from 'superagent';
import ENV from '../common/environment.json';
import { removeBet, findLanguage } from '../common/commonFunctions.js';
import OddsConversion from '../common/oddsConversion';

class PopularBetsStore {
    constructor() {
        extendObservable(this, {
            errorMessage: false,
            getPopularData: [],
            isPopularBets: false,
            inputValue: '',
            noDataErrorMessage: false,
            oddsMultiply: 1,
            popular5betsid: [],
            returns: '',
            showFilterData: false,
            stakeError: false,
            totalBets: [],
            slectedBets: []
        });
    }
    /**
     * This function is used to accquire data from the service.
    */
    getPopularBetsData(store) {
        const popularBetsUrl = ENV.serviceURL + 'PopularBets/Football/FootballService.svc/GetPopularbets' + '?' + 'lang=' + findLanguage() + '&' + 'ProviderId=' + ENV.fbProviderId;
        superagent
            .get(popularBetsUrl)
            .query(null)
            .set('Accept', 'application/json')
            .end((error, response) => {
                if (response !== null) {
                    const popularBetsResult = response.body
                    if (popularBetsResult === null || popularBetsResult === '' || popularBetsResult.bestbets === null) {
                        this.noDataErrorMessage = true;
                        store.hidePopularBets = true;
                        store.lookCarouselNames();
                    } else if (popularBetsResult.bestbets instanceof Array && popularBetsResult.bestbets.length <= 0) {
                        this.noDataErrorMessage = true;
                        store.hidePopularBets = true;
                        store.lookCarouselNames();
                    }
                    else if (popularBetsResult.bestbets instanceof Array && popularBetsResult.bestbets.length > 0) {
                        let getPopularBets = [];
                        this.oddsMultiply = 1;
                        this.noDataErrorMessage = false;
                        store.hidePopularBets = false;
                        store.lookCarouselNames();
                        for (var i = 0; i < popularBetsResult.bestbets.length; i++) {
                            popularBetsResult.bestbets[i]['isAddedBet'] = false;
                            popularBetsResult.bestbets[i]['isRemoved'] = false;
                            popularBetsResult.bestbets[i]['isNextBet'] = false;
                            popularBetsResult.bestbets[i]['isRemoveDat'] = '';
                            popularBetsResult.bestbets[i]['fractional'] = OddsConversion.oddsConversionDecimalToFractional(popularBetsResult.bestbets[i]['odds']);
                            popularBetsResult.bestbets[i]['american'] = OddsConversion.oddsConversionDecimalToAmerican(popularBetsResult.bestbets[i]['odds']);
                            popularBetsResult.bestbets[i]['hongKong'] = OddsConversion.oddsConversionDecimalToHongKong(popularBetsResult.bestbets[i]['odds']);
                            popularBetsResult.bestbets[i]['indonesian'] = OddsConversion.oddsConversionDecimalToIndonesian(popularBetsResult.bestbets[i]['odds']);
                            popularBetsResult.bestbets[i]['malay'] = OddsConversion.oddsConversionDecimalToMalay(popularBetsResult.bestbets[i]['odds']);
                        }
                        this.getPopularData = getPopularBets;
                        this.totalBets = popularBetsResult.bestbets;
                        if (this.totalBets.length <= 5) {
                            this.isPopularBets = true;
                        } else {
                            this.isPopularBets = false;
                        }
                        var popular5betsid = [];
                        for (let i = 0; i < this.totalBets.length; i++) {
                            let isSameMatch_totalBets = false;
                            if (this.totalBets[i] && this.getPopularData.length < 5) {
                                for (let t = 0; t < this.getPopularData.length; t++) {
                                    if (this.getPopularData[t]["MEID"] === this.totalBets[i]["MEID"]) {
                                        isSameMatch_totalBets = true;
                                    }
                                }
                                if (!isSameMatch_totalBets) {
                                    this.getPopularData[this.getPopularData.length] = this.totalBets[i];
                                    popular5betsid[popular5betsid.length] = this.totalBets[i]["MEID"]
                                }
                            } else {
                                break;
                            }
                        }
                        this.popular5betsid = popular5betsid;
                    }
                }
            })
    }
    selectBet(lineId) {
        this.slectedBets.push(lineId)
    }
    /**
     *  This function is used to remove bet from betReplacement
     * @param {any} MEID
     * @param {any} index
    */
    removeBet(MEID, index) {
        let element = document.getElementById("pb_" + index);
        if (element.classList.contains('active')) {
            element.className -= " active";
            element.className += " BLSBT-btn-marketOdds";
        }
        let removeBetParams = {
            totalBets: this.totalBets,
            showBetsData: this.getPopularData,
            top5BetsId: this.popular5betsid,
            MEID: MEID,
            index: index,
            id: "popularBets"
        };
        var oddsMul = removeBet(removeBetParams);
        this.oddsMultiply = oddsMul;
    }
}

export default PopularBetsStore;