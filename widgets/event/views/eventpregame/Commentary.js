var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var $ = require("jquery");
//var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
//var ButtonToolbar = require('react-bootstrap').ButtonToolbar;

module.exports =  React.createClass({
    getInitialState: function () {
        return {
            Commentary:[],
        };
    },
    componentWillMount: function () {
        var self=this
        if(self.props.isliveparam==1){
            this.serverRequest = $.get("https://widgets.bettorlogic.com/BetwayEventViewService/Stats24MatchBetdata.svc/GetCommentary?"+ "matchID=" + self.props.eventcode, function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                self.setState({Commentary:result.Commentary })
            }.bind(this)); 
       
        }   
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
            <div className="live-commentary">
                    <table>
                        <tbody>
                        {this.state.Commentary.map(function (itm, ind) {   
                            return <tr>
                                <td>{itm.minute+"'"}</td>
                                <td>{itm.comment} </td>
                            </tr>
                        })
                        }    
                        </tbody>
                    </table>
                </div>
         </div>
        )
}
    });