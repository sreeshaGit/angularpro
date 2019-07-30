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
//**********--- Component to display Account Created ---**********
var AccountCreated = React.createClass({

    render: function () {
        return (
            <div>
                <div className="container-fluid header">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                                <h3>DEPOSIT LIMIT</h3>
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
                                Playzoola encourages its players to gamble responsibly. We recommend that you review your gambling activity on a regular basis, and ensure to take steps to make sure you're the one in control. For more information, see our
                                <a href="https://playzoola.zendesk.com/hc/en-us/categories/200960809-Responsible-Gambling" className="underline purple" target="_blank"> Responsible Gambling Policy.</a>
                            </p>{/*<p>We suggest to set a deposit limit to keep control of how much you spend, or if you feel like things ae getting out of control take a Time-Out.</p>*/}
                        </div>
                    </div>
                    <div className="space-10"></div>

                </div>
            </div>
                  )
}
});

$('input[name="limit"]').on('change', function(){
    $('input[name="limit"]').prop('checked', function(){
        return this.defaultChecked;
    });
});

//**********--- Component to display DepositLimit ---**********
var DepositLimit = React.createClass({
    getInitialState: function () {
        return {
            Depositlim: {},
            number: '',
            isDepositLimit:false,
            depositLimit1 :false,
            depositAlready:false
        };
    },
    componentWillMount: function (itemName) {
        this.serverRequest = $.get(baseurl + "admin/depositlimit/" + userId + ',' + sessionId, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            // console.log(result.items.length)
            if (result.items.length > 0)
            {
                if ((result.items[0].deposit_limit && result.items[0].deposit_limit > 0) && (result.items[0].duration && result.items[0].duration.length > 0)) {
                    this.setState({ Depositlim: result.items[0], isDepositLimit: true,depositAlready:true });

                }
            }
            var self = this;
            setTimeout(function () {
                self.setState({ isDepositLimit: true });
            }, 1000)


        }.bind(this));
        //var data = {
        //    "cards": [{ "pyr_id": "1000", "nickname": "My blue card", "card_type": "VISA", "digits": "446291xxxxxx1234", "expiry": "1217" }]
        //}
        //this.setState({ cards: data.cards });
    },
    depositLimit: function () {
        //console.log(this.state.isDepositLimit)
        if(this.state.depositAlready){
            $("#alert-modal1").modal('show');
            return false;
        }
        var Topup = $('#number').val();
        var isError = false;
        if ($('#number').val() == "") {
            error = "please enter your Deposit Limit.\n";
            document.getElementById("topuperror").innerHTML = "Please enter your deposit limit."
            isError = true;
        }
        else if ($('#number').val() != "" && (($('#number').val() < 5) || ($('#number').val() > 1000))) {
            error = "Deposit limit must Be  Between 5 To 1000. \n";
            document.getElementById("topuperror").innerHTML = "Deposit limit must  be  between 5 to 1000."
            isError = true;
        }
        else if ($('#number').val().substring(0, 1) == '0') {
            error = "Please enter valid amount. \n";
            document.getElementById("topuperror").innerHTML = "Please enter valid amount."
            isError = true;
        }
        else {
            document.getElementById("topuperror").innerHTML = ""

        }

        if (isError) {
            return false;
        }
        var selectedValue = $('input[name=limit]:checked').val();
        if (selectedValue != '' && selectedValue != null) {
            var data1 = { "items": [{ "usr_limit": Topup, "usr_limit_duration": selectedValue }] }

            document.getElementById("valueerror").innerHTML = ""

            this.serverRequest = $.post(baseurl + "admin/depositlimit/" + userId + "," + sessionId,JSON.stringify(data1), function (result) {
                window.location = "/build/views/Football/myprofile/myprofile.html?islog=" + is_loggedIn
            }.bind(this));


        }
        else {
            document.getElementById("valueerror").innerHTML = "Please select deposit limit."
        }
    },
    gotoMyProfile: function () {
       // window.location = "/build/views/Football/myprofile/myprofile.html?islog=" + is_loggedIn
        window.location = "/myprofile/?islog=" + is_loggedIn
    },
    //Phase2-66 PP - Change all the buttons from grey to some other color
    radioClicked:function(type){
        if(type == 'showPopup'){
            $("#alert-modal1").modal('show');
        }else{
            if($('#number').val() == ''){
                this.setState({ depositLimit1 : false });
            }else{
                this.setState({ depositLimit1 : true });
            } 
        }
    },// //Phase2-66 PP
    alreadyDeposit:function(){
        // console.log("alreadyDeposit=======")
        //document.getElementById('perMonth').att
        // $("#perMonth").attr('checked', true);

        $("#alert-modal1").modal('show');

    },

    render: function () {
        var amount = this.state.Depositlim.deposit_limit;
        return (
        <div>
            {this.state.isDepositLimit?<div>

        <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-7 col-xs-12 col-centered">
                <div className="tit-txt text-center">SET A DEPOSIT LIMIT</div>
                <div className="zoola-box col-centered self-exclusion">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <div className="topup-round-lightblue topup-value bg-light-blue">&pound;{this.state.Depositlim.deposit_limit?<input type="text" className="topup-input " defaultValue={""+this.state.Depositlim.deposit_limit} id="number" onClick={this.alreadyDeposit} maxLength='4' readOnly={true} />:<input type="text" className="topup-input " id="number" onClick={this.radioClicked} maxLength='4' />}</div>
                            <div id="topuperror" className="alert-message"> </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group">
                                <div className="checkbox">

                                    {/*this.state.Depositlim.duration?<input type="radio" name="limit" id="" value="per day" onClick={this.alreadyDeposit} defaultChecked={this.state.Depositlim.duration=='per day'?true:false } readOnly={true} />:<input type="radio" name="limit" id="" onClick={this.radioClicked} value="per day" />*/}
        {this.state.Depositlim.duration == 'per day'?<input type="radio" name="limit" id="perDay" value="per day" onClick={this.alreadyDeposit} readOnly = {true} checked='checked'/>:<input type="radio" name="limit" id=""  onClick={this.state.Depositlim.duration == undefined ? this.radioClicked.bind(null,'') : this.radioClicked.bind(null,'showPopup')} value="per day" />}
        <label className="tit-txt">per day</label>
</div>
</div>
<div className="form-group">
    <div className="checkbox">
        {/*this.state.Depositlim.duration?<input type="radio" name="limit" id="" value="per week" onClick={this.alreadyDeposit} defaultChecked={this.state.Depositlim.duration == 'per week' ? true : false} readOnly={true} />:<input type="radio" name="limit" id="" onClick={this.radioClicked} value="per week" />*/}
        {this.state.Depositlim.duration == 'per week'?<input type="radio" name="limit" id="perWeek" value="per week" onClick={this.alreadyDeposit} readOnly = {true} checked='checked'/>:<input type="radio" name="limit" id=""   onClick={this.state.Depositlim.duration == undefined ? this.radioClicked.bind(null,'') : this.radioClicked.bind(null,'showPopup')} value="per week" />}
        <label className="tit-txt">per week</label>
</div>
</div>
<div className="form-group">
    <div className="checkbox">
        {/*this.state.Depositlim.duration?<input type="radio" name="limit" id="" value="per month" onClick={this.alreadyDeposit} defaultChecked={this.state.Depositlim.duration == 'per month' ? true : false} readOnly={true} />:<input type="radio" name="limit" id="" onClick={this.radioClicked} value="per month" />*/}
        {this.state.Depositlim.duration == 'per month'?<input type="radio" name="limit" id="perMonth" onClick={this.alreadyDeposit} readOnly = {true} value="per month" checked='checked' />:<input type="radio" name="limit" id="" onClick={this.state.Depositlim.duration == undefined ? this.radioClicked.bind(null,'') : this.radioClicked.bind(null,'showPopup')}  value="per month" />}
        <label className="tit-txt">per month</label>
    </div>
</div>

</div>
<div id="valueerror" className="alert-message text-center"> </div>
</div>
<div className="space-5"></div>
<div className="row">
    <div className="col-lg-12 text-justify">
        <p>
            A request to set or reduce an existing limit will be applied immediately.<br />
            A request to increase or remove an existing limit will be subject to a 24 hour review period from receipt of request.
        </p>
    </div>
</div>
<div className="space-5"></div>
<div className="row">
    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12 col-centered">
        <button className={this.state.depositLimit1?"btn zoola-btn":"btn zoola-btn bg-dark-dark-blue"} onClick={this.depositLimit}><h5 className={this.state.depositLimit1?"":"light-blue"}>Set limit now</h5></button>
    </div>
</div>
</div>
</div>
</div>
<div className="space-5"></div>
<div className="row">
    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">{/*<p className="text-center">
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
 <div className="social-body">
    <div className="modal fade animated fadeIn" tabIndex="-1" role="dialog" aria-labelledby="Alert-Modal" id="alert-modal1" data-keyboard="true">
                                            <div className="modal-dialog modal-sm ">
                                                <div className="modal-content zoola-box alet-modal">
                                                    <div className="social-header">
                                                        <img src="/images/close-icon.svg" width="20" className="pull-right pointer-hand" data-dismiss="modal" />
                                                    </div>
                                                    <div className="social-body">
                                                        <div className="space-5"></div>
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <p>Please contact &nbsp;<a className="underline" href='https://playzoola.zendesk.com/hc/en-us/articles/209629225--Our-contact-details' target='_blank'>Customer Service</a> to make any changes.</p>
                                                            </div>
                                                        </div>
                                                        <div className="space-5"></div>{/* <div className="row">
                                                            <div className="col-lg-12 col-sm-12 col-md-12">
                                                                <button type="submit" className="btn zoola-btn"><h5 className="">Ok</h5></button>
                                                            </div>
                                                       </div>*/}
                                                                <div className="space-5"></div>
        	                                                </div>
                                                        </div>
                                                    </div>
            </div>
         </div>
        </div>:''}
        </div>

                  )
}
});