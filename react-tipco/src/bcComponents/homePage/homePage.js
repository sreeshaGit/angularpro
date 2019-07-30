import React from 'react';
import { observer } from "mobx-react";
import imageURLs from '../../sharedFiles/imageUrls';
import Header from '../header/header';
import { getMatchDayTime } from '../../sharedFiles/commonFunctions';
import AliceCarousel from 'react-alice-carousel';

import { IntlProvider, addLocaleData } from 'react-intl';
import messages_en from '../../translations/en.json';
import messages_de from '../../translations/de.json';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

const messages = {
    'de': messages_de,
    'en': messages_en
};
@observer
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.carouseltime = 300000;
        this.serviceCallTime = 20000;
        this.slideIndex = 0;
        if (this.props.match && this.props.match.params && this.props.match.params.langCode !== undefined && this.props.match.params.langCode !== null) {
            this.props.homeStore.languageCode = this.props.match.params.langCode;
        }
        this.props.homeStore.getBannerData();
    }
    state = {
        currentIndex: 0,
        responsive: { 1024: { items: 3 } },
        items: [],
    }
    componentDidMount(props) {
        if (this.props.homeStore.rulesLiveData && this.props.homeStore.rulesLiveData.length > 0) {
            // this.carouseltime = 150000;
            this.carouseltime = 60000;
            this.serviceCallTime = 20000;
        }
        try {
            this.interval = setInterval(async () => {
                this.props.homeStore.getBannerData();
            }, this.serviceCallTime);
        } catch (e) {
            console.log('error ==== ', e);
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    onSlideChange(e) {
        // console.log('Item`s position during a change: ', e.item);
        this.slideIndex = e.item;
    };
    onSlideChanged(e) {
        // console.log('onSlideChanged ====== ', e);
        // console.log('currentIndex ====== ', this.state.currentIndex);
        if (this.state.currentIndex == e.item) {
            if (e.item == (this.props.homeStore.finalArray1.length - 1)) {
                e.item = 0;
            } else {
                e.item = e.item + 1;
            }
        }
        this.setState({ currentIndex: e.item });
    }


    slideChange() {
        if (this.selIndex < (5 - 2)) {
            this.selIndex = this.selIndex + 2
        }
    }

    galleryItems() {
        var self = this;
        return (
            this.props.homeStore.finalArray1 && this.props.homeStore.finalArray1.map(function (slide, slideIndex) {
                // console.log('`key-${slideIndex}` ===== ', `key-${slideIndex}`);
                return (
                    <div key={slideIndex} className="carousel-cell">
                        <div className="grid-noGutter-top-equalHeights">
                            {slide.items.map(function (match, matchIndex) {
                                var arr1 = getMatchDayTime(match.kickOffTime).split("-");
                                var obj;
                                if (arr1.length > 2) {
                                    obj = <FormattedMessage id={"app." + arr1[0]} defaultMessage="" /> + arr1[1];
                                } else {
                                    obj = arr1[0] + "-" + <FormattedMessage id={"app." + arr1[1]} defaultMessage="" /> + arr1[2];
                                }
                                return (
                                    <div key={matchIndex + '_' + match.matchId} className="col-4 BLRetail-matchBoxGroup__item">
                                        <div className={match.isLive === true ? "BLRetail-matchBox BLRetail-matchBox-liveMatch" : "BLRetail-matchBox BLRetail-matchBox-preMatch"}>
                                            {/* <div className={match.sportName === 'Football' ? "BLRetail-matchBox-header BLRetail-football" : match.sportName === 'Tennis' && match.isLive == true ?  "BLRetail-matchBox-header BLRetail-matchBox-tennis-live-header" : "BLRetail-matchBox-header BLRetail-matchBox-tennis-header"}> */}
                                            <div className={match.sportName === 'Football' ? "BLRetail-matchBox-header BLRetail-football" : match.sportName === 'Tennis' ? "BLRetail-matchBox-header BLRetail-tennis" : ""}>
                                                {match.isLive === true ? <div className="grid-noGutter-middle BLRetail-matchBox-headerInner">
                                                    {/* <div className="col-2"> */}
                                                    <div className="col-2">
                                                        <img src={match.sportName === 'Football' ? imageURLs.footballIcon : match.sportName === 'Tennis' ? imageURLs.tennisIcon : ''} className="BLRetail-sportLogo" alt="" />
                                                        <img src={imageURLs.liveIconWhite} alt="" />
                                                    </div>
                                                    {/* {match.sportName == 'Football' ? <div className={(match.htStatus == "" && match.htHomeScore !== null && match.htAwayScore !== null) ? "col-5 text-center" : "col-8 text-center"}> */}
                                                    {match.sportName === 'Football' ? <div className={(match.htStatus === "" && match.htHomeScore !== null && match.htAwayScore !== null) ? "col-5 text-center" : "col-8 text-center"}>
                                                        {match.isLive === true && match.sportName === 'Football' && match.htStatus !== "FT" ? <div className="BLRetail-matchBox__FB-score">
                                                            <div className="BLRetail-matchBox__FB-scoreBox">{match.score.split('-')[0]}</div>
                                                            <div className="BLRetail-matchBox__FB-scoreBox">{match.score.split('-')[1]}</div>
                                                        </div> : ''}
                                                    </div> :
                                                        match.matchStatus !== "Fin" ? <div className="col-8">
                                                            <div className="BLRetail-matchBox-tennisLiveScoreContent">
                                                                {/*--- <div className="BLRetail-matchBox_setsTxt">Sets</div> */}
                                                                <div className="BLRetail-matchBox-tennisLiveScore mb-5">
                                                                    {/* ---- <span className="BLRetail-matchBox_setScore BLRetail-red">2</span> */}
                                                                    {match.score.split(' ').map(function (item, index) {
                                                                        index = match.setNumber > 0 ? index + 1 : index;
                                                                        return (
                                                                            <span key={index}>
                                                                                {match.setNumber == (index) ? <span className="BLRetail-matchBox__FB-score">
                                                                                    <span className={match.serve === "1" ? "BLRetail-matchBox__FB-scoreBox active BLRetail-servingAfter" : "BLRetail-matchBox__FB-scoreBox active"}>{item.split('-')[0]}</span>
                                                                                </span>
                                                                                    : <span className="BLRetail-matchBox_setScore">{item.split('-')[0]}</span>}
                                                                            </span>
                                                                        )
                                                                    })
                                                                    }

                                                                    {/* <span className={match.serve == "1" ? "BLRetail-matchBox_player BLRetail-serving" : "BLRetail-matchBox_player"}>{match.home}</span> */}
                                                                </div>
                                                                <div className="BLRetail-matchBox-tennisLiveScore">
                                                                    {/* ---- <span className="BLRetail-matchBox_setScore BLRetail-red">2</span> */}
                                                                    {match.score.split(' ').map(function (item, index) {
                                                                        // index = index + 1;
                                                                        index = match.setNumber > 0 ? index + 1 : index;
                                                                        return (
                                                                            <span key={index}>
                                                                                {match.setNumber == (index) ? <span className="BLRetail-matchBox__FB-score">
                                                                                    <span className={match.serve === "2" ? "BLRetail-matchBox__FB-scoreBox active BLRetail-servingAfter" : "BLRetail-matchBox__FB-scoreBox active"}>{item.split('-')[1]}</span>
                                                                                </span>
                                                                                    : <span className="BLRetail-matchBox_setScore">{item.split('-')[1]}</span>}
                                                                            </span>
                                                                        )
                                                                    })
                                                                    }
                                                                    {/* <span className="BLRetail-matchBox__FB-score">
                                                                    <span className="BLRetail-matchBox__FB-scoreBox">1</span>
                                                                </span> */}
                                                                    {/* <span className={match.serve == "2" ? "BLRetail-matchBox_player BLRetail-serving" : "BLRetail-matchBox_player"}>{match.away}</span> */}
                                                                </div>
                                                            </div>
                                                        </div> : ''
                                                    }
                                                    {(match.htStatus === "" && match.htHomeScore !== null && match.htAwayScore !== null) ? <div className="col-3 text-center">
                                                        <div className="">({match.htHomeScore}-{match.htAwayScore}{" HT"})</div>
                                                    </div> : ''}
                                                    <div className="col-2 text-right">
                                                        <span className="BLRetail-matchBox__matchMinute">{match.sportName === 'Football' ? match.htStatus !== "" && (match.htStatus === "Half Time" || match.htStatus === "HT") ? "HT" : (match.htStatus === "Full Time" || match.htStatus === "FT") ? "" : match.matchMinute + "'" : ''}</span>
                                                    </div>
                                                </div> : <div className="grid-noGutter-middle BLRetail-matchBox-headerInner">
                                                        <div className="col-5">
                                                            <img src={match.sportName === 'Football' ? imageURLs.footballIcon : match.sportName === 'Tennis' ? imageURLs.tennisIcon : ''} className="BLRetail-sportLogo" alt="" />
                                                            <span className="BLRetail-matchBox-upcomingTxt">
                                                                {/* Upcoming */}
                                                                <FormattedMessage id="app.upcoming"
                                                                    defaultMessage="" />
                                                            </span>
                                                        </div>
                                                        <div className="col-7 text-right">
                                                            {/* {getMatchDayTime(match.kickOffTime)} */}
                                                            {arr1.length <= 2 ?
                                                                <span className="BLRetail-matchBox-kickOff">
                                                                    <FormattedMessage id={"app." + arr1[0]} defaultMessage="" />  {arr1[1]}
                                                                </span> :
                                                                <span className="BLRetail-matchBox-kickOff">
                                                                    {arr1[0]}-<FormattedMessage id={'app.' + arr1[1]} defaultMessage="" />  {arr1[2]}
                                                                </span>
                                                            }
                                                        </div>
                                                    </div>}
                                            </div>
                                            <div className="BLRetail-matchBox-fixtureDetails grid-noGutter-middle">
                                                <div className="col grid-noGutter-middle">
                                                    <div className="col-12 ">
                                                        <div className="BLRetail-matchBox__league text-center">
                                                            {match.sportName === '' ? match.country + ' / ' + match.league : match.country === '' ? match.sportName + ' / ' + match.league : match.league === '' ? match.sportName + ' / ' + match.country : match.sportName + ' / ' + match.country + ' / ' + match.league}
                                                        </div>
                                                        <div className="BLRetail-matchBox__fixture text-center truncate">{match.sportName === 'Football' ?
                                                            <div><div className="truncate">{match.home}</div><div className="truncate">{match.away}</div></div> :
                                                            match.isLive && match.isLive === true ?
                                                                <div className="">
                                                                    <div>
                                                                        {/* <span className="BLRetail-matchBox_setScore">{match.score.split('-')[0]}</span>
                                                                            <span className="BLRetail-matchBox_setScore">5</span>
                                                                            <span className="BLRetail-matchBox_setScore set-points">15</span> */}
                                                                        {/* {match.score.split(' ').map(function (item, index) {
                                                                            return (<span className="BLRetail-matchBox_setScore">{item.split('-')[0]}</span>)
                                                                        })
                                                                        } */}
                                                                        <span className="BLRetail-matchBox_player">{match.home}</span>
                                                                    </div>
                                                                    <div>
                                                                        {/* <span className="BLRetail-matchBox_setScore">{match.score.split('-')[1]}</span>
                                                                            <span className="BLRetail-matchBox_setScore">6</span>
                                                                            <span className="BLRetail-matchBox_setScore set-points">0</span> */}
                                                                        {/* {match.score.split(' ').map(function (item, index) {
                                                                            return (<span className="BLRetail-matchBox_setScore">{item.split('-')[1]}</span>)
                                                                        })
                                                                        } */}
                                                                        {/* <span className={match.serve == "2" ? "BLRetail-matchBox_player BLRetail-serving" : "BLRetail-matchBox_player"}>{match.away}</span> */}
                                                                        <span className="BLRetail-matchBox_player">{match.away}</span>
                                                                    </div>
                                                                </div> : <div>
                                                                    {/* <div className="BLRetail-matchBox_player">{match.home}</div><div className="BLRetail-matchBox_player">{match.away}</div> */}
                                                                    <div className="truncate">{match.home}</div><div className="truncate">{match.away}</div>
                                                                </div>
                                                        }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {match.markets !== null ? (match.markets) instanceof Array === true ? match.markets.map(function (market, marketIndex) {
                                                return (
                                                    marketIndex === 0 && <div key={marketIndex} className="BLRetail-matchBox-content">
                                                        <div className="grid-noGutter-middle">
                                                            <div className="col-12">
                                                                <div className="grid-noGutter-top">
                                                                    {(match.htStatus !== "FT" && match.matchStatus !== "Fin") ? <div className="col-12 text-center">
                                                                        <img src={self.props.homeStore.languageCode === 'de' ? imageURLs.factIconGerman : imageURLs.factIcon} className="BLRetail-matchBox__factImage" alt="" />
                                                                    </div> : ''}
                                                                    <div className="col-12 text-center">
                                                                        {(match.htStatus !== "FT" && match.matchStatus !== "Fin") ? <div className="BLRetail-matchBox__RTB">
                                                                            {match.text && match.text !== '' ? match.text : market.text}
                                                                        </div> : ''}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {(match.htStatus !== "FT" && match.matchStatus !== "Fin") ? <div className="col-12 text-center">
                                                                <button className="btn BLRetail-btnOdds">
                                                                    <div className="BLRetail-btnOdds__outCome">{market.marketName} {market.outcomeName} {market.subMarketName !== '' ? market.subMarketName : ''}</div>
                                                                    <div className="BLRetail-btnOdds__odds">{market.oddsDecimal}</div>
                                                                </button>
                                                            </div> :
                                                                match.matchStatus === "Fin" ? <div className="BLRetail-matchBox__liveScoreBox">
                                                                    <div className="BLRetail-matchBox__liveScore BLRetail-matchBox__liveStatus">{match.matchStatus === "Fin" ? "Result" : ''}</div>
                                                                    <div className="BLRetail-matchBox__liveScore text-center">
                                                                        <div className="col-8">
                                                                            <div className="BLRetail-matchBox-tennisLiveScoreContent">
                                                                                <div className="BLRetail-matchBox-tennisLiveScore mb-5">
                                                                                    {match.score.split(' ').map(function (item, index) {
                                                                                        index = index + 1;
                                                                                        return (
                                                                                            <span key={index}>
                                                                                                {/* <span className="BLRetail-matchBox_setScore">{item.split('-')[0]}</span> */}
                                                                                                <span className="BLRetail-matchBox_setScore">{item.split('-')[0]}</span>
                                                                                            </span>
                                                                                        )
                                                                                    })
                                                                                    }
                                                                                </div>
                                                                                <div className="BLRetail-matchBox-tennisLiveScore">
                                                                                    {match.score.split(' ').map(function (item, index) {
                                                                                        index = index + 1;
                                                                                        return (
                                                                                            <span key={index}>
                                                                                                <span className="BLRetail-matchBox_setScore">{item.split('-')[1]}</span>
                                                                                            </span>
                                                                                        )
                                                                                    })
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                    : <div className="BLRetail-matchBox__liveScoreBox">
                                                                        {match.htStatus === "FT" ? <div className="BLRetail-matchBox__liveScore BLRetail-matchBox__liveStatus">{"F T"}</div> : ''}
                                                                        <div className="BLRetail-matchBox__liveScore text-center">{match.score.split('-')[0]} - {match.score.split('-')[1]}</div>
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                                )

                                            }) : <div className="BLRetail-matchBox-content">
                                                    <div className="grid-noGutter-middle">
                                                        <div className="col-12">
                                                            <div className="grid-noGutter-top">
                                                                {(match.htStatus !== "FT" && match.matchStatus !== "Fin") ? <div className="col-12 text-center">
                                                                    <img src={self.props.homeStore.languageCode === 'de' ? imageURLs.factIconGerman : imageURLs.factIcon} className="BLRetail-matchBox__factImage" alt="" />
                                                                </div> : ''}
                                                                <div className="col-12 text-center">
                                                                    {(match.htStatus !== "FT" && match.matchStatus !== "Fin") ? <div className="BLRetail-matchBox__RTB">
                                                                        {match.text && match.text !== '' ? match.text : match.markets.marketName}
                                                                    </div> : ''}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {(match.htStatus !== "FT" && match.matchStatus !== "Fin") ? <div className="col-12 text-center">
                                                            <button className="btn BLRetail-btnOdds">
                                                                {match.markets.selection ? <div className="BLRetail-btnOdds__outCome">{match.markets.marketName} {match.markets.selection[0].outcomeName} {match.markets.selection[0].subMarketName !== '' ? match.markets.selection[0].subMarketName : ''}</div> :
                                                                    <div className="BLRetail-btnOdds__outCome">{match.markets.marketName} {match.markets.outcomeName} {match.markets.subMarketName !== '' ? match.markets.subMarketName : ''}</div>}
                                                                {match.markets.selection ? <div className="BLRetail-btnOdds__odds">{match.markets.selection[0].oddsDecimal}</div> :
                                                                    <div className="BLRetail-btnOdds__odds">{match.markets.oddsDecimal}</div>}
                                                            </button>
                                                        </div> :
                                                            match.matchStatus === "Fin" ? <div className="BLRetail-matchBox__liveScoreBox">
                                                                <div className="BLRetail-matchBox__liveScore BLRetail-matchBox__liveStatus">{match.matchStatus === "Fin" ? "Finished" : ''}</div>
                                                                <div className="BLRetail-matchBox__liveScore text-center">{match.score.split('-')[0]} - {match.score.split('-')[1]}</div>
                                                            </div>
                                                                : <div className="BLRetail-matchBox__liveScoreBox">
                                                                    {match.htStatus === "FT" ? <div className="BLRetail-matchBox__liveScore BLRetail-matchBox__liveStatus">{"F T"}</div> : ''}
                                                                    <div className="BLRetail-matchBox__liveScore text-center">{match.score.split('-')[0]} - {match.score.split('-')[1]}</div>
                                                                </div>
                                                        }
                                                    </div>
                                                </div> : ''}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })

        )
    };

    render() {
        const { homeStore } = this.props;
        const items = this.galleryItems();
        // console.log('homeStore.autoPlayTime ====== ', homeStore.autoPlayTime);
        return (
            <IntlProvider locale={homeStore.languageCode} messages={messages[homeStore.languageCode]}>
            <div>
                <div className="BLRetail-inFocus">
                    <Header homeStore={homeStore} />
                    <div className="BLRetail-inFocus-content">
                        <div className="BLRetail-matchBoxGroup BLRetail-matchBoxGroup-carousel">
                            {homeStore.finalArray1.length > 0 ?
                                <AliceCarousel
                                    items={items}
                                    // duration={400}
                                    // fadeOutAnimation={false}
                                    // mouseDragEnabled={homeStore.mouseDragging}
                                    // // responsive={this.responsive}
                                    // stagePadding={this.stagePadding}
                                    // onSlideChange={this.onSlideChange.bind(this)}
                                    // // onSlideChanged={this.onSlideChanged.bind(this)}
                                    // onSlideChanged={(e) => console.debug('onSlideChanged ===== ', e)}
                                    // onResized={(e) => this.setState(e)}
                                    // onInitialized={(e) => this.setState(e)}
                                    // // startIndex={this.state.currentIndex}
                                    // // slideToIndex={this.state.currentIndex}
                                    // stopAutoPlayOnHover={false}
                                    // autoPlayDirection="ltr"
                                    // // autoPlayInterval={homeStore.autoPlayTime}
                                    // autoPlayInterval={30000}
                                    // autoPlay={homeStore.autoPlayCarousel}
                                    // infinite={true}
                                    // showArrows={false}
                                    // dotsDisabled={true}
                                    // buttonsDisabled={true}
                                    // showSlideInfo={false}
                                    // // swipeDisabled={true}

                                    // responsive={this.responsive}

                                    // fadeOutAnimation={false}
                                    // mouseDragEnabled={homeStore.mouseDragging}
                                    // stagePadding={this.stagePadding}
                                    // onSlideChanged={this.onSlideChanged.bind(this)}
                                    // autoPlayInterval={60000}
                                    // onResized={(e) => this.setState(e)}
                                    // onInitialized={(e) => this.setState(e)}
                                    // stopAutoPlayOnHover={false}
                                    // autoPlayDirection="ltr"
                                    // autoPlayInterval={30000}
                                    // autoPlay={homeStore.autoPlayCarousel}
                                    // playButtonEnabled ={false}
                                    // infinite={true}
                                    // showArrows={false}
                                    // dotsDisabled={true}
                                    // buttonsDisabled={true}
                                    // showSlideInfo={false}
                                    // startIndex={this.state.currentIndex}
                                    // // onSlideChange={this.onSlideChange}


                                    responsive={this.responsive}
                                    // autoPlayInterval={60000}
                                    autoPlayInterval={homeStore.autoPlayTime}
                                    // autoPlayDirection="rtl"
                                    // autoPlay={true}
                                    autoPlay={homeStore.autoPlayCarousel}
                                    stopAutoPlayOnHover={false}
                                    fadeOutAnimation={false}
                                    mouseDragEnabled={homeStore.mouseDragging}
                                    swipeDisabled={homeStore.swipeDisabling}
                                    playButtonEnabled={false}
                                    buttonsDisabled={true}
                                    disableAutoPlayOnAction={true}
                                    // onSlideChange={this.onSlideChange}
                                    startIndex={this.state.currentIndex}
                                    playButtonEnabled={false}
                                    dotsDisabled={true}
                                    showArrows={false}
                                    showSlideInfo={false}
                                    onSlideChanged={this.onSlideChanged.bind(this)}
                                >
                                </AliceCarousel>


                                // <AliceCarousel
                                //     items={items}
                                //     duration={400}
                                //     showSlideInfo={true}
                                //     fadeOutAnimation={false}
                                //     mouseDragEnabled={homeStore.mouseDragging}
                                //     responsive={this.responsive}
                                //     stagePadding={this.stagePadding}
                                //     onSlideChanged={(e) => console.debug('onSlideChanged ===== ', e)}
                                //     onResized={(e) => this.setState(e)}
                                //     onInitialized={(e) => this.setState(e)}
                                //     stopAutoPlayOnHover={false}
                                //     // autoPlayDirection
                                //     // autoPlayInterval={homeStore.autoPlayTime}
                                //     autoPlayInterval={60000}
                                //     // autoPlayInterval={homeStore.autoPlayTime}
                                //     autoPlay={homeStore.autoPlayCarousel}
                                //     infinite={true}
                                //     showArrows={false}
                                //     dotsDisabled={true}
                                //     buttonsDisabled={true}
                                //     startIndex={this.state.currentIndex}
                                //     // slideToIndex={1}
                                //     showSlideInfo={false}
                                //     onSlideChange={this.slideChange.bind(this)}
                                // >

                                // </AliceCarousel>
                                : ''}
                        </div>
                    </div>
                </div>
            </div>
            </IntlProvider>
        )
    }
}

export default HomePage;
