/** @jsx React.DOM */
//**********--- call getCookie function to read cookie---**********
getCookie()
if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}
//**********--- Component to display text of self-Exclusion ---**********
var SelfExclusion = React.createClass({
    render: function () {
        return (
            <div>
     <div className="container-fluid header">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                    <h3>SELF-EXCLUSION</h3>
                </div>
            </div>
        </div>
     </div>
    <div className="space-5"></div>
    <div className="container">      
        <div className="space-10"></div>
        <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-justify">
                <p className="purple">
                    If you feel that gambling is getting the better of you and you need to take a longer break you can request Self-Exclusion. During the period of your Self-Exclusion you will not be able to log-in or play.
                </p>
                {/*<p>
                    We  would  also  recommend  that  you  also  request Self-Exclusion  from  any  other  sites  you  play  with and also contact one of the support organisations in our <a href="https://playzoola.zendesk.com/hc/en-us/categories/200960809-Responsible-Gambling" className="underline" target="_blank">Responsible Gambling Policy</a>
                </p>*/}
            </div>
        </div>
        <div className="space-10"></div>
    </div>
    </div>
                  )
                       }
});

//**********--- Component to display text of self-Exclusion content ---**********
var SelfExclusionBox = React.createClass({
    //Phase2-66 PP - Change all the buttons from grey to some other color 
    getInitialState: function () {
        return {
            selfExclusion1 :false,
            RadioSelUnsel : ""
        };
    },//Phase2-66 PP 


    selfExclusion: function () {
        var selectedValue = $('input[name=limit]:checked').val();
        if (selectedValue != '' && selectedValue != null) {
            var data1 = { "items": [{ "usr_self_excl": selectedValue }] }
            document.getElementById("valueerror").innerHTML = ""
            this.serverRequest = $.post(baseurl + "admin/selfexclusion/" + userId + "," + sessionId,JSON.stringify(data1), function (result) {
                //window.location = "/build/views/Football/myprofile/myprofile.html?islog=" + is_loggedIn
                this.serverRequest = $.get(baseurl + "user/logout/" + userId, function (result) {
                    var now = new Date();
                    var time = now.getTime();
                    time -= 3600 * 1000 * 24;
                    now.setTime(time);                 
                    var cookieValue = "PZdata={}; expires=" + now.toUTCString() + "; path=/; ";
                    document.cookie = cookieValue;
                    //window.location = "/build/views/Football/Index/index.html?islog=" + false
                    window.location = "/index/?islog=" + false
                }.bind(this));
            }.bind(this));
        }
        else {
            document.getElementById("valueerror").innerHTML = "Please select your exclusion period."
        }
    },
    gotoMyProfile: function () {
        //window.location = "/build/views/Football/myprofile/myprofile.html?islog=" + is_loggedIn
        window.location = "/myprofile/?islog=" + is_loggedIn
    },
    //Phase2-66 PP - Change all the buttons from grey to some other color 
    radioClicked:function(val){
        if($('#6Months').is(':checked') || $('#1Year').is(':checked') || $('#2Years').is(':checked') || $('#3Years').is(':checked') || $('#5Years').is(':checked')){
            this.setState({ selfExclusion1: true });
            this.setState({RadioSelUnsel : val});
        }else{
            this.setState({ selfExclusion1: false });
            this.setState({RadioSelUnsel : ""});
        }
    },// //Phase2-66 PP

    render: function () {       
        return (
            <div>               
         <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-centered">
                <div className="tit-txt text-center">SELF EXCLUSION</div>
                <div className="zoola-box col-centered self-exclusion">
                    <div className="row" id="tog">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding-right">
                            <div className="form-group">
                                <div className="checkbox">
                                    {this.state.selfExclusion1 && this.state.RadioSelUnsel == "6months"?<input type="radio" name="limit" className="styled" id="" value="6 months" onClick={this.radioClicked.bind(null,"6months")} checked/>:
                                       <input type="radio" name="limit" className="styled" id="6Months" value="6 months" onClick={this.radioClicked.bind(null,"6months")}/>}
                                    <label className="tit-txt">6 months</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="checkbox">
                                    {this.state.selfExclusion1 && this.state.RadioSelUnsel == "1year"?<input type="radio" name="limit" className="styled" id="" value="1 year" onClick={this.radioClicked.bind(null,"1year")} checked/>:
                                    <input type="radio" name="limit" className="styled" id="1Year" value="1 year" onClick={this.radioClicked.bind(null,"1year")}/>}
                                    <label className="tit-txt">1 year</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="checkbox">
                                    {this.state.selfExclusion1 && this.state.RadioSelUnsel == "2years"?<input type="radio" name="limit" className="styled" id="" value="2 years" onClick={this.radioClicked.bind(null,"2years")} checked/>:
                                    <input type="radio" name="limit" className="styled" id="2Years" value="2 years" onClick={this.radioClicked.bind(null,"2years")}/>}
                                    <label className="tit-txt">2 years</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group">
                                <div className="checkbox">
                                    {this.state.selfExclusion1 && this.state.RadioSelUnsel == "3years"?<input type="radio" name="limit" className="styled" id="" value="3 years" onClick={this.radioClicked.bind(null,"3years")} checked/>:
                                    <input type="radio" name="limit" className="styled" id="3Years" value="3 years" onClick={this.radioClicked.bind(null,"3years")}/>}
                                    <label className="tit-txt">3 years</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="checkbox">
                                    {this.state.selfExclusion1 && this.state.RadioSelUnsel == "5years"?<input type="radio" name="limit" className="styled" id="" value="5 years" onClick={this.radioClicked.bind(null,"5years")} checked/> :
                                        <input type="radio" name="limit" className="styled" id="5Years" value="5 years" onClick={this.radioClicked.bind(null,"5years")}/>}
                                    <label className="tit-txt">5 years</label>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div id="valueerror" className="alert-message text-center"> </div>
                    <div className="space-5"></div>
                    <div className="row">
                        <div className="col-lg-12 text-justify">
                            <p className="purple">
                                Your self-exclusion will be effective immediately. If you'd like to come back and play after your self-exclusion has ended you will need to contact us, and if we both agree that everything is OK then we'll reactivate your account again after a 24 hour review period.
                            </p>
                        </div>
                    </div>
                    <div className="space-5"></div>
                    <div className="space-10 hidden-sm hidden-md hidden-xs"></div>
                    <div className="row">
                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12 col-centered" id="colored">
                            <button className={this.state.selfExclusion1 ? "btn zoola-btn" : "btn zoola-btn bg-dark-dark-blue"} onClick={this.selfExclusion}><h5 className={this.state.selfExclusion1 ?"":"light-blue"}>Self Exclusion</h5></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="space-5"></div>

        <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                {/*<p className="text-center">
                    To set or change a DEPOSIT LIMIT or request a TIME-OUT, click <span className="underline"><a href={"/build/views/Football/complianceDepositLimitTimeOut/complianceDepositLimitTimeOut.html?islog=" + is_loggedIn}>here</a></span>.
                </p>*/}
            </div>
        </div>
        <div className="space-10"></div>
        <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-centered ">
            	    <button type="submit" className="btn zoola-btn" onClick={this.gotoMyProfile} id="colored"><div className="btn-txt">Back to my profile</div></button>
                </div>
        </div>
        <div className="space-10"></div>
</div>
   )
}
});