/** @jsx React.DOM */


//**********--- call getCookie function to read cookie---**********
getCookie()

if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}
//**********--- subheader component ---**********
var Subheader = React.createClass({
    render: function () {
        return (
                  <div className="row">
                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                            <h3>CONFIRM YOUR EMAIL</h3>
                       </div>
                  </div>
        )
    }
});

//**********--- Thankyou component ---**********
var Thankyou = React.createClass({
    getInitialState: function () {
        return {           
            showResentMsg: false,
        };
    },
    gotoJoingame: function () {      //**********--- Function to navigate to joingame page---**********
        window.location = "/build/views/Football/Glory/joinGame/join-game.html?islog=" + is_loggedIn
    },
    resendemail: function () {
        this.serverRequest = $.get(baseurl + "user/resend/" + userId + "," + sessionId, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            this.setState({showResentMsg:true});
        }.bind(this));
        //document.getElementById('resendemailerror').innerHTML = "Email resent successfully"
    },
    hideResentMsg: function () {
        this.setState({ showResentMsg: false})
    },
    render: function () {
        return (<div>
                    {this.state.showResentMsg?<div className="container-fluid bg-success">
                                        <div className="space-5"></div>
                                        <div className="container">
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                                                <img src="/images/success.svg" alt="Success" className="" width="30" />
                                            </div>
                                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 no-padding">

                                               <span className="sm-txt font-18">Email has been resent</span>
                                            </div>
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                                                <img src="/images/close-icon.svg" alt="Success" width="20" className="pointer-hand margin-top-5" onClick={this.hideResentMsg} />
                                            </div>
                                        </div>
                                       <div className="space-5"></div>
                                        </div>:''}
                       <div className="space-10"></div>
                       <div className="row">
                            <div className="col-lg-12">
            	                  <h2 className="text-center">Almost there...</h2>
                                  <div className="space-10"></div>
            	                  <p className="text-center">Please click the link in the email we've sent you to finish creating your account.</p>
                            </div>
                       </div>
                       <div className="space-10"></div>
                       <div className="row">
                            <div className="col-lg-12 text-center " >
                                  <img src="/images/zoola-mail.png" alt=""/>
                            </div>
                       </div>
                       <div className="space-10"></div>
                            <div className="row">
                                          <div className="col-lg-12 text-center ">
                                             <p className="ntr-txt">Please check your spam folder. If you haven't received an email from us, please email <a className="underline" href="mailto:help@playzoola.com">help@playzoola.com</a> and our Customer Service team will be in touch.</p>
                                          </div>
                            </div>                   
                       <div className="row">
                            <div className="col-lg-12 text-center " >
                                  <div className="ntr-txt">Not received email? <span className="underline" onClick={this.resendemail}>Resend email</span></div>
                                <div id="resendemailerror" className="">&nbsp;</div>
                            </div>
                       </div>
                       <div className="space-10"></div>
                       
               </div>
       )
    }
});


var ThankyouHeader = React.createClass({
    getInitialState: function () {
        return {
            showResentMsg: false,
            menuItems:[],
            items:{}
        };
    },
    componentWillMount:function(){
        this.serverRequest = $.get(baseurl+"general/navbar/"+userId+","+sessionId, function (result) {
            // console.log(result)
            if(typeof result != 'object')
            {
                result = JSON.parse(result)
            }
            if (result.header[0]['usr_image'] == "" || result.header[0]['usr_image'] == null)
            {
                result.header[0]['usr_image'] = 24;
            }              
                    
            if(result.header[0].status=='P' || result.header[0].status=='T')
            {
                cookieValue = "PZUFT=false; path=/";
            }
            else{
                cookieValue = "PZUFT=true; path=/";
            }
            document.cookie = cookieValue
            cookieData = getCookie1('PZUFT')
            //console.log("cookieData==", cookieData)
            this.setState({ items: result.header[0] })
        }.bind(this));
    },
    render: function () {
        var self = this;
        return (<div className="row">            
<div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 padding-top-15 padding-bottom-15 no-padding-left no-padding-right">
                    <div className="col-lg-4 col-md-7 col-sm-6 col-xs-12 visible-lg visible-md visible-sm">
                        <img src="/images/playzoola-logo.svg" className="pointer-hand"/>
                    </div>
                    <div className="col-sm-4 col-xs-3 visible-xs no-padding-right padding-left-5">
                         <img src="/images/playzoola-icon.svg" className="pointer-hand"/>
                    </div>
                    <div className="menu-text m-padding-top-5">
        		        <span className="mon-txt wallet-amount">&pound;{this.state.items.balance}</span>
                        <img src="/images/menu-topup.svg" />
                    </div>                   
                    <div className="menu-text margin-top-5 info-notification">
                        <img alt="5z" src="/images/Z-currency2.svg" />
        		        <span className="mon-txt wallet-amount no-padding-right">{this.state.items.zeds}</span>
                  </div>
        <div className="menu-text info-notification d-none">
            <img src="/images/menu-message.svg" />
            <span className="badge badge-red"></span>
        </div>
 </div>

 <div className="col-lg-8 col-md-8 col-sm-6 col-xs-6 padding-top-15 padding-bottom-15 text-right no-padding-left">
     <div className="menu-text pull-right info-notification" id="bs-example-navbar-collapse-1">
         <a href="#" className="" data-toggle="modal">
            <img src="/images/menu-popup-icon.svg" />
            <span className="badge badge-red"></span>
         </a>
     </div>
     <div className="menu-text pull-right">
         <a>
         <img src="/images/menu-home.svg" />
         </a>
     </div>
     <div className="menu-text pull-right">
         <a></a>
     </div>

 </div>
 </div>        
<div className="modal fade right" id="MenuModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" data-keyboard="true">
<div className="menu-dialog" role="document">
   <img className="close-icon" data-dismiss="modal" src="/images/close-icon.svg" alt=""/>
</div>
</div>
</div>
                         
)
        }
});

var ThankyouFooter = React.createClass({
    getInitialState: function () {
        return {
            src1 : "/images/social-twitter.svg",
            src : "/images/social-fb.svg",
            matchData:{}
        };
    },
    handleMouseOver:function(val) {
        if(val == 'FB'){
            this.setState({ src: "/images/social-fb-over.svg" });
        }else if(val == 'Twitter'){
            this.setState({ src1: "/images/social-twitter-over.svg" });
        }
    },
    handleMouseOut : function(val) {
        if(val == 'FB'){
            this.setState({ src: "/images/social-fb.svg" });
        }else if(val == 'Twitter'){
            this.setState({ src1: "/images/social-twitter.svg" });
        }
    },
    render: function () {
        var self = this;
        return (<div>    
         <div className="container zoola-footer">
    	 <div className="space-10"></div>
        
                <div className="row">
{this.props.isLog?<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-center">
                        <div className="row">
                            <div className="col-lg-9 col-md-9 col-sm-10 col-xs-9 col-centered">
                                <div className="row social-icons">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 no-padding text-left">
                    	                {/*<span className="pointer-hand"><a href="https://www.facebook.com/playzoola" target="_blank"><img src={this.state.src} onMouseOver={this.handleMouseOver.bind(null,"FB")} onMouseOut={this.handleMouseOut.bind(null,"FB")} /></a></span>*/}
                                        <span className="pointer-hand"><a><img src={this.state.src} onMouseOver={this.handleMouseOver.bind(null,"FB")} onMouseOut={this.handleMouseOut.bind(null,"FB")} /></a></span>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center no-padding">
                                        {/*<span className="pointer-hand"><a href="https://twitter.com/playzoola" target="_blank"><img src={this.state.src1} className="social-icons-img1" onMouseOver={this.handleMouseOver.bind(null,"Twitter")} onMouseOut={this.handleMouseOut.bind(null,"Twitter")}/></a></span> */}
                                        <span className="pointer-hand"><a><img src={this.state.src1} className="social-icons-img1" onMouseOver={this.handleMouseOver.bind(null,"Twitter")} onMouseOut={this.handleMouseOut.bind(null,"Twitter")} /></a></span>                             
                                    </div>
                                    </div>
                            </div>
                        </div>

                        <div className="row col-lg-12 visible-xs">
                            <div className="space-5"></div>
             	            <hr />
                            <div className="space-10"></div>
                        </div>
                        </div>:
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-8 col-xs-9 col-centered">
                                <div className="row social-icons">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 no-padding text-left">
                    	               {/*<span className="pointer-hand"><a href="https://www.facebook.com/playzoola" target="_blank"><img src={this.state.src} onMouseOver={this.handleMouseOver.bind(null,"FB")} onMouseOut={this.handleMouseOut.bind(null,"FB")}/></a></span>*/}
                                        <span className="pointer-hand"><a><img src={this.state.src} onMouseOver={this.handleMouseOver.bind(null,"FB")} onMouseOut={this.handleMouseOut.bind(null,"FB")} /></a></span>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center no-padding">
                                         {/*<span className="pointer-hand"><a href="https://twitter.com/playzoola" target="_blank"><img src={this.state.src1} className="social-icons-img1" onMouseOver={this.handleMouseOver.bind(null,"Twitter")} onMouseOut={this.handleMouseOut.bind(null,"Twitter")}/></a></span>*/}
                                        <span className="pointer-hand"><a><img src={this.state.src1} className="social-icons-img1" onMouseOver={this.handleMouseOver.bind(null,"Twitter")} onMouseOut={this.handleMouseOut.bind(null,"Twitter")} /></a></span>
                                    </div>
                                </div>
                                <div className="row">
                                    <button className="btn footer-sign-up" data-toggle="modal" data-target="#signup-with-email"><h5 className="white">Sign up</h5></button>
                                </div>
                            </div>
                        </div>

                        <div className="row col-lg-12 visible-xs">
                            <div className="space-5"></div>
             	            <hr />
                            <div className="space-10"></div>
                        </div>
                        </div>}
                      
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-7">
                        <div className="f-title">Playzoola</div>
                        <ul>
                            <li><a><span className="pointer-hand mwh-txt">Games</span></a></li>
                            <li><a><span className="pointer-hand mwh-txt">About us</span></a></li>
                            {this.props.isLog?
                            '':
                            <li><a><span className="pointer-hand mwh-txt">Rules</span></a></li>}
                            <li><a><span className="pointer-hand mwh-txt" target="_blank">Help Centre</span></a></li>
                            {this.props.isLog?
                            '':
                            <li><a><span className="pointer-hand mwh-txt">Forgotten Password?</span></a></li>}
                        </ul>


                    </div>
 {this.props.isLog? <div className="col-lg-3 col-md-2 col-sm-2 col-xs-5 go-to">
                	    <div className="f-title">Go to</div>
                        <ul>
                            <li><a><span className="pointer-hand mwh-txt">Dashboard</span></a></li>
                            <li><a><span className="pointer-hand mwh-txt">My profile</span></a></li>
                            <li><span className="pointer-hand mwh-txt">Log out</span></li>
                        </ul>
                    </div>:''}
  {this.props.isLog?<div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 text-center">
                        <div className="space-10 visible-xs"></div>
                        <div className="zoola-icon text-center">
                    	   <a><span className="pointer-hand mwh-txt">
                    	    <img src="/images/zoola-icon.svg" width="85" /></span></a><br />
                            <span className="mwh-txt">powered by</span><br />
                            <img src="/images/opta.png" width="85" />
</div>
                        <div className="space-5"></div>
                        <div className="row col-lg-12 visible-xs">
             	            <hr />
                        </div>
                    </div>:
                    <div className="col-lg-2 col-md-2 col-sm-3 col-xs-5 text-center"> 
                        <div className="zoola-icon text-center">
                    	  <a> <span className="pointer-hand mwh-txt">
                    	    <img src="/images/zoola-icon.svg" width="85" /></span></a><br />
                            <span className="mwh-txt">powered by</span><br />
                            <img src="/images/opta.png" width="85" />
</div>
                    </div>}
            </div>
{this.props.isLog?'':<div className="row col-lg-12 visible-xs">
             	            <hr />
            </div>}
            <div className="space-5"></div>
            <div className="space-5 hidden-xs"></div>
            <div className="row">
             	<div className="col-lg-12 text-center no-padding">
                     <div className="footer-icons">
                         <span className="d-inline">
                            {/*<img src="/images/paypal.png" width="105" alt="" className="margin-top-5"/>*/}
                            <img src="/images/visa.png" width="60" alt="" />
                            <img src="/images/mastercard.png" width="50" alt="" />
                            <img src="/images/comodo-seal.png" width="51" alt="" />
                            <img src="/images/18.png" width="30" alt="" />
                            <img src="/images/gambling-commission.png" width="80" alt="" />
                            <img src="/images/gambleaware.png" width="130" alt="" />
                            <img src="/images/ibas_bw.png" width="60" alt="" />
                         </span>
                    </div>
                    <div className="space-5"></div>
                	<div className="swh-txt margin-bottom-5">
                	
                	    <span  className="pointer-hand"><a >Terms & Conditions</a></span> &nbsp;|&nbsp; <span  className="pointer-hand"><a>Privacy Policy</a></span> &nbsp;|&nbsp; <span className="d-block-m pointer-hand"><a>Responsible Gambling Policy</a></span>
                    </div>
                    <div className="swh-txt margin-bottom-5">
                        Playzoola is licensed and regulated by the Gambling Commission under license number <span  className="d-block-m underline pointer-hand"><a>000-031164-R-312382-005</a></span>
                    </div>
                	<div className="copy-right swh-txt">
                	    <span className="d-block-m"><i className="fa fa-copyright"></i> 2016 Poolpit Ltd. All rights reserved.</span>
                	</div>
             	</div>
             </div>
             <div className="space-5"></div>
         </div>
</div> 
                         
)
        }
});