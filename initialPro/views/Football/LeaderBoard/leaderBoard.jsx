var home_team="";
var away_team="";
var header_Scope ='';
var isglory =false;
//var is_loggedIn = false;
var ticketCount=0;
var plsid= getParameterByName("plsid");
//plsid =1;
//userId=2;
//baseurl= "http://apex.zoolalondon.com/zoola/apitest/"
//**********--- call getCookie function to read cookie---**********

if(getParameterByName("islog") && getParameterByName("islog") == 'true'){
    is_loggedIn=true;
    //ticketCount =1;
    getCookie()
}
else{
    is_loggedIn = false;
    getCookieForNonAuth()
}

getCookieForNonAuth()

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
            this.setState({ countdown: this.props.msg });
            this.props.self.changeGameStart();
            scoresThis.changeGameStart();
            GLThis.changeGameStart()
            //h2hThis.changeGameStart();
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



var userimage;
var username;
$.ajax({
    type: "GET",
    url: baseurl+"fixture/chat/"+ userId+"," + sessionId,
    async: false,
    success: function (result) {
        //console.log(result)
        if (typeof result != 'object') {
            result = JSON.parse(result)
        }
        if (result.user[0]['usr_image'] == "" || result.user[0]['usr_image'] == null) {
            userimage = 24;
        }
        else{
            userimage=result.user[0]['usr_image'];
            username=result.user[0]['username']
        }
        
    }
});


var Commentary = React.createClass({
    getInitialState: function(){
        return {
            matchData:{}
        }
    },
    componentWillMount: function () {
        var self = this;
        this.serverRequest = $.get(baseurl+"fixture/pregame1/"+plsid, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            this.serverRequest = $.get(baseurl+"fixture/commentary/"+ userId+"," + sessionId + ","+result.items[0]['fxt_id'], function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                self.setState({ matchData: result.items[0] })
                //{"items":[{"season_id":2015,"competition_id":3,"fixture_id":838556}]}
            }.bind(this));
        });
        
        
    },
    updateState: function () {
        this.render();
        
       
    },
    componentDidMount:function(){
        this.timer = setInterval(this.updateState, 1000*60);
        //setTimeout(this.updateState, 1000);
    },
    render: function () {
        //console.log("render====")
        return (
           <opta-widget sport="football" widget="commentary" state="auto" template="normal" live="true" competition={this.state.matchData.competition_id} season={this.state.matchData.season_id} match={this.state.matchData.fixture_id} data_type="auto" order_by="time_descending" show_minor_events="true" fixed_height_comments="0" show_live="true" show_logo="true" title="" show_title="true" breakpoints="400"></opta-widget>
        )
    }
});

// Component for playerchat
var PlayerChat= React.createClass({
    getInitialState: function(){
        return {
            user :{},
            groupChatId:''
        }
    },
    setChat:function(){
        //console.log("username========",this.state.user.username)
        //var name=this.state.user.username;
        //var FlyzooApi = FlyzooApi || {};
        //FlyzooApi.UserId = userId;
        //FlyzooApi.UserName = "vaibhav";
        //FlyzooApi.Avatar = "http://localhost:8000/images/animals-Modified/"+this.state.user.usr_image+".svg ";
        //(function () {
        //    window._FlyzooApplicationId="577a04414fb4d521a8fbd657577a03844fb4d521a8fbd653";
        //    var fz = document.createElement('script'); fz.type = 'text/javascript'; fz.async = true;
        //    fz.src = 'http://widget.flyzoo.co/scripts/flyzoo.start.js';
        //    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(fz, s);
        //})();
    },
    componentWillMount: function () {
    var groupchatId1 = '577a04424fb4d521a8fbd65c';
    this.serverRequest = $.get(baseurl + "play/groupchat/"+userId + "," + sessionId + "," + plsid, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            if(result.items[0].groupchatid != ''){
                groupchatId1 = result.items[0].groupchatid;
            }
            this.setState({groupChatId:groupchatId1});
        }.bind(this));

        //this.serverRequest = $.get(baseurl+"fixture/chat/"+ userId+"," + sessionId,function (result) {
        //        if (typeof result != 'object') {
        //            result = JSON.parse(result)
        //        }
        //        if (result.user[0]['usr_image'] == "" || result.user[0]['usr_image'] == null) {
        //            result.user[0]['usr_image'] = 24;
        //        }
        //        this.setState({user: result.user[0] })
        //        this.setChat();
        //    }.bind(this));
    },
    componentDidMount:function(){
//if (ENV == 'PROD') {
//                (function () {
//                    window._FlyzooApplicationId = "57976aedbb547e2024758272577a03844fb4d521a8fbd653";
 //                   var fz = document.createElement('script'); fz.type = 'text/javascript'; fz.async = true;
 //                   fz.src = '//widget.flyzoo.co/scripts/flyzoo.start.js';
 //                   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(fz, s);
 //               })();
//}else{
     var $head = $("#flyzoo-embedded-chat-577a04424fb4d521a8fbd65c5357").contents().find("head");                
        $head.append($("<link/>", { rel: "stylesheet", href: "/css/datePicker.css", type: "text/css" }));

        $('iframe').load( function() {
        $('iframe').contents().find("head").append($("<style type='text/css'>.header-desktop { display: none; }</style>"));
        });
//}
    },
    render: function () {
        var chatStyle={
            "width":"auto",
            "height":"640px"
        }
        return (
         <div id='flyzoo-embedded-chatroom' data-id={this.state.groupChatId} style={chatStyle}></div>
            )
        }
        });


var headerThis;

//**********---- component for the kickoff and Add to Watchlist header---**********
var Headers = React.createClass({
    getInitialState: function () {
        return {
            data: {},
            payout:[],
            tickets:[],
            showMiniDash:false,
            startTime:"",
            hours:0,
            min:0,
            sec:0,
            days:0,
            showCountDown:false,
            iskickoff:false,
            isaddedtowl:false,
            preStatus:'',
            groupChatId : ''
        };
    },
    changeGameStart:function(){
        this.setState({iskickoff:true})
    },
    componentWillMount: function () {
        this.serverRequest = $.get(baseurl + "fixture/payformat/"+plsid, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }          
            this.setState({payout: result.items,payoutper:result.items[0].pay_out_top_per});
        }.bind(this)); 

       // this.serverRequest = $.get(baseurl + "play/groupchat/"+userId + "," + sessionId + "," + plsid, function (result) {
        //    if (typeof result != 'object') {
        //        result = JSON.parse(result)
        //    }
        //    this.setState({groupChatId: result.items[0].groupchatid});
            //if(result.items[0].groupchatid != ''){
            //    FlyzooApi.startGroupChat('57974c3cbb547e1c186ae33f', 'Public Chatroom');
            //}
       // }.bind(this)); 
        
        
       headerThis=this;
       var startTime=""
        // console.log(is_loggedIn)
      
       var self = this;
        if (is_loggedIn == false){
            $.ajax({
                type: "GET",
                url: baseurl+"fixture/pregame1/"+plsid,
                async: false,
                success: function (result) {
                    if (typeof result != 'object') {
                        result = JSON.parse(result)
                    }
                    if(result.items[0]['status']!='O' && self.state.preStatus=='O'){
                        QuestionsThis.componentWillMount()
                        //document.getElementById("BuyticketF").style.display = "block"
                    }
                    else{

                        self.setState({preStatus:result.items[0]['status']})
                    }
                    self.setState({ data: result.items[0],tickets:[] })
                    maindata = result.items[0];
                    startTime = maindata.start_time;//"20160609170700";
                    var str = startTime;
                    var year = str.slice(0, 4);
                    var month = str.slice(4, 6);
                    var day = str.slice(6, 8);
                    var hours = str.slice(8, 10);
                    var min = str.slice(10, 12);
                    var sec = str.slice(12, 14);
                    var formatedDate = year + "/" + month + "/" + day + " " + hours + ":" + min + ":" + sec;
                    self.setState({startTime:formatedDate});

                    // date
                    var matchDay = new Date(formatedDate);
                    var today = new Date();
                    var days = diffdates('d', today, matchDay);
                    self.setState({"days":days})
                    var hours = '';
                    var min = '';
                    var sec = '';
                    var delta = Math.abs(matchDay - today) / 1000;
                    if (days == 0)
                    {
                        // calculate (and subtract) whole hours
                        hours = Math.floor(delta / 3600) % 24;
                        self.setState({"hours":hours})
                        delta -= hours * 3600;

                        // calculate (and subtract) whole minutes
                        min = Math.floor(delta / 60) % 60;
                        self.setState({"min":min})
                        delta -= min * 60;

                        // what's left is seconds
                        sec = Math.floor(delta % 60);  // in theory the modulus is not required
                        self.setState({"sec":sec})
                    }
                    self.setState({"showCountDown":true})
                }
            });
            //this.serverRequest = $.get(baseurl+"fixture/pregame1/"+plsid, function (result) {
                
            // }.bind(this));
        }
        else{
            $.ajax({
                type: "GET",
                url: baseurl+"play/game1/"+ userId+"," + sessionId+"," +plsid,
                async: false,
                success: function (result) {
                    if (typeof result != 'object') {
                        result = JSON.parse(result)
                    }
                    var tkts = result.items[0]['tickets'];
                    if(tkts[0]==0)
                    {
                        tkts=[]
                    }
                    if(result.items[0]['status']!='O' && self.state.preStatus=='O' && showBanner == true){
                        QuestionsThis.componentWillMount()
                        document.getElementById("BuyticketF").style.display = "block"
                    }
                    else{

                        self.setState({preStatus:result.items[0]['status']})
                    }
                    var isAddedToWL;
                    //result.items[0]['status']='C';
                    self.setState({isaddedtowl:result.items[0]['watchlist']=='N'?false:true})
                    self.setState({ data: result.items[0],tickets:tkts })
                    maindata = result.items[0];
                    startTime = maindata.start_time;//"20160609171200";
                    var str = startTime;
                    var year = str.slice(0, 4);
                    var month = str.slice(4, 6);
                    var day = str.slice(6, 8);
                    var hours = str.slice(8, 10);
                    var min = str.slice(10, 12);
                    var sec = str.slice(12, 14);
                    var formatedDate = year + "/" + month + "/" + day + " " + hours + ":" + min + ":" + sec;
                    self.setState({startTime:formatedDate});
                    // date
                    var matchDay = new Date(formatedDate);
                    var today = new Date();
                    var days = diffdates('d', today, matchDay);
                    self.setState({"days":days})
                    var hours = '';
                    var min = '';
                    var sec = '';
                    var delta = Math.abs(matchDay - today) / 1000;
                    if (days == 0)
                    {
                        // calculate (and subtract) whole hours
                        hours = Math.floor(delta / 3600) % 24;
                        self.setState({"hours":hours})
                        delta -= hours * 3600;

                        // calculate (and subtract) whole minutes
                        min = Math.floor(delta / 60) % 60;
                        self.setState({"min":min})
                        delta -= min * 60;

                        // what's left is seconds
                        sec = Math.floor(delta % 60);  // in theory the modulus is not required
                        self.setState({"sec":sec})
                    }
                    //QuestionsThis.componentWillMount();
                    //CreateAnotherThis.componentWillMount();
                    if(TicketsThis)
                        TicketsThis.updateTickets(tkts);
                    self.setState({"showCountDown":true})
                }
            });
            //this.serverRequest = $.get(baseurl+"play/game1/"+ userId+"," + sessionId+"," +plsid, function (result) {
                
            //}.bind(this));
        }
       //this.timer = setInterval(this.componentWillMount, 1000);
        //setTimeout(this.componentWillMount, 1000);
       
    },
    updateState: function () {
        this.componentWillMount();
    },
   componentDidMount:function(){
       this.timer = setInterval(this.updateState, 10000);
       //setTimeout(this.updateState, 1000);
   },
   handleHideMiniDash: function(){ // Function to hide break points popup
     this.setState({showMD:false});
   },
   handleshowMiniDash: function(item){ // Function to show break points popup
        this.setState({showMD:true});
    },
   render: function () {
       header_Scope= this;
       return (
           <div>
                <div className="container-fluid header">
                    <div className="container no-padding">
                        {/* <div className="row no-margin">
                            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-10 padding-top-20  no-padding">
                                <div className="game-title">
                                    <img src="/images/zoola-game-white.svg" className="game-icon" />
                                    <span className="kickoff-cop2">{this.state.data.game_name}</span>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-1 col-xs-2 player-img no-padding"><img src="/images/beard1.png" className="pointer-hand" />
                            </div>
                            <div className="col-lg-5 col-md-5 col-sm-6 col-xs-12 text-center no-padding">
                                <div className="row">
                    	             <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 no-padding">
                        	            <div className="kickoff-cop1 padding-top-10 padding-bottom-10 text-center">
                                            <span className="kickoff">Game kickoff : </span>
                                            <span className="lb-kickoff-time">{this.state.data.status=='O'?<span>{ this.state.days > 0 ?  this.state.days + ' day(s)' : <span>{this.state.showCountDown?<CountDown hours={this.state.hours} minutes={this.state.min} seconds={this.state.sec } self={this} msg="Game live"/>:''}</span> }</span> :this.state.data.status=='R'?<CountDown hours={this.state.hours} minutes={this.state.min} seconds={this.state.sec } self={this} msg='Game finished'/>:this.state.data.status=='C'?<CountDown hours={this.state.hours} minutes={this.state.min} seconds={this.state.sec } self={this} msg='Game live'/>:this.state.data.status=='A'?'Abandoned':''}</span>
                                        </div>
                    	             </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 padding-bottom-20 hidden-xs no-padding-left">
                        	            {this.props.isLog?<div className={this.state.isaddedtowl?"watchlist col-centered wl-disable":"watchlist col-centered"} onClick={this.addToWatchlist}><img src="/images/eye-white.svg" width="25"/> add to watchlist</div>:''}
                                    </div>
                               </div>
                            </div>
                        </div>*/}
                         <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center padding-10 game-title">
                                <div className="gm-txt margin-tb-10"><img src="/images/zoola-game-white.svg" width="30" className="margin-right-10" />{this.state.data.game_name}</div>
                            </div>
                         </div>
                    </div>
                </div>
	            <div className="container-fluid bg-light-blue">
                  <div className="container no-padding">
       		            <div className="row pp-pot-tkt">
            	            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-right no-padding-right">
                	            <div className="capsle"><img src="/images/people.svg"  /><span className="capsle-text" title={"max "+this.state.data.users.split("/")[1]+" people play the game and "+this.state.data.users.split("/")[0]+" has joined the game"}>{this.state.data.users}</span></div>
            	            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center no-padding-right">
                	            <div className="capsle"><img src="/images/entry-fee.svg" /><span className="capsle-text">&pound;{this.state.data.entry_}</span></div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-left ">
                	            <div className="capsle">
                	                <img src="/images/pot.svg"/><span className="capsle-text">&pound;{this.state.data.total_value}</span>
                	            </div>
                            </div>
       		            </div>
                  </div>
	            </div>
                <div className="container-fluid payoutheader">
                      <div className="container no-padding">
                            <div className="row">
                                
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding pay-out text-center">
                                  <ul>
                  	                <li>
                    	                <div className="payout-top25">
                        	                <div className="pos-txt line-height-15">PAYOUT:</div>
											{/*<div className="mon-txt line-height-15">TOP {this.state.payoutper}%</div>*/}
											 <div className="mon-txt line-height-15"> {this.state.payoutper} %</div>
                    	                </div>
                  	                </li>
                                      {
                                          this.state.payout.map(function (item, index) {
                                              if(index>0)
                                              {
                                                  return <li key={index}>
                                                    <span className="pos-txt">{item.rank}: </span><span className="pyo-txt">&pound;{item.win_amt}</span>
                                                  </li>
                                               }
                                          
                                          })
                                      }
                                    
                                    
                                  </ul>
                                </div>                               
                                
                           
                            </div>
                      </div>
                </div>
                {this.state.showMD?<MiniDash handleHideMD={this.handleHideMiniDash} />:''}
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
        //if(min>45)
        //{
        //    min=min-15
        //}
        var sec = s;
        var tim = setInterval(function(){ 
            //console.log("min==",min)
            if(min>=45 && min<60 )
            {
               // clearInterval(tim)
                //setTimeout(function(){self.updateTimer(hou,min,sec+1);},15000*60)
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
    componentWillReceiveProps:function(){
        //console.log("hours====",this.props.hours," minutes====",this.props.minutes," seconds====",this.props.seconds,"fd==",this.props.fd)
        //this.updateTimer(this.props.hours,this.props.minutes,this.props.seconds)
    },
    shouldComponentUpdate :function(nextProps, nextState){
        //console.log("shouldComponentUpdate===",nextProps.fd)
        if(nextProps.fd !== this.props.fd){
            var matchDay = new Date(nextProps.fd);                
            var today = new Date();
            var days = diffdates('d', today,matchDay);  
            //console.log(days)
            this.setState({'days':days})
            var hours = '';
            var min = '';
            var sec = '';
            var delta = Math.abs(today-matchDay) / 1000;
            //console.log("delta==",delta)
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
            this.updateTimer(hours,min,sec)
        }
        return nextProps.fd !== this.props.fd;
    },
    componentWillMount:function(){
       // console.log("componentWillMount-----hours====",this.props.hours," minutes====",this.props.minutes," seconds====",this.props.seconds,"fd==",this.props.fd)
        
    },
    componentDidMount: function () {
        var matchDay = new Date(this.props.fd);                
        var today = new Date();
        var days = diffdates('d', today,matchDay);  
        //console.log(days)
        this.setState({'days':days})
        var hours = '';
        var min = '';
        var sec = '';
        var delta = Math.abs(today-matchDay) / 1000;
        //console.log("delta==",delta)
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
        this.updateTimer(hours,min,sec)
    },
    render: function () {
        //console.log("count up render")
        return (
                    <span> {this.state.countup}</span>
        )
    }
});

//**********---- Component to display Score Card  of Both Teams ----**********
var scoresThis;
var Scores = React.createClass({
    getInitialState: function () {
        return {
            data: {},
            iskickoff:false,
            team: {},
            Home:[],
            Away: [],
            countup: "",
            hours:0,
            min:0,
            sec:0,
            days:0,
            h_goal_scored:0,
            a_goal_scored:0
        };
    },
    componentWillMount: function () {
        scoresThis = this;
        var self= this;
        this.serverRequest = $.get(baseurl+"fixture/pregame1/"+plsid, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }           
            for (i = 0; i < result.items.length; i++) {              
                var str = result.items[i]["start_time"];  
                //console.log("start time ===",result.items[i]["start_time"])
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
                //console.log("minutes==",minutes);
                result.items[i]['min']=minutes;               
                var days = diffdates('d', today,matchDay);  
                //console.log("days==",days)
                this.setState({'days':days})
                var hours = '';
                var min = '';
                var sec = '';
                var delta = Math.abs(today-matchDay) / 1000;
                //console.log("delta==",delta)
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
                //console.log("hours==",hours," min==",min," sec==",sec)
                result.items[i]["format_date"] = formatedDate
            }          
            //this.setState({ data: result.items });
            var fixID = result.items[0]['fxt_id'];
            if(headerThis.state.iskickoff)
            {
                this.serverRequest = $.get(baseurl+"play/score/"+plsid, function (result1) {
                    //console.log(result1)
                    if (typeof result1 != 'object') {
                        result1 = JSON.parse(result1)
                    } 
                    //result1={"team_stat":{"start_time":"20160627200122","h_goal_scored":"1","a_goal_scored":"2"},"Home":[{"h_goal_count":"1","h_cor_cnt":"7","h_crd_cnt":"1","h_sht_trg":"7"}],"Away":[{"a_goal_count":"2","a_cor_cnt":"2","a_crd_cnt":"2","a_sht_trg":"5"}]}
                    //result={"team_stat":{"start_time":"20160627200122","h_goal_scored":"1","a_goal_scored":"2"},"Home":[{"h_goal_count":"1","h_cor_cnt":"7","h_crd_cnt":"1","h_sht_trg":"7"}],"Away":[{"a_goal_count":"2","a_cor_cnt":"2","a_crd_cnt":"2","a_sht_trg":"5"}]}
                    self.setState({team:result1.team_stat, Home: result1.Home[0], Away: result1.Away[0] })
                
                })
            }
           

            self.setState({ data: result.items[0]});           
           // result1={"team_stat":{"start_time":"20160627200122","h_goal_scored":"1","a_goal_scored":"2"},"Home":[{"h_goal_count":"1","h_cor_cnt":"7","h_crd_cnt":"1","h_sht_trg":"7"}],"Away":[{"a_goal_count":"2","a_cor_cnt":"2","a_crd_cnt":"2","a_sht_trg":"5"}]}
            //this.serverRequest = $.get(baseurl+"fixture/commentary/"+ userId+"," + sessionId + ","+result.items[0]['fxt_id'], function (rst) {
            //    if (typeof rst != 'object') {
            //        rst = JSON.parse(rst)
            //    }
                
                
            //}.bind(this));
            

            //this.setstate({team:result1.items})
        }.bind(this));
        
        //if(headerThis.state.data.status!='O' && headerThis.state.data.status!='A')
        //{
        //    console.log("Scores status is not open="+headerThis.state.data.status)
        //    this.setState({iskickoff:true})
        //}
    },
    changeGameStart:function(){

        this.setState({iskickoff:true})
    },
    updateState: function () {
        this.componentWillMount();
              
    },
    componentDidMount:function(){
        this.timer = setInterval(this.updateState, 1000*1);
        //setTimeout(this.updateState, 1000);
       
    },
    render: function () {
        var ids = 'timer';
        //console.log("score===",this.state.data)
        return (
           <div>     
                  
                    
{headerThis.state.data.status=='O'?<div>
                            
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                    <div className="space-5"></div>
                                    <div className="kickoff">{this.state.data.status=='O'?<span>{ this.state.days > 0 ?  this.state.days + ' day(s)' : <span>{this.state.showCountDown?<CountDown hours={this.state.hours} minutes={this.state.min} seconds={this.state.sec } self={this} msg="Game live" />:''}</span> }</span> :this.state.data.status=='R'?<span>Game finished</span>:this.state.data.status=='C'?<span>{this.state.data.start_time=='I'?'HT':this.state.data.start_time=='E'?'FT':this.state.data.start_time+' Minutes'}</span>:this.state.data.status=='A'?'Abandoned':''}</div>
                                    <div className="space-5"></div>
                                </div>
                            </div>
                            <div className="row">
            	                {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                	                <div className="score-box bg-light-blue">
                    	                <div className="score-timer">00:00</div>
                                        <div className="sco-txt">0 - 0</div>
                	                </div>
            	                </div>*/}
                            </div>
                            <div className="row">                               
            	                <div className="col-lg-5 col-md-5 col-sm-5 col-xs-6 text-right">
                	                <div className="leaderboard-team lb-home-team">
                    	                <img src={this.state.data.home_team_id ? this.state.data.competition_id == 8 ? "/images/jerseys/EPL/" + this.state.data.home_team_id + ".svg" : this.state.data.competition_id == 10 ? "/images/jerseys/EC/" + this.state.data.home_team_id + ".svg" : "/images/football-shirts/numbers/" + this.state.data.home_team_id + ".svg" : "/images/qn-icon-empty.svg"}/>
                                        <span className="lb-team-name mon-txt">{this.state.data.home_team}</span>
                	                </div>
            	                </div>
                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-4 text-center hidden-xs">

                                </div>
                                <div className="col-lg-5 col-md-5 col-sm-5 col-xs-6 text-left">
                	                <div className="leaderboard-team lb-away-team">
                    	                <img src={this.state.data.away_team_id ? this.state.data.competition_id == 8 ? "/images/jerseys/EPL/" + this.state.data.away_team_id + ".svg" : this.state.data.competition_id == 10 ? "/images/jerseys/EC/" + this.state.data.away_team_id + ".svg" : "/images/football-shirts/numbers/" + this.state.data.away_team_id + ".svg" : "/images/qn-icon-empty.svg"}/>
                                        <span className="lb-team-name mon-txt">{this.state.data.away_team}</span>
                	                </div>
                                </div>
                            </div>
    	                    
                            
                     </div>:''     
                    }
              
                {headerThis.state.iskickoff && (headerThis.state.data.status=='C' || headerThis.state.data.status=='R')?<div>
                    {/*<div className="row score no-margin">
        	            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-4 text-right team-x">
				            <h2 className="no-margin padding-top-20">{this.state.data.home_team}</h2>
        	            </div>
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-4 text-center no-padding">
				            <div className="score-box">
                	            <div className="small-cop1 padding-top-5" id={ids}>
                                    {this.state.days==-1?<CountUp  msg="Game live" id={ids} fd={this.state.data.format_date}/>:this.state.days<-1?'FT':''}
                	            </div>
                                <div className="score-cop">
                                    {this.state.team.h_goal_scored} - {this.state.team.a_goal_scored}
                                </div>
				            </div>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-5 col-xs-4 text-left team-y">
				            <h2 className="no-margin padding-top-20">{this.state.data.away_team}</h2>
                        </div>
                    </div>*/}
                    <div className="space-5"></div>
                    <div className="row visible-xs">
            	        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                	        <div className="score-box bg-light-blue">
							{/*<div className="score-timer" id={ids}>{this.state.days==-1?this.state.team.start_time=='I'?'HT':this.state.team.start_time=='E'?'FT':this.state.team.start_time?this.state.team.start_time+' Minutes':'':this.state.days<-1?'FT':''}</div> */}
							<div className="score-timer" id={ids}>{this.state.days==-1?this.state.team.start_time=='I'?'HT':this.state.team.start_time=='E'?'FT':this.state.team.start_time?this.state.team.start_time+'':'':this.state.days<-1?'FT':''}</div>
                                <div className="sco-txt">{this.state.team.h_goal_scored} - {this.state.team.a_goal_scored}</div>
                	        </div>
            	        </div>
                    </div>
                    <div className="row">
            	            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 text-right">
                	            <div className="leaderboard-team lb-home-team">
                    	            <img src={this.state.data.home_team_id ? this.state.data.competition_id == 8 ? "/images/jerseys/EPL/" + this.state.data.home_team_id + ".svg" : this.state.data.competition_id == 10 ? "/images/jerseys/EC/" + this.state.data.home_team_id + ".svg" : "/images/football-shirts/numbers/" + this.state.data.home_team_id + ".svg" : "/images/qn-icon-empty.svg"}/>
                                    <span className="lb-team-name mon-txt">{this.state.data.home_team}</span>
                	            </div>
            	            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center hidden-xs">
                                <div className="space-10"></div>
                	            <div className="score-box bg-light-blue">
								{/*<div className="score-timer" id={ids}>{this.state.days==-1?this.state.team.start_time=='I'?'HT':this.state.team.start_time=='E'?'FT':this.state.team.start_time?this.state.team.start_time+' Minutes':'':this.state.days<-1?'FT':''}</div>*/}
								<div className="score-timer" id={ids}>{this.state.days==-1?this.state.team.start_time=='I'?'HT':this.state.team.start_time=='E'?'FT':this.state.team.start_time?this.state.team.start_time+'':'':this.state.days<-1?'FT':''}</div>
                                    <div className="sco-txt">{this.state.team.h_goal_scored} - {this.state.team.a_goal_scored}</div>
                	            </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 text-left">
                	            <div className="leaderboard-team lb-away-team">
                    	            <img src={this.state.data.away_team_id ? this.state.data.competition_id == 8 ? "/images/jerseys/EPL/" + this.state.data.away_team_id + ".svg" : this.state.data.competition_id == 10 ? "/images/jerseys/EC/" + this.state.data.away_team_id + ".svg" : "/images/football-shirts/numbers/" + this.state.data.away_team_id + ".svg" : "/images/qn-icon-empty.svg"}/>
                                    <span className="lb-team-name mon-txt">{this.state.data.away_team}</span>
                	            </div>
                            </div>
                    </div>
                   {/* <div className="row no-margin qn-points">
        	            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
				            <div className="qn-icons-list text-center">
                                <img className="team-img jersey" src={this.state.data.home_team_id?"/images/football-shirts/numbers/"+this.state.data.home_team_id+".svg":"/images/qn-icon-empty.svg"} />
                                    <ul>
                                        <li>
                                            <img src="/images/qn-icon-goal.svg" /><span>{this.state.Home.h_goal_count}</span>
                                        </li>
                                        <li>
                                            <img src="/images/qn-icon-corner.svg" /><span>{this.state.Home.h_cor_cnt}</span>
                                        </li>
                                        <li>
                                            <img src="/images/qn-icon-ycard.svg" /><span>{this.state.Home.h_crd_cnt}</span>
                                        </li>
                                        <li>
                                            <img src="/images/qn-icon-target.svg" /><span>{this.state.Home.h_sht_trg}</span>
                                        </li>
                                    </ul>
				            </div>
        	            </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6  text-center">
				            <div className="qn-icons-list-right text-center">
                                    <img className="team-img jersey" src={this.state.data.away_team_id?"/images/football-shirts/numbers/"+this.state.data.away_team_id+".svg":"/images/qn-icon-empty.svg"}  />
                                    <ul className="">
                                        <li>
                                            <span>{this.state.Away.a_goal_count} </span><img src="/images/qn-icon-goal.svg" />
                                        </li>
                                        <li>
                                            <span>{this.state.Away.a_cor_cnt} </span><img src="/images/qn-icon-corner.svg" />
                                        </li>
                                        <li>
                                            <span>{this.state.Away.a_crd_cnt} </span><img src="/images/qn-icon-ycard.svg" />
                                        </li>
                                        <li>
                                            <span>{this.state.Away.a_sht_trg} </span><img src="/images/qn-icon-target.svg" />
                                        </li>
                                    </ul>
                                   

				            </div>
                        </div>
                    </div>*/}
                    </div>
            :''}
            
             
      </div>
        )
    }
});

//**********---- Component to display slider-1 (slider with labels)----**********
var Slider1 = React.createClass({
    getInitialState: function () {
        return {
            answer:0
        };
    },
    componentWillMount:function(){
        //console.log("componentWillMount==",this.props.ans1)
        this.setState({answer:this.props.ans1})
    },
    //componentDidUpdate:function(){
    //    //console.log("componentWillReceiveProps==",this.props.ans1)
    //    var ans1 = this.props.ans1;
    //    //this.setState({answer:this.props.ans1});
    //    if(ans1!='No Answer' && ans1!=null && ans1!='')
    //    {
    //        //console.log("answer")
    //        var index = this.props.ind;
    //        var ids = "slider1_"+index;
    //        console.log(this.state.answer)
    //        //$('#'+ids).jRange('setValue',ans1)
    //    }
       
    //},
    componentWillReceiveProps : function(){
        //var ans1 = this.props.ans1;
        //var data = this.props.self.state.uniqedata;
        
        //var index = this.props.ind;
        //data[index].answer = $('#'+ids).jRange('getValue')
        //this.props.self.setState({uniqedata:data})
        //console.log("ans1=="+ans1);
        //if(ans1!='No Answer' && ans1!=null && ans1!='')
        //{
        //    var index = this.props.ind;
        //    var ids = "slider1_"+index;
        //    $('#'+ids).jRange('setValue',ans1)
        //}
    },
    componentDidMount: function () {
        var self=this
        var data = this.props.self.state.uniqedata;
        var index = self.props.ind;
        //console.log(data[index]);//data[i]['pic_id']
        //data[index].answer=data[index]['values'][0];       
        //data[index].pic_id= data[index]['picValues'][0]['pic_id']
        //self.props.self.setState({uniqedata:data})
        //console.log("slider1===",data[index])
        //console.log("this.props.start==",this.props.start,"this.props.end==",this.props.end,"this.props.val==",this.props.val)
        var ids = "slider1_"+index;
        $('#'+ids).jRange({
            from: this.props.start?this.props.start:0,
            to: this.props.end?this.props.end:this.props.val.length-1,
            scale: this.props.val,
            format: '%s',
            width: 250,
            showLabels: false,
            snap: true,
            onstatechange:function(){
                var data = self.props.self.state.uniqedata;
                var index = self.props.ind;               
                data[index].answer=data[index]['values'][$('#'+ids).jRange('getValue')];       
                data[index]['pic_id']=data[index]['picValues'][$('#'+ids).jRange('getValue')]['pic_id'];
                //console.log(data[index]['picValues'][$('#'+ids).jRange('getValue')]['pic_id'])
                self.props.self.setState({uniqedata:data})

            }
        });
    },
    
    render: function () {
        var self = this;
        var ids = "slider1_"+this.props.ind;
       // console.log("slider props",this.props.ans1)
        setTimeout(function(){
            $('#'+ids).jRange('setValue',""+self.props.ans1);
        },500)
        return (
        <input type="hidden" className="single-slider" id={ids} value={this.props.ans1} />            
        )
    }
});

//**********---- Component to display slider-2 (slider with pointer value in circle)----**********
var Slider2 = React.createClass({
    getInitialState:function(){
        return {
            start:"",
            end:''
        }
    },
    componentDidReceiveProps : function(){
        //var ids = "slider2_"+this.props.ind;
       // $('#'+ids).jRange('setValue',""+this.props.ans1);
    },
    componentDidUpdate:function(){
        //var ids = "slider2_"+this.props.ind;
        //$('#'+ids).jRange('setValue',""+this.props.ans1);
       
    },
    componentWillMount:function(){
        // console.log("Slider2===",this.props.values)

        var values = this.props.values;
        var vls;
        var start,end;
        
        for(i=0;i<values.length;i++){
            if(values[i].includes("-")){
                vls= values[i].split("-");
                //console.log(vls)
                //console.log("option==",this.props.option)
                if(this.props.option=='Y')
                {
                    start=0;
                    //console.log("start==0")
                }
                else{
                    start=vls[0];
                    //console.log("start====",vls[0])
                }
                if(vls[1].includes("+")){
                    end=vls[1].split('+')[0]
                }
                else{
                    end=vls[1]
                }
                break;
            }
        }
        //console.log("start==",start," end==",end," values==",[start,end])
        this.setState({start:start,end:end,values:[start,end]})
    },
    componentDidMount: function () {
        var self=this;
        var ids = "slider2_"+this.props.ind;
        //console.log("start==",this.state.start," end ==",this.state.end)
        //var s ="1";// this.state.start;
        //var e ="90";// this.state.end;

        ////var self=this
        ////var data = this.props.self.state.uniqedata;
        ////var index = self.props.ind;
        //////console.log(data[index]);//data[i]['pic_id']
        ////data[index].answer=data[index]['values'][0];       
        ////data[index].pic_id= data[index]['picValues'][0]['pic_id']
        ////self.props.self.setState({uniqedata:data})
        ////console.log("slider1===",data[index])

        $('#'+ids).jRange({
            from: this.state.start,
            to: this.state.end,
            step: 1,
            scale: this.state.values,
            format: '%s',
            width: 230,
            showLabels: true,
            snap: true,
            theme: 'theme-blue',
            onstatechange:function(){
                var data = self.props.self.state.uniqedata;
                var index = self.props.ind;
                //console.log(data[index])
                data[index].answer=$('#'+ids).jRange('getValue');
                if(self.props.option=='Y' ){
                    var picid;
                    if( $('#'+ids).jRange('getValue')==0)
                    {
                        var picval = data[index]['picValues'].filter(function(d){
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
                        var picval = data[index]['picValues'].filter(function(d){
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
                        
                        data[index].pic_id= picid
                }
                else{
                   // console.log("nooption---------------",data[index]['picValues'][0]['pic_id'])
                    picid=data[index]['picValues'][0]['pic_id']
                    data[index].pic_id= data[index]['picValues'][0]['pic_id']
                }
               // console.log("option==",self.props.option,"   picid=",picid);
                self.props.self.setState({uniqedata:data})
           }
        });
    },
    render: function () {
        var ids = "slider2_"+this.props.ind;
        var self = this;
        //setTimeout(function(){
        //    $('#'+ids).jRange('setValue',""+self.props.ans1);
        //},500)
        return (
                      <input type="hidden" className="single-slider2" id={ids} value="0" />
        )
    }
});

//**********---- Component to display switch button for selecting YES or NO values----**********
var Switch2 = React.createClass({
    componentDidMount: function () {
        //var data = this.props.self.state.uniqedata;
        //var index = this.props.ind;
        //var ids = "switch2_"+index
        //data[index].answer=$("#"+ids).is(":checked")?data[index]['values'][1]:data[index]['values'][0];
        //data[index].pic_id= data[index]['picValues'][data[index]['values'].indexOf( data[index].answer)]['pic_id']

        //console.log(data[index])
        //this.props.self.setState({uniqedata:data})
    },
    componentWillReceiveProps:function(){
        var data = this.props.self.state.uniqedata;
        var index = this.props.ind;
        var ids = "switch2_"+index
        //$("#"+ids).bootstrapToggle('on');
        var ans;
        if(data[index].answer==this.props.val[0])
        {
            ans = false;
        }
        else  if(data[index].answer==this.props.val[1]){
            ans = true;
        }
        else{
            ans= false
        }
        //console.log("check props==",this.props.ans1);
        //if(!ans)
        //{
            //$('#'+ids).click()
            var checkBoxes = $('#'+ids);
            checkBoxes.prop("checked", ans);
        //}
        //$("#"+ids).val(ans);
        //$("#"+ids).prop('value', ans);
        //$('#'+ids).state(true);
        
    },
    changeSwitch:function(event){ // Function to capture the switch change event
        var data = this.props.self.state.uniqedata;
        var index = this.props.ind;
        var ids = "switch2_"+index
        //console.log($(".cmn-toggle").is(":checked"))
        //console.log($(".cmn-toggle").is(":checked")?data[index]['values'][1]:data[index]['values'][0])
        data[index].answer=$("#"+ids).is(":checked")?data[index]['values'][1]:data[index]['values'][0];
        data[index].pic_id= data[index]['picValues'][data[index]['values'].indexOf( data[index].answer)]['pic_id']
        //console.log(data[index]['picValues'][data[index]['values'].indexOf( data[index].answer)]['pic_id'])
        //console.log(data[index])
        this.props.self.setState({uniqedata:data})
    },
    render: function () {
        var ids = "switch2_"+this.props.ind
        //console.log(this.props.ans1);

        //console.log("checked===",this.props.checked)
        var ans;
        if(this.props.ans1==this.props.val[0])
        {
            ans = false;
        }
        else  if(this.props.ans1==this.props.val[1]){
            ans = true;
        }
        else{
            ans= false
        }
        //console.log("ans====",ans);
        //setTimeout(function(){
        //    if(!ans)
        //    {
        //        $('#'+ids).click()
        //    }
        //},500)
        return (<div className="padding-top-5">
                    <div className="zoola-toggle">
                        <span className="med-cop1 padding-top-10">{this.props.val[0]=='Y'?'YES':this.props.val[0]=='N'?'NO':this.props.val[0]}</span>
                       
                        <div className="checkbox checkbox-slider--b-flat checkbox-slider-lg margin-top-5">
                            <label>
                                <input type="checkbox" className="cmn-toggle" id={ids} defaultChecked={ans} onChange={this.changeSwitch}/><span>&nbsp;</span>
                            </label>
                        </div>
                        <span className="med-cop1 padding-top-10">{this.props.val[1]=='N'?'NO':this.props.val[1]=='Y'?'YES':this.props.val[1]}</span>
                    </div>
                </div>
        )
    }
});

//**********---- Component to display switch button with 3 options----**********
var Switch3 = React.createClass({
    componentDidMount:function(){
        //var data = this.props.self.state.uniqedata;
        //var index = this.props.ind;
        //data[index].answer=$("#switchMiddle_"+this.props.ind).html();
        //data[index].pic_id=data[index]['picValues'][data[index]['values'].indexOf( $("#switchMiddle_"+this.props.ind).html())]['pic_id']
        //console.log("switch3===",data[index])
        //this.props.self.setState({uniqedata:data})
    },
    shouldComponentUpdate :function(nextProps, nextState){
        //console.log(this.props.ind," ",nextProps.ans1," ",nextProps.ans1 !== this.props.ans1)
        var data = this.props.self.state.uniqedata;
        var index = this.props.ind;
        if(nextProps.ans1 !== this.props.ans1)
        {
            //console.log(data[index])
            var ind = data[index]['values'].indexOf(nextProps.ans1);
            //console.log(this.props.ind,"==ind==",ind)
            if(ind==0)
            {
                $("#switchLeft_"+this.props.ind).addClass('active').siblings().removeClass('active');
            }
            else if(ind==1)
            {
                $("#switchMiddle_"+this.props.ind).addClass('active').siblings().removeClass('active');
            }
            else if(ind==2)
            {
                $("#switchRight_"+this.props.ind).addClass('active').siblings().removeClass('active');
            }
        }
        return nextProps.ans1 !== this.props.ans1
    },
    handle3switch:function(event){// Function to capture the switch change event
        var data = this.props.self.state.uniqedata;
        var index = this.props.ind;
        data[index].answer=$("#"+event.target.id).html();
        data[index].pic_id=data[index]['picValues'][data[index]['values'].indexOf($("#"+event.target.id).html())]['pic_id']
        //console.log(data[index]['picValues'][data[index]['values'].indexOf($("#"+event.target.id).html())]['pic_id'])
        //console.log(data[index])
        this.props.self.setState({uniqedata:data})
        $("#"+event.target.id).addClass('active').siblings().removeClass('active');
    },
    render: function () {
        return (
        <div className="padding-top-10" onClick={this.handle3switch}>
            <div className="time-tag-big">
                    <div className="left" id={"switchLeft_"+this.props.ind}>{this.props.val[0]}</div>
                    <div className="middle active" id={"switchMiddle_"+this.props.ind}>{this.props.val[1]}</div>
                    <div className="right " id={"switchRight_"+this.props.ind}>{this.props.val[2]}</div>
            </div>
        </div>
        )
    }
});

//**********---- Component to display buttons for question options  ----**********
var BUTTONS = React.createClass({
    clickButton: function(index,item){ // Function to call when a button is selected
        var data = this.props.self.state.uniqedata;
        //console.log(data)
        var ind = this.props.ind;
        data[ind].answer=item;
        data[ind].pic_id=data[ind]['picValues'][data[ind]['values'].indexOf(item)]['pic_id']
        //console.log(data[ind]['picValues'][data[ind]['values'].indexOf(item)]['pic_id'])
        this.props.self.setState({uniqedata:data})
        $("#time_"+this.props.ind+"_"+index).addClass('active').siblings().removeClass('active');
    },
    render: function () {
        var self = this;
        var ans1 = ""+this.props.ans1
        //console.log("buttons==",ans1)
        return (
        <div className="padding-top-5 time-zoola">
            {
                this.props.val.map(function (item, index) {
                    //console.log("this.props.ans1==",ans1," item==",item," ans==",ans1==item)
                    return <div className={ans1==item?"time-tags pointer-hand active":"time-tags pointer-hand"} key={index} id={"time_"+self.props.ind+"_"+index} onClick={self.clickButton.bind(null,index,item)}><span className="time">{item}</span>{index<5?"mins":""}</div>
                })
            }
        </div>
        )
    }
});

//**********---- Component to display check boxes for question options from with user can select two check boxes ----**********
var CHECKBOX = React.createClass({
    getInitialState: function () {
        return {
            answers: [],
            ansIndex:[]
        };
    },
    handleClick:function(index,item){ // Function to handle click event on check box
       var ans=[]
        if(this.state.answers.indexOf(item) == -1)
        {
            if(this.state.answers.length<2){
                ans=this.state.answers;
                ans.push(item);
                this.setState({answers:ans});
                $("#check"+index+" .close-icon").html("<img src='/images/close-icon-15.svg'/>")
            }
         }
        else{
             var i = this.state.answers.indexOf(item)
             this.state.answers.splice(i,1);
             this.setState({answers:this.state.answers})
             $("#check"+index+" .close-icon").html("&nbsp; &nbsp; &nbsp;")
        }
        var data = this.props.data;
        var ind = this.props.ind;
        data[ind].answer=(this.state.answers.length<2)?this.state.answers[0]:this.state.answers[0]+'/'+this.state.answers[1];
        this.props.self.setState({uniqedata:data})
   },
   render: function () {
        var self =this;
        return (
        <div className="padding-top-5 first-events">
            {
                this.props.val.map(function (item, index) {
                    return <div className="close-tag" key={index} onClick={self.handleClick.bind(null,index,item)} id={"check"+index}>
                                <span className="close-icon">&nbsp; &nbsp; &nbsp;</span>
                                <span className="med-cop2">{item}</span>
                            </div>
                })
            }
        </div>
        )
   }
});

//**********---- Component to display dropdown in tablet view ----**********
var Optdrop = React.createClass({
    handleSlelect:function(item){
        //console.log("handleSlelect");
        var data = this.props.self.state.uniqedata;
        var ind = this.props.ind;
        //console.log(data[ind]);
        //console.log($("#"+this.props.ids).val())
        //data[i].answer=$("#"+ids).is(":checked")?data[i]['values'][1]:data[i]['values'][0];
        //data[i].pic_id= data[i]['picValues'][data[i]['values'].indexOf( data[i].answer)]['pic_id']
        //console.log(this.props.queType)
        if(this.props.queType=="2SWITCH")
        {
            if($("#"+this.props.ids).val()=="YES")
            {
                data[ind].answer='Y';
            }
            else{
                data[ind].answer='N';
            }
            data[ind].pic_id= data[ind]['picValues'][data[ind]['values'].indexOf( data[ind].answer)]['pic_id']
        }
        else if(this.props.queType=="SLIDER"){
            //console.log($("#"+this.props.ids).val())
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
                   // console.log("nooption---------------",data[index]['picValues'][0]['pic_id'])
                    picid=data[ind]['picValues'][0]['pic_id']
                    data[ind].pic_id= data[ind]['picValues'][0]['pic_id']
                }
               // console.log("option==",self.props.option,"   picid=",picid);
                
        }
        else{
            data[ind].answer=$("#"+this.props.ids).val();
            data[ind].pic_id= data[ind]['picValues'][data[ind]['values'].indexOf( data[ind].answer)]['pic_id']
        }
        //console.log(data[ind]);
        this.props.self.setState({uniqedata:data})
    },
    componentWillReceiveProps:function(){
        var data = this.props.self.state.uniqedata;
        var ind = this.props.ind;
        //console.log("dropdown==",data)
        if(data[ind].answer=='Y')
        {
            $("#"+this.props.ids).val('YES');
        }
        else if(data[ind].answer=='N')
        {
            $("#"+this.props.ids).val('NO');
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
			{/*Skype PZ : un auth users should be able to see live game but not take part : no answers should be displayed*/}
             {getCookie1('PZdata').length <= 0 || SupHeaderThis.state.items.status == 'L'?<select className="" onChange={this.handleSlelect} id={this.props.ids} disabled>
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
                                   return <option key={index} className="pointer-hand" value="YES">YES</option>
                                 }
                                 else if(item=='N'){
                                     return <option key={index} className="pointer-hand" value="NO">NO</option>
                                 }
                                 else{
                                     return <option value={item} key={index} className="pointer-hand" >{item}</option>
                             }
                             }
                            
                         })
                     }
                 </select>:
				 <select className="" onChange={this.handleSlelect} id={this.props.ids}>
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
                                   return <option key={index} className="pointer-hand" value="YES">YES</option>
                                 }
                                 else if(item=='N'){
                                     return <option key={index} className="pointer-hand" value="NO">NO</option>
                                 }
                                 else{
                                     return <option value={item} key={index} className="pointer-hand" >{item}</option>
                             }
                             }
                            
                         })
                     }
			</select>}

            </div>
        )
    }
});
 

//**********---- Component to display dropdown in tablet view edit ticket ----**********
var OptdropEdit = React.createClass({
    handleSlelect:function(item){
        //console.log("handleSlelect");
        var data = this.props.self.state.uniqedata;
        var ind = this.props.ind;
        //console.log(data[ind]);
        //console.log($("#"+this.props.ids).val())
        //data[i].answer=$("#"+ids).is(":checked")?data[i]['values'][1]:data[i]['values'][0];
        //data[i].pic_id= data[i]['picValues'][data[i]['values'].indexOf( data[i].answer)]['pic_id']
        //console.log(this.props.queType)
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
           // console.log($("#"+this.props.ids).val())
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
                   // console.log("nooption---------------",data[index]['picValues'][0]['pic_id'])
                    picid=data[ind]['picValues'][0]['pic_id']
                    data[ind].pic_id= data[ind]['picValues'][0]['pic_id']
                }
               // console.log("option==",self.props.option,"   picid=",picid);
                
        }
        else{
            data[ind].answer=$("#"+this.props.ids).val();
            data[ind].pic_id= data[ind]['picValues'][data[ind]['values'].indexOf( data[ind].answer)]['pic_id']
        }
        //console.log(data[ind]);
        this.props.self.setState({uniqedata:data})
    },
    componentWillReceiveProps:function(){
        var data = this.props.self.state.uniqedata;
        var ind = this.props.ind;
        //console.log("dropdown==",data[ind].answer)
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
        //console.log(this.props.ans)
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
                             //console.log("item==",item)
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
//**********---- Component to display dropdown for start question ----**********
var OptdropQue = React.createClass({
    getInitialState:function(){
        return {
            staroption:0
        }
    },
    componentWillMount:function(){
        
        

    },
    componentWillReceiveProps:function(){
        var data = this.props.self.state.uniqedata;
        //console.log(data)
        var starOption = data.filter(function(d){
            if(d.isStar)
            {
                return true
            }
        })
        //console.log("starOption==",starOption)
        if(starOption.length>0)
        {
            this.setState({staroption:starOption[0]['evi_id']})
            $("#OptdropQue"+this.props.ind).val(starOption[0]['evi_id'])
        }
       
    },
    handleSlelect:function(){
        var data = this.props.self.state.uniqedata;
        var item = $("#OptdropQue"+this.props.ind).val()
        //console.log(item)
       
        for(i=0;i<data.length;i++){
           
            if(data[i].evi_id == item){
                //console.log(data[i].evi_id)
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
                {/*Skype PZ : un auth users should be able to see live game but not take part : no answers should be displayed*/}
                {getCookie1('PZdata').length <= 0 || SupHeaderThis.state.items.status == 'L'?<select className="starQuestion" id={ids} onChange={this.handleSlelect} disabled>
                     <option></option>
                     {
                        this.props.data.map(function (item, index) {
                            return <option key={index} className="pointer-hand" value={item.evi_id} >{item.evi_number}</option>
                        })
                     }
             </select>:<select className="starQuestion" id={ids} onChange={this.handleSlelect} >
                     <option></option>
        {
            this.props.data.map(function (item, index) {
                return <option key={index} className="pointer-hand" value={item.evi_id} >{item.evi_number}</option>
            })
        }
        </select>

             }
          </div>
        )
    }
});
//**********---- Component to display Tickets ----**********
var TicketsThis;  
var Tickets = React.createClass({
    getInitialState:function(){
        return{
            tickets:[]
        }
    },
    componentWillMount:function(){
        TicketsThis=this;
        //console.log(this.props.tickets)
        this.setState({tickets:this.props.tickets})
    },
    updateTickets:function(tickets){
        this.setState({tickets:tickets})
    },
    render: function () {
        var self = this;
        return <div>
                   <div className="row">
                <div className="col-lg-12 text-center"> 
                    {this.state.tickets.length > 0 ? <span className="mon-txt padding-right-10">MY TICKETS:</span>:''}
                    {this.state.tickets.map(function(item,index){
                        return <div className="lb-ticket bg-dark-blue" key={index} onClick={self.props.self.viewTicketClick.bind(null,item.ticket)}>
                                    <div className="ticket-number" > {index+1} </div>
                                    {headerThis.state.data.status=='C' || headerThis.state.data.status=='R'?<span className="game-results">
                                        <span className="position">{formatPosition(item.position)}</span>
                                        <span className="pot-value">&pound;{item.value}</span>
                                    </span>:''}
                                </div>
                })}
                </div>
          </div>
        </div>
    }
});
//**********---- Component to display questions ----**********
var QuestionsThis;
var uniqedata=[];
var Questions = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            uniqedata:[],
            viewTicketData:[],
            viewTicketMainData:{},
            showCreateAnother:false,
            showBP:false,
            mainBPData:{},
            showLastQuestion:false,
            showViewTicket:false,
            selectedTicket: 0,
            showOpta:false,
            selectedOpta:0,
            selectedOptaName:"",
            isEditTicket:false,
            editTicketId:0
        };
    },
    handleHideBP: function(){ // Function to hide break points popup
        this.setState({showBP:false});
    },
    handleshowBP: function(item){ // Function to show break points popup
        if(is_loggedIn){
            this.setState({showBP:true,mainBPData:item});
        }
        
    },
    handleHideOpta: function(){ // Function to hide OPTA popup
        this.setState({showOpta:false,selectedOpta:0,selectedOptaName:""});
    },
    handleShowOpta: function(id,name){ // Function to show OPTA popup
        //console.log(name)
        this.setState({showOpta:true,selectedOpta:id,selectedOptaName:name});
    },
    addToWatchlist:function(){
       if(!headerThis.state.isaddedtowl){
           this.serverRequest = $.get(baseurl + "play/watchupdate/"  + userId + "," + sessionId + ","+plsid + ",A", function (result) {
               if (typeof result != 'object') {
                   result = JSON.parse(result)
               }
               headerThis.state.isaddedtowl=true;
               $(".watchlist").addClass("wl-disable");
           }.bind(this));
       }
      
   },
    componentWillMount: function () {
        QuestionsThis=this;
        if (is_loggedIn == false){
            this.serverRequest = $.get(baseurl+"fixture/pregame2/"+plsid, function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
               var data1= result.items;
                var uData = [];
                var uids =[];
                for(i = 0; i< data1.length; i++){
                    if(uids.indexOf(data1[i].evi_id) === -1){
                        
                        data1[i]["isStar"] = false;
                        data1[i]["answer"]="No Answer"
                        data1[i]["picValues"]=[];
                        data1[i]["picValues"].push({pic_value1:data1[i]['pic_value1'],pic_value2:data1[i]['pic_value2']});
                        uData.push(data1[i]);
                        uids.push(data1[i].evi_id);
                    }
                    else{
                         uData[uids.indexOf(data1[i].evi_id)]["picValues"].push({pic_value1:data1[i]['pic_value1'],pic_value2:data1[i]['pic_value2']})
                         }
                }
                for(j=0; j<uData.length; j++){
                    uData[j]["picValues"].sort(function(a, b) {
                        return parseFloat(a.pic_value1) - parseFloat(b.pic_value1);
                    });
                    uData[j]['values'] =[]
                    for(k=0;k<uData[j]['picValues'].length;k++){
                        uData[j]['values'].push(uData[j]['picValues'][k]['pic_value2'])
                       
                    }
                }
                
                this.setState({ data:data1,uniqedata: uData})
                
                }.bind(this));
        }
        else{
            this.serverRequest = $.get(baseurl+"play/game2/"+ userId+"," + sessionId +"," +plsid, function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                var data1= result.items;
                var uData = [];
                var uids =[];
               
                for(i = 0; i< data1.length; i++){
                    //console.log(data1[i]['pic_value1'])
                    if(uids.indexOf(data1[i].evi_id) === -1){
                        //console.log(data1[i])
                        
                        data1[i]["isStar"] = false;
                        data1[i]["answer"]="No Answer"
                        data1[i]["picValues"]=[];
                        data1[i]["picValues"].push({pic_value1:data1[i]['pic_value1'],pic_value2:data1[i]['pic_value2'],pic_id:data1[i]['pic_id']});
                        uData.push(data1[i]);
                        uids.push(data1[i].evi_id);
                    }
                    else{
                        uData[uids.indexOf(data1[i].evi_id)]["picValues"].push({pic_value1:data1[i]['pic_value1'],pic_value2:data1[i]['pic_value2'],pic_id:data1[i]['pic_id']})
                         }
                }
                
                for(j=0; j<uData.length; j++){
                    
                    uData[j]["picValues"].sort(function(a, b) {
                        return parseFloat(a.pic_value1) - parseFloat(b.pic_value1);
                    });
                    uData[j]['values'] =[]
                    for(k=0;k<uData[j]['picValues'].length;k++){
                        uData[j]['values'].push(uData[j]['picValues'][k]['pic_value2'])
                    }
                   
                }
                
                //console.log(uData)
                uniqedata = uData
                this.setState({ data:data1,uniqedata: uData})
                //console.log(uData)         
            }.bind(this));
        }
    },
    changeStar: function(index){ // Function to call when a star is selected
         var data = this.state.uniqedata;
         for(i=0;i<data.length;i++){
            if(i==index){
                data[i].isStar=true;
                //console.log(data[i].evi_id)
                //console.log($('.starQuestion').val())
                $('.starQuestion').val(data[i].evi_id);
            }
            else{
                data[i].isStar=false;
            }
        }
        var filterdata = data.filter(function (d) {
            return d.isStar == true;
        });
        
        if(filterdata.length>0)
        {
            this.setState({showLastQuestion:true})
        }
        this.setState({uniqedata:data})
    },
    valudateAnswersDropDown:function(id){
        var data =this.state.uniqedata;
        //console.log(data)
        //console.log(SupHeaderThis.state.items.balance," ",typeof(Number(SupHeaderThis.state.items.balance)));
        console.log(headerThis.state.data.entry_," ",Number(headerThis.state.data.entry_)) 
        if(SupHeaderThis.state.items.status=='L'){  
            $("#"+id).html("Your account has not been activated yet,please check your email");
            return false;
        }
        for(i=0;i<data.length;i++)
        {
            if(data[i]['answer']=="" ||data[i]['answer']==null ||data[i]['answer']=='No Answer')
            {
                $("#"+id).html("Please complete all questions and choose your double points question.");
                return false;
            }
        }
        if($("#OptdropQuestar").val() == null || $("#OptdropQuestar").val() == '')
        {
            $("#"+id).html("Please ensure you have selected the question you want double points for.");
            return false;
        }       
        if((Number(SupHeaderThis.state.items.balance) < Number(headerThis.state.data.entry_))&&(Number(headerThis.state.data.entry_)>2)){
           

            $("#alert-modal4").modal('show')
            //$("#"+id).html("sorry you cannot play this game with Z's please deposit.You are only eligle to play &pound;1 and &pound;2 games.");
            return false;
        }
        else if((Number(SupHeaderThis.state.items.zeds)<Number(headerThis.state.data.entry_))&&(Number(headerThis.state.data.entry_)<=2)){
            if(Number(SupHeaderThis.state.items.balance)<Number(headerThis.state.data.entry_))
            {
                $("#alert-modal5").modal('show')
                //$("#"+id).html("Insufficent funds please deposit.");           
                return false;
            }
           
        }
        //else if(headerThis.state.data.status=='O'){
        //     window.location="/gameselection?islog="+is_loggedIn + "&status1=true"
        // }
        $("#"+id).html("");
        $("#BuyTicketModal").modal('show')
        //setTimeout(function(){$("#BuyTicketModal").modal('show');},500)
    },
    valudateAnswers:function(id){
        //console.log(id);
        var data =this.state.uniqedata;
        for(i=0;i<data.length;i++)
        {
            
            if(data[i]['evi_ui_type']=='MINISLIDER' && (data[i]['answer']=="" ||data[i]['answer']==null ||data[i]['answer']=='No Answer'))
            {
                data[i].answer=data[i]['values'][0];       
                data[i].pic_id= data[i]['picValues'][0]['pic_id']
                //console.log("MINISLIDER==",data[i])
            }
            if(data[i]['evi_ui_type']=='3SWITCH' && (data[i]['answer']=="" ||data[i]['answer']==null ||data[i]['answer']=='No Answer'))
            {
                data[i].answer=$("#switchMiddle_"+i).html();
                data[i].pic_id=data[i]['picValues'][data[i]['values'].indexOf( $("#switchMiddle_"+i).html())]['pic_id']
                //console.log("3SWITCH==",data[i])
            }
            if(data[i]['evi_ui_type']=='2SWITCH' && (data[i]['answer']=="" ||data[i]['answer']==null ||data[i]['answer']=='No Answer'))
            {
                var ids = "switch2_"+i
                data[i].answer=$("#"+ids).is(":checked")?data[i]['values'][1]:data[i]['values'][0];
                data[i].pic_id= data[i]['picValues'][data[i]['values'].indexOf( data[i].answer)]['pic_id']
                //console.log("2SWITCH==",data[i])
            }
            if(data[i]['evi_ui_type']!='MINISLIDER' && data[i]['evi_ui_type']!='2SWITCH' && data[i]['evi_ui_type']!='3SWITCH' && data[i]['evi_ui_type']!='SLIDER' )
            {
                //console.log(data[i])
                if(data[i]['answer']=="" ||data[i]['answer']==null ||data[i]['answer']=='No Answer')
                {
                    $("#"+id).html("Please complete all questions and choose your double points question ");
                    //console.log("Please answer all the questions");
                    return false;
                }
                
            }
            if(data[i]['evi_ui_type']=="SLIDER"){
                var ids = "slider2_"+i;
                if($('#'+ids).jRange('getValue')==0)
                {
                    data[i].answer=$('#'+ids).jRange('getValue');
                    if(data[i].evi_ui_options=='Y' ){
                        var picid;
                        
                            var picval = data[i]['picValues'].filter(function(d){
                                if(d.pic_value2==0)
                                {
                                    return true;
                                }
                            })
                            //console.log(picval)
                            if(picval.length>0)
                            {
                                picid=picval[0]['pic_id'];
                            }
                        
                        
                        data[i].pic_id= picid
                    }
                    else{
                       // console.log("nooption---------------",data[i]['picValues'][0]['pic_id'])
                        picid=data[i]['picValues'][0]['pic_id']
                        data[i].pic_id= data[i]['picValues'][0]['pic_id']
                    }
                    //console.log(data[i])
                }
            }
        }
        //console.log($("#OptdropQuestar").val()=='')
        //console.log(data)
        this.setState({uniqedata:data})
        if($("#OptdropQuestar").val() == null || $("#OptdropQuestar").val() == '')
        {
            $("#"+id).html("Please ensure you have selected the question you want double points for.");
            return false;
        }       
        $("#"+id).html("");
        setTimeout(function(){$("#BuyTicketModal").modal('show');},1000)
        
    },
    viewTicketClick:function(id){ // Function to show view ticket popup
        //console.log("selectedTicket==",id);
       this.setState({showViewTicket:true,selectedTicket:id})
    },
    handleHideViewTicket:function(){ // Function to hide view ticket popup
        this.setState({showViewTicket:false,selectedTicket:0})
    },
    handleCreateAnother:function(){ // Function to show view ticket popup
        this.setState({showCreateAnother:!this.state.showCreateAnother})
    },    
    cancelTicketModal: function () {
        $("#BuyTicketModal").modal('hide');
    },
    submitQuestions:function(){ // Function to post questions

        var self =this;
        var postdata=[];
        var data =this.state.uniqedata
        var obj={};
        for(i=0;i<data.length;i++)
        {
            if(this.state.isEditTicket){
                obj.upl_id=this.state.editTicketId;
            }
            else{
                obj.pls_id=plsid;
            }
            

            obj.evi_id=data[i]['evi_id'];
            obj.pic_id=data[i]['pic_id'];
            obj.pic_no=data[i]['answer']=="No Answer"?'':data[i]['answer'];
            if(data[i]['isStar'])
            {
                obj.star='Y'
            }
            else{
                obj.star='N'
            }
            
            postdata[i]=obj;
            obj={};
        }
        if(this.state.isEditTicket)
        {
            this.serverRequest = $.post(baseurl+"play/update/"+ userId + "," + sessionId,JSON.stringify({"items":postdata}) ,function (result) {
                GLThis.componentWillMount();
                headerThis.componentWillMount();
                SupHeaderThis.componentWillMount();
                self.setState({editTicketId:0,isEditTicket:false});
                var data = self.state.uniqedata
                for(i = 0; i< data.length; i++){
                        data[i]["isStar"] = false;
                        data[i]["answer"]="No Answer"
                        if(data[i]['evi_ui_type']=='MINISLIDER')
                        {
                                var ids = "slider1_"+i
                                $('#'+ids).jRange('setValue',"0")
                        }
                        else if(data[i]['evi_ui_type']=='2SWITCH')
                        {
                            //var ids = "switch2_"+i
                            //console.log(ids);
                            var ids = "switch2_"+i
                            var checkBoxes = $('#'+ids);
                            checkBoxes.prop("checked", false);
                        }
                        else if(data[i]['evi_ui_type']=='SLIDER')
                        {
                            var ids = "slider2_"+i
                            $('#'+ids).jRange('setValue',"0")
                        }
                   
                }
                self.setState({editTicketId:0,isEditTicket:false,uniqedata:data});
                $("#OptdropQuestar").val('');
                //Phase2-18thAug : deposit screen is still appearing after every game. It should only show pre 1st deposit when playing with Z's
                //window.location="/joinedSetupProfile/?islog="+is_loggedIn+"&plsid="+plsid;
                if(SupHeaderThis.state.items.status == 'T' || SupHeaderThis.state.items.status == 'P' ){
                    window.location="/gameselection/?islog="+is_loggedIn;
                }               
                else{
                    window.location="/joinedSetupProfile/?islog="+is_loggedIn+"&plsid="+plsid;
                }
            })
        }
        else{
            if(headerThis.state.data.status=='C'){
                document.getElementById("Joingame").style.display = "block"
                //window.location="/gameselection/?islog="+is_loggedIn + "&status=true"
            }
            else{
                this.serverRequest = $.post(baseurl+"play/game4/"+ userId + "," + sessionId,JSON.stringify({"items":postdata}) ,function (result) {
                    GLThis.componentWillMount();
                    headerThis.componentWillMount();
                    SupHeaderThis.componentWillMount();
                    var data = self.state.uniqedata
                    for(i = 0; i< data.length; i++){
                        data[i]["isStar"] = false;
                        data[i]["answer"]="No Answer"
                        $("#"+i+"_2").val('')
                        if(data[i]['evi_ui_type']=='MINISLIDER')//&& data[i]['evi_ui_type']!='2SWITCH' && data[i]['evi_ui_type']!='3SWITCH'
                        {
                            var ids = "slider1_"+i
                            $('#'+ids).jRange('setValue',"0")
                        }
                        else if(data[i]['evi_ui_type']=='2SWITCH')//&& data[i]['evi_ui_type']!='2SWITCH' && data[i]['evi_ui_type']!='3SWITCH'
                        {
                            var ids = "switch2_"+i
                            // console.log(ids);
                            var ids = "switch2_"+i
                            var checkBoxes = $('#'+ids);
                            checkBoxes.prop("checked", false);
                        }
                        else if(data[i]['evi_ui_type']=='SLIDER')
                        {
                            var ids = "slider2_"+i
                            $('#'+ids).jRange('setValue',"0")
                        }
                   
                    }
                    
                    $("#OptdropQuestar").val('');
                    self.setState({uniqedata:data})
                    self.componentWillMount();
                
                    //self.setState({showCreateAnother:false,uniqedata:data})
                    //self.componentWillMount();
               
                    //Phase2-18thAug : deposit screen is still appearing after every game. It should only show pre 1st deposit when playing with Z's
                    //  window.location="/joinedSetupProfile/?islog="+is_loggedIn+"&plsid="+plsid;
                    //if(SupHeaderThis.state.items.status == 'T' || SupHeaderThis.state.items.status == 'P' ){
                    //    window.location="/gameselection/?islog="+is_loggedIn;
                    //}
                    if(SupHeaderThis.state.items.status == 'T' || SupHeaderThis.state.items.status == 'P' ){
                       // document.getElementById("Joingamesuccess").style.display = "block"
                     window.location="/dashboard/?islog="+is_loggedIn + "&status1=true"
                    }
                    else{
                        window.location="/dashboard/?islog="+is_loggedIn+ "&status2=true"
                    }
                
                })
            }
        }
        
        $("#BuyTicketModal").modal('hide');
    },
    editTicket:function(data,ticketID){
        var uniqData = this.state.uniqedata;
        //console.log(this.state.uniqedata)
        //console.log(data)
        //console.log(this.state.uniqedata.length)

        $("#ViewTicketModal").modal('hide');
        for(i=0;i<uniqData.length;i++)
        {
            var dataFilter = data.filter(function(d){
                if(d.event_order== uniqData[i]['evi_number'])
                {
                    return true;
                }
            })
            if(dataFilter.length>0)
            {
                uniqData[i]['answer']=dataFilter[0]['valuex'];
                uniqData[i]['isStar'] = dataFilter[0]['star'] =='N'?false:true
            }
            if(uniqData[i]['evi_ui_type']=="SLIDER"){
                var ids = "slider2_"+i;
                $('#'+ids).jRange('setValue',uniqData[i]['answer'])
                
            }
            
        }
        this.setState({uniqedata:uniqData,isEditTicket:true,editTicketId:ticketID});
        
    },
    gotoTopup: function () {     
        if(SupHeaderThis.state.items.status=='P' || SupHeaderThis.state.items.status=='T' || SupHeaderThis.state.items.status=='N')
        {
            window.location = "/quicktopup/?islog="+is_loggedIn
        }
        else{
            window.location = "/topup/?islog="+is_loggedIn
        }
    },
    render: function () {
        var self = this;
        //var sliderval =0;
        return (
           <div>
               {this.props.isLog && headerThis.state.data.status=='O'?<div className="row"><div className="col-lg-12 text-center">
                   <div className={headerThis.state.isaddedtowl?"watchlist wl-disable":"watchlist"} onClick={this.addToWatchlist}>Add game to watchlist</div>
                   <div className="space-5"></div>
               </div></div>:''}                          
                    <div className="panel panel-default">
                        {
                            this.state.uniqedata.map(function (item, index) {
                                var id=index+"_1";
                                var id2=index+"_2";
                               //console.log(item)
                                if((headerThis.state.tickets.length==0 && headerThis.state.data.status=='O')|| !self.props.isLog){
                                    if(index%2==0)
                                    {
                                        return  <div className={item.isStar?"selected-star-qn game-qns-box bg-light-blue no-padding-bottom":"game-qns-box bg-light-blue no-padding-bottom"} key={item.evi_id}>
                                            
                                                       <div className="row">
                                                           {/*<div className="col-lg-3 col-md-3 col-sm-3 col-xs-8 padding-top-10 padding-bottom-10 text-center no-padding-right d-none">
                                                               <a className="pointer-hand" onClick={self.handleshowBP.bind(null,item)}>
                                                                    <span className="number">{item.evi_number} </span> {item.evi_name =="GOAL" || item.evi_name =="SHOT" || item.evi_name =="SHOTON" || item.evi_name =="SHOTOFF"?<img className="number-img" src="/images/qn-icon-goal.svg" />:item.evi_name =="CORNER" || item.evi_name =="THROWIN"?<img className="number-img" src="/images/qn-icon-corner.svg" />:item.evi_name =="CARD" || item.evi_name =="FOUL" || item.evi_name =="FREEKICK" || item.evi_name =="OFFSIDE"? <img className="number-img" src="/images/qn-icon-ycard.svg" />:item.evi_name =="EVENT"?<img className="number-img" src="/images/qn-icon-corner.svg" />:item.evi_name =="SAVE" || item.evi_name =="BLOCK" || item.evi_name =="INTERCEPTIONS" || item.evi_name =="CLEARANCE"?<img className="number-img" src="/images/qn-icon-goal.svg" />:<img className="number-img" src="/images/qn-icon-empty.svg" />}
                                                               </a>
                                                               <span className="view-stats pointer-hand" onClick={self.handleShowOpta.bind(null,item.evi_id,item.evi_name)}><div className="left"><img src="/images/opta.png" /></div><div className="right border-radius-bottom">STATS</div> </span>
                                                           </div>*/}

                                                           <div className="col-lg-1 col-md-1 col-sm-1 col-xs-2 text-center">
                                                               <a className="" onClick={self.handleshowBP.bind(null,item)}>
                                                                    <span className="number">{item.evi_number} </span> 
                                                               </a>
                                                           </div>
                                                           <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center hidden-xs no-padding">
                                                                <div className="zoola-btn-viewstats" onClick={self.handleShowOpta.bind(null,item.evi_id,item.evi_name)}>VIEW STATS</div>
                                                           </div>
                                                           <div className="col-lg-6 col-md-6 col-sm-7 col-xs-6 ">
                                                               <span className="game-question">{item.evi_desc}</span>
                                                           </div>
                                                           {/*<div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 visible-md visible-lg text-left">
                                                               {item.evi_ui_type =="MINISLIDER"?<Slider1 start={item.evi_value1} end={item.evi_value2} val={item.values} self={self} data={self.state.uniqedata} ind={index} ans1={item.answer} />:item.evi_ui_type =="SLIDER"?<Slider2 self={self} data={self.state.uniqedata} ind={index} ans1={item.answer} option={item.evi_ui_options} values={item.values}/>:item.evi_ui_type =="2SWITCH"?<Switch2 val={item.values} self={self} data={self.state.uniqedata} ind={index} ans1={item.answer}/>:item.evi_ui_type =="3SWITCH"?<Switch3 val={item.values} self={self} data={self.state.uniqedata} ind={index} ans1={item.answer}/>:item.evi_ui_type =="BUTTONS"?<BUTTONS val={item.values} self={self} data={self.state.uniqedata} ind={index} ans1={item.answer}/>:item.evi_ui_type =="CHECKBOX"?<CHECKBOX val={item.values} self={self} data={self.state.uniqedata} ind={index} />:item.evi_ui_type =="DROPDOWN"?<Optdrop val={item.values} self={self} data={self.state.uniqedata} ind={index} ids={id} queType={item.evi_name}/>:''}

                                                           </div>*/}
                                                           <div className="col-lg-3 col-md-3 col-sm-2 col-xs-4 text-center no-padding-left">
                                                                <Optdrop val={item.values} self={self} data={self.state.uniqedata} ind={index} ids={id2} queType={item.evi_ui_type}/>
                                                           </div>
                                                           {/*<div className="col-lg-1 col-md-1 col-sm-1 col-xs-6 text-center padding-top-10 d-none">
                                                               
                                                               <div><span className={item.isStar?"orange zoola-star pointer-hand glyphicon glyphicon-star font-40":"white zoola-star pointer-hand glyphicon glyphicon-star font-40"} onClick={self.changeStar.bind(null,index)}></span></div>
                                                           </div>*/}
                                                       </div>
                                                       <div className="row visible-xs">
                                                           <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center col-centered padding-top-10">
                                                                <div className="viewstats" onClick={self.handleShowOpta.bind(null,item.evi_id,item.evi_name)}>View Stats</div>
                                                           </div>
                                                       </div>
                                                </div>
                                    }
                                    else{
                                        return   <div className={item.isStar?"selected-star-qn game-qns-box bg-dark-blue no-padding-bottom selected-star-qn":"game-qns-box bg-dark-blue no-padding-bottom"} key={item.evi_id}>
                                                            <div className="row">
                                                                {/*<div className="col-lg-3 col-md-3 col-sm-3 col-xs-8 padding-top-10 padding-bottom-10 text-center no-padding-right d-none">
                                                                    <a className="pointer-hand" onClick={self.handleshowBP.bind(null,item)}>
                                                                    <span className="number"> {item.evi_number} </span> {item.evi_name =="GOAL" || item.evi_name =="SHOT" || item.evi_name =="SHOTON" || item.evi_name =="SHOTOFF"?<img className="number-img" src="/images/qn-icon-goal.svg" />:item.evi_name =="CORNER" || item.evi_name =="THROWIN"?<img className="number-img" src="/images/qn-icon-corner.svg" />:item.evi_name =="CARD" || item.evi_name =="FOUL" || item.evi_name =="FREEKICK" || item.evi_name =="OFFSIDE"? <img className="number-img" src="/images/qn-icon-ycard.svg" />:item.evi_name =="EVENT"?<img className="number-img" src="/images/qn-icon-corner.svg" />:item.evi_name =="SAVE" || item.evi_name =="BLOCK" || item.evi_name =="INTERCEPTIONS" || item.evi_name =="CLEARANCE"?<img className="number-img" src="/images/qn-icon-goal.svg" />:<img className="number-img" src="/images/qn-icon-empty.svg" />}
                                                                    </a>
                                                                    <span className="view-stats pointer-hand" onClick={self.handleShowOpta.bind(null,item.evi_id,item.evi_name)}><div className="left"><img src="/images/opta.png" /></div><div className="right border-radius-bottom">STATS</div> </span>
                                                                </div>*/}

                                                                <div className="col-lg-1 col-md-1 col-sm-1 col-xs-2 text-center">
                                                                    <a className="" onClick={self.handleshowBP.bind(null,item)}>
                                                                        <span className="number">{item.evi_number} </span>
                                                                    </a>
                                                                </div>
                                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center hidden-xs no-padding">
                                                                    <div className="zoola-btn-viewstats" onClick={self.handleShowOpta.bind(null,item.evi_id,item.evi_name)}>VIEW STATS</div>
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-7 col-xs-6">
                                                                    <span className="game-question">{item.evi_desc} </span>
                                                                </div>
                                                                {/*<div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 visible-md visible-lg text-left">
                                                                    {item.evi_ui_type =="MINISLIDER"?<Slider1 start={item.evi_value1} end={item.evi_value2} val={item.values} self={self} data={self.state.uniqedata} ind={index} ans1={item.answer} />:item.evi_ui_type =="SLIDER"?<Slider2 self={self} data={self.state.uniqedata} ind={index} ans1={item.answer} option={item.evi_ui_options} values={item.values}/>:item.evi_ui_type =="2SWITCH"?<Switch2 val={item.values} self={self} data={self.state.uniqedata} ind={index} ans1={item.answer}/>:item.evi_ui_type =="3SWITCH"?<Switch3 val={item.values} self={self} data={self.state.uniqedata} ind={index} ans1={item.answer}/>:item.evi_ui_type =="BUTTONS"?<BUTTONS val={item.values} self={self} data={self.state.uniqedata} ind={index} ans1={item.answer}/>:item.evi_ui_type =="CHECKBOX"?<CHECKBOX val={item.values} self={self} data={self.state.uniqedata} ind={index} />:item.evi_ui_type =="DROPDOWN"?<Optdrop val={item.values} self={self} data={self.state.uniqedata} ind={index} ids={id}/>:''}

                                                                </div>*/}
                                                                <div className="col-lg-3 col-md-3 col-sm-2 col-xs-4 text-center no-padding-left">
                                                                    <Optdrop val={item.values} self={self} data={self.state.uniqedata} ind={index} ids={id2} queType={item.evi_ui_type}/>

                                                                </div>
                                                                {/*<div className="col-lg-1 col-md-1 col-sm-1 col-xs-6 text-center padding-top-10 d-none">
                                                                    
                                                                    <div><span className={item.isStar?"orange zoola-star pointer-hand glyphicon glyphicon-star font-40":"light-blue zoola-star pointer-hand glyphicon glyphicon-star font-40"} onClick={self.changeStar.bind(null,index)}></span></div>
                                                                </div>*/}
                                                            </div>
                                                            <div className="row visible-xs">
                                                               <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center col-centered padding-top-10">
                                                                    <div className="viewstats" onClick={self.handleShowOpta.bind(null,item.evi_id,item.evi_name)}>View Stats</div>
                                                               </div>
                                                            </div>
                                                   </div>


                                    }

                               }
                            })
                        }
                        {headerThis.state.tickets.length<1 && headerThis.state.data.status=='O'?this.state.uniqedata.length%2==0?<div className="game-qns-box bg-star-qn margin-bottom-10">
                                	<div className="row">
                                    	<div className="col-lg-1 col-md-1 col-sm-1 col-xs-2 text-center">
                                        	<span className="number z-star z-star-icon"> <span className="glyphicon glyphicon-star yellow"> </span></span>
                                    	</div>
                                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center hidden-xs no-padding">

                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-7 col-xs-6">
                                        	<span className="game-question no-padding-top">Win double points on question number:</span>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-2 col-xs-4 text-center no-padding-left">
                                        	<OptdropQue self={self} data={self.state.uniqedata} ind="star"/>
                                        </div>
                                        
                                	</div>
                                </div>:<div className="game-qns-box bg-star-qn margin-bottom-10">
                                	    <div className="row">
                                    	    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-2 text-center">
                                        	      <span className="number z-star z-star-icon"> <span className="glyphicon glyphicon-star yellow"> </span></span>
                                            </div>
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center hidden-xs no-padding">

                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-7 col-xs-6">
                                        	    <span className="game-question no-padding-top">Win double points on question number:</span>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-2 col-xs-4 text-center no-padding-left">
                                        	    <OptdropQue self={self} data={self.state.uniqedata} ind="star"/>
                                            </div>
                                            
                                        </div>
                         </div>:''}
                        <div id="questions_error" className="text-center alert-message"></div>
{headerThis.state.tickets.length==0 && headerThis.state.data.status=='O'?this.props.isLog?<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-centered no-padding"><button className="btn zoola-btn margin-top-20" onClick={self.valudateAnswersDropDown.bind(null,"questions_error")}>
                                 <div className="btn-txt" >Join Game</div>
                       </button></div>:<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-centered no-padding"><button className="btn zoola-btn margin-top-20" data-toggle="modal" data-target="#login-with-email">
                                    <div className="btn-txt">Login & Join Game</div>
                                </button></div>:''}
                       
                        
                        <Tickets self={this} tickets={headerThis.state.tickets}/>
                        

                        {headerThis.state.tickets.length>0 && headerThis.state.data.status=='O'?<span><CreateAnother data={this.state.uniqedata} self={self} isedit={this.state.isEditTicket}/></span>:''}

                        <div>

                            {this.state.showBP?<BreakPointsPopUp handleHideBP={this.handleHideBP} data={this.state.mainBPData} />:''}                          
                        </div>

                        <div className="modal fade animated fadeIn" id="BuyTicketModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" data-keyboard="true">
                          <div className="modal-dialog " role="document">
                            <div className="modal-content BuyTicketModal">
                              <div className="modal-header">
                                      <img src="/images/close-icon.svg" data-dismiss="modal" className="pointer-hand pull-right" width="25" />
                	                     {/*<h4 className="text-gray text-center" id="myModalLabel">
                                             <div className="ticket-title">
                	                            <img src="/images/zoola-game-blue-30.svg" className="margin-bottom-5" />
                                                <span className="playername-cop1 padding-left-10 padding-right-30">{headerThis.state.data.game_name}</span>
                                             </div>{headerThis.state.data.fxt_name}
                                         </h4>*/}
                                     <br />
                              </div>
                              <div className="modal-body no-padding">
                                  <div className="bg-blue row no-margin">
                                        <h3 className="">Ticket #{headerThis.state.tickets.length+1} <span className="d-block-m">Confirmation</span></h3>
                                  </div>
                                   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                        <div className="space-5"></div>
                                        <div className="kickoff">{headerThis.state.data.status=='O'?<span>{ headerThis.state.days > 0 ?  headerThis.state.days + ' day(s)' : <span>{headerThis.state.showCountDown?<CountDown hours={headerThis.state.hours} minutes={headerThis.state.min} seconds={headerThis.state.sec } self={headerThis} msg="Game live" />:''}</span> }</span> :headerThis.state.data.status=='R'?<CountDown hours={headerThis.state.hours} minutes={headerThis.state.min} seconds={headerThis.state.sec } self={headerThis} msg='Game finished' />:headerThis.state.data.status=='C'?<CountDown hours={headerThis.state.hours} minutes={headerThis.state.min} seconds={headerThis.state.sec } self={headerThis} msg='Game live' />:headerThis.state.data.status=='A'?'Abandoned':''}</div>
                                        <div className="space-5"></div>
                                   </div>
                                   <div className="row">                               
            	                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                	                        <div className="leaderboard-team lb-home-team">
                                                <img src={headerThis.state.data.home_team_id ? headerThis.state.data.competition_id == 8 ? "/images/jerseys/EPL/" + headerThis.state.data.home_team_id + ".svg" : headerThis.state.data.competition_id == 10 ? "/images/jerseys/EC/" + headerThis.state.data.home_team_id + ".svg" : "/images/football-shirts/numbers/" + headerThis.state.data.home_team_id + ".svg" : "/images/qn-icon-empty.svg"}/>
                                                <span className="lb-team-name mon-txt">{headerThis.state.data.home_team}</span>
                	                        </div>
            	                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                	                        <div className="leaderboard-team lb-away-team">
                                                <img src={headerThis.state.data.away_team_id ? headerThis.state.data.competition_id == 8 ? "/images/jerseys/EPL/" + headerThis.state.data.away_team_id + ".svg" : headerThis.state.data.competition_id == 10 ? "/images/jerseys/EC/" + headerThis.state.data.away_team_id + ".svg" : "/images/football-shirts/numbers/" + headerThis.state.data.away_team_id + ".svg" : "/images/qn-icon-empty.svg"}/>
                                                <span className="lb-team-name mon-txt">{headerThis.state.data.away_team}</span>
                	                        </div>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            this.state.uniqedata.map(function (item, index) {
                                                if(index%2==0){
                                                    return <div className={item.isStar?"selected-star-qn game-qns-box padding-10 bg-light-blue margin-10":"game-qns-box padding-10 bg-light-blue margin-10"} key={item.evi_id}>
                                                                    <div className="row no-margin">
                                                                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-4 hidden-xs">
                        	                                                <span className="number"> {item.evi_number} </span>
                                                                        </div>
                                                                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-7">
                    	                                                    <span className="game-question">{item.evi_desc}</span>
                                                                        </div>
                                                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-5 text-right">{/* {item.isStar?<div className="doble-points text-center"><span className="glyphicon glyphicon-star font-30 blue"></span><br /><span className="blue">DOUBLE<br />POINTS</span></div>:''}*/}
                    	                                                    <div className="bg-dark-blue answer"> {item.evi_ui_type=='2SWITCH'?item.answer=='Y'?'YES':'NO':item.answer}</div>
                                                                        </div>
                                                                    </div>
                                                            </div>
                                                }
                                                else{
                                                    return <div className={item.isStar?"selected-star-qn game-qns-box padding-10 bg-dark-blue margin-10":"game-qns-box padding-10 bg-dark-blue margin-10"} key={item.evi_id}>
                                                                    <div className="row no-margin">
                                                                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-4 hidden-xs">
                        	                                                <span className="number"> {item.evi_number} </span>
                                                                        </div>
                                                                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-7">
                    	                                                    <span className="game-question">{item.evi_desc}</span>
                                                                        </div>
                                                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-5 text-right">
                                                                            {/* {item.isStar?<div className="doble-points text-center"><span className="glyphicon glyphicon-star font-30 blue"></span><br /><span className="blue">DOUBLE<br />POINTS</span></div>:''}*/}
                    	                                                    <div className="bg-light-blue answer"> {item.evi_ui_type=='2SWITCH'?item.answer=='Y'?'YES':'NO':item.answer}</div>
                                                                        </div>
                                                                    </div>
                                                            </div>
                                                }
                                               
                                            })
                                        }
                                    </div>
                                    <div className="row no-margin">
                                        <div className="col-lg-12 text-center">
                                            <div className="space-5"></div>
                	                        <h4>This Ticket Costs &pound; {headerThis.state.data.entry_}</h4>
                                            <div className="space-5"></div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-8 col-centered">
                                        <button className="btn zoola-btn" onClick={this.submitQuestions}>
                                            <h5 className="">{this.state.isEditTicket?"Save ticket":"Buy now"}</h5>
                                        </button>
                                       <div className="space-5"></div>
                                        {SupHeaderThis.state.items.zeds>0&&headerThis.state.data.entry_<=2?<div className="bg-line margin-left-30 margin-right-30 margin-top-15">
                                            <span className="bg-body">or</span>
                                        </div>:''}
                                        <div className="space-10"></div>
                                        {SupHeaderThis.state.items.zeds>0&&headerThis.state.data.entry_<=2?<button className="btn zoola-btn" onClick={this.submitQuestions}>
                                            <h5 className="">Play with Zs</h5>
                                        </button>:''}
                                    </div>
                             </div>
                              <div className="modal-footer">
                                    <p className="ntr-txt text-center underline" onClick={this.cancelTicketModal}>Cancel Ticket</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {this.state.showViewTicket?<ViewTicketModal handleHideViewTicket={this.handleHideViewTicket} ticket={this.state.selectedTicket} edit={this.editTicket} isedit={this.state.isEditTicket} gamestatus={headerThis.state.data.status} page="GV" plsid={plsid}/>:''}
                        {this.state.showOpta?this.state.selectedOptaName=="GOAL" || this.state.selectedOptaName=="SHOT" || this.state.selectedOptaName=="SHOTON" || this.state.selectedOptaName=="SHOTSOFFTARGET"?<OptaPopupAttack handleHideOpta={this.handleHideOpta} eid={this.state.selectedOpta} />:this.state.selectedOptaName=="CARD" || this.state.selectedOptaName=="FOUL" || this.state.selectedOptaName=="FREEKICK" || this.state.selectedOptaName=="OFFSIDE"?<OptaPopupDiscipline handleHideOpta={this.handleHideOpta} eid={this.state.selectedOpta} />:this.state.selectedOptaName=="SAVE" || this.state.selectedOptaName=="BLOCK" || this.state.selectedOptaName=="INTERCEPTIONS" || this.state.selectedOptaName=="CLEATANCE"?<OptaPopupDefence handleHideOpta={this.handleHideOpta} eid={this.state.selectedOpta} />:this.state.selectedOptaName =="CORNER" || this.state.selectedOptaName =="THROWIN"?<OptaPopupDeadball handleHideOpta={this.handleHideOpta} eid={this.state.selectedOpta} />:'':''}
                        <div className="modal fade animated fadeIn" tabIndex="-1" role="dialog" aria-labelledby="Alert-Modal" id="alert-modal5" data-keyboard="true">
                            <div className="modal-dialog modal-sm ">

                                <div className="modal-content zoola-box alert-modal">
        	                        <div className="social-header">
            	                        <img src="/images/close-icon.svg" width="20" className="pull-right pointer-hand" data-dismiss="modal"/>

        	                        </div>
        	                        <div className="social-body">
            	                        <div className="space-5"></div>
                                        <div className="row">
                	                        <div className="col-lg-12">
                    	                        <p>Insufficient cash balance for the game requested.Please choose another game or click below to make a deposit.</p>
                	                        </div>
                                        </div>
                                        <div className="space-5"></div>
                                        <div className="row">
                                            <div className="col-lg-10 col-sm-10 col-centered">
                                                <button type="submit" className="btn zoola-btn" onClick={this.gotoTopup}><h5 className="">Deposit</h5></button>
                                            </div>
                                        </div>
                                        <div className="space-5"></div>

        	                        </div>
                                </div>
                            </div>
                        </div>


                        <div className="modal fade animated fadeIn" tabIndex="-1" role="dialog" aria-labelledby="Alert-Modal" id="alert-modal4" data-keyboard="true">
                            <div className="modal-dialog modal-sm ">

                                <div className="modal-content zoola-box alert-modal">
        	                        <div className="social-header">
            	                        <img src="/images/close-icon.svg" width="20" className="pull-right pointer-hand" data-dismiss="modal" />

        	                        </div>
        	                        <div className="social-body">
            	                        <div className="space-5"></div>
                                        <div className="row">
                	                        <div className="col-lg-12">
                    	                        <p>Insufficient cash balance for the game requested.Please choose another game or click below to make a deposit.</p>
                	                        </div>
                                        </div>
                                        <div className="space-5"></div>
                                        <div className="row">
                                            <div className="col-lg-10 col-sm-10 col-centered">
                                                <button type="submit" className="btn zoola-btn" onClick={this.gotoTopup}><h5 className="">Deposit</h5></button>
                                            </div>
                                        </div>
                                        <div className="space-5"></div>

        	                        </div>
                                </div>
                            </div>
                        </div>




                    </div>
                
           </div>
        )
    }
});

//**********---- Component to display questions for buy another ticket ----**********
var CreateAnotherThis;
var CreateAnother = React.createClass({
    getInitialState: function () {
        return {
            pointItems: [],
            team: "",
            items: [],
            h2h:[],
            showBP:false,
            mainBPData:{},
            showOpta:false,
            selectedOpta:0,
            selectedOptaName:""
        };
    },
    componentWillMount: function () {
        CreateAnotherThis=this;
        
    },
    handleHideBP: function(){ //Function to hide break points popup
        this.setState({showBP:false});
    },
    handleshowBP: function(item){ //Function to show break points popup
        if(is_loggedIn)
        {
            this.setState({showBP:true,mainBPData:item});
        }
        
    },
    handleHideOpta: function(){ //Function to hide OPTA popup
        this.setState({showOpta:false,selectedOpta:0,selectedOptaName:""});
    },
    handleShowOpta: function(id,name){ //Function to show OPTA popup
        //console.log(name)
        this.setState({showOpta:true,selectedOpta:id,selectedOptaName:name});
    },
    render: function () {
        var self =this;
        //var sliderval =0;

        return (
            <div className="panel">
                {/*<div className="panel-heading text-center bg-zoola-blue padding-20">
                    <h4 className="panel-title text-center padding-10">
                        Create Ticket 2:
                    </h4>
                </div>*/}
               
                  <div className="panel-body">
                      {
                          this.props.data.map(function (item, index) {
                              var id=index+"_1";
                              var id2=index+"_2";
                              if(headerThis.state.tickets.length!=0 && headerThis.state.data.status=='O'){
                                  if(index%2==0){
                                      return    <div className={item.isStar?"selected-star-qn game-qns-box bg-light-blue no-padding-bottom":"game-qns-box bg-light-blue no-padding-bottom"} key={item.evi_id}>
                                                  <div className="row">
                                                      {/*<div className="col-lg-3 col-md-3 col-sm-3 col-xs-8 padding-top-10 padding-bottom-10 text-center no-padding-right">
                                                              <a className="pointer-hand" onClick={self.handleshowBP.bind(null,item)}>
                                                                    <span className="number"> {item.evi_number} </span> {item.evi_name =="GOAL" || item.evi_name =="SHOT" || item.evi_name =="SHOTON" || item.evi_name =="SHOTOFF"?<img className="number-img" src="/images/qn-icon-goal.svg" />:item.evi_name =="CORNER" || item.evi_name =="THROWIN"?<img className="number-img" src="/images/qn-icon-corner.svg" />:item.evi_name =="CARD" || item.evi_name =="FOUL" || item.evi_name =="FREEKICK" || item.evi_name =="OFFSIDE"? <img className="number-img" src="/images/qn-icon-ycard.svg" />:item.evi_name =="EVENT"?<img className="number-img" src="/images/qn-icon-corner.svg" />:item.evi_name =="SAVE" || item.evi_name =="BLOCK" || item.evi_name =="INTERCEPTIONS" || item.evi_name =="CLEARANCE"?<img className="number-img" src="/images/qn-icon-goal.svg" />:<img className="number-img" src="/images/qn-icon-empty.svg" />}
                                                              </a>
                                                              <span className="view-stats pointer-hand" onClick={self.handleShowOpta.bind(null,item.evi_id,item.evi_name)}><div className="left"><img src="/images/opta.png" /></div><div className="right border-radius-bottom">STATS</div> </span>
                                                          </div>*/}
                                                      
                                                      <div className="col-lg-1 col-md-1 col-sm-1 col-xs-2 text-center">
                                                            <a className="" onClick={self.handleshowBP.bind(null,item)}>
                                                                <span className="number">{item.evi_number} </span>
                                                            </a>
                                                      </div>
                                                      <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center hidden-xs no-padding">
                                                            <div className="zoola-btn-viewstats" onClick={self.handleShowOpta.bind(null,item.evi_id,item.evi_name)}>VIEW STATS</div>
                                                      </div>
                                                      <div className="col-lg-6 col-md-6 col-sm-7 col-xs-6">
                                                          <span className="game-question">{item.evi_desc}</span>
                                                      </div>

                                                      {/*<div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 visible-md visible-lg text-left">
                                                              {item.evi_ui_type =="MINISLIDER"?<Slider1 start={item.evi_value1} end={item.evi_value2} val={item.values} self={self.props.self} data={self.props.data} ind={index} ans1={item.answer} />:item.evi_ui_type =="SLIDER"?<Slider2 self={self.props.self} data={self.props.data} ind={index} ans1={item.answer} option={item.evi_ui_options} values={item.values}/>:item.evi_ui_type =="2SWITCH"?<Switch2 val={item.values} self={self.props.self} data={self.props.data} ind={index} ans1={item.answer} />:item.evi_ui_type =="3SWITCH"?<Switch3 val={item.values} self={self.props.self} data={self.props.data} ind={index} ans1={item.answer}/>:item.evi_ui_type =="BUTTONS"?<BUTTONS val={item.values} self={self.props.self} data={self.props.data} ind={index} ans1={item.answer}/>:item.evi_ui_type =="CHECKBOX"?<CHECKBOX val={item.values} self={self.props.self} data={self.props.data} ind={index} />:item.evi_ui_type =="DROPDOWN"?<Optdrop val={item.values} self={self.props.self} data={self.props.data} ind={index} ids={id}/>:''}
                                                          </div>*/}

                                                      <div className="col-lg-3 col-md-3 col-sm-2 col-xs-4 text-center no-padding-left">
                                                            <Optdrop val={item.values} self={self.props.self} data={self.props.data} ind={index} ids={id2} queType={item.evi_ui_type}/>
                                                      </div>
                                                      {/*<div className="col-lg-1 col-md-1 col-sm-1 col-xs-6 text-center padding-top-10">
                                                            <div>
                                                                <span className={item.isStar?"orange zoola-star pointer-hand glyphicon glyphicon-star font-40":"white zoola-star pointer-hand glyphicon glyphicon-star font-40"} onClick={self.props.self.changeStar.bind(null,index)}></span>
                                                            </div>
                                                          </div>*/}
                                                      
                                                   </div>
                                                   <div className="row visible-xs">
                                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center col-centered padding-top-10">
                                                            <div className="viewstats" onClick={self.handleShowOpta.bind(null,item.evi_id,item.evi_name)}>View Stats</div>
                                                        </div>
                                                   </div>
                                            </div>
                                  }
                                  else{
                                      return  <div className={item.isStar?"selected-star-qn game-qns-box bg-dark-blue no-padding-bottom selected-star-qn":"game-qns-box bg-dark-blue no-padding-bottom"} key={item.evi_id}>
                                              <div className="row">
                                                  {/*<div className="col-lg-3 col-md-3 col-sm-3 col-xs-8 padding-top-10 padding-bottom-10 text-center no-padding-right">
                                                         <a className="pointer-hand" onClick={self.handleshowBP.bind(null,item)}>
                                                            <span className="number"> {item.evi_number} </span> {item.evi_name =="GOAL" || item.evi_name =="SHOT" || item.evi_name =="SHOTON" || item.evi_name =="SHOTOFF"?<img className="number-img" src="/images/qn-icon-goal.svg" />:item.evi_name =="CORNER" || item.evi_name =="THROWIN"?<img className="number-img" src="/images/qn-icon-corner.svg" />:item.evi_name =="CARD" || item.evi_name =="FOUL" || item.evi_name =="FREEKICK" || item.evi_name =="OFFSIDE"? <img className="number-img" src="/images/qn-icon-ycard.svg" />:item.evi_name =="EVENT"?<img className="number-img" src="/images/qn-icon-corner.svg" />:item.evi_name =="SAVE" || item.evi_name =="BLOCK" || item.evi_name =="INTERCEPTIONS" || item.evi_name =="CLEARANCE"?<img className="number-img" src="/images/qn-icon-goal.svg" />:<img className="number-img" src="/images/qn-icon-empty.svg" />}
                                                         </a>
                                                         <span className="view-stats pointer-hand" onClick={self.handleShowOpta.bind(null,item.evi_id,item.evi_name)}><div className="left"><img src="/images/opta.png" /></div><div className="right border-radius-bottom">STATS</div> </span>
                                                       </div>*/}
                                                   <div className="col-lg-1 col-md-1 col-sm-1 col-xs-2 text-center">
                                                        <a className="" onClick={self.handleshowBP.bind(null,item)}>
                                                            <span className="number">{item.evi_number} </span>
                                                        </a>
                                                   </div>
                                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center hidden-xs no-padding">
                                                            <div className="zoola-btn-viewstats" onClick={self.handleShowOpta.bind(null,item.evi_id,item.evi_name)}>VIEW STATS</div>
                                                    </div>
                                                   <div className="col-lg-6 col-md-6 col-sm-7 col-xs-6">
                                                      <span className="game-question">{item.evi_desc} </span>
                                                   </div>
                                                   {/*<div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 visible-md visible-lg text-left">
                                                          {item.evi_ui_type =="MINISLIDER"?<Slider1 start={item.evi_value1} end={item.evi_value2} val={item.values} self={self.props.self} data={self.props.data} ind={index} ans1={item.answer} />:item.evi_ui_type =="SLIDER"?<Slider2 self={self.props.self} data={self.props.data} ind={index} ans1={item.answer} option={item.evi_ui_options} values={item.values}/>:item.evi_ui_type =="2SWITCH"?<Switch2 val={item.values} self={self.props.self} data={self.props.data} ind={index} ans1={item.answer} />:item.evi_ui_type =="3SWITCH"?<Switch3 val={item.values} self={self.props.self} data={self.props.data} ind={index} ans1={item.answer}/>:item.evi_ui_type =="BUTTONS"?<BUTTONS val={item.values} self={self.props.self} data={self.props.data} ind={index} ans1={item.answer}/>:item.evi_ui_type =="CHECKBOX"?<CHECKBOX val={item.values} self={self.props.self} data={self.props.data} ind={index} />:item.evi_ui_type =="DROPDOWN"?<Optdrop val={item.values} self={self.props.self} data={self.props.data} ind={index} ids={id}/>:''}
                                                       </div>*/}
                                                   <div className="col-lg-3 col-md-3 col-sm-2 col-xs-4 text-center no-padding-left">
                                                        <Optdrop val={item.values} self={self.props.self} data={self.props.data} ind={index} ids={id2} queType={item.evi_ui_type}/>
                                                   </div>
                                                   {/*<div className="col-lg-1 col-md-1 col-sm-1 col-xs-6 text-center padding-top-10">
                                                            <div><span className={item.isStar?"orange zoola-star pointer-hand glyphicon glyphicon-star font-40":"light-blue zoola-star pointer-hand glyphicon glyphicon-star font-40"} onClick={self.props.self.changeStar.bind(null,index)}></span></div>
                                                       </div>*/}
                                                   
                                             </div>
                                             <div className="row visible-xs">
                                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center col-centered padding-top-10">
                                                        <div className="viewstats" onClick={self.handleShowOpta.bind(null,item.evi_id,item.evi_name)}>View Stats</div>
                                                    </div>
                                             </div>
                                        </div>
                                  }
                              }
                          })

                        }
                      {this.props.self.state.uniqedata.length%2==0?<div className="game-qns-box bg-star-qn margin-bottom-10">
                                	<div className="row">
                                    	<div className="col-lg-1 col-md-1 col-sm-1 col-xs-2 text-center">
                                        	<span className="number z-star z-star-icon"> <span className="glyphicon glyphicon-star yellow"> </span></span>
                                    	</div>
                                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center hidden-xs no-padding">

                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-7 col-xs-6">
                                        	<span className="game-question no-padding-top">Win double points on question number:</span>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-2 col-xs-4 text-center no-padding-left">
                                        	<OptdropQue self={this.props.self} data={this.props.self.state.uniqedata} ind="star"/>
                                        </div>
                                        
                                	</div>
                       </div>:<div className="game-qns-box bg-star-qn margin-bottom-10">
                                	<div className="row">
                                    	<div className="col-lg-1 col-md-1 col-sm-1 col-xs-2 text-center">
                                        	<span className="number z-star z-star-icon"> <span className="glyphicon glyphicon-star yellow"> </span></span>
                                    	</div>
                                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center hidden-xs no-padding">

                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-7 col-xs-6">
                                        	<span className="game-question no-padding-top">Win double points on question number:</span>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-2 col-xs-4 text-center no-padding-left">
                                        	<OptdropQue self={this.props.self} data={this.props.self.state.uniqedata} ind="star"/>
                                        </div>
                                        
                                	</div>
                         </div>}
                       <div id="createAnother_error" className="text-center alert-message"></div>
                    {headerThis.state.data.status=='O'?<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-centered no-padding"><button className="btn zoola-btn margin-top-20" onClick={this.props.self.valudateAnswersDropDown.bind(null,"createAnother_error")}>
                        <div className="btn-txt">{this.props.isedit?"Update ticket":"Buy another ticket"}</div>
                    </button></div>:''}

                    
                </div>
                
                

            {this.state.showBP?<BreakPointsPopUp handleHideBP={this.handleHideBP} data={this.state.mainBPData} />:''}
                {this.state.showOpta?this.state.selectedOptaName=="GOAL" || this.state.selectedOptaName=="SHOT" || this.state.selectedOptaName=="SHOTON" || this.state.selectedOptaName=="SHOTSOFFTARGET"?<OptaPopupAttack handleHideOpta={this.handleHideOpta} eid={this.state.selectedOpta} />:this.state.selectedOptaName=="CARD" || this.state.selectedOptaName=="FOUL" || this.state.selectedOptaName=="FREEKICK" || this.state.selectedOptaName=="OFFSIDE"?<OptaPopupDiscipline handleHideOpta={this.handleHideOpta} eid={this.state.selectedOpta} />:this.state.selectedOptaName=="SAVE" || this.state.selectedOptaName=="BLOCK" || this.state.selectedOptaName=="INTERCEPTIONS" || this.state.selectedOptaName=="CLEARANCE"?<OptaPopupDefence handleHideOpta={this.handleHideOpta} eid={this.state.selectedOpta} />:this.state.selectedOptaName =="CORNER" || this.state.selectedOptaName =="THROWIN"?<OptaPopupDeadball handleHideOpta={this.handleHideOpta} eid={this.state.selectedOpta} />:'':''}
    </div>
        )
    }
});

//**********---- Component to display header ----**********
var Header = React.createClass({
    render: function () {
        return (
            <h1>{this.props.text} </h1>
        )
    }
});


//**********---- Component to display game leaderboard session ----**********
var GLThis;  
var GameLeaderboard = React.createClass({
    getInitialState: function () {
        return {
            pointItems: [],
            team: "",
            items: [],
            h2h:[],
            showBP:false,
            mainBPData:{},
            isKick:false,
            filterItems:[],
            itemsshow:0,
            itemsPerClick:0,
            noCross : true
        };
    },
    componentWillMount: function () {
        GLThis=this;
        if (is_loggedIn == false){
            this.serverRequest = $.get(baseurl+"fixture/pregame3/"+plsid, function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
               //this.setState({pointItems: result.items})
            }.bind(this));
        }
        else{
            this.serverRequest = $.get(baseurl+"play/game3/"+ userId+"," + sessionId+"," +plsid, function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                // result={"items":[{"position":"1","usr_id":"10095","usr_image":"4","usr_alias":"CaptainBrad3","points":"310","entry_":"5","upl_id":"437","max_points":"600"},{"position":"2","usr_id":"10080","usr_image":"14","usr_alias":"CaptainBrad2","points":"310","entry_":"5","upl_id":"429","max_points":"600"},{"position":"3","usr_id":"10104","usr_image":"24","usr_alias":"louisUX","points":"310","entry_":"5","upl_id":"420","max_points":"600"},{"position":"4","usr_id":"10104","usr_image":"24","usr_alias":"louisUX","points":"310","entry_":"5","upl_id":"424","max_points":"600"},{"position":"5","usr_id":"10096","usr_image":"8","usr_alias":"joeyoung58","points":"240","entry_":"5","upl_id":"422","max_points":"600"},{"position":"6","usr_id":"10080","usr_image":"14","usr_alias":"CaptainBrad2","points":"210","entry_":"5","upl_id":"428","max_points":"600"},{"position":"7","usr_id":"10080","usr_image":"14","usr_alias":"CaptainBrad2","points":"210","entry_":"5","upl_id":"433","max_points":"600"},{"position":"8","usr_id":"10105","usr_image":"26","usr_alias":"Lizzylee123","points":"210","entry_":"5","upl_id":"425","max_points":"600"},{"position":"9","usr_id":"10011","usr_image":"24","usr_alias":"frodo","points":"210","entry_":"5","upl_id":"442","max_points":"600"}]}
                var totalItems = result.items.length;
                var itemsshow = 10;
                if(this.state.itemsshow>10)
                {
                    itemsshow = this.state.itemsshow;
                }
                var itemsPerClick = 10
                var filterLB = result.items.slice(0, itemsshow)
                this.setState({pointItems: result.items, filterItems:filterLB,itemsshow:itemsshow, itemsPerClick: itemsPerClick})
            }.bind(this));
        }
                
    },
    showMore:function(){
        var itemsshow = this.state.itemsshow + this.state.itemsPerClick;
        var filterLB = this.state.pointItems.slice(0, itemsshow)
        this.setState({  filterItems: filterLB, itemsshow: itemsshow })
    },
    updateState: function () {
        this.componentWillMount();
        
       
    },
    changeGameStart:function(){
        this.setState({isKick:true})
        //console.log("start changed")
    },
    componentDidMount:function(){
        $(document).on("click", '#viewMoreToggle', function (event) {
            $(this).find('img').toggle();
        });
        this.timer = setInterval(this.updateState, 10000);
    },
    handleHideBP: function(){ //Function to hide break points popup
        this.setState({showBP:false});
    },
    handleshowBP: function(item){ //Function to show break points popup
        if(is_loggedIn){
            this.setState({showBP:true,mainBPData:item});
        }
        
    },
    handleHideMiniDash: function () { // Function to hide break points popup
        this.setState({ showMD: false });
    },
    handleshowMiniDash: function (item) { // Function to show break points popup

        this.setState({ showMD: true, miniDashUID: item });
    },
    collapse:function(index){
        //console.log("collapse");
        $('.mycollapse').each(function(){
            if ($(this).hasClass('in')) {
                $(this).collapse('toggle');
                $(this).closest('#viewMoreToggle').click();
            }
        });
        this.setState({h2hIndex:index});
        $("#view-more"+index).collapse('toggle');
        if($("#view-more"+index).attr('aria-expanded') == 'true'){
            this.setState({noCross : false});
        }else {
            this.setState({noCross : true});
        }
    },
    render: function () {
        var self =this;
        var now = new Date();
        return(
                 <div>
                 <div className="space-10"></div>
                 <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true" >
                     
                     <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="headingTwo">
                        	     <h1 className="panel-title">
                                    <a className="collapsed" data-toggle="collapse" data-parent="accordion" href="#collapse-leaderboard">
                                      LEADERBOARD{this.state.team}
                                    </a>
                        	     </h1>
                        </div>
                        <div id="collapse-leaderboard" className= {headerThis.state.data.status!="O"?'panel-collapse collapse in':'panel-collapse collapse'} role="tabpanel" aria-labelledby="headingTwo">
                          <div className="panel-body">
                             <div className="panel-group" id="nested">
                                 {
                                    this.state.filterItems.map(function (item, index) {
                                        var viewMoreCollapseStyle ={
                                            "display":"none"
                                        }
                                        
                                        var max=600;
                                        if(item._max_points)
                                        {
                                            max=item._max_points;
                                        }
                                        var pointsPer = (item.points/max)*100
                                        var width=pointsPer+"%"
                                        var pointsWidth={
                                            "minWidth": "0em",
                                            "width": width
                                        }
                                       //console.log(item)
                                        if (index%2 == 0) {
                                            return (
                                                    
                                                        <div className="game-qns-box bg-light-blue" key={index}>
                                                          
                                                               <div className="row leaderboard-mobile no-margin">
                                                                   <div className="col-lg-5 col-md-5 col-sm-5 col-xs-10 valign-middle no-padding">
                                        	                            <div className="capsle-number"><span className="leaderboard-number">{item.position}</span><img src={"/images/animals-Modified/"+item.usr_image+".svg"} className="pointer-hand" onClick={self.handleshowMiniDash.bind(null,item.usr_id)}/></div>
                                                                        <span className="LB-playername">{item.usr_alias}</span>
                                                                   </div>
                                                                   
                                                                   <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center no-padding">
                                         	                              <span className=""> 
                                                                             {self.props.isLog?<a  onClick={self.collapse.bind(null,index)} data-toggle="collapse" data-parent="#nested">{(self.state.h2hIndex != index || self.state.noCross == true)?<img className="pointer-hand valign-m" src="/images/view-icon.svg" />:<img className="pointer-hand valign-m viewMoreCollapse" src="/images/view-icon-collapse.svg" />}</a>:<img className="pointer-hand valign-m" src="/images/view-icon-collapse.svg" />}
                                         	                              </span>
                                                                   </div>

                                                                   <div className="space-5 visible-xs col-xs-12"></div>

                                                                   <div className="col-lg-2 col-md-2 col-sm-2 col-xs-6 text-center no-padding">
                                                                        <div className="player-pot-value">&pound;{item.win_value}</div>
                                                                   </div>
                                                                   <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center">
                                                                       <div className="point-box1">
                                                                            <div style={pointsWidth} aria-valuemax="100" aria-valuemin="0" aria-valuenow="2" role="progressbar" className="progress-bar">
                                                                                <span className="points">{item.points} points</span>
                                                                            </div>
                                                                       </div>
                                                                   </div>
                                                               </div>
                                                           
                                                           
                                                                <div id={"view-more"+index} className="row panel-collapse collapse mycollapse">
                                                                        <div className="space-5"></div>
                                    	                                <div className="col-lg-12 no-padding">
                                                                            {is_loggedIn && self.state.h2hIndex==index?<H2H self={self} usrID = {item.usr_id} headerthis={self.state.isKick} upl={item.upl_id} now={now}/>:''}
                                    	                                </div>
                                                                </div>
                                                          
                                                        </div>
                                                    )
                                        }else {
                                            return(
                                                       <div className="game-qns-box bg-light-blue" key={index}>
                                                            
                                                                <div className="row leaderboard-mobile no-margin">
                                                                    <div className="col-lg-5 col-md-5 col-sm-5 col-xs-10 valign-middle no-padding">
                                        	                            <div className="capsle-number"><span className="leaderboard-number">{item.position}</span><img src={"/images/animals-Modified/"+item.usr_image+".svg"} className="pointer-hand" onClick={self.handleshowMiniDash.bind(null,item.usr_id)} /></div>
                                                                        <span className="LB-playername">{item.usr_alias}</span>
                                                                    </div>
                                                                   
                                                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center no-padding">
                                         	                            <span className="">
                                                                                {self.props.isLog?<a onClick={self.collapse.bind(null,index)} data-toggle="collapse" data-parent="#nested" >{(self.state.h2hIndex != index || self.state.noCross === true)?<img className="pointer-hand valign-m" src="/images/view-icon.svg" />:<img className="pointer-hand valign-m viewMoreCollapse" src="/images/view-icon-collapse.svg" />}</a>:<img className="pointer-hand valign-m" src="/images/view-icon-collapse.svg" />}
                                         	                            </span>
                                                                    </div>

                                                                    <div className="space-5 visible-xs col-xs-12"></div>

                                                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-6 text-center no-padding">
                                                                        <div className="player-pot-value">&pound;{item.win_value}</div>
                                                                    </div>
                                                                     <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center">
                                                                        <div className="point-box1">
                                                                            <div style={pointsWidth} aria-valuemax="100" aria-valuemin="0" aria-valuenow="2" role="progressbar" className="progress-bar">
                                                                                <span className="points">{item.points} points</span>
                                                                            </div>
                                                                        </div>
                                                                     </div>
                                                                </div>
                                                            
                                                            
                                                                <div id={"view-more"+index} className="row panel-collapse collapse mycollapse">
                                                                    <div className="space-5"></div>
                                    	                            <div className="col-lg-12 no-padding">
                                                                        {is_loggedIn && self.state.h2hIndex==index?<H2H self={self} usrID={item.usr_id} headerthis={self.state.isKick} upl={item.upl_id} now={now}/>:''}
                                    	                            </div>
                                                                </div>
                                                           
                                                     </div>
                                             )
                                        }


                                    })
                                 }
                                 {this.state.itemsshow<this.state.pointItems.length?<div className="row">
                                <div className="col-lg-7 col-md-8 col-sm-6 col-xs-12 col-centered">
                                    <div className="btn zoola-btn margin-top-20">
                                        <div className="btn-txt" onClick={this.showMore}>More</div>
                                    </div>
                                </div>
                          </div>:''}
                             </div>
                          </div>
                        </div>
                      </div>
                     {/*<div className="panel panel-default">
                             <div className="panel-heading padding-20" id="headingThree">
                                 <h1 className="panel-title text-center">
                                    <a className="accordion-toggle pointer-hand collapsed" data-toggle="collapse" data-parent="accordion" href="#collapseThree">
                                          PLAYER CHAT
                                    </a>
                                </h1>
                            </div>
                            <div id="collapseThree" className="panel-collapse collapse" aria-labelledby="headingThree">
                                <div className="panel-body padding-10">
                                    <div className="space-5"></div>
                                    <div className="row">
                    	                <div className="col-lg-12">
	                                        <ul id="myTab" className="nav nav-tabs zoola-tabs player-chat">
                                              <li className="active"><a data-toggle="tab" data-target="#player-chat">PLAYER CHAT</a></li>
                                              <li><a data-toggle="tab" data-target="#live-commentary">LIVE COMMENTARY</a></li>
	                                        </ul>
                                            <div className="tab-content zoola-tab-content">
                                              <div id="player-chat" className="tab-pane  active">
                                                    
                                                    <div className="space-10"></div>      
                                                                                         
                                                    <div className="space-10"></div>
                                                    
                                              </div>
                                              <div id="live-commentary" className="tab-pane">
                                                    <div className="space-5"></div>  
                                                    <Commentary fixId={headerThis.state.data.fxt_id}/>                       
                                              </div>
                                            </div>
                    	                </div>
                                  </div>
                                </div>
                            </div>
                       </div>*/}
                       {this.state.showBP?<BreakPointsPopUp handleHideBP={this.handleHideBP} data={this.state.mainBPData}/>:''}
                       {this.state.showMD ? <MiniDash handleHideMD={this.handleHideMiniDash} uid={this.state.miniDashUID}/> : ''}
                     </div>
                     <div className="space-5"></div>
                     <div className="panel-default playerchat">
                        <div className="panel-heading playerchat-heading no-margin-bottom">
                            <h1 className="panel-title text-center white">
                                <a className="collapsed" data-toggle="collapse" data-parent="accordion" href="#playerchat">
                                    PLAYER CHAT <img src="/images/chat-icon.svg" alt="Chat icon"width="25" />
                                </a>
                            </h1>
                            
                        </div>
                        <div className="panel-body collapse" id="playerchat">
                            {this.props.isLog&&SupHeaderThis.state.items.status!='L'?<PlayerChat />:''}
                        </div>
                    </div>
                    <div className="space-5"></div>
                    <div className="panel-default playerchat">
                        <div className="panel-heading livecomm-heading no-margin-bottom">
                            <h1 className="panel-title text-center white">
                                <a className="collapsed" data-toggle="collapse" data-parent="accordion" href="#livecommentary">
                                    LIVE COMMENTARY <img src="/images/commentary-icon.svg" alt="Chat icon" />
                                </a>
                            </h1>
                        </div>
                        <div className="panel-body collapse" id="livecommentary">
                             <Commentary fixId={headerThis.state.data.fxt_id} />  
                        </div>
                    </div>
                     <div className="space-10"></div>
           </div>
                     
        )
                    
    }
});
                    
//**********---- Component to display head to head session after login ----**********
var h2hThis;
var H2H = React.createClass({
    getInitialState: function () {
        return {
            h2h:[],
            iskickoff:false,
            totalPages: 0,
            itemsPerPage: 0,
            activePage: 0,
            filteredItems:[],
            items:{},
            h2hticket:[],
            userticket:[]

        };
    },
    componentWillMount: function () {
        h2hThis = this;
        var self = this;
        //this.serverRequest = $.get(baseurl+"play/h2h/"+userId+","+sessionId +","+this.props.upl+","+this.props.usrID, function (result) {
        //    if (typeof result != 'object') {
        //        result = JSON.parse(result)
        //    }
        //    self.setState({h2hticket:result.h2h_ticket,userticket:result.user_ticket})
        //}.bind(this));

        $.ajax({
            type: "GET",
            url: baseurl+"play/h2h/"+userId+","+sessionId +","+this.props.upl+","+this.props.usrID,
            async: false,
            success: function (result) {
                //console.log(result)
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                self.setState({h2hticket:result.h2h_ticket,userticket:result.user_ticket})
        
            }
        });
       
    },
    shouldComponentUpdate :function(nextProps, nextState){
        //console.log(nextProps.now," ",nextProps.now !== this.props.now)
        if(nextProps.now !== this.props.now)
        {
            this.componentWillMount();
        }
        return nextProps.now !== this.props.now
    },
    changepage: function (pno) {
        this.setState({ activePage: pno })
        var startIndex,endIndex;
        if (pno > 1)
        {
            startIndex = (pno-1) * this.state.itemsPerPage;
        }
        else {
            startIndex = 0;
        }
        endIndex = startIndex + this.state.itemsPerPage
        //console.log("startIndex=="+startIndex)
        var filteredItems = this.state.h2h.slice(startIndex, endIndex);
        //console.log(filteredTrans)
        this.setState({ filteredItems: filteredItems })
        //console.log(this.state.transactions)
        //console.log(pno);
    },
    componentDidMount:function(){

    },
    render: function () {
        var self = this;
        return (
            <div className="well well-lg no-margin-bottom">
            <div className="row">
                <p className="text-center gm-txt blue">Click on the question number to view full points breakdown</p>
            </div>
            <div className="row col-lg-10 col-xs-12 col-centered no-padding">
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">

                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 no-padding">
                    <p className="text-center"><strong>Your Rival</strong>  </p>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <p className="text-center"><strong>You</strong></p>
                </div>
                
            </div>
                {
                    this.state.h2hticket.map(function (item, index) {
                        var userTicket = self.state.userticket.filter(function(d){
                            if(d.event_order == item.event_order)
                            {
                                return true
                            }
                        })
                        return <div key={index}>
                                <div className="row col-lg-10 col-xs-12 col-centered no-padding">
                                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-2">
                                        <a className="pointer-hand" onClick={self.props.self.handleshowBP.bind(null,item)}>
                                            <span className="number"> {item.event_order} </span>
                                        </a>

                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-2 padding-top-10 no-padding-right no-padding-left">
                                        <span className="ntr-txt blue"><strong>{item.correct}</strong></span>
                                    </div>

                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        {userId!=self.props.usrID?<div className={item.h2h_star == 'Y'?'selected-star-qn-h2h':''}><div className="h2h-player-img d-block-m margin-right-10"><img className="" src={"/images/animals-Modified/"+item.h2h_image_id+".svg"} width="50" /></div><div className="ntr-txt d-block-m">{self.props.headerthis?item.h2h_answer:'Secret until kickoff'}</div></div>:''}
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        {userTicket.length>0?<div className={userTicket[0]['usr_star'] == 'Y'?'selected-star-qn-h2h':''}><div className="h2h-player-img d-block-m margin-right-10"><img className="" src={"/images/animals-Modified/"+userTicket[0]['usr_image_id']+".svg"} width="50" /></div><div className="ntr-txt blue d-block-m">{userTicket[0]['usr_answer']}</div></div>:''}
                                    </div>

                                </div>
                                <div className="space-5 col-lg-12"></div>
                        </div>
                    })
                }
                <div className="row">
                    <div className="col-lg-12  text-right">
                        {/*<Pagination totalPages={this.state.totalPages} self={this} activePage={this.state.activePage} />*/}
                    </div>
                </div>

            </div>
        )
    }
});

//**********--- pages component ---**********
var Pagination = React.createClass({
    render: function () {
        var self = this;
        return (
                     <ul className="zoola-pagination pull-right">
                        {(function (que, num) {
                            //console.log(num)
                            for (i = 1; i <= num; i++)
                            {
                                que.push(
                                    <li id={"pagenation_" + i} key={i} onClick={self.props.self.changepage.bind(null, i)} className="pointer-hand"><a >{i}</a></li>)
                        }
                            return que
                     })([], this.props.totalPages)}

                 </ul>
)
}
});

//**********---- Component for break points popup ----**********
var BreakPointsPopUp = React.createClass({
    getInitialState: function () {
        return {
            bp:[],
            mainData:{},
        };
        
    },   
    componentWillMount: function () {            
       //var breakPoints =[{
       //     "event_order": "6",
       //     "event_name": "EVENT",
       //     "event": "Which will be the first two events to occur?"
       // }, {
       //     "description": "Selected exact value",
       //     "points": "100 points"
       // }, {
       //     "description": "Closest value plus or minus",
       //     "points": "50 points"
       // }, {
       //     "description": "2nd closest value",
       //     "points": "30 points"

       // }, {
       //     "description": "3rd closest value",
       //     "points": "10 points"

       //  }]
        this.serverRequest = $.get(baseurl+"play/points/"+userId+","+sessionId +","+this.props.data.evi_id, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)                
            }
           
            //result ={"items":[{"event_order":"1","event_name":"SAVE","event":"Will both teams make a save?"},{"description":"Selected exact value","points":"100 points"},{"description":"Closest value plus or minus","points":"50 points"},{"description":"2nd closest value","points":"30 points"},{"description":"3rd closest value","points":"10 points"}]}
        //    //result={"h2h_ticket":[{"event_order":"1","event_name":"CARD","correct":"Both","h2h_image_id":"25","h2h_answer":"Y","h2h_star":"N"},{"event_order":"2","event_name":"CARD","correct":"6","h2h_image_id":"25","h2h_answer":"8","h2h_star":"N"},{"event_order":"3","event_name":"FOUL","correct":"7","h2h_image_id":"25","h2h_answer":"4","h2h_star":"N"},{"event_order":"4","event_name":"GOAL","correct":"1","h2h_image_id":"25","h2h_answer":"No goals","h2h_star":"Y"},{"event_order":"5","event_name":"SAVE","correct":"7","h2h_image_id":"25","h2h_answer":"No Saves","h2h_star":"N"},{"event_order":"6","event_name":"SHOTON","correct":"9","h2h_image_id":"25","h2h_answer":"6","h2h_star":"N"}],"user_ticket":[{"event_order":"1","event_name":"CARD","correct":"Both","usr_image_id":"24","usr_answer":"Y","usr_star":"N"},{"event_order":"2","event_name":"CARD","correct":"6","usr_image_id":"24","usr_answer":"8","usr_star":"N"},{"event_order":"3","event_name":"FOUL","correct":"7","usr_image_id":"24","usr_answer":"4","usr_star":"N"},{"event_order":"4","event_name":"GOAL","correct":"1","usr_image_id":"24","usr_answer":"No goals","usr_star":"N"},{"event_order":"5","event_name":"SAVE","correct":"7","usr_image_id":"24","usr_answer":"No Saves","usr_star":"N"},{"event_order":"6","event_name":"SHOTON","correct":"9","usr_image_id":"24","usr_answer":"6","usr_star":"Y"}]}
        //    //var itemPerpage = 4;
        //    // var totPages = Math.ceil(result.items.length / itemPerpage);
        //    // var filteredItems = result.items.slice(0, itemPerpage);
        //    //console.log(filteredTrans)
        //    //this.setState({h2h:result.items,totalPages: totPages, itemsPerPage: itemPerpage, activePage: 1, filteredItems: filteredItems })
            this.setState({mainData:result.items[0],bp:result.items})
       //this.setState({bp:breakPoints})
       }.bind(this));
       
    },
    componentDidMount:function(){
        $(ReactDOM.findDOMNode(this)).modal('show');
        $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideBP);
    },
    render: function () {
        return (
            <div className="modal fade animated fadeIn" id="BreakdownPointModal" tabIndex="-3" role="dialog" aria-labelledby="myModalLabel" data-keyboard="true">
              <div className="modal-dialog " role="document">
                <div className="modal-content BuyTicketModal">
                  <div className="modal-header">
                         <img src="/images/close-icon.svg" data-dismiss="modal" className="pointer-hand pull-right" width="25" /><br />
                	     
                  </div>
                  <div className="modal-body no-padding">
                        <div className="bg-blue row no-margin">
                            <h3 className="">Point Breakdown</h3>
                        </div>
                        <div className="space-5"></div>
                        <div className="row no-margin">
                            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-2 text-center">
                                <span className="number"> {this.state.mainData.event_order} </span>
                            </div>
                            <div className="col-lg-7 col-md-7 col-sm-7 col-xs-10">
                                <span className="game-question">{this.state.mainData.event}</span>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-center margin-top-5">
                                {this.state.mainData.result!="NA"?<div className="bg-dark-blue answer">{this.state.mainData.result}</div>:''}
                            </div>
                        </div>
                        <div className="space-5"></div>
                        <div>
                            {
                                this.state.bp.map(function (item, index) {
                                    if(index>0){
                                        if(index%2==1)
                                        {
                                            return  <div className="row no-margin" key={index}>
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-dark-blue padding-20">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                <p className="no-margin">{item.description}</p>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                <div className="tit-txt"><strong>{item.points}</strong></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                        }
                                        else{
                                            return <div className="row no-margin" key={index}>
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-light-blue padding-20">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                <p className="no-margin">{item.description}</p>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                <div className="tit-txt"><strong>{item.points}</strong></div>
                                                            </div>
                                                        </div>
                                                   </div>
                                        }

                                    }

                                })
                            }
                        </div>
                        <div className="modal-footer">
                            {/*<h2 className="text-center">*ON THE MINUTE BONUS*: <span className="d-block-m"> +100 points</span></h2>*/}
                        </div>
                  </div>

                </div>
              </div>
            </div>
        )
    }
});







//**********---- Component for attack OPTA popup ----**********
var OptaPopupAttack = React.createClass({
    getInitialState: function () {
        return {
            team_stat:[],
            Alast_3_games:[],
            Hlast_3_games:[],
            previous_meetings:[],
            Atop_scorers:[],
            Htop_scorers:[]
        };
    },
    componentWillMount: function () {
        var eid = this.props.eid
        this.serverRequest = $.get(baseurl+"opta/attack/"+eid, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            last_away=[];
            last_home=[];
            for(i=0;i<result.last_3_games.length;i++)
            {
                var k = Object.keys(result.last_3_games[i]);
                var isA = k[0].startsWith('a');
                var isH = k[0].startsWith('h');
                if(isA)
                {
                    last_away.push(result.last_3_games[i])
                }
                else{
                    last_home.push(result.last_3_games[i])
                }
            }
            var scores_away=[];
            var scores_home=[];
            for(i=0;i<result.top_scorers.length;i++)
            {
                var k = Object.keys(result.top_scorers[i]);
                var isA = k[0].startsWith('a');
                var isH = k[0].startsWith('h');
                if(isA)
                {
                    scores_away.push(result.top_scorers[i])
                }
                else{
                    scores_home.push(result.top_scorers[i])
                }
            }
            //console.log(Object.keys(result.team_stat[0]))
            //console.log(result);
            this.setState({team_stat:result.team_stat,Alast_3_games:last_away,Hlast_3_games:last_home,Atop_scorers:scores_away,Htop_scorers:scores_home,previous_meetings:result.previous_meetings,})
       }.bind(this));  
    },
    componentDidMount:function(){
        $(ReactDOM.findDOMNode(this)).modal('show');
        $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideOpta);
    },
    render: function () {
        var self = this
      return (
            <div className="modal fade animated fadeIn" id="stats-opta"  tabIndex="-3" role="dialog" aria-labelledby="myModalLabel" data-keyboard="true">
              <div className="modal-dialog " role="document">
                <div className="modal-content BuyTicketModal">
                  <div className="modal-header opta-header">
                      
                      {this.state.team_stat.length>0? <div className="row text-center">
                            
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                <img src="/images/close-icon.svg" data-dismiss="modal" className="pointer-hand pull-right" width="25" />
                                <span className="stats margin-right-10">STATS</span><span className="powered-by padding-right-5">powered by </span><img src="/images/opta-bg.png" alt="" width="85" className="" />
                                
                            </div>
                            
                	     </div>:''}
                  </div>
                  <div className="modal-body no-padding">
                        <div className="bg-blue row no-margin">
                            <h3 className="">ATTACK</h3>
                        </div>
                        <div className="space-10"></div>
                        {this.state.team_stat.length>0?<div className="">
                            <div className="row">
            	                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center">
                	                <div className="leaderboard-team lb-home-team">
                                        <img src={this.state.team_stat[1]['h_team_uid'] ? this.state.team_stat[1]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + this.state.team_stat[1]['h_team_uid'] + ".svg" : this.state.team_stat[1]['comp_uid'] == 10 ? "/images/jerseys/EC/" + this.state.team_stat[1]['h_team_uid'] + ".svg" : "/images/football-shirts/numbers/" + this.state.team_stat[1]['h_team_uid'] + ".svg" : "/images/qn-icon-empty.svg"}/>
                                        <span className="lb-team-name mon-txt">{findShortName(this.state.team_stat[1]['h_team_name'])}</span>
                                        <div className="sm-txt text-center games-played"><div className="d-block-m">(home)</div><div className="">{this.state.team_stat[1]['h_game_count']} games played</div></div>
                	                </div>
                                    
            	                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center hidden-xs">
                                   <div>
                            	    <div className="comparison bg-light-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/goals.svg" className="left-img" alt="" width="35" />
                                            <span>{this.state.team_stat[3]['h_goal_count']}</span>
                                	    </div>
                                        <div className="comp-heading"> Goals scored</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[3]['a_goal_count']}</span>
                                            <img src="/images/opta-icons/goals.svg" className="right-img" alt="" width="35" />
                                        </div>
                            	    </div>
                                    <div className="comparison bg-dark-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/target.svg" className="left-img" alt="" width="35" />
                                            <span>{this.state.team_stat[4]['h_on_trgt_cnt']}</span>
                                	    </div>
                                        <div className="comp-heading"> On target</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[4]['a_on_trgt_cnt']}</span>
                                            <img src="/images/opta-icons/target.svg" className="right-img" alt="" width="35" />
                                        </div>
                                    </div>
                                    <div className="comparison bg-light-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/offtarget.svg" className="left-img" alt="" width="35" />
                                            <span>{this.state.team_stat[5]['h_off_trgt_cnt']}</span>
                                	    </div>
                                        <div className="comp-heading">Off target</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[5]['a_off_trgt_cnt']}</span>
                                            <img src="/images/opta-icons/offtarget.svg" className="right-img" alt="" width="35" />
                                        </div>
                                    </div>
                                    <div className="comparison bg-dark-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/shot-ac.svg" className="left-img" alt="" width="35" />
                                            <span>{this.state.team_stat[6]['h_srt_accuracy_per']}</span>
                                	    </div>
                                        <div className="comp-heading"> Shot accuracy (%)</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[6]['a_srt_accuracy_per']}</span>
                                            <img src="/images/opta-icons/shot-ac.svg" className="right-img" alt="" width="35" />
                                        </div>
                                    </div>
                                    <div className="comparison bg-light-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/conv-rate.svg" className="left-img" alt="" width="35" />
                                            <span>{this.state.team_stat[7]['h_con_rate_per']}</span>
                                	    </div>
                                        <div className="comp-heading"> Conversion rate (%)</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[7]['a_con_rate_per']}</span>
                                            <img src="/images/opta-icons/conv-rate.svg" className="right-img" alt="" width="35" />
                                        </div>
                                    </div>
                                    <div className="comparison bg-dark-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/assists.svg" className="left-img" alt="" width="35" />
                                            <span>{this.state.team_stat[8]['h_assist_cnt']}</span>
                                	    </div>
                                        <div className="comp-heading">Assists</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[8]['a_assist_cnt']}</span>
                                            <img src="/images/opta-icons/assists.svg" className="right-img" alt="" width="35" />
                                        </div>
                                    </div>
                                   </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center">
                	                <div className="leaderboard-team lb-away-team">
                                        <img src={this.state.team_stat[2]['a_team_uid'] ? this.state.team_stat[2]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + this.state.team_stat[2]['a_team_uid'] + ".svg" : this.state.team_stat[2]['comp_uid'] == 10 ? "/images/jerseys/EC/" + this.state.team_stat[2]['a_team_uid'] + ".svg" : "/images/football-shirts/numbers/" + this.state.team_stat[2]['a_team_uid'] + ".svg" : "/images/qn-icon-empty.svg"}/>
                    	                
                                        <span className="lb-team-name mon-txt">{findShortName(this.state.team_stat[2]['a_team_name'])}</span>
                	                    <div className="sm-txt text-center games-played"><div className="d-block-m">(away)</div><div className="">{this.state.team_stat[2]['a_game_count']} games played</div></div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="space-5"></div>
                            <div className="row no-margin visible-xs">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center col-centered">
                                   <div>
                            	    <div className="comparison bg-light-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/goals.svg" className="left-img" alt="" width="35"/>
                                            <span>{this.state.team_stat[3]['h_goal_count']}</span>
                                	    </div>
                                        <div className="comp-heading"> Goals scored</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[3]['a_goal_count']}</span>
                                            <img src="/images/opta-icons/goals.svg" className="right-img" alt="" width="35"/>
                                        </div>
                            	    </div>
                                    <div className="comparison bg-dark-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/target.svg" className="left-img" alt="" width="35"/>
                                            <span>{this.state.team_stat[4]['h_on_trgt_cnt']}</span>
                                	    </div>
                                        <div className="comp-heading"> On target</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[4]['a_on_trgt_cnt']}</span>
                                            <img src="/images/opta-icons/target.svg" className="right-img" alt="" width="35"/>
                                        </div>
                                    </div>
                                    <div className="comparison bg-light-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/offtarget.svg" className="left-img" alt="" width="35"/>
                                            <span>{this.state.team_stat[5]['h_off_trgt_cnt']}</span>
                                	    </div>
                                        <div className="comp-heading">Off target</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[5]['a_off_trgt_cnt']}</span>
                                            <img src="/images/opta-icons/offtarget.svg" className="right-img" alt="" width="35"/>
                                        </div>
                                    </div>
                                    <div className="comparison bg-dark-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/shot-ac.svg" className="left-img" alt="" width="35"/>
                                            <span>{this.state.team_stat[6]['h_srt_accuracy_per']}</span>
                                	    </div>
                                        <div className="comp-heading"> Shot accuracy (%)</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[6]['a_srt_accuracy_per']}</span>
                                            <img src="/images/opta-icons/shot-ac.svg" className="right-img" alt="" width="35"/>
                                        </div>
                                    </div>
                                    <div className="comparison bg-light-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/conv-rate.svg" className="left-img" alt="" width="35"/>
                                            <span>{this.state.team_stat[7]['h_con_rate_per']}</span>
                                	    </div>
                                        <div className="comp-heading"> Conversion rate (%)</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[7]['a_con_rate_per']}</span>
                                            <img src="/images/opta-icons/conv-rate.svg" className="right-img" alt="" width="35"/>
                                        </div>
                                    </div>
                                    <div className="comparison bg-dark-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/assists.svg" className="left-img" alt="" width="35"/>
                                            <span>{this.state.team_stat[8]['h_assist_cnt']}</span>
                                	    </div>
                                        <div className="comp-heading">Assists</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[8]['a_assist_cnt']}</span>
                                            <img src="/images/opta-icons/assists.svg" className="right-img" alt="" width="35"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            </div>
                        </div>:''}
                        <div className="space-5"></div>
                        <div className="bg-blue row no-margin">
                            <h3 className="">LAST 3 GAMES</h3>
                        </div>
                        <div className="space-5"></div>
                        <div className="row no-margin">
                     	    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                                {
                                    this.state.Hlast_3_games.map(function(item,index){
                                        
                                            return  <div className="last-3-game" key={index}>
                            	                        <div className="last-3-game-left bg-light-blue">
                                                            <img className="left-img" alt="" width="35" src={item.h_h_team_uid ? self.state.team_stat[1]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + item.h_h_team_uid + ".svg" : self.state.team_stat[1]['comp_uid'] == 10 ? "/images/jerseys/EC/" + item.h_h_team_uid + ".svg" : "/images/football-shirts/numbers/" + item.h_h_team_uid + ".svg" : "/images/qn-icon-empty.svg"}/>
                                                            <div className="last3game-text">{findShortName(item.h_h_team_name)}</div>
                            	                        </div>
                            	                        <div className="score-box1">{item.h_home_score}-{item.h_h_away_score}</div>
                                                        <div className="last-3-game-right bg-light-blue">
                                                            <img className="left-img" alt="" width="35" src={item.h_a_team_uid ? self.state.team_stat[2]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + item.h_a_team_uid + ".svg" : self.state.team_stat[2]['comp_uid'] == 10 ? "/images/jerseys/EC/" + item.h_a_team_uid + ".svg" : "/images/football-shirts/numbers/" + item.h_a_team_uid + ".svg" : "/images/qn-icon-empty.svg"}/>
                                	                        <div className="last3game-text">{findShortName(item.h_a_team_name)}</div>
                                                        </div>
                                                  </div>
                                   })
                                }
                       	    </div>
                            <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center no-padding-left">
                                <div className="hidden-xs"><div className="opta-vline"></div></div>
                                {       
                                        this.state.Alast_3_games.map(function(item,index){
                                            
                                                return  <div className="last-3-game" key={index}>
                            	                            <div className="last-3-game-left bg-light-blue">
                                                                <img className="left-img" alt="" width="35" src={item.a_h_team_uid ? self.state.team_stat[1]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + item.a_h_team_uid + ".svg" : self.state.team_stat[1]['comp_uid'] == 10 ? "/images/jerseys/EC/" + item.a_h_team_uid + ".svg" : "/images/football-shirts/numbers/" + item.a_h_team_uid + ".svg" : "/images/qn-icon-empty.svg"}/>
                                	                            
                                                                <div className="last3game-text">{findShortName(item.a_h_team_name)}</div>
                            	                            </div>
                            	                            <div className="score-box1">{item.a_a_home_score}-{item.a_a_away_score}</div>
                                                            <div className="last-3-game-right bg-light-blue">
                                                                <img className="left-img" alt="" width="35" src={item.a_a_team_uid ? self.state.team_stat[2]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + item.a_a_team_uid + ".svg" : self.state.team_stat[2]['comp_uid'] == 10 ? "/images/jerseys/EC/" + item.a_a_team_uid + ".svg" : "/images/football-shirts/numbers/" + item.a_a_team_uid + ".svg" : "/images/qn-icon-empty.svg"}/>
                                	                            
                                	                            <div className="last3game-text">{findShortName(item.a_a_team_name)}</div>
                                                            </div>
                                                        </div>
                                    })
                                }

                           </div>
                        </div>
                        <div className="space-5"></div>
                        <div className="bg-blue row no-margin">
                            <h3 className="">TOP SCORERS</h3>
                        </div>
                        <div className="space-5"></div>
                        <div className="row no-margin">
                    	    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                                {
                                    this.state.Htop_scorers.map(function(item,index){
                                    return <div className="last-3-game" key={index}>
                                                <img className="top-score-timg margin-right-10" alt="" width="40" src={self.state.team_stat[1]['h_team_uid'] ? self.state.team_stat[1]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + self.state.team_stat[1]['h_team_uid'] + ".svg" : self.state.team_stat[1]['comp_uid'] == 10 ? "/images/jerseys/EC/" + self.state.team_stat[1]['h_team_uid'] + ".svg" : "/images/football-shirts/numbers/" + self.state.team_stat[1]['h_team_uid'] + ".svg" : "/images/qn-icon-empty.svg"}/>
                                                
                            	                <div className="capsle-top-score"><span>{item.h_goals_scored}</span><img src="/images/profile-4.png" width="40" /></div>
                                                <div className="capsle-top-score-right bg-light-blue">
                                	                <div className="top-score-text">{item.h_player_name}</div>
                                                </div>
                                            </div>

                                    })
                                }
               	           </div>
                           <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>
                           <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center no-padding-left">
                               <div className="hidden-xs"><div className="opta-vline"></div></div>
                               {
                                    this.state.Atop_scorers.map(function(item,index){
                                        return   <div className="last-3-game" key={index}>
                            	                        <div className="capsle-top-score-left bg-light-blue">
                                	                        <div className="top-score-text">{item.a_player_name}</div>
                            	                        </div>
                                                        <div className="capsle-top-score2"><img src="/images/profile-1.png" width="40" /><span>{item.a_goals_scored}</span></div>
                                                        <img className="top-score-timg margin-left-10" alt="" width="40" src={self.state.team_stat[2]['a_team_uid'] ? self.state.team_stat[2]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + self.state.team_stat[2]['a_team_uid'] + ".svg" : self.state.team_stat[2]['comp_uid'] == 10 ? "/images/jerseys/EC/" + self.state.team_stat[2]['a_team_uid'] + ".svg" : "/images/football-shirts/numbers/" + self.state.team_stat[2]['a_team_uid'] + ".svg" : "/images/qn-icon-empty.svg"}/>
                                        </div>
                                    })
                               }
                           </div>

                      </div>
                      <div className="modal-footer">
                            <p className="ntr-txt text-center underline no-margin-bottom" data-dismiss="modal">Close</p>
                      </div>
                  </div>
                </div>
             </div>
            </div>
        )
    }
});

//**********---- Component for discipline OPTA popup ----**********
var OptaPopupDiscipline = React.createClass({
    getInitialState: function () {
        return {
            team_stat:[],
            Alast_3_games:[],
            Hlast_3_games:[],
            previous_meetings:[],
            Atop_card:[],
            Htop_card:[]
        };
    },
    componentWillMount: function () {
        var eid = this.props.eid
        this.serverRequest = $.get(baseurl+"opta/discipline/"+eid, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            last_away=[];
            last_home=[];
            for(i=0;i<result.last_3_games.length;i++)
            {
                var k = Object.keys(result.last_3_games[i]);
                var isA = k[0].startsWith('a');
                var isH = k[0].startsWith('h');
                if(isA)
                {
                    last_away.push(result.last_3_games[i])
                }
                else{
                    last_home.push(result.last_3_games[i])
                }
            }
            var cards_away=[];
            var cards_home=[];
            for(i=0;i<result.top_card_holders.length;i++)
            {
                var k = Object.keys(result.top_card_holders[i]);
                var isA = k[0].startsWith('a');
                var isH = k[0].startsWith('h');
                if(isA)
                {
                    cards_away.push(result.top_card_holders[i])
                }
                else{
                    cards_home.push(result.top_card_holders[i])
                }
            }
            this.setState({team_stat:result.team_stat,Alast_3_games:last_away,Hlast_3_games:last_home,Atop_card:cards_away,Htop_card:cards_home})
            }.bind(this)); 
    },
    componentDidMount:function(){
        $(ReactDOM.findDOMNode(this)).modal('show');
        $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideOpta);
    },
    render: function () {
    var self =this;
        return (
                <div className="modal fade animated fadeIn" id="opta-discipline" tabIndex="-3" role="dialog" aria-labelledby="myModalLabel" data-keyboard="true">
                    <div className="modal-dialog " role="document">
                        <div className="modal-content BuyTicketModal">
                            <div className="modal-header opta-header">
                                
                                {this.state.team_stat.length>0?<div className="row text-center">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                    <img src="/images/close-icon.svg" data-dismiss="modal" className="pointer-hand pull-right" width="25" />
                                    <span className="stats margin-right-10">STATS</span><span className="powered-by padding-right-5">powered by </span><img src="/images/opta-bg.png" alt="" width="85" className="" />
                                </div>
                                </div>:''}
                            </div>
                            <div className="modal-body no-padding">

                                <div className="bg-blue row no-margin">
                                    <h3 className="">DISCIPLINE</h3>
                                </div>
                                <div className="space-5"></div>
                                {this.state.team_stat.length>0?<div className="">
                                    
                                    <div className="row">
            	                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center">
                	                        <div className="leaderboard-team lb-home-team">
                    	                        <img src={this.state.team_stat[1]['h_team_uid'] ? this.state.team_stat[1]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + this.state.team_stat[1]['h_team_uid'] + ".svg" : this.state.team_stat[1]['comp_uid'] == 10 ? "/images/jerseys/EC/" + this.state.team_stat[1]['h_team_uid'] + ".svg" : "/images/football-shirts/numbers/" + this.state.team_stat[1]['h_team_uid'] + ".svg" : "/images/qn-icon-empty.svg"}/>
                                                <span className="lb-team-name mon-txt">{findShortName(this.state.team_stat[1]['h_team_name'])}</span>
                                                <div className="sm-txt text-center games-played"><div className="d-block-m">(home)</div><div className="">{this.state.team_stat[1]['h_game_count']} games played</div></div>
                	                        </div>
                                    
            	                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 hidden-xs">
                                            <div>
                                                <div className="comparison bg-light-blue">
                                                    <div className="comp-left">
                                                        <img src="/images/opta-icons/foulW.svg" className="left-img" alt="" width="35" />
                                                        <span>{this.state.team_stat[3]['h_fouls_wn_cnt']}</span>
                                                    </div>
                                                    <div className="comp-heading">Fouls won</div>
                                                    <div className="comp-right">
                                                        <span>{this.state.team_stat[3]['a_fouls_wn_cnt']}</span>
                                                        <img src="/images/opta-icons/foulW.svg" className="right-img" alt="" width="35" />
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                                    <div className="comp-left">
                                                        <img src="/images/opta-icons/foulC.svg" className="left-img" alt="" width="35" />
                                                        <span>{this.state.team_stat[4]['h_fouls_conc_cnt']}</span>
                                                    </div>
                                                    <div className="comp-heading">Fouls conceded</div>
                                                    <div className="comp-right">
                                                        <span>{this.state.team_stat[4]['a_fouls_conc_cnt']}</span>
                                                        <img src="/images/opta-icons/foulC.svg" className="right-img" alt="" width="35" />
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                                    <div className="comp-left">
                                                        <img src="/images/opta-icons/card_y.svg" className="left-img" alt="" width="35" />
                                                        <span>{this.state.team_stat[5]['h_yel_crd_cnt']}</span>
                                                    </div>
                                                    <div className="comp-heading">Yellow cards</div>
                                                    <div className="comp-right">
                                                        <span>{this.state.team_stat[5]['a_yel_crd_cnt']}</span>
                                                        <img src="/images/opta-icons/card_y.svg" className="right-img" alt="" width="35" />
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                                    <div className="comp-left">
                                                        <img src="/images/opta-icons/card_r.svg" className="left-img" alt="" width="35" />
                                                        <span>{this.state.team_stat[6]['h_red_crd_cnt']}</span>
                                                    </div>
                                                    <div className="comp-heading">Red cards</div>
                                                    <div className="comp-right">
                                                        <span>{this.state.team_stat[6]['a_red_crd_cnt']}</span>
                                                        <img src="/images/opta-icons/card_r.svg" className="right-img" alt="" width="35" />
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                                    <div className="comp-left">
                                                        <img src="/images/opta-icons/offside.svg" className="left-img" alt="" width="35" />
                                                        <span>{this.state.team_stat[7]['h_offsides_cnt']}</span>
                                                    </div>
                                                    <div className="comp-heading">Offsides</div>
                                                    <div className="comp-right">
                                                        <span>{this.state.team_stat[7]['a_offsides_cnt']}</span>
                                                        <img src="/images/opta-icons/offside.svg" className="right-img" alt="" width="35" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center">
                	                        <div className="leaderboard-team lb-away-team">
                    	                        <img src={this.state.team_stat[2]['a_team_uid'] ? this.state.team_stat[2]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + this.state.team_stat[2]['a_team_uid'] + ".svg" : this.state.team_stat[2]['comp_uid'] == 10 ? "/images/jerseys/EC/" + this.state.team_stat[2]['a_team_uid'] + ".svg" : "/images/football-shirts/numbers/" + this.state.team_stat[2]['a_team_uid'] + ".svg" : "/images/qn-icon-empty.svg"}/>
                                                <span className="lb-team-name mon-txt">{findShortName(this.state.team_stat[2]['a_team_name'])}</span>
                	                            <div className="sm-txt text-center games-played"><div className="d-block-m">(away)</div><div className="">{this.state.team_stat[2]['a_game_count']} games played</div></div>
                                            </div>
                                    
                                        </div>
                                    </div>
                                    <div className="space-5"></div>
                                    <div className="row no-margin visible-xs">
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-centered text-center">
                                            <div>
                                                <div className="comparison bg-light-blue">
                                                    <div className="comp-left">
                                                        <img src="/images/opta-icons/foulW.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[3]['h_fouls_wn_cnt']}</span>
                                                    </div>
                                                    <div className="comp-heading">Fouls won</div>
                                                    <div className="comp-right">
                                                        <span>{this.state.team_stat[3]['a_fouls_wn_cnt']}</span>
                                                        <img src="/images/opta-icons/foulW.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                                    <div className="comp-left">
                                                        <img src="/images/opta-icons/foulC.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[4]['h_fouls_conc_cnt']}</span>
                                                    </div>
                                                    <div className="comp-heading">Fouls conceded</div>
                                                    <div className="comp-right">
                                                        <span>{this.state.team_stat[4]['a_fouls_conc_cnt']}</span>
                                                        <img src="/images/opta-icons/foulC.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                                    <div className="comp-left">
                                                        <img src="/images/opta-icons/card_y.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[5]['h_yel_crd_cnt']}</span>
                                                    </div>
                                                    <div className="comp-heading">Yellow cards</div>
                                                    <div className="comp-right">
                                                        <span>{this.state.team_stat[5]['a_yel_crd_cnt']}</span>
                                                        <img src="/images/opta-icons/card_y.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                                    <div className="comp-left">
                                                        <img src="/images/opta-icons/card_r.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[6]['h_red_crd_cnt']}</span>
                                                    </div>
                                                    <div className="comp-heading">Red cards</div>
                                                    <div className="comp-right">
                                                        <span>{this.state.team_stat[6]['a_red_crd_cnt']}</span>
                                                        <img src="/images/opta-icons/card_r.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                                    <div className="comp-left">
                                                        <img src="/images/opta-icons/offside.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[7]['h_offsides_cnt']}</span>
                                                    </div>
                                                    <div className="comp-heading">Offsides</div>
                                                    <div className="comp-right">
                                                        <span>{this.state.team_stat[7]['a_offsides_cnt']}</span>
                                                        <img src="/images/opta-icons/offside.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>:''}
                            <div className="space-5"></div>
                            <div className="bg-blue row no-margin">
                                <h3 className="">LAST 3 GAMES</h3>
                            </div>
                            <div className="space-5"></div>
                                <div className="row no-margin">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                                            {
                                                this.state.Hlast_3_games.map(function(item,index){
                                                   
                                                 return  <div className="last-3-game" key={index}>
                            	                            <div className="last-3-game-left-dead-ball bg-light-blue last-3-discipline">
                                                                <img className="dead-ball-img-left" alt="" width="35" src={item.h_h_team_uid ? self.state.team_stat[1]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + item.h_h_team_uid + ".svg" : self.state.team_stat[1]['comp_uid'] == 10 ? "/images/jerseys/EC/" + item.h_h_team_uid + ".svg" : "/images/football-shirts/numbers/" + item.h_h_team_uid + ".svg" : "/images/qn-icon-empty.svg"}/>
                                                                <div className="last3game-left-text discipline-y-card">
                                    	                            <span className="lst3-middle"><img src="/images/opta-icons/card_y.svg" width="25"/>{item.h_h_yel_cnt}</span>
                                                                    <span className="lst3-middle"><img src="/images/opta-icons/card_r.svg" width="25" />{item.h_h_red_cnt}</span>
                                                                </div>
                            	                            </div>
                            	                            <div className="opta-v-divider"></div>
                                                            <div className="last-3-game-right-dead-ball bg-light-blue last-3-discipline">
                                                                <img className="dead-ball-img-right" alt="" width="35" src={item.h_a_team_uid ? self.state.team_stat[2]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + item.h_a_team_uid + ".svg" : self.state.team_stat[2]['comp_uid'] == 10 ? "/images/jerseys/EC/" + item.h_a_team_uid + ".svg" : "/images/football-shirts/numbers/" + item.h_a_team_uid + ".svg" : "/images/qn-icon-empty.svg"}/>
                                	                            <div className="last3game-right-text discipline-y-card">
                                    	                            <span className="lst3-middle">{item.h_a_red_cnt}<img src="/images/opta-icons/card_r.svg" width="25"/></span>
                                                                    <span className="lst3-middle">{item.h_a_yel_cnt}<img src="/images/opta-icons/card_y.svg" width="25"/></span>
                                	                            </div>
                                                            </div>
                        	                            </div>
                                            })
                                        }
                                    </div>
                                    <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center no-padding-left">
                                        <div className="hidden-xs"><div className="opta-vline"></div></div>
                                        {
                                            this.state.Alast_3_games.map(function(item,index){
                                               
                                                    return  <div className="last-3-game" key={index}>
                                                                <div className="last-3-game-left-dead-ball bg-light-blue last-3-discipline">
                                                                    <img className="dead-ball-img-left" alt="" width="35" src={item.a_h_team_uid ? self.state.team_stat[1]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + item.a_h_team_uid + ".svg" : self.state.team_stat[1]['comp_uid'] == 10 ? "/images/jerseys/EC/" + item.a_h_team_uid + ".svg" : "/images/football-shirts/numbers/" + item.a_h_team_uid + ".svg" : "/images/qn-icon-empty.svg"}/>
                                                                    <div className="last3game-left-text discipline-y-card">
                                                                        <span className="lst3-middle"><img src="/images/opta-icons/card_y.svg" width="25"/>{item.a_h_yel_cnt}</span>
                                                                        <span className="lst3-middle"><img src="/images/opta-icons/card_r.svg" width="25"/>{item.a_h_red_cnt}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="opta-v-divider"></div>
                                                                <div className="last-3-game-right-dead-ball bg-light-blue last-3-discipline">
                                                                    <img className="dead-ball-img-right" alt="" width="35" src={item.a_a_team_uid ? self.state.team_stat[2]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + item.a_a_team_uid + ".svg" : self.state.team_stat[2]['comp_uid'] == 10 ? "/images/jerseys/EC/" + item.a_a_team_uid + ".svg" : "/images/football-shirts/numbers/" + item.a_a_team_uid + ".svg" : "/images/qn-icon-empty.svg"}/>
                                                                    <div className="last3game-right-text discipline-y-card">
                                                                        <span className="lst3-middle">{item.a_a_red_cnt}<img src="/images/opta-icons/card_r.svg" width="25" /></span>
                                                                        <span className="lst3-middle">{item.a_a_yel_cnt}<img src="/images/opta-icons/card_y.svg" width="25"/></span>
                                                   
                                                                    </div>
                                                                </div>
                                                            </div>
                                             
                                         })
                                     }
                                </div>
                             </div>
                             <div className="space-5"></div>
                             <div className="bg-blue row no-margin">
                                <h3 className="">TOP CARDED</h3>
                             </div>
                                <div className="space-5"></div>
                                    <div className="row no-margin">
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                                            {
                                                    this.state.Htop_card.map(function(item,index){
                                                        
                                                  return <div className="last-3-game" key={index}>
                                                            <img className="top-score-timg margin-right-10" alt="" width="40" src={self.state.team_stat[1]['h_team_uid'] ? self.state.team_stat[1]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + self.state.team_stat[1]['h_team_uid'] + ".svg" : self.state.team_stat[1]['comp_uid'] == 10 ? "/images/jerseys/EC/" + self.state.team_stat[1]['h_team_uid'] + ".svg" : "/images/football-shirts/numbers/" + self.state.team_stat[1]['h_team_uid'] + ".svg" : "/images/qn-icon-empty.svg"}/>
                            	                            <div className="capsle-top-score"><span>{item.h_cnt_of_crd}</span><img src="/images/profile-1.png" width="40" /></div>
                                                            <div className="capsle-top-score-right bg-light-blue">
                                	                            <div className="top-score-text">{item.h_player_name}</div>
                                                            </div>
                                                         </div>
                                                    
                                                })
                                            }
                                        </div>
                                        <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center no-padding-left">
                                            <div className="hidden-xs"><div className="opta-vline"></div></div>
                                            {
                                                    this.state.Atop_card.map(function(item,index){

                                                     return <div className="last-3-game" key={index}>
                                                                <div className="capsle-top-score-left bg-light-blue">
                                	                                <div className="top-score-text">{item.a_player_name}</div>
                                                                </div>
                                                                <div className="capsle-top-score text-left"><img src="/images/profile-4.png" width="40" /><span>{item.a_cnt_of_crd}</span></div>
                                                                <img className="top-score-timg margin-left-10" alt="" width="40" src={self.state.team_stat[2]['a_team_uid'] ? self.state.team_stat[2]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + self.state.team_stat[2]['a_team_uid'] + ".svg" : self.state.team_stat[2]['comp_uid'] == 10 ? "/images/jerseys/EC/" + self.state.team_stat[2]['a_team_uid'] + ".svg" : "/images/football-shirts/numbers/" + self.state.team_stat[2]['a_team_uid'] + ".svg" : "/images/qn-icon-empty.svg"}/>
                                                            </div>
                                                    

                                                })
                                            }
                            
                                        </div>
                                </div>
                                
                            </div>
                            <div className="modal-footer">
                                <p className="ntr-txt text-center underline no-margin-bottom" data-dismiss="modal">Close</p>
                            </div>
                        </div>
                    </div>
        </div>
     )
   }
});

//**********---- Component for defence OPTA popup ----********** 
var OptaPopupDefence = React.createClass({
    getInitialState: function () {
        return {
            team_stat:[],
            Alast_3_games:[],
            Hlast_3_games:[],
            previous_meetings:[],
            top_defenders:[]
        };
    },
    componentWillMount: function () {
        var eid = this.props.eid
        this.serverRequest = $.get(baseurl+"opta/defence/"+eid, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            last_away=[];
            last_home=[];
            for(i=0;i<result.last_3_games.length;i++)
            {
                var k = Object.keys(result.last_3_games[i]);
                var isA = k[0].startsWith('a');
                var isH = k[0].startsWith('h');
                if(isA)
                {
                    last_away.push(result.last_3_games[i])
                }
                else{
                    last_home.push(result.last_3_games[i])
                }
            }
            this.setState({team_stat:result.team_stat,Alast_3_games:last_away,Hlast_3_games:last_home,previous_meetings:result.previous_meetings,top_defenders:result.top_defenders})
                }.bind(this)); 
        },
    componentDidMount:function(){
        $(ReactDOM.findDOMNode(this)).modal('show');
        $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideOpta);
    },
    render: function () {
          var self =this;
             return (
                    <div className="modal fade animated fadeIn" id="opta-defence" tabIndex="-3" role="dialog" aria-labelledby="myModalLabel" data-keyboard="true">
                      <div className="modal-dialog " role="document">
                        <div className="modal-content BuyTicketModal">
                          <div className="modal-header opta-header">
                                
                	             {this.state.team_stat.length>0?<div className="row text-center">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                        <img src="/images/close-icon.svg" data-dismiss="modal" className="pointer-hand pull-right" width="25" />
                                        <span className="stats margin-right-10">STATS</span><span className="powered-by padding-right-5">powered by </span><img src="/images/opta-bg.png" alt="" width="85" className="" />
                                    </div>

                	             </div>:''}
                          </div>
                          <div className="modal-body no-padding">

                                <div className="bg-blue row no-margin">
                                    <h3 className="">DEFENCE</h3>
                                </div>
                                <div className="space-5"></div>
                                {this.state.team_stat.length>0?<div className="">
                                    <div className="row">
            	                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center">
                	                        <div className="leaderboard-team lb-home-team">
                    	                        <img src={this.state.team_stat[1]['h_team_uid'] ? this.state.team_stat[1]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + this.state.team_stat[1]['h_team_uid'] + ".svg" : this.state.team_stat[1]['comp_uid'] == 10 ? "/images/jerseys/EC/" + this.state.team_stat[1]['h_team_uid'] + ".svg" : "/images/football-shirts/numbers/" + this.state.team_stat[1]['h_team_uid'] + ".svg" : "/images/qn-icon-empty.svg"}/>
                                                <span className="lb-team-name mon-txt">{findShortName(this.state.team_stat[1]['h_team_name'])}</span>
                                                <div className="sm-txt text-center games-played"><div className="d-block-m">(home)</div><div className="">{this.state.team_stat[1]['h_game_count']} games played</div></div>
                	                        </div>

            	                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 hidden-xs">
                                            <div>
                            	                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/goalsC.svg" className="left-img" alt="" width="35" />
                                                        <span>{this.state.team_stat[3]['h_gls_con_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading"> Goals conceded</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[3]['a_gls_con_cnt']}</span>
                                                        <img src="/images/opta-icons/goalsC.svg" className="right-img" alt="" width="35" />
                                                    </div>
                            	                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/clean-sheet.svg" className="left-img" alt="" width="35" />
                                                        <span>{this.state.team_stat[4]['h_cln_sheets_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading">Clean sheets</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[4]['a_cln_sheets_cnt']}</span>
                                                        <img src="/images/opta-icons/clean-sheet.svg" className="right-img" alt="" width="35" />
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/shots-ontarget-faced.svg" className="left-img" alt="" width="35" />
                                                        <span>{this.state.team_stat[5]['h_sht_trg_fac_ct']}</span>
                                	                </div>
                                                    <div className="comp-heading">Shots faced on target</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[5]['a_sht_trg_fac_ct']}</span>
                                                        <img src="/images/opta-icons/shots-ontarget-faced.svg" className="right-img" alt="" width="35" />
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/tackleW.svg" className="left-img" alt="" width="35" />
                                                        <span>{this.state.team_stat[6]['h_tkl_won_per']}</span>
                                	                </div>
                                                    <div className="comp-heading">Tackles won (%)</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[6]['a_tkl_won_per']}</span>
                                                        <img src="/images/opta-icons/tackleW.svg" className="right-img" alt="" width="35" />
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/duel.svg" className="left-img" alt="" width="35" />
                                                        <span>{this.state.team_stat[7]['h_duel_won_per']}</span>
                                	                </div>
                                                    <div className="comp-heading">Duel lost</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[7]['a_duel_won_per']}</span>
                                                        <img src="/images/opta-icons/duel.svg" className="right-img" alt="" width="35" />
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/saves.svg" className="left-img" alt="" width="35" />
                                                        <span>{this.state.team_stat[8]['h_gl_kpr_sav_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading">Goal keeper saves</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[8]['a_gl_kpr_sav_cnt']}</span>
                                                        <img src="/images/opta-icons/saves.svg" className="right-img" alt="" width="35" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center">
                	                        <div className="leaderboard-team lb-away-team">
                    	                        <img src={this.state.team_stat[2]['a_team_uid'] ? this.state.team_stat[2]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + this.state.team_stat[2]['a_team_uid'] + ".svg" : this.state.team_stat[2]['comp_uid'] == 10 ? "/images/jerseys/EC/" + this.state.team_stat[2]['a_team_uid'] + ".svg" : "/images/football-shirts/numbers/" + this.state.team_stat[2]['a_team_uid'] + ".svg" : "/images/qn-icon-empty.svg"}/>
                                                <span className="lb-team-name mon-txt">{findShortName(this.state.team_stat[2]['a_team_name'])}</span>
                	                            <div className="sm-txt text-center games-played"><div className="d-block-m">(away)</div><div className="">{this.state.team_stat[2]['a_game_count']} games played</div></div>
                	                        </div>

                                        </div>
                                    </div>
                                    <div className="space-5"></div>
                                    <div className="row no-margin visible-xs">                                        
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center col-centered">
                                            <div>
                            	                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/goalsC.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[3]['h_gls_con_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading"> Goals conceded</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[3]['a_gls_con_cnt']}</span>
                                                        <img src="/images/opta-icons/goalsC.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                            	                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/clean-sheet.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[4]['h_cln_sheets_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading">Clean sheets</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[4]['a_cln_sheets_cnt']}</span>
                                                        <img src="/images/opta-icons/clean-sheet.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/shots-ontarget-faced.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[5]['h_sht_trg_fac_ct']}</span>
                                	                </div>
                                                    <div className="comp-heading">Shots faced on target</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[5]['a_sht_trg_fac_ct']}</span>
                                                        <img src="/images/opta-icons/shots-ontarget-faced.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/tackleW.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[6]['h_tkl_won_per']}</span>
                                	                </div>
                                                    <div className="comp-heading">Tackles won (%)</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[6]['a_tkl_won_per']}</span>
                                                        <img src="/images/opta-icons/tackleW.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/duel.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[7]['h_duel_won_per']}</span>
                                	                </div>
                                                    <div className="comp-heading">Duel lost</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[7]['a_duel_won_per']}</span>
                                                        <img src="/images/opta-icons/duel.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/saves.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[8]['h_gl_kpr_sav_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading">Goal keeper saves</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[8]['a_gl_kpr_sav_cnt']}</span>
                                                        <img src="/images/opta-icons/saves.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>:''}

                                <div className="space-10"></div>

                                <div className="bg-blue row no-margin">
                                    <h3 className="">LAST 3 GAMES</h3>
                                </div>
                                <div className="space-5"></div>
                                <div className="row no-margin">
                     	            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                                         {
                                             this.state.Hlast_3_games.map(function(item,index){
                                                
                                                     return <div className="last-3-game" key={index}>
                            	                            <div className="last-3-game-left bg-light-blue">
                                                                <img className="left-img" alt="" width="35" src={item.h_h_team_uid ? self.state.team_stat[1]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + item.h_h_team_uid + ".svg" : self.state.team_stat[1]['comp_uid'] == 10 ? "/images/jerseys/EC/" + item.h_h_team_uid + ".svg" : "/images/football-shirts/numbers/" + item.h_h_team_uid + ".svg" : "/images/qn-icon-empty.svg"}/>
                                                                <div className="last3game-text">{findShortName(item.h_h_team_name)}</div>
                            	                            </div>
                            	                            <div className="score-box1">{item.h_home_score}-{item.h_away_score}</div>
                                                            <div className="last-3-game-right bg-light-blue">
                                                                <img className="left-img" alt="" width="35" src={item.h_a_team_uid ? self.state.team_stat[2]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + item.h_a_team_uid + ".svg" : self.state.team_stat[2]['comp_uid'] == 10 ? "/images/jerseys/EC/" + item.h_a_team_uid + ".svg" : "/images/football-shirts/numbers/" + item.h_a_team_uid + ".svg" : "/images/qn-icon-empty.svg"}/>
                                	                            <div className="last3game-text">{findShortName(item.h_a_team_name)}</div>
                                                            </div>
                                                     </div>
                                                 
                                             })
                                         }
                        	
                     	            </div>
                                    <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center no-padding-left">
                                        <div className="hidden-xs"><div className="opta-vline"></div></div>
                                        {
                                            this.state.Alast_3_games.map(function(item,index){
                                                
                                                    return <div className="last-3-game" key={index}>
                            	                                    <div className="last-3-game-left bg-light-blue">
                                                                        <img className="left-img" alt="" width="35" src={item.a_h_team_uid ? self.state.team_stat[1]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + item.a_h_team_uid + ".svg" : self.state.team_stat[1]['comp_uid'] == 10 ? "/images/jerseys/EC/" + item.a_h_team_uid + ".svg" : "/images/football-shirts/numbers/" + item.a_h_team_uid + ".svg" : "/images/qn-icon-empty.svg"}/>
                                                                        <div className="last3game-text">{findShortName(item.a_h_team_name)}</div>
                            	                                    </div>
                            	                                    <div className="score-box1">{item.a_home_score}-{item.a_away_score}</div>
                                                                    <div className="last-3-game-right bg-light-blue">
                                                                        <img className="left-img" alt="" width="35" src={item.a_a_team_uid ? self.state.team_stat[2]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + item.a_a_team_uid + ".svg" : self.state.team_stat[2]['comp_uid'] == 10 ? "/images/jerseys/EC/" + item.a_a_team_uid + ".svg" : "/images/football-shirts/numbers/" + item.a_a_team_uid + ".svg" : "/images/qn-icon-empty.svg"}/>
                                	                                    <div className="last3game-text">{findShortName(item.a_a_team_name)}</div>
                                                                    </div>
                                                             </div>
                                                

                                            })
                                        }
                                    </div>
                                </div>
                                <div className="space-5"></div>
                               
                                <div className="bg-blue row no-margin">
                                    <h3 className="">TOP DEFENDERS</h3>
                                </div>
                                <div className="space-5"></div>
                                {this.state.top_defenders.map(function(item,index){
                                    return <div className="row no-margin" key={index}>
                    	                <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12 text-center no-padding-right">
                                            <div className="last-3-game">
                                                <img className="top-score-timg margin-right-10" alt="" width="40" src={self.state.team_stat[1]['h_team_uid'] ? self.state.team_stat[1]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + self.state.team_stat[1]['h_team_uid'] + ".svg" : self.state.team_stat[1]['comp_uid'] == 10 ? "/images/jerseys/EC/" + self.state.team_stat[1]['h_team_uid'] + ".svg" : "/images/football-shirts/numbers/" + self.state.team_stat[1]['h_team_uid'] + ".svg" : "/images/qn-icon-empty.svg"}/>
                                                
                            	                <div className="capsle-top-score"><span>{item.h_cnt_of_eve}</span><img src="/images/profile-4.png" width="40"/></div>
                                                <div className="capsle-top-score-right bg-light-blue">
                                	                <div className="top-score-text">{item.h_player_name}</div>
                                                </div>
                                            </div>
                    	                </div>
                                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center no-padding">
								                <div className="top-defenders-text"> {item.event_type}</div>
                                        </div>
                                        <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12 text-center no-padding-left">
                                            <div className="last-3-game">
                                                <div className="capsle-top-score-left bg-light-blue">
                                	                <div className="top-score-text">{item.a_player_name}</div>
                                                </div>
                                                <div className="capsle-top-score text-left"><img src="/images/profile-1.png" width="40"/><span>{item.a_cnt_of_eve}</span></div>
                                                <img className="top-score-timg margin-left-10" alt="" width="40" src={self.state.team_stat[2]['a_team_uid'] ? self.state.team_stat[2]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + self.state.team_stat[2]['a_team_uid'] + ".svg" : self.state.team_stat[2]['comp_uid'] == 10 ? "/images/jerseys/EC/" + self.state.team_stat[2]['a_team_uid'] + ".svg" : "/images/football-shirts/numbers/" + self.state.team_stat[2]['a_team_uid'] + ".svg" : "/images/qn-icon-empty.svg"}/>
                                            </div>
                                        </div>
                                        <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>
                                     </div>
                                })}
                                
                                
                          </div>
                          <div className="modal-footer">
                                <p className="ntr-txt text-center underline no-margin-bottom" data-dismiss="modal">Close</p>
                          </div>

                        </div>
                      </div>
                    </div>
            )
        }
});
        
//**********---- Component for deadball OPTA popup ----********** 
var OptaPopupDeadball = React.createClass({
    getInitialState: function () {
        return {
            team_stat:[],
            last_3_games:[],
            Hlast_3_games:[],
            Alast_3_games:[],
            previous_meetings:[],
            top_score:[],
            Atop_score:[],
            Htop_score:[]
        };
    },
    componentWillMount: function () {
        var eid = this.props.eid
        this.serverRequest = $.get(baseurl+"opta/deadball/"+eid, function (items) {
            if (typeof items != 'object') {
                items = JSON.parse(items)
            }
            last_away=[];
            last_home=[];
            for(i=0;i<items.last_3_games.length;i++)
            {
                var k = Object.keys(items.last_3_games[i]);
                var isA = k[0].startsWith('a');
                var isH = k[0].startsWith('h');
                if(isA)
                {
                    last_away.push(items.last_3_games[i])
                }
                else{
                    last_home.push(items.last_3_games[i])
                }
            }
            var scores_away=[];
            var scores_home=[];
            for(i=0;i<items.top_pass_accuracy.length;i++)
            {
                var k = Object.keys(items.top_pass_accuracy[i]);
                var isA = k[0].startsWith('a');
                var isH = k[0].startsWith('h');
                if(isA)
                {
                    scores_away.push(items.top_pass_accuracy[i])
                }
                else{
                    scores_home.push(items.top_pass_accuracy[i])
                }
            }
            this.setState({team_stat:items.team_stat,Alast_3_games:last_away,Hlast_3_games:last_home,Atop_score:scores_away,Htop_score:scores_home})
            }.bind(this)); 
        },
    componentDidMount:function(){
        $(ReactDOM.findDOMNode(this)).modal('show');
        $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideOpta);
    },
    render: function () {
        var self =this;
        return (
                   <div className="modal fade animated fadeIn" id="opta-dead-ball" tabIndex="-3" role="dialog" aria-labelledby="myModalLabel" data-keyboard="true">
                      <div className="modal-dialog " role="document">
                        <div className="modal-content BuyTicketModal">
                          <div className="modal-header opta-header">
                              {this.state.team_stat.length>0? <div className="row text-center">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                        <img src="/images/close-icon.svg" data-dismiss="modal" className="pointer-hand pull-right" width="25" />
                                        <span className="stats margin-right-10">STATS</span><span className="powered-by padding-right-5">powered by </span><img src="/images/opta-bg.png" alt="" width="85" className="" />
                                    </div>

                	             </div>:''}
                          </div>
                          <div className="modal-body no-padding">
                                <div className="bg-blue row no-margin">
                                    <h3 className="">DEAD BALL</h3>
                                </div>
                                <div className="space-5"></div>
                                {this.state.team_stat.length>0?<div className="">
                                    <div className="row">
            	                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center">
                	                        <div className="leaderboard-team lb-home-team">
                    	                        <img src={this.state.team_stat[1]['h_team_uid'] ? this.state.team_stat[1]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + this.state.team_stat[1]['h_team_uid'] + ".svg" : this.state.team_stat[1]['comp_uid'] == 10 ? "/images/jerseys/EC/" + this.state.team_stat[1]['h_team_uid'] + ".svg" : "/images/football-shirts/numbers/" + this.state.team_stat[1]['h_team_uid'] + ".svg" : "/images/qn-icon-empty.svg"}/>
                                                <span className="lb-team-name mon-txt">{findShortName(this.state.team_stat[1]['h_team_name'])}</span>
                                                <div className="sm-txt text-center games-played"><div className="d-block-m">(home)</div><div className="">{this.state.team_stat[1]['h_game_count']} games played</div></div>
                	                        </div>

            	                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center hidden-xs">
                                            <div>
                            	                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/corner.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[3]['h_corner_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading">Corners</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[3]['a_corner_cnt']}</span>
                                                        <img src="/images/opta-icons/corner.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                            	                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/throw-in.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[4]['h_throw_in_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading"> Throw-ins</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[4]['a_throw_in_cnt']}</span>
                                                        <img src="/images/opta-icons/throw-in.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/cornerC.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[5]['h_crnr_conc_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading">Corners conceded</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[5]['a_crnr_conc_cnt']}</span>
                                                        <img src="/images/opta-icons/cornerC.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/throw-inC.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[6]['h_throwin_conc_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading"> Throw-ins conceded</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[6]['a_throwin_conc_cnt']}</span>
                                                        <img src="/images/opta-icons/throw-inC.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/crossac.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[7]['h_crs_acc_per']}</span>
                                	                </div>
                                                    <div className="comp-heading"> Cross accuracy (%)</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[7]['a_crs_acc_per']}</span>
                                                        <img src="/images/opta-icons/crossac.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/pass.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[8]['h_pass_acc_per']}</span>
                                	                </div>
                                                    <div className="comp-heading">Pass accuracy (%)</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[8]['a_pass_acc_per']}</span>
                                                        <img src="/images/opta-icons/pass.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center">
                	                        <div className="leaderboard-team lb-away-team">
                    	                        <img src={this.state.team_stat[2]['a_team_uid'] ? this.state.team_stat[2]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + this.state.team_stat[2]['a_team_uid'] + ".svg" : this.state.team_stat[2]['comp_uid'] == 10 ? "/images/jerseys/EC/" + this.state.team_stat[2]['a_team_uid'] + ".svg" : "/images/football-shirts/numbers/" + this.state.team_stat[2]['a_team_uid'] + ".svg" : "/images/qn-icon-empty.svg"}/>
                                                <span className="lb-team-name mon-txt">{findShortName(this.state.team_stat[2]['a_team_name'])}</span>
                	                            <div className="sm-txt text-center games-played"><div className="d-block-m">(away)</div><div className="">{this.state.team_stat[2]['a_game_count']} games played</div></div>
                	                        </div>

                                        </div>
                                    </div>
                                    <div className="space-5"></div>
                                    
                                    <div className="row no-margin visible-xs">
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center col-centered">
                                            <div>
                            	                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/corner.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[3]['h_corner_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading">Corners</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[3]['a_corner_cnt']}</span>
                                                        <img src="/images/opta-icons/corner.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                            	                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/throw-in.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[4]['h_throw_in_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading"> Throw-ins</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[4]['a_throw_in_cnt']}</span>
                                                        <img src="/images/opta-icons/throw-in.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/cornerC.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[5]['h_crnr_conc_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading">Corners conceded</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[5]['a_crnr_conc_cnt']}</span>
                                                        <img src="/images/opta-icons/cornerC.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/throw-inC.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[6]['h_throwin_conc_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading"> Throw-ins conceded</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[6]['a_throwin_conc_cnt']}</span>
                                                        <img src="/images/opta-icons/throw-inC.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/crossac.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[7]['h_crs_acc_per']}</span>
                                	                </div>
                                                    <div className="comp-heading"> Cross accuracy (%)</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[7]['a_crs_acc_per']}</span>
                                                        <img src="/images/opta-icons/crossac.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/pass.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[8]['h_pass_acc_per']}</span>
                                	                </div>
                                                    <div className="comp-heading">Pass accuracy (%)</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[8]['a_pass_acc_per']}</span>
                                                        <img src="/images/opta-icons/pass.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>:''}
                                <div className="space-10"></div>
                                <div className="bg-blue row no-margin">
                                    <h3 className="">LAST 3 GAMES</h3>
                                </div>
                                 <div className="space-5"></div>
                                <div className="row no-margin">
                     	            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                                         {
                                             this.state.Hlast_3_games.map(function(item,index){
                                                     return <div className="last-3-game" key={index}>
                            	                                <div className="last-3-game-left-dead-ball bg-light-blue">
                                                                    <img className="dead-ball-img-left" alt="" width="35" src={item.h_h_team_uid ? self.state.team_stat[1]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + item.h_h_team_uid + ".svg" : self.state.team_stat[1]['comp_uid'] == 10 ? "/images/jerseys/EC/" + item.h_h_team_uid + ".svg" : "/images/football-shirts/numbers/" + item.h_h_team_uid + ".svg" : "/images/qn-icon-empty.svg"}/>
                                                                    <div className="last3game-left-text">
                                    	                                <span className="lst3-middle"><img src="/images/opta-icons/throw-in.svg" width="25" />{item.h_h_cor_cnt}</span>
                                                                        <span className="lst3-middle"><img src="/images/opta-icons/corner.svg" width="25" />{item.h_h_tr_in_cnt}</span>
                                                                    </div>
                            	                                </div>
                            	                                <div className="opta-v-divider"></div>
                                                                <div className="last-3-game-right-dead-ball bg-light-blue">
                                                                    <img className="dead-ball-img-left" alt="" width="35" src={item.h_a_team_uid ? self.state.team_stat[2]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + item.h_a_team_uid + ".svg" : self.state.team_stat[2]['comp_uid'] == 10 ? "/images/jerseys/EC/" + item.h_a_team_uid + ".svg" : "/images/football-shirts/numbers/" + item.h_a_team_uid + ".svg" : "/images/qn-icon-empty.svg"}/>
                                	                                <div className="last3game-right-text">
                                    	                                <span className="lst3-middle">{item.h_a_cor_cnt}<img src="/images/opta-icons/throw-in.svg" width="25" /></span>
                                                                        <span className="lst3-middle">{item.h_a_tr_in_cnt}<img src="/images/opta-icons/corner.svg" width="25" /></span>
                                	                                </div>
                                                                </div>
                                                             </div>
                                                 

                                             })
                                         }

                     	            </div>
                                    <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center no-padding-left">
                                        <div className="hidden-xs"><div className="opta-vline"></div></div>
                                        {
                                            this.state.Alast_3_games.map(function(item,index){
                                                
                                                    return <div className="last-3-game" key={index}>
                            	                                <div className="last-3-game-left-dead-ball bg-light-blue">
                                                                    <img className="dead-ball-img-left" alt="" width="35" src={item.a_h_team_uid ? self.state.team_stat[1]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + item.a_h_team_uid + ".svg" : self.state.team_stat[1]['comp_uid'] == 10 ? "/images/jerseys/EC/" + item.a_h_team_uid + ".svg" : "/images/football-shirts/numbers/" + item.a_h_team_uid + ".svg" : "/images/qn-icon-empty.svg"}/>
                                                                    <div className="last3game-left-text">
                                    	                                <span className="lst3-middle"><img src="/images/opta-icons/throw-in.svg" width="25" />{item.a_h_cor_cnt}</span>
                                                                        <span className="lst3-middle"><img src="/images/opta-icons/corner.svg" width="25" />{item.a_h_tr_in_cnt}</span>
                                                                    </div>
                            	                                </div>
                            	                                <div className="opta-v-divider"></div>
                                                                <div className="last-3-game-right-dead-ball bg-light-blue">
                                                                    <img className="dead-ball-img-right" alt="" width="35" src={item.a_a_team_uid ? self.state.team_stat[2]['comp_uid'] == 8 ? "/images/jerseys/EPL/" + item.a_a_team_uid + ".svg" : self.state.team_stat[2]['comp_uid'] == 10 ? "/images/jerseys/EC/" + item.a_a_team_uid + ".svg" : "/images/football-shirts/numbers/" + item.a_a_team_uid + ".svg" : "/images/qn-icon-empty.svg"}/>
                                	                                <div className="last3game-right-text">
                                    	                                <span className="lst3-middle">{item.a_a_cor_cnt}<img src="/images/opta-icons/throw-in.svg" width="25" /></span>
                                                                        <span className="lst3-middle">{item.a_a_tr_in_cnt}<img src="/images/opta-icons/corner.svg" width="25" /></span>
                                	                                </div>
                                                                </div>
                                                    </div>
                                                

                                            })
                                        }

                                    </div>
                                </div>
                                 
                                {/*<div className="bg-blue row no-margin">
                                    <h3 className="">TOP CROSSING ACCURACY</h3>
                                </div>
                                <div className="space-5"></div>
                                <div className="row no-margin">
                    	            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                                        {
                                            this.state.Htop_score.map(function(item,index){
                                                        return <div className="last-3-game" key={index}>
                            	                                    <img src="/images/football-shirts/numbers/114.svg" alt="" className="top-score-timg margin-right-10" width="40" />
                                                                    <div className="capsle-top-score"><span>{item.h_acc_ps_per}</span><img src="/images/profile-4.png" width="40" /></div>
                                                                    <div className="capsle-top-score-right bg-light-blue">
                                	                                    <div className="top-score-text">{item.h_player_name}</div>
                                                                    </div>
                                                                </div>
                                            })
                                        }
                    	            </div>
                                    <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                                        {
                                             this.state.Atop_score.map(function(item,index){

                                             return <div className="last-3-game"  key={index}>
                                                        <div className="capsle-top-score-left bg-light-blue">
                                	                        <div className="top-score-text">{item.a_player_name}</div>
                                                        </div>
                                                        <div className="capsle-top-score"><img src="/images/profile-1.png" width="40" />{item.a_acc_ps_per}</div>
                                                        <img src="/images/football-shirts/numbers/114.svg" alt="" className="top-score-timg margin-left-10" width="40" />
                                                    </div>
                                                

                                            })
                                        }
                            
                                    </div>
                                </div>*/}
                                
                          </div>
                          <div className="modal-footer">
                                <p className="ntr-txt text-center underline no-margin-bottom" data-dismiss="modal">Close</p>
                          </div>
                        </div>
                      </div>
                    </div>
            )
        }
});

// function to set slider value when number on scale is clicked
$(document).on('click','.scale ins',function(event){ // Function to make labels in (slider with labels) clickable 
    var val =$(event.target).html();
    var id = $(this).closest('.slider-container').siblings('.single-slider').attr('id');
    //console.log($(this).closest('.slider-container').siblings('.single-slider').attr('id'))
    //console.log(isNaN(val))
    if(isNaN(val))
    {
        var v = val.split('+');
        val=v[0];
    }
    $('#'+id).jRange('setValue', val);
});
// function to set slider value when plus is clicked
$(document).on('click','.icon-plus',function(event){
    
    var id = $(this).closest('.slider-container').siblings('.single-slider2').attr('id');
    var val = (parseInt($('#'+id).jRange('getValue')) +1)
    $('#'+id).jRange('setValue', ""+val);
});

// function to set slider value when minus is clicked
$(document).on('click','.icon-minus',function(event){
    
    var id = $(this).closest('.slider-container').siblings('.single-slider2').attr('id');
    var val = parseInt($('#'+id).jRange('getValue')) -1
    $('#'+id).jRange('setValue', ""+val);
});

function findShortName(lname){ //Function to convert long team names to short names
    var teamNames = [
        {
            lname:"AFC Bournemouth",
            sname:"B'mouth"
        },
        {
            lname:"Arsenal",
            sname:"Arsenal"
        },
        {
            lname:"Aston Villa",
            sname:"A Villa"
        },
        {
            lname:"Chelsea",
            sname:"Chelsea"
        },{
            lname:"Crystal Palace",
            sname:"C Palace"
        },
        {
            lname:"Everton ",
            sname:"Everton"
        },
        {
            lname:"Leicester City",
            sname:"Leicester"
        },{
            lname:"Liverpool",
            sname:"Liverpool"
        },
        {
            lname:"Manchester City",
            sname:"Man City"
        },
        {
            lname:"Manchester United",
            sname:"Man Utd"
        },
        {
            lname:"Newcastle United",
            sname:"Newcastle"
        },
        {
            lname:"Norwich City",
            sname:"Norwich"
        },
        {
            lname:"Southampton",
            sname:"So'ton"
        },{
            lname:"Stoke City",
            sname:"Stoke"
        },
        {
            lname:"Sunderland",
            sname:"S'Land"
        },
        {
            lname:"Swansea City",
            sname:"Swansea"
        },
        {
            lname:"Tottenham Hotspur",
            sname:"Tottenham"
        },
        {
            lname:"Watford",
            sname:"Watford"
        },
        {
            lname:"West Bromwich Albion",
            sname:"W Brom"
        },
        {
            lname:"West Ham United",
            sname:"West Ham"
        }
	
    ];
    var filterdata = teamNames.filter(function (d) {
        return d.lname == lname;
    });

    if(filterdata.length>0)
    {
        return filterdata[0]['sname'];
    }
    else{
        return lname;
    }
}
     
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

//**********---component invite friends---**********
var Invitemates = React.createClass({
    gotoInvitemates: function () {
        window.location = "/paymentaccepted/?islog="+is_loggedIn+"&plsid="+plsid
    }, 
    render: function () {
        return (
 <div>
     { getCookie1('PZdata').length <= 0?'':  <div className="container-fluid subheader">
                <div className="container">
                        <div className="row">
                             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                                  <div className="space-10"></div>
                                  <div className="col-lg-4 col-md-4 col-sm-5 col-xs-10 col-centered"> 
            	                        <button type="submit" className="btn zoola-btn bg-white" onClick={this. gotoInvitemates}><h5 className="">Invite friends</h5></button>
                                  </div>
                                  <div className="space-10"></div>
                            </div> 
                        </div>
                </div>
          </div>}
        </div>

            
   
       
               
        )
       }

     });




