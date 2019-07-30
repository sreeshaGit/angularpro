/*This file contains HTML of bestBets*/
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import closeicon from '../assests/img/close-icon.svg';
import DateFormat from '../date-format/date-format';
import OddsButton from '../common/oddsButton';
import Footer from '../share-components/footer/Footer';
import FooterStore from '../share-components/footer/FooterStore';
import { goToEvent} from '../common/commonFunctions';

@observer
class BestBets extends Component {
    /**
     * This function automatically calls on initial load and used to accquire data from the service.
    */
    componentWillMount() {
        this.props.BestBetsStore.getBestBetsData();
        this.props.BestBetsStore.getFilterData(this.props.store,'');
        this.props.store.lookCarouselNames();
        this.props.store.getStaticData();       
    }
    /**
     * This function is used to refersh service.
     */
    componentDidMount() {
        this.interval = setInterval(() => {
            this.props.BestBetsStore.getFilterData(this.props.store,'');
            this.props.store.lookCarouselNames();
        }, 300000);
    }
    /**
     * This function is used to get LeagueId
     * @param {value} event it reserve LeagueId
    */
    getLeagueId(event) {
        this.props.BestBetsStore.getLeagueId(event.target.value, this.props.store);
    }
    /**
     * This function is used to get MarketId
     * @param {value} event it reserve MarketId
    */
    getMarketId(event) {
        this.props.BestBetsStore.getMarketId(event.target.value, this.props.store);
    }
    /**
     * This method is used to bind data into HTML.
    */
    render() {
        const {BestBetsStore, store, App, site, appStore, changedOddStatus} = this.props;
        return (
            <div>
                <div className="BLSBT-contentBox BLSBT-bestBets">
                    <div className="BLSBT-bestBets-filters">
                        <ul>
                            <li>
                                <div className="BLSBT-select ">
                                    <select onChange={this.getLeagueId.bind(this)} id="league" >
                                        {
                                            BestBetsStore.filterLeagueData.map(function (item, index) {
                                                return <option value={item.LeagueId} key={index}>{item.LeagueName}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </li>
                            <li>
                                <div className="BLSBT-select">
                                    <select onChange={this.getMarketId.bind(this)} className="truncate">
                                        {
                                            BestBetsStore.filterMarketData.map(function (item, index) {
                                                return <option value={item.MarketId} key={index}>{item.MarketName}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {BestBetsStore.noDataErrorMessage ? '' : BestBetsStore.showBetsData.length >= 1 ? <div className="BLSBT-matchBoxGroup" >
                        {BestBetsStore.showBetsData.map(function (item, index) {

                            return <div className="BLSBT-matchBox" key={index} id={"arrow_" + index}>
                                <div className="BLSBT-matchBox-header">                                    
                                    <div className="BLSBT-leagueName truncate">{item.leagueName}</div>
                                    <div className="BLSBT-matchBox-kickOff">
                                        <DateFormat date={item.kickOffTime}  timeZone={App.timeZone}></DateFormat>
                                    </div>
                                </div>      
                                <div className="BLSBT-matchBox-content">
                                    <div className="BLSBT-matchBox-fixture">
                                        <div className="row">
                                            <div className="col-10">
                                                <div className="truncate" onClick={() => goToEvent(item, index,false)}>{item.match}</div>
                                            </div>
                                            {BestBetsStore.isBestBets ? '' : <div className="col-2" >
                                                <div className="BLSBT-closeIcon" onClick={() => BestBetsStore.removeBets(item.MEID, index)}>
                                                    <img src={closeicon} alt="close" />
                                                </div>
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="BLSBT-matchBox-RTB">{item.text}</div>
                                    <OddsButton item={item} index={index} id={"bb_" + index} getOdds={store.getodds} App={App} appStore={appStore} parentStore={BestBetsStore} siteStore={store} changedOddStatus={changedOddStatus}></OddsButton>
                                </div>

                            </div>
                        }
                        )}
                    </div> : ''}
                    {BestBetsStore.noDataErrorMessage ? <div className="BLSBT-error">
                        <span className="BLSBT-errorMsg">{store.staticData.nobetsAvailable}</span>
                    </div> : <Footer footerStore={new FooterStore()} store={store} data={BestBetsStore.showBetsData} parentStore={BestBetsStore} oddsMultiply={BestBetsStore.oddsMultiply} type="bb" App={App}/>}
                </div>
            </div>
        );
    }
};
export default observer(BestBets);
