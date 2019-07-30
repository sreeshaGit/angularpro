var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var $ = require("jquery");
//var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
//var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var ProgressBar = require('react-bootstrap/lib/ProgressBar');
module.exports =  React.createClass({
    getInitialState: function () {
        return {
            Gamestatdata:[], 
            Possession:[],           
            hidegamestat:false,
            hidestrip:false,
        };
    },
    componentWillMount: function () {  
       
        var self = this;
        // console.log("lang",self.props.langauageparam)
        this.serverRequest = $.get("https://widgets.bettorlogic.com/BetwayEventViewService/Stats24MatchBetdata.svc/GetStat24GamestatsByMatchID?"+"matchID="+self.props.eventcode+"&"+"ln="+self.props.langauageparam, function (result) {
            //this.serverRequest = $.get("http://sportsit.bettorlogic.com/BetwayWidgetUATService/Stats24MatchBetdata.svc/GetStat24GamestatsByMatchID?matchID=1039179", function (result) {          
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            if(result.GameStats.length!=0){
                self.setState({Gamestatdata:result.GameStats,Possession:result.Possession})
                if(result.Possession.Awaypoints==0&&result.Possession.Homepoints==0){
                    self.setState({hidestrip:true})
                }
                else{
                    self.setState({Possession:result.Possession})
                }
        
            }
            else{
                self.setState({hidegamestat:true})
            }
       
        }.bind(this));
       
    },
    componentDidMount: function () {       
        // code to refresh the service for every one minute
        this.timer = setInterval(this.updateState, 60000);              
    },
    updateState: function () {
        this.componentWillMount();
    },
    render: function () {         
        return (
           <div>
               <div className="space-5"></div>
        {!this.state.hidegamestat?<div className="row">
                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-centered">
                    {!this.state.hidestrip?    <div className="blbw-stats-progressbar">
                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-right">
                            {/*<img src="images/home-team.png" className="home-img" />*/}
                        </div>
                   <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                            <ProgressBar>
                                <ProgressBar bsStyle="success" now={this.state.Possession.Homepoints} key={1} label={this.state.Possession.Homepoints+"%"} />
                                <ProgressBar bsStyle="warning" now={this.state.Possession.Awaypoints} key={3} label={this.state.Possession.Awaypoints+"%"} />
                            </ProgressBar>
                        </div>
                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                            {/*<img src="images/away-team.png" className="away-img" />*/}
                        </div>
                    </div>:''}
                </div>
            </div>:''}
            <div className="space-5"></div>
        {!this.state.hidegamestat?<div className="row">
                              <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-centered">
                                  <table className="stats-table">
                                      {this.state.Gamestatdata.map(function (item,index) {
                                                   
                                          return   <tr>
                                                     {item.Homepoints==0?'': <td width="15%">{item.Homepoints}</td>}
                                                      <td width="70%">{item.Stattype}</td>
                                                      {item.Awaypoints==0?'':<td width="15%">{item.Awaypoints}</td>}
                                               </tr>
                                      })}
                                                 
                                                  
                                  </table>
                              </div>
                          </div>:''}
                          <div className="row"><div className="space-5"></div></div>      
</div>
)
}
});