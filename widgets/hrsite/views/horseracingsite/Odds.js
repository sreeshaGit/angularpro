var React = require('react');
var ReactBootstrap = require('react-bootstrap');
//var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
//var ButtonToolbar = require('react-bootstrap').ButtonToolbar;

module.exports =  React.createClass({
    getInitialState: function () {
        return {          
            datacontent: '',
            show: false
        };
    },

    addOrRemoveBet: function () {        
        var self = this;      
        if (!this.props.isaddedbet) {
            self.refs.pop.show()
            setTimeout(function () { self.refs.pop.hide(); }, 2000)
        }
        this.setState({ show: !this.state.show })        
        this.props.addbet(this.props.ind, this.props.SelectionId);   
        if(SpinSport.Host){
            if (!this.props.isaddedbet) {
                SpinSport.Host.Sports.AddOutcomeToBetslip(this.props.SelectionId)
            }
        }
        else{
            var msgdata = {
                'outcomeId': this.props.SelectionId,            
                'isaddedbet': this.props.isaddedbet,
                'ismulti':false
            }
            //console.log(msgdata)
            parent.postMessage(JSON.stringify(msgdata), "*");
        }
    },
     
    render: function () {
        var OverlayTrigger = ReactBootstrap.OverlayTrigger,
        Popover = ReactBootstrap.Popover;
        
        var className = this.props.isaddedbet ? 'col-lg-3 col-md-3 col-sm-3 col-xs-3 blbw-odds blbw-hr-odds added-bslip' : 'col-lg-3 col-md-3 col-sm-3 col-xs-3 blbw-odds blbw-hr-odds';
        return (
            <div>

              
                    <div className={className}>

                        <OverlayTrigger trigger="manual"
                                            placement="top"
                                            ref='pop'
                                            overlay={
                                                        <Popover id="popover-betslip">
                                                            <strong>Added To betslip</strong>

                                                        </Popover>
}
id="mypopover">
    <div className="blbw-value"  ref="myInput" onClick={this.addOrRemoveBet}>{this.props.odds}</div>
</OverlayTrigger>  
             
                         
</div>
</div>
)
}
});