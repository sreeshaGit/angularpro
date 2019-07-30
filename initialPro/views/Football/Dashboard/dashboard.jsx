//**********--- call getCookie function to read cookie---**********
getCookie()
//var plsid =getParameterByName("plsid");
if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}
if (getParameterByName("isglory") && getParameterByName("isglory") == 'true') {
    isglory = true;
}
else {
    isglory = false;
}

//**********--- header component ---**********
var Header = React.createClass({
    getInitialState: function () {
        return {
            item:{status:'T'} 
        };
    },  
    componentWillMount:function(){
        this.serverRequest = $.get(baseurl + "general/navbar/" + userId + "," + sessionId, function (result) {          
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            this.setState({ item: result.header[0] })
        }.bind(this));
    },
    render: function () {
        return (
           <h3>{this.state.item.status == 'T'|| this.state.item.status=='P' ?'Dashboard' : 'My Zoola'}</h3>         
        )
    }
});

var Subheader = React.createClass({
    getInitialState: function () {
        return {
            item:{status:'T'},
            showBanner: getParameterByName('status2')
        };
    },
    agree: function () {
        $("#alert-modal6").modal('hide');
    },
    gotoTopup: function () {     //**********--- Function to navigate to Topup page---**********
        if(SupHeaderThis.state.items.status=='L')
        {
            $("#alert-modal6").modal('show');
        }
        else if (!SupHeaderThis.state.items.status == 'P' || SupHeaderThis.state.items.status == 'T'|| SupHeaderThis.state.items.status == 'N' ) {
            window.location = "/quicktopup/?islog=" + is_loggedIn
        }
        else {
            window.location = "/topup/?islog=" + is_loggedIn
        }
    },
    componentWillMount:function(){
        this.serverRequest = $.get(baseurl + "general/navbar/" + userId + "," + sessionId, function (result) {          
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            this.setState({ item: result.header[0] })
        }.bind(this));
    },
    hideBuyTicketF:function(){
        this.setState({showBanner : false});
        var newUrl = removeURLParameter("dashboard/?islog=true&status2=true", "status2");
        window.history.pushState("object or string", "Title", "/" + newUrl);
    },
    render: function () {
    return (<div>
                 {(this.state.item.status=='T' || this.state.item.status=='P')?'':<div className="container">
                 <div className="row">
                    <div className="col-lg-12 text-center">
                        <p className="text-center"><img className="margin-top-10" src="/images/pz-icon.svg" width="120" /></p>
                    </div>
                </div>
                <div className="space-5"></div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <p className="text-center">Deposit now <span className="d-block-m">to join more games.</span></p>
                    </div>
                </div>
                <div className="space-5"></div>
                <div className="row">
                        <div className="col-lg-5 col-md-7 col-sm-7 col-xs-10 col-centered">
                            <button type="submit" onClick={this.gotoTopup} className="btn zoola-btn"><h5 className="">Deposit</h5></button>
                        </div>
                </div>
                <div className="space-10"></div>
                </div>}
                 
                <div className="modal fade animated fadeIn" tabIndex="-1" role="dialog" aria-labelledby="Alert-Modal" id="alert-modal6" data-keyboard="true">
                    <div className="modal-dialog modal-sm ">
                        <div className="modal-content zoola-box alet-modal">
                            <div className="social-header">
                                <img src="/images/close-icon.svg" width="20" className="pull-right pointer-hand" data-dismiss="modal" />
                            </div>
                            <div className="social-body">
                                <div className="space-5"></div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <p>Your account has not been activated yet,please check your email</p>
                                    </div>
                                </div>
                                <div className="space-5"></div>
                                <div className="row">
                                    <div className="col-lg-12 col-sm-12 col-md-12">
                                        <button type="submit" className="btn zoola-btn" onClick={this.agree}><h5 className="">Ok</h5></button>
                                    </div>                                                             
                                </div>
                                <div className="space-5"></div>
                            </div>
                        </div>
                    </div>
                 </div>  

                {this.state.showBanner?<div className="row bg-success" id="Joingamesuccess">
                    <div className="space-5"></div>
                    <div className="container">
                    <div className="row no-margin">
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                            <img src="/images/success.svg" alt="Success" className="" width="30" />
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 no-padding">
                            <span className="sm-txt font-18">You've joined the game!</span>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                            <img src="/images/close-icon.svg" alt="Success" width="20" className="pointer-hand margin-top-5" onClick={this.hideBuyTicketF} />
                        </div>
                    </div>
                    <div className="space-5"></div>
                    </div>
                </div>:''} 

            </div>
        )            
    }
});

//**********--- Component for dashboard banner image  ---**********
//09-09-2016 : Change the navigation from 'buy now' to dashboard with the green banner
var Banner = React.createClass({
    getInitialState:function(){
        return {
            showBanner: getParameterByName('status1'),            
            gamename:''
        }
    },
    componentWillMount: function (itemName) {      
        if (this.props.showClass == "pl-fields-show") {
            this.setState({ showBanner :true})
        }
    },
    hideBuyTicketF:function(){
        this.setState({showBanner : false});
        var newUrl = removeURLParameter("dashboard/?islog=true&status1=true", "status1");
        window.history.pushState("object or string", "Title", "/" + newUrl);
    },
    render: function () {      
    return (<div>
                {this.state.showBanner?<div className="row bg-success no-margin" id="Joingamesuccess">
                   <div className="container">
                    <div className="space-5"></div>
                    <div className="row no-margin">
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                            <img src="/images/success.svg" alt="Success" className="" width="30" />
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 no-padding">
                            <span className="sm-txt font-18">You've joined the game!</span>
                        </div> 
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                            <img src="/images/close-icon.svg" alt="Success" width="20" className="pointer-hand margin-top-5" onClick={this.hideBuyTicketF}/>
                        </div>
                    </div>
                    <div className="space-5"></div>
                  </div>
               </div>:''}         
            </div>
        )
    }
});

var CountUp = React.createClass({
    getInitialState: function () {
        return {  countup: "",startTime:'',checkTime:'',};
    },
    twoDigits: function (n) {
        return (n <= 9 ? "0" + n : n);
    },
    updateTimer: function (h,m,s) {
        msLeft = this.props.minutes;
        var self  = this;
        var hou =h;
        var min = m;
        if(h>0)
        {
            min = (h*60)+m
        }
        var sec = s;
        var tim = setInterval(function(){            
            if(min>=45 && min<60 )
            {                
                sec++;              
                if(sec>= 60)
                {
                    min++;
                    sec=sec-60;
                }
                document.getElementById(self.props.id).innerHTML = "HT" ;
            }
            else if(min>=105)
            {
                clearInterval(tim)
                setTimeout(function(){self.updateTimer(hou,min,sec);})
                document.getElementById(self.props.id).innerHTML = "FT" ;
            }
            else{
                sec++;
               
                if(sec>= 60)
                {
                    min++;
                    sec=sec-60;
                }
                var min1=min;
                if(min>=60){
                    min1=min-15;
                }
                document.getElementById(self.props.id).innerHTML = min1 +" : " + sec ;
            }              
        },1000);        
    },
    componentDidMount: function () {
        var element, endTime, hours, mins, msLeft, time, countupValue;
        var Totalmins = 0, endtim;
        if (this.props.hours > 0)
        {
            Totalmins = (this.props.hours * 60);
        }
        var now = new Date();
        now.setMinutes(now.getMinutes() + 90);
        this.updateTimer(this.props.hours,this.props.minutes,this.props.seconds)
    },
    render: function () {
        return (
                    <span> {this.state.countup}</span>
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
                countDownValue = ("-" + hours + " hour(s)");
                this.setState({ countdown: countDownValue })
            }
            else if (mins != 0 && mins>0) {
                countDownValue = ("-" + this.twoDigits(mins) + " minutes");
                this.setState({ countdown: countDownValue })
            }
            else {
                countDownValue = ("-" + this.twoDigits(time.getUTCSeconds()) + " seconds");
                this.setState({ countdown: countDownValue })
            }
            setTimeout(this.updateTimer, time.getUTCMilliseconds() + 500);
        }
    },
    componentDidMount: function () {
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
                    <span> {this.state.countdown}</span>
        )
    }
});

//**********--- Component to display live games ---**********
var LiveGamesThis;
var LiveGames = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            showViewTicket: false,
            selectedTicket: 0,
            countup: "",
            hours:0,
            min:0,
            sec:0,
            days:0,
            gameStatus:'',
            viewTicketPls:'',
            users:[],
            tickets:[]
        };
    },
    componentWillMount: function () {
        LiveGamesThis=this;
        this.serverRequest = $.get(baseurl + "play/dashboard/" + userId + "," + sessionId + ",C"  , function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }           
            for (i = 0; i < result.items.length; i++) {              
                var str = result.items[i]["start_time"];  //"20160630080000";
                var year = str.slice(0, 4);
                var month = str.slice(4, 6);
                var day = str.slice(6, 8);
                var hours = str.slice(8, 10);
                var min = str.slice(10, 12);
                var sec = str.slice(12, 14);
                var formatedDate = year + "/" + month + "/" + day + " " + hours + ":" + min + ":" + sec;
                var matchDay = new Date(formatedDate);                
                var today = new Date();             
                var matchDay_ms = matchDay.getTime();
                var today_ms = today.getTime();               
                var difference_ms = today_ms - matchDay_ms;
                minutes = parseInt((difference_ms/(1000*60))%60)
                result.items[i]['min']=minutes;               
                var days = diffdates('d', today,matchDay);
                this.setState({'days':days})
                var hours = '';
                var min = '';
                var sec = '';
                var delta = Math.abs(matchDay - today) / 1000;
                if (days <= 0)
                {
                    // calculate (and subtract) whole hours
                    hours = Math.floor(delta / 3600) % 24;
                    this.setState({"hours":hours})
                    delta -= hours * 3600;

                    // calculate (and subtract) whole minutes
                    min = Math.floor(delta / 60) % 60;
                    this.setState({"min":min})
                    delta -= min * 60;

                    // what's left is seconds
                    sec = Math.floor(delta % 60);  // in theory the modulus is not required
                    this.setState({"sec":sec})
                }
                result.items[i]["format_date"] = formatedDate
            }
            this.setState({ data: result.items });
        }.bind(this));                 
    },
    updateState: function () {
        this.componentWillMount();            
    },
    componentDidMount:function(){
        this.timer = setInterval(this.updateState, 1000*5);        
    },
    viewTicketClick: function (upl_id,status,pls) {       
        this.setState({ showViewTicket: true, selectedTicket: upl_id,gameStatus:status,viewTicketPls:pls})
    },
    handleHideViewTicket: function () { 
        this.setState({ showViewTicket: false, selectedTicket:0,gameStatus:'',viewTicketPls:''})
    },
    handleHideMiniDash: function () { // Function to hide break points popup
        this.setState({ showMD: false });
    },
    handleshowMiniDash: function (item) { // Function to show break points popup
        this.setState({ showMD: true, miniDashUID: item });
    },
    gotoLeaderboard: function (plsid) {
        window.location = "/leaderboard/?islog=" + is_loggedIn + "&plsid=" + plsid + "&isglory=" + isglory;
    },
    gotoInvitemates: function (plsid) {
        window.location = "/invitemates/?islog=" + is_loggedIn + "&plsid=" + plsid
    },
    render: function () {
        var self = this;
        return (                       
             <div className="panel panel-default">          
                <div className="panel-heading">
                    <h1 className="panel-title">
                        <a className="accordion-toggle pointer-hand " data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                            LIVE GAMES
                        </a>
                    </h1>
                </div>
                <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="collapseOne">
                    <div className="panel-body">
                        {
                            this.state.data.map(function (item, index) {
                                var ids ="timer_" + index;
                                if(index%2==0){
                                    return <div className="game-qns-box bg-light-blue" key={index}>
                                	<div className="row">
                                    	<div className="col-lg-3 col-md-3 col-sm-3 col-xs-8">
                                        	<div className="capsle-game bg-gray"><img src="/images/zoola-game-blue-30.svg" /> <div className="game-text">{item.game_name}</div></div>												
												<div className="capsle-vs bg-gray"><div className="game-time bg-blue" id={ids}>{item.start_time}</div> <span className="vs-text">{item.short_name}</span></div>               
                                    	</div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 no-padding">
                                        	<div className="capsle-people bg-gray"><img src="/images/people-30.svg" /> <div className="people-text">{item.users}</div></div>
                                            <div className="capsle-people bg-gray pot-capsle"><img src="/images/pot-30.svg" /> <span className="people-text">&pound;{item.total_value}</span></div>
                                        </div>                                       
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-8 no-padding">
                                            {
                                            item.tickets.map(function (itm, ind) {                                                
                                                return <div className="player-position bg-gray" key={ind}>
                                                          <div className="player-number pointer-hand" onClick={self.viewTicketClick.bind(null, itm.upl_id,'C',item.pls_id)}> {itm.ticket_no} </div>
                                                              <span className="game-results">
                                                                  <span className="position">{formatPosition(itm.position)}</span>
                                                                  <span className="pot-value">&pound;{itm.value}</span>
                                                               </span>
                                                        </div>                                              
                                            })
                                            }                                                                                   
                                         </div>
                                        <div className="col-lg-3 col-md-2 col-sm-2 col-xs-4 text-center no-padding-left">
                                            <div className="zoola-btn-remove"  onClick={self.gotoInvitemates.bind(null,item.pls_id)}>
                                                INVITE
                                            </div>
                                        	<div className="zoola-btn-viewgame" onClick={self.gotoLeaderboard.bind(null,item.pls_id)}>VIEW GAME</div>
                                        </div>
                                	  </div>
                                </div>
                                }
                                else{
                                    return <div className="game-qns-box bg-light-blue" key={index}>
                                	    <div className="row">
                                    	    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-8">
                                        	    <div className="capsle-game bg-gray"><img src="/images/zoola-game-blue-30.svg" /> <div className="game-text">{item.game_name}</div></div>													
													<div className="capsle-vs bg-gray"><div className="game-time bg-blue" id={ids} >{item.start_time}</div> <span className="vs-text">{item.short_name}</span></div>
                                    	    </div>
                                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 no-padding">
                                        	    <div className="capsle-people bg-gray"><img src="/images/people-30.svg" /> <div className="people-text"> {item.users}</div></div>
                                                <div className="capsle-people bg-gray pot-capsle"><img src="/images/pot-30.svg" /> <span className="people-text">&pound;{item.total_value}</span></div>
                                            </div>                                            
                                            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-8 no-padding">
                                                {
                                                item.tickets.map(function (itm, ind) {                                                    
                                                return <div className="player-position bg-gray" key={ind}>
                                                        <div className="player-number pointer-hand" onClick={self.viewTicketClick.bind(null, itm.upl_id,'C',item.pls_id)}> {itm.ticket_no} </div>
                                                            <span className="game-results">
                                                                <span className="position">{formatPosition(itm.position)}</span>
                                                                <span className="pot-value">&pound;{itm.value}</span>
                                                            </span>
                                                    </div>                                                 
                                                })
                                                }                                                                                               
                                            </div>
                                               <div className="col-lg-3 col-md-2 col-sm-2 col-xs-4 text-center no-padding-left">
                                                   <div className="zoola-btn-remove"  onClick={self.gotoInvitemates.bind(null,item.pls_id)}>
                                                            INVITE
                                                   </div>
                                        	    <div className="zoola-btn-viewgame" onClick={self.gotoLeaderboard.bind(null,item.pls_id)}>VIEW GAME</div>
                                               </div>
                                          </div>
                                </div>
                                }
                            })
                        }
                    {this.state.showViewTicket ? <ViewTicketModal handleHideViewTicket={this.handleHideViewTicket} ticket={this.state.selectedTicket } gamestatus={this.state.gameStatus} page="DA" plsid={this.state.viewTicketPls}/> : ''}
                    {this.state.data < 1?<div className="row no-margin"><div className="col-lg-12 gm-txt blue text-center">Your are not part of any live games right now. Your next upcoming game starts in 1 day!</div></div>:''}
                    </div>
                </div>
                <div className="space-5"></div>
                 {this.state.showMD ? <MiniDash handleHideMD={this.handleHideMiniDash} uid={this.state.miniDashUID } /> : ''}
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

//**********--- Component to display upcoming games ---**********
var showcolour = false;
var UpcomingGamesThis;
var UpcomingGames = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            showViewTicket: false,
            selectedTicket: 0,
            countdown: "",
            hours:0,
            min:0,
            sec:0,
            days:0,
            gameStatus:'',
            viewTicketPls: '',
            mnt: '',
            day1: '',
            hr: '',
            min1: '',
            BuyTicketF:false,
        };
    },
    componentWillMount: function () {
        if(getParameterByName('status1') == 'true'){
            showcolour=true;
        }
        else{
            showcolour=false;
        }
        UpcomingGamesThis=this;
        this.serverRequest = $.get(baseurl + "play/dashboard/"  + userId + "," + sessionId + ",O"  , function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }           
            for (i = 0; i < result.items.length; i++) {                                
                var str = result.items[i]["start_time"]+":00";
                //"31 Aug 18:25:00";                       
                var date = str.split(" ");
                var mnt = date[1];
                var day1 = date[0];
                var hr = (date[2].split(":"))[0];
                var min1 = (date[2].split(":"))[1];
                var formatedDate = day1 + " " + mnt + " " + date[2];                          
                var today = new Date();             
                var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];              
                var todayDate = today.getDate() + " " + monthNames[today.getMonth()] + " " + today.getHours() + ":" + today.getMinutes()+":"+today.getSeconds();             
                this.setState({ 'mnt': mnt,'day1':day1,'hr':hr,'min1':min1 })               
                result.items[i]["format_date"] = formatedDate
            }
            this.setState({ data: result.items});            
        }.bind(this));     
    },
    updateState: function () {
        this.componentWillMount();             
    },
    componentDidMount:function(){
        this.timer = setInterval(this.updateState, 1000*30);      
    },
    viewTicketClick: function (upl_id,status,pls) {
        this.setState({ showViewTicket: true, selectedTicket: upl_id ,gameStatus:status,viewTicketPls:pls})
    },
    handleHideViewTicket: function () { 
        this.setState({ showViewTicket: false, selectedTicket:0,gameStatus:'',viewTicketPls:''})
    },
    handleHideMiniDash: function () { // Function to hide break points popup
        this.setState({ showMD: false });
    },
    handleshowMiniDash: function (item) { // Function to show break points popup
        this.setState({ showMD: true, miniDashUID: item });
    },
    gotoLeaderboard: function (plsid) {
        window.location = "/leaderboard/?islog=" + is_loggedIn + "&plsid=" + plsid + "&isglory=" + isglory;
    },
    gotoLeader: function (plsid) {   
        var today = new Date();      
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];    
        var todayDate = today.getDate() + " " + monthNames[today.getMonth()] + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(); 
        if((today.getDate() == this.state.day1) && (monthNames[today.getMonth()] == this.state.mnt)&&(today.getHours() == this.state.hr)&&(today.getMinutes() >= this.state.min1)){
            document.getElementById("BuyticketF").style.display = "block"
        }
        else{
            window.location = "/leaderboard/?islog=" + is_loggedIn + "&plsid=" + plsid + "&isglory=" + isglory;
        }          
    },  
    gotoInvitemates: function (plsid) {
        window.location = "/invitemates/?islog=" + is_loggedIn + "&plsid=" + plsid
    },
    render: function () {
        var self = this;
        return (
            <div className="panel panel-default">                                                                                               
                    <div className="panel-heading" role="tab" id="headingTwo">
                         <h1 className="panel-title">
                            <a className="accordion-toggle pointer-hand " data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                                UPCOMING GAMES
                            </a>
                         </h1>
                    </div>
                    <div id="collapseTwo" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTwo">
                      <div className="panel-body">
                          { 
                              this.state.data.map(function (item, index) {                                 
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
                                      sec = Math.floor(delta % 60);                                 
                                  }                                
                              if(index%2==0){
                                  return <div className={index==0 && showcolour==true?"game-qns-box bg-light-blue bg-star-qn":"game-qns-box bg-light-blue"} key={index}>
                                	            <div className="row">
                                    	            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-8">
                                        	            <div className="capsle-game bg-gray"><img src="/images/zoola-game-blue-30.svg" /> <div className="game-text">{item.game_name}</div></div>															
															<div className="capsle-vs bg-gray"><div className="game-time bg-blue"> {item.start_time}</div> <span className="vs-text">{item.short_name}</span></div>
                                    	            </div>
                                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 no-padding">
                                        	            <div className="capsle-people bg-gray"><img src="/images/people-30.svg" /> <div className="people-text">{item.users}</div></div>
                                                        <div className="capsle-people bg-gray pot-capsle"><img src="/images/pot-30.svg" /> <span className="people-text">&pound;{item.total_value}</span></div>
                                                    </div>                                                   
                                                    <div className="col-lg-3 col-md-4 col-sm-4 col-xs-8 no-padding">
                                                        {
                                                            item.tickets.map(function (itm, ind) {                                                               
                                                            return <div className="upcoming-game-numbers" key={ind}>
                                                                   <div className="player-number pointer-hand" onClick={self.viewTicketClick.bind(null, itm.upl_id,'O',item.pls_id) }> {itm.ticket_no} </div>
                                                                     {ind == item.tickets.length-1?<div className="add-btn pointer-hand" onClick={self.gotoLeader.bind(null,item.pls_id)}> <img src="/images/add-btn.svg" alt="" /> </div> :''} 
                                                                </div>                                                             
                                                            })
                                                        }                                                                                                               
                                                    </div>
                                                     <div className="col-lg-3 col-md-2 col-sm-2 col-xs-4 text-center no-padding-left">
                                                        <div className="zoola-btn-remove zoola-btn-invite" onClick={self.gotoInvitemates.bind(null,item.pls_id)}>
                                                           INVITE
                                                        </div>
                                        	            <div className="zoola-btn-viewgame" onClick={self.gotoLeaderboard.bind(null,item.pls_id)}>VIEW GAME</div>
                                                     </div>
                                	            </div>
                                          </div>
                              }
                              else{
                                return <div className="game-qns-box bg-light-blue" key={index}>
                                	            <div className="row">
                                    	            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-8">
                                        	            <div className="capsle-game bg-gray"><img src="/images/zoola-game-blue-30.svg" /> <div className="game-text">{item.game_name}</div></div>															
															<div className="capsle-vs bg-gray"><div className="game-time bg-blue">{item.start_time}</div> <span className="vs-text">{item.short_name}</span></div>
                                    	            </div>
                                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 no-padding">
                                        	            <div className="capsle-people bg-gray"><img src="/images/people-30.svg" /> <div className="people-text"> {item.users}</div></div>
                                                        <div className="capsle-people bg-gray pot-capsle"><img src="/images/pot-30.svg" /> <span className="people-text">&pound;{item.total_value}</span></div>
                                                    </div>                                                   
                                                    <div className="col-lg-3 col-md-4 col-sm-4 col-xs-8 no-padding">
                                                        {
                                                            item.tickets.map(function (itm, ind) {
                                                                return <div className="upcoming-game-numbers" key={ind}>
                                                                            <div className="player-number pointer-hand" onClick={self.viewTicketClick.bind(null, itm.upl_id,'O',item.pls_id) }> {itm.ticket_no} </div>
                                                                           {ind == item.tickets.length-1?<div className="add-btn pointer-hand" onClick={self.gotoLeader.bind(null,item.pls_id)}> <img src="/images/add-btn.svg" alt="" /> </div> :''}
                                                                        </div>
                                                            })
                                                        }                                                                                                                
                                                    </div>
                                                    <div className="col-lg-3 col-md-2 col-sm-2 col-xs-4 text-center no-padding-left">
                                                        <div className="zoola-btn-remove zoola-btn-invite"  onClick={self.gotoInvitemates.bind(null,item.pls_id)}>
                                                            INVITE
                                                        </div>
                                        	            <div className="zoola-btn-viewgame" onClick={self.gotoLeaderboard.bind(null,item.pls_id)}>VIEW GAME</div>
                                                    </div>
                                	            </div>
                                          </div>
                              }                           
                          })}
                          {this.state.showViewTicket ? <ViewTicketModal handleHideViewTicket={this.handleHideViewTicket} ticket={this.state.selectedTicket } gamestatus={this.state.gameStatus} page="DA" plsid={this.state.viewTicketPls}/> : ''}
                          <div className="row no-margin"><div className="col-lg-12 gm-txt blue text-center">Why not join a few more games?Find the perfect challenge on the <a className="underline" href="/gameselection/?islog=true">games page.</a></div></div>
                      </div>
                    </div>
                    <div className="space-5"></div>
                {this.state.showMD ? <MiniDash handleHideMD={this.handleHideMiniDash} uid={this.state.miniDashUID } /> : ''}                  
            </div>
        )
    }
});

//**********--- Component to display past games ---**********
var PastGamesThis;
var PastGames = React.createClass({
    getInitialState: function () {
        return {
            items: [],
            fileredList: [],
            showViewTicket: false,
            selectedTicket: 0,
            itemsshow: 0,
            itemsPerClick: 0,
            hours:0,
            min:0,
            sec:0,
            days:0,
            gameStatus:'',
            viewTicketPls:''
        };
    },
    componentWillMount: function () {
        PastGamesThis=this;
        this.serverRequest = $.get(baseurl + "play/dashboard/"  + userId + "," + sessionId + ",R"  , function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            for (i = 0; i < result.items.length; i++) {
                var str = result.items[i]["start_time"];
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
                this.setState({'days':days})
                var hours = '';
                var min = '';
                var sec = '';
                var delta = Math.abs(matchDay - today) / 1000;
                var matchTime = ""
                if (days == 0)
                {
                    // calculate (and subtract) whole hours
                    hours = Math.floor(delta / 3600) % 24;
                    this.setState({"hours":hours})
                    matchTime="FT +"+hours                 
                }
                else{
                    matchTime = "FT +"+days+"d"
                }
                result.items[i]["match_time"] = matchTime                
                result.items[i]["format_date"] = formatedDate
            }
            var totalItems = result.items.length;
            var itemsshow = 5;
            var itemsPerClick = 5
            var filterWatchlist = result.items.slice(0, itemsshow)
            this.setState({ items: result.items, fileredList: filterWatchlist, itemsPerClick: itemsPerClick, itemsshow: itemsshow })           
            maindata = result.items;
        }.bind(this));
    },
    updateState: function () {
        this.componentWillMount();               
    },
    componentDidMount:function(){
        this.timer = setInterval(this.updateState, 1000*60);
    },
    viewTicketClick: function (upl_id,status,pls) {
        this.setState({ showViewTicket: true, selectedTicket: upl_id ,gameStatus:status,viewTicketPls:pls})
    },
    handleHideViewTicket: function () { 
        this.setState({ showViewTicket: false, selectedTicket:0,gameStatus:'',viewTicketPls:''})
    },
    showMore: function () {
        var itemsshow = this.state.itemsshow + this.state.itemsPerClick;
        var filterWatchlist = this.state.items.slice(0, itemsshow)
        this.setState({ fileredList: filterWatchlist, itemsshow: itemsshow })
    },
    handleHideMiniDash: function () { // Function to hide break points popup
        this.setState({ showMD: false });
    },
    handleshowMiniDash: function (item) { // Function to show break points popup
        this.setState({ showMD: true, miniDashUID: item });
    },
    gotoLeaderboard: function (plsid) {
        window.location = "/leaderboard/?islog=" + is_loggedIn + "&plsid=" + plsid + "&isglory=" + isglory;
    },
    gotoInvitemates: function (plsid) {
        window.location = "/invitemates/?islog=" + is_loggedIn + "&plsid=" + plsid
    },
    render: function () {
        var self = this;
        return ( <div className="panel panel-default">
                        <div className="panel-heading" id="headingThree">
                          <h1 className="panel-title">
                            <a className="accordion-toggle pointer-hand" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
                                PAST GAMES
                            </a>
                          </h1>
                        </div>
                        <div id="collapseThree" className="panel-collapse collapse in" aria-labelledby="headingThree">
                          <div className="panel-body">
                              {this.state.fileredList.map(function (item, index) {
                                  if (index % 2 == 0) {
                                      return  <div className="game-qns-box bg-light-blue" key={index}>
                                	             <div className="row"> 
                                    	            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-8">
                                        	            <div className="capsle-game bg-gray"><img src="/images/zoola-game-blue-30.svg" /> <div className="game-text">{item.game_name}</div></div>															
															<div className="capsle-vs bg-gray"><div className="game-time bg-blue">{item.start_time}</div> <span className="vs-text">{item.short_name}</span></div>
                                    	            </div>
                                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 no-padding">
                                        	            <div className="capsle-people bg-gray"><img src="/images/people-30.svg" /> <div className="people-text">{item.users}</div></div>
                                                        <div className="capsle-people bg-gray pot-capsle"><img src="/images/pot-30.svg" /> <span className="people-text">&pound;{item.total_value}</span></div>
                                                    </div>                                                   
                                                    <div className="col-lg-3 col-md-4 col-sm-4 col-xs-8 no-padding">
                                                          {
                                                              item.tickets.map(function (tkt, ind) {                                                                 
                                                                  return  <div className="player-position bg-gray" key={ind}>
                                            	                            <div className="player-number pointer-hand" onClick={self.viewTicketClick.bind(null, tkt.upl_id,'R',item.pls_id) }> {tkt.ticket_no} </div>
                                                	                        <span className="game-results">
                                                    	                        <span className="position">{formatPosition(tkt.position)}</span>
                                                    	                        <span className="pot-value">&pound;{tkt.value}</span>
                                                	                        </span>
                                                                        </div>                                                                                                                    
                                                              })
                                                          }                                                     
                                                    </div> 
                                                    <div className="col-lg-3 col-md-2 col-sm-2 col-xs-4 text-center no-padding-left">
                                                         <div className="zoola-btn-remove zoola-btn-invite hidden-md hidden-sm hidden-xs"  onClick={self.gotoInvitemates.bind(null,item.pls_id)}>
                                                             INVITE
                                                         </div>
                                        	            <div className="zoola-btn-viewgame btn-gray" onClick={self.gotoLeaderboard.bind(null,item.pls_id)}>VIEW GAME</div>
                                                    </div>   
                                	            </div>
                            	            </div>
                                  }
                                  else {
                                      return <div className="game-qns-box bg-light-blue" key={index}>
                                	             <div className="row">
                                    	            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-8">
                                        	            <div className="capsle-game bg-gray"><img src="/images/zoola-game-blue-30.svg" /> <div className="game-text">{item.game_name}</div></div>															
															 <div className="capsle-vs bg-gray"><div className="game-time bg-blue">{item.start_time}</div> <span className="vs-text">{item.short_name}</span></div>
                                    	            </div>
                                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 no-padding">
                                        	            <div className="capsle-people bg-gray"><img src="/images/people-30.svg" /> <div className="people-text"> {item.users}</div></div>
                                                        <div className="capsle-people bg-gray pot-capsle"><img src="/images/pot-30.svg" /> <span className="people-text">&pound;{item.total_value}</span></div>
                                                    </div>                                                   
                                                    <div className="col-lg-3 col-md-4 col-sm-4 col-xs-8 no-padding">
                                                       {
                                                           item.tickets.map(function (tkt, ind) {                                                            
                                                               return  <div className="player-position bg-gray" key={ind}>
                                            	                           <div className="player-number pointer-hand" onClick={self.viewTicketClick.bind(null, tkt.upl_id,'R',item.pls_id) }> {tkt.ticket_no} </div>
                                                	                        <span className="game-results">
                                                    	                        <span className="position">{formatPosition(tkt.position)}</span>
                                                    	                        <span className="pot-value">&pound;{tkt.value}</span>
                                                	                        </span>
                                                                        </div>                                                              
                                                           })
                                                       }                                                     
                                                    </div> 
                                                     <div className="col-lg-3 col-md-2 col-sm-2 col-xs-4 text-center no-padding-left">
                                                         <div className="zoola-btn-remove zoola-btn-invite hidden-md hidden-sm hidden-xs"  onClick={self.gotoInvitemates.bind(null,item.pls_id)}>
                                                             INVITE
                                                         </div>
                                        	            <div className="zoola-btn-viewgame btn-gray" onClick={self.gotoLeaderboard.bind(null,item.pls_id)}>VIEW GAME</div>
                                                     </div>
                                                   </div>                                               
                                	            </div>                               
                                  }
                              })}
                          {this.state.showViewTicket ? <ViewTicketModal handleHideViewTicket={this.handleHideViewTicket} ticket={this.state.selectedTicket } gamestatus={this.state.gameStatus} page="DA" plsid={this.state.viewTicketPls}/> : ''}
                              {this.state.itemsshow<this.state.items.length?<div className="row">
                                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-12 col-centered">
                                    <div className="btn zoola-btn margin-top-10">
                                        <div className="btn-txt" onClick={this.showMore}>More</div>
                                    </div>
                                </div>
                          </div>:''}                              
                          </div>
                        </div>
                        <div className="space-5"></div>
                {this.state.showMD ? <MiniDash handleHideMD={this.handleHideMiniDash} uid={this.state.miniDashUID } /> : ''}
            </div>
        )
    }
});

//**********--- Component to display watch list ---**********
var WatchList = React.createClass({
    getInitialState: function () {
        return {
            items: [],
            miniDashUID:0,
            fileredList: [],
            itemsshow: 0,
            itemsPerClick:0,
            countdown: "",
            hours:0,
            min:0,
            sec:0,
            days:0
        };
    },
    componentWillMount: function () {
        this.serverRequest = $.get(baseurl + "play/watchlist/"  + userId + "," + sessionId , function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            for (i = 0; i < result.items.length; i++) {               
                var str = result.items[i]["start_time"];               
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
                this.setState({'days':days})
                var hours = '';
                var min = '';
                var sec = '';
                var delta = Math.abs(matchDay - today) / 1000;
                if (days == 0)
                {
                    // calculate (and subtract) whole hours
                    hours = Math.floor(delta / 3600) % 24;
                    this.setState({"hours":hours})
                    delta -= hours * 3600;

                    // calculate (and subtract) whole minutes
                    min = Math.floor(delta / 60) % 60;
                    this.setState({"min":min})
                    delta -= min * 60;

                    // what's left is seconds
                    sec = Math.floor(delta % 60);  // in theory the modulus is not required
                    this.setState({"sec":sec})
                }
                result.items[i]["format_date"] = formatedDate
            }
            var totalItems = result.items.length;
            var itemsshow = 5;
            var itemsPerClick=5
            var filterWatchlist = result.items.slice(0, itemsshow)
            this.setState({ items: result.items, fileredList: filterWatchlist, itemsPerClick: itemsPerClick, itemsshow: itemsshow })
            maindata = result.items;
        }.bind(this));       
    },
    showMore:function(){
        var itemsshow = this.state.itemsshow + this.state.itemsPerClick;
        var filterWatchlist = this.state.items.slice(0, itemsshow)
        this.setState({  fileredList: filterWatchlist, itemsshow: itemsshow })
    },
    removeGame: function (id, action) { // Function to remove game from watchlist
        var self = this;
        this.serverRequest = $.get(baseurl + "play/watchupdate/" + userId + "," + sessionId + "," + id + "," + action, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            self.componentWillMount();
        }.bind(this));
    },
    handleHideMiniDash: function () { // Function to hide break points popup
        this.setState({ showMD: false });
    },
    handleshowMiniDash: function (item) { // Function to show break points popup
        this.setState({ showMD: true, miniDashUID:item });
    },
    gotoLeaderboard: function (plsid) {
        window.location = "/leaderboard/?islog=" + is_loggedIn + "&plsid=" + plsid + "&isglory=" + isglory;
    },
    gotoInvitemates: function (plsid) {
        window.location = "/invitemates/?islog=" + is_loggedIn + "&plsid=" + plsid
    },
    render: function () {
        var self = this;
        return (
            <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingTwo2">
                         <h1 className="panel-title">
                            <a className="accordion-toggle pointer-hand " data-toggle="collapse" data-parent="#accordion" href="#collapseFour">
                             Watchlist
                            </a>
                         </h1>
                    </div>
                    <div id="collapseFour" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTwo">
                      <div className="panel-body">
                          {this.state.fileredList.map(function (item, index) {
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
                              if(index%2==0)
                              {
                                  return <div className="game-qns-box bg-light-blue" key={index}>
                                	        <div className="row">
                                    	        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-8">
                                        	        <div className="capsle-game bg-gray"><img src="/images/zoola-game-blue-30.svg" /> <div className="game-text">{item.game_name}</div></div>													
														<div className="capsle-vs bg-gray"><div className="game-time bg-blue">{item.start_time}</div> <span className="vs-text">{item.short_name}</span></div>
                                    	        </div>
                                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 no-padding">
                                        	        <div className="capsle-people bg-gray"><img src="/images/people-30.svg" /> <div className="people-text">{item.users}</div></div>
                                                    <div className="capsle-people bg-gray pot-capsle"><img src="/images/pot-30.svg" /> <span className="people-text">&pound;{item.total_value}</span></div>
                                                </div>                                                
                                                <div className="col-lg-2 col-md-2 col-sm-4 col-xs-9 hidden-sm hidden-xs">
                                                    <div className="zoola-btn-remove"  onClick={self.gotoInvitemates.bind(null,item.pls_id)}>
                                                        INVITE
                                                    </div>                                       	       
                                                </div>
                                                <div className="col-lg-2 col-md-2 col-sm-4 col-xs-8">
                                        	        <div className="zoola-btn-remove " onClick={self.removeGame.bind(null,item.pls_id,'R')}>
                                        	            REMOVE
                                        	        </div>
                                                </div>
                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-4 text-center no-padding-right">
                                        	        <div className="zoola-btn-viewgame" onClick={self.gotoLeaderboard.bind(null,item.pls_id)}>VIEW GAME</div>
                                                </div>
                                	        </div>
                         	            </div>
                              }
                              else {
                                  return <div className="game-qns-box bg-light-blue" key={index}>
                                          <div className="row">
                                             <div className="col-lg-3 col-md-3 col-sm-3 col-xs-8">
                                                  <div className="capsle-game bg-gray"><img src="/images/zoola-game-blue-30.svg" /> <div className="game-text">{item.game_name}</div></div>												  
													  <div className="capsle-vs bg-gray"><div className="game-time bg-blue">{item.start_time}</div> <span className="vs-text">{item.short_name}</span></div>
                                              </div>
                                              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 no-padding">
                                                  <div className="capsle-people bg-gray"><img src="/images/people-30.svg" /> <div className="people-text"> {item.users}</div></div>
                                                  <div className="capsle-people bg-gray pot-capsle"><img src="/images/pot-30.svg" /> <span className="people-text">&pound;{item.total_value}</span></div>
                                              </div>                                              
                                              <div className="col-lg-2 col-md-2 col-sm-4 col-xs-7 hidden-sm hidden-xs">
                                                  <div className="zoola-btn-remove"  onClick={self.gotoInvitemates.bind(null,item.pls_id)}>
                                                      INVITE
                                                  </div>                                                
                                              </div>                                            
                                              <div className="col-lg-2 col-md-2 col-sm-4 col-xs-8">
                                                  <div className="zoola-btn-remove" onClick={self.removeGame.bind(null, item.pls_id,'R')}>
                                                      REMOVE
                                                  </div>
                                              </div>
                                              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-4 text-center no-padding-right">
                                                  <div className="zoola-btn-viewgame" onClick={self.gotoLeaderboard.bind(null,item.pls_id)}>VIEW GAME</div>
                                              </div>
                                              </div>
                                           </div>
                              }
                          })}                          	
                          {this.state.itemsshow<this.state.items.length?<div className="row">
                                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-12 col-centered">
                                    <div className="btn zoola-btn margin-top-10">
                                        <div className="btn-txt" onClick={this.showMore}>More</div>
                                    </div>
                                </div>
                          </div>:''}
                      </div>
                    </div>
                    <div className="space-5"></div>
                {this.state.showMD ? <MiniDash handleHideMD={this.handleHideMiniDash} uid={this.state.miniDashUID }/> : ''}
                <div className="row no-margin"><div className="col-lg-12 gm-txt blue text-center">See something you like?Track interesting games by clicking 'add to watchlist' so that you never miss a beat.</div></div>
            </div>
        )
    }
});

//**********---- Component to display dropdown for start question ----**********
var OptdropQue = React.createClass({
    getInitialState:function(){
        return {
            staroption:0
        }
    },   
    componentWillReceiveProps:function(){
        var data = this.props.self.state.uniqedata;
        
        var starOption = data.filter(function(d){
            if(d.isStar)
            {
                return true
            }
        })        
        if(starOption.length>0)
        {
            this.setState({staroption:starOption[0]['evi_id']})
            $("#OptdropQue"+this.props.ind).val(starOption[0]['evi_id'])
        }       
    },
    handleSlelect:function(){
        var data = this.props.self.state.uniqedata;
        var item = $("#OptdropQue"+this.props.ind).val()              
        for(i=0;i<data.length;i++){          
            if(data[i].evi_id == item){               
                data[i].isStar=true;
            }
            else{
                data[i].isStar=false;
            }
        }
        this.props.self.setState({uniqedata:data});
    },
    render: function () {
        var self=this;
        var ids= "OptdropQue"+this.props.ind;
        return (
           <div className="zoola-select bg-white">
              <select className="starQuestion" id={ids} onChange={this.handleSlelect}>
                    <option></option>
        {
            this.props.data.map(function (item, index) {
                return <option key={index} className="pointer-hand" value={item.evi_id} >{item.evi_number}</option>
            })
        }
            </select>
          </div>
        )
    }
});
//**********---- Component to display dropdown in tablet view edit ticket ----**********
var OptdropEdit = React.createClass({
    handleSlelect:function(item){       
        var data = this.props.self.state.uniqedata;
        var ind = this.props.ind;       
        if(this.props.queType=="2SWITCH")
        {
            if($("#"+this.props.ids).val()=="Y")
            {
                data[ind].answer='Y';
            }
            else{
                data[ind].answer='N';
            }
            data[ind].pic_id= data[ind]['picValues'][data[ind]['values'].indexOf( data[ind].answer)]['pic_id']
        }
        else if(this.props.queType=="SLIDER"){         
                data[ind].answer=$("#"+this.props.ids).val();
                if(this.props.option=='Y' ){
                    var picid;
                    if( $("#"+this.props.ids).val()==0)
                    {
                        var picval = data[ind]['picValues'].filter(function(d){
                            if(d.pic_value2==0)
                            {
                                return true;
                            }
                        })
                        if(picval.length>0)
                        {
                            picid=picval[0]['pic_id'];
                        }
                    }else{
                        var picval = data[ind]['picValues'].filter(function(d){
                            if(d.pic_value2.includes("-"))
                            {
                                return true;
                            }
                        })
                        if(picval.length>0)
                        {
                            picid=picval[0]['pic_id'];
                        }
                    }                        
                    data[ind].pic_id= picid
                }
                else{                  
                    picid=data[ind]['picValues'][0]['pic_id']
                    data[ind].pic_id= data[ind]['picValues'][0]['pic_id']
                }                              
        }
        else{
            data[ind].answer=$("#"+this.props.ids).val();
            data[ind].pic_id= data[ind]['picValues'][data[ind]['values'].indexOf( data[ind].answer)]['pic_id']
        }       
        this.props.self.setState({uniqedata:data})
    },
    componentWillReceiveProps:function(){
        var data = this.props.self.state.uniqedata;
        var ind = this.props.ind;      
        if(data[ind].answer=='Y')
        {
            $("#"+this.props.ids).val('Y');
        }
        else if(data[ind].answer=='N')
        {
            $("#"+this.props.ids).val('N');
        }
        else if(data[ind].answer!='No Answer' && data[ind].answer!=''){
            $("#"+this.props.ids).val(data[ind].answer);
        }
        else if(data[ind].answer!='No Answer'){
          $("#"+this.props.ids).val('');
        }      
    },
    render: function () {
        var self=this;        
        return (
            <div className="zoola-select bg-white">
               <select className="" onChange={this.handleSlelect} id={this.props.ids} defaultValue={this.props.ans}>
                     <option value=""></option>
                     {
                         this.props.val.map(function (item, index) {
                             if(self.props.queType=="SLIDER")
                             {
                                 var vals = item.split("-");
                                 var start = vals[0]
                                 var end = vals[1];
                                 var e;
                                var que=[];
                                var opt=start;
                                if(isNaN(e)){
                                    e = end.split('+')
                                    if(e.length==0)
                                    {
                                        e = end.split('-')
                                    }
                                    e=e[0];
                                }
                                while(opt<=e){
                                    if (opt==e)
                                    {
                                        que.push(<option className="pointer-hand" value={end}>{end}</option>)
                                    }
                                    else{
                                        que.push(<option className="pointer-hand" value={opt}>{opt}</option>)
                                    }                                   
                                    opt++;
                                }
                                return que                                 
                             }
                             else{                            
                                 if(item=='Y'){
                                   return <option key={index} className="pointer-hand" value="Y" >YES</option>
                                 }
                                 else if(item=='N'){                                    
                                     return <option key={index} className="pointer-hand" value="N">NO</option>
                                 }
                                 else{
                                     return <option value={item} key={index} className="pointer-hand" >{item}</option>
                                }
                             }                            
                         })
                     }
                 </select>
            </div>
        )
    }
});

//**********--- Component to display OPTA block ---**********
var Opta = React.createClass({
    render: function () {
        return (
            <div className="panel panel-default col-centered login-box">
                <div className="bg-zoola-orange stats-header">
                    <div className="row">
                    <div className="col-lg-7 col-md-6 col-sm-7 col-xs-6 text-center">
                        <h2 className="panel-title">Stats Room</h2>
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-5 col-xs-6 text-left">
                        <div className="powered-by">Powered by</div>
                        <div><img src="/images/opta-bg.png" alt="" width="120" /></div>
                    </div>
                    </div>
                 </div>
                 <div className="padding-30">
                   <div className="space-10"></div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                            <img src="/images/Hotspurs.svg" />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                            <img src="/images/opta-graph.png" />
                        </div>
                    </div>
    			    <div className="space-10"></div>
                    <div className="space-5"></div>
                 </div>
                <div className="panel-footer text-center bg-zoola-green stats-footer pointer-hand">
                    <h2 className="panel-title">Enter Stats Room</h2>
                </div>
            </div>
        )
    }
});

//**********--- Component to display Mini profile block ---**********
var MiniProfile = React.createClass({
    gotoTopup: function () {     //**********--- Function to navigate to Topup page---**********
        if (!SupHeaderThis.state.items.status == 'P' || SupHeaderThis.state.items.status == 'T') {
            window.location = "/quicktopup/?islog=" + is_loggedIn
        }
        else {
            window.location = "/topup/?islog=" + is_loggedIn
        }
    },
    render: function () {
        return (<div className="panel panel-default col-centered login-box">
                    <div className="bg-zoola-orange stats-header">
                        <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-3 text-center">
                            <img width="65" src="/images/beard1.png" className="padding-top-10" />
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-9 text-center">
                            <div className="player-name">Luigi_123</div>
                            <div className="zoola-bt-edit white"> Edit Profile</div>
                        </div>
                        </div>
                    </div>
                    <div className="padding-30">
                        <div className="row">
                            <div className="col-lg-7 col-md-7 col-sm-7 col-xs-12 text-center no-padding-right">
                                <div className="bg-offwhite points-rank border-radius-30">
                                    <div className="med-cop1"> Global Points: <span className="points-bold"><strong>345</strong></span></div>
                                    <div className="med-cop1"> Global Rank: <span className="points-bold"><strong>1287</strong></span></div>
                                </div>
                            </div>
                            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12 text-center">
                                <div className="global-cup bg-white border-radius-30">
                               	    <img src="/images/global-cup.svg" /><br />
                                    VIEW GLOBAL LEADERBOARD
                                </div>
                            </div>
                        </div>
                        <div className="space-5"></div>
                        <div className="row">
                            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12 text-center">
                                <div className="bg-white border-radius-30 margin-bottom-10">
                                    <div className="points-bold font-40 padding-bottom-20 padding-top-20"> <i className="fa fa-gbp font-30"></i> 23.45</div>
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-7 col-sm-7 col-xs-12 text-center">
                                <div className="player-rank">
                                    Rank #2 <img src="/images/zoola-game-blue-30.svg" width="20" /> Ben Game1 <span className="capsle-value"> + <i className="fa fa-gbp"></i> 45 </span>
                                </div>
                                <div className="player-rank">
                               	    <img src="/images/ticket-30.svg" width="20" /><span className="points-bold"> 1</span> &nbsp;&nbsp;<img src="/images/zoola-game-blue-30.svg" width="20" /> Ben Game1 <span className="capsle-value">- <i className="fa fa-gbp"></i> 10.10 </span>
                                </div>
                                <div className="player-rank">
                                    Funds added <span className="capsle-value"> + <i className="fa fa-gbp"></i> 25 </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel-footer text-center bg-zoola-green stats-footer pointer-hand">
                        <h2 className="panel-title" onClick={this.gotoTopup}>Quick Top-up</h2>
                    </div>
                    </div>
       )
    }
});

function formatPosition(pos){
    var suffix='';
    var j = (pos)%10;                                                                 
    var k = (pos)%100;
    
        if (j == 1 && k != 11) {
            suffix = "st";                                                            
        }
        else if (j == 2 && k != 12) {
            suffix = "nd";
        }
        else if (j == 3 && k != 13) {
            suffix = "rd";
        }
        else suffix = "th";
        return pos+""+suffix
}