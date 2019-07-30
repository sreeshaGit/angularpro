/** @jsx React.DOM */
//**********--- call getCookie function to read cookie---**********
getCookie()

if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
    console.log("login")
}
else {
    is_loggedIn = false;
}

$(document).on("keypress", "#currentpwd", function (event) {
    if (event.ctrlKey == true && (event.which == '118' || event.which == '86')) {
        event.preventDefault();
    }
});
$(document).on("keypress", "#newpwd", function (event) {
    if (event.ctrlKey == true && (event.which == '118' || event.which == '86')) {
        event.preventDefault();
    }
});
$(document).on("keypress", "#confirmpwd", function (event) {
    if (event.ctrlKey == true && (event.which == '118' || event.which == '86')) {
        event.preventDefault();
    }
});

//**********--- Component to display change password ---**********
var ChangePassword = React.createClass({
    validateCurrentPassword: function () {
        var isError = "";
        var password = $('#currentpwd').val();       
        if ($('#currentpwd').val() == "" || $('#currentpwd').val() == null) {
            document.getElementById("currentpasserror").innerHTML = "Please enter your current password"
            return false;
        }
        else {
            document.getElementById("currentpasserror").innerHTML = "&nbsp;";
        }
        this.serverRequest = $.get(baseurl + "user/pwd/" + userId + ',' + sessionId + "," + $('#currentpwd').val(), function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            if (result.items[0]['valid_password'] == "N") {
                document.getElementById("currentpasserror").innerHTML = "Password you entered is incorrect"
            }
            else {                           
                document.getElementById("currentpasserror").innerHTML = "&nbsp;";
            }
        }.bind(this));
    },

    validateNewPassword: function () {
        var pass = $('#newpwd').val();
        var newpass = $('#confirmpwd').val();
        var illegalChars = /[\W_]/;
        var error = "";
        var isError = false;
        if ($('#newpwd').val() == "") {
            error = "please enter your password.\n";
            document.getElementById("newpasserror").innerHTML = "Please enter your new password."
            return false;
        }
        else if (($('#newpwd').val().length < 8) || ($('#newpwd').val().length > 20)) {
            error = "The password is the wrong length. \n";
            document.getElementById("newpasserror").innerHTML = "Password must be inbetween 8 to 20 characters."

            return false;
        }
        else if ($('#newpwd').val().indexOf(" ") >= 0) {
            error = "password must not contain any spaces.\n";
            document.getElementById("newpasserror").innerHTML = "Password must not contain any spaces."

            return false;
        }
        else if (illegalChars.test($('#newpwd').val())) {
            error = "The password doesnot contain special characters.\n";
            document.getElementById("newpasserror").innerHTML = "Password should not contain any special characters."

            return false;
        }
        else if (($('#newpwd').val().search(/[a-zA-Z]+/) == -1) || ($('#newpwd').val().search(/[0-9]+/) == -1)) {
            error = "The password must contain at least one numeral.\n";
            document.getElementById("newpasserror").innerHTML = "Password must contain one numeral."

            return false;
        } else if (($('#newpwd').val().search(/^(?=.*[A-Z]).{6,20}$/) == -1) || ($('#newpwd').val().search(/[0-9]+/) == -1)) {
            error = "password must contain one uppercase  character.\n";
            document.getElementById("newpasserror").innerHTML = "Password must contain one uppercase  character."

            return false;
        }
        else if (($('#newpwd').val().search(/^(?=.*[a-z]).{6,20}$/) == -1) || ($('#newpwd').val().search(/[0-9]+/) == -1)) {
            error = "password must contain one  lowercase character.\n";
            document.getElementById("newpasserror").innerHTML = "Password must contain one lowercase  character."

            return false;
        }
        else if ($('#newpwd').val() == $('#currentpwd').val()) {
            error = "Newpassword must not be equal to Currentpassword.\n";

            document.getElementById("newpasserror").innerHTML = "Newpassword must not be equal to Currentpassword."
            return false;
        }
        else {
            document.getElementById("newpasserror").innerHTML = "&nbsp;";
        }
},
    
    validateRepeatPassword: function () {
    var newpass = $('#confirmpwd').val();
    var illegalChars = /[\W_]/;
    var error = "";
    var isError = false;
    if ($('#confirmpwd').val() == "") {
        error = "please confirm your password.\n";
        document.getElementById("confirmpasserror").innerHTML = "Please confirm your password."
        return false;
    }
    else if ($('#confirmpwd').val() !== $('#newpwd').val()) {
        error = "Passwords do not match, please retype.\n";
        document.getElementById("confirmpasserror").innerHTML = "Passwords do not match, please retype."
        return false;
    }
    else {
        document.getElementById("confirmpasserror").innerHTML = "&nbsp;";
    }
    },

    validateChangePassword: function () {
            var password = $('#currentpwd').val();
            var pass = $('#newpwd').val();
            var newpass = $('#confirmpwd').val();
            var illegalChars = /[\W_]/;
            var error = "";
            var isError = false;       
            if ($('#currentpwd').val() == "" || $('#currentpwd').val() == null) {
                document.getElementById("currentpasserror").innerHTML = "Please enter your current password"
                isError = true;
            }
            else {
                document.getElementById("currentpasserror").innerHTML = "&nbsp;";
                this.serverRequest = $.get(baseurl + "user/pwd/" + userId + ',' + sessionId + "," + $('#currentpwd').val(), function (result) {
                    if (typeof result != 'object') {
                        result = JSON.parse(result)
                    }
                    if (result.items[0]['valid_password'] == "N") {
                        document.getElementById("currentpasserror").innerHTML = "Password you entered is incorrect"
                    }
                    else {
                        document.getElementById("currentpasserror").innerHTML = "&nbsp;";
                    }
                }.bind(this));
            }
            

            if ($('#newpwd').val() == "") {
                document.getElementById("newpasserror").innerHTML = "Please enter your new password."
                isError = true;
            }
            else if (($('#newpwd').val().length < 8) || ($('#newpwd').val().length > 20)) {
                document.getElementById("newpasserror").innerHTML = "Password must be inbetween 8 to 20 characters."

                isError = true;
            }
            else if ($('#newpwd').val().indexOf(" ") >= 0) {
                document.getElementById("newpasserror").innerHTML = "Password must not contain any spaces."

                isError = true;
            }
            else if (illegalChars.test($('#newpwd').val())) {
                document.getElementById("newpasserror").innerHTML = "Password should not contain any special characters."

                isError = true;
            }
            else if (($('#newpwd').val().search(/[a-zA-Z]+/) == -1) || ($('#newpwd').val().search(/[0-9]+/) == -1)) {
                document.getElementById("newpasserror").innerHTML = "Password must contain one numeral."

                isError = true;
            } else if (($('#newpwd').val().search(/^(?=.*[A-Z]).{6,20}$/) == -1) || ($('#newpwd').val().search(/[0-9]+/) == -1)) {
                document.getElementById("newpasserror").innerHTML = "Password must contain one uppercase  character."

                isError = true;
            }
            else if (($('#newpwd').val().search(/^(?=.*[a-z]).{6,20}$/) == -1) || ($('#newpwd').val().search(/[0-9]+/) == -1)) {              
                document.getElementById("newpasserror").innerHTML = "Password must contain one lowercase  character."

                isError = true;
            }
            else if ($('#newpwd').val() == $('#currentpwd').val()) {
                document.getElementById("newpasserror").innerHTML = "Newpassword must not be equal to Currentpassword."
                isError = true;
            }
            else {
                document.getElementById("newpasserror").innerHTML = "&nbsp;";
            }
            if ($('#confirmpwd').val() == "") {
                document.getElementById("confirmpasserror").innerHTML = "Please confirm your password."
                isError = true;
            }
            else if ($('#confirmpwd').val() !== $('#newpwd').val()) {
                document.getElementById("confirmpasserror").innerHTML = "Passwords do not match, please retype."
                isError = true;
            }
            if (isError) {
                return false;
            }
            else {
                document.getElementById("confirmpasserror").innerHTML = "&nbsp;";
                this.serverRequest = $.get(baseurl + "user/change/" + userId + "," + sessionId + "," + $('#newpwd').val(), function (result) {
                    if (typeof result != 'object') {
                        result = JSON.parse(result)
                    }
                    if (result.items[0]['pwd_changed'] == 'Y') {                       
                        document.getElementById("changepasserror").innerHTML = "You have sucessfully changed your password"
                        document.getElementById('currentpwd').value = ""
                        document.getElementById('newpwd').value = ""
                        document.getElementById('confirmpwd').value = ""
                        document.getElementById("currentpasserror").innerHTML = "&nbsp;"
                        document.getElementById("newpasserror").innerHTML = "&nbsp;"
                        document.getElementById("confirmpasserror").innerHTML = "&nbsp;"
                    }
                    else{
                        document.getElementById("changepasserror").innerHTML = "Unable to change password,Please try again"
                        document.getElementById('currentpwd').value = ""
                        document.getElementById('newpwd').value = ""
                        document.getElementById('confirmpwd').value = ""
                    }
                }.bind(this));
                return true;
            }
        },

    componentDidMount: function () {
        $(document).on('keyup', '#currentpwd', function (e) {
            if (e.keyCode == 13) {
                $("#key").click();
            }
        })

        $(document).on('keyup', '#newpwd', function (e) {
            if (e.keyCode == 13) {
                $("#key").click();
            }
        })       

        //$(document).on('keyup', '#confirmpwd', function (e) {
        //    if (e.keyCode == 13) {
        //        $("#key").click();
        //    }
        //})
    },

    render: function () {
        return (
   <div>  
        <div className="container-fluid header">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                    <h3> Change Password</h3>
                </div>
            </div>
        </div>
        </div>
    <div className="space-5"></div>
    <div className="container">       
        <div className="space-10"></div>
        <div className="row">
            <div className="col-lg-5 col-md-7 col-sm-7 col-xs-12 col-centered">
                <div className="zoola-box col-centered">
                    <div className="padding-30">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="tit-txt">
                                    Current Password
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="" aria-describedby="basic-addon1" maxLength='20' onBlur={this.validateCurrentPassword} id="currentpwd"/>
                                    <div id="currentpasserror" className="alert-message">&nbsp;</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="tit-txt">
                                    New Password:
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="" aria-describedby="basic-addon1" maxLength='20' onBlur={this.validateNewPassword} id="newpwd"/>
                                    <div id="newpasserror" className="alert-message">&nbsp;</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="tit-txt">
                                    Repeat New Password:
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="" aria-describedby="basic-addon1" maxLength='20' onBlur={this.validateRepeatPassword} id="confirmpwd"/>
                                    <div id="confirmpasserror" className="alert-message">&nbsp;</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-5"></div>
                <button className="btn zoola-btn" onClick={this.validateChangePassword} id='key'><div className="btn-txt">Change password</div></button>
            </div>
        </div>
        <div className="space-10"></div>
        <div id="changepasserror" className="text-center green"></div>
        <div className="space-10"></div>
        <div className="row">           
            <div className="col-lg-12">
                <p className="text-center">Go back to <span className="underline"><a href={"/myprofile/?islog=" + is_loggedIn}>My Profile</a></span></p>               
            </div>
        </div>
        <div className="space-10"></div>
        <div className="space-10"></div>
    </div>
    </div>         
                  )
                       }
});

