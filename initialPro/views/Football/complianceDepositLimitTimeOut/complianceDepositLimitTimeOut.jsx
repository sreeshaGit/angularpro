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
//**********--- Component to display Deposit Limit & Time Out---**********
var DepositLimitTimeOut = React.createClass({
    render: function () {
        return (
   <div>
   <div className="container-fluid header">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                    <h3>SET TIME-OUT</h3>
                </div>
            </div>
        </div>
   </div>
     <div className="space-5"></div>
   <div className="container">     
        <div className="space-5"></div>
        <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-justify">
                <p className="purple">
                    If you feel that gambling is getting the better of you then consider taking a short Time-Out. During the period of your Time-Out you will not be able to log-in or play. For more information see our 
                    <a href="https://playzoola.zendesk.com/hc/en-us/categories/200960809-Responsible-Gambling" className="underline purple"  target="_blank"> Responsible Gambling Policy.</a>
                </p>
              
            </div>
        </div>
        <div className="space-10"></div>
    </div>
    </div>
                  )
                       }
});
//**********--- Component to display Reduce Deposit Limit & Time Out---**********
var ReduceDepositLimit = React.createClass({
    //Phase2-66 PP - Change all the buttons from grey to some other color 
    getInitialState: function () {
        return {
            Timeout1: false,
            RadioSelUnsel : ""
        };
    },//Phase2-66 PP 

    timeOut: function () {
        var selectedValue = $('input[name=limit]:checked').val();

        if (selectedValue != '' && selectedValue != null)
        {
            var data1 = { "items": [{ "time_out_period": selectedValue }] }
            document.getElementById("valueerror").innerHTML = ""
            this.serverRequest = $.post(baseurl + "admin/timeout/"+userId+","+sessionId, JSON.stringify(data1), function (result) {
                // window.location = "/build/views/Football/myprofile/myprofile.html?islog=" + is_loggedIn
                this.serverRequest = $.get(baseurl + "user/logout/" + userId, function (result) {
                    var now = new Date();
                    var time = now.getTime();
                    time -= 3600 * 1000 * 24;
                    now.setTime(time);                   
                    var cookieValue = "PZdata={}; expires=" + now.toUTCString() + "; path=/; ";
                    document.cookie = cookieValue;
                   // window.location = "/build/views/Football/Index/index.html?islog=" + false
                    window.location = "/index/?islog=" + false
                }.bind(this));
            }.bind(this));
        }
        else {
            document.getElementById("valueerror").innerHTML = "Please set timeout."
        }
    },
    gotoMyProfile: function () {
        //window.location = "/build/views/Football/myprofile/myprofile.html?islog=" + is_loggedIn
        window.location = "/myprofile/?islog=" + is_loggedIn
    },
    radioClicked: function (val) {
        if($('#1Day').is(':checked') || $('#3Day').is(':checked') || $('#7Day').is(':checked') || $('#2Weeks').is(':checked') || $('#4Weeks').is(':checked') || $('#6Weeks').is(':checked')){
            this.setState({ Timeout1: true });
            this.setState({RadioSelUnsel : val});
        }else{
            this.setState({ Timeout1: false });
            this.setState({RadioSelUnsel : ""});
        }
    },// //Phase2-66 PP
    render: function () {
        return (
         <div>
          <div className="row">
            
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-centered">
                <div className="tit-txt text-center">SET A TIME OUT</div>
                <div className="zoola-box col-centered self-exclusion">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group">
                                <div className="checkbox">
                                    {this.state.Timeout1 && this.state.RadioSelUnsel == "1day"?<input type="radio" name="limit" className="styled" id="" value="1 day" onClick={this.radioClicked.bind(null,"1day")} checked/>:
                                    <input type="radio" name="limit" className="styled" id="1Day" value="1 day" onClick={this.radioClicked.bind(null,"1day")} />}
                                    <label className="tit-txt">1 day</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="checkbox">

                                    {this.state.Timeout1 && this.state.RadioSelUnsel == "3day"?<input type="radio" name="limit" className="styled" id="" value="3 day" onClick={this.radioClicked.bind(null,"3day")} checked/>:
                                    <input type="radio" name="limit" className="styled" id="3Day" value="3 day" onClick={this.radioClicked.bind(null,"3day")}/>}
                                    <label className="tit-txt">3 days</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="checkbox">
                                    {this.state.Timeout1 && this.state.RadioSelUnsel == "7day"?<input type="radio" name="limit" className="styled" id="" value="7 day" onClick={this.radioClicked.bind(null,"7day")} checked/>:
                                    <input type="radio" name="limit" className="styled" id="7Day" value="7 day" onClick={this.radioClicked.bind(null,"7day")}/>}
                                    <label className="tit-txt">7 days</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group">
                                <div className="checkbox">
                                    {this.state.Timeout1 && this.state.RadioSelUnsel == "2week"?<input type="radio" name="limit" className="styled" id="" value="2 weeks" onClick={this.radioClicked.bind(null,"2week")} checked/>:
                                        <input type="radio" name="limit" className="styled" id="2Weeks" value="2 weeks" onClick={this.radioClicked.bind(null,"2week")}/>}
                                    <label className="tit-txt">2 weeks</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="checkbox">
                                    {this.state.Timeout1 && this.state.RadioSelUnsel == "4week"?<input type="radio" name="limit" className="styled" id="" value="4 weeks" onClick={this.radioClicked.bind(null,"4week")} checked/> :
                                       <input type="radio" name="limit" className="styled" id="4Weeks" value="4 weeks" onClick={this.radioClicked.bind(null,"4week")}/>}
                                    <label className="tit-txt">4 weeks</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="checkbox">
                                    {this.state.Timeout1 && this.state.RadioSelUnsel == "6week"?<input type="radio" name="limit" className="styled" id="" value="6 weeks" onClick={this.radioClicked.bind(null,"6week")} checked/>:
                                               <input type="radio" name="limit" className="styled" id="6Weeks" value="6 weeks" onClick={this.radioClicked.bind(null,"6week")}/>}
                                    <label className="tit-txt">6 weeks</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="valueerror" className="alert-message text-center"> </div>
                    <div className="space-5"></div>
                    <div className="row">
                        <div className="col-lg-12 text-justify">
                            <p>
                                A  request  to  Time-Out  will  be  applied immediately. <br />
                                During  the  Time-Out  period  you  will  not be able to log-in or play. You will be able to log-in again after the Time-Out period.
                            </p>
                        </div>
                    </div>
                    <div className="space-5"></div>
                    <div className="space-10 hidden-sm hidden-md hidden-xs"></div>
                    <div className="row">
                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12 col-centered">
                            <button className={this.state.Timeout1 ? "btn zoola-btn" : "btn zoola-btn bg-dark-dark-blue"} onClick={this.timeOut }><h5 className={this.state.Timeout1? "":"light-blue"}>Time out now</h5></button>
                        </div>
                    </div>
                </div>
            </div>
                </div>
        <div className="space-5"></div>
        <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                {/*<p className="text-center">
                    If you'd like to take a longer break from gambling (6 months or more) see <span className="underline"><a href={"/build/views/Football/complianceSelfExclusion/complianceSelfExclusion.html?islog=" + is_loggedIn}>SELF-EXCLUSION</a></span>.
                </p>*/}
            </div>
        </div>
        <div className="space-10"></div>
        <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-centered ">
            	    <button type="submit" className="btn zoola-btn" onClick={this.gotoMyProfile}><div className="btn-txt">Back to my profile</div></button>
                </div>
        </div>
        <div className="space-10"></div>

        </div>             
            )
        }
});