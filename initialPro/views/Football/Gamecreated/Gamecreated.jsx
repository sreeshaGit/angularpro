/** @jsx React.DOM */
var gameid = "";
//**********--- call getCookie function to read cookie---**********
getCookie()

if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}
if (getParameterByName("gameid") && getParameterByName("gameid") != "") {
    gameid = getParameterByName("gameid");
}
//**********--- subheader component ---**********
var Subheader = React.createClass({
    render: function () {
        return (
                   <div className="row">
                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                               <h3>GAME CREATED!</h3>
                       </div>
                   </div>
        )
    }
});
//**********--- Header component ---**********
//var Header = React.createClass({
//    getInitialState: function () {
//        return {
//            mainData: []
//        };
//    },
//    componentWillMount: function () {
//        this.serverRequest = $.get(baseurl + "play/game1/" + userId + "," + sessionId + "," + gameid, function (result) {
//            if (typeof result != 'object') {
//                result = JSON.parse(result)
//            }
//            this.setState({ mainData: result.items[0] })
//        }.bind(this));
//    },
//    render: function () {
//        return (
//                        <div>
//            	         <div className="space-5"></div>
//       		             <div className="row">
//                            <div className="col-lg-9 col-md-9 col-sm-10 col-centered">
//                	            <ul className="game-created-list">
//                    	            <li><img alt="" src="/images/accept.svg"/> &nbsp; Your game "{this.state.mainData.game_name}" has successfully been created.</li>
//                                    <li><img alt="" src="/images/accept.svg"/> &nbsp;  You have purchase a ticket to "{this.state.mainData.game_name}".</li>
//                	            </ul>
//                            </div>                        
//       		             </div>
//                         <div className="space-5"></div>
//                       </div>
//               )
//        }
//});

function checkEmail(e) {
    if (e.length > 0) {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e))) {
            return false;
        }
    }
    return true
}
//**********--- Gamecreated component ---**********
var selectedMates = [];
var Gamecreated = React.createClass({
    getInitialState: function () {
                return {
                    mainData: [],
                    frdsList :[],
                    postData :[]
                };
    },
    componentWillMount: function () {
                this.serverRequest = $.get(baseurl + "play/game1/" + userId + "," + sessionId + "," + gameid, function (result) {
                    if (typeof result != 'object') {
                        result = JSON.parse(result)
                    }
                    this.setState({ mainData: result.items[0] })
                }.bind(this));
                window.fbAsyncInit = function () {
                    FB.init({
                        appId: '1832766513626295',
                        cookie: true,  // enable cookies to allow the server to access
                        // the session
                        xfbml: true,  // parse social plugins on this page
                        version: 'v2.6' // use version 2.1
                    });
                    this.serverRequest = $.get(baseurl + "general/navbar/" + userId + "," + sessionId, function (result) {
                        // console.log(result)
                        if (typeof result != 'object') {
                            result = JSON.parse(result)
                        }
                        this.setState({ items: result.header[0] })
                    }.bind(this));
					
                    this.serverRequest = $.get(baseurl + "game/invite/" + userId + "," + sessionId + "," + gameid, function (result) {
                    //this.serverRequest = $.get(baseurl + "game/invite/10013," + sessionId + "," + gameid, function (result) {
                        // console.log(result)
                        if (typeof result != 'object') {
                            result = JSON.parse(result)
                        }
                       // console.log('result.items === ',result.items);
                        this.setState({ frdsList: result.items })
                    }.bind(this));
                   // console.log('this.state.frdsList === ',this.state.frdsList);
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
    invite:function(){
        this.serverRequest = $.get(baseurl + "game/invite/" + userId + ',' + sessionId, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
        }.bind(this));
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
        this.serverRequest = $.post(baseurl + "game/invitemail/" + userId + "," + sessionId + "," + gameid, JSON.stringify({ "items": postData })+"=", function (result) {
            window.location = "/invites/?islog=true"
        }.bind(this));
      
    },
    gotoGameselection: function(){
        window.location = "/gameselection/?islog=true"
    },
    openTwittershare: function () {
        this.serverRequest = $.get(baseurl + "play/game1/" + userId + "," + sessionId + "," + gameid, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }

            myWindow = window.open("https://twitter.com/share?url=http://www.playzoola.com&text=If you think you know about%20" + result.items[0]['game_name'] + "- Play against others and win the money:%20pic.twitter.com/70mlqCk0Mu", "", "width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=500,top=200");
            return myWindow;
        })
        //myWindow = window.open("https://twitter.com/share?url=http://www.playzoola.com&text="+, "", "width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=500,top=200");
        //return myWindow;
    },
    openFbshare: function () {
        //myWindow = window.open("https://www.facebook.com/sharer/sharer.php?u=http://localhost:8000/build/views/Football/GameSelection/gameSelection.html", "", "width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=500,top=200");
        //return myWindow;

        this.serverRequest = $.get(baseurl + "play/game1/" + userId + "," + sessionId + "," + gameid, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            FB.ui(
               {
                   method: 'feed',
                   name: 'Playzoola',
                   link: ' https://www.playzoola.com/',
                   picture: 'https://playzoola.com/images/favicon.png',
                   caption: 'This is the content of the "caption" field.',
                   description: "If you think you know about " + result.items[0]['game_name'] + " - Play against others and win the money",
                   message: ''
               });
        })
    },
    inviteMate: function (id,type,imgId) {
        var postData1 = this.state.postData;
        if (type == 'avatarClick') {
            //if($("#"+id).hasClass("selected-mate")){
            //    $("#"+id).removeClass("selected-mate");
                
            //}else{
            $("#"+id).addClass("selected-mate");
            this.state.frdsList.filter(function (d) {
                    if (d.fr_img_id == imgId) {
                        postData1.push({ "fr_usr_id": d.fr_usr_id });
                        return true;
                    }
                })
            //}
            this.setState({postData:postData1});
        } else {
            //console.log('postdata === ',this.state.postData);
            this.serverRequest = $.post(baseurl + "game/invite/" + userId + "," + sessionId + ","+gameid, JSON.stringify({ "items": this.state.postData }), function (result) {
                window.location = "/invites/?islog=true"
            }.bind(this));
        }
    },
    render: function () {
        var self = this;
       return ( <div>
        <div className="space-10"></div>
        <div className="row">
            <div className="col-lg-12 text-center">
                <h2 className="text-center">Your game "{this.state.mainData.game_name}" has successfully been created.</h2>
            </div>
        </div>
        <div className="space-10"></div>
		 <div className="row">
            <div className="col-lg-12 text-center">
                <p className="text-center">Why not invite some friends to join you ?</p>
            </div>
		</div> 
        <div className="space-5"></div>
        <div className="row ">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div className="tit-txt text-center margin-top-20">ZOOLA MATES</div>
                <div className="col-centered zoola-box">
                      <div className="padding-20 zoolamate">
                            <div className="row">
                                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 text-center">
                                {
                                    self.state.frdsList.map(function (item, index) {
                                        return <div key={index} onClick={self.inviteMate.bind(null,"friend_" + index,"avatarClick",item.fr_img_id)} className="friend" id={"friend_" + index}><img width="40" alt="" src={"/images/animals-Modified/"+item.fr_img_id+".svg"}/><span className="frnd-name font-20">{item.fr_name}</span></div>
                                    })
								}
								</div>
                            </div>
                      </div>
                </div>
                <button className="btn zoola-btn" onClick={this.inviteMate.bind(null,'','','')} id='invite'><div className="btn-txt">Invite mates</div></button>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div className="tit-txt text-center margin-top-20">INVITE BY EMAIL</div>
                <div className="col-centered zoola-box">
                      <div className="padding-20">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                	<div className="form-group no-margin">
                                      <textarea className="form-control no-margin" rows="3" id="comment"></textarea>
                                        <div id="commenterror" className="alert-message">&nbsp;</div>
                                	</div>
                                </div>
                            </div>

                      </div>
                </div>
                
                <button className="btn zoola-btn" onClick={this.valdate}><div className="btn-txt">Invite friends</div></button>
            </div>
        </div>

         <div className="space-10"></div>
         <div className="row">
            <div className="col-lg-7 col-md-9 col-sm-9 col-xs-12 col-centered">
            	<div className="row">
                	<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    	<div className="share-social bg-light-blue" onClick={this.openTwittershare}>
                        	<img alt="" src="/images/share-twitter.png"/>
                            <span>INVITE MY FOLLOWERS</span>
                    	</div>
                	</div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    	<div className="share-social bg-light-blue" onClick={this.openFbshare}>
                        	<img alt="" src="/images/share-fb.png"/>
                            <span>INVITE MY FRIENDS</span>
                    	</div>
                    </div>
            	</div>
            </div>
         </div>
         <div className="space-10"></div>
         <div className="space-10"></div>
         <div className="row">   
            <div className="col-lg-7 col-md-9 col-sm-9 col-xs-12 col-centered">
            	<button className="btn zoola-btn" type="submit" onClick={this.gotoGameselection}><div className="btn-txt"><strong>View game</strong></div></button>
            </div>
         </div>
         <div className="space-10"></div> 
                     </div>
             )
       }
});


