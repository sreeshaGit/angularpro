
var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var $ = require("jquery");
var Headtohead= require('./Headtohead.js');
var Lineup= require('./Lineup.js');
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
var Popover = require('react-bootstrap/lib/Popover');
var Overlay = require('react-bootstrap/lib/Overlay');
//var  eventId=1119100
//function getParameterByName(name, url) {
//    if (!url) url = window.location.href;
//    name = name.replace(/[\[\]]/g, "\\$&");
//    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//        results = regex.exec(url);
//    if (!results) return null;
//    if (!results[2]) return '';
//    return decodeURIComponent(results[2].replace(/\+/g, " "));
//}
//eventId = getParameterByName('eventid');
//console.log("eventID============",eventId)
module.exports =  React.createClass({
    getInitialState: function () {
        return {
            showh2h: true,
            showteam:false,           
            showstat:'',           
            showcomm:false,
            stats:false,
            showgamestat:false,
            stath2h:false,
            statteam:false,
            hideteams:false,
            addbethome:'-',
            addbetaway:'-',
            show: false,
            commentclick:false,
            Commentary:[],
            lastmincommentary:[]
            
        };
    },   
    componentWillMount: function () {
        var self=this
        if(self.props.MatchInfo.isLive==1){
        this.serverRequest = $.get("https://widgets.bettorlogic.com/BetwayEventViewService/Stats24MatchBetdata.svc/GetCommentary?"+ "matchID=" + this.props.MatchInfo.Eventcode, function (result) {         
            if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
            self.setState({Commentary:result.Commentary, lastmincommentary:result.Commentary[0]})          
        }.bind(this)); 
       
         }   
    },
    componentDidMount: function () {       
        // code to refresh the service for every one minute
        this.timer = setInterval(this.updateState, 60000);              
    },
    updateState: function () {
        this.componentWillMount();
    },
      
    headtohead: function (direction) {       
        if (direction == 'left') {        
            this.setState({ showh2h: !this.state.showh2h })
            this.setState({ showteam: false })                     
        }
       
        if (direction == 'right') {
            this.setState({ showteam: !this.state.showteam })
            this.setState({ showh2h: false })
        }        
    },
    
    addtobetslip: function (betfrom,eventcode,id,mktid,selectionid) {  
        
        var self = this; 
        if(betfrom=='home'){   
            ga('send', 'event', 'Eventview.SoccerWidget', 'EventView.Home.OddsClick', eventcode);
            ga('BL.send', 'event', 'Eventview.SoccerWidget', 'EventView.Home.OddsClick', eventcode);
            var homecode=this.state.addbethome;  
            if (homecode == id) {           
                this.setState({ addbethome:0})                           
                this.setState({ show: !this.state.show }) 
            }
            else {     
                //self.refs.pop.show()
                //setTimeout(function () { self.refs.pop.hide(); }, 2000)
                this.setState({ addbethome:id })
                if(SpinSport.Host){
                    SpinSport.Host.Sports.AddOutcomeToBetslip(selectionid)
                }
                else{
                    var msgdata = {
                        'outcomeId': selectionid,
                        'marketId': mktid,
                        'eventId': eventcode,                   
                        'ismulti':false
                    }                   
                    parent.postMessage(JSON.stringify(msgdata), "*");    
                }
            }         
             
        }
        else if(betfrom=='away'){    
            ga('send', 'event', 'Eventview.SoccerWidget', 'EventView.Away.OddsClick', eventcode);
            ga('BL.send', 'event', 'Eventview.SoccerWidget', 'EventView.Away.OddsClick', eventcode);
            var awaycode=this.state.addbetaway;  
            if (awaycode == id) {           
                this.setState({addbetaway:0})                          
                this.setState({ show: !this.state.show })  
            }
            else { 
                //self.refs.popover.show()
                //setTimeout(function () { self.refs.popover.hide(); }, 2000)
                this.setState({ addbetaway:id })
                if(SpinSport.Host){
                    SpinSport.Host.Sports.AddOutcomeToBetslip(selectionid)
                }
                else{
                    var msgdata = {
                        'outcomeId': selectionid,
                        'marketId': mktid,
                        'eventId': eventcode,                   
                        'ismulti':false
                    }
                    parent.postMessage(JSON.stringify(msgdata), "*");   
                }
            }
            
        }             
    },
    marqueeStop:function(){        
        document.getElementById('marquee').stop();
    },
    marqueeStart:function(){     
        document.getElementById('marquee').start();
    },   
    loadcommentary:function(){          
        ga('send', 'event', 'Eventview.SoccerWidget', '	EventView.ScrollingClickCommentary');
        ga('BL.send', 'event', 'Eventview.SoccerWidget', 'EventView.ScrollingClickCommentary');
        this.setState({  commentclick:!this.state.commentclick})
        },
    render: function () {             
        var self = this;     
        var liveTxt = {"fontSize":"10px"}
        return (
           <div>           
               <div className="bw-content">       
                   <div className="blbw-eventview-pregame">
                       <div className="blbw-match-fixture">
                           <div className="row">
                               <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 blbw-hometeam">
                                  {/* <img src="images/home-team.png" alt="Home Team Image" />*/}
                                   <span className="blbw-hometeam-name">{this.props.homeName}</span>
                               </div>
                               <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center">
                                   {this.props.MatchInfo.isLive==1?<div className="blbw-live-score">{this.props.MatchInfo.MatchMinute}'</div> :<div className="fixture-time">{this.props.MatchInfo.MatchDate} <br/>{this.props.MatchInfo.MatchTime}</div>}                            
                               </div>
                               <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 blbw-awayteam text-right">
                                   <span className="blbw-hometeam-name">{this.props.awayName}</span>
        {/* <img src="images/away-team.png" alt="Home Team Image" />  */}                                          
        </div>
      </div>
 </div>
        {this.props.MatchInfo.isLive==null?'': <div className="blbw-match-rtb">
    <div className="row">
        <table className="rtb-table">
            <tbody>
           {this.props.Home.HomeFractionalOdds !=null && this.props.Home.HomeFractionalOdds!=0? <tr>
                <td width="75%">
                    {/*<div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                            <OverlayTrigger trigger={['hover','focus']}
                                shouldUpdatePosition={true}
                                placement={"top"}                                                                              
                                overlay={
                                <Popover id="popover-tip">
                                    <div className="tip">{this.props.Home.HomeText}</div>
                                </Popover>
                                }>
                                <div className="blbw-probabulity" tabIndex="0" role="button" >                                         
                                           <div className="blbw-prob-txt">show probability</div>
                                       </div>
                            </OverlayTrigger>
                        </div>
                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                            <div className="market green">{this.props.Home.HomeMarketName}</div> 
                            <div style={liveTxt}>{this.props.MatchInfo.isLive==1?this.props.Home.HomeText:''}</div>
                        </div>
                    </div>*/} 
                    <div className="market">{this.props.Home.HomeMarketName}</div> 
                    {/*<div style={liveTxt}>{this.props.MatchInfo.isLive==1?this.props.Away.AwayText:''}</div>*/}
                    <div className="event-tip">
                        <div className="green">{this.props.Home.HomeText}</div>                        
                    </div>
                </td>
               <td className={this.state.addbethome==this.props.Home.HomeTeamId?"rtb-odds active":"rtb-odds"} onClick={self.addtobetslip.bind(null,'home',this.props.MatchInfo.Eventcode,this.props.Home.HomeTeamId,this.props.Home.HomeBookMakerMarketid,this.props.Home.HomeBookMakerSelectionid )}>
                   
                        <div className="pop-odds">{this.props.parentThis.state.homeOdds}</div>
                 </td>                                
            
    </tr>:<tr></tr>}
        {this.props.Away !=null && this.props.Away.AwayFractionalOdds !=null && this.props.Away.AwayFractionalOdds !=0?<tr>
        <td width="75%">
            {/*<div className="row">
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                    <OverlayTrigger trigger={['hover','focus']}
                        shouldUpdatePosition={true}
                        placement={"top"}                                                                               
                        overlay={
                        <Popover id="popover-tip">
                            <div className="tip">{this.props.Away.AwayText}</div>
                        </Popover>
                        }>
                        <div className="blbw-probabulity" tabIndex="0" role="button" >                                         
                                           <div className="blbw-prob-txt">show probability</div>
                                       </div>
                    </OverlayTrigger>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="market">{this.props.Away.AwayMarketName}</div> 
                    <div style={liveTxt}>{this.props.MatchInfo.isLive==1?this.props.Away.AwayText:''}</div>

                </div>
            </div> */}
            <div className="market">{this.props.Away.AwayMarketName}</div> 
            {/*<div style={liveTxt}>{this.props.MatchInfo.isLive==1?this.props.Away.AwayText:''}</div>*/}
            <div className="event-tip">
                <div className="green">{this.props.Away.AwayText}</div>
                
            </div>
        </td>
      
    <td className={this.state.addbetaway==this.props.Away.AwayTeamId?"rtb-odds active":"rtb-odds"} onClick={self.addtobetslip.bind(null,'away',this.props.MatchInfo.Eventcode,this.props.Away.AwayTeamId,this.props.Away.AwayBookMakerMarketid,this.props.Away.AwayBookMakerSelectionid )}>
       
            <div className="pop-odds">{this.props.parentThis.state.awayOdds}</div>
        </td>

        </tr>:<tr></tr>}
        {(this.props.Home.HomeFractionalOdds ==null || this.props.Home.HomeFractionalOdds==0) && (this.props.Away.AwayFractionalOdds == null || this.props.Away.AwayFractionalOdds ==0) && (this.props.MatchInfo.isLive == 1)?<tr className="blbw-match-rtb-static"><td>Analysis will be updated every five minutes or whenever a goal is scored</td></tr>:<tr></tr>}
                      </tbody>        
                </table>
                </div>
                </div>}
            {this.props.MatchInfo.isLive==1?this.state.Commentary.length>0?<div className="row blbw-tip-scroller">               
            <div className="bw-marquee marquee-commentary">
                <marquee   id="marquee" onMouseOver={this.marqueeStop} onMouseOut={this.marqueeStart} onClick={this.loadcommentary}>{this.state.lastmincommentary.minute+"' - "+this.state.lastmincommentary.comment}</marquee>            
            </div>
                {this.state.commentclick? <div className="live-commentary">
                <table>
                <tbody>
                    {this.state.Commentary.map(function (itm, ind) {   
                        return <tr key={ind}>
                            <td>{itm.minute+"'"}</td>
                            <td>{itm.comment} </td>                                
                        </tr>
                    })
                    }  
                    </tbody>
                </table>           
            </div>:''}
        </div>:'': (this.props.Home.HomeFractionalOdds !=null && this.props.Home.HomeFractionalOdds!=0) && (this.props.Away.AwayFractionalOdds != null && this.props.Away.AwayFractionalOdds !=0)?<div className="row blbw-tip-scroller">
            <div className="stats-attak">
                <img src="https://widgets.bettorlogic.com/sportsWidgets/images/stats.png" alt="Stats" />
            </div>
            <div className="bw-marquee left-skew">
             <marquee  id="marquee" onMouseOver={this.marqueeStop} onMouseOut={this.marqueeStart}>{this.props.Home.HomeText} <span>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;</span> {this.props.Away.AwayText}</marquee>                        
            </div>
        </div>:''}
            
             {(this.props.MatchInfo.isLive==0) && (this.props.Home.HomeFractionalOdds !=null && this.props.Home.HomeFractionalOdds!=0) && (this.props.Away.AwayFractionalOdds != null && this.props.Away.AwayFractionalOdds !=0)?  <div className="blbw-prematch-h2h">
                                         <div className="row"><div className="space-5"></div></div>
                                         <div className="border-bottom" >
                                             <div className="row" >
                                                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                                     <button className={!this.state.showh2h ? "btn blbw-btn tab-btn" : "btn blbw-btn tab-btn active"} data-target="#head2head" data-toggle="tab-pane" onClick={self.headtohead.bind(null, 'left')}>{this.props.parentThis.state.staticdata.Head_to_Head}</button>
                                                     <button className={!this.state.showteam ?this.state.hideteams?"btn blbw-btn tab-btn disabled":"btn blbw-btn tab-btn":this.state.hideteams?"btn blbw-btn tab-btn disabled":"btn blbw-btn tab-btn active"} data-target="#teams" data-toggle="tab-pane" onClick= {self.headtohead.bind(null, 'right')}>{this.props.parentThis.state.staticdata.Teams}</button>
                                                 </div>                                            
                                             </div>
                                             <div className="row"><div className="space-5"></div></div>
                                         </div>                                    
                                         <div className="row">
                                             <div className="tab-content">
                                                 <div className={this.state.showh2h ? "tab-pane active" : "tab-pane" } id="head2head">                                
                                                      <Headtohead  HomeTeamId={this.props.Home.HomeTeamId} AwayTeamId={this.props.Away.AwayTeamId} staticdata={this.props.parentThis.state.staticdata} langauageparam={this.props.parentThis.state.languageparam}/>                            
                                                 </div>
                                                 <div className={this.state.showteam ? "tab-pane active" : "tab-pane" } id="teams" >                             
                                                     <Lineup eventcode={this.props.parentThis.state.urlparamEC} staticdata={this.props.parentThis.state.staticdata} langauageparam={this.props.parentThis.state.languageparam} self={this}/>
                                                 </div>
                                             </div>
                                         </div>
                                     </div>:''}
                                 </div>                                             
						
                             </div>
       
                         </div>
    )
                                    }
            });