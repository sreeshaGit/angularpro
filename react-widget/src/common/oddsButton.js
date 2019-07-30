
import React, { Component } from 'react';
import { extendObservable, autorun } from "mobx";
import { observer } from "mobx-react";

@observer
class OddsButton extends Component {
    constructor() {
        super();
        extendObservable(this, {
            isActive: false
        })

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.changedOddStatus != nextProps.changedOddStatus) {
            this.statusChanged(nextProps.changedOddStatus)
        }
    }
    componentDidMount() {
        autorun(() => {
            this.statusChanged(this.props.siteStore.changedOddStatus)
        });
    }
    statusChanged(obj) {
        //if (obj && obj.LineID === this.props.item.lineID) {
        //    this.isActive = false;
        //    var betInd = this.props.parentStore.slectedBets.indexOf(obj.LineID);
        //    if (betInd != -1) {
        //        this.props.parentStore.slectedBets.splice(betInd, 1);
        //    }
        //}

        if (obj && this.props.parentStore.slectedBets.indexOf(obj.LineID) !== -1) {
            this.isActive = false;
            var betInd = this.props.parentStore.slectedBets.indexOf(obj.LineID);
            this.props.parentStore.slectedBets.splice(betInd, 1);
        }
    }

    /**
  *  This function is used to add individual bet to betslip.
  *  @param {any} item
 */
    addToBetslip(item, index, id, getOdds) {
        if (this.isActive) {
            this.isActive = false;
        } else {
            this.isActive = true;
        }
        var betInd = this.props.parentStore.slectedBets.indexOf(item.lineID);
        if (betInd != -1) {
            this.props.parentStore.slectedBets.splice(betInd, 1);
        } else {
            this.props.parentStore.slectedBets.push(item.lineID)
        }
        if (window.BetSlipUtil) {
            if (this.props.App.oddsFormat === 'FRACTIONAL') {
                window.BetSlipUtil.addOddToSlip(item.MEID, item.eventId, item.lineID, item.fractional, item.lineGroupID, item.lineTypeID, item.rowTypeID, item.points, item.isLive, item.isQA, item.marketId, item.sbLeagueId, item.betId);
            }
            else if (this.props.App.oddsFormat === 'AMERICAN') {
                window.BetSlipUtil.addOddToSlip(item.MEID, item.eventId, item.lineID, item.american, item.lineGroupID, item.lineTypeID, item.rowTypeID, item.points, item.isLive, item.isQA, item.marketId, item.sbLeagueId, item.betId);
            }
            else if (this.props.App.oddsFormat === 'HONGKONG') {
                window.BetSlipUtil.addOddToSlip(item.MEID, item.eventId, item.lineID, item.hongKong, item.lineGroupID, item.lineTypeID, item.rowTypeID, item.points, item.isLive, item.isQA, item.marketId, item.sbLeagueId, item.betId);
            }
            else if (this.props.App.oddsFormat === 'INDO') {
                window.BetSlipUtil.addOddToSlip(item.MEID, item.eventId, item.lineID, item.indonesian, item.lineGroupID, item.lineTypeID, item.rowTypeID, item.points, item.isLive, item.isQA, item.marketId, item.sbLeagueId, item.betId);
            }
            else if (this.props.App.oddsFormat === 'MALAY') {
                window.BetSlipUtil.addOddToSlip(item.MEID, item.eventId, item.lineID, item.malay, item.lineGroupID, item.lineTypeID, item.rowTypeID, item.points, item.isLive, item.isQA, item.marketId, item.sbLeagueId, item.betId);
            }
            else {
                window.BetSlipUtil.addOddToSlip(item.MEID, item.eventId, item.lineID, item.odds, item.lineGroupID, item.lineTypeID, item.rowTypeID, item.points, item.isLive, item.isQA, item.marketId, item.sbLeagueId, item.betId);
            }
        }
    }

    render() {
        const {item, index, id, getOdds, parentStore, App} = this.props;
        return (
            <div>
                <button type="button"
                    className={parentStore.slectedBets.indexOf(item.lineID) != -1 ? "BLSBT-btn BLSBT-btn-marketOdds active" : "BLSBT-btn BLSBT-btn-marketOdds"} onClick={() => this.addToBetslip(item, index, id, getOdds)}
                    id={id}>
                    <span className="BLSBT-market truncate">{item.marketName} - {item.outcomeName}</span>
                    <span className="BLSBT-odds">{this.isActive}{App.oddsFormat == 'FRACTIONAL' ? item.fractional : App.oddsFormat == 'AMERICAN' ? item.american : App.oddsFormat == 'HONGKONG' ? item.hongKong : App.oddsFormat == 'INDO' ? item.indonesian : App.oddsFormat == 'MALAY' ? item.malay : item.odds.toFixed(2)}</span>
                </button>
            </div>
        );
    }
};
export default observer(OddsButton);