/*This file contains HTML of accAttack*/
import React, { Component } from 'react';
import { observer } from 'mobx-react';

import closeicon from '../assests/img/close-icon.svg';
import DateFormat from '../date-format/date-format';
import Footer from '../share-components/footer/Footer';
import FooterStore from '../share-components/footer/FooterStore';
import { goToEvent} from '../common/commonFunctions';
import arrowGo from '../assests/img/arrow-go.svg';

@observer
class AccaAttack extends Component {
    /**
     * This function automatically calls on initial load and used to accquire data from the service.
     */
    componentWillMount() {
        this.props.AccaAttackStore.getAccaAttackData(10, 100, this.props.store);
        this.props.store.lookCarouselNames();
    }
    /**
     * This function is used to refersh service.
     */
    componentDidMount() {
        this.interval = setInterval(() => {
            this.props.AccaAttackStore.getAccaAttackData(10, 100, this.props.store);
        }, 300000);
    }
    /**
     * This function is used to get bet amount.
     * @param {value} event
     */
    setBetAmount(event) {
        this.props.AccaAttackStore.bet = event.target.value;
    }
    /**
      * This function is used to get win amount. 
      * @param {value} event
    */
    setToWinAmount(event) {
        this.props.AccaAttackStore.toWin = event.target.value;
    }
    /**
     * This function is used to bind the data into HTML.
     */
    render() {
        const {AccaAttackStore, store, App} = this.props;
        return (
            <div className="BLSBT-contentBox BLSBT-accaAttack" >

                <div className="BLSBT-accaAttack-filters">
                    <ul>
                        <li>
                            <div className="BLSBT-formControl">
                                <div className="BLSBT-inputLabel">{store.staticData.bet}:</div>
                                <input type="text" placeholder="Stake" className="BLSBT-input" maxLength="3" defaultValue={AccaAttackStore.bet} onChange={this.setBetAmount.bind(this)} onKeyPress={(e) => AccaAttackStore.betToWinValidation(e)} />
                            </div>
                        </li>
                        <li>
                            <div className="BLSBT-formControl">
                                <div className="BLSBT-inputLabel">{store.staticData.to_Win}:</div>
                                <input type="text" placeholder="To Win" className="BLSBT-input" maxLength="4" defaultValue="100" onChange={this.setToWinAmount.bind(this)} onKeyPress={(e) => AccaAttackStore.betToWinValidation(e)} />                        
                            </div>
                        </li>
                        <li>
                            <button className="BLSBT-btn BLSBT-btnGo" onClick={() => AccaAttackStore.go(store)}><img src={arrowGo} /></button>
                        </li>
                    </ul>
                    
                </div>
                {AccaAttackStore.betToWinErrorMessage ? <div className="BLSBT-error">
                        <div className="BLSBT-errorMsg">{AccaAttackStore.betToWinErrorMessageText.split("\n").map(i => {
                            return <div key={i}>{i}</div>;
                        })}
                        </div>
                    </div> : ''}
                {AccaAttackStore.noDataErrorMessage ? '' : AccaAttackStore.showAccaAttackData.length >= 1 ? <div className="BLSBT-matchBoxGroup">
                    {AccaAttackStore.showAccaAttackData.map(function (item, index) {
                        return (<div className="BLSBT-matchBox" key={index} id={"akkaattack_" + index}>
                            <div className="BLSBT-matchBox-header">
                                <div className="BLSBT-leagueName truncate">{item.leagueName}</div>
                                <div className="BLSBT-matchBox-kickOff">
                                    <DateFormat date={item.matchKickOff} timeZone={App.timeZone}></DateFormat>
                                </div>
                            </div>
                            <div className="BLSBT-matchBox-content">
                                <div className="BLSBT-matchBox-fixture">
                                    <div className="row">
                                        <div className="col-10">
                                            <div className="truncate" onClick={() => goToEvent(item, index,false)}>{item.matchHeader}</div>
                                        </div>
                                        <div className="col-2">
                                            <div className="BLSBT-closeIcon" onClick={() => AccaAttackStore.replaceBet(index)}>
                                                <img src={closeicon} alt="close" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="BLSBT-matchBox-RTB">{item.text}</div>
                                <div className="BLSBT-btn BLSBT-btn-marketOdds BLSBT-btnDisabled"><span className="BLSBT-market truncate">{item.marketName} - {item.outcome}</span>
                                    <span className="BLSBT-odds">{App.oddsFormat == 'FRACTIONAL' ? item.fractional : App.oddsFormat == 'AMERICAN' ? item.american : App.oddsFormat == 'HONGKONG' ? item.hongKong : App.oddsFormat == 'INDO' ? item.indonesian : App.oddsFormat == 'MALAY' ? item.malay : item.odds.toFixed(2)}</span></div>
                            </div>
                        </div>)
                    })
                    }
                </div> : ''}
                {AccaAttackStore.noDataErrorMessage ? <div className="BLSBT-error">
                    <span className="BLSBT-errorMsg">{store.staticData.nobetsAvailable}</span>
                </div> : <Footer footerStore={new FooterStore()} store={store} parentStore={AccaAttackStore} data={AccaAttackStore.showAccaAttackData} type='accaAttack' stack={AccaAttackStore.bet} type="mb" App={App}/>}
            </div>
        );
    }
};

export default AccaAttack;