/** @jsx React.DOM */


//**********--- call getCookie function to read cookie---**********
getCookie()
var plsid =getParameterByName("plsid");

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
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                    <h3>You've joined a game</h3>
                </div>
            </div>
        )
    }
});






//**********--- JoinSetupProfile component ---**********
var JoinSetupProfile = React.createClass({
    getInitialState: function () {
        return {
            items: {},   
        }
    },
    componentWillMount: function () {
        window.fbAsyncInit = function () {
            FB.init({
                appId: '631830156970171',
                cookie: true,  // enable cookies to allow the server to access
                // the session
                xfbml: true,  // parse social plugins on this page
                version: 'v2.6' // use version 2.1
            });
            this.serverRequest = $.get(baseurl+"general/navbar/"+userId+","+sessionId, function (result) {
                // console.log(result)
                if(typeof result != 'object')
                {
                    result = JSON.parse(result)
                }                     
                this.setState({ items: result.header[0] })
            }.bind(this));

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
    gotoQuickTopUp: function () {
        if (SupHeaderThis.state.items.status == 'P' || SupHeaderThis.state.items.status == 'T' || SupHeaderThis.state.items.status == 'N') {
            window.location = "/build/views/Football/QuickTopUp/Quick-Top-Up.html?islog=" + is_loggedIn
        }
        else {
            window.location = "/build/views/Football/Glory/topUp/topUp.html?islog=" + is_loggedIn
        }
    },
    gotoGames:function(){ //Function to navigate to game selection page
        window.location="/build/views/Football/GameSelection/gameSelection.html?islog="+is_loggedIn
    },
    openTwittershare: function () {
        this.serverRequest = $.get(baseurl + "play/game1/" + userId + "," + sessionId + "," + plsid, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }

           myWindow = window.open("https://twitter.com/share?url=http://www.playzoola.com&text=If you think you know about%20" +result.items[0]['game_name'] + "- Play against others and win the money:%20pic.twitter.com/70mlqCk0Mu", "", "width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=500,top=200");
           return myWindow;
        })
        //myWindow = window.open("https://twitter.com/share?url=http://www.playzoola.com&text="+, "", "width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=500,top=200");
        //return myWindow;
    },   
    openFbshare: function () {
        //myWindow = window.open("https://www.facebook.com/sharer/sharer.php?u=http://localhost:8000/build/views/Football/GameSelection/gameSelection.html", "", "width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=500,top=200");
        //return myWindow;
       
        this.serverRequest = $.get(baseurl+"play/game1/"+ userId + "," + sessionId+","+plsid,function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            FB.ui(
               {
                   method: 'feed',
                   name: 'Playzoola',
                   link: ' http://www.playzoola.com/',
                   picture: 'http://playzoolasportsit.bettorlogic.com/images/favicon.png',
                   caption: 'This is the content of the "caption" field.',
                   description: "If you think you know about "+result.items[0]['game_name']+" - Play against others and win the money",
                   message: ''
               });
        })
      
                
        
    },
     render: function () {
        return (<div>
              <div className="space-10"></div>
              <div className="row">
                     <div className="col-lg-7 col-md-7 col-sm-9 col-xs-12 col-centered text-center">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                <div className="share-social bg-dark-blue">
                                    <span className="pointer-hand" onClick={this.openFbshare}><img src="/images/share-fb.svg" alt="" /><span>SHARE<br />GAME</span></span>                                      
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                <div className="share-social bg-dark-blue">
                                    <span className="pointer-hand" onClick={this.openTwittershare}><img src="/images/share-twitter.svg" alt="" /><span>SHARE<br />GAME</span></span>                                        
                                </div>
                            </div>
                        </div>
                     </div>
              </div>
              <div className="space-10"></div>
              <div className="row">
                    <div className="col-lg-12">
                        <p className="text-center"><img className="margin-top-10" src="/images/pz-icon.svg" width="150" /></p>
                    </div>
              </div>
              <div className="space-10"></div>
              <div className="row">
                    <div className="col-lg-12">
                        <h2 className="text-center">Play more games.</h2>
                    </div>
              </div>
              <div className="space-10"></div>
              <div className="row">
                    <div className="col-lg-5 col-md-5 col-sm-7 col-xs-12 col-centered">
                            <button type="submit" className="btn zoola-btn" onClick={this.gotoQuickTopUp}><div className="btn-txt" >{this.state.items.status == 'T'||this.state.items.status == 'P'?<span>Topup</span>:<span>Deposit</span>}</div></button>
                    </div>
              </div>
              <div className="space-10"></div>
              <div className="space-5"></div>
              
              <div className="row">
                     {/* <div className="col-lg-12">
                             <p className="text-center"><a href={"/build/views/Football/GameSelection/gameSelection.html?islog=" + is_loggedIn} className="underline">Go back to games</a></p>
                     </div>*/}
                   <div className="col-lg-5 col-md-5 col-sm-7 col-xs-12 col-centered">
                            <button type="submit" className="btn zoola-btn" onClick={this.gotoGames}><div className="btn-txt" >Go back to games</div></button>
                   </div>
              </div>
              <div className="space-5"></div>
            </div>
        )
         }
});
