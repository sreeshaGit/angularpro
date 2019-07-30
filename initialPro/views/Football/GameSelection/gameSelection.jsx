var isglory =false;
//**********--- call getCookie function to read cookie---**********
if(getParameterByName("islog") && getParameterByName("islog") == 'true'){
    is_loggedIn=true;
    getCookie()
}
else{
    is_loggedIn = false;
    getCookieForNonAuth()
}
if(getParameterByName("isglory") && getParameterByName("isglory") == 'true'){
    isglory=true;
}
else{
    isglory = false;
}
//**********--- header component ---**********
var Header = React.createClass({
    render: function () {
        return (
           <h1>GAME SELECTION</h1>
        )
    }
});

var SubGlory = React.createClass({
    render: function () {
        if(isglory)
        {
            return <div className="container-fluid R2G-subheader">
                    <div className="container">
                        <RoadGlory stepno="1" />
                    </div>
                </div>
        }
        else{
            return <div></div>
        }
        
    }
});

//**********--- sub header component ---**********
var subHeaderThis;
var Subheader = React.createClass({
    getInitialState: function () {
        return {
            fixturePremier: [],
            feeItems:[],
            team: "Team",
            fee:"Fee",
            fixtureChamp:[],
            fixturePremierListed:[],
            fixtureChampListed:[],
            fSelectedValue:[],
            fSelectedCompID:[],
            fSelectedID:"",
            eSelectedValue:[],
            eSelectedID:"",
            fixtureAll :[],           
            selectedTab:"",
            TabSelUnsel:"",
            Restrictuser:false

        };
    },
    componentWillMount: function () {
        subHeaderThis =this;
        this.serverRequest = $.get(baseurl+"fixture/data", function (result) {
            if(typeof result != 'object')
            {
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
                var msgDate = new Date(formatedDate);
                var today = new Date();
                var days = diffdates('d', msgDate, today);
                if (days == 0)
                {
                    formatedDate = "Today, " + hours + ":" + min
                }
                else if (days == 1)
                {
                    formatedDate = "Yesterday, " + hours + ":" + min
                }
                else {
                    formatedDate = day + "/" + month + " - " + hours + ":" + min ;
                }
                result.items[i]["format_date"] = formatedDate
            }
            var fixtures = result.items;
            var itemsPerPage = 4;
            if($( window ).width() <= 767){
                 itemsPerPage =2 ;
            }
            var premierFixtures = fixtures.filter(function (d) {
                if (d.comp_id == 8)
                    return true;
            });
            var champFixtures = fixtures.filter(function (d) {
                if (d.comp_id == 10)
                    return true;
            });

            var PtotalItems = premierFixtures.length;
            var CtotalItems = champFixtures.length;
            var AtotalItems = fixtures.length;
            var Ppages = Math.ceil(PtotalItems / itemsPerPage);
            var Cpages = Math.ceil(CtotalItems / itemsPerPage);
            var Apages = Math.ceil(AtotalItems / itemsPerPage);
            var PfixturesList = [];
            var CfixturesList = [];
            var AfixturesList = [];
            for (i = 0; i < Ppages; i++)
            {
                PfixturesList.push(premierFixtures.slice(i * itemsPerPage, (i + 1) * itemsPerPage))
            }

            for (i = 0; i < Cpages; i++) {
                CfixturesList.push(champFixtures.slice(i * itemsPerPage, (i + 1) * itemsPerPage))
            }

            for (i = 0; i < Apages; i++) {
                AfixturesList.push(fixtures.slice(i * itemsPerPage, (i + 1) * itemsPerPage))
            }
            this.setState({ fixturePremier: premierFixtures, fixtureChamp: champFixtures, fixtureAll: AfixturesList, fixturePremierListed: PfixturesList, fixtureChampListed: CfixturesList });
        }.bind(this));
        this.serverRequest = $.get(baseurl+"fixture/ddgame", function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            var uniqueData=[];
            var data=result.items;
            for(i = 0; i< data.length; i++){
                if(uniqueData.indexOf(data[i].entry_) === -1){
                    uniqueData.push(data[i].entry_);
                }
            }
            uniqueData.sort(function(a,b){return a-b});
            this.setState({ feeItems: uniqueData })
        }.bind(this));
    },

    componentDidMount: function () {
        var self = this;
        $(".myCarousel").swiperight(function () {
            $(this).carousel('prev');
        });
        $(".myCarousel").swipeleft(function () {
            $(this).carousel('next');
        });        
    },

    clickDate: function () {

    },

    changefilter: function(id,value,type){
        var fSelectedValue = this.state.fSelectedValue;
        var eSelectedValue = this.state.eSelectedValue;
        if(type=="fee")
        {
            if($("#"+id).hasClass( "selected-fee" ))
            {
                $("#"+id).removeClass("selected-fee");
                eSelectedValue.splice(eSelectedValue.indexOf(Number(value)),1);
            }
            else
            {
                $("#"+id).addClass("selected-fee")
                eSelectedValue.push(Number(value))
            }
            this.setState({eSelectedValue:eSelectedValue})
        }
        else
        {
            var selFixtureId = "";
            if(this.state.selectedTab == 'Premier') selFixtureId = "game-p-league";
            else if(this.state.selectedTab == 'Championship') selFixtureId = "game-championship";
            else selFixtureId = "game-all";
            //if($("#"+id).hasClass( "selected-fixture" ))
            if($("#"+selFixtureId +" #"+id).hasClass( "selected-fixture" ))
            {
                //$("#"+id).removeClass("selected-fixture");
                $("#"+selFixtureId +" #"+id).removeClass("selected-fixture");
                fSelectedValue.splice(fSelectedValue.indexOf(Number(value)),1)
            }
            else
            {
                //$("#" + id).addClass("selected-fixture");
                $("#"+selFixtureId +" #"+id).addClass("selected-fixture");
                fSelectedValue.push(Number(value));
            }
            this.setState({fSelectedValue:fSelectedValue})
        }
        setTimeout(gboxThis.filterGames,100)
    },
    teamSelect: function (teamid) {
        var teamData = $.grep(this.state.teamItems, function (element, index) {
            return element.team_id == teamid;
        });
        this.setState({ team: teamData[0]['team_name'] });
    },
    feeSelect: function (feeid) {
        var feeData = $.grep(this.state.feeItems, function (element, index) {
            return element.fxt_id == feeid;
        });
        this.setState({ fee: feeData[0]['entry_'] });
    },
    resetFilter: function () {

        $("#fee").val('');
        $("#fix").val('');
        gboxThis.resetFilter();
        this.setState({ team: "Team", filter_date: "Date",fee:"Fee" })
    },
    filterGames1 : function(val)
    {
        var selUnselTab = "";
        if(val == "Premier" && this.state.TabSelUnsel == "Premier"){
            selUnselTab = "";
            val ="";
            $("#game-all").addClass("active");
            $("#game-p-league").removeClass("active");
            $("#game-championship").removeClass("active");
        }else if(val == "Premier" && this.state.TabSelUnsel == "Championship"){
            selUnselTab = val;
        }else if(val == "Championship" && this.state.TabSelUnsel == "Premier"){
            selUnselTab = val;
        }else if(val == "Championship" && this.state.TabSelUnsel == "Championship"){
            selUnselTab = "";
            val ="";
            $("#game-all").addClass("active");
            $("#game-p-league").removeClass("active");
            $("#game-championship").removeClass("active");
        }else{
            selUnselTab = val;
        }
        this.setState({ TabSelUnsel : selUnselTab});
        this.setState({ selectedTab: val });
        this.setState({eSelectedValue:[]});
        this.setState({fSelectedValue:[]});
        $(".carousel-inner div").removeClass("selected-fixture");
        $(".entryfee li").removeClass("selected-fee");
        setTimeout(gboxThis.filterGames, 100);
    },    
    render: function () {
        var i = 0;
        var self = this;
        return (<div>
                <div className="container-fluid header">
  <div className="container">
        <div className="row">
            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-12 text-center col-centered no-padding">
                    <div className="tab-content game-tab-content">
						 <div className="tab-pane active" id="game-all">
                            <div id="thumbcarousel1" className="carousel slide game-slider myCarousel" data-interval="false">
                                <div className="carousel-inner">
                                    {
                                        this.state.fixtureAll.map(function (items, index) {
                                            return <div className={index==0?"item active":"item"} key={index}>
                                                                <div className="row text-center no-margin">
                                                                    {
                                                                        items.map(function(item,ind){
                                                                            var id = '';
                                                                            var fol = '';
                                                                            if (item.comp_id == 8) {
                                                                                fol = "EPL/";
                                                                                id = "fix_" + item.fxt_id;
                                                                            } else {
                                                                                fol = "EC/";
                                                                                id = "fixcham_" + item.fxt_id;
                                                                            }
                                                                            return <div data-target="#carousel" className="col-lg-3 col-md-4 col-sm-4 col-xs-6 no-padding" key={ind}>
                                                                                                <div className="carousel-selection-fixture" id={id} onClick={self.changefilter.bind(null, id, item.fxt_id, "fixture")}>
                                                                                                    <div className="premier-team">
                                                                                                        {/*Change Reverted : Pahse2-23 : BL - Championship jersys in carosel not showing up + shorter names of championship teams required for caroseul */}
                                                                                                        {/*<img width="50" alt="" src={item.home_team_id?"/images/jerseys/"+fol+item.home_team_id+".svg":"/images/qn-icon-empty.svg"} /><span className="team-name smt-txt">{findShortName(item.home_team)}</span>*/}
                                                                                                        <img width="50" alt="" src={item.home_team_id?"/images/jerseys/"+fol+item.home_team_id+".svg":"/images/qn-icon-empty.svg"} /><span className="team-name smt-txt">{item.home_team}</span>
                                                                                                    </div>
                                                                                                    <div className="premier-team">
                                                                                                        {/*Change Reverted : Pahse2-23 : BL - Championship jersys in carosel not showing up + shorter names of championship teams required for caroseul */}
                                                                                                        {/*<img width="50" alt="" src={item.away_team_id?"/images/jerseys/"+fol+item.away_team_id+".svg":"/images/qn-icon-empty.svg"} /><span className="team-name smt-txt">{findShortName(item.away_team)}</span>*/}
                                                                                                        <img width="50" alt="" src={item.away_team_id?"/images/jerseys/"+fol+item.away_team_id+".svg":"/images/qn-icon-empty.svg"} /><span className="team-name smt-txt">{item.away_team}</span>
                                                                                                    </div>
                                                                                                    <div className="clear"></div>{/*<div className="fxt-time smt-txt">{item.format_date}</div>*/}
                                                                                                <div className="fxt-time smt-txt">{item.start_time}</div>
                                                                                            </div>
                                                                        </div>
                                                                    })
                                        }
                                                            </div>

                                        </div>
                                        
                                        })
    }
                                </div>
                                <a className="left carousel-control hidden-xs" href="#thumbcarousel1" role="button" data-slide="prev">
                                    <span className="fa fa-angle-left font-40 white"></span>
                                </a>
                                <a className="right carousel-control hidden-xs" href="#thumbcarousel1" role="button" data-slide="next">
                                    <span className="fa fa-angle-right font-40 white"></span>
                                </a>
                            </div>
						 </div>

                        <div className="tab-pane" id="game-p-league">
                            <div id="thumbcarousel" className="carousel slide game-slider myCarousel" data-interval="false">
                                <div className="carousel-inner">
                                    {
                                        this.state.fixturePremierListed.map(function(items,index){
                                            return <div className={index==0?"item active":"item"} key={index}>
                                                                <div className="row text-center no-margin">
                                                                    {
                                                                        items.map(function(item,ind){
                                                                            var id = "fix_"+item.fxt_id;
                                                                            return <div data-target="#carousel" className="col-lg-3 col-md-3 col-sm-3 col-xs-6 no-padding" key={ind}>
                                                                                                <div className="carousel-selection-fixture" id={id} onClick={self.changefilter.bind(null,id,item.fxt_id,"fixture")}>
                                                                                                    <div className="premier-team">
                                                                                                        {/*Change Reverted : Pahse2-23 : BL - Championship jersys in carosel not showing up + shorter names of championship teams required for caroseul */}
                                                                                                        {/*<img alt="" src={item.home_team_id?"/images/jerseys/EPL/"+item.home_team_id+".svg":"/images/qn-icon-empty.svg"} /><span className="team-name smt-txt">{findShortName(item.home_team)}</span>*/}
                                                                                                        <img alt="" src={item.home_team_id?"/images/jerseys/EPL/"+item.home_team_id+".svg":"/images/qn-icon-empty.svg"} /><span className="team-name smt-txt">{item.home_team}</span>
                                                                                                    </div>
                                                                                                    <div className="premier-team">
                                                                                                        {/*Change Reverted : Pahse2-23 : BL - Championship jersys in carosel not showing up + shorter names of championship teams required for caroseul */}
                                                                                                        {/*<img alt="" src={item.away_team_id?"/images/jerseys/EPL/"+item.away_team_id+".svg":"/images/qn-icon-empty.svg"} /><span className="team-name smt-txt">{findShortName(item.away_team)}</span>*/}
                                                                                                        <img alt="" src={item.away_team_id?"/images/jerseys/EPL/"+item.away_team_id+".svg":"/images/qn-icon-empty.svg"} /><span className="team-name smt-txt">{item.away_team}</span>
                                                                                                    </div>
                                                                                                    <div className="clear"></div>{/*<div className="fxt-time smt-txt">{item.format_date}</div>*/}
                                                                                                <div className="fxt-time smt-txt">{item.start_time}</div>
                                                                                            </div>
                                                                                </div>
                                                                    })
                                        }
                                                            </div>

                                                </div>
                                        })
}
                                </div>
<a className="left carousel-control hidden-xs" href="#thumbcarousel" role="button" data-slide="prev">
    <span className="fa fa-angle-left font-40 white"></span>
</a>
<a className="right carousel-control hidden-xs" href="#thumbcarousel" role="button" data-slide="next">
    <span className="fa fa-angle-right font-40 white"></span>
</a>
</div>

</div>
<div className="tab-pane" id="game-championship">
    <div id="thumbcarousel2" className="carousel slide game-slider myCarousel" data-interval="false">
        <div className="carousel-inner">
            {
                this.state.fixtureChampListed.map(function(items,index){
                    return <div className={index==0?"item active":"item"} key={index}>
                                        <div className="row text-center no-margin">
                                            {
                                                items.map(function(item,ind){
                                                    var id = "fixcham_"+item.fxt_id;
                                                    return <div data-target="#carousel" className="col-lg-3 col-md-3 col-sm-3 col-xs-6 no-padding" key={ind}>
                                                                        <div className="carousel-selection-fixture" id={id} onClick={self.changefilter.bind(null,id,item.fxt_id,"fixture")}>
                                                                            <div className="premier-team">
                                                                                {/*Change Reverted : Pahse2-23 : BL - Championship jersys in carosel not showing up + shorter names of championship teams required for caroseul */}
                                                                                {/*<img width="50" alt="" src={item.home_team_id?"/images/jerseys/EC/"+item.home_team_id+".svg":"/images/qn-icon-empty.svg"} /><span className="team-name smt-txt">{findShortName(item.home_team)}</span>*/}
                                                                                <img width="50" alt="" src={item.home_team_id?"/images/jerseys/EC/"+item.home_team_id+".svg":"/images/qn-icon-empty.svg"} /><span className="team-name smt-txt">{item.home_team}</span>
                                                                            </div>
                                                                            <div className="premier-team">
                                                                                {/*Change Reverted : Pahse2-23 : BL - Championship jersys in carosel not showing up + shorter names of championship teams required for caroseul */}
                                                                                {/*<img width="50" alt="" src={item.away_team_id?"/images/jerseys/EC/"+item.away_team_id+".svg":"/images/qn-icon-empty.svg"} /><span className="team-name smt-txt">{findShortName(item.away_team)}</span>*/}
                                                                                <img width="50" alt="" src={item.away_team_id?"/images/jerseys/EC/"+item.away_team_id+".svg":"/images/qn-icon-empty.svg"} /><span className="team-name smt-txt">{item.away_team}</span>
                                                                            </div>
                                                                            <div className="clear"></div>{/*<div className="fxt-time smt-txt">{item.format_date}</div>*/}
                                                                        <div className="fxt-time smt-txt">{item.start_time}</div>
                                                                    </div>
                                                        </div>
                                            })
                }
                                    </div>

                        </div>
                })
}
                                </div>
<a className="left carousel-control hidden-xs" href="#thumbcarousel2" role="button" data-slide="prev">
    <span className="fa fa-angle-left font-40 white"></span>
</a>
<a className="right carousel-control hidden-xs" href="#thumbcarousel2" role="button" data-slide="next">
    <span className="fa fa-angle-right font-40 white"></span>
</a>
</div>
</div>
</div>

</div>
</div>
</div>
              </div>
<div className="container-fluid subheader">
      <div className="container no-padding">
       		<div className="row">
                   <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 no-padding-right">
                       <ul className="nav nav-tabs game-tabs" id="myTab">
                          {this.state.TabSelUnsel == "Premier" ? <li id="premierTab" className="active"><a data-target="#game-p-league" data-toggle="tab" onClick={this.filterGames1.bind(null,'Premier')}>PREMIER LEAGUE</a></li>:<li id="premierTab"><a data-target="#game-p-league" data-toggle="tab" onClick={this.filterGames1.bind(null,'Premier')}>PREMIER LEAGUE</a></li>}
                          {this.state.TabSelUnsel == "Championship" ? <li id="championTab" className="active"><a data-target="#game-championship" data-toggle="tab" onClick={this.filterGames1.bind(null,'Championship')}>CHAMPIONSHIP</a></li> : <li id="championTab"><a data-target="#game-championship" data-toggle="tab" onClick={this.filterGames1.bind(null,'Championship')}>CHAMPIONSHIP</a></li>}

                       </ul>
                   </div>

                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 text-center game-selection no-padding-left">
                	<ul className="entryfee">
                	
                    <div className="mon-txt e-fee text-center">FILTER BY ENTRY FEE:</div>
{

    this.state.feeItems.map(function(item,index){
        var id = "fee_"+index;
        return <li className="ticket mon-txt" key={index} id={id} onClick={self.changefilter.bind(null,id,item,"fee")}>&pound;{item}</li>
    })
}
</ul>
</div>


</div>         
</div>
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
            gboxThis.setState({ countdown: "Game live" });
        } else {
            time = new Date(msLeft);
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            if (hours != 0 && hours>0)
            {
                countDownValue = ("kickoff: in " + hours + " hour(s)");
                gboxThis.setState({ countdown: countDownValue })
            }
            else if (mins != 0 && mins>0) {
                countDownValue = ("kickoff: in " + this.twoDigits(mins) + " minutes");
                gboxThis.setState({ countdown: countDownValue })
            }
            else {
                countDownValue = ("kickoff: in " + this.twoDigits(time.getUTCSeconds()) + " seconds");
                gboxThis.setState({ countdown: countDownValue })
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
                    <span> {gboxThis.state.countdown}</span>
        )
    }
});

//**********--- Game box component ---**********
var gboxThis;
var GBoxs = React.createClass({
    getInitialState: function () {
        return { items: [], dataItems: [],filteredGames:[],countdown:"" };
    },
    componentWillMount: function () {
        gboxThis =this;
        this.serverRequest = $.get(baseurl+"fixture/games", function (result) {
            if(typeof result != 'object')
            {
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
                result.items[i]["format_date"] = formatedDate

            }

            var self = this;
            var selectedFee= subHeaderThis.state.eSelectedValue;
            var selectedFix = subHeaderThis.state.fSelectedValue;
            var selectedTab1 = subHeaderThis.state.selectedTab;
            var filtergames = result.items.filter(function(d){
                if(selectedFee.length>0)
                {
                    if(selectedFix.length>0){
                        if((selectedFix.indexOf(Number(d.fxt_id))!=-1) && (selectedFee.indexOf(Number(d.entry_)) !=-1) && selectedTab1 == "Premier" && (Number(d.comp_id)) == "8")
                        {
                                return true
                        }else if((selectedFix.indexOf(Number(d.fxt_id))!=-1) && (selectedFee.indexOf(Number(d.entry_)) !=-1) && selectedTab1 == "Championship" && (Number(d.comp_id)) == "10"){
                                return true
                        }else if((selectedFix.indexOf(Number(d.fxt_id))!=-1) && (selectedFee.indexOf(Number(d.entry_)) !=-1) && selectedTab1 == ""){
                                return true
                        } else if((selectedFix.indexOf(Number(d.fxt_id))==-1) && (selectedFee.indexOf(Number(d.entry_)) !=-1) && selectedTab1 == "Championship" ){
                            selectedFix = [];
                        } else if((selectedFix.indexOf(Number(d.fxt_id))==-1) && (selectedFee.indexOf(Number(d.entry_)) !=-1) && selectedTab1 == "Premier" ){
                            selectedFix = [];
                        }
                    }
                    else{
                    if(selectedFee.indexOf(Number(d.entry_)) !=-1 && selectedTab1 == "Premier" && (Number(d.comp_id)) == "8"){
                        return true
                    }else if(selectedFee.indexOf(Number(d.entry_)) !=-1 && selectedTab1 == "Championship" && (Number(d.comp_id)) == "10"){
                        return true
                    }else if(selectedFee.indexOf(Number(d.entry_)) !=-1 && selectedTab1 == "" ){
                        return true
                    }
                    }
                }
                else if(selectedFix.length>0) {
                    if(selectedFix.indexOf(Number(d.fxt_id))!=-1 && selectedTab1 == "Premier" && (Number(d.comp_id)) == "8"){
                        return true
                    }else  if(selectedFix.indexOf(Number(d.fxt_id))!=-1 && selectedTab1 == "Championship" && (Number(d.comp_id)) == "10"){
                        return true
                    }else{
                        selectedFix = [];
                    }
                }
                else {
                    if(selectedTab1 == "Premier" && (Number(d.comp_id)) == "8"){
                        return true
                    }else if(selectedTab1 == "Championship" && (Number(d.comp_id)) == "10"){
                        return true
                    }else if(selectedTab1 == ""){
                        return true
                    }
                }
            });
            //this.setState({filteredGames:filtergames});

            this.setState({ items: result.items,filteredGames: filtergames})
        }.bind(this));
    },
    updateState: function () {
        this.componentWillMount();
    },
    componentDidMount:function(){
        this.timer = setInterval(this.updateState, 1000*5);
        //setTimeout(this.updateState, 1000);
    },
    resetFilter:function(){
        this.setState({filteredGames: this.state.items})
    },
    filterGames: function(){
        var self = this;
        var selectedFee= subHeaderThis.state.eSelectedValue;
        var selectedFix = subHeaderThis.state.fSelectedValue;
        var selectedTab1 = subHeaderThis.state.selectedTab;
        var filtergames = this.state.items.filter(function(d){
            if(selectedFee.length>0)
            {
                if(selectedFix.length>0){
                    if((selectedFix.indexOf(Number(d.fxt_id))!=-1) && (selectedFee.indexOf(Number(d.entry_)) !=-1) && selectedTab1 == "Premier" && (Number(d.comp_id)) == "8"){
                        return true
                    }else  if((selectedFix.indexOf(Number(d.fxt_id))!=-1) && (selectedFee.indexOf(Number(d.entry_)) !=-1) && selectedTab1 == "Championship" && (Number(d.comp_id)) == "10"){
                        return true
                    }else if(selectedFee.indexOf(Number(d.entry_)) !=-1 && selectedTab1 == "" ){
                        return true
                    }
                }
                else{
                    if(selectedFee.indexOf(Number(d.entry_)) !=-1 && selectedTab1 == "Premier" && (Number(d.comp_id)) == "8"){
                        return true
                    }else if(selectedFee.indexOf(Number(d.entry_)) !=-1 && selectedTab1 == "Championship" && (Number(d.comp_id)) == "10"){
                        return true
                    }else if(selectedFee.indexOf(Number(d.entry_)) !=-1 && selectedTab1 == "" ){
                        return true
                    }
                }
            }
            else if (selectedFix.length > 0) {
                if(selectedFix.indexOf(Number(d.fxt_id))!=-1 && selectedTab1 == "Premier" && (Number(d.comp_id)) == "8"){
                    return true
                }else  if(selectedFix.indexOf(Number(d.fxt_id))!=-1 && selectedTab1 == "Championship" && (Number(d.comp_id)) == "10"){
                    return true
                }else if(selectedFix.indexOf(Number(d.fxt_id))!=-1 && selectedTab1 == ""){
                    return true
                }else{
                    return false
                }
            }
            else{
                if(selectedTab1 == "Premier" && (Number(d.comp_id)) == "8"){
                    return true
                }else if(selectedTab1 == "Championship" && (Number(d.comp_id)) == "10"){
                    return true
                }else if(selectedTab1 == ""){
                    return true
                }
            }
        });
        this.setState({filteredGames:filtergames});
    },
    gotoLeaderboard: function(plsid){       
        //window.location = "/leaderboard/?islog="+is_loggedIn+"&plsid="+plsid+"&isglory=" + isglory;
        window.location = "/build/views/Football/LeaderBoard/leaderBoard.html?islog="+is_loggedIn+"&plsid="+plsid+"&isglory=" + isglory;
    },
    gotoCreateGame: function(){
        if(SupHeaderThis.state.items.status != 'P'){
            $("#alert-modal9").modal('show');
            return false
        }
        else if(SupHeaderThis.state.items.balance < 1){
            $("#alert-modal10").modal('show');
            return false
        }
        //window.location = "/createnewgame/?islog="+is_loggedIn;
        window.location = "/build/views/Football/Createnewgame/createnewgame.html?islog="+is_loggedIn;
    },
    agree9: function () {
        //window.location = "/quicktopup/?islog="+is_loggedIn;
        window.location = "/build/views/Football/QuickTopUp/Quick-Top-Up.html?islog="+is_loggedIn;
    },
   agree10: function () {
       //window.location = "/quicktopup/?islog="+is_loggedIn;
       window.location = "/build/views/Football/QuickTopUp/Quick-Top-Up.html?islog="+is_loggedIn;
   },
    render: function () {
        var self = this;
        return (
           <div>
               {
                   this.state.filteredGames.map(function (item, index) {
                       var timer_id = "timer_" + index;
                       var matchDay = new Date(item.format_date);
                       var today = new Date();
                       var days = diffdates('d', today, matchDay);
                       var hours = '';
                       var min = '';
                       var sec = '';
                       var delta = Math.abs(matchDay - today) / 1000;
                       //console.log(days)
                       if (days == 0) {
                           // calculate (and subtract) whole hours
                           hours = Math.floor(delta / 3600) % 24;
                           delta -= hours * 3600;

                           // calculate (and subtract) whole minutes
                           min = Math.floor(delta / 60) % 60;
                           delta -= min * 60;

                           // what's left is seconds
                           sec = Math.floor(delta % 60);  // in theory the modulus is not required
                       }
                       //console.log("hours==",hours," min==",min," sec==",sec)
                       var usersMessage = item.users.split("/");
                       if (index == 0) {
                           return <div key={index }>
                                 {/*SupHeaderThis.state.items.status == 'P' || SupHeaderThis.state.items.status == 'T' || SupHeaderThis.state.items.status == 'N' || SupHeaderThis.state.items.status == 'L' ? */}
                                 <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 text-center">
                                     {/*SupHeaderThis.state.items.status == 'P' ?<div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 text-center">*/}
                                  <div className="game-box game-box-create-new">
                                        <div className="padding-20 pointer-hand" onClick={self.gotoCreateGame}>
                                            <div className="create-new">
                                                <img src="/images/create-new-blue.svg" alt="" />
                                            </div>
                                            <div className="space-5"></div>
                                            <div className="col-lg-10 col-centered text-center"><button className="btn zoola-btn" onClick={self.gotoCreateGame}><h5>Create game</h5></button></div>
                                        </div>
                                  </div>
                                </div>{/*:''*/}
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 text-center ">
             <div className={item.status=='G'?"game-box selected-featured":"game-box"}>
                 {item.status=='G'?<div className="kickof-time bg-yellow">FEATURED</div>:''}
                   <div className="game-box-top">
                       <br />
                       <div className="game-selection-fixture">
                           <img className="fixture-img-left" src={item.home_team_id ? item.comp_id == 8 ? "/images/jerseys/EPL/" + item.home_team_id + ".svg" : item.comp_id == 10 ? "/images/jerseys/EC/" + item.home_team_id + ".svg" : "/images/football-shirts/numbers/" + item.home_team_id + ".svg" : "/images/qn-icon-empty.svg"} />
                           <span className="tm-txt">{item.home_team} vs {item.away_team}</span>
                           <img className="fixture-img-right" src={item.away_team_id ? item.comp_id == 8 ? "/images/jerseys/EPL/" + item.away_team_id + ".svg" : item.comp_id == 10 ? "/images/jerseys/EC/" + item.away_team_id + ".svg" : "/images/football-shirts/numbers/" + item.away_team_id + ".svg" : "/images/qn-icon-empty.svg"} />
                       </div>
                       <br />
                   </div>
                   <div className="gbx-name bg-blue">
                       <span className="gm-txt">{item.game_name}</span>
                   </div>
                   <div className="gbx-people-pot text-center">
                       <div className="capsle-people bg-white mon-txt"><img src="/images/people-30.svg" /> <span className="people-text" title={"Max "+usersMessage[1]+" people play the game and "+usersMessage[0]+" has joined the game"}>{item.users}</span></div>
                       <div className="capsle-people bg-white mon-txt"><img src="/images/ticket-30.svg" /> <span className="people-text">&pound;{item.entry_}</span></div>
                       <div className={item.status=='G'?"capsle-people bg-white  mon-txt selected-featured":"capsle-people bg-white  mon-txt"}><img src="/images/pot-30.svg" /> <span className="people-text">&pound;{item.total_value}</span></div>

                   </div>
                   <div className="gbx-kickoff-time bg-dark-blue smt-txt">{/*{item.status=='O'?<span id={timer_id }>{ days > 0 ? 'kickoff: in ' + days + ' day(s)' : <span><CountDown ids={timer_id} hours={hours} minutes={min} seconds={sec } /></span> }</span> :item.status=='R'?'Game finished':item.status=='C'?'Game live':''}*/}
                   <span id={timer_id }>{item.start_time}</span>
                   </div>
                  <div className="space-5"></div>
                  <div className="col-lg-10 col-md-9 col-sm-9 col-xs-10 col-centered text-center"><button className={item.status=='R'?"btn zoola-btn btn-closed-game":"btn zoola-btn"} onClick={self.gotoLeaderboard.bind(null,item.pls_id)}><h5>{item.status=='R'?"View closed game":"View game"}</h5></button></div>
                  <div className="space-5"></div>
             </div>
          </div>
          </div>
                   } else {
                   return   <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 text-center " key={index}>
                              <div className={item.status=='G'?"game-box selected-featured":"game-box"}>
                                  {item.status=='G'?<div className="kickof-time bg-yellow">FEATURED</div>:''}
                                    <div className="game-box-top">
                                        <br />
                                        <div className="game-selection-fixture">
                                             <img className="fixture-img-left" src={item.home_team_id ? item.comp_id == 8 ? "/images/jerseys/EPL/" + item.home_team_id + ".svg" : item.comp_id == 10 ? "/images/jerseys/EC/" + item.home_team_id + ".svg" : "/images/football-shirts/numbers/" + item.home_team_id + ".svg" : "/images/qn-icon-empty.svg"} />
                                            <span className="tm-txt">{item.home_team} vs {item.away_team}</span>
                                            <img className="fixture-img-right" src={item.away_team_id ? item.comp_id == 8 ? "/images/jerseys/EPL/" + item.away_team_id + ".svg" : item.comp_id == 10 ? "/images/jerseys/EC/" + item.away_team_id + ".svg" : "/images/football-shirts/numbers/" + item.away_team_id + ".svg" : "/images/qn-icon-empty.svg"} />
                                        </div>
                                        <br />
                                    </div>
                                    <div className="gbx-name bg-blue">
                                        <span className="gm-txt">{item.game_name}</span>
                                    </div>
                                    <div className="gbx-people-pot text-center">
                                        <div className="capsle-people bg-white  mon-txt"><img src="/images/people-30.svg" /> <span className="people-text" title={"Max "+usersMessage[1]+" people play the game and "+usersMessage[0]+" has joined the game"}>{item.users}</span></div>
                                        <div className="capsle-people bg-white  mon-txt"><img src="/images/ticket-30.svg" /> <span className="people-text">&pound;{item.entry_}</span></div>
                                        <div className={item.status=='G'?"capsle-people bg-white  mon-txt selected-featured":"capsle-people bg-white  mon-txt"}><img src="/images/pot-30.svg" /> <span className="people-text">&pound;{item.total_value}</span></div>

                                    </div>
                                    <div className="gbx-kickoff-time bg-dark-blue smt-txt">{/*{item.status=='O'?<span id={timer_id }>{ days > 0 ? 'kickoff: in ' + days + ' day(s)' : <span><CountDown ids={timer_id} hours={hours} minutes={min} seconds={sec } /></span> }</span> :item.status=='R'?'Game finished':item.status=='C'?'Game live':''}*/}
									   <span id={timer_id }>{item.start_time}</span>
                                    </div>
                                  <div className="space-5"></div>
                                   <div className="col-lg-10 col-md-9 col-sm-9 col-xs-10 col-centered text-center"><button className={item.status=='R'?"btn zoola-btn btn-closed-game":"btn zoola-btn"} onClick={self.gotoLeaderboard.bind(null,item.pls_id)}><h5>{item.status=='R'?"View closed game":"View game"}</h5></button></div>
                                  <div className="space-5"></div>
                              </div>
                           </div>
}                     
})                 
}

                <div className="modal fade animated fadeIn" tabIndex="-1" role="dialog" aria-labelledby="Alert-Modal" id="alert-modal9" data-keyboard="true">
                                              <div className="modal-dialog modal-sm ">

                                                  <div className="modal-content zoola-box alet-modal">
                                                      <div className="social-header">
                                                          <img src="/images/close-icon.svg" width="20" className="pull-right pointer-hand" data-dismiss="modal" />
                                                      </div>
                                                      <div className="social-body">
                                                          <div className="space-5"></div>
                                                          <div className="row">
                                                              <div className="col-lg-12">
                                                                  <p>Sorry! To create your own game you need to complete the full sign up and deposit.</p>
                                                              </div>
                                                          </div>
                                                          <div className="space-5"></div>
                                                         <div className="row">
                                                              <div className="col-lg-12 col-sm-12 col-md-12">
                                                                  <button type="submit" className="btn zoola-btn" onClick={this.agree9}><h5 className="">Deposit</h5></button>
                                                              </div>

                                                         </div>
                                                          <div className="space-5"></div>
                                                      </div>
                                                  </div>
                                              </div>
                </div>


                <div className="modal fade animated fadeIn" tabIndex="-1" role="dialog" aria-labelledby="Alert-Modal" id="alert-modal10" data-keyboard="true">
                                              <div className="modal-dialog modal-sm ">

                                                  <div className="modal-content zoola-box alet-modal">
                                                      <div className="social-header">
                                                          <img src="/images/close-icon.svg" width="20" className="pull-right pointer-hand" data-dismiss="modal" />
                                                      </div>
                                                      <div className="social-body">
                                                          <div className="space-5"></div>
                                                          <div className="row">
                                                              <div className="col-lg-12">
                                                                  <p>Insufficient cash balance for the game requested.Please make deposit to create your own game.</p>
                                                              </div>
                                                          </div>
                                                          <div className="space-5"></div>
                                                         <div className="row">
                                                              <div className="col-lg-12 col-sm-12 col-md-12">
                                                                  <button type="submit" className="btn zoola-btn" onClick={this.agree10}><h5 className="">Deposit</h5></button>
                                                              </div>

                                                         </div>
                                                          <div className="space-5"></div>
                                                      </div>
                                                  </div>
                                              </div>
                </div>


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
        },
        {
            lname:"Czech Republic",
            sname:"Czech Rep"
        },
    {
        lname: "Nottingham Forest",
        sname: "Notts Forest"
    },
    {
        lname: "Aston Villa",
        sname: "Aston Villa"
    },
    
    {
        lname: "Barnsley",
        sname: "Barnsley"
    },
    
    {
        lname: "Birmingham City",
        sname: "Birmingham"
    },
    {
        lname:"Blackburn Rovers",
        sname: "Blackburn"
    },

    {
        lname: "Brentford",
        sname:"Brentford"
    },
    {
        lname: "Brighton and Hove Albion",
        sname:"Brighton and Hove"

    },
    {
        lname: "Bristol City",
        sname:"Bristol City"
    },
    {
        lname: "Burton Albion",
        sname:"Burton" 
    },
    {
        lname: "Cardiff City",
        sname:"Cardiff"
    },
    {
        lname: "Derby County",
        sname:"Derby"
    },
    {
        lname: "Fulham",
        sname:"Fulham"
    },
    {
        lname: "Huddersfield Town",
        sname:"Huddersfield"
    },
    {
        lname: "Ipswich Town",
        sname:"Ipswich"
    },
    {
        lname: "Leeds United",
        sname:"Leeds"
    },
    {
        lname: "Newcastle United",
        sname:"Newcastle"
    },
    {
        lname: "Norwich City",
        sname:"Norwich"
    },
    {
        lname: "Preston North End",
        sname:"Preston"
    },
    {
        lname: "Queens Park Rangers",
        sname:"QPR"
    },
    {
        lname: "Reading",
        sname:"Reading"
    },
    {
        lname: "Rotherham United",
        sname:"Rotherham"
    },
    {
        lname: "Sheffield Wednesday",
        sname:"Sheffield Wed"
    },
    {
        lname: "Wigan Athletic",
        sname:"Wigan"
    },
    {
        lname: "Wolverhampton Wanderers",
        sname:"Wolves"
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

