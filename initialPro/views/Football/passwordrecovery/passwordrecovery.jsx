/** @jsx React.DOM */

var is_loggedIn = false;

//**********--- Subheader component ---**********
var Subheader = React.createClass({
    render: function () {
        return (
                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     {/*UAT 27-08-2016 : 23.Contact Customer Support*/}
                     {/*<h3>Password Recovery</h3>*/}
					   <h3>Password Re-set</h3>
				</div>
        )
    }
});

//**********--- Email component ---**********
var Email = React.createClass({
    validate: function (event) {        // Function to validate Email
        var error = "";
        var email = event.target.value;
        apos = event.target.value.indexOf("@");
        dotpos = event.target.value.lastIndexOf(".");
        if (email == "" || email == null)
        {
            document.getElementById("emailerror").innerHTML = "Please enter your registered email"

            return false;
        }
       
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value))) {
            document.getElementById("emailerror").innerHTML = "Please enter valid email"
            
            return false;
        }
        else {
            document.getElementById("emailerror").innerHTML = "&nbsp;"
             return true;
        }

        },
         render: function(){
             return (
             <div>
                 <input type="text" className="form-control" placeholder="" aria-describedby="basic-addon1" maxLength='80' onBlur={this.validate} id="myemail"/>
                 <div id="emailerror" className="alert-message">&nbsp;</div>
                 <div id="emailerror2">&nbsp;</div>
             </div>
               )
}
});

//**********--- Passwordrecovery component ---**********
var Passwordrecovery = React.createClass({

    getInitialState: function () {
        return {
            isbutton: false,
            showSentMsg: false,
            showFailMsg: false
        };
    },
    valdate: function (event) {            
        var email = $('#myemail').val();
        if ($('#myemail').val() == "" || $('#myemail').val() == null) {
            error = "Please enter your email.\n";
            document.getElementById("emailerror").innerHTML = "Please enter your registered email."
            return false;
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($('#myemail').val()))) {
            error = "Please enter valid email.\n";
            document.getElementById("emailerror").innerHTML = "Please enter valid email"
            return false;
       }
       else {          
            document.getElementById("emailerror").innerHTML = "&nbsp;"       
            this.serverRequest = $.get(baseurl + "user/forgot/" + $('#myemail').val(), function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                    
                }
               if (result.items[0]['password_sent'] == 'Y') {
                   //document.getElementById("emailerror").innerHTML = "&nbsp;"
                   this.setState({ showSentMsg: true });
               }
               else {
                   this.setState({ showFailMsg: true });
               }
               this.setState({ isbutton: true });               
            }.bind(this));
            return true;
        }
    },
    handleSubmit: function () {    //**********--- Function to navigate to Signup page---**********
        //window.location = "/build/views/Football/signup/signup.html"
        window.location = "/signup/"
    },
    hideSentMsg: function () {
        this.setState({ showSentMsg: false })
    },
    hideFailMsg: function () {
        this.setState({ showFailMsg: false })
    },
    render: function () {
        return (<div> 
                    {this.state.showSentMsg?<div className="row bg-success">
                                        <div className="space-5"></div>
                                        <div className="container">
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                                                <img src="/images/success.svg" alt="Success" className="" width="30" />
                                            </div>
                                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 no-padding">

                                               <span className="sm-txt font-18">Please check your email to retrive your password</span>
                                            </div>
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                                                <img src="/images/close-icon.svg" alt="Success" width="20" className="pointer-hand margin-top-5" onClick={this.hideSentMsg} />
                                            </div>
                                        </div>
                                       <div className="space-5"></div>
                </div>:''}

                    {this.state.showFailMsg?<div className="row bg-error">
                                        <div className="space-5"></div>
                                        <div className="container">
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                                                <img src="/images/error.svg" alt="Success" className="" width="30" />
                                            </div>
                                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 no-padding">

                                               <span className="sm-txt font-18">Sorry, we are unable to process your request - please contact<a className="underline" target="_blank" href="https://playzoola.zendesk.com/hc/en-us/articles/209629225"> Customer Support.</a> </span>
                                            </div>
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                                                <img src="/images/close-icon.svg" alt="Success" width="20" className="pointer-hand margin-top-5" onClick={this.hideFailMsg} />
                                            </div>
                                        </div>
                                       <div className="space-5"></div>
                    </div>:''}
    <div className="container">
        <div className="space-10"></div>
        <div className="row">
            <div className="col-lg-5 col-md-7 col-sm-7 col-xs-12 col-centered">
                <div className="panel panel-default col-centered login-box">
                    <div className="padding-30">

                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="sm-txt">
                                    Enter your email below, and we'll email you instructions on how to change your password.
                                    If you are still unable to login, please &nbsp;
                                    {/*UAT 27-08-2016 : 23.Contact Customer Support*/}
                                    {/*<a  className="underline" href="https://playzoola.zendesk.com/hc/en-us" target="_blank">Contact Customer Services.</a>*/}
									<a className="underline" href="mailto:Help@playzoola.com">Contact Customer Services.</a>
                                </div>
                            </div>
                        </div>
                         <div className="space-5"></div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="tit-txt">
                                    Email:
                                </div>
                                <div className="">
                                    <Email />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                                <div className="col-lg-10 col-sm-10 col-xs-10 col-centered">
                                    <button type="submit" className="btn zoola-btn" onClick={this.valdate} disabled={this.state.isbutton}><h5 className="">Submit</h5></button>
                                </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>

        <div className="space-10"></div>
        <div className="row">
            <div className="col-lg-12">
                <h2 className="text-center">Don't have an account?</h2>
                <p className="text-center">Create one in seconds and join the playzoola community today! No card information required for sign-up.</p>
            </div>
        </div>
        <div className="space-10"></div>
        <div className="row">
                <div className="col-lg-5 col-sm-7 col-centered">
                    <button type="submit" className="btn zoola-btn" data-toggle="modal" data-target="#signup-with-email"><div className="btn-txt">Sign up</div></button>
                </div>
        </div>

        <div className="space-10"></div>
        </div>
    </div>
                     
             )
    }
});

