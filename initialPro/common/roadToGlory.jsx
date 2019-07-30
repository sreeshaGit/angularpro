var RoadGlory = React.createClass({
    gotoStep: function(step){
        console.log(step)
        switch(step)
        {
            case 1:
                window.location="/build/views/Football/Glory/thankyou/thankyou.html?islog=true";
                break;
            case 2:
                window.location="/build/views/Football/Glory/joinGame/join-game.html?islog=true";
                break;
            case 3:
                window.location="/build/views/Football/Glory/joinedSetupProfile/joinedSetupProfile.html?islog=true";
                break;
            case 4:
                window.location="/build/views/Football/Glory/topUp/topUp.html?islog=true";
                break;
            case 5:
                window.location="/build/views/Football/Glory/payment-accepted/payment-accepted.html?islog=true";
        }
    },
    render: function () {
        return (
                 <div className="row">
        	        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center pointer-hand hidden-xs">
              	        <i aria-hidden="true" className="fa fa-angle-up font-40 padding-top-10"></i>
        	        </div>  

                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12 text-center no-padding">
            	        <div id="wizard" className="form_wizard wizard_horizontal">
                              <ul className="wizard_steps">
                                <li>
                                  <a className={this.props.stepno>=1?"selected pointer-hand":"disabled pointer-hand"} onClick={this.gotoStep.bind(null,1)}>
                                    <span className="step_no"><img src="/images/check-mark.svg" /></span>

                                  </a>
                                  <span className="step_descr sm-txt">Sign up</span>
                                </li>
                                <li>
                                  <a className={this.props.stepno>=2?"selected pointer-hand":"disabled pointer-hand"} onClick={this.gotoStep.bind(null,2)}>
                                      <span className="step_no">{this.props.stepno>=2?<img src="/images/check-mark.svg" />:<img src="/images/glory-icon-game.svg" />}</span>
                                  </a>
                                  <span className="step_descr sm-txt">Play a game</span>
                                </li>
                                <li>
                                  <a className={this.props.stepno>=3?"selected pointer-hand":"disabled pointer-hand"} onClick={this.gotoStep.bind(null,3)}>
                                    <span className="step_no">{this.props.stepno>=3?<img src="/images/check-mark.svg" />:<img src="/images/glory-icon-profile.svg" />}</span>

                                  </a>
                                  <span className="step_descr sm-txt">Create account</span>
                                </li>
                                <li>
                                  <a className={this.props.stepno>=4?"selected pointer-hand":"disabled pointer-hand"} onClick={this.gotoStep.bind(null,4)}>
                                    <span className="step_no">{this.props.stepno>=4?<img src="/images/check-mark.svg" />:<img src="/images/glory-icon-wallet.svg" />}</span>

                                  </a>
                                  <span className="step_descr sm-txt">Top up</span>
                                </li>
                                <li>
                                  <a className={this.props.stepno>=5?"selected pointer-hand":"disabled pointer-hand"} onClick={this.gotoStep.bind(null,5)}>
                                    <span className="step_no">{this.props.stepno>=5?<img src="/images/check-mark.svg" />:<img src="/images/glory-icon-friends.svg" />}</span>

                                  </a>
                                  <span className="step_descr sm-txt">invite mates</span>
                                </li>
                              </ul>


            	        </div>

                    </div>
                     <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center pointer-hand hidden-xs">
              	        <i aria-hidden="true" className="fa fa-angle-up font-40 padding-top-10"></i>
                     </div>

                  </div>
        )
    }
});