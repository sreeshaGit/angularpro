var React = require('react');
var $ = require("jquery");
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
var Popover = require('react-bootstrap/lib/Popover');
var Overlay = require('react-bootstrap/lib/Overlay');
var Carousel = require('react-bootstrap/lib/Carousel');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var MenuItem = require('react-bootstrap/lib/MenuItem');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Dropdown = require('react-bootstrap/lib/Dropdown');
var DropdownMenu = require('react-bootstrap/lib/DropdownMenu');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            showLineUp: "Home",
            hLineups:[],
            aLineups: [],
            hSubstitutes: [],
            aSubstitutes: [],
            playinfo: {},            
            hDefender:[],
            hMidfield:[],
            hGK:{},
            hStriker:[],
            aDefender:[],
            aMidfield:[],
            aGK:{},
            aStriker:[],
            playerstats:[],
            showprofile:'',
            hideteam:false,
            HomeManagername:'',
            AwayManagername:'',
        };
    },
    componentWillMount: function () {
        var self=this;
        this.serverRequest = $.get("https://widgets.bettorlogic.com/BetwayEventViewService/Stats24MatchBetdata.svc/getlineups?"+"matchID="+self.props.eventcode, function (result) {
            // console.log("Result---------------------------------------------",result)
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
        
            //  console.log("sstep123--------")
               
            if(result.Home.CoachName!=null||result.Away.CoachName!=null){
                self.setState({HomeManagername:result.Home.CoachName,AwayManagername:result.Away.CoachName})
            }
            if(result.Away.Lineups!=null||result.Home.Lineups!=null){
           
         
                if(result.Away.Lineups.length==11&&result.Home.Lineups.length==11){
                    var alDetails = [];
                    //  console.log("sstep12--------",alDetails.length)
                    for(var i=0;i<result.Away.Lineups.length;i++){
                        var findIndex=-1
                        //  console.log("sstep1--------")
                        for(var j=0;j<alDetails.length;j++){
                            //  console.log("sstep2--------")
                            if(alDetails[j][0]==result.Away.Lineups[i]["Position"]){
                                findIndex= j;
                                break;
                            }
                        }
                        if(findIndex!=-1){
                            //    console.log("sstep3--------",findIndex)
                            //    console.log(alDetails[findIndex][1])
                            alDetails[findIndex][1].push(result.Away.Lineups[i])
                        }
                        else{
                            //  console.log("sstep4--------")
                            var newary = new Array(2)
                            newary[0] = result.Away.Lineups[i]["Position"];
                            newary[1] = [result.Away.Lineups[i]];
                            alDetails.push(newary)
                    
                        }
                    }

                    var hlDetails = [];
                    // console.log("sstep12--------",alDetails.length)
                    for(var i=0;i<result.Home.Lineups.length;i++){
                        var findIndex=-1
                        //  console.log("sstep1--------")
                        for(var j=0;j<hlDetails.length;j++){
                            //  console.log("sstep2--------")
                            if(hlDetails[j][0]==result.Home.Lineups[i]["Position"]){
                                findIndex= j;
                                break;
                            }
                        }
                        if(findIndex!=-1){
                            //   console.log("sstep3--------",findIndex)
                            //   console.log(alDetails[findIndex][1])
                            hlDetails[findIndex][1].push(result.Home.Lineups[i])
                        }
                        else{
                            //console.log("sstep4--------")
                            var newary = new Array(2)
                            newary[0] = result.Home.Lineups[i]["Position"];
                            newary[1] = [result.Home.Lineups[i]];
                            hlDetails.push(newary)
                    
                        }
                    }
                    //  console.log("alDetails=================",alDetails)
                    // console.log("hlDetails=================",hlDetails)
                    var hDefender=[],hMidfield=[],hGK,hStriker=[],aDefender=[],aMidfield=[],aGK,aStriker=[];
                    for(var i=0;i<hlDetails.length;i++){
                        if(hlDetails[i][0]=="Defender"){
                            hDefender=hlDetails[i][1];
                        }
                        else if(hlDetails[i][0]=="Midfield"){
                            hMidfield=hlDetails[i][1];
                        }
                        else if(hlDetails[i][0]=="Striker"){
                            hStriker=hlDetails[i][1]
                        }
                        else if(hlDetails[i][0]=="gk"){
                            hGK = hlDetails[i][1][0]
                            //  console.log("hGK====================",hGK)
                        }
                    }
                
                    // console.log("hGK=========================",hGK)
                    for(var i=0;i<alDetails.length;i++){
                        if(alDetails[i][0]=="Defender"){
                            aDefender=alDetails[i][1]
                        }
                        else if(alDetails[i][0]=="Midfield"){
                            aMidfield=alDetails[i][1];
                        }
                        else if(alDetails[i][0]=="Striker"){
                            aStriker=alDetails[i][1];
                            // console.log("aStriker=====================",aStriker)
                        }
                        else if(alDetails[i][0]=="gk"){
                            aGK = alDetails[i][1][0]
                        }
                    }
                    // console.log("----------------------------------------------------------")
                    // console.log("aMidfield==",aMidfield)
                    //console.log("hDefender=============",hDefender)
                    self.setState({ hLineups: result.Home.Lineups, aLineups: result.Away.Lineups, hSubstitutes: result.Home.Substitutes, aSubstitutes: result.Home.Substitutes,hDefender:hDefender,hMidfield:hMidfield,hGK:hGK,hStriker:hStriker,aDefender:aDefender,aMidfield:aMidfield,aGK:aGK,aStriker:aStriker })
                }
                else{
                    self.setState({hideteam:true })
                    this.props.self.setState({hideteams:true})
                }
            } 
            else{
                self.setState({hideteam:true })
                this.props.self.setState({hideteams:true})
            }
        }.bind(this));
      
    },
    componentDidMount: function () {
        // code to refresh the service for every one minute
        this.timer = setInterval(this.updateState, 60000);  
        /*$('[data-toggle="popover"]').popover()*/             
        $('[data-toggle="btn-tabs-lineup"] .btn-tabs-lineup').on('click', function () {
            //alert("script ok");
            var $this = $(this);
            $this.parent().find('.active').removeClass('active');
            $this.addClass('active');
        });
         
    },
    updateState: function () {
        this.componentWillMount();
    },

    changeShowLineup: function (lineups) {
        //  console.log("changeShowLineup==================================")
        this.setState({ "showLineUp": lineups })
    },
    playerInfo: function (pfrom,compiid,pid) {
    	
    	this.setState({showprofile:'profile'})
        if(this.state.showLineUp == pfrom){
            //var info = { show: true }
            this.serverRequest = $.get("https://widgets.bettorlogic.com/BetwayEventViewService/Stats24MatchBetdata.svc/Getplayerinfo?" + "playerid=" +pid+ "&" + "CompitetorID=" +compiid, function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                // console.log(result[0])
                this.setState({playinfo:result[0]})
                //self.setState({ LastHomeResult: result.GameResult.Home, LastAwayResult: result.GameResult.Away,LastResultdates: result.GameResult.H2H })
            }.bind(this)); 
            this.serverRequest = $.get("https://widgets.bettorlogic.com/BetwayEventViewService/Stats24MatchBetdata.svc/GetPlayerstats?"+"PlayerID="+pid+"&"+"MatchID="+this.props.eventcode+"&"+"ln="+this.props.langauageparam, function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }           
                this.setState({playerstats:result})          
            }.bind(this));     
            
        }
        
    },
    closePlayerInfo: function () {
        var info = {}
        this.setState({ playinfo: info })
    },
    Playerprofile:function(direction){
        this.setState({ showprofile: direction })
    },
    render: function () {  
        var self = this;
        //var  ProgressBar = ReactBootstrap.ProgressBar;
        return (
            <div>
                {!this.state.hideteam?<div className="blbw-teams">
                                <div className="space-5"></div>
                                <div className="blbw-positions no-margin-top">
                                    <div className={this.state.showLineUp == "Home" ? "blbw-positions-hometeam active" : "blbw-positions-hometeam"}>
                                        <ul className="col-1">
                                            <li onClick={this.playerInfo.bind(null,"Home",this.state.hGK.CompitetorID,this.state.hGK.playerid)}>{this.state.hGK.JersyNumber}</li>
                                        </ul>
        {/*Defender*/}
        {this.state.hDefender.length<5?<ul className={"col-"+this.state.hDefender.length}>
            {this.state.hDefender.map(function(item,index){                                                    
                return <li onClick={self.playerInfo.bind(null,"Home",item.CompitetorID,item.playerid)}>{item.JersyNumber}</li>
            })}
        </ul>:
        <div className="col-5"><ul className={"col-3"}>
            {this.state.hDefender.map(function(item,index){
                if(index>0&&index<self.state.hDefender.length-1){
                    return <li onClick={self.playerInfo.bind(null,"Home",item.CompitetorID,item.playerid)}>{item.JersyNumber}</li>
                }
            })}
        </ul>
        <ul className={"col-2"}>
            {this.state.hDefender.map(function(item,index){
                if(index==0||index==self.state.hDefender.length-1){ 
                    return <li onClick={self.playerInfo.bind(null,"Home",item.CompitetorID,item.playerid)}>{item.JersyNumber}</li>
                }
            })}
        </ul></div>}
        {/*mid field*/}                                            
        {this.state.hMidfield.length<5?<ul className={"col-"+this.state.hMidfield.length}>
            {this.state.hMidfield.map(function(item,index){
                                                    
                return <li onClick={self.playerInfo.bind(null,"Home",item.CompitetorID,item.playerid)}>{item.JersyNumber}</li>
            })}
        </ul>:
        <div className="col-5"><ul className={"col-3"}>
            {this.state.hMidfield.map(function(item,index){
                if(index>0&&index<self.state.hMidfield.length-1){
                    return <li onClick={self.playerInfo.bind(null,"Home",item.CompitetorID,item.playerid)}>{item.JersyNumber}</li>
                }
            })}
        </ul>
        <ul className={"col-2"}>
            {this.state.hMidfield.map(function(item,index){
                if(index==0||index==self.state.hMidfield.length-1){
                    return <li onClick={self.playerInfo.bind(null,"Home",item.CompitetorID,item.playerid)}>{item.JersyNumber}</li>
                }
            })}
        </ul></div>}
        {/*Striker*/}                                            
        {this.state.hStriker.length<5?<ul className={"col-"+this.state.hStriker.length}>
            {this.state.hStriker.map(function(item,index){
                return <li onClick={self.playerInfo.bind(null,"Home",item.CompitetorID,item.playerid)}>{item.JersyNumber}</li>
            })}
        </ul>:
        <div className="col-5"><ul className={"col-3"}>
            {this.state.hStriker.map(function(item,index){
                if(index>0&&index<self.state.hStriker.length-1){
                    return <li onClick={self.playerInfo.bind(null,"Home",item.CompitetorID,item.playerid)}>{item.JersyNumber}</li>
                }
            })}
        </ul>
        <ul className={"col-2"}>
            {this.state.hStriker.map(function(item,index){
                if(index==0||index==self.state.hStriker.length-1){
                    return <li onClick={self.playerInfo.bind(null,"Home",item.CompitetorID,item.playerid)}>{item.JersyNumber}</li>
                }
            })}
        </ul></div>}
                                            
        </div>
        <div className={this.state.showLineUp == "Away" ? "blbw-positions-awayteam active" : "blbw-positions-awayteam "}>
            {/*Away Striker*/}
        {this.state.aStriker.length<5?<ul className={"col-"+this.state.aStriker.length}>
            {this.state.aStriker.map(function(item,index){
                return <li onClick={self.playerInfo.bind(null,"Away",item.CompitetorID,item.playerid)}>{item.JersyNumber}</li>
            })}
        </ul>:
        <div className="col-5"><ul className={"col-3"}>
            {this.state.aStriker.map(function(item,index){
                if(index>0&&index<self.state.aStriker.length-1){
                    return <li onClick={self.playerInfo.bind(null,"Away",item.CompitetorID,item.playerid)}>{item.JersyNumber}</li>
                }
            })}
        </ul>
        <ul className={"col-2"}>
            {this.state.aStriker.map(function(item,index){
                if(index==0||index==self.state.aStriker.length-1){
                    return <li onClick={self.playerInfo.bind(null,"Away",item.CompitetorID,item.playerid)}>{item.JersyNumber}</li>
                }
            })}
        </ul></div>}
                                            
        {/*Away Midfield*/}
        {this.state.aMidfield.length<5?<ul className={"col-"+this.state.aMidfield.length}>
            {this.state.aMidfield.map(function(item,index){
                return <li onClick={self.playerInfo.bind(null,"Away",item.CompitetorID,item.playerid)}>{item.JersyNumber}</li>
            })}
        </ul>:
        <div className="col-5"><ul className={"col-3"}>
            {self.state.aMidfield.map(function(item,index){
                if(index>0&&index<self.state.aMidfield.length-1){
                    return <li onClick={self.playerInfo.bind(null,"Away",item.CompitetorID,item.playerid)}>{item.JersyNumber}</li>
                }
            })}
        </ul>
        <ul className={"col-2"}>
            {self.state.aMidfield.map(function(item,index){
                if(index==0||index==self.state.aMidfield.length-2){
                    return <li onClick={self.playerInfo.bind(null,"Away",item.CompitetorID,item.playerid)}>{item.JersyNumber}</li>
                }
            })}
        </ul></div>}

        {/*Away Midfield*/}
        {this.state.aDefender.length<5?<ul className={"col-"+this.state.aDefender.length}>
           {this.state.aDefender.map(function(item,index){
               return <li onClick={self.playerInfo.bind(null,"Away",item.CompitetorID,item.playerid)}>{item.JersyNumber}</li>
           })}
       </ul>:
       <div className="col-5"><ul className={"col-3"}>
           {self.state.aDefender.map(function(item,index){
               if(index>0&&index<self.state.aDefender.length-1){
                   return <li onClick={self.playerInfo.bind(null,"Away",item.CompitetorID,item.playerid)}>{item.JersyNumber}</li>
               }
           })}
       </ul>
       <ul className={"col-2"}>
           {self.state.aDefender.map(function(item,index){
               if(index==0||index==self.state.aDefender.length-1){
                   return <li onClick={self.playerInfo.bind(null,"Away",item.CompitetorID,item.playerid)}>{item.JersyNumber}</li>
               }
           })}
       </ul></div>}

                                            
        <ul className="col-1">
            <li onClick={this.playerInfo.bind(null,"Away",this.state.aGK.CompitetorID,this.state.aGK.playerid)}>{this.state.aGK.JersyNumber}</li>
        </ul>
    </div>
</div>
            {Object.keys(this.state.playinfo).length ==0?<div className="blbw-lineups">
                <div className="row">
                    <div className="space-5"></div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                        <button className={this.state.showLineUp == "Home"? "btn blbw-btn btn-tabs-lineup text-center no-padding active" : "btn blbw-btn btn-tabs-lineup text-center no-padding"} data-target="#blbw-lineup-hometeam" data-toggle="tab" onClick={this.changeShowLineup.bind(null, "Home")}>{/*<img src="/images/home-team.png" alt="Home Team" width="17" />*/}{this.props.staticdata.Home} </button>
                        <button className={this.state.showLineUp == "Away" ? "btn blbw-btn btn-tabs-lineup text-center no-padding active" : "btn blbw-btn btn-tabs-lineup text-center no-padding"} data-target="#blbw-lineup-awayteam" data-toggle="tab" onClick={this.changeShowLineup.bind(null, "Away")}>{/*<img src="/images/away-team.png" alt="Away Team" width="17" />*/}{this.props.staticdata.Away} </button>
                    </div>
                    <div className="space-5"></div>
                </div>
                <div className="row">
                    <div className="tab-content">
                        <div className="tab-pane active" id="blbw-lineup-hometeam">
                            <div className="space-5"></div>
                            <div className="padding-left-10" >{this.props.staticdata.Manager}: {this.state.showLineUp == "Home"?this.state.HomeManagername:this.state.AwayManagername}</div>
                            <div className="space-5"></div>
                            <div className="padding-left-10">{this.props.staticdata.Lineup_Predicted}</div>
                            <div className="space-5"></div>
                            <div>
                                <table className="lineup-table">
                                    {this.state.hLineups.map(function (item,index) {
                                        return <tr>
                                            <td width="20%"><div className="position">{item.PositionPrefix}</div><div className="g-box">{item.JersyNumber}</div></td>
                                            <td width="80%">{item.playername}</td>
                                        </tr>
                                    })}
                                </table>
                            </div>
                            <div className="space-5"></div>
                            <div className="padding-left-10">{this.props.staticdata.Substitutes_Predicted}</div>
                            <div className="space-5"></div>
                            <div>
                                <table className="lineup-table">
                                    {this.state.hSubstitutes.map(function (item,index) {
                                        return <tr>
                                                <td width="20%"><div className="position">{item.PositionPrefix}</div><div className="g-box">{item.JersyNumber}</div></td>
                                                <td width="80%">{item.playername}</td>
                                            </tr>
                                    })}
                                </table>
                            </div>
                        </div>
                        <div className="tab-pane" id="blbw-lineup-awayteam">
                            <div className="space-5"></div>
                            <div className="padding-left-10">{this.props.staticdata.Manager}: {this.state.AwayManagername}</div>
                            <div className="space-5"></div>
                            <div className="padding-left-10">{this.props.staticdata.Lineup_Predicted}</div>
                            <div className="space-5"></div>
                            <div>
                                <table className="lineup-table">
                                    {this.state.aLineups.map(function (item, index) {
                                        return <tr>
                                                <td width="20%"><div className="position">{item.PositionPrefix}</div><div className="g-box">{item.JersyNumber}</div></td>
                                                <td width="80%">{item.playername}</td>
                                            </tr>
                                    })}
                                </table>
                            </div>
                            <div className="space-5"></div>
                            <div className="padding-left-10">{this.props.staticdata.Substitutes_Predicted}</div>
                            <div className="space-5"></div>
                            <div>
                                <table className="lineup-table">
                                    {this.state.aSubstitutes.map(function (item,index) {
                                        return <tr>
                                                    <td width="20%"><div className="position">{item.PositionPrefix}</div><div className="g-box">{item.JersyNumber}</div></td>
                                                    <td width="80%">{item.playername}</td>
                                            </tr>
                                    })}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
                    <div className="player-details">
                        <div className="header">
                            {/*<img src="images/home-team.png" width="25" />*/}<span className="padding-left-10">{this.state.playinfo.PlayerName}</span>
                            <img src="https://widgets.bettorlogic.com/sportsWidgets/images/close-icon.png" className="close-icon" onClick={this.closePlayerInfo}/>
                        </div>
                        <div className="blbw-profile-stats">
                            <div className="btn-group blbw-btn-group" data-toggle="btns">
                                <button className={this.state.showprofile=='profile'?"btn blbw-btn active":"btn blbw-btn"} href="#first" data-toggle="tab" onClick={self.Playerprofile.bind(null, 'profile')}>{this.props.staticdata.Profile}</button>
                                <button className={this.state.showprofile=='profilestats'?"btn blbw-btn active":"btn blbw-btn"} href="#second" data-toggle="tab" onClick={self.Playerprofile.bind(null, 'profilestats')}>{this.props.staticdata.Stats}</button>
                            </div>
                            <div className="tab-content">
                                <div className={this.state.showprofile=='profile'?"tab-pane active":"tab-pane"}  id="first">
                                <div>
                                    <table className="profile-details">
                                        <tr>
                                            <td>{this.props.staticdata.Country_of_birth}</td>
                                            <td>{this.state.playinfo.PlayerBirthCountry} {/*<img src="/images/flag.png" />*/}</td>
                                        </tr>
                                        <tr>
                                            <td>{this.props.staticdata.Date_of_birth}</td>
                                            <td>{this.state.playinfo.DateOfBirth}</td>
                                        </tr>
                                        <tr>
                                            <td>{this.props.staticdata.Height}</td>
                                            <td>{this.state.playinfo.Height}</td>
                                        </tr>
                                        <tr>
                                            <td>{this.props.staticdata.Weight}</td>
                                            <td>{this.state.playinfo.Weight}</td>
                                        </tr>
                                        <tr>
                                            <td>{this.props.staticdata.Position}</td>
                                            <td>{this.state.playinfo.PlayerPosition}</td>
                                        </tr>
                                        <tr>
                                            <td>{this.props.staticdata.Shirt_Number}</td>
                                            <td>{this.state.playinfo.ShirtNumber}</td>
                                        </tr>
                                        <tr>
                                            <td>{this.props.staticdata.Prefered_Foot}</td>
                                            <td>{this.state.playinfo.Foot}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div className={this.state.showprofile=='profilestats'?"tab-pane active" : "tab-pane" } id="second">
                                <div>
                                    <table className="profile-details">
                                        {this.state.playerstats.map(function (item,index) {
                                            return <tr>
                                                <td>{item.Stattype}</td>
                                                <td>{item.Points}</td>
                                            </tr>
                                        })}
                                    </table>
                                </div>
                                                    
                            </div>
                        </div>
                    </div>
                </div>}
            </div>:''}
                          
</div>
)
    }
});