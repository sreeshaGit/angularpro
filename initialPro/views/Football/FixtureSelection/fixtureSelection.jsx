var is_loggedIn = false;
// ************---Function to read URL parameters ---************
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}
//**********--- header component ---**********
var Header = React.createClass({
    render: function () {
        return (
                      <h1>FIXTURES</h1>
        )
    }
});

//**********--- subheader component ---**********
var Subheader = React.createClass({
   
    getInitialState: function () {
        return {
            filter_date: "Date",
            items: [],
            team: "Team"
        };
    },
    componentWillMount: function () {
        this.serverRequest = $.get("http://apex.zoolalondon.com/zoola/apitest/fixture/ddteam", function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
        this.setState({ items: result.items })
        }.bind(this));
    },
    componentDidMount: function () {
        var self = this;
        
        $('#fixture-datePicker').datepicker({
           autoclose: true,
           format: 'dd/mm/yyyy',
           todayHighlight: true
       });
       
    },
   
    clickDate: function () {
        
    },
    teamSelect: function(teamid){
        var teamData = $.grep(this.state.items, function (element, index) {
            return element.team_id == teamid;
        });
        this.setState({ team: teamData[0]['team_name'] });
    },
    resetFilter: function () {
        $("#teamselect").val('');
        $("#fixture-datePicker").val('');
        $('#fixture-datePicker').data('datepicker').setDate(null);
    },
    render: function () {
        var self = this;
        return (
                  <div className="row">
            	    <div className="col-lg-4 col-md-4 col-sm-4 col-sm-12 text-center">
                	    <div className="game-selection-dropdown">
                    	    <input type='text' placeholder="date" className="form-control" id='fixture-datePicker' />
                	    </div>
            	    </div>
                    <div className="col-lg-5 col-md-5 col-sm-5 col-sm-12 text-center">
                	    <div className="game-selection-dropdown">
                    	    <select id="teamselect">
                        	    <option value="">team</option>
                                {
                                    this.state.items.map(function (item, index) {
                                        return <option key={index} value={item.team_id}>{item.team_name}</option>
                                    })
                                }
                    	    </select>
                	    </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-sm-12 text-center">
                	    <div className="btn-reset-filters" onClick={this.resetFilter}>Reset Filters</div>
                    </div>
                 </div>

        )
    }
});


//**********--- Count down timer component ---**********
var endTime = '';
var CountDown = React.createClass({
    getInitialState: function () {
        return {  countdown: "",endTime:''};
    },
    twoDigits: function (n) {
        return (n <= 9 ? "0" + n : n);
    },
    updateTimer: function () {
        msLeft = this.state.endTime - (+new Date);
        if (msLeft < 1000) { 
            this.setState({ countdown: "Game live" });
        } else {
            time = new Date(msLeft);
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            if (hours != 0 && hours>0)
            {
                countDownValue = ("in " + hours + " hour(s)");
                this.setState({ countdown: countDownValue })
            }
            else if (mins != 0 && mins>0) {
                countDownValue = ("in " + this.twoDigits(mins) + " minutes");
                this.setState({ countdown: countDownValue })
            }
            else {
                
                countDownValue = ("in " + this.twoDigits(time.getUTCSeconds()) + " seconds");
                this.setState({ countdown: countDownValue })
            }

            setTimeout(this.updateTimer, time.getUTCMilliseconds() + 500);
        }
    },
    componentWillMount: function () {
        var element, endTime, hours, mins, msLeft, time, countDownValue;
        var Totalmins = 0, endtim;
        if (this.props.hours > 0)
        {
            Totalmins = (this.props.hours * 60);
           
        }
        endtim = (+new Date) + 1000 * (60 * (Totalmins + this.props.minutes) + this.props.seconds) + 500;
        this.setState({ endTime: endtim });
        setTimeout(this.updateTimer, 1000);
    },
    render: function () {

        return (
                    <span>{this.state.countdown}</span>

        )
    }
});

//**********--- Game box component ---**********
var GBoxs = React.createClass({
    getInitialState: function () {
        return { items: [], dataItems: [] };
    },
    componentWillMount: function () {
        this.serverRequest = $.get("http://apex.zoolalondon.com/zoola/apitest/fixture/data", function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            for (i = 0; i < result.items.length;i++){
                var str = result.items[i]["start_time"];
                var year = str.slice(0, 4);
                var month = str.slice(4, 6);
                var day = str.slice(6, 8);
                var hours = str.slice(8, 10);
                var min = str.slice(10, 12);
                var sec = str.slice(12, 14);
                var formatedDate = year + "/" + month + "/" + day + " " + hours + ":" + min + ":" + sec;
                result.items[i]["format_date"] = formatedDate;
            }
            this.setState({ items: result.items })
        }.bind(this));
    },
    gotoLeaderboard: function () {
        //console.log(plsid)
        //window.location = "/build/views/Football/LeaderBoard/leaderBoard.html?islog=" + is_loggedIn;
        window.location = "/leaderboard/?islog=" + is_loggedIn;
    },
    render: function () {
        var self = this;
        return (
           <div >
               {
                   this.state.items.map(function (item, index) {
                       var timer_id = "timer_" + index;
                       var matchDay = new Date(item.format_date);
                       var today = new Date();
                       var days = diffdates('d', today, matchDay);
                       var hours = '';
                       var min = '';
                       var sec = '';
                       var delta = Math.abs(matchDay - today) / 1000;
                       if (days == 0)
                       {
                           // calculate (and subtract) whole hours
                           hours = Math.floor(delta / 3600) % 24;
                           delta -= hours * 3600;

                           // calculate (and subtract) whole minutes
                           min = Math.floor(delta / 60) % 60;
                           delta -= min * 60;

                           // what's left is seconds
                           sec = Math.floor(delta % 60);  // in theory the modulus is not required
                       }
                     
                       return <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center" key={item.fxt_id}>
             <div className="game-box">
                    <div className="game-box-top fixture-box-bg">
                        <div className="row">
                           <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 no-padding-right">
                           	  <div className="team-vs">
                              		<img width="110" className="" src="/images/Hotspurs.png"/>
                                	<span>{item.home_team}</span>
                              </div>
                           </div>
                           <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 no-padding">
                           		<img src="/images/VS.svg" alt="" className="vs-img"/>
                           </div>
                           <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 no-padding-left">
                           	  <div className="team-vs">
                           		 <img width="110" className="" src="/images/West-Ham.png"/>
                                 <span>{item.away_team}</span>
                              </div>
                           </div>
                        </div>
                    </div>
                    <div className={item.status == 'R' ? "fbx-kickoff btn-closed-game" : "fbx-kickoff"}>
                        <span className="f-kickoff">kickoff: </span>
                        <span className="kickoff-time">{item.status=='O'?<span id={timer_id }>{ days > 0 ? 'kickoff: in ' + days + ' day(s)' : <span><CountDown ids={timer_id} hours={hours} minutes={min} seconds={sec } /></span> }</span> :item.status=='R'?'Game finished':item.status=='C'?'Game live':''}</span>
                    </div>
                    <div className="gbx-people-pot text-center fixture-box-bg">
                    	<div className="row">
                            <div className="capsle-people bg-white margin-top-15 margin-bottom-15"><img src="/images/zoola-game-30.png"/> <span className="people-text">{item.games}</span></div>
                            {item.status=="C"?<div className="capsle-people bg-zoola-blue white margin-top-15 margin-bottom-15"><img src="/images/ticket-30.png"/> <span className="people-text white"> 8</span></div>:''}
                            <div className="capsle-people bg-gray margin-top-15 margin-bottom-15"><img src="/images/max.png"/><img src="/images/pot-30.png"/> <span className="people-text">&pound;{item.max_pool}</span></div>
                        </div>
                    </div>
                    <div className="gbx-kickoff-time">
                    </div>
                    <div className={item.status == 'R' ? "btn-view-game btn-closed-game" : "btn-view-game" }><h3>{item.status == 'R' ? "VIEW CLOSED GAME" : "VIEW GAMES"}</h3></div>
              </div>             
        </div>

                       
                       

                   })
               }
           </div>
        )
    }
});

//**********--- Function to calculate no.of days between two dates ---**********
// datepart: 'y', 'm', 'w', 'd', 'h', 'n', 's'
function diffdates(datepart, fromdate, todate) {	
    datepart = datepart.toLowerCase();
    var diff = todate - fromdate;	
    var divideBy = { w:604800000, 
        d:86400000, 
        h:3600000, 
        n:60000, 
        s:1000 };	
    return Math.floor( diff/divideBy[datepart]);
}
