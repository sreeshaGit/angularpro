var React = require('react');
var ReactBootstrap = require('react-bootstrap');
//var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
//var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
var Popover = require('react-bootstrap/lib/Popover');
var Overlay = require('react-bootstrap/lib/Overlay');
module.exports =  React.createClass({
    getInitialState: function () {
        return {                
            LastHomeResult: [],
            LastAwayResult: [],
            LastResultdates: [],
            HometeamId: 0,
            AwayteamId: 0,
            hidelastthree:false,
            AwayTitle:'',
            H2Htitle:'',
            HomeTitle:'', 
            HomeTeamName:'',
            AwayTeamName:'',
            selectedMatchid:0,
            gotdata:false
        };
    },

    componentWillMount: function () {        
        var self = this;       
        var myservice = setInterval(function(){  
            if(self.props.HomeTeamId !="" && self.props.HomeTeamId!=null && self.props.AwayTeamId!="" && self.props.AwayTeamId!=null){
                self.serverRequest = $.get("https://widgets.bettorlogic.com/BetwayleagueviewService/BetwayService.svc/GetLastNGamesResult?" + "HomeTeamID=" +self.props.HomeTeamId + "&" + "AwayTeamID=" + self.props.AwayTeamId+"&"
                +"ln="+self.props.langauageparam , function (result) {
                    if (typeof result != 'object') {
                        result = JSON.parse(result)
                    }
                    if(result.GameResult.H2H.length>0||result.GameResult.Away>0||result.GameResult.Home>0||result.GameResult.H2H.length!=null||result.GameResult.Away!=null||result.GameResult.Home!=null){
                        clearInterval(myservice);
                        self.setState({ LastHomeResult: result.GameResult.Home, LastAwayResult: result.GameResult.Away, LastResultdates: result.GameResult.H2H,AwayTitle:result.GameResult.AwayTitle,H2Htitle:result.GameResult.H2Htitle,HomeTitle:result.GameResult.HomeTitle,HomeTeamName:result.GameResult.HomeTeamName,AwayTeamName:result.GameResult.AwayTeamName })
                        if(result.GameResult.H2H.length<=0){
                            self.setState({hidelastthree:true })
                        }                        
                    }
                    self.setState({gotdata:true})
                }.bind(this));
            }
            
        }, 3000);
    },
    showdiv: function (Matchid,teamResult) {  
        //ga('send','event','League.SoccerWidget','LeagueTable.GameResultsType',teamResult); 
        //ga('BL.send','event','League.SoccerWidget','LeagueTable.GameResultsType',teamResult);
        console.log(Matchid)
        var matid = this.state.selectedMatchid     
        if (matid == Matchid) {
            //alert("same")
            this.setState({ selectedMatchid:0})
        }
        else {         
            this.setState({ selectedMatchid: Matchid })
        }                                                        
    },
    render: function () {
        var self = this;
        return (
            <div>                    
                {this.state.gotdata?<div className="blbw-head2head">
                   { !this.state.hidelastthree?  <div className="team-last10-box">
                    <div className="team-title">{this.state.HomeTeamName}  vs {this.state.AwayTeamName}
                    </div>
                            <div className="last-10-games no-padding-bottom">
                                <div className="row">
                                    <div className="last10-txt">{this.state.H2Htitle}</div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        {this.state.LastResultdates.map(function (itm, ind) {
                                            return <div className="blbw-label-date" key={ind}>{itm.HomeTeam+" "+ itm.HomeScore +" - "+ itm.AwayScore + " "+ itm.AwayTeam +" "+ itm.Matchdate}</div>
                                        })
                                        }
                                    </div>
                                </div>
                            </div>
                     </div>:''}
                            <div className="team-last10-box">
                                <div className="team-title">{this.state.HomeTeamName}
                                </div>
                                <div className="last-10-games no-padding-bottom">
                                    <div className="row">
                                        <div className="last10-txt">{this.state.HomeTitle}</div>
                                    </div>
                                        <div className="row">
                                        <div className="col-lg-12">
                                            {this.state.LastHomeResult.map(function (itm, ind) {
                                                
                                                return <button key={ind} onClick={self.showdiv.bind(null, itm.Matchid,itm.teamResult) } className={itm.TeamResult == "W" ? self.state.selectedMatchid == itm.Matchid ?"box-20 bg-win active":"box-20 bg-win" : itm.TeamResult == "D" ? self.state.selectedMatchid == itm.Matchid?"box-20 bg-draw active":"box-20 bg-draw" : itm.TeamResult == "L" ?self.state.selectedMatchid == itm.Matchid? "box-20 bg-loose active" : "box-20 bg-loose" :""}>{itm.TeamResult == "W" ? "W" : itm.TeamResult == "D" ? "D" : itm.TeamResult == "L" ? "L" : ''}</button>
                                                
                                                })
                                                }
                                                                                                        </div>
                                                </div>
                                                
                                                    {
                                                        this.state.LastHomeResult.map(function (itm, ind) {
                                                            return    <div className="row" key={ind}>
                                                                {self.state.selectedMatchid == itm.Matchid ?<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="last10-matchdetails">
                                                            <div className="row">
                                                             <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-right blbw-hometeam">
                                                                    {/*   <img src="/images/home-team.png" />*/}
                                                                </div>
                                                                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-center">
                                                                        <div className="blbw-match-name  margin-top-5">{itm.HomeTeam + " - " + itm.AwayTeam}</div>
                                                                    <div className="blbw-match-name">{itm.HomeScore + " - " + itm.AwayScore}</div>
                                                                    <div className="fixture-time">{itm.Matchdate}</div>
                                                                </div>
                                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 blbw-awayteam text-left">
                                                                    {/* <img src="/images/away-team.png" />*/}
                                                                </div>
                                                            </div>
                                                        </div>
                                                                          </div> : ''}
                                                            </div>

                                                        })
                                                    }
                                                
                                                </div>
                                                </div>
                                                <div className="team-last10-box">
                                                <div className="team-title">{this.state.AwayTeamName}
                                                </div>
                                                <div className="last-10-games no-padding-bottom">
                                                <div className="row">
                                                    <div className="last10-txt">{this.state.AwayTitle}</div>
                                                </div>
                                                    <div className="row">
                                                    <div className="col-lg-12">
                                                        
                                                    {this.state.LastAwayResult.map(function (itm, ind) {
                                                
                                                        return <button key={ind} onClick={self.showdiv.bind(null, itm.Matchid,itm.teamResult) } className={itm.TeamResult == "W" ? self.state.selectedMatchid == itm.Matchid ?"box-20 bg-win active":"box-20 bg-win" : itm.TeamResult == "D" ?self.state.selectedMatchid == itm.Matchid ? "box-20 bg-draw active":"box-20 bg-draw" : itm.TeamResult == "L" ?self.state.selectedMatchid == itm.Matchid ? "box-20 bg-loose active":"box-20 bg-loose" : '' }>{itm.TeamResult == "W" ? "W" : itm.TeamResult == "D" ? "D" : itm.TeamResult == "L" ? "L" : ''}</button>
                                                
                                                    })
                                                    }
                                                    
                                                                                                        </div>
                                                </div>
                                                    {
                                                        this.state.LastAwayResult.map(function (itm, ind) {
                                                            return    <div className="row" key={ind}>
                                                                {self.state.selectedMatchid == itm.Matchid ?<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="last10-matchdetails">
                                                            <div className="row">
                                                             <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-right blbw-hometeam">
                                                                    {/*   <img src="/images/home-team.png" />*/}
                                                                </div>
                                                                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-center">
                                                                        <div className="blbw-match-name  margin-top-5">{itm.HomeTeam + " - " + itm.AwayTeam}</div>
                                                                    <div className="blbw-match-name">{itm.HomeScore + " - " + itm.AwayScore}</div>
                                                                    <div className="fixture-time">{itm.Matchdate}</div>
                                                                </div>
                                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 blbw-awayteam text-left">
                                                                    {/* <img src="/images/away-team.png" />*/}
                                                                </div>
                                                            </div>
                                                        </div>
                                                                          </div> : ''}
                                                            </div>

                                                        })
                                                    }
                                                </div>
                                                </div>
               
                                                </div>:''}
                                                </div>

                                                    )
}
});