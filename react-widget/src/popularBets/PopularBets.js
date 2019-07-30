/*This file contains HTML of popularBets*/
import React, { Component } from 'react';
import { observer } from 'mobx-react';

//import '../assests/css/style.css';
//import '../assests/css/animate.css';
import closeicon from '../assests/img/close-icon.svg';
import DateFormat from '../date-format/date-format';
import OddsButton from '../common/oddsButton';
import Footer from '../share-components/footer/Footer';
import FooterStore from '../share-components/footer/FooterStore';
import { goToEvent} from '../common/commonFunctions';

@observer
class PopularBets extends Component {
    /**
     * This function automatically calls on initial load and used to accquire data from the service.
    */
    componentWillMount() {
        this.props.PopularBetsStore.getPopularBetsData(this.props.store);
        this.props.store.lookCarouselNames();
    }
    /**
     * This function is used to refersh service.
     */
    componentDidMount() {
        this.interval = setInterval(() => {
            this.props.PopularBetsStore.getPopularBetsData(this.props.store);
            this.props.store.lookCarouselNames();
        }, 300000);
    }
    /**
     * This function is used to bind the data into HTMl.
     */
    render() {
        const {PopularBetsStore, store, App, appStore, changedOddStatus} = this.props;
        return (
            <div className="BLSBT-contentBox BLSBT-popularBets">
                {PopularBetsStore.noDataErrorMessage ? '' : PopularBetsStore.getPopularData.length >= 1 ? <div className="BLSBT-matchBoxGroup">
                    {PopularBetsStore.getPopularData.map(function (item, index) {
                        return <div className="BLSBT-matchBox" key={index} id={"popular_" + index}>
                            <div className="BLSBT-matchBox-header">
                                <div className="BLSBT-leagueName truncate">{item.leagueName}</div>
                                <div className="BLSBT-matchBox-kickOff">
                                    <DateFormat date={item.kickOffTime} timeZone={App.timeZone}></DateFormat>
                                </div>
                            </div>
                            <div className="BLSBT-matchBox-content">
                                <div className="BLSBT-matchBox-fixture">
                                    <div className="row">
                                        <div className="col-10">
                                            <div className="truncate" onClick={() => goToEvent(item, index,false)}>{item.match}</div>
                                        </div>
                                        {PopularBetsStore.isPopularBets ? '' : <div className="col-2">
                                            <div className="BLSBT-closeIcon" onClick={() => PopularBetsStore.removeBet(item.MEID, index)}>
                                                <img src={closeicon} alt="close" />
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                                <div className="BLSBT-matchBox-RTB">{item.text}</div>
                                <OddsButton item={item} index={index} id={"pb_" + index} App={App} appStore={appStore} parentStore={PopularBetsStore} siteStore={store} changedOddStatus={changedOddStatus}></OddsButton>
                            </div>
                        </div>
                    }
                    )}
                </div> : ''}
                {PopularBetsStore.noDataErrorMessage ? <div className="BLSBT-error">
                    <span className="BLSBT-errorMsg">{store.staticData.nobetsAvailable}</span>
                </div> : <Footer footerStore={new FooterStore()} store={store} data={PopularBetsStore.getPopularData} parentStore={PopularBetsStore} oddsMultiply={PopularBetsStore.oddsMultiply} type="pb" App={App} />}
            </div>
        );
    }
};

export default observer(PopularBets);