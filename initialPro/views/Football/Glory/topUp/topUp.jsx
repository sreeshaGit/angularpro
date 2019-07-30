//**********--- call getCookie function to read cookie---**********
getCookie()


if (getParameterByName("islog") && getParameterByName("islog") == 'true') {  //**********--- Condition to check User Login ---**********
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}

var Subheader = React.createClass({
    render: function () {
        return (
                 <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                    <h3>Complete sign up</h3>
                </div>
            </div>
        )
    }
});
//**********--- To Display Name  ---**********
//var Title = React.createClass({
//    validate: function (event) {
//        var error = "";
//        var value = event.target.value;
//        if (event.target.value == "") {
            
//            document.getElementById("titleerror").innerHTML = "Please Enter title."
//            return false;
//        }
//        else {
//            document.getElementById("titleerror").innerHTML = "";
//            return true;
//        }
//    }, 
//})

//**********--- To Display Name  ---**********
var Name = React.createClass({
    validate: function (event) {
        var error = "";
        var value = event.target.value;
        if (event.target.value == "") {
            
           document.getElementById("nameerror").innerHTML = "Please enter your name."
            return false;
        }
        else {
            document.getElementById("nameerror").innerHTML = "&nbsp;";
            return true;
        }
    },
    render: function(){
        return(
            <div>
              <input type="text" className="form-control" placeholder="Your Name" aria-describedby="basic-addon1" maxLength='80'  onBlur={this.validate} id="Name" />
                 <span id="nameerror" className="alert-message space-5">&nbsp;</span>
             </div>
               )
        }
})
//**********---To Display Surname Field ---**********
var Surname = React.createClass({
    validate: function (event) {
        var error = "";
        var value = event.target.value;
        if (event.target.value == "") {
           value.background = 'red';
           document.getElementById("surnamerror").innerHTML = "Please enter your surname."
           return false;
        }
        else {
            document.getElementById("surnamerror").innerHTML = "&nbsp;";
            return true;
        }
    },
    render: function(){
        return(
            <div>
              <input type="text" className="form-control" placeholder="Your surname" aria-describedby="basic-addon1" maxLength='80'  onBlur={this.validate} id="Surname" />
                 <span id="surnamerror" className="alert-message space-5">&nbsp;</span>
            </div>
               )
        }
})
//**********--- To Display Address field  ---**********

var Postcode = React.createClass({
    validate: function (event) {
        var error = "";
        var illegalChars = /[\W_]/;
        var value = event.target.value;
        if (event.target.value == "") {
            value.background = 'red';
            document.getElementById("postcodeerror").innerHTML = "Please enter your postcode."
            return false;
        }
        else {
            document.getElementById("postcodeerror").innerHTML = "&nbsp;";
            return true;
        }
    },
    render: function(){
        return(
            <div>
              <input type="text" className="form-control" placeholder="Postcode lookup" maxLength='10'  onBlur={this.validate} id="postcode" />
               <span id="postcodeerror" className="alert-message space-5">&nbsp;</span>
            </div>
               )
        }
})

//**********--- To Display Dob field  ---**********
var Dob = React.createClass({
    validate: function () {
        var error = "";
        var today = new Date();
        var nowmonth = today.getMonth();
        var nowday = today.getDate();
        var nowyear = today.getFullYear();

        var dob = new Date($("#dob-datePicker").val());
        var dobMonth = dob.getMonth();
        var dobDay = dob.getDate();
        var dobYear = dob.getFullYear();
        var age = nowyear - dobYear;
        if ($('#txtDate').val() == "") {
            document.getElementById("doberror").innerHTML = "Please enter your DOB."
            return false;
        }
        else if ($('#txtDate').val().length < 10) {
            document.getElementById("doberror").innerHTML = "Please enter valid date of birth."
            return false;
        }     
        else {
            var today = new Date();
            var nowyear = today.getFullYear();
            var dateOfBirth = $("#txtDate").val().split("/");
            var d = dateOfBirth[1]+"/"+ dateOfBirth[0]+"/"+ dateOfBirth[2];
            var dob = new Date(d);
            var dobYear = Number(dob.getFullYear());
            var age = Number(nowyear) - Number(dobYear);
            if (Number(age < 18)) {
                document.getElementById("doberror").innerHTML = "You need to be 18+ to join playzoola"
                return false;
            }
            else if (Number(age > 100))
            {
                document.getElementById("doberror").innerHTML = "Please enter valid date of birth."
                return false;
            }
            else {
                document.getElementById("doberror").innerHTML = "&nbsp;"
            }
        }
    },
    render: function(){
        return(
            <div>
                <input  className="form-control" placeholder="dd/mm/yyyy" maxLength='10' onBlur={this.validate}  id="txtDate" data-inputmask="'alias': 'date'" />
                 <span id="doberror" className="alert-message space-5">&nbsp;</span>
            </div>
               )
        }
})


$(document).on("keypress", "#txtDate1", function (e) {
    var k = e.which;

    if (k < 48 || k > 57) {
        if (k != 8) {
            e.preventDefault()
        }
    }
}
)

$(document).on("keypress", "#num", function (e) {
    var k = e.which;
    if (k < 48 || k > 57) {
        if (k != 8) {
            e.preventDefault()
        }
    }
}
)
$(document).on("keypress", "#num1", function (e) {
    var k = e.which;
    if (k < 48 || k > 57) {
        if (k != 8) {
            e.preventDefault()
        }
    }
}
)
$(document).on("keypress", "#mobile", function (e) {
    var k = e.which;

    if (k < 48 || k > 57) {
        if (k != 8) {
            e.preventDefault()
        }
    }
}
)
$(document).on("keypress", "#town", function (e) {
    var k = e.which;

    if (!(k < 48 || k > 57)) {
        if (k != 8) {
            e.preventDefault()
        }
    }
}
)
//**********--- Component for Account Profile ---**********
var Profile = React.createClass({
    getInitialState: function () {
        return {
            files: [],
            file: [],
            teams: [],
            items: [],
            selectedAvatar: "",
            manualaddress: false,
            Mobilenumber:''
         };
     },
    componentWillMount: function () {
        //var file_ids = 'av12.png,av34.png,av56.png';
        ////console.log(file_ids.split(","))
        //var res = file_ids.split(",");
        //this.serverRequest = $.get(baseurl + "registration/form/" + userId +","+ sessionId, function (result) {
        //    if (typeof result != 'object') {
        //        result = JSON.parse(result)
        //    }
        //    this.setState({ file: result.files[0].file_ids.split(","), teams: result.files[0].teams })
        //   }.bind(this));
    },
    validateTitle: function (event) {
        var tit = $('#Title').val();
        if (tit == "" || tit == null) {    
            document.getElementById("titleerror").innerHTML = "Please choose title."
            return false;
        }
        else {
            document.getElementById("titleerror").innerHTML = "&nbsp;";
        }
    },
    validateAddress: function (event) {
        var add = $('#address').val();
        if (add == "" || add == null) {
            document.getElementById("addresserror").innerHTML = "Please enter your address."
            return false;
        }
        else {
            document.getElementById("addresserror").innerHTML = "&nbsp;";
        }
    },
    validateTown: function (event) {
        var Town = $('#town').val();
        if (Town == "" || Town == null) {
            document.getElementById("townerror").innerHTML = "Please enter your town."
            return false;
        }
        else {
            document.getElementById("townerror").innerHTML = "&nbsp;";
        }
    },
    validateCountry: function (event) {
        var Country = $('#country').val();
        if (Country == "" || Country == null) {
            document.getElementById("countryerror").innerHTML = "Please select your country."
            return false;
        }
        else {
            document.getElementById("countryerror").innerHTML = "&nbsp;";
        }
    },
    validatePhonenumber: function (event) {
        var number = $('#num').val();
        if (number == "" || number == null) {
            document.getElementById("numbererror").innerHTML = "Please enter your mobile number."
            return false;
        }
        else if (number.length < 11) {
            document.getElementById("numbererror").innerHTML = "Please enter valid mobile number."
            return false;
        }
        else {
            document.getElementById("numbererror").innerHTML = "&nbsp;";
        }
    },
    validatePhonenum: function (event) {
        var number1 = $('#num1').val();
        if (number1 == "" || number1 == null) {
            document.getElementById("numbererror1").innerHTML = "Please enter your mobile number."
            return false;
        }
        else if (number1.length < 11) {
            document.getElementById("numbererror1").innerHTML = "Please enter valid mobile number."

            return false;
        }
        else {
            document.getElementById("numbererror1").innerHTML = "&nbsp;";
        }
    },
    componentDidMount: function () {
       var self = this;    
       $(document).ready(function(){
            /*if (e.keyCode != 193 && e.keyCode != 111) {
                //console.log(e.keyCode);
                if (e.keyCode != 8) {
                    if ($(this).val().length == 2) {
                        $(this).val($(this).val() + "/");
                    } else if ($(this).val().length == 5) {
                        $(this).val($(this).val() + "/");
                    }
                   
                } else {
                    var temp = $(this).val();
                    if ($(this).val().length == 5) {
                        $(this).val(temp.substring(0, 4));
                    } else if ($(this).val().length == 2) {
                        $(this).val(temp.substring(0, 1));
                    }
                   
                }
            } else {
                var temp = $(this).val();
                var tam = $(this).val().length;
                $(this).val(temp.substring(0, tam - 1));
            }*/
           $(":input").inputmask();
           
        });
        //$("#txtDate").mask("99/99/9999");
      },

   
    submitForm: function () {  //**********--- Function to read Submit Form  ---**********
        var obj = {};
        obj.title = $("#Title").val()
        obj.firstname = $("#Name").val()
        obj.lastname = $("#Surname").val()
        obj.dob = $("#dob-datePicker").val()
        obj.postcode = $("#postcode").val()
        obj.address1 = $("#address").val()
        obj.phone = $("#num").val()
        obj.mobile = $("#mobile").val()
        var mnts={"01":"JAN","02":"FEB","03":"MAR","04":"APR","05":"MAY","06":"JUN","07":"JUL","08":"AUG","09":"SEP","10":"OCT","11":"NOV","12":"DEC"}
        var  dateSplit= $("#txtDate").val().split("/")
        var mon = dateSplit[1];
        var fDate = dateSplit[0]+""+mnts[mon]+""+dateSplit[2]
        var data1 = {
            "items": [{
                "title":$("#Title").val(),
                "firstname": $("#Name").val(),
                "lastname": $("#Surname").val(),
                "dob": fDate,
                "address1": $("#address").val(),             
                "postcode": $("#postcode").val(),
                "mobile": this.state.manualaddress?$("#num").val():$("#num1").val(),
                "phone": $("#mobile").val(),
                "checkbox": $("#check").is(":checked") ? "Y" : "N",
                "address2": $("#address2").val(),
                "address3": $("#address3").val(),
                "town_city": $("#town").val(),
                "county": $("#county").val(),
                "country": $("#country").val(),
            }]
        }
        var error = "";
        var isError = false;
        var illegalChars = /[\W]/;
        //var value = event.target.value;
        var tit = $('#Title').val();
        var nam = $('#Name').val();       
        var sur = $('#Surname').val();
        var postcode = $('#postcode').val();
        var date = $('#txtDate').val();
        var add = $('#address').val();
        var add2 = $('#address2').val();
        var add3 = $('#address3').val();
        var number = $('#num').val();
        var number1 = $('#num1').val();
        var Mobile = $('#mobile').val();
        var Town = $('#town').val();
        var Country = $('#country').val();
        var County = $('#county').val();

        if (tit == "") {
            error = "Please choose title.\n";
            document.getElementById("titleerror").innerHTML = "Please choose title."
            isError = true;
        }
        else {
            document.getElementById("titleerror").innerHTML = "&nbsp;"
        }
        if (nam == "") {
            error = "Please enter your name.\n";
            document.getElementById("nameerror").innerHTML = "Please enter your name."
            isError = true;
        }
        if (sur == "") {
            error = "Please enter your surname.\n";
            document.getElementById("surnamerror").innerHTML = "Please enter your surname."
            isError = true;
        }
        if (postcode == "") {
            error = "Please enter your postcode.\n";
            document.getElementById("postcodeerror").innerHTML = "Please enter your postcode."
            isError = true;
        }
        else {
            document.getElementById("postcodeerror").innerHTML = "&nbsp;"
        }
        if (date == "") {
            error = "Please enter your DOB.\n";
            document.getElementById("doberror").innerHTML = "Please enter your DOB."
            isError = true;
        }
        else if (date.length < 10) {
            document.getElementById("doberror").innerHTML = "Please enter valid date of birth."
            isError = true;
        }    
        else {
            var today = new Date();
            var nowyear = today.getFullYear();
            //var dob = new Date($("#txtDate").val());
            var dateOfBirth = $("#txtDate").val().split("/");
            var d = dateOfBirth[1]+"/"+ dateOfBirth[0]+"/"+ dateOfBirth[2];
            var dob = new Date(d);
            var dobYear = dob.getFullYear();
            var age = nowyear - dobYear;
            if (Number(age < 18))
            {
                document.getElementById("doberror").innerHTML = "You need to be 18+ to join playzoola"
                isError = true;
            }
            else if (Number(age > 100))
            {
                document.getElementById("doberror").innerHTML = "Please enter valid date of birth."
                isError = true;
            }
            else {
                document.getElementById("doberror").innerHTML = "&nbsp;"
            }
        }

        if(this.state.manualaddress==true){
            if (add == "") {
                error = "please enter your address.\n";
                document.getElementById("addresserror").innerHTML = "Please enter your address."
                isError = true;
            }
            else {
                document.getElementById("addresserror").innerHTML = "&nbsp;"
            }
            if (Town == "") {
                error = "Please enter your town.\n";
                document.getElementById("townerror").innerHTML = "Please enter your town"
                isError = true;
            }
            else {
                document.getElementById("townerror").innerHTML = "&nbsp;";
            }
            if (Country == "") {
                error = "Please select your country.\n";
                document.getElementById("countryerror").innerHTML = "&nbsp;"
                isError = true;
            }
            else {
                document.getElementById("countryerror").innerHTML = "&nbsp;";
            }
            if (number == "") {
                error = "Please enter your mobile number.\n";
                document.getElementById("numbererror").innerHTML = "Please enter your mobile number."
                isError = true;
            }
            else if (number.length < 11) {
                document.getElementById("numbererror").innerHTML = "Please enter valid mobile number."
                isError = true;
            }
            else {
                document.getElementById("numbererror").innerHTML = "&nbsp;"
            }
            this.setState({Mobilenumber : number})
        }
        else
        {
            if (number1 == "") {
                error = "Please enter your mobile number.\n";
                document.getElementById("numbererror1").innerHTML = "Please enter your mobile number."
                isError = true;
            }
            else if (number1.length < 11) {
                document.getElementById("numbererror1").innerHTML = "Please enter valid mobile number."
                isError = true;
            }
            else {
                document.getElementById("numbererror1").innerHTML = "&nbsp;"
            }
            this.setState({Mobilenumber : number1})
        }
        if (!$('#check').is(":checked")) {
            error = "Please confirm that you read the message.\n";
            checkboxValue = 'N';
            document.getElementById("checkboxerror").innerHTML = "Please confirm that you read the message"
            isError = true;
        }
        else {
            checkboxValue = 'Y';
            document.getElementById("checkboxerror").innerHTML = "&nbsp;"
        }
        if (isError) {
            return false;
        }
        else {
            this.serverRequest = $.post(baseurl + "registration/update/"+ userId + "," + sessionId , JSON.stringify(data1), function (data) {
                if (data1.items) {
                    document.getElementById("titleerror").innerHTML = "&nbsp;"
                    document.getElementById("nameerror").innerHTML = "&nbsp;"
                    document.getElementById("surnamerror").innerHTML = "&nbsp;"
                    document.getElementById("doberror").innerHTML = "&nbsp;"
                    document.getElementById("postcodeerror").innerHTML = "&nbsp;"
                    window.location = "/build/views/Football/QuickTopUp/Quick-Top-Up.html?islog=true"                    
                }
            }.bind(this));
        }
    },
    selectAvatar: function (id, name) {
        this.setState({ selectedAvatar: name });
        $("#" + id).addClass('selected-avatar').siblings().removeClass('selected-avatar');
    },
    selectTeam: function () {
        //console.log($("#FavTem").val());
        $(".team-name").removeClass('selected-team');
        //console.log($("#team_" + $("#FavTem").val()))
        $("#team_" + $("#FavTem").val()).addClass('selected-team')
    },
    ontwitterchange:function(){

    },
    changeTeam: function(id){
        $(".team-name").removeClass('selected-team');
        $("#team_" + id).addClass('selected-team');
        $("#FavTem").val(id)
    },
    gotoManualaddress: function () {        
        var num1 = $("#num1").val();
        this.setState({manualaddress: true})
        setTimeout(function(){$("#num").val(num1)},500)
        
    },
       render: function () {
           var self = this;
           var mob = this.state.Mobilenumber;
               return (<div>
                    <div className="space-10"></div>
                    <div className="row">                        
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            {/*<p className="text-center">Playzoola encourages responsible gambling. To do this, we need to check who you are.</p>*/}
                        </div>
                    </div>
                    
 		            <div className="row">

                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-centered padding-right-20 padding-left-20">
                                <div className="space-10"></div>
                                
                                <div className="login-box col-centered">
                                    <div className="padding-30">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className="tit-txt">
                                                            Title*
                                                        </div>
                                                        <div className="form-group title-dropdown">

                                                            <div className="zoola-select bg-white">
                                                                <select id="Title" onBlur={this.validateTitle} className="height-50">
                                                                    <option></option>
                                                                    <option>Mr</option>
                                                                    <option>Miss</option>
                                                                    <option>Ms</option>
                                                                    <option>Mrs</option>
                                                                    <option>Dr</option>
                                                                </select>
                                                            </div>
                                                            <span id="titleerror" className="alert-message space-5">&nbsp;</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                                                        <div className="tit-txt">
                                                            First name*
                                                        </div>
                                                       <div className="form-group">
                                                            <Name />
                                                       </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="tit-txt">
                                                            Last name*
                                                        </div>
                                                        <div className="form-group">
                                                            <Surname />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="tit-txt">
                                                            Date of birth*
                                                        </div>
                                                        <div className="form-group">
                                                           <Dob />
                                                        </div>
                                                    </div>
                                                </div>
                                               <div>
                                                 <div className="row">
                                                    <div className={this.state.manualaddress?"col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-fields-hide ":"col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-fields-show"}>
                                                        <div className="tit-txt">
                                                            Mobile number*
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="00000 000000" defaultValue="" onBlur={this.validatePhonenum} maxLength="13" minLength="3" id='num1' data-inputmask="'mask':'99999 999999', 'placeholder':''"/>
                                                            <span id="numbererror1" className="alert-message space-5">&nbsp;</span>
                                                        </div>
                                                    </div>
                                                 </div>
                                                 </div>
                                                 <div><div className="row">
                                                    <div className={this.state.manualaddress?"col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-fields-show":"col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-fields-hide"}>
                                                        <div className="tit-txt">
                                                            Address Line 1*
                                                        </div>
                                                        <div className="form-group">
                                                                <input type="text" className="form-control" placeholder="Address Line 1" onBlur={this.validateAddress} defaultValue="" id='address'/>
                                                            <span id="addresserror" className="alert-message space-5">&nbsp;</span>
                                                        </div>
                                                    </div>
                                                 </div>
                                                <div className="row">
                                                    <div className={this.state.manualaddress?"col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-fields-show":"col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-fields-hide"}>
                                                        <div className="tit-txt">
                                                            Address Line 2
                                                        </div>
                                                        <div className="form-group">
                                                                <input type="text" className="form-control" placeholder="Address Line 2" defaultValue="" id='address2' />
                                                            <span id="address2error" className="alert-message space-5">&nbsp;</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className={this.state.manualaddress?"col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-fields-show":"col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-fields-hide"}>
                                                        <div className="tit-txt">
                                                            Address Line 3
                                                        </div>
                                                        <div className="form-group">
                                                                <input type="text" className="form-control" placeholder="Address Line 3" defaultValue="" id='address3' />
                                                            <span id="address3error" className="alert-message space-5">&nbsp;</span>
                                                        </div>
                                                    </div>
                                                </div>                                                
                                                </div>
                                                <div className="row">
                                                    <div className={this.state.manualaddress?"col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-fields-show":"col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-fields-hide"}>
                                                        <div className="tit-txt">
                                                            Town / City*
                                                        </div>
                                                        <div className="form-group">
                                                                <input type="text" className="form-control" onBlur={this.validateTown} placeholder=" Town / City" defaultValue="" id='town'/>
                                                            <span id="townerror" className="alert-message space-5">&nbsp;</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                <div className="row">
                                                    <div className={this.state.manualaddress?"col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-fields-show":"col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-fields-hide"}>
                                                        <div className="tit-txt">
                                                            County
                                                        </div>
                                                        <div className="form-group">
                                                                <input type="text" className="form-control" placeholder="County" defaultValue="" onBlur={this.validateCountry} id='county' />
                                                            <span id="countyerror" className="alert-message space-5">&nbsp;</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className={this.state.manualaddress?"col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-fields-show":"col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-fields-hide"}>
                                                        <div className="tit-txt">
                                                            Country*
                                                        </div>
                                                        <div className="form-group title-dropdown">

                                                            <div className="zoola-select bg-white">
                                                                <select id="country">
                                                                    <option>UK</option>
                                                                    <option>Great Britain</option>
                                                                    <option>Isle of Man</option>
                                                                    <option>Channel Islands</option>
                                                                    <option>Northern Ireland</option>

                                                                </select>
                                                            </div>
                                                            <span id="countryerror" className="alert-message space-5">&nbsp;</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="tit-txt">
                                                            UK postcode*
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="hidden" className="form-control autocomplete" placeholder="UK postcode*" />
                                                            <Postcode />
                                                        </div>
                                                    </div>
                                                </div>
                                                {this.state.manualaddress?<div></div>:<div>
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <span className="sm-txt underline" onClick={this.gotoManualaddress}>
                                                            Enter your address manually
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="space-5"></div>
                                                </div>}
                                                {this.state.manualaddress?'':<div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="form-group">
                                                            <textarea rows="" cols="50" className="form-control" id='showaddress' readOnly></textarea>
                                                        </div>
                                                    </div>
                                                    <span id="" className="alert-message space-5">&nbsp;</span>
                                                </div>}
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="tit-txt">
                                                            Home number
                                                        </div>
                                                        <div className="form-group">
                                                                <input type="text" className="form-control" placeholder="000 0000 0000" defaultValue="" maxLength="13" id='mobile' data-inputmask="'mask':'999 9999 9999', 'placeholder':''" />
                                                            <span id="" className="alert-message space-5">&nbsp;</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={this.state.manualaddress?"row ":"row pl-fields-hide"}>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="tit-txt">
                                                            Mobile number*
                                                        </div>
                                                        <div className="form-group">
                                                                <input type="text" className="form-control" placeholder="0000 000 000" defaultValue={mob} onBlur={this.validatePhonenumber} maxLength="13" minLength="3" id='num' data-inputmask="'mask':'99999 999999','placeholder':''" />
                                                            <span id="numbererror" className="alert-message space-5">&nbsp;</span>
                                                        </div>
                                                    </div>
                                                </div> 
                                            </div>
                                            
                                        </div>
                                        
                                        
                                        </div>
                                    </div>

                                    <div className="space-10"></div>
                                    <div className="login-box col-centered">
                                        <div className="padding-10">
                                            <div className="space-5"></div>
                                            <div className="row">
                                                <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-right">
                                                    <div className="form-group">
                                                        <div className="checkbox">
                                                            <input type="checkbox" id="check"/>                                                           
                                                            <label> </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 padding-left-20">
                                                    <div className="sm-txt">I acknowledge that Playzoola maintains player funds in separate account in accordance with the Gambling Commission's player funds rating of <span className="d-block-m underline pointer-hand"><a href="http://www.gamblingcommission.gov.uk/Consumers/Protection-of-customer-funds.aspx" target="_blank">high.</a></span> In case of insolvency, funds are protected.</div>
                                                </div>
                                            </div>
                                            <div className="alert-message"> </div>
                                            <div className="space-5"></div>
                                        </div>                                    
                                    </div>
                                 <div id="checkboxerror" className="alert-message"></div>
                            <div className="space-5"></div>
                            <div className="space-5"></div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-centered ">
            	                    <button type="submit" className="btn zoola-btn" onClick={this.submitForm}><div className="btn-txt">Continue</div></button>
                                </div>
                            </div>

                                     </div>
                                </div>
                      <div className="space-10"></div>

                       </div>)
                             }
});

