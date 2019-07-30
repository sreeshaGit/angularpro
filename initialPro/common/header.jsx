

// ************--- list of menu items ---************
var listItem= [
        /*{
            itemName:"Sign up",
            img:"/images/menu-popup-signup.svg",
            url: "",
            forUser:0
        },*/
         {
             itemName: "My account",
             img: "/images/profile-2.png",
             url: "/build/views/Football/myprofile/myprofile.html",
             forUser: 1
         },
         {
             itemName: "Notifications",
             img: "/images/menu-popup-notification.svg",
             url: "/build/views/Football/Notification/notifications/notifications.html",
             forUser: 1
             
         },
         {
             itemName: "Dashboard",
             img: "/images/menu-popup-dashboard.svg",
             url: "/build/views/Football/Dashboard/dashboard.html",
             forUser: 1
         },
         {
             itemName: "Zoola games",
             img: "/images/menu-popup-gameselection.svg",
             url: "/build/views/Football/GameSelection/gameSelection.html",
             forUser: 2
         },
        // {
        //    itemName: "Calendar",
        //    img: "/images/menu-popup-calendar.svg",
        //    // url:"",
        //    forUser: 0
        //},
        //{
        //    itemName: "Team stats",
        //    img: "/images/menu-popup-teamstats.svg",
        //    url:"/build/views/Football/teamstats/teamstats.html",
        //    forUser: 1
        //},
        {
            itemName: "Help Centre",
            img: "/images/menu-popup-help.svg",
            url: "https://playzoola.zendesk.com/hc/en-us",
            forUser: 2
        },

        /*
         {
             itemName: "Login",
             img: "",
             url: "",
             forUser: 0
         },
         {
             itemName: "Logout",
             img: "/images/menu-popup-logout.svg",
             url: "/build/views/Football/GameSelection/gameSelection.html?islog=false",
             forUser: 1
         },
        
        {
            itemName:"Create Game",
            img:"/images/menu-popup-create.svg",
           //url:"/build/views/Football/Createnewgame/createnewgame.html",
            forUser:1
        },
       
        {
            itemName:"Stats Room",
            img:"/images/menu-popup-stats.svg",
            // url:"",
            forUser:1
        },
       
        {
            itemName: "Responsible gambling",
            img: "/images/menu-popup-r-gambling.svg",
            url: "/build/views/Football/complianceDepositLimitTimeOut/complianceDepositLimitTimeOut.html",
            forUser: 1
        },
        */
       
        
        

    ]

$(document).on("keypress","#pwd1",function (event){
    if (event.ctrlKey==true && (event.which == '118' || event.which == '86')) {
        event.preventDefault();
    }
});

$(document).on("keypress","#pwd",function (event){
    if (event.ctrlKey==true && (event.which == '118' || event.which == '86')) {
        event.preventDefault();
    }
});
$(document).on("keypress","#conformpwd",function (event){
    if (event.ctrlKey==true && (event.which == '118' || event.which == '86')) {
        event.preventDefault();
    }
});
// ************--- Component to display header ---************
var SupHeaderThis;
var SupHeader = React.createClass({
    getInitialState: function () {
        return {
            Signup: [],
            menuItems:[],
            items:{},
            checkbox1:'',
            checkbox2:'',
            checkbox3:'',
            userMsg:'',
            showLoginSMsg:false,
            showLoginFMsg:false
        }
    },
    searchItems:function(){ // Function to seperate menu items based on login or not
        var filterItems = listItem.filter(function (item) {
            if(item.itemName.toLowerCase().indexOf($("#menusearch").val().toLowerCase()) != -1)
            {
                if(is_loggedIn)
                {
                    if(item.forUser == 1 || item.forUser == 2){
                        return true
                    }
                }
                
                else{
                    if(item.forUser == 0 || item.forUser == 2){
                        return true
                    }
                }
            }
            
        });
        this.setState({menuItems:filterItems})   
    },
    componentWillMount: function (itemName) {
        //Phase2-104 : If I log out and go back it takes me to a logged in state but not attributed to a user.
        var url = window.location.pathname;
        var filePath = '.' + url.split("?")[0];
        
        if ((filePath == './' || filePath.indexOf('Index') >= 0 || filePath.indexOf('GameSelection') >= 0 || filePath.indexOf('passwordrecovery') >= 0 || filePath.indexOf('LeaderBoard') >= 0 ) && getCookie1('PZdata').length <= 0) {
            if((getParameterByName("islog") && getParameterByName("islog") == 'true') && getCookie1('PZdata').length <= 0){
                //console.log('ssssssss');
                window.location="/build/views/Football/Index/index.html"
            }   
        }else if(getCookie1('PZdata').length > 0){
                
        }else if((getParameterByName("islog") && getParameterByName("islog") == 'true') && getCookie1('PZdata').length <= 0){

            window.location="/build/views/Football/Index/index.html"
        }else{
            
            window.location="/build/views/Football/Index/index.html"
        }
        SupHeaderThis = this;
        var filterItems = listItem.filter(function (item) {
            if(is_loggedIn)
            {
                if(item.forUser == 1 || item.forUser == 2){
                    return true
                }
            }
            else{
                if(item.forUser == 0 || item.forUser == 2){
                    return true
                }
            }
            
        });
        this.setState({menuItems:filterItems})  
        var data = {"items":[{"currency":"GBP","balance":12.34,"messages":3,"notifications":2}]};
        if(is_loggedIn)
        {
            if(userId && sessionId){
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

                
            }
            else{
                console.log("is not logged in")
            }
        }
       
             
    },

    goToURL :function(url){ //Function to navigate to particular url
        if(url!="" && url !=null)
        {
            window.location=url+"?islog="+is_loggedIn
        }
    },
    
    gotoGames:function(){ //Function to navigate to game selection page
        window.location="/build/views/Football/GameSelection/gameSelection.html?islog="+is_loggedIn
    },
    gotoFixtures:function(){ // Function to navigate to fixture selection page
        window.location="/build/views/Football/FixtureSelection/fixtureSelection.html?islog="+is_loggedIn
    },
    gotoSignup:function(){ // Function to navigate to signup page
        //window.location="/build/views/Football/Signup/signup.html"
        $("#MenuModal").modal('hide')
        $("#signup-with-email").modal('show')
    },
    gotoDashboard:function(){ // Function to navigate to dashboard page
        window.location="/build/views/Football/Dashboard/dashboard.html?islog="+is_loggedIn
    },
    gotoNotifications : function(){
        window.location = "/build/views/Football/Notification/notifications/notifications.html?islog=" + is_loggedIn
    },
    logoutUser:function(){ // Function to make user logout
        console.log("logout function")
        this.serverRequest = $.get(baseurl+"user/logout/"+userId, function (result) {
            
            var now = new Date();
            var time = now.getTime();
            time -= 3600 * 1000 *24;
            now.setTime(time);
            console.log(now)
            var cookieValue = "PZdata={}; expires=" + now.toUTCString() + "; path=/; ";
            document.cookie = cookieValue;
            
            window.location="/build/views/Football/Index/index.html?islog=" + false
            
        }.bind(this));
        
    },
    agree: function () {
        $("#alert-modal").modal('hide');
    },
    gotoTopup: function () {  
        if(this.state.items.status=='L')
        {
            $("#alert-modal").modal('show');
        }
       else if(this.state.items.status=='P' || this.state.items.status=='T' ||this.state.items.status=='N')
        {
            window.location = "/build/views/Football/QuickTopUp/Quick-Top-Up.html?islog="+is_loggedIn
        }
        else{
            window.location = "/build/views/Football/Glory/topUp/topUp.html?islog="+is_loggedIn
        }
    },

  
    validateLoginUsername: function (event) {      // Function to validate Email
        var error = "";       
        var value = event.target.value;
        var illegalChars = /[\W_]/;       
        var email = $('#email1').val();
       
        if ($('#email1').val() == "") {
            error = "please enter your username/Email.\n";
            document.getElementById("usernameerror").innerHTML = "Please enter your username/email."
            $(".invalid-user").html("&nbsp;");
            return false;
        }
        else if (($('#email1').val().length < 4)) {
            error = "The username you entered is incorrect. \n";
            document.getElementById("usernameerror").innerHTML = "Incorrect username/ Email. "
            $(".invalid-user").html("&nbsp;");
            return false;
        }

        else if ($('#email1').val().indexOf(" ") >= 0) {
            error = "Username/Email you entered is incorrect.\n";
            document.getElementById("usernameerror").innerHTML = "Incorrect username/ Email. "
            $(".invalid-user").html("&nbsp;");
            return false;
        }     
        else {           
            document.getElementById("usernameerror").innerHTML = "&nbsp;";
            document.getElementById("usernameerror2").innerHTML = "&nbsp;";
            return true;
        }
    },


    validateLoginPwd: function (event) {         // Function to validate Password
        var error = "";       
        var value = event.target.value;
        var illegalChars = /[\W_]/;
        var pass = $('#pwd1').val();       
        if ($('#pwd1').val() == "") {
            error = "please enter your password.\n";
            document.getElementById("paswrderror").innerHTML = "Please enter your password."
            $(".invalid-user").html("&nbsp;");
            return false;
        }
        else if (($('#pwd1').val().length < 8) || ($('#pwd1').val().length > 20)) {
            error = "The password is the wrong length. \n";
            document.getElementById("paswrderror").innerHTML = "Incorrect password."
            $(".invalid-user").html("&nbsp;");
            return false;
        } else if (illegalChars.test($('#pwd1').val())) {
            error = "The password contains illegal characters.\n";
            document.getElementById("paswrderror").innerHTML = "Incorrect password."
            $(".invalid-user").html("&nbsp;");
            return false;
        } else if (($('#pwd1').val().search(/[a-zA-Z]+/) == -1) || ($('#pwd1').val().search(/[0-9]+/) == -1)) {
            error = "The password must contain at least one numeral.\n";
            document.getElementById("paswrderror").innerHTML = "Incorrect password."
            $(".invalid-user").html("&nbsp;");
            return false;
        } else if (($('#pwd1').val().search(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/) == -1) || ($('#pwd1').val().search(/[0-9]+/) == -1)) {
            error = "The password must contain at least one upper case and one lower case.\n";
            document.getElementById("paswrderror").innerHTML = "Incorrect password."
            $(".invalid-user").html("&nbsp;");
            return false;
        } else {            
            document.getElementById("paswrderror").innerHTML = "&nbsp;";
            document.getElementById("paswrderror1").innerHTML = "&nbsp;";
            return true;
        }
    },



    validateLogin: function (event) {
        var error = "";
        var isError = false;
        
        var value = event.target.value;
        var illegalChars = /[\W_]/;
        var pwd = $('#pwd1').val();
        var email = $('#email1').val();
        if ($('#pwd1').val() == "") {
            error = "please enter your password.\n";
            document.getElementById("paswrderror").innerHTML = "Please enter your password."            
            $(".invalid-user").html("&nbsp;");
            isError = true;
        }
        else if (($('#pwd1').val().length < 8) || ($('#pwd1').val().length > 20)) {
            error = "The password is the wrong length. \n";
            document.getElementById("paswrderror").innerHTML = "Incorrect password."           
            $(".invalid-user").html("&nbsp;");
            isError = true;
        } else if (illegalChars.test($('#pwd1').val())) {
            error = "The password contains illegal characters.\n";
            document.getElementById("paswrderror").innerHTML = "Incorrect password."
            $(".invalid-user").html("&nbsp;");
            isError = true;
        } else if (($('#pwd1').val().search(/[a-zA-Z]+/) == -1) || ($('#pwd1').val().search(/[0-9]+/) == -1)) {
            error = "The password must contain at least one numeral.\n";
            document.getElementById("paswrderror").innerHTML = "Incorrect password."
            $(".invalid-user").html("&nbsp;");
            isError = true;
        } else if (($('#pwd1').val().search(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/) == -1) || ($('#pwd1').val().search(/[0-9]+/) == -1)) {
            error = "The password must contain at least one upper case and one lower case.\n";
            document.getElementById("paswrderror").innerHTML = "Incorrect password."
            $(".invalid-user").html("&nbsp;");
            isError = true;
        }
        if ($('#email1').val() == "") {
            error = "please enter your username/Email.\n";
            document.getElementById("usernameerror").innerHTML = "Please enter your username/email."
            $(".invalid-user").html("&nbsp;");
            isError = true;
        }
        else if (($('#email1').val().length < 4)) {
            error = "The username you entered is incorrect. \n";
            document.getElementById("usernameerror").innerHTML = "Incorrect username/ Email. "
            $(".invalid-user").html("&nbsp;");
            isError = true;
        }

        else if ($('#email1').val().indexOf(" ") >= 0) {
            error = "Username/Email you entered is incorrect.\n";
            document.getElementById("usernameerror").innerHTML = "Incorrect username/ Email. "
            $(".invalid-user").html("&nbsp;");
            isError = true;
        }
        if (isError) {
            return false;
        }

        else {
            var data2 ={"items":[{"username":$('#email1').val(),"password":$('#pwd1').val()}]}           
            this.serverRequest = $.post(baseurl+"user/login",JSON.stringify(data2),function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                if (typeof result == 'object') {
                    if (result.items[0]['usr_id'] != 0 && result.items[0]['session_id'] != 0 && result.items[0]['status']=='Y') {
                        document.getElementById("usernameerror2").innerHTML = "&nbsp;";
                        document.getElementById("paswrderror1").innerHTML = "&nbsp;";
                        var cookieValueJson = { "userId": "" + result.items[0]['usr_id'], "session_id": "" + result.items[0]['session_id'] }
                        var now = new Date();
                        var time = now.getTime();
                        time += 3600 * 1000 *24;
                        now.setTime(time);
                        var cookieValue = "PZdata=" + JSON.stringify(cookieValueJson) + ";  expires=" + now.toUTCString() + "; path=/";
                        document.cookie = cookieValue;
                        //console.log(result.items[0]['usr_id']);
                        $(".invalid-user").html("&nbsp;");
                        window.location = "/build/views/Football/GameSelection/gameSelection.html?islog=true"
                        return false;
                    }
                    else if (result.items[0]['status'] == 'N') {
                        //$(".invalid-user").html(result.items[0]['status_msg']);
                        this.setState({showLoginFMsg:true,userMsg:result.items[0]['status_msg']})
                        return false;
                    }
                    else if (result.items[0]['status'] == 'C') {
                        //$(".invalid-user").html(result.items[0]['status_msg']);
                        this.setState({showLoginFMsg:true,userMsg:result.items[0]['status_msg']})
                        return false;
                    }
                    else if (result.items[0]['status'] == 'T') {
                        //$(".invalid-user").html(result.items[0]['status_msg']);
                        this.setState({showLoginFMsg:true,userMsg:result.items[0]['status_msg']})
                        return false;
                    }
                    else if (result.items[0]['status'] == 'S') {
                        //$(".invalid-user").html(result.items[0]['status_msg']);
                        this.setState({showLoginFMsg:true,userMsg:result.items[0]['status_msg']})
                        return false;
                    }
                    else if (result.items[0]['status'] == 'L') {
                        //$(".invalid-user").html(result.items[0]['status_msg']);
                        this.setState({showLoginFMsg:true,userMsg:result.items[0]['status_msg']})
                        return false;
                    }
                    else {
                        //$(".invalid-user").html("Invalid username or password");
                        this.setState({showLoginFMsg:true,userMsg:"Invalid username or password"})
                        document.getElementById("paswrderror").innerHTML = "&nbsp;";
                        document.getElementById("usernameerror").innerHTML = "&nbsp;";
                    }
                    var self = this;
                    setTimeout(function(){
                        self.setState({showLoginFMsg:false,showLoginSMsg:false,userMsg:''})
                    },10000)
                }

            }.bind(this));
        }

    },


    validateSignupUsername: function (event) {    // Function to validate Username
        var user = $('#user').val();       
        var value = event.target.value;
        var illegalChars = /[\W_]/;       
        var error = "";
        var isError = false;

        if ($('#user').val() == "") {
            error = "please enter your username.\n";

            document.getElementById("signupusererror").innerHTML = "Please enter your username."

            isError = true;

        }
        else if (($('#user').val().length < 4) || ($('#user').val().length > 12)) {
            error = "Username Must Be In between 4 To 12 Characters. \n";
            document.getElementById("signupusererror").innerHTML = "Username must be in between 4 to 12 characters."

            isError = true;
        }
        else if (illegalChars.test($('#user').val())) {
            error = "username must be alphanumeric.\n";
            document.getElementById("signupusererror").innerHTML = "Username must be alphanumeric."

            isError = true;
        }     
        else {
            document.getElementById("signupusererror").innerHTML = "&nbsp;"
            this.serverRequest = $.get(baseurl + "user/username/" + user, function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                if (result.items[0]['valid_username'] == 'N') {
                    document.getElementById("signupusererror").innerHTML = "Username already exists."

                    return false;
                } else if (result.items[0]['valid_username'] == 'X') {
                    document.getElementById("signupusererror").innerHTML = "You are not permitted to use this website."

                    return false;
                }
            }.bind(this));

            return true;

        }
    },



    validateSignupEmail: function (event) {    // Function to validate Email
        var email1 = $('#email').val();
        var pass = $('#pwd').val();
        var value = event.target.value;
        var illegalChars = /[\W_]/;
        var checkboxValue = "";
        var error = "";
        var isError = false;
        if ($('#email').val() == "") {
            error = "please enter your Email.\n";
            document.getElementById("signupemailerror").innerHTML = "Please enter your email."
            return false;
        }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($('#email').val()))) {
            document.getElementById("signupemailerror").innerHTML = "Please enter valid email"
            return false;
        }
        else {
            document.getElementById("signupemailerror").innerHTML = "&nbsp;"
            this.serverRequest = $.get(baseurl + "user/username/" + email1, function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                if (result.items[0]['valid_username'] == 'N') {
                    document.getElementById("signupemailerror").innerHTML = "Email Already Exists."

                    return false;
                }
            }.bind(this));
            return true;
        }
    },


    validateSignupPassword: function (event) {  // Function to validate Password
        var pass = $('#pwd').val();
        var value = event.target.value;
        var illegalChars = /[\W_]/;
        var checkboxValue = "";
        var error = "";
        var isError = false;
      
        if ($('#pwd').val() == "") {
            error = "please enter your password.\n";

            document.getElementById("signuppwderror").innerHTML = "Please enter your password."
            return false;
        }
        else if (($('#pwd').val().length < 8) || ($('#pwd').val().length > 20)) {
            error = "The password is the wrong length. \n";
            document.getElementById("signuppwderror").innerHTML = "Password must be in between 8 to 20 characters."

            return false;
        }
        else if ($('#pwd').val().indexOf(" ") >= 0) {
            error = "password must not contain any spaces.\n";
            document.getElementById("signuppwderror").innerHTML = "Password must not contain any spaces."

            return false;
        }
        else if (illegalChars.test($('#pwd').val())) {
            error = "The password doesnot contain special characters.\n";
            document.getElementById("signuppwderror").innerHTML = "Password should not contain any special characters."

            return false;
        }
        else if (($('#pwd').val().search(/[a-zA-Z]+/) == -1) || ($('#pwd').val().search(/[0-9]+/) == -1)) {
            error = "The password must contain at least one numeral.\n";
            document.getElementById("signuppwderror").innerHTML = "Password must contain one numeral."

            return false;
        } else if (($('#pwd').val().search(/^(?=.*[A-Z]).{6,20}$/) == -1) || ($('#pwd').val().search(/[0-9]+/) == -1)) {
            error = "password must contain one uppercase  character.\n";
            document.getElementById("signuppwderror").innerHTML = "Password must contain one uppercase  character."

            return false;
        }
        else if (($('#pwd').val().search(/^(?=.*[a-z]).{6,20}$/) == -1) || ($('#pwd').val().search(/[0-9]+/) == -1)) {
            error = "password must contain one  lowercase character.\n";
            document.getElementById("signuppwderror").innerHTML = "Password must contain one lowercase  character."

            return false;
        }
        else if ($('#pwd').val() == $('#user').val() || $('#pwd').val() == $('#email1').val()) {
            error = "password must not be equal to username.\n";

            document.getElementById("signuppwderror").innerHTML = "Password must not be equal to Username and email."
            return false;
        }
        else {
            document.getElementById("signuppwderror").innerHTML = "&nbsp;";
            return true;
        }
    },



    validateSignup: function (event) {       
        var user = $('#user').val();
        var email1 = $('#email').val();       
        var pass = $('#pwd').val();
        var conformpass = $('#conformpwd').val();
        var value = event.target.value;
        var illegalChars = /[\W_]/;
        var checkboxValue = "";
        var error = "";
        var isError = false;

        if ($('#user').val() == "") {
            error = "please enter your username.\n";

            document.getElementById("signupusererror").innerHTML = "Please enter your username."

            isError = true;

        }
        else if (($('#user').val().length < 4) || ($('#user').val().length > 12)) {
            error = "Username Must Be In between 4 To 12 Characters. \n";
            document.getElementById("signupusererror").innerHTML = "Username must be in between 4 to 12 characters."

            isError = true;
        }
        else if (illegalChars.test($('#user').val())) {
            error = "username must be alphanumeric.\n";
            document.getElementById("signupusererror").innerHTML = "Username must be alphanumeric."

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
                        document.getElementById("signupusererror").innerHTML = "Username already exists."
                        isError = true;
                    }
                }
            });

        }

        if ($('#email').val() == "") {
            error = "please enter your Email.\n";
            document.getElementById("signupemailerror").innerHTML = "Please enter your email."
            isError = true;
        }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($('#email').val()))) {
            document.getElementById("signupemailerror").innerHTML = "Please enter valid email"
            isError = true;
        }
        else {
            $.ajax({
                type: "GET",
                url: baseurl + "user/username/" + $('#email').val(),
                async: false,
                success: function (result) {
                    result = JSON.parse(result);
                    if (result.items[0]['valid_username'] == 'N') {
                        document.getElementById("signupemailerror").innerHTML = "Email already exists."
                        isError = true;
                    }
                }
            });

        }    

        if ($('#pwd').val() == "") {
            error = "please enter your password.\n";

            document.getElementById("signuppwderror").innerHTML = "Please enter your password."

            isError = true;
        }
        else if (($('#pwd').val().length < 8) || ($('#pwd').val().length > 20)) {
            error = "The password is the wrong length. \n";
            document.getElementById("signuppwderror").innerHTML = "Password must be in between 8 to 20 characters."

            return false;
        }
        else if ($('#pwd').val().indexOf(" ") >= 0) {
            error = "password must not contain any spaces.\n";
            document.getElementById("signuppwderror").innerHTML = "Password must not contain any spaces."

            return false;
        }
        else if (illegalChars.test($('#pwd').val())) {
            error = "The password doesnot contain special characters.\n";
            document.getElementById("signuppwderror").innerHTML = "Password should not contain any special characters."

            return false;
        }
        else if (($('#pwd').val().search(/[a-zA-Z]+/) == -1) || ($('#pwd').val().search(/[0-9]+/) == -1)) {
            error = "One upper case, one lower case letter and one number Eg:- ABC123xyz.\n";
            document.getElementById("signuppwderror").innerHTML = "Password must contain one numeral."

            return false;
        } else if (($('#pwd').val().search(/^(?=.*[A-Z]).{6,20}$/) == -1) || ($('#pwd').val().search(/[0-9]+/) == -1)) {
            error = "One upper case, one lower case letter and one number Eg:- ABC123xyz.\n";
            document.getElementById("signuppwderror").innerHTML = "Password must contain one uppercase  character."

            return false;
        }
        else if (($('#pwd').val().search(/^(?=.*[a-z]).{6,20}$/) == -1) || ($('#pwd').val().search(/[0-9]+/) == -1)) {
            error = "One upper case, one lower case letter and one number Eg:- ABC123xyz.\n";
            document.getElementById("signuppwderror").innerHTML = "Password must contain one lowercase  character."

            return false;
        }
        else if ($('#pwd').val() == $('#user').val() || $('#pwd').val() == $('#email1').val()) {
            error = "password must not be equal to username.\n";
            document.getElementById("signuppwderror").innerHTML = "Password must not be equal to Username and email."
            return false;
        }

        else {
            document.getElementById("signuppwderror").innerHTML = "&nbsp;";

        }      
        if ($('#conformpwd').val() == "") {
            error = "Please confirm your password.\n";
            document.getElementById("signupconformpwderror").innerHTML = "Please confirm your password."
            return false;
        }
        else if ($('#conformpwd').val()!== $('#pwd').val()) {
            error = "Passwords do not match, please retype.\n";
            document.getElementById("signupconformpwderror").innerHTML = "Passwords do not match, please retype."
            return false;
        }
        else {
            document.getElementById("signupconformpwderror").innerHTML = "&nbsp;";
        }
        if (!$('#checkbox1').is(":checked")) {
            error = "Please confirm your age.\n";
            checkboxValue1 = 'N';

            document.getElementById("checkbox1error").innerHTML = "Please confirm your age."

            return false;
        }
        else {
            checkboxValue1 = 'Y';
            document.getElementById("checkbox1error").innerHTML = "&nbsp;";
        }
        if (!$('#checkbox2').is(":checked")) {
            error = "please select the terms and conditions.\n";
            checkboxValue2 = 'N';

            document.getElementById("checkbox1error").innerHTML = "Please read and agree to our T&C's."

            return false;
        }
        else {
            checkboxValue2 = 'Y';
            document.getElementById("checkbox1error").innerHTML = "&nbsp;";
        }
        if (!$('#checkbox3').is(":checked")) {
            error = "please agree private policy and news letter .\n";
            checkboxValue3 = 'N';
            document.getElementById("checkbox1error").innerHTML = "&nbsp;";
        }
        else {
            checkboxValue3 = 'Y';
            document.getElementById("checkbox1error").innerHTML = "&nbsp;";
        }
        if (isError) {
            return false;
        }
        var data1 = { "items": [{ "username": $('#user').val(), "email": $('#email').val(), "password": $('#pwd').val(), "competition_id": "", "team_id": "", "confirm1": checkboxValue1, "confirm2": checkboxValue2, "confirm3": checkboxValue3}]}
        this.serverRequest = $.post(baseurl+"user/signup/",JSON.stringify(data1), function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            if (result.items[0]['usr_id'] != 0 && result.items[0]['session_id'] != 0) {
                document.getElementById("usernameerror2").innerHTML = "&nbsp;";              
                //var cookieValueJson = { "userId": "10024", "session_id": "97025770461423973935" }
                var cookieValueJson = { "userId": "" + result.items[0]['usr_id'], "session_id": "" + result.items[0]['session_id'] }
                var now = new Date();
                var time = now.getTime();
                time += 3600 * 1000 * 24;
                now.setTime(time);
                var cookieValue = "PZdata=" + JSON.stringify(cookieValueJson) + ";  expires=" + now.toUTCString() + "; path=/";
                document.cookie = cookieValue;
                window.location = "/build/views/Football/Glory/thankyou/thankyou.html?islog=true"
                return false;
            }

        }.bind(this));
        return true
    },

    componentDidMount: function () {
        $(document).on('keyup', '#email1', function (e) {
            if (e.keyCode == 13) {
                $("#key").click();
            }
        })

        $(document).on('keyup', '#pwd1', function (e) {

            if (e.keyCode == 13) {
                $("#key").click();
            }
        })
        $(document).on('keyup', '#user', function (e) {

            if (e.keyCode == 13) {
                $("#key1").click();
            }
        })
        $(document).on('keyup', '#email', function (e) {
            if (e.keyCode == 13) {
                $("#key1").click();
            }
        })

        $(document).on('keyup', '#pwd', function (e) {

            if (e.keyCode == 13) {
                $("#key1").click();
            }
        })
        $(document).on('keyup', '#conformpwd', function (e) {

            if (e.keyCode == 13) {
                $("#key1").click();
            }
        })
        $(document).on('keyup', '#checkbox1', function (e) {

            if (e.keyCode == 13) {
                $("#key1").click();
            }
        })
        $(document).on('keyup', '#checkbox2', function (e) {

            if (e.keyCode == 13) {
                $("#key1").click();
            }
        })
        $(document).on('keyup', '#checkbox3', function (e) {

            if (e.keyCode == 13) {
                $("#key1").click();
            }
        })
        
    },
    testAPI: function () {
        console.log('Welcome!  Fetching your information.... ');
        
    },
    statusChangeCallback: function (response) {
        
    },
    checkLoginState: function () {
        FB.getLoginStatus(function (response) {
            this.statusChangeCallback(response);
        }.bind(this));
    },

    handleClick: function () {
        FB.login(this.checkLoginState());
    },
    gotoIndexpage:function(){
        window.location = "/build/views/Football/Index/index.html?islog=" + is_loggedIn
    },
    openSignUp:function(){        
        $('#signup-with-email').modal('show');
        setTimeout(function(){$("body").addClass("modal-open");},500)
    },
    openLogin:function(){    
        $('#login-with-email').modal('show');
        setTimeout(function(){$("body").addClass("modal-open");},500)
        
    },
    //checkboxChange:function(id){
    //    var checkValue=$('#'+id).is(":checked")
    //    if(id=="Dcheckbox1" || id=="checkbox1"){
    //        this.setState({"checkbox1":checkValue})
    //    }
    //    else if(id=="Dcheckbox2" || id=="checkbox2"){
    //        this.setState({"checkbox2":checkValue})
    //    }
    //    else if(id=="Dcheckbox3" || id=="checkbox3"){
    //        this.setState({"checkbox3":checkValue})
    //    }
    //},
    hideLoginFMsg:function(){
        console.log("hideLoginFMsg")
        this.setState({showLoginFMsg:false,userMsg:''})
    },
    gotoBalance:function(){

    },
    render: function () {
        var self = this;
        return (<div className="row container-header">            
{this.props.isLog?<div>
              <div className="col-lg-8 col-md-6 col-sm-7 col-xs-7 padding-top-15 padding-bottom-15 padding-left-5 no-padding-right">
                    <div className="col-lg-3 col-md-5 col-sm-5 col-xs-12 visible-lg visible-md visible-sm no-padding">
                        <img src="/images/playzoola-logo.svg" className="pointer-hand"  onClick={this.gotoIndexpage}/>
                    </div>
                    <div className="col-sm-4 col-xs-3 visible-xs no-padding-right no-padding-left">
                         <img src="/images/playzoola-icon.svg" className="pointer-hand"  onClick={this.gotoIndexpage}/>
                    </div>
                    <div className="menu-text m-padding-top-5" onClick={this.gotoTopup}>
                        <span className="mon-txt wallet-amount">&pound;{this.state.items.balance}</span>
                        <img src="/images/menu-topup.svg"/>
                    </div>                   
                    <div className="menu-text margin-top-5 info-notification pointer-default">
                        <img alt="5z" src="/images/Z-currency2.svg" /><span className="mon-txt wallet-amount no-padding-right">{this.state.items.zeds}</span>
                         
                    </div>

                   {/* <div className="menu-text info-notification hidden-xs">

                        <a href={"/build/views/Football/Notification/notifications/notifications.html?islog=" + is_loggedIn}><img src="/images/menu-notification.svg" />
                            {this.state.items.notifications>0?<span className="badge badge-red">{this.state.items.notifications}</span>:''}</a>
                       
                    </div>*/}
        
             </div>
             <div className="col-lg-4 col-md-6 col-sm-5 col-xs-5 padding-top-15 padding-bottom-15 text-right no-padding-left padding-right-5">
                 <div className="menu-text pull-right info-notification" id="bs-example-navbar-collapse-1">
                     <a href="#" className="" data-toggle="modal" data-target="#MenuModal" >
                        <img src="/images/menu-popup-icon.svg" />
                         {this.state.items.notifications>0?
                        <span className="badge badge-red">{this.state.items.notifications}</span>:''}
                     </a>
                 </div>
                 <div className="menu-text pull-right">
                     <a href={"/build/views/Football/Dashboard/dashboard.html?islog=" + is_loggedIn}>
                     <img title="Dashboard" src="/images/menu-home.svg" />
                     </a>
                 </div>
                 <div className="menu-text pull-right">
                     <a href={"/build/views/Football/GameSelection/gameSelection.html?islog="+is_loggedIn}><img title="Games" src="/images/menu-gameselection.svg" /></a>
                 </div>

             </div>
             </div>:<div>
                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12 padding-top-10 padding-bottom-15 visible-sm visible-lg visible-md">
                            <img src="/images/playzoola-logo.svg" className="margin-top-5 pointer-hand" onClick={this.gotoIndexpage}/>
                        </div>

                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-2 padding-top-10 padding-bottom-10 no-padding-right visible-xs">
                            <img src="/images/playzoola-icon.svg" className="pointer-hand"  onClick={this.gotoIndexpage} />
                        </div>

                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-10 text-right padding-top-15 padding-bottom-15 no-padding-left no-login padding-right-5">
                            <div className="menu-text pull-right info-notification padding-right-5" id="bs-example-navbar-collapse-1">
                                <a href="#" className="" data-toggle="modal" data-target="#MenuModal" role="button" aria-haspopup="true" aria-expanded="false">
                                    <img src="/images/menu-popup-icon.svg" />
                                    <span className="badge badge-red">{this.state.items.notifications}</span>
                                </a>
                            </div>
                            <div className="menu-text pull-right">
                                 <a href={"/build/views/Football/GameSelection/gameSelection.html?islog="+is_loggedIn}><img title="Games" src="/images/menu-gameselection.svg" /> </a>
                            </div>                          
                            
                            <div className="menu-text visible-md visible-lg pull-right" onClick={this.openLogin}>
                                <a><span>Login</span></a>
                            </div>
                            <div className="signup-button pull-right" onClick={this.openSignUp}>
                                Sign up
                            </div>
                       </div> 


                        <div className="modal fade animated bounce" tabIndex="-1" role="dialog" aria-labelledby="login-with-social" id="login-with-email" data-keyboard="true">
                        <div className="modal-dialog modal-sm">

                            <div className="modal-content zoola-box">
                                <div className="social-header">
                                    <img src="/images/close-icon.svg" width="20" className="pull-right pointer-hand" data-dismiss="modal"/>
                                    <div className="row text-center">
                                        <img src="/images/playzoola-logo.svg" width="165" className="margin-left-20" />
                                    </div>
                                </div>
                                {this.state.showLoginSMsg?<div className="row bg-success no-margin">
                                        <div className="space-5"></div>
                                        <div className="row no-margin">
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                                                <img src="/images/success.svg" alt="Success" className="" width="30" />
                                            </div>
                                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 no-padding">
                                               
                                               <span className="sm-txt font-18">{this.state.userMsg}</span>
                                            </div>
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                                                <img src="/images/close-icon.svg" alt="Success" width="20" className="pointer-hand margin-top-5" />
                                            </div>
                                        </div>
                                       <div className="space-5"></div>
                                </div>:''}
                                {this.state.showLoginFMsg?<div className="row bg-error no-margin">
                                        <div className="space-5"></div>
                                        <div className="row no-margin">
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                                                <img src="/images/error.svg" alt="Success" className="" width="30" />
                                            </div>
                                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 no-padding">
                                                
                                               <span className="sm-txt font-18">{this.state.userMsg}</span>
                                            </div>
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                                                <img src="/images/close-icon.svg" alt="Success" width="20" className="pointer-hand margin-top-5" onClick={this.hideLoginFMsg}/>
                                            </div>
                                        </div>
                                       <div className="space-5"></div>
                                </div>:''}
                                <div className="social-body">
                                    <div className="space-5"></div>
                                   {/* <div className="row text-center">
                                        <div className="col-lg-12">
                                            <button className="btn zoola-btn bg-fb-blue btn-fb">
                                                <img src="/images/social-fb-icon.svg" alt="social-fb-icon" className="" />
                                                <div className="fb-txt">Continue with Facebook</div>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="row text-center">
                                        <div className="col-lg-12 padding-15">
                                            <div className="bg-line">
                                                <span>or</span>
                                            </div>
                                        </div>
                                    </div>*/}
                                    
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="tit-txt">
                                                Username/Email:
                                            </div>
                                            <div className="form-group">
                                               <input type="text" className="form-control" placeholder="" maxLength='80' onBlur={this.validateLoginUsername} id="email1"/>
                                                <span id="usernameerror" className="alert-message space-5">&nbsp;</span>
                                                <span id="usernameerror2" className="alert-message space-5">&nbsp;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="tit-txt">
                                                Password:
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control" placeholder=""  maxLength='20'  onBlur={this.validateLoginPwd} id="pwd1"/>
                                                <span id="paswrderror" className="alert-message">&nbsp;</span>
                                                <span id="paswrderror1" className="alert-message">&nbsp;</span>
                                                <span className="invalid-user text-center alert-message padding-left-40">

                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="sm-txt text-right">
                                                        <a href="/build/views/Football/passwordrecovery/passwordrecovery.html">Forgotten Password?</a>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="space-10"></div>
                                    <div className="row">
                                            <div className="col-lg-10 col-sm-10 col-centered">
                                                <button type="submit" className="btn zoola-btn" onClick={this.validateLogin} id='key'><h5 className="">Login</h5></button>
                                            </div>
                                    </div>
                                    <div className="space-10"></div>
                                    <div className="row">
                                        <h6 className="text-center"><a className="underline" data-dismiss="modal" onClick={this.openSignUp}>Sign up</a> if you don’t have an account.</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                       
                        <div className="modal fade animated bounce" tabIndex="-1" role="dialog" aria-labelledby="login-with-social" id="signup-with-email" data-keyboard="true">
                            <div className="modal-dialog modal-sm ">
                                <div className="modal-content zoola-box">
                                    <div className="social-header">
                                        <img src="/images/close-icon.svg" width="20" className="pull-right pointer-hand" data-dismiss="modal"/>
                                        <div className="row text-center">
                                            <img src="/images/playzoola-logo.svg" width="165" className="margin-left-20" />
                                        </div>
                                    </div>
                                    <div className="social-body">
                                        <div className="space-5"></div>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="tit-txt">
                                                    Pick a username:
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="" maxLength='12' onBlur={this.validateSignupUsername} id="user"/>
                                                    <span id="signupusererror" className="alert-message">&nbsp;</span>                                                   
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="tit-txt">
                                                    Email:
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder=""  maxLength='80'  onBlur={this.validateSignupEmail}  id="email"/>
                                                    <span id="signupemailerror" className="alert-message">&nbsp;</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="tit-txt">
                                                    Password:
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control" placeholder=""  maxLength='20'  onBlur={this.validateSignupPassword} id="pwd"/>
                                                    <div className="blue">One upper case, one lower case letter and one number Eg:- ABC123xyz.</div>
                                                    <span id="signuppwderror" className="alert-message">&nbsp;</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="tit-txt">
                                                    Confirm Password:
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control" placeholder="" maxLength='20' onBlur={this.validateSignupPassword} id="conformpwd" />
                                                    <span id="signupconformpwderror" className="alert-message">&nbsp;</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">                                           
                                                <div className="forgotten">
                                                     <div className="checkbox margin-bottom-15">
                                                        <input id="checkbox1" className="styled" type="checkbox" />
                                                        <label>
                                                            I confirm I am 18 or over
                                                        </label>
                                                     </div>
                                                    <div className="checkbox margin-bottom-15">
                                                        <input id="checkbox2" className="styled" type="checkbox"/>
                                                        <label>
                                                            I confirm I have read and accept the &nbsp;<a href="https://playzoola.zendesk.com/hc/en-us/categories/200985145-Terms-Conditions" target="_blank" className="underline">Terms and Conditions</a> and <a href="https://playzoola.zendesk.com/hc/en-us/categories/200982725-Privacy" target="_blank" className="underline">Privacy Policy</a>.
                                                        </label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <input id="checkbox3" className="styled" type="checkbox" />
                                                        <label>
                                                            I would like to receive information about offers, promotions and bonuses.
                                                        </label>
                                                    </div>
                                                </div>
                                                <span id="checkbox1error" className="padding-left-20 alert-message">&nbsp;</span>
                                            </div>
                                        </div>
                                        <span id="checkerror" className="alert-message">&nbsp;</span>
                                        <div className="row">
                                                <div className="col-lg-10 col-sm-10 col-centered">
                                                    <button type="submit" className="btn zoola-btn" onClick={this.validateSignup} id='key1'><h5 className="">Sign up</h5></button>
                                                </div>
                                        </div>
                                        <div className="space-10"></div>
                                        <div className="row">
                                            <h6 className="text-center"><a className="underline" data-dismiss="modal" onClick={this.openLogin}>Login</a> if you already have an account.</h6>
                                        </div>
                                   </div>
                            </div>
                        </div>
                    </div>
                </div> } 
    
    
    
    
     <div className="modal fade animated fadeIn" tabIndex="-1" role="dialog" aria-labelledby="Alert-Modal" id="alert-modal" data-keyboard="true">
                                                    <div className="modal-dialog modal-sm ">

                                                        <div className="modal-content zoola-box alet-modal">
                                                            <div className="social-header">
                                                                <img src="/images/close-icon.svg" width="20" className="pull-right pointer-hand" data-dismiss="modal" />
                                                            </div>
                                                            <div className="social-body">
                                                                <div className="space-5"></div>
                                                                <div className="row">
                                                                    <div className="col-lg-12">
                                                                        <p>Your account has not been activated yet,please check your email</p>
                                                                    </div>
                                                                </div>
                                                                <div className="space-5"></div>
                                                               <div className="row">
                                                                    <div className="col-lg-12 col-sm-12 col-md-12">
                                                                        <button type="submit" className="btn zoola-btn" onClick={this.agree}><h5 className="">Ok</h5></button>
                                                                    </div>

                                                               </div>
                                                                <div className="space-5"></div>
                                                            </div>
                                                        </div>
                                                    </div>
     </div>

    
    
    
    
    
    
           
             <div className="modal fade right" id="MenuModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" data-keyboard="true">
             <div className="menu-dialog" role="document">
                <img className="close-icon" data-dismiss="modal" src="/images/close-icon.svg" alt=""/>

                <div className="modal-content">
                    <ul className="menu-list pointer-hand">
                        <li><img src="/images/menu-popup-search.svg" className="pointer-hand" alt="" /><span><input type="text" placeholder="Search" id="menusearch" onChange={this.searchItems}/></span></li>
                           {
                            this.state.menuItems.map(function(item,index){
                                if(item.itemName=="Logout")
                                {
                                    return <li key={index} onClick={self.logoutUser.bind(null,item.url)}><img src={item.img}/><a><span>{item.itemName}</span></a></li>
                                }
                                else if(item.itemName=="My account")
                                {
                                    return <li key={index} onClick={self.state.items.status=='L'?'':self.goToURL.bind(null,item.url)}><img src={"/images/animals-Modified/"+self.state.items.usr_image+ ".svg"} className="margin-top-15" width="30" /><a><span>{self.state.items.username}</span><span className="m-title-dec">My Profile / Account</span></a></li>
                                }
                                /*else if (item.itemName == "Create Game")
                                {
                                    return <li key={index} onClick={self.goToURL.bind(null,item.url)}><img src={item.img} width="30" /><a><span>{item.itemName}</span> <span className="m-title-dec">(Coming soon)</span></a></li>
                                }*/
                                // else if (item.itemName == "Team stats")
                                //{
                                //    return <li key={index} onClick={self.goToURL.bind(null,item.url)}><img src={item.img} width="30" /><a><span>{item.itemName}</span></a></li>
                                // }
                                else if (item.itemName == "Help Centre")
                                 {
                                     return <li key={index}><img src={item.img} width="30" /><a  target="_blank" href={item.url}><span>{item.itemName}</span></a></li>
                                 }
                                else if (item.itemName == "Login")
                                {
                                    return <li key={index} onClick={self.openLogin }><img src={item.img} width="30" /><a><span>{item.itemName}</span></a></li>
                                }
                                else if (item.itemName == "Sign up now")
                                {
                                    return <li key={index} onClick={self.gotoSignup }><img src={item.img} width="30" /><a><span>{item.itemName}</span></a></li>
                                } 
                                else if(item.itemName == "Notifications"){

                                    return <li key={index} onClick={self.goToURL.bind(null,item.url)}>
                                               
                                               {self.state.items.notifications>0?
                                                <div className="info-notification"><img src={item.img} /><span className="badge-red">{self.state.items.notifications}</span></div>:<img src={item.img} />}
                                                <a><span>{item.itemName}</span></a>
                                            </li>
                                }
                                /*else if (item.itemName == "My zoola")
                                {
                                    return <li key={index} onClick={self.gotoDashboard }><img src={item.img} width="30" /><a><span>{SupHeaderThis.state.items.status=='P'?'Dashboard':item.itemName}</span></a></li>
                                }*/                             
                                else
                                {
                                    
                                    return <li key={index} onClick={self.goToURL.bind(null,item.url)}><img src={item.img}/><a><span>{item.itemName}</span></a></li>
                                }
                                    
                                
                            })
                           }
                            
                        <div className="row">
                        <div className="space-5"></div>
                        <div className="col-lg-12 text-center">
                            {this.props.isLog?
                                <div className="login-button" onClick={this.logoutUser}>
                                    Logout
                                </div>
                            :<div className="login-button" data-dismiss="modal" onClick={this.openLogin}>
                                Login
                            </div>}
                          {/* <div className="underline sm-txt"><a href="https://playzoola.zendesk.com/hc/en-us/categories/200960809-Responsible-Gambling" target="_blank">Responsible Gambling Policy</a></div>*/}
                            <div className="space-10"></div>
                        </div>
                        
                        </div>
                    </ul>
                    
              </div>
          </div>
        </div>
         </div>
                         
             )
    }
});



