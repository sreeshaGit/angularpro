var Footer = React.createClass({ 
    getInitialState: function(){
        return {
            src1 : "/images/social-twitter.svg",
            src : "/images/social-fb.svg",
            matchData:{}
        }
    },
    gotoSignup:function(){// Function to navigate to signup page.
        //window.location="/build/views/Football/signup/signup.html"
        window.location="/signup/"
    },
    gotoGames:function(){// Function to navigate to gameSelection page.
        //window.location="/build/views/Football/GameSelection/gameSelection.html?islog="+is_loggedIn
        window.location="/gameselection/?islog="+is_loggedIn
    },
    //gotoAbout:function(){// Function to navigate to About page.
    //    window.location=" https://playzoola.zendesk.com/hc/en-us/categories/200985205-About-Us"
    //},
    gotoDashboard:function(){// Function to navigate to dashboard page.
        //window.location="/build/views/Football/Dashboard/dashboard.html?islog="+is_loggedIn
        window.location="/dashboard/?islog="+is_loggedIn
    },
    //gotowallet:function(){// Function to navigate to wallet page.
    //    window.location="/build/views/Football/wallet/wallet.html?islog="+is_loggedIn
    //},
    //gotoLogin:function(){// Function to navigate to login page.
    //    window.location="/build/views/Football/Login/login.html"
    //},
    //gotoRules:function(){// Function to navigate to Rules page.
    //    window.location=" https://playzoola.zendesk.com/hc/en-us/categories/200961049-Game-Rules"
    //},
    //gotoSupport:function(){// Function to navigate to create game page.
    //    window.location="https://playzoola.zendesk.com/hc/en-us";
    //},
    gotoMyprofile:function(){// Function to navigate to my profile page.
        //window.location="/build/views/Football/myprofile/myprofile.html?islog="+is_loggedIn
        window.location="/myprofile/?islog="+is_loggedIn
    },
    gotoIndex:function(){// Function to navigate to index page.
        // window.location="/build/views/Football/Index/index.html";
        window.location="/index/";
    },
    gotoPasswordrecovery:function(){// Function to navigate to Password Recovery page.
        //window.location="/build/views/Football/passwordrecovery/passwordrecovery.html";
        window.location="/passwordrecovery";
    },
    //gotoTerms:function(){// Function to navigate to my Terms page.
    //    window.location="https://playzoola.zendesk.com/hc/en-us/categories/200985145-Terms-Conditions";
    //},
    //gotoPrivacy:function(){// Function to navigate to my privacy page.
    //    window.location="https://playzoola.zendesk.com/hc/en-us/categories/200982725-Privacy";
    //}, 
    //gotoGambling:function(){// Function to navigate to my Gambling page.
    //    window.location="https://playzoola.zendesk.com/hc/en-us/categories/200960809-Responsible-Gambling";
    //},
    //gotoLicenceNo:function(){// Function to navigate to my profile page.
    //    window.location="http://www.gamblingcommission.gov.uk/Home.aspx";
    //},
    logoutUser:function(){
        this.serverRequest = $.get(baseurl+"user/logout/"+userId, function (result) {     
            var now = new Date();
            var time = now.getTime();
            time -= 3600 * 1000 *24;
            now.setTime(time);            
            var cookieValue = "PZdata={}; expires=" + now.toUTCString() + "; path=/; ";
            document.cookie = cookieValue;        
            //window.location="/build/views/Football/Index/index.html?islog=" + false  
            window.location="/index/?islog=" + false  
        }.bind(this));        
    },
   
    Facebooklink: function() {
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.6&appId=281524821874962";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    },
    openTwittershare:function(){     
        //myWindow = window.open("https://twitter.com/share?url=http://localhost:8000/build/views/Football/GameSelection/gameSelection.html", "", "width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=500,top=200");
        //return myWindow;  
        


    },
    openFbshare:function(){     
        //myWindow = window.open("https://www.facebook.com/sharer/sharer.php?u=http://localhost:8000/build/views/Football/GameSelection/gameSelection.html", "", "width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=500,top=200");
        //return myWindow;
        //FB.ui(
        //        {
        //            method: 'feed',
        //            name: 'Played Game',
        //            link: ' http://www.playzoola.com/',
        //            picture: 'http://playzoolasportsit.bettorlogic.com/images/favicon.png',
        //            caption: 'This is the content of the "caption" field.',
        //            description: 'This is the content of the "description" field, below the caption.',
        //            message: ''
        //        });
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
    render: function ()
    {
        return (
  <div>    
         <div className="container zoola-footer">
    	 <div className="space-10"></div>
        
                <div className="row">
{this.props.isLog?<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-center">
                        <div className="row">
                            <div className="col-lg-9 col-md-9 col-sm-10 col-xs-9 col-centered">
                                <div className="row social-icons">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 no-padding text-left">
                    	                <span className="pointer-hand"><a href="https://www.facebook.com/playzoola" target="_blank"><img src={this.state.src} onMouseOver={this.handleMouseOver.bind(null,"FB")} onMouseOut={this.handleMouseOut.bind(null,"FB")} /></a></span>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center no-padding">
                                        <span className="pointer-hand"><a href="https://twitter.com/playzoola" target="_blank"><img src={this.state.src1} className="social-icons-img1" onMouseOver={this.handleMouseOver.bind(null,"Twitter")} onMouseOut={this.handleMouseOut.bind(null,"Twitter")}/></a></span>               
                                    </div>
                                    {/* <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-right no-padding">
                                        <img src="/images/social-instagram.svg" />
                                    </div>*/}

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
                    	               <span className="pointer-hand"><a href="https://www.facebook.com/playzoola" target="_blank"><img src={this.state.src} onMouseOver={this.handleMouseOver.bind(null,"FB")} onMouseOut={this.handleMouseOut.bind(null,"FB")}/></a></span>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center no-padding">
                                         <span className="pointer-hand"><a href="https://twitter.com/playzoola" target="_blank"><img src={this.state.src1} className="social-icons-img1" onMouseOver={this.handleMouseOver.bind(null,"Twitter")} onMouseOut={this.handleMouseOut.bind(null,"Twitter")}/></a></span>
                                    </div>
                                   {/* <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-right no-padding">
                                        <img src="/images/social-instagram.svg" />
                                    </div>*/}
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
                            {/*<li><a href={"/build/views/Football/GameSelection/gameSelection.html?islog="+is_loggedIn}><span className="pointer-hand mwh-txt">Games</span></a></li>*/}
                             <li><a href={"/gameselection/?islog="+is_loggedIn}><span className="pointer-hand mwh-txt">Games</span></a></li>
                            <li><a href="https://playzoola.zendesk.com/hc/en-us/categories/200985205-About-Us" target="_blank"><span className="pointer-hand mwh-txt">About us</span></a></li>
                            {this.props.isLog?
                            '':
                            <li><a href="https://playzoola.zendesk.com/hc/en-us/categories/200961049-Game-Rules" target="_blank"><span className="pointer-hand mwh-txt">Rules</span></a></li>}
                            <li><a href="https://playzoola.zendesk.com/hc/en-us" target="_blank"><span className="pointer-hand mwh-txt" target="_blank">Help Centre</span></a></li>
                            {this.props.isLog?
                            '':<li><a href="/passwordrecovery"><span className="pointer-hand mwh-txt">Forgotten Password?</span></a></li>}
                        </ul>


                    </div>
 {this.props.isLog? <div className="col-lg-3 col-md-2 col-sm-2 col-xs-5 go-to">
                	    <div className="f-title">Go to</div>
                        <ul>
                           <li><a href={"/dashboard/?islog="+is_loggedIn}><span className="pointer-hand mwh-txt">Dashboard</span></a></li>
                            {/*<li><span onClick={this.gotowallet} className="pointer-hand mwh-txt">wallet</span></li>*/}
                            <li><a href={"/myprofile/?islog="+is_loggedIn}><span className="pointer-hand mwh-txt">My profile</span></a></li>
                            <li><span className="pointer-hand mwh-txt" onClick={this.logoutUser}>Log out</span></li>
                        </ul>
                    </div>:''}
  {this.props.isLog?<div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 text-center">
                        <div className="space-10 visible-xs"></div>
                        <div className="zoola-icon text-center">
                    	  {/* <a href={"/build/views/Football/Dashboard/dashboard.html?islog="+is_loggedIn}><span className="pointer-hand mwh-txt">*/}
                                <a href={"/dashboard/?islog="+is_loggedIn}><span className="pointer-hand mwh-txt">
                    	    <img src="/images/zoola-icon.svg" width="85" />
        </span></a><br />
                            <span className="mwh-txt">powered by</span><br />
                            <img src="/images/opta.png" width="85" />
</div>
                        
                    </div>:
                    <div className="col-lg-2 col-md-2 col-sm-3 col-xs-5 text-center"> 
                        <div className="zoola-icon text-center">
                            {/*<a href={"/build/views/Football/Index/index.html"}> */}
                             <a href={"/index"}><span className="pointer-hand mwh-txt">
                    	    <img src="/images/zoola-icon.svg" width="85" />
                             </span>
                             </a><br />
                            <span className="mwh-txt">powered by</span><br />
                            <img src="/images/opta.png" width="85" />
                        </div>
                    </div>}
            </div>
            
            <div className="space-5"></div>
            <div className="row col-lg-6 col-sm-6 col-md-6 col-xs-12 no-padding col-centered">
                <hr />
            </div>
            <div className="row">
             	<div className="col-lg-12 text-center no-padding">
                    <div className="footer-icons">
                        <div className="d-inline">
                            {/*<img src="/images/paypal.png" width="105" alt="" className="margin-top-5"/>*/}
                            <img src="/images/visa.png" width="60" alt="" />
                            <img src="/images/mastercard.png" width="50" alt="" />
                            <img src="/images/comodo-seal.png" width="51" alt="" />
                            <img src="/images/18.png" width="30" alt="" />
                            <div className="d-block-m">
                                <span className="pointer-hand">
                                <a href="http://www.gamblingcommission.gov.uk/Home.aspx" target="_blank"><img src="/images/gambling-commission.png" width="80" alt="" /></a>
                                </span>
                                <span className="pointer-hand"><a href="http://www.gambleaware.co.uk/" target="_blank"><img src="/images/gambleaware.png" width="130" alt="" /></a></span>
                                <span className="pointer-hand"><a href="http://www.ibas-uk.com/" target="_blank"><img src="/images/ibas_bw.png" width="60" alt="" /></a></span>
                            </div>
                        </div>
                    </div>
                    <div className="space-5"></div>
                	<div className="swh-txt margin-bottom-5">
                	
                	    <span  className="pointer-hand"><a href="https://playzoola.zendesk.com/hc/en-us/categories/200985145-Terms-Conditions" target="_blank">Terms & Conditions</a></span> &nbsp;|&nbsp; <span  className="pointer-hand"><a href="https://playzoola.zendesk.com/hc/en-us/categories/200982725-Privacy" target="_blank">Privacy Policy</a></span> &nbsp;|&nbsp; <span className="d-block-m pointer-hand"><a href="https://playzoola.zendesk.com/hc/en-us/categories/200960809-Responsible-Gambling" target="_blank">Responsible Gambling Policy</a></span>
                    </div>
                    <div className="swh-txt margin-bottom-5">
                        Playzoola is licensed and regulated by the Gambling Commission under license number <span  className="d-block-m underline pointer-hand"><a href="https://secure.gamblingcommission.gov.uk/gccustomweb/PublicRegister/PRSearch.aspx?ExternalAccountId=31164" target="_blank">000-031164-R-312382-005</a></span>
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