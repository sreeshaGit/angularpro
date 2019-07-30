/*This file contains HTML for header component */
import React, { Component } from 'react';
import { extendObservable } from 'mobx';

import football from '../../assests/img/football.png';
import leftarrow from '../../assests/img/left-arrow.svg';
import rightarrow from '../../assests/img/right-arrow.svg';
import { observer } from 'mobx-react';

@observer
class Header extends Component {
    constructor(props) {
        super(props);
        extendObservable(this, {
            activeInd: 0,
            carouselItemNames: [
                {
                    display: "",
                    Name: ""
                }
            ],
           
        });
    }
    render() {
        const {activeIndex, HeaderStore, store, site} = this.props;
        return (
            <div className="BLSBT-widgetHeader">
                <div className="BLSBT-headerLeft">
                    <div className="BLSBT-titleStrip"></div>
                    <img src={football} alt="football" className="BLSBT-widgetHeader-sportLogo" />
                    <div className="BLSBT-widgetTitle">{store.staticData.matchTips}</div>
                </div>
                {this.props.store.carouselItemNames.length >2? <div className="BLSBT-headerRight">
                    <a className={this.props.store.activeIndex == 0 ? "BLSBT-carousel-control left disabled " : "BLSBT-carousel-control left"} data-slide="prev" onClick={() => this.props.store.clickArrow('prev')}><img src={leftarrow} alt="Left arrow" /></a>
                    <div className="BLSBT-carouselText">{this.props.store.carouselItemNames[this.props.store.activeIndex]["Name"] == "Live Bets" ? store.staticData.liveBets :this.props.store.carouselItemNames[this.props.store.activeIndex]["Name"] == "Best Bets" ? store.staticData.bestBets : this.props.store.carouselItemNames[this.props.store.activeIndex]["Name"] == "Popular Bets" ? store.staticData.popularBets : this.props.store.carouselItemNames[this.props.store.activeIndex]["Name"] == "Acca Attack" ? store.staticData.accaAttack : ''} </div>
                    <a className={this.props.store.activeIndex == this.props.store.carouselItemNames.length - 1 ? "BLSBT-carousel-control right disabled" : "BLSBT-carousel-control right"} onClick={() => this.props.store.clickArrow('next')}><img src={rightarrow} alt="Right arrow" /></a>
                </div> : this.props.store.carouselItemNames.length > 1 ? <div className="BLSBT-headerRight">
                    <a className={this.props.store.activeIndex == 0 ? "BLSBT-carousel-control left disabled " : "BLSBT-carousel-control left"} data-slide="prev" onClick={() => this.props.store.clickArrow('prev')}><img src={leftarrow} alt="Left arrow" /></a>
                    <div className="BLSBT-carouselText">{this.props.store.carouselItemNames[this.props.store.activeIndex]["Name"] == "Live Bets" ? store.staticData.liveBets :this.props.store.carouselItemNames[this.props.store.activeIndex]["Name"] == "Best Bets" ? store.staticData.bestBets : this.props.store.carouselItemNames[this.props.store.activeIndex]["Name"] == "Popular Bets" ? store.staticData.popularBets : this.props.store.carouselItemNames[this.props.store.activeIndex]["Name"] == "Acca Attack" ? store.staticData.accaAttack : ''} </div>
                    <a className={this.props.store.activeIndex == 1 ? "BLSBT-carousel-control right disabled" : "BLSBT-carousel-control right"} onClick={() => this.props.store.clickArrow('next')}><img src={rightarrow} alt="Right arrow" /></a>
                    </div> : this.props.store.carouselItemNames.length > 0 ? <div className="BLSBT-headerRight">
                    <a className={this.props.store.activeIndex == 0 ? "BLSBT-carousel-control left disabled " : "BLSBT-carousel-control left"} data-slide="prev" onClick={() => this.props.store.clickArrow('prev')}><img src={leftarrow} alt="Left arrow" /></a>
                    <div className="BLSBT-carouselText">{this.props.store.carouselItemNames[this.props.store.activeIndex]["Name"] == "Live Bets" ? store.staticData.liveBets :this.props.store.carouselItemNames[this.props.store.activeIndex]["Name"] == "Best Bets" ? store.staticData.bestBets : this.props.store.carouselItemNames[this.props.store.activeIndex]["Name"] == "Popular Bets" ? store.staticData.popularBets : this.props.store.carouselItemNames[this.props.store.activeIndex]["Name"] == "Acca Attack" ? store.staticData.accaAttack : ''} </div>
                    <a className={this.props.store.activeIndex == 0 ? "BLSBT-carousel-control right disabled" : "BLSBT-carousel-control right"} onClick={() => this.props.store.clickArrow('next')}><img src={rightarrow} alt="Right arrow" /></a>
                </div> : ''}
            </div>
        );
    }
}

export default observer(Header);
