var React = require('react');
var Header = require('./Header.js');
var Betpro = require('./BetPro.js');
var $ = require("jquery");

module.exports = React.createClass({
    getInitialState: function () {
        return {
            activeInd: 0,
            hideArrows:true,
            hideWidget:true,
            data: [],
            trebledata:[],
            treble3bets: [],
            treble3betsid: [],
            tipped3bets: [],
            tipped3betsid: [],
            activeInd: 0,
            addtobet: true,
            titledisp:false,
            
        };
    },

    componentWillMount: function () {
        var self = this;
        $.ajax({
            type: "GET",
            url: "https://widgets.bettorlogic.com/BetwayHorseRaceService/BetwayHorseracingsvc.svc/GetHorseracingbets",
            async: false,
            success: function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }               
                if (result.Horseracingbets.length < 2 && result.Treblebets.length < 2) {
                    self.setState({ hideWidget: false })
                }
                else {
                    if (result.Horseracingbets.length<=2) {
             
                        self.setState({ titledisp: true })
                    }
                    else if(result.Horseracingbets.length >= 2&& result.Treblebets.length >= 2) {
                        self.setState({ titledisp: false })
                    }
                    if (result.Horseracingbets.length < 2 || result.Treblebets.length < 2) {
                        self.setState({ hideArrows: false })
                    }
                    for (var i = 0; i < result.Horseracingbets.length; i++) {
                        result.Horseracingbets[i]['isaddedbet'] = false;
                        result.Horseracingbets[i]['isremoved'] = false;
                        result.Horseracingbets[i]['isnextbet'] = false;
                    }
                    for (var i = 0; i < result.Treblebets.length; i++) {
                        result.Treblebets[i]['isaddedbet'] = false;
                        result.Treblebets[i]['isremoved'] = false;
                        result.Treblebets[i]['isnextbet'] = false;
                    }
                    var totalHorseracingbets = result.Horseracingbets;
                    var totalTreblebets = result.Treblebets;
                    var treble3bets = [];
                    var treble3betsid = [];
                    var tipped3bets = [];
                    var tipped3betsid = [];
                    for (var i = 0; i < totalTreblebets.length; i++) {
                        if (totalTreblebets[i] && treble3bets.length<3) {
                            treble3bets[i] = totalTreblebets[i];
                            treble3betsid[i] = totalTreblebets[i]["SelectionId"]
                        }
                    }
                    for (var i = 0; i < totalHorseracingbets.length ; i++) {
                        if (totalHorseracingbets[i] && tipped3bets.length<3) {
                            tipped3bets[i] = totalHorseracingbets[i];
                            tipped3betsid[i] = totalHorseracingbets[i]["SelectionId"]
                        }
                    }
                       
                    self.setState({ data: result.Horseracingbets, trebledata: result.Treblebets, treble3bets: treble3bets, treble3betsid: treble3betsid, tipped3bets: tipped3bets, tipped3betsid: tipped3betsid})                   
                }
            },
        });       
    },
    componentDidMount: function () {                  
        // code to refresh the service for every 5
        this.timer = setInterval(this.updateState, 300000);                                      
    },
    updateState: function () {           
        this.componentWillMount();
    },
    clickArrow: function (direction) {
        //ga('send','event','HR blog Corousel ','HR Carousel Clicks'); 
        //ga('BL.send','event','HR blog Corousel ','HR Carousel Clicks')
        if (direction == 'next') {
            if (this.state.activeInd == 0) {
                this.setState({ activeInd: 1 })
            }

        }
        if (direction == 'prev') {
            if (this.state.activeInd == 1) {
                this.setState({ activeInd: 0 })
            }

        }        
    },
    render: function () {
        return (
        <div>
                <div className="bw-widget">
    {this.state.hideWidget? <div className="blbw-box">
        <div id="header">
            <Header parentThis={this}/>
        </div>
            <div id="Betpro">
            <Betpro parentThis={this}/>
            </div>
            </div>:''}
    </div>

                
</div>
    )
    }
});