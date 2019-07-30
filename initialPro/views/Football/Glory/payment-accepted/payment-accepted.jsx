/** @jsx React.DOM */
//plsidasd
var plsid = getParameterByName("plsid");
//aadf
//**********--- call getCookie function to read cookie---**********
getCookie()


if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}
if (getParameterByName("plsid") && getParameterByName("plsid") != "") {
    plsid = getParameterByName("plsid");
}
//**********--- Invite component ---**********
var Invite = React.createClass({
    render: function () {
        return (        
                <div>
                     <div className="container-fluid header">
                        <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                                        <h3>INVITE MATES</h3>
                                </div>
                        </div>
                    </div>

                    
                 </div>
        )
     }
});                  

function checkEmail(e) {
    if (e.length > 0)
    {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e))) {
            return false;
        }
    }
     return true
}
//**********--- Card component ---**********
var Card = React.createClass({
    componentWillMount: function () {     
        window.fbAsyncInit = function () {
            FB.init({
                //appId: '631830156970171',
                appId: FB_APPID,
                cookie: true,  // enable cookies to allow the server to access
                // the session
                xfbml: true,  // parse social plugins on this page
                version: 'v2.6' // use version 2.1
            });          
        }.bind(this);
        // Load the SDK asynchronously
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    },
    valdate: function (event) {      
        var Comment = $('#comment').val();
        var emailAry1 = Comment.split(",");
        var emailAry = [];
        var postData = [];
        
        for (i = 0; i < emailAry1.length; i++)
        {
            if(emailAry1[i]!="")
            {
                emailAry.push(emailAry1[i].trim())
            }
        }
       
        if (emailAry.length<1) {
            error = "please enter email address.\n";
            document.getElementById("commenterror").innerHTML = "Please enter email address."

            return false;
        }
        if (emailAry.length > 25) {
            error = "The maximum limit is 25.\n";
            document.getElementById("commenterror").innerHTML = "The maximum limit is 25."

            return false;
        }
       
       else {
            document.getElementById("commenterror").innerHTML = "&nbsp;"
        }
       
        for (i = 0; i < emailAry.length && emailAry[i].length>0; i++)
        {
          
            if (!checkEmail(emailAry[i]))
            {
                document.getElementById("commenterror").innerHTML = "Please enter valid email address seperated by comma."
                return false;
            }
            
            postData.push({ "lower(usr_email)": emailAry[i] })
        }
        this.serverRequest = $.post(baseurl + "game/invitemail/" + userId + ',' + sessionId + "," + plsid, JSON.stringify({ "items": postData }), function (result) {           
            window.location = "/invites/?islog=true"
            }.bind(this));        
    },
    openTwittershare: function () {       
        myWindow = window.open("https://twitter.com/share?url=http://playzoola.com&text", "", "width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=500,top=200");
        return myWindow;
    },
    openFbshare: function () {
        //myWindow = window.open("https://www.facebook.com/sharer/sharer.php?u=http://localhost:8000/build/views/Football/GameSelection/gameSelection.html", "", "width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=500,top=200");
        //return myWindow;
        FB.ui(
               {
                   method: 'feed',
                   name: 'Playzoola',
                   link: ' http://www.playzoola.com/',
                   picture: 'http://playzoolasportsit.bettorlogic.com/images/favicon.png',
                   caption: 'This is the content of the "caption" field.',
                   description: "Play against others and win the money",
                   message: ''
               });

    },
    gotoBack: function () {
        window.history.go(-1);
        // window.location = "/leaderboard/?islog=" + is_loggedIn + "&plsid=" + plsid;
        //window.location = "/leaderboard?islog="+is_loggedIn+"&plsid="+plsid+"&isglory=" + isglory;       
    },
    render: function () {
        return (        
       <div>
            <div className="container">
                    <div className="space-10"></div>
                    <div className="row">
                        <div className="col-lg-12">
                            <p className="text-center"><img className="margin-top-10" src="/images/pz-icon.svg" width="150" /></p>
                        </div>
                    </div>
                    <div className="space-10"></div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                    <h2>No-one wants to be left on the bench...</h2>
                        </div>
                    </div>
                    <div className="space-10"></div>
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                            <div className="row col-lg-12 col-md-8 col-sm-9 col-xs-9 col-centered">
                                <div className="space-10 visible-lg"></div>
                                <div className="col-lg-12 col-md-6 col-sm-6 col-xs-12">
                                        <div className="share-social bg-light-blue" onClick={this.openTwittershare}>
                                            <img alt="" src="/images/share-twitter.svg" />
                                            <span>INVITE MY FOLLOWERS</span>
                                        </div>
                                </div>
                                <div className="col-lg-12 col-md-6 col-sm-6 col-xs-12">
                                        <div className="share-social bg-light-blue" onClick={this.openFbshare}>
                                            <img alt="" src="/images/share-fb.svg" />
                                            <span>INVITE MY FRIENDS</span>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                            <div className="space-10 visible-xs visible-md visible-sm"></div>
                            <div className="tit-txt text-center">INVITE BY EMAIL</div>
                            <div className="col-lg-12 col-md-5 col-sm-7 col-centered zoola-box no-padding">
                                <div className="padding-20">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                            <div className="form-group no-margin">
                                                <textarea className="form-control no-margin" rows="4" id="comment"></textarea>
                                                <div id="commenterror" className="alert-message">&nbsp;</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12 col-sm-12 hidden-xs">
                                            <div className="space-10 hidden-xs"></div><div className="space-10 visible-lg hidden-xs"></div>
                                            <button type="submit" className="btn zoola-btn" onClick={this.valdate}><h5 className="">Invite friends</h5></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <button type="submit" className="btn zoola-btn visible-xs" onClick={this.valdate}><div className="btn-txt">Invite friends</div></button>
                            </div>
                    </div>
                    
                    <div className="space-10"></div>
                    <div className="sm-txt text-center underline"><span onClick={this.gotoBack}>Invite friends later on</span></div>
                    <div className="space-10"></div>
            </div>
      </div>
        )
           }
});                  