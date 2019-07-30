import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Footer from '../share-components/footer/Footer';
import FooterStore from '../share-components/footer/FooterStore';
import OddsButton from '../common/oddsButton';
import { goToEvent } from '../common/commonFunctions';

class FootballLiveBets extends Component {
    /**
       * This function automatically calls on initial load and used to accquire data from the service.
      */
    componentWillMount() {
        this.props.FootballLiveBetsStore.getLiveBetsData(this.props.store);
        this.props.store.getStaticData();
        this.props.store.lookCarouselNames();
    }
    componentDidMount() {
        this.props.FootballLiveBetsStore.getLiveBetsData(this.props.store);
        this.interval = setInterval(() => {
            this.props.FootballLiveBetsStore.getLiveBetsData(this.props.store);
            this.props.store.lookCarouselNames();
        }, 10000);
    }
    /**
     * This method is used to bind the data into HTML
    */
    render() {
        
        const { FootballLiveBetsStore, store, App, site, appStore, changedOddStatus } = this.props;

        return (<div>
            {FootballLiveBetsStore.noDataErrorMessage ? '' : FootballLiveBetsStore.getBetsData.length >= 1 ? <div className="BLSBT-contentBox BLSBT-FBlive">
                {FootballLiveBetsStore.getBetsData.map(function (item, index) {
                    return <div className="BLSBT-matchBoxGroup" key={index}>
                        <div className="BLSBT-matchBox">
                            <div className="BLSBT-matchBox-header">
                                <div className="BLSBT-leagueName truncate">{item.leagueName}</div>
                                <div className="BLSBT-matchBox-kickOff">{item.matchMinute}'</div>
                            </div>
                            <div className="BLSBT-matchBox-content">
                                <div className="BLSBT-matchBox-fixture">
                                    <div className="row">
                                        <div className="col-10" onClick={() => goToEvent(item, index,true)}>
                                            <div className="truncate"><span className="BLSBT-FB-liveScore">{item.homeGoal}</span>{item.homeTeam}</div>
                                            <div className="truncate"><span className="BLSBT-FB-liveScore">{item.awayGoal}</span>{item.awayTeam}</div>
                                        </div>
                    </div>
                </div>
                <div className="BLSBT-matchBox-RTB">{item.text}</div>
                <OddsButton item={item} index={index} id={"live_" + index} getOdds={store.getodds} App={App} appStore={appStore} parentStore={FootballLiveBetsStore} siteStore={store} changedOddStatus={changedOddStatus}></OddsButton>
            </div>
        </div>
    </div>
                }
                )}              
            </div> : ''}
                  {FootballLiveBetsStore.noDataErrorMessage ? <div className="BLSBT-contentBox"> <div className="BLSBT-error">
                    <div className="space-5"></div>
                    <div className="BLSBT-errorMsg">{store.staticData.nobetsAvailable}</div>
                    <div className="space-5"></div>
            </div></div> : <Footer footerStore={new FooterStore()} store={store} data={FootballLiveBetsStore.getBetsData} parentStore={FootballLiveBetsStore} oddsMultiply={FootballLiveBetsStore.oddsMultiply} type="lb" App={App} />}
        </div>
        );
    }
}

export default observer(FootballLiveBets);
