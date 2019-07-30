/** @jsx React.DOM */
var is_loggedIn = false;
getCookieForNonAuth()
//**********--- Header component ---**********
var Header = React.createClass({
    render: function () {
        return (
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                               <h3>Login</h3>
                        </div>
        )
    }
});


//**********--- Email component ---**********
var Email = React.createClass({
    valdate: function (event) {      // Function to validate Email
            var error = "";
            var val = event.target.value;
            var illegalChars = /[\W_]/;
            if (val == "" || val == null) {              
            document.getElementById("usernameerror").innerHTML = "Please enter your username/email"
            $(".invalid-user").html("");
            return false;
            }
            else if ((event.target.value.length < 4)){
                error = "The username you entered is incorrect. \n";
                document.getElementById("usernameerror").innerHTML = "Username/Email you entered is incorrect."
                $(".invalid-user").html("");
                return false;
            }

            else if (event.target.value.indexOf(" ") >= 0) {
                error = "Username/Email you entered is incorrect.\n";
                document.getElementById("usernameerror").innerHTML = "Username/Email you entered is incorrect."
                $(".invalid-user").html("");
                return false;
            }

            else {
                document.getElementById("usernameerror2").innerHTML = "";
                document.getElementById("usernameerror").innerHTML = "";
                return true;
            }
            },
      
        render: function(){
        return(
            <div>
                 <input type="text" className="form-control" placeholder="" aria-describedby="basic-addon1" maxLength='80' onChange={this.handleMaxLength} onBlur={this.valdate} id="email1"/>
                 <div id="usernameerror" className="alert-message">  </div>
                 <div id="usernameerror2">  </div>
            </div>
               )
        }
});

//**********--- Password component ---**********
var Pwd = React.createClass({
    valdate: function (event) {         // Function to validate Password
        var error = "";
        var value = event.target.value;
        var illegalChars = /[\W_]/; // allow only letters and numbers

        if (event.target.value == "") {
            value.background = 'Yellow';
            error = "You didn't enter a password.\n";
            document.getElementById("paswrderror").innerHTML = "Please enter your password."
            $(".invalid-user").html("");
            return false;
        }
        else if ((event.target.value.length < 8) || (event.target.value.length > 20)) {
            error = "The password is the wrong length. \n";
            document.getElementById("paswrderror").innerHTML = "Password you entered is incorrect."
            $(".invalid-user").html("");
           return false;
        } else if (illegalChars.test(event.target.value)) {
            error = "The password contains illegal characters.\n";
            document.getElementById("paswrderror").innerHTML = "Password you entered is incorrect."
            $(".invalid-user").html("");
            return false;
        } else if ((event.target.value.search(/[a-zA-Z]+/) == -1) || (event.target.value.search(/[0-9]+/) == -1)) {
            error = "The password must contain at least one numeral.\n";
            document.getElementById("paswrderror").innerHTML = "Password you entered is incorrect."
            $(".invalid-user").html("");
            return false;
        } else if ((event.target.value.search(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/) == -1) || (event.target.value.search(/[0-9]+/) == -1)) {
            error = "The password must contain at least one upper case and one lower case.\n";
            document.getElementById("paswrderror").innerHTML = "Password you entered is incorrect."
            $(".invalid-user").html("");
            return false;
        } else {
            document.getElementById("paswrderror1").innerHTML = ""
            document.getElementById("paswrderror").innerHTML = ""
            return true;
        }
        },
        
    render: function(){
        return(
                    <div>
                          <input type="password" className="form-control" placeholder=""  aria-describedby="basic-addon1"  maxLength='20' onChange={this.handleMaxLength}  onBlur={this.valdate} id="pwd1"/>
                          <div id="paswrderror" className="alert-message"></div>
                          <div id="paswrderror1"></div>
                    </div>
                   )
       }
});

//**********--- Login component ---**********
var Login = React.createClass({
    componentDidMount: function () {
       $(document).on('keyup','#email1',function(e){
          if(e.keyCode==13)
            {
                $("#key").click();
            }
        })

        $(document).on('keyup','#pwd1',function(e){
          
            if(e.keyCode==13)
            {
                $("#key").click();
            }
        })
            
    },

    valdate: function (event) {      
        var error = "";
        var isError = false;
        var value = event.target.value;
        var illegalChars = /[\W_]/;
        var pass = $('#pwd1').val();
        var user = $('#email1').val();
        if ($('#pwd1').val() == "") {
            error = "please enter your password.\n";
            document.getElementById("paswrderror").innerHTML = "Please enter your password."
            $(".invalid-user").html("");
            isError = true;
        }
        else if (($('#pwd1').val().length < 8) || ($('#pwd1').val().length > 20)) {
            error = "The password is the wrong length. \n";
            document.getElementById("paswrderror").innerHTML = "Password you entered is incorrect."
            $(".invalid-user").html("");
            isError = true;
        } else if (illegalChars.test($('#pwd1').val())) {
            error = "The password contains illegal characters.\n";
            document.getElementById("paswrderror").innerHTML = "Password you entered is incorrect."
            $(".invalid-user").html("");
            isError = true;
        } else if (($('#pwd1').val().search(/[a-zA-Z]+/) == -1) || ($('#pwd1').val().search(/[0-9]+/) == -1)) {
            error = "The password must contain at least one numeral.\n";
            document.getElementById("paswrderror").innerHTML = "Password you entered is incorrect."
            $(".invalid-user").html("");
            isError = true;
        } else if (($('#pwd1').val().search(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/) == -1) || ($('#pwd1').val().search(/[0-9]+/) == -1)) {
            error = "The password must contain at least one upper case and one lower case.\n";
            document.getElementById("paswrderror").innerHTML = "Password you entered is incorrect."
            $(".invalid-user").html("");
            isError = true;
        }
        if ($('#email1').val() == "") {
            error = "please enter your username/Email.\n";
            document.getElementById("usernameerror").innerHTML = "Please enter your username/email."
            $(".invalid-user").html("");
            isError = true;
        }
        else if (($('#email1').val().length < 4)) {
            error = "The username you entered is incorrect. \n";
            document.getElementById("usernameerror").innerHTML = "Username/Email you entered is incorrect."
            $(".invalid-user").html("");
            isError = true;
        }

        else if ($('#email1').val().indexOf(" ") >= 0) {
            error = "Username/Email you entered is incorrect.\n";
            document.getElementById("usernameerror").innerHTML = "Username/Email you entered is incorrect."
            $(".invalid-user").html("");
            isError = true;
        }
        if (isError) {
            return false;
        }

        else {
            this.serverRequest = $.get(baseurl + "user/login/" + $('#email1').val() + ',' + $('#pwd1').val(), function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                if (typeof result == 'object') {
                    if (result.items[0]['usr_id'] != 0 && result.items[0]['session_id'] != 0) {
                        document.getElementById("usernameerror2").innerHTML = ""
                        document.getElementById("paswrderror1").innerHTML = ""
                        var cookieValueJson = { "userId": "" + result.items[0]['usr_id'], "session_id": "" + result.items[0]['session_id'] }                        
                        var cookieValue = "PZdata=" + JSON.stringify(cookieValueJson) + "; path=/";
                        document.cookie = cookieValue;
                        
                        //console.log(result.items[0]['usr_id']);
                        $(".invalid-user").html("");
                        //window.location = "/build/views/Football/GameSelection/gameSelection.html?islog=true"
                        window.location = "/gameselection/?islog=true"
                        return false;
                    }
                    else {
                        $(".invalid-user").html("Invalid username or password");
                        document.getElementById("paswrderror").innerHTML = "";
                        document.getElementById("usernameerror").innerHTML = ""
                    }
                }
                
             }.bind(this));
          }
       
       },
   
    handleSubmit: function () {     //**********--- Function to navigate to Signup page---**********
        window.location = "/signup"
      },
    render: function () {
        return (<div>
                         
                       
                         <div className="row">
                            <div className="col-lg-5 col-md-7 col-sm-7 col-xs-12 col-centered">
                                 <div className="col-centered login-box">
                                        <div className="padding-30">
                                            <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="tit-txt">
                                                            Username/Email:
                                                        </div>
                                                        <div className="form-group">
                                                            <Email/>
                                                        </div>
                                                    </div>
                                            </div>
                                            <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="tit-txt">
                                                                Password:
                                                        </div>
                                                        <div className="form-group">
                                                        <Pwd/>
                                                            <div className="invalid-user text-center">

                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>
                                            <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                                                        <div className="sm-txt text-right" >
                                                                <a href="/passwordrecovery">Password forgotten?</a>
                                                        </div>
                                                </div>
                                            </div>
                                            <div className="space-10"></div>
                                            <div className="row">
                                                    <div className="col-lg-10 col-sm-10 col-centered">
                                                        <button type="submit" className="btn zoola-btn" onClick={this.valdate} id='key'><h5 className="">Login</h5></button>
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
                                <p className="text-center">Create one in seconds and join the playzoola community today! <br/>No card information required for sign-up.</p>
                            </div>
                        </div>
                        <div className="space-10"></div>
                        <div className="row">
                                <div className="col-lg-5 col-sm-7 col-centered">
                                    <button type="submit" className="btn zoola-btn" onClick={this.handleSubmit}><div className="btn-txt" >Sign up</div></button>
                                </div>
                        </div> 
                        <div className="space-10"></div>

              </div>
             )
    }
});

