var React = require('react');
module.exports = React.createClass({   
    render: function () {            
        return (
        <div>
              <div className="blbw-HR-header">
        <div className="row">
            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                <div className="blbw-header-left">
                    <img src="https://widgets.bettorlogic.com/sportsWidgets/images/horse-icon-white.svg" alt="" />
                <span className="title">Bet Pro</span>
                </div>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 text-center h-right skew-left-black">
                {this.props.parentThis.state.hideArrows?<div className="blbw-header-right">
                     <a className={this.props.parentThis.state.activeInd==0?'carousel-control left disable':'carousel-control left'} data-slide="prev" onClick={this.props.parentThis.clickArrow.bind(null,'prev')}>
                    	                    <span className="fa fa-angle-left" aria-hidden="true" ></span>
                     </a>
               <div className="blbw-title slider-caption-title">{this.props.parentThis.state.activeInd == 0 ? 'Timeform Treble' : 'Most Tipped Horse'}</div>
                   <a className={this.props.parentThis.state.activeInd==1?'carousel-control right disable':'carousel-control right'} onClick={this.props.parentThis.clickArrow.bind(null,'next')}>
                    	<span className="fa fa-angle-right" aria-hidden="true" ></span>
                   </a>

                </div>: <div className="blbw-header-right"><div className="blbw-title slider-caption-title">{this.props.parentThis.state.titledisp ? 'Timeform Treble' : 'Most Tipped Horse'}</div> </div>}
            </div>
        </div>
            </div>
    </div>
    )
}
});