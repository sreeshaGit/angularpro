/*This file contains logics of accaAttack*/
import {observable } from 'mobx';
import superagent from 'superagent';
import ENV from '../common/environment.json';
import OddsConversion from '../common/oddsConversion';
import { findLanguage } from '../common/commonFunctions';

class AccaAttackStore {
    @observable bet = 10;
    @observable toWin = 100;
    @observable stake = 10;
    @observable accaAttackData = [];
    @observable filterData = [];
    @observable noDataErrorMessage = false;
    @observable betToWinErrorMessage = false;
    @observable betToWinErrorMessageText = "";
    @observable oddsMultiply = 1;
    @observable showAccaAttackData = [];
    @observable isBet = false;

    /**
     * This function is used to get data of bet and win.
     * @param {value} bet
     * @param {value} toWin
     */
    getAccaAttackData(bet,toWin,store){
        const url = ENV.serviceURL + 'AccaAttack/SBTechService.svc/GetMyMultiBetsJson' + '?' + 'stake=' + bet + '&win=' + toWin + '&' + 'lang=' + findLanguage() + '&' + 'ProviderId=' + ENV.fbProviderId;
        superagent
            .get(url)
            .query(null)
            .set('Accept', 'application/json')
            .end((error, response) => {
                if (response !== null) {
                    const result = response.body
                    if (result === null || result === '' || result.MultibetItems === null) {
                        this.noDataErrorMessage = true;                        
                        if(store != ''){
                            store.hideAccaAttack = true;
                            store.lookCarouselNames();
                        }
                        return;
                    } else if (result.MultibetItems instanceof Array && result.MultibetItems.length <= 0) {
                        this.noDataErrorMessage = true;                        
                        if(store != ''){
                            store.hideAccaAttack = true;
                            store.lookCarouselNames();
                        }
                    } else if (result.MultibetItems instanceof Array && result.MultibetItems.length > 0) {
                        this.noDataErrorMessage = false;                        
                        if(store != ''){
                            store.lookCarouselNames();
                            store.hideAccaAttack = false;
                        }
                        this.accaAttackData = result.MultibetItems;
                        this.showAccaAttackData = [];
                        for (let i = 0; i < this.accaAttackData.length; i++) {
                            this.accaAttackData[i]['fractional'] = OddsConversion.oddsConversionDecimalToFractional(this.accaAttackData[i]['odds']);
                            this.accaAttackData[i]['american'] = OddsConversion.oddsConversionDecimalToAmerican(this.accaAttackData[i]['odds']);
                            this.accaAttackData[i]['hongKong'] = OddsConversion.oddsConversionDecimalToHongKong(this.accaAttackData[i]['odds']);
                            this.accaAttackData[i]['indonesian'] = OddsConversion.oddsConversionDecimalToIndonesian(this.accaAttackData[i]['odds']);
                            this.accaAttackData[i]['malay'] = OddsConversion.oddsConversionDecimalToMalay(this.accaAttackData[i]['odds']);
                            this.showAccaAttackData[i] = this.accaAttackData[i];
                        }
                    }
                }
            })       
    }
    /**
     * This function is used to not to enter any characters, apart numerics in bet and win feilds.
     * @param {any} e
     */
    betToWinValidation(e){
        const re = /[0-9A-F:]+/g;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
    }
    /**
     * This function is used to show data when click on go button.
     */
    go() {
        if(this.bet === "" || this.toWin === ""){
            this.betToWinErrorMessageText = "Bet and To Win fields should not be empty";
            this.betToWinErrorMessage = true;
            return;
        } else if((this.bet < 1 || this.bet > 100) || (this.toWin < 1 || this.toWin > 1000)){
            this.betToWinErrorMessageText = "Bet value should be between 1-100 and toWin value should be between 1-1000";
            this.betToWinErrorMessage = true;
            return;
        }
        this.betToWinErrorMessage = false;
        this.getAccaAttackData(this.bet, this.toWin,'');

    }
    /**
     * This function is used to replace bet in acca attack.
     * @param {any} index
     */
    replaceBet(index){
        let replaceItem = this.accaAttackData[index];
        let matches = this.accaAttackData;
        let marketids = []
        for (var i = 0; i < matches.length; i++) {
            marketids.push(matches[i]["matchID"])
        }
        const url = ENV.serviceURL + 'AccaAttack/SBTechService.svc/GetReplaceBet' + '?' + 'ExcludeMatches=' + marketids.join() + '&MultiGroupId=' + replaceItem.multiGroupID + '&' + 'lang=' + findLanguage() + '&' + 'ProviderId=' + ENV.fbProviderId;
        superagent
        .get(url)
        .query(null)
        .set('Accept', 'application/json')
        .end((error, response) => {
            const result = response.body
            
            if (result === null || result === '' || result.MultibetItems === null || typeof result !== 'object') {
                return;
            } else if (result.MultibetItems instanceof Array && result.MultibetItems.length <= 0) {
                return;
            } else if (result.MultibetItems instanceof Array && result.MultibetItems.length > 0) {
                result.MultibetItems[0]['fractional'] = OddsConversion.oddsConversionDecimalToFractional(result.MultibetItems[0]['odds']);
                result.MultibetItems[0]['american'] = OddsConversion.oddsConversionDecimalToAmerican(result.MultibetItems[0]['odds']);
                result.MultibetItems[0]['hongKong'] = OddsConversion.oddsConversionDecimalToHongKong(result.MultibetItems[0]['odds']);
                result.MultibetItems[0]['indonesian'] = OddsConversion.oddsConversionDecimalToIndonesian(result.MultibetItems[0]['odds']);
                result.MultibetItems[0]['malay'] = OddsConversion.oddsConversionDecimalToMalay(result.MultibetItems[0]['odds']);
                var d = document.getElementById("akkaattack_" + index);
                d.className += " animated slideOutLeft";
                this.accaAttackData[index] = result.MultibetItems[0];             
                this.showAccaAttackData[index] = result.MultibetItems[0];  
            }
            
            setTimeout(function () {
                var d1 = document.getElementById("akkaattack_" + index);
                d1.className -= " animated slideOutLeft";
                d1.className += " BLSBT-matchBox";
            }, 800)   
            for (let i = 0; i < this.showAccaAttackData.length; i++) {
                this.oddsMultiply = this.oddsMultiply * this.showAccaAttackData[i].odds;
            }
        })
    }
}
export default AccaAttackStore;