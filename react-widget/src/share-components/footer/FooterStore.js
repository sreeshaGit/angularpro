/*This file contains logics for footer component*/
import { extendObservable } from 'mobx';
import OddsButton from '../../common/oddsButton';
class FooterStore {
    constructor() {
        extendObservable(this, {

            inputValue: 10,
            returns: '',
            initialReturns: true,
        });
    }
    /**
     * This method is used to add all bets at a time
     * @param {item} data
     */
    addAllToBetslip(data, type, parentStore,App) {

        for (let i = 0; i < data.length; i++) {
            var item = data[i];
            if (window.BetSlipUtil) {
                if (App.oddsFormat === 'FRACTIONAL') {
                    window.BetSlipUtil.addOddToSlip(item.MEID, item.eventId, item.lineID, item.fractional, item.lineGroupID, item.lineTypeID, item.rowTypeID, item.points, item.isLive, item.isQA, item.marketId, item.sbLeagueId, item.betId);
                }
                else if (App.oddsFormat === 'AMERICAN') {
                    window.BetSlipUtil.addOddToSlip(item.MEID, item.eventId, item.lineID, item.american, item.lineGroupID, item.lineTypeID, item.rowTypeID, item.points, item.isLive, item.isQA, item.marketId, item.sbLeagueId, item.betId);
                }
                else if (App.oddsFormat === 'HONGKONG') {
                    window.BetSlipUtil.addOddToSlip(item.MEID, item.eventId, item.lineID, item.hongKong, item.lineGroupID, item.lineTypeID, item.rowTypeID, item.points, item.isLive, item.isQA, item.marketId, item.sbLeagueId, item.betId);
                }
                else if (App.oddsFormat === 'INDO') {
                    window.BetSlipUtil.addOddToSlip(item.MEID, item.eventId, item.lineID, item.indonesian, item.lineGroupID, item.lineTypeID, item.rowTypeID, item.points, item.isLive, item.isQA, item.marketId, item.sbLeagueId, item.betId);
                }
                else if (App.oddsFormat === 'MALAY') {
                    window.BetSlipUtil.addOddToSlip(item.MEID, item.eventId, item.lineID, item.malay, item.lineGroupID, item.lineTypeID, item.rowTypeID, item.points, item.isLive, item.isQA, item.marketId, item.sbLeagueId, item.betId);
                }
                else {
                    window.BetSlipUtil.addOddToSlip(item.MEID, item.eventId, item.lineID, item.odds, item.lineGroupID, item.lineTypeID, item.rowTypeID, item.points, item.isLive, item.isQA, item.marketId, item.sbLeagueId, item.betId);
                }
            }
            if (type != "mb") {

                var betInd = parentStore.slectedBets.indexOf(data[i].lineID);

                if (betInd != -1) {
                    parentStore.slectedBets.splice(betInd, 1);
                } else {
                    parentStore.slectedBets.push(data[i].lineID)
                }
            }

        }
    }
}

export default FooterStore;
