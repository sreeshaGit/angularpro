/** @jsx React.DOM */
//**********--- call getCookie function to read cookie---**********
getCookie()

if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}
$(document).on("keypress", "#number", function (e) {
    var k = e.which;

    if (k < 48 || k > 57) {
        if (k != 8) {
            e.preventDefault()
        }
    }
}
)
//**********--- Component to display contact detail  ---**********
var Info = React.createClass({
getInitialState: function () {
        return {
            users: [],
            address:[]
               };
    },

refresh: function () {         
    var data = { "items": [{ "mobile": $("#number").val(), "twitter": $("#twit").val() }] }
  
     this.serverRequest = $.post(baseurl + "registration/detail/" + userId + "," + sessionId, JSON.stringify(data), function (result) {
         if ($("#number").val() == "" && $("#twit").val() == "") {
             //window.location = "/build/views/Football/myprofile/myprofile.html?islog=" + is_loggedIn    
             window.location = "/myprofile/?islog=" + is_loggedIn    
         }             
         else if ( ($("#twit").val() != "" )&&($("#twit").val().length < '4' || $("#twit").val().length > '15')) {
             document.getElementById('twiterror').innerHTML = "Twitter id must be of 4 to 15 characters."                 
             return false;
         }
         else {
             //window.location = "/build/views/Football/myprofile/myprofile.html?islog=" + is_loggedIn + "&status=true"
             window.location = "/myprofile/?islog=" + is_loggedIn + "&status=true"
         }
     }.bind(this));        
},
   
    componentWillMount: function () {
        this.serverRequest = $.get(baseurl + "registration/detail/" + userId + ',' + sessionId, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            if (result.user[0]['usr_image'] == "" || result.user[0]['usr_image'] == null) {
                result.user[0]['usr_image'] = 24;
            }
            this.setState({ users: result.user[0] });

            var add = this.state.users.address;           
            var array = add.split(',');
           
            this.setState({ address: array })
            this.refs.number.value = this.state.users.mobile;
            this.refs.twit.value = this.state.users.twitter
        }.bind(this));     
    },
   
 render: function () {
        return (
   <div>  
     <div className="container-fluid header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                        <h3>Contact Info</h3>
                    </div>
                </div>
            </div>
     </div>

     <div className="container">
   
            <div className="space-10"></div>
            <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
			            <img src={"/images/animals-Modified/" + this.state.users.usr_image+ ".svg"} className="margin-bottom-15" width="180"/>
                        <div className="myprofile-player-name">{this.state.users.username}</div>
                    </div>
            </div>
            <div className="space-10"></div>
            <div className="row ">
                <div className="col-lg-5 col-md-5 col-sm-6 col-xs-12 col-centered">
                    <div className="zoola-box col-centered">
                        <div className="padding-30">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 contact-info">
                                    <div className="tit-txt">{this.state.users.name}</div>
                                    <div className="space-5"></div>
	                                <span className="tit-txt">{this.state.users.email} </span>
	                                <div className="space-5"></div>
                                    {
                                  
                                    this.state.address.map(function (item, index) {                                  
	                                return <div className="tit-txt" key={index}>{item}<br/></div>
                                    })
                                    }
	                                <div className="space-5"></div>
	                                <img src="/images/call.svg" alt="" width="18" className="margin-bottom-5" />&nbsp;<span className="font-20"><span className="contact-capsle tit-txt">+44<input type="text" size="12" id="number" ref="number" maxLength="13" /> </span> </span>
	                                <div className="space-5"></div>
	                                <img src="/images/share-twitter.svg" alt="" width="22" className="margin-bottom-5" />&nbsp;<span className="font-20"><span className="contact-capsle tit-txt">@<input type="text" size="8" id="twit" ref="twit"minLength='4' maxLength='15'/></span> </span>
                                        <div id="twiterror" className="alert-message">&nbsp;</div>
                                 </div>
                            </div>
                        </div>
                   
                    </div>
                    <button className="btn zoola-btn" onClick={this.refresh}><div className="btn-txt">Save changes</div></button>
                </div>
            </div>
            
            <div className="space-10"></div>
            
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-10 col-centered">              
                {/*<a href={"/build/views/Football/changepassword/changepassword.html?islog=" + is_loggedIn}><button className="btn zoola-btn bg-dark-dark-blue"><h5 className="light-blue">Change Password</h5></button></a>*/}
                <a href={"/changepassword/?islog=" + is_loggedIn}><button className="btn zoola-btn bg-dark-dark-blue"><h5 className="light-blue">Change Password</h5></button></a>
             </div>
            
            <div className="space-10"></div>

	        <div className="row">
		        <div className="col-lg-12 text-center">
					<p>To change you email or address, <span className="d-block-m">please <a className="underline" href="https://playzoola.zendesk.com/hc/en-us/articles/209629225--Our-contact-details" target="_blank">contact support</a></span></p>
		        </div>
	        </div>

            <div className="space-10"></div>
            </div> 
    </div>         
               )
                       }
});