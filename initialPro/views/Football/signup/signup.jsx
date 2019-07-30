/** @jsx React.DOM */
var is_loggedIn = false;
//**********--- Subheader component ---**********
var Subheader = React.createClass({
    render: function () {
        return (
                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                               <h3>CREATE AN ACCOUNT</h3>
                     </div>
        )
    }
});

//**********--- Email component ---**********
var Email = React.createClass({
    valdate: function (event) {    // Function to validate Email
        var error = "";
        var email = event.target.value;
        apos = event.target.value.indexOf("@");
        dotpos = event.target.value.lastIndexOf(".");
        if (email == "" || email == null)
        {
            document.getElementById("emailerror").innerHTML = "Please Enter Your Email"

            return false;
        }
       
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value))) {
            document.getElementById("emailerror").innerHTML = "Please Enter Valid Email"
            
                return false;
        }
        else {
            document.getElementById("emailerror").innerHTML = ""
            this.serverRequest = $.get(baseurl + "user/username/" + email, function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                if (result.items[0]['valid_username'] == 'N') {
                    document.getElementById("emailerror").innerHTML = "Email Already Exists."
                   
                    return false;
                }
            }.bind(this));
            return true;
        }
           
    },
    render: function(){
        return(
            <div>
                
                <input type="text" className="form-control" placeholder="" aria-describedby="basic-addon1" maxLength='80'  onChange={this.handleMaxLength} onBlur={this.valdate} id="email1" />
            <div id="emailerror" className="alert-message">  </div>
                <div id="emailerror2">  </div>
                </div>
               )
}
});

//**********--- Username component ---**********
var Username = React.createClass({
    valdate: function (event) {          // Function to validate Username
        var error = "";
        var val = event.target.value;
        
        var illegalChars = /[\W_]/;
        if (val == "" || val == null) {
                
            document.getElementById("usernameerror").innerHTML = "Please enter your username"
                    
            return false;
        }
        else if ((event.target.value.length < 4) || (event.target.value.length > 12)) {
            error = "The username is of wrong length. \n";
            document.getElementById("usernameerror").innerHTML = "Username must be inbetween 4 to 12 characters."

            return false;
        }
       
        else if (illegalChars.test(event.target.value)) {
            error = "username must be alphanumeric.\n";
            document.getElementById("usernameerror").innerHTML = "Username must be alphanumeric."
            
            return false;
        }
       
        else {
            
            document.getElementById("usernameerror").innerHTML = ""
            this.serverRequest = $.get(baseurl + "user/username/" + val, function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                if (result.items[0]['valid_username'] == 'N') {
                    document.getElementById("usernameerror").innerHTML = "Username already exists."
                    
                    return false;
                }
            }.bind(this));
           
            return true;
        }
    },
    render: function(){
        return(
            <div>
                <input type="text" className="form-control" placeholder="" aria-describedby="basic-addon1" maxLength='12' onChange={this.handleMaxLength} onBlur={this.valdate}  id="user"/>
                <div id="usernameerror" className="alert-message">  </div>
                <div id="usernameerror2">  </div>
            </div>
               )
}
});

//**********--- Password component ---**********
var Password = React.createClass({
    valdate: function (event) {        // Function to validate Password
        var value = event.target.value;
        var illegalChars = /[\W_]/; // allow only letters and numbers

        if (event.target.value == "") {
            value.background = 'Yellow';
            error = "You didn't enter a password.\n";
            
            document.getElementById("paswrderror").innerHTML = "Please enter your password."
            
            return false;
        }
        else if ((event.target.value.length < 8) || (event.target.value.length > 20)) {
            error = "The password is the wrong length. \n";
            document.getElementById("paswrderror").innerHTML = "Password must be inbetween 8 to 20 characters."
            
            return false;
        }
        else if (event.target.value.indexOf(" ") >= 0) {
            error = "Password must not contain any spaces.\n";
            document.getElementById("paswrderror").innerHTML = "Password must not contain any spaces."

            return false;
        }
        else if (illegalChars.test(event.target.value)) {
            error = "The password doesnot contain special characters.\n";
            document.getElementById("paswrderror").innerHTML = "Password should not contain any special characters."
            
            return false;
        }
        else if ((event.target.value.search(/[a-zA-Z]+/) == -1) || (event.target.value.search(/[0-9]+/) == -1)) {
            error = "The password must contain at least one numeral.\n";
            document.getElementById("paswrderror").innerHTML = "Password must contain one numeral."
           
            return false;
        } else if ((event.target.value.search(/^(?=.*[A-Z]).{6,20}$/) == -1) || (event.target.value.search(/[0-9]+/) == -1)) {
            error = "Password must contain one uppercase  character.\n";
            document.getElementById("paswrderror").innerHTML = "Password must contain one uppercase  character."
           
            return false; 
        }
        else if ((event.target.value.search(/^(?=.*[a-z]).{6,20}$/) == -1) || (event.target.value.search(/[0-9]+/) == -1)) {
            error = "Password must contain one  lowercase character.\n";
            document.getElementById("paswrderror").innerHTML = "Password must contain one lowercase  character."

            return false;
        }

        else {
            document.getElementById("paswrderror1").innerHTML = ""
            document.getElementById("paswrderror").innerHTML = ""
           
            return true;
        }
    },
    render: function(){
        return(
                    <div>
                          <input type="password" className="form-control" placeholder="" aria-describedby="basic-addon1"   maxLength='20'  onChange={this.handleMaxLength} onBlur={this.valdate} id="pwd"/>
                          <div id="paswrderror" className="alert-message"> </div>
                          <div id="paswrderror1"></div>
                    </div>
                   )
}
});

//**********--- Signup component ---**********
var Signup = React.createClass({
    componentDidMount: function () {
        $(document).on('keyup', '#email1', function (e) {
            if (e.keyCode == 13) {
                $("#key").click();
            }
        })

        $(document).on('keyup', '#user', function (e) {
            if (e.keyCode == 13) {
                $("#key").click();
            }
        })

        $(document).on('keyup', '#pwd', function (e) {

            if (e.keyCode == 13) {
                $("#key").click();
            }
        })
        $(document).on('keyup', '#checkbox1', function (e) {

            if (e.keyCode == 13) {
                $("#key").click();
            }
        })

    },

    valdate: function (event) {      
        var email = $('#email1').val();
        var user = $('#user').val();

        var pass = $('#pwd').val();
        var value = event.target.value;
        var illegalChars = /[\W_]/;
       
        var checkboxValue = "";
        var error = "";
        var isError = false;
        
      
        if ($('#email1').val() == "") {
            error = "Please enter your Email.\n";
           
           
            document.getElementById("emailerror").innerHTML = "Please enter your email."
           
            isError = true;
        }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($('#email1').val()))) {
            document.getElementById("emailerror").innerHTML = "Please enter valid email"

            isError = true;
        }
        else{
                 $.ajax({
                 type: "GET",
                 url: baseurl + "user/username/" + $('#email1').val(),
                 async: false,
                 success: function (result) {
                     result = JSON.parse(result);
                 if (result.items[0]['valid_username'] == 'N') {
                    document.getElementById("emailerror").innerHTML = "Email already exists."
                    isError = true;
                }
            }
            });
        
            }

        if ($('#user').val() == "") {
            error = "Please enter your username.\n";
           
            document.getElementById("usernameerror").innerHTML = "Please enter your username."
            
            isError = true;

        }
        else if (($('#user').val().length < 4) || ($('#user').val().length > 12)) {
            error = "Username Must Be Inbetween 4 To 12 Characters. \n";
            document.getElementById("usernameerror").innerHTML = "Username must be inbetween 4 to 12 characters."

            isError = true;
        }
        else if (illegalChars.test($('#user').val())) {
            error = "Username must be alphanumeric.\n";
            document.getElementById("usernameerror").innerHTML = "Username must be alphanumeric."

            isError = true;
        }
           
        else {
            $.ajax({
                type: "GET",
                url: baseurl + "user/username/" + $('#user').val(),
                async: false,
                success: function (result) {
                    result = JSON.parse(result);
                    if (result.items[0]['valid_username'] == 'N') {
                        document.getElementById("usernameerror").innerHTML = "Username already exists."
                        isError = true;
                    }
                }
            });
            
        }

        if ($('#pwd').val() == "") {
            error = "Please enter your password.\n";

            document.getElementById("paswrderror").innerHTML = "Please enter your password."

            isError = true;
        }
        else if (($('#pwd').val().length < 8) || ($('#pwd').val().length > 20)) {
            error = "The password is the wrong length. \n";
            document.getElementById("paswrderror").innerHTML = "Password must be inbetween 8 to 20 characters."
           
            return false;
        }
        else if ($('#pwd').val().indexOf(" ") >= 0) {
            error = "Password must not contain any spaces.\n";
            document.getElementById("paswrderror").innerHTML = "Password must not contain any spaces."

            return false;
        }
        else if (illegalChars.test($('#pwd').val())) {
            error = "The password doesnot contain special characters.\n";
            document.getElementById("paswrderror").innerHTML = "Password should not contain any special characters."

            return false;
        }
        else if (($('#pwd').val().search(/[a-zA-Z]+/) == -1) || ($('#pwd').val().search(/[0-9]+/) == -1)) {
            error = "The password must contain at least one numeral.\n";
            document.getElementById("paswrderror").innerHTML = "Password must contain one numeral."

            return false;
        } else if (($('#pwd').val().search(/^(?=.*[A-Z]).{6,20}$/) == -1) || ($('#pwd').val().search(/[0-9]+/) == -1)) {
            error = "Password must contain one uppercase  character.\n";
            document.getElementById("paswrderror").innerHTML = "Password must contain one uppercase  character."

            return false;
        }
        else if (($('#pwd').val().search(/^(?=.*[a-z]).{6,20}$/) == -1) || ($('#pwd').val().search(/[0-9]+/) == -1)) {
            error = "Password must contain one  lowercase character.\n";
            document.getElementById("paswrderror").innerHTML = "Password must contain one lowercase  character."

            return false;
        }
         else if ($('#pwd').val() == $('#user').val() || $('#pwd').val() == $('#email1').val()) {
            error = "Password must not be equal to username.\n";

            document.getElementById("paswrderror").innerHTML = "Password must not be equal to Username and email."
            return false;
        }
        
        else {
            document.getElementById("paswrderror1").innerHTML = ""
            
        }
     
        if (!$('#checkbox1').is(":checked"))
        {
            error = "You must agree the terms first.\n";
            checkboxValue ='N';
           
            document.getElementById("checkbox1error").innerHTML = "You must agree the terms and conditions first."

            isError = true;
        }
        else {
            checkboxValue ='Y';
            document.getElementById("checkbox1error").innerHTML = ""
        }
        if (isError) {
            return false;
        }
   
        this.serverRequest = $.get(baseurl + "user/signup/" + $('#email1').val() + ',' + $('#user').val() + ',' + $('#pwd').val() + ',' + checkboxValue, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            if (result.items[0]['usr_id'] != 0 && result.items[0]['session_id'] != 0) {
                 document.getElementById("usernameerror2").innerHTML = ""
                 //var cookieValueJson = { "userId": "10024", "session_id": "97025770461423973935" }
                 var cookieValueJson = { "userId": "" + result.items[0]['usr_id'], "session_id": "" + result.items[0]['session_id'] }
                 var cookieValue = "PZdata=" + JSON.stringify(cookieValueJson) + "; path=/";
                 document.cookie = cookieValue;
                 
                //window.location = "/build/views/Football/GameSelection/gameSelection.html?islog=true"
                 window.location = "/gameselection/?islog=true"
                 return false;
            }
            
         }.bind(this));
        return true
    },
    render: function () {
        return (<div>
                
                <div className="row">
                    <div className="col-lg-12">
                        <h2 className="text-center">Think you know Football?</h2>
                        <div className="space-5"></div>
                        <p className="text-center">Join playzoola and bet against other players, not the bookies. </p>
                        <div className="space-5"></div>
                        <p className="text-center">You can also create your own games and play against your mates.</p>
                    </div>
                </div>
                <div className="space-10"></div>
        <div className="row">  
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-12 col-centered">
                <div className="login-box">
                    <div className="padding-30">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="tit-txt">
                                    Pick a username:
                                </div>
                                <div className="form-group">
                                    <Username/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="tit-txt">
                                    Email:
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
                                    <Password/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="forgotten">
                                    <div className="checkbox margin-bottom-15">
                                        <input id="checkbox1" className="styled" type="checkbox" />
                                        <label>
                                            &nbsp; I'm over 18
                                        </label>
                                    </div>
                                    <div className="checkbox">
                                        <input id="checkbox2" className="styled" type="checkbox" />
                                        <label>
                                            &nbsp; I agree to the &nbsp;<a href="" className="underline">Terms and Conditions</a>.
                                        </label>
                                    </div>                                
                                </div>
                                <div id="checkbox1error" className="alert-message"> </div>
                            </div>
                        </div>

                        <div className="space-10"></div>
                        <div className="row">
                                <div className="col-lg-10 col-sm-10 col-centered">
                                    <button type="submit" className="btn zoola-btn" onClick={this.valdate} id='key'><h5 className="">Sign up</h5></button>
                                </div>
                        </div>

                    </div>
                    
                </div>
            </div>
            
        </div>
        <div className="space-10"></div>
        <div className="space-10"></div>
        
              </div>                   
             )
    }
});
