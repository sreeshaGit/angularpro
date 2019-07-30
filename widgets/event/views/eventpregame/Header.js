var React = require('react');
module.exports = React.createClass({
   
    render: function () {
        
        return (
        <div>
              <div className="blbw-fbevent-header">
                        <div className="row">
        	                <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5">
            	                <div className="blbw-header-left">
                	                <img src="https://widgets.bettorlogic.com/sportsWidgets/images/football-white.svg" alt="" />
                                <span className="title">12<sup>th</sup> Man</span> 
                                {/* <span className="title">{this.props.parentThis.state.staticdata.Man_12th}</span>*/}
                                </div>
        	                </div>
                            <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 text-center h-right skew-left-black">
            	                 <div className="blbw-header-right">
                                     <div className="blbw-title">{this.props.parentThis.state.MatchInfo.isLive==0?'':this.props.parentThis.state.staticdata.Live_Now}</div>
                                 </div>   
                            </div>
                        </div>
                 </div>
    </div>
    )
}
});