var React = require('react');
var Header = require('./Header.js');
var Pregame= require('./Pregame.js');
var $ = require("jquery");
//var eventId =1119100
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
module.exports = React.createClass({
    getInitialState: function () {
        return {
            urlparamEC: '',          
            showdata:true,            
            leaguename:'',
            languageparam:'',
            staticdata:[],
            showlastdata:false,
            Away:[],
            Home:[],
            homeOdds:'-',
            awayOdds:'-',
            HomeTeamName:'',
            AwayTeamname:'',
            MatchInfo:[],
            isLive:'',
            speechbubbledata:[],
            showspeechBubble:false,           
            showFlash:true,
            showbubble:false,
            minute:'',
            type:'',
            comment:'',
            isloaded:false,
            oddslink:'',
            isgetOdssStarted:false
        };
    },
    componentWillMount: function () {
        
        var final = "";  
        var masterjson ={
            "Away":[
            {
                "AwayBookMakerMarketid":null,
                "AwayBookMakerSelectionid":null,
                "AwayFractionalOdds":null,
                "AwayMarketName":null,
                "AwayOdds":null,
                "AwayOutcomeName":null,
                "AwayTeam":null,
                "AwayTeamId":null,
                "AwayText":null,
                "AwaysubMarketName":null
            }],
            "Home":[
            {
                "HomeBookMakerMarketid":null,
                "HomeBookMakerSelectionid":null,
                "HomeFractionalOdds":null,
                "HomeMarketName":null,
                "HomeOdds":null,
                "HomeOutcomeName":null,
                "HomeSubmarektName":null,
                "HomeTeam":null,
                "HomeTeamId":null,
                "HomeText":null}
            ],
            "MatchInfo":[
            {"AwayTeamImage":null,
                "Eventcode":null,
                "HomeTeamImage":null,
                "MatchDate":null,
                "MatchMinute":null,
                "MatchStatus":null,
                "MatchTime":null,
                "Score":null,
                "Title":null,
                "isLive":null}]}
        this.setState({ languageparam:'en'})           
        var finalurl = eventId;           
            this.setState({ urlparamEC: finalurl})
            var self = this;
        //url: "https://widgets.bettorlogic.com/BetwayEventViewService/BetwayService.svc/GetEventRTBInplayV2?"+ "eventcode=" +finalurl+"&"+"ln="+final,
            $.ajax({
                type: "GET",
                url: "https://widgets.bettorlogic.com/BetwayEventViewService/BetwayService.svc/GetEventinfo?"+ "eventcode=" +finalurl+"&"+"ln=en",
                
                success: function (result) {
                    if (typeof result != 'object' ) {
                        if(result.length>0){
                            result = JSON.parse(result)    
                        }   
                        else{
                            if(EventId!=null && EventId!="" && presentWidget!='League' && presentWidget!='FBSite'){
                                leagueName = SubCategoryKey+","+GroupKey
                                load_widget('League')
                                isloaded = true;
                            }
                            return
                        }
                    }
                    
                   
                    if(result.Away==null&&result.Home==null&&result.MatchInfo==null){
                        self.setState({showdata:false,Home:{},Away:{}})
                        if(EventId!=null && EventId!="" && presentWidget!='League' && presentWidget!='FBSite'){
                            leagueName = SubCategoryKey+","+GroupKey
                            load_widget('League')
                            isloaded = true;
                        }
                    }
                    else if(result.MatchInfo[0].isLive===null){                       
                        self.setState({showdata:false})   
                        self.setState({showbubble:false}) 
                        if(EventId!=null && EventId!=""  && presentWidget!='League' && presentWidget!='FBSite'){
                            leagueName = SubCategoryKey+","+GroupKey
                            load_widget('League')
                            isloaded = true;
                        }
                    } 
                    
                    else{
                        self.setState({showdata:true}) 
                        //console.log("step1")
                        if(result.MatchInfo.length>0){
                            // console.log("step2==========")
                            if(result.MatchInfo[0].isLive==0){
                                //result.Home[0].HomeFractionalOdds=0;
                                //result.Away[0].AwayFractionalOdds =0;
                                if( result.Home && result.Home.length>0 && result.Home[0].HomeFractionalOdds!=null&&result.Home[0].HomeFractionalOdds!=0){
                                    self.setState({Home: result.Home[0]})                            
                                }
                                if(result.Away && result.Away.length>0 && result.Away[0].AwayFractionalOdds!=null&&result.Away[0].AwayFractionalOdds!=0){   
                                    //console.log("away Okay...........")
                                    self.setState({Away:result.Away[0]}) 
                                }                                              
                                self.setState({MatchInfo:result.MatchInfo[0],HomeTeamName:result.MatchInfo[0].HomeTeam,AwayTeamname:result.MatchInfo[0].AwayTeam,})     
                            }
                            else if(result.MatchInfo[0].isLive==1){
                                if(result.Home && result.Home.length>0 && result.Home[0].HomeFractionalOdds!=null&&result.Home[0].HomeFractionalOdds!=0 || result.MatchInfo[0].MatchMinute>5){
                                    if(result.Home && result.Home.length>0 && result.Home[0].HomeFractionalOdds!=null&&result.Home[0].HomeFractionalOdds!=0){
                                        self.setState({Home: result.Home[0]})
                                    }else{
                                        self.setState({Home: masterjson.Home[0]})
                                    }
                                                               
                                }
                                if(result.Away && result.Away.length>0 && result.Away[0].AwayFractionalOdds!=null&&result.Away[0].AwayFractionalOdds!=0 || result.MatchInfo[0].MatchMinute>5){   
                                    //console.log("live away Okay....",result.Away.length)
                                    if(result.Away.length>0 &&result.Away[0].AwayFractionalOdds!=null&&result.Away[0].AwayFractionalOdds!=0){
                                        self.setState({Away:result.Away[0]}) 
                                    }
                                    else{
                                        self.setState({Away:masterjson.Away[0]}) 
                                    }
                                   
                                }                                              
                                self.setState({MatchInfo:result.MatchInfo[0],HomeTeamName:result.MatchInfo[0].HomeTeam,AwayTeamname:result.MatchInfo[0].AwayTeam})  
                               
                            }
                            if(result.Home.length>0 && result.Away.length>0)
                                self.setState({  minute: result.MatchInfo[0].MatchMinute,oddslink:result.MatchInfo[0].OddsLink}) 
                            
                        }
                        else{
                            self.setState({showdata:false}) 
                            if(EventId!=null && EventId!=""  && presentWidget!='League' && presentWidget!='FBSite'){
                                leagueName =SubCategoryKey+","+GroupKey
                                load_widget('League')
                                isloaded = true;
                            }
                            
                        }
                                                                                  
                    }
                    
                    if(result.MatchInfo!=null && result.MatchInfo[0].isLive===1){                          
                        setTimeout(function(){
                            self.loadspeech(finalurl)
                        },1000)
                        
                        
                    }
                    setTimeout(function(){
                        self.setState({isloaded:true})
                    },100)
                    if(result.MatchInfo[0].OddsLink.length>0){
                        self.getOddsFromLink(result.MatchInfo[0].OddsLink)
                    }
                    
                },
            });
            this.serverRequest = $.get("https://widgets.bettorlogic.com/BetwayEventViewService/BetwayService.svc/GetStaticDataByLanguage?"+"ln="+final, function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                self.setState({ staticdata:result})
            }.bind(this));

                       
    },
    componentDidMount: function () {       
        // code to refresh the service for every one minute
        
        this.timer = setInterval(this.updateState, 2000);  
        widgetStatus = 'completed'
    },
    
    getOddsFromLink:function(link){
        console.log("getOddsFromLink",link)
        var home = this.state.Home;
        var Away = this.state.Away;
        //console.log("home=======",home)
        //console.log("getOddsFromLink")
        //console.log(this.state.oddslink)
        if(this.state.oddslink.length>0){
            this.serverRequest = $.get(link, function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                //console.log("step1======",result.EventList.Event)
                //console.log("is event array========",!(result.EventList.Event instanceof Array))
                if(!(result.EventList.Event instanceof Array))
                {
                    //console.log("Event is not an array.......................")
                    var EventArray = []
                    EventArray.push(result.EventList.Event)
                    result.EventList.Event = EventArray
                }
                //console.log(result.EventList.Event)
                //console.log(result.EventList.Event instanceof Array)
                if(result.EventList.Event instanceof Array)
                {
                    //console.log("event =====",result.EventList.Event)
                    //console.log(result.EventList.Event)
                    for(var i=0; i<result.EventList.Event.length; i++){
                        //console.log("Event for ----",i)
                        if(!(result.EventList.Event[i].Market instanceof Array))
                        {
                            var marketArry = []
                            marketArry.push(result.EventList.Event[i].Market)
                            result.EventList.Event[i].Market = marketArry
                        }
                        for(var j =0; j<result.EventList.Event[i].Market.length; j++){
                            var mid=result.EventList.Event[i].Market[j]['@id']
                            //console.log("Home============ ",result.EventList.Event[i].Market[j]['@id']," == ",home.HomeBookMakerMarketid)
                            //console.log("Away============ ",result.EventList.Event[i].Market[j]['@id']," == ",Away.AwayBookMakerMarketid)

                            if(result.EventList.Event[i].Market[j]['@id'] == home.HomeBookMakerMarketid){
                                if(!result.EventList.Event[i].Market[j]["Outcome"] instanceof Array)
                                {
                                    var outcomeArray = []
                                    outcomeArray.push(result.EventList.Event[i].Market[j]["Outcome"])
                                    result.EventList.Event[i].Market[j]["Outcome"] = outcomeArray
                                }
                                for(var k = 0; k<result.EventList.Event[i].Market[j]["Outcome"].length;k++){
                                    if(result.EventList.Event[i].Market[j]["Outcome"][k]['@id']==home.HomeBookMakerSelectionid){
                                        //console.log("Home===",result.EventList.Event[i].Market[j]["Outcome"][k]['@price_num'],"/",result.EventList.Event[i].Market[j]["Outcome"][k]['@price_den'])
                                        var hodds = result.EventList.Event[i].Market[j]["Outcome"][k]['@price_dec'];//result.EventList.Event[i].Market[j]["Outcome"][k]['@price_num']+"/"+result.EventList.Event[i].Market[j]["Outcome"][k]['@price_den'];
                                        this.setState({"homeOdds":hodds.match(/^-?\d+(?:\.\d{0,2})?/)[0]});
                                    }
                                }
                            }
                            else if(result.EventList.Event[i].Market[j]['@id'] == Away.AwayBookMakerMarketid){
                                //console.log("else if ==", result.EventList.Event[i].Market[j]["Outcome"].length)
                                if(!result.EventList.Event[i].Market[j]["Outcome"] instanceof Array)
                                {
                                    var outcomeArray = []
                                    outcomeArray.push(result.EventList.Event[i].Market[j]["Outcome"])
                                    result.EventList.Event[i].Market[j]["Outcome"] = outcomeArray
                                }
                                for(var k = 0; k<result.EventList.Event[i].Market[j]["Outcome"].length;k++){
                                    //console.log(result.EventList.Event[i].Market[j]["Outcome"][k]['@id']==Away.AwayBookMakerSelectionid)
                                    if(result.EventList.Event[i].Market[j]["Outcome"][k]['@id']==Away.AwayBookMakerSelectionid){
                                        //console.log("Away===",result.EventList.Event[i].Market[j]["Outcome"][k]['@price_num'],"/",result.EventList.Event[i].Market[j]["Outcome"][k]['@price_den'])
                                        var aodds = result.EventList.Event[i].Market[j]["Outcome"][k]['@price_dec'];//result.EventList.Event[i].Market[j]["Outcome"][k]['@price_num']+"/"+result.EventList.Event[i].Market[j]["Outcome"][k]['@price_den'];
                                        //console.log(aodds)
                                        this.setState({"awayOdds":aodds.match(/^-?\d+(?:\.\d{0,2})?/)[0]});
                                    }
                                }
                            }
                        }
                    }
                }
           
               
                //debugger;
                //console.log(result)
            }.bind(this));
        }
        
    },
    loadspeech:function(finalurl){
        var self = this;
        this.serverRequest = $.get("https://widgets.bettorlogic.com/BetwayEventViewService/Stats24MatchBetdata.svc/GetCommentaryforevent?matchID="+finalurl, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }   
            if(result.Commentary.length>0){ 
               
                if(self.state.type==result.Commentary[0].type&&self.state.comment==result.Commentary[0].type){
                    self.setState({ speechbubbledata:result.Commentary[0],minute:result.Commentary[0].minute,type:result.Commentary[0].type,comment:result.Commentary[0].type}) 
                    self.setState({showbubble:true, showspeechBubble:true}) 
                }
                else{
                   
                    self.setState({showbubble:false, showspeechBubble:false}) 
                }
            }          
            setTimeout(function(){
                        
                self.setState({showFlash:false})
                setTimeout(function(){self.setState({showspeechBubble:false})},1000)
            },3000)  
        }.bind(this));
    },
    updateState: function () {     
        //console.log("call component will mount")
        this.componentWillMount();        
    },
    render: function () {  
        if(this.state.isloaded){
            return (
           <div>
       {this.state.showspeechBubble&& this.state.showbubble?<div className={this.state.showFlash?"blbw-speechBubble animated fadeIn":"blbw-speechBubble animated fadeOut"}>
                   <div className="blbw-spBb-txt animated zoomIn">
                       <div className="thMan">
                          {this.state.speechbubbledata.type} 
                       </div>
                       <hr />
                        
                       <div className="topbet">
                           {this.state.speechbubbledata.comment} 
                       </div>
        
                   </div>
               </div>:<div>{this.state.urlparamEC?this.state.showdata?<div className="blbw-box">
               <div id="header">
                   <Header parentThis={this}/>
               </div>
               <div id="Pregame">
                   <Pregame  parentThis={this} Home={this.state.Home} Away={this.state.Away} MatchInfo={this.state.MatchInfo} homeName={this.state.HomeTeamName} awayName={this.state.AwayTeamname}/>
               </div>
           </div>:'':''}
       </div>}
       </div>
        )
        }else{
            return <div></div>
        }
       
}
});