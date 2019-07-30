/** @jsx React.DOM */
//**********--- call getCookie function to read cookie---**********
getCookie()

if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}

//**********--- Subheader component ---**********
//var Subheader = React.createClass({
//    render: function () {
//        return (
//                    <div className="row">
//                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
//                             <h3>Team stats</h3>
//                        </div>
//                    </div>        
//        )
//    }
//});

//**********--- Teamstats component ---**********
var Teamstats = React.createClass({

    getInitialState: function () {
        return {
            Team: {}
        };
    },
    componentWillMount: function () {
        this.serverRequest = $.get(baseurl + "opta/team/" + userId + "," + sessionId, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            this.setState({Team: result.items[0]})
        }.bind(this));
        //var result = { "items": [{ "team_name": "England", "team_uid": 114, "comid": 3, "position": 2, "manag": "Roy Hodgson" }] }
        //this.setState({Team: result.items[0] })
    },
    
    render: function () {      
                    return (<div>
                        <div className="space-5"></div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                            <div className="stats-team">
                                <img src={this.state.Team.team_uid != 0 ? this.state.Team.comid == 8 ? "/images/jerseys/EPL/" + this.state.Team.team_uid + ".svg" : this.state.Team.comid == 10 ? "/images/jerseys/EC/" + this.state.Team.team_uid + ".svg" : "/images/football-shirts/numbers/" + this.state.Team.team_uid + ".svg" : "/images/undef.svg"} alt="" />
                                <div className="team-name gm-txt blue">{this.state.Team.team_name}</div>
                            </div>
                            <div className="kickoff text-center">{this.state.Team.comid == 8 ? "PREMIER LEAGUE" : this.state.Team.comid == 10 ? "CHAMPIONSHIP" : ""}</div>
                            <div className="kickoff blue text-center">RANK #{this.state.Team.position}</div>
                        </div>
                    </div>
                    <div className="row">
         	            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            	            <div className="zoola-box bg-light-blue stadium-box">
                	            <div className="d-block-m">Manager: <span className="underline "><strong>{this.state.Team.manag}</strong></span>&nbsp;-&nbsp;</div>
					            <div className="d-block-m">Stadium: <span className="underline"><strong>{this.state.Team.stadium}</strong></span>&nbsp;-&nbsp;</div>
                                <div className="d-block-m">Stadium capacity: <span className="underline"><strong>{this.state.Team.stadium_capacity}</strong></span></div>
            	            </div>
         	            </div>
                    </div>
                   <div className="space-5"></div>
                    </div>      
        )
        }
        });


var Upcomingmatches = React.createClass({

    getInitialState: function () {
        return {
            items: [],
            Fixture: [],
            fileredList: [],
            itemsshow: 0,
            itemsPerClick: 0
        };
    },
    componentWillMount: function () {
        this.serverRequest = $.get(baseurl + "opta/nextfixture/" + userId + "," + sessionId, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            //this.setState({Fixture:result.items})
            //var result = { "items": [{ "h_tea": "114", "fixture_name": "England vs Russia", "a_tea": "536", "fixture_time": "SATURDAY 08PM" }, { "h_tea": "114", "fixture_name": "England vs Wales", "a_tea": "508", "fixture_time": "THURSDAY 02PM" }, { "h_tea": "507", "fixture_name": "Slovakia vs England", "a_tea": "114", "fixture_time": "MONDAY 08PM" }, { "h_tea": "114", "fixture_name": "England vs Iceland", "a_tea": "503", "fixture_time": "MONDAY 08PM" }] }
            var totalItems = result.items.length;
            var itemsshow = 6;
            var itemsPerClick = 6;
            var filterWatchlist = result.items.slice(0, itemsshow)
            this.setState({ items: result.items, Fixture: filterWatchlist, itemsPerClick: itemsPerClick, itemsshow: itemsshow })
            maindata = result.items;
        }.bind(this));  
    },
    showMore: function () {
        var itemsshow = this.state.itemsshow + this.state.itemsPerClick;
        var filterWatchlist = this.state.items.slice(0, itemsshow)
        this.setState({ Fixture: filterWatchlist, itemsshow: itemsshow })
    },
render: function () {
                return (<div className="row">
            	        <div className="panel panel-default">
                	        <div className="panel-heading">
                                <h1 className="panel-title">
                                    <a className="accordion-toggle pointer-hand " data-toggle="collapse" data-parent="#accordion" href="#up-coming-matches">
                                        UPCOMING MATCHES
                                    </a>
                                </h1>
                	        </div>
                            <div id="up-coming-matches" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="collapseOne">
                    	        <div className="panel-body">
                        	        <div className="row">                          	        
                                            {
                                            this.state.Fixture.map(function (item, index) {
                                            return <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 text-center" key={index}>
                                                   <div className="game-box margin-top-15">
                                                   <div className="game-box-top">
                                                    <br />
                                                    <div className="game-selection-fixture">
                                                        <img className="fixture-img-left" src="/images/football-shirts/numbers/357.svg" />
                                                        <span className="tm-txt">{item.fixture_name}</span>
                                                        <img className="fixture-img-right" src="/images/football-shirts/numbers/117.svg" />
                                                    </div>
                                                    <br />
                                                </div>
                                                <div className="gbx-kickoff-time bg-dark-blue smt-txt">
                                                    {item.fixture_time}
                                                </div>
                                                <div className="space-5"></div>
                                            </div>
                                            </div>  

                                            })
                                            }                                                                  	                                                                                                                                                      

                        	        </div>
                                    <div className="space-10"></div>
                                    {this.state.itemsshow<this.state.items.length?<div className="row">
                            	        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 col-centered">
                                	        <button className="btn zoola-btn" onClick={this.showMore}><div className="btn-txt">More</div></button>
                            	        </div>
                                    </div>:''}
                                    <div className="space-10"></div>
                    	        </div>
                            </div>
            	        </div>
            <div className="space-5"></div>
                             </div>      
 )
       }

    });


//**********--- Function to calculate no.of days between two dates ---**********
// datepart: 'y', 'm', 'w', 'd', 'h', 'n', 's'
function diffdates(datepart, fromdate, todate) {
    datepart = datepart.toLowerCase();
    var diff = todate - fromdate;
    var divideBy = {
        w: 604800000,
        d: 86400000,
        h: 3600000,
        n: 60000,
        s: 1000
    };
    return Math.floor(diff / divideBy[datepart]);
}
//**********--- Pastmatches component ---**********
var Pastmatches = React.createClass({

    getInitialState: function () {
        return {
            prevfixture: [],
            items: [],
            itemsshow: 0,
            itemsPerClick: 0,
            hours: 0,
            min: 0,
            sec: 0,
            days: 0,
        };
    },
    componentWillMount: function () {
        this.serverRequest = $.get(baseurl + "opta/prevfixture/" + userId + "," + sessionId, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            //this.setState({prevfixture: result.items })
            //var result = { "items": [{ "fixture": "England vs Russia", "fix_date": "20160611080000", "hteam": "114", "hscore": "1", "ateam": "536", "ascore": "1" }, { "fixture": "England vs Wales", "fix_date": "20160616020000", "hteam": "114", "hscore": "2", "ateam": "508", "ascore": "1" }] }
            for (i = 0; i < result.items.length; i++) {
                var str = result.items[i]["fix_date"];
                var year = str.slice(0, 4);
                var month = str.slice(4, 6);
                var day = str.slice(6, 8);
                var hours = str.slice(8, 10);
                var min = str.slice(10, 12);
                var sec = str.slice(12, 14);
                var formatedDate = year + "/" + month + "/" + day + " " + hours + ":" + min + ":" + sec;
                var matchDay = new Date(formatedDate);
                var today = new Date();
                var days = diffdates('d', matchDay, today);
                this.setState({ 'days': days })
                var hours = '';
                var min = '';
                var sec = '';
                var delta = Math.abs(matchDay - today) / 1000;
                var fixturetime = ""
                if (days == 0) {
                    // calculate (and subtract) whole hours
                    hours = Math.floor(delta / 3600) % 24;
                    this.setState({ "hours": hours })
                    fixturetime = "FT +" + hours
                }
                else {
                    fixturetime = "FT +" + days + "d"
                }
                result.items[i]["fix_date"] = fixturetime

                result.items[i]["format_date"] = formatedDate
            }
            var totalItems = result.items.length;
            var itemsshow = 6;
            var itemsPerClick = 6;
            var filterWatchlist = result.items.slice(0, itemsshow)
            this.setState({ items: result.items, prevfixture: filterWatchlist, itemsPerClick: itemsPerClick, itemsshow: itemsshow })
            maindata = result.items;
        }.bind(this));       
    },
    showMore: function () {
        var itemsshow = this.state.itemsshow + this.state.itemsPerClick;
        var filterWatchlist = this.state.items.slice(0, itemsshow)
        this.setState({ prevfixture: filterWatchlist, itemsshow: itemsshow })
    },

                     render: function () {
                     return ( <div className="row">
            	<div className="panel panel-default">
                	<div className="panel-heading">
                        <h1 className="panel-title">
                            <a className="accordion-toggle pointer-hand " data-toggle="collapse" data-parent="#accordion" href="#past-matches">
                                PAST MATCHES
                            </a>
                        </h1>
                	</div>
                    <div id="past-matches" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="collapseOne">
                    	<div className="panel-body">
                        	<div className="row">
                                {
                                this.state.prevfixture.map(function (item, index) {                               
                                return  <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 text-center" key={index}>
                                        <div className="game-box margin-top-15">
                                        <div className="game-box-top">
                                            <div className="row"><div className="score-box-stats">{item.hscore} - {item.ascore}</div></div>
                                            <div className="game-selection-fixture">
                                                <img className="fixture-img-left" src="/images/football-shirts/numbers/357.svg" />
                                                <span className="tm-txt">{item.fixture}</span>
                                                <img className="fixture-img-right" src="/images/football-shirts/numbers/117.svg" />
                                            </div>
                                            <br />
                                        </div>
                                        <div className="gbx-kickoff-time bg-dark-blue smt-txt">
                                            {item.fix_date}
                                        </div>
                                        <div className="space-5"></div>
                                  </div>
                                </div>
                                })
                                }                           	                          
                        	</div>
                            <div className="space-10"></div>
                            {this.state.itemsshow<this.state.items.length?<div className="row">
                            	<div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 col-centered">
                                	<button className="btn zoola-btn" onClick={this.showMore}><div className="btn-txt">More</div></button>
                            	</div>
                            </div>:''}
                    	</div>
                    </div>
            	</div>
    <div className="space-5"></div>
        </div>
)
       }

 });

var Play = React.createClass({
    getInitialState: function () {
        return {
            plys: []
        };
    },
    componentWillMount: function () {
        this.serverRequest = $.get(baseurl + "opta/players/" + userId + "," + sessionId, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            this.setState({plys: result.items})
        }.bind(this));
        //var result = { "items": [{ "player": "Anthony Martial", "country": "France", "position": "F W", "goal_tot": 0, "ply_tot": 3 }, { "player": "Bastian Schweinsteiger", "country": "Germany", "position": "M F", "goal_tot": 1, "ply_tot": 5 }, { "player": "Chris Smalling", "country": "England", "position": "D F", "goal_tot": 0, "ply_tot": 4 }, { "player": "David de Gea", "country": "Spain", "position": "G K", "goal_tot": 0, "ply_tot": 4 }, { "player": "Jonny Evans", "country": "Northern Ireland", "position": "D F", "goal_tot": 0, "ply_tot": 3 }, { "player": "Marcus Rashford", "country": "England", "position": "F W", "goal_tot": 0, "ply_tot": 2 }, { "player": "Marouane Fellaini", "country": "Belgium", "position": "M F", "goal_tot": 0, "ply_tot": 3 }, { "player": "Matteo Darmian", "country": "Italy", "position": "D F", "goal_tot": 0, "ply_tot": 4 }, { "player": "Morgan Schneiderlin", "country": "France", "position": "M F", "goal_tot": 0, "ply_tot": 0 }, { "player": "Patrick McNair", "country": "Northern Ireland", "position": "D F", "goal_tot": 0, "ply_tot": 2 }, { "player": "Wayne Rooney", "country": "England", "position": "F W", "goal_tot": 1, "ply_tot": 4 }] }
        //this.setState({plys: result.items})
    },

    render: function () {
        return (
            	            <div className="panel panel-default">
                	            <div className="panel-heading">
                                    <h1 className="panel-title">
                                        <a className="accordion-toggle pointer-hand " data-toggle="collapse" data-parent="#accordion" href="#players">
                                            PLAYERS
                                        </a>
                                    </h1>
                	            </div>
                                <div id="players" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="collapseOne">
                    	            <div className="panel-body">
                        	            <div className="space-5"></div>
                        	            <div className="row no-margin">

                            	            <div className="zoola-box stats-players bg-light-blue">
                                                <table width="100%">
                                                    <tbody>
                                            {
                                             this.state.plys.map(function (item, index) {
                                             return    <tr key={index}>
                                                        <td><img src="/images/player-icon.svg" width="25"/></td>
                                                        <td> {item.player}</td>
                                                        <td><img src="/images/player-flag.svg" alt="" /></td>
                                                        <td> {item.position}</td>
                                                        <td><img src="/images/player-goals.svg" alt="" /> {item.goal_tot}</td>
                                                        <td><img src="/images/player-ticket.svg" alt="" /> {item.ply_tot}</td>
                                                       </tr>
                                                        })
                                                        }
                                                    </tbody>
                                                </table>
                            	            </div>
                        	            </div>
                    	            </div>
                                </div>
            	            </div>    
        )
    }
})

var Club = React.createClass({

    getInitialState: function () {
        return {
            ranking: []
        };
    },
    componentWillMount: function () {
        this.serverRequest = $.get(baseurl + "opta/clubranking/" + userId + "," + sessionId, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            this.setState({ranking: result.items })
        }.bind(this));
        //var result = {"items": [{ "team_name": "Romania", "played": 3, "won": 0, "drawn": 1, "lost": 2, "gd": 2, "points": 1 }, { "team_name": "France", "played": 3, "won": 2, "drawn": 1, "lost": 0, "gd": 3, "points": 7 }, { "team_name": "Switzerland", "played": 3, "won": 1, "drawn": 2, "lost": 0, "gd": 1, "points": 5 }, { "team_name": "Albania", "played": 3, "won": 1, "drawn": 0, "lost": 2, "gd": 2, "points": 3 }, { "team_name": "England", "played": 3, "won": 1, "drawn": 2, "lost": 0, "gd": 1, "points": 5 }, { "team_name": "Slovakia", "played": 3, "won": 1, "drawn": 1, "lost": 1, "gd": 0, "points": 4 }, { "team_name": "Wales", "played": 3, "won": 2, "drawn": 0, "lost": 1, "gd": 3, "points": 6 }, { "team_name": "Russia", "played": 3, "won": 0, "drawn": 1, "lost": 2, "gd": 4, "points": 1 }, { "team_name": "Northern Ireland", "played": 3, "won": 1, "drawn": 0, "lost": 2, "gd": 0, "points": 3 }, { "team_name": "Germany", "played": 3, "won": 2, "drawn": 1, "lost": 0, "gd": 3, "points": 7 }, { "team_name": "Ukraine", "played": 3, "won": 0, "drawn": 0, "lost": 3, "gd": 5, "points": 0 }, { "team_name": "Poland", "played": 3, "won": 2, "drawn": 1, "lost": 0, "gd": 2, "points": 7 }, { "team_name": "Spain", "played": 3, "won": 2, "drawn": 0, "lost": 1, "gd": 3, "points": 6 }, { "team_name": "Turkey", "played": 3, "won": 1, "drawn": 0, "lost": 2, "gd": 2, "points": 3 }, { "team_name": "Czech Republic", "played": 3, "won": 0, "drawn": 1, "lost": 2, "gd": 3, "points": 1 }, { "team_name": "Croatia", "played": 3, "won": 2, "drawn": 1, "lost": 0, "gd": 2, "points": 7 }, { "team_name": "Republic of Ireland", "played": 3, "won": 1, "drawn": 1, "lost": 1, "gd": 2, "points": 4 }, { "team_name": "Italy", "played": 3, "won": 2, "drawn": 0, "lost": 1, "gd": 2, "points": 6 }, { "team_name": "Belgium", "played": 3, "won": 2, "drawn": 0, "lost": 1, "gd": 2, "points": 6 }, { "team_name": "Sweden", "played": 3, "won": 0, "drawn": 1, "lost": 2, "gd": 2, "points": 1 }, { "team_name": "Portugal", "played": 3, "won": 0, "drawn": 3, "lost": 0, "gd": 0, "points": 3 }, { "team_name": "Iceland", "played": 3, "won": 1, "drawn": 2, "lost": 0, "gd": 1, "points": 5 }, { "team_name": "Austria", "played": 3, "won": 0, "drawn": 1, "lost": 2, "gd": 3, "points": 1 }, { "team_name": "Hungary", "played": 3, "won": 1, "drawn": 2, "lost": 0, "gd": 2, "points": 5 }] }
        //this.setState({ranking: result.items })
    },


    render: function () {
        return (   <div className="panel panel-default">
                	                    <div className="panel-heading">
                                            <h1 className="panel-title">
                                                <a className="accordion-toggle pointer-hand " data-toggle="collapse" data-parent="#accordion" href="#club-ranking">
                                                    CLUB RANKING
                                                </a>
                                            </h1>
                	                    </div>
                                        <div id="club-ranking" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="collapseOne">
                    	                    <div className="panel-body">
                        	                    <div className="space-5"></div>
                        	                    <div className="row no-margin">
                            	                    <div className="zoola-box stats-players bg-light-blue">
                                                        <table width="100%">
                                                            <tbody>
                                    	                    <tr>
                                                                <th align="center">Pos</th>
                                                                <th align="center">Team</th>
                                                                <th align="left">P</th>
                                                                <th align="left">W</th>
                                                                <th align="left">D</th>
                                                                <th align="left">L</th>
                                                                <th align="left">GD</th>
                                                                <th align="left">Pts</th>
                                    	                    </tr>

                                                                {
                                                                this.state.ranking.map(function (item, index) {
                                                                return  <tr key={index}>
                                                                <td align="center"><strong>{item.position}</strong></td>
                                                                <td> {item.team_name}</td>
                                                                <td> {item.played}</td>
                                                                <td> {item.won}</td>
                                                                <td> {item.drawn}</td>
                                                                <td> {item.lost}</td>
                                                                <td> {item.gd}</td>
                                                                <td> {item.points}</td>
                                                                       </tr>
                                                                })
                                                                }
                                                            </tbody>
                                                        </table>
                            	                    </div>
                        	                    </div>
                    	                    </div>
                                        </div>
            	                    </div>
            )
    }
})

//**********--- Players component ---**********
var Player = React.createClass({
      render: function () {
          return ( <div>
          <div className="row">
        	 <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 no-padding">
            	<Play/>
        	</div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 no-padding">
            	<Club/>
            </div>
        </div>
      <div className="space-10"></div>
      <div className="space-10"></div>

     <div className="modal fade" id="player-stats" tabIndex="-3" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static">
        <div className="modal-dialog" role="document">
            <div className="modal-content BuyTicketModal">
                <div className="modal-header opta-header">
                    <div className="row text-center">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                            <img src="/images/close-icon.svg" data-dismiss="modal" className="pointer-hand pull-right" width="25" />
                        </div>
                    </div>
                </div>
                <div className="modal-body no-padding">
                    <div className="row">
                	    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                            <img src="/images/profile-2.png" width="50" />
                            <h2>Steve Mandanda</h2>
                	    </div>
                    </div>
                    <div className="space-5"></div>
                    <div className="row">
                	    <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 col-centered">
                            <div className="zoola-box bg-light-blue stadium-box">
                                <div className="row no-margin">
                        	    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-left">
								    <p>Date of Birth: <strong>28 Mar 1985 (Age 31)</strong></p>
                                    <p>Club: <strong>Crystal Palace</strong></p>
                                    <p className="no-margin-bottom">Caps: <strong>3</strong></p>
                        	    </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-left">
								    <p>Nationality: <strong>France</strong></p>
                                    <p>Position: <strong>Goalkeeper</strong></p>
                                    <p className="no-margin-bottom">Minutes played: <strong>112</strong></p>
                                </div>
                                </div>
                            </div>
                	    </div>
                    </div>

                    <div className="bg-blue row no-margin">
                	    <h3 className="">DEFENCE</h3>
                    </div>
                    <div className="space-5"></div>
                    <div className="row">
                	    <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 col-centered">
                            <div className="zoola-box bg-light-blue stadium-box">
                                <div className="row no-margin">
                        	    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 text-center">
								    <img src="/images/opta-icons/defence-blocks.svg" width="60" />
                                    <p>Blocks: <strong>9</strong></p>
                        	    </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 text-center">
								    <img src="/images/opta-icons/tackle.svg" alt="" />
                                    <p>Tackles: <strong>7</strong></p>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 text-center">
								    <img src="/images/opta-icons/tackleW.svg" alt="" />
                                    <p>Tackles won: <strong>9</strong></p>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 text-center">
								    <img src="/images/opta-icons/defence-total-cleared.svg" alt="" />
                                    <p>Total cleared: <strong>7</strong></p>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 text-center">
								    <img src="/images/opta-icons/defence-duel.svg" alt="" />
                                    <p>Duel: <strong>7</strong></p>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 text-center">
								    <img src="/images/opta-icons/defence-duelW.svg" alt="" />
                                    <p>Duel won: <strong>9</strong></p>
                                </div>

                                </div>
                            </div>
                	    </div>
                    </div>

                    <div className="bg-blue row no-margin">
                	    <h3 className="">DISTRIBUTION</h3>
                    </div>
                    <div className="space-5"></div>
                    <div className="row">
                	    <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 col-centered">
                            <div className="zoola-box bg-light-blue stadium-box">
                                <div className="row no-margin">
                        	    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
								    <img src="/images/opta-icons/pass.svg" width="60" />
                                    <p className="no-margin-bottom">Passing accuracy: <strong>85%</strong></p>
                        	    </div>
                                </div>
                            </div>
                	    </div>
                    </div>

                    <div className="bg-blue row no-margin">
                	    <h3 className="">ATTACK</h3>
                    </div>
                    <div className="space-5"></div>
                    <div className="row">
                	    <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 col-centered">
                            <div className="zoola-box bg-light-blue stadium-box">
                                <div className="row no-margin">
                        	    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
								    <img src="/images/opta-icons/goals.svg" width="60" />
                                    <p className="no-margin-bottom">Goal: <strong>0</strong></p>
                        	    </div>
                                </div>
                            </div>
                	    </div>
                    </div>

                    <div className="bg-blue row no-margin">
                	    <h3 className="">DISCIPLINE</h3>
                    </div>
                    <div className="space-5"></div>
                    <div className="row">
                	    <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 col-centered">
                            <div className="zoola-box bg-light-blue stadium-box no-margin-bottom">
                                <div className="row no-margin">
                        	    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center no-padding-left">
								    <img src="/images/opta-icons/foulW.svg" width="60" />
                                    <p>Fouls won: <strong>90</strong></p>
                        	    </div>
                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center no-padding">
								    <img src="/images/opta-icons/foulC.svg" alt="" />
                                    <p>Fouls conceded: <strong>70</strong></p>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center">
								    <img src="/images/opta-icons/card_y.svg" alt="" />
                                    <p>Yellow cards: <strong>90</strong></p>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center no-padding-right">
								    <img src="/images/opta-icons/card_r.svg" alt="" />
                                    <p>Red cards: <strong>70</strong></p>
                                </div>
                                </div>
                            </div>
                	    </div>
                    </div>
                </div>
                <div className="modal-footer">
            	    <p className="ntr-txt text-center underline no-margin-bottom" data-dismiss="modal">Back to the team's page</p>
                </div>
            </div>
        </div>
     </div>

    </div>
         )
         }

         });
  