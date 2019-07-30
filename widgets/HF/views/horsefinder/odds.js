var React = require('react');
var Toggle = require('react-bootstrap-toggle').default;
var InputRange = require('react-input-range');
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
var Popover = require('react-bootstrap/lib/Popover');
var Overlay = require('react-bootstrap/lib/Overlay');


module.exports =React.createClass({
    getInitialState: function () {
        return {
            isSelected: false,
            datacontent:'',
            show:false
        };
    },
    clickOdds:function(){
        var self = this;
        self.refs.popover.show()
        setTimeout(function () { self.refs.popover.hide(); }, 2000)
    },
    render: function () {
        return (
             <div onClick={this.clickOdds}>
                              <OverlayTrigger trigger="manual"
                                placement="top"
                                ref='popover'
                                overlay={
                                    <Popover id="popover-betslip">
                                        <strong>{"Add to betslip"}</strong>
                                    </Popover>
    }
                                        ><div tabIndex="0" role="button" className="pop-odds">{this.props.odds}</div>
                            </OverlayTrigger> 
                                    </div>
        )
}
});
