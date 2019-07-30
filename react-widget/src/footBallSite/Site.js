/*This file contains HTML of initial load of widgets */
import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import BestBets from '../bestBets/BestBets';
import BestBetsStore from '../bestBets/BestBetsStore';
import PopularBets from '../popularBets/PopularBets';
import PopularBetsStore from '../popularBets/PopularBetsStore';
import AccaAttack from '../accaAttack/AccaAttack';
import AccaAttackStore from '../accaAttack/AccaAttackStore';
import FootballLiveBets from '../footballLiveBets/FootballLiveBets';
import FootballLiveBetsStore from '../footballLiveBets/FootballLiveBetsStore';
import Header from '../share-components/header/Header';
import SiteStore from '../footBallSite/SiteStore';
// import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
// import { Carousel } from 'react-bootstrap';

var footballLiveBetsStore = new FootballLiveBetsStore();
var bestBetsStore = new BestBetsStore();
var popularBetsStore = new PopularBetsStore()
var accaAttackStore = new AccaAttackStore()
@observer
class Site extends Component {
    @observable activeIndex;
    @observable activeInd = 0;
    @observable siteStore = new SiteStore();
    constructor() {
        super();
        extendObservable(this, {
            activeIndex: 0,
            direction: null,   
            staticData: [],
            timer:null
        });  
       // this.timer = setTimeout(this.onSelect.bind(this), 3000);
    }
    onSelect = (active, direction) => {
        this.siteStore.activeIndex = active;
    }
    componentWillMount() {
        this.siteStore.lookCarouselNames();
    }
    componentDidMount() {
        this.setState({ activeIndex: 0 })
        this.siteStore.lookCarouselNames();
        this.siteStore.callServcies = false;
    }
    /**
     * This function is used to get active index for a carousel.
     * @param {index} value
     */
    goToIndex(index) {
        this.slider.goToSlide(index);
    }
    /**
     * This method is used to bind the HTML
     */
    render() {
        const {siteStore, App, store, appStore} = this.props;
		
        return (
            <div>
                {this.siteStore.hideBestBets && this.siteStore.hidePopularBets && this.siteStore.hideAccaAttack ?'':<div className="BLSBT-widget">
                    <Header store={this.siteStore} site={this} />
                    <div className="BLSBT-carousel" >
                        {this.siteStore.callServcies ?
                            <div>
                                <FootballLiveBets FootballLiveBetsStore={footballLiveBetsStore} site={this} store={this.siteStore} App={App} appStore={appStore} changedOddStatus={appStore.changedOddStatus} />
                                <BestBets BestBetsStore={bestBetsStore} site={this} store={this.siteStore} App={App} appStore={appStore} changedOddStatus={appStore.changedOddStatus} />
                                <PopularBets PopularBetsStore={popularBetsStore} site={this} store={this.siteStore} App={App} appStore={appStore} changedOddStatus={appStore.changedOddStatus} />
                                <AccaAttack AccaAttackStore={accaAttackStore} site={this} store={this.siteStore} App={App} appStore={appStore} /></div>
                            : ""}

                        
                               
                        
                        {!this.siteStore.hideLiveBets && this.siteStore.carouselItemNames[this.siteStore.activeIndex]["Name"] === "Live Bets" ?
                            <div className="animated fadeIn">
                            <FootballLiveBets FootballLiveBetsStore={footballLiveBetsStore} site={this} store={this.siteStore} App={App} appStore={appStore} changedOddStatus={appStore.changedOddStatus} />
                            </div>
                             : ""}
                        {!this.siteStore.hideBestBets && this.siteStore.carouselItemNames[this.siteStore.activeIndex]["Name"] === "Best Bets" ?
                            <div className="animated fadeIn">
                            <BestBets BestBetsStore={bestBetsStore} site={this} store={this.siteStore} App={App} appStore={appStore} changedOddStatus={appStore.changedOddStatus} />
                            </div>
                            : ""}
                        {!this.siteStore.hidePopularBets && this.siteStore.carouselItemNames[this.siteStore.activeIndex]["Name"] === "Popular Bets" ?
                            <div className="animated fadeIn">
                            <PopularBets PopularBetsStore={popularBetsStore} site={this} store={this.siteStore} App={App} appStore={appStore} changedOddStatus={appStore.changedOddStatus} />
                            </div>
                            : ""}
                        {!this.siteStore.hideAccaAttack && this.siteStore.carouselItemNames[this.siteStore.activeIndex]["Name"] === "Acca Attack" ?
                            <div className="animated fadeIn">
                            <AccaAttack AccaAttackStore={accaAttackStore} site={this} store={this.siteStore} App={App} appStore={appStore} />
                            </div>
                            : ""}
                                
                            
                    </div>
            </div>}
                </div>
          );
    }
}

export default observer(Site);
