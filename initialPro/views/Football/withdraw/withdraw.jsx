/** @jsx React.DOM */

//**********--- call getCookie function to read cookie---**********
getCookie()

if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}
//**********--- subheader component ---**********
var Subheader = React.createClass({
    render: function () {
        return (
                   <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                                <h3>REQUEST A WITHDRAWAL</h3>
                        </div>
                   </div>
        )
    }
});
//**********--- Balance component ---**********
var Balance = React.createClass({
    getInitialState: function () {
        return {          
            items: {}
        }
    },
    componentWillMount: function (itemName) {      
        this.serverRequest = $.get(baseurl + "general/navbar/" + userId + "," + sessionId, function (result) {
            // console.log(result)
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            this.setState({ items: result.header[0] })
        }.bind(this));

    },
    render: function () {
        return (
                   <div className="row">
                         <div className="col-lg-6 col-md-8 col-sm-8 col-sm-12 text-center col-centered">
                               <div className="topup-round-white"><div className="topup-bal">YOUR BALANCE : </div><div className="topup-balance">&pound;{this.state.items.balance}</div></div>
                         </div>
                  </div>
               )
        }
});

$(document).on("keypress","#withdraw1",function (e) {
    var k = e.which;
    if (k < 48 || k > 57) {
        if (k != 8) {
            e.preventDefault()
        }
    }
}
)
$(document).on('keyup', '#withdraw1', function (e) {

    if (e.keyCode == 13) {
        $("#key").click();
    }
})
//**********--- Withdraw component ---**********
var Withdraw = React.createClass({
    getInitialState: function () {
        return {
            selectvalue: [],
            showWithdrawFMsg: false,
            userMsg:'',
        };
    },
    valdate: function (event) {       // Function to validate withdraw amount
        var Withdraw = $('#withdraw1').val();
        var isError = false;
        if(Number(SupHeaderThis.state.items.balance)<Number(Withdraw)){
            document.getElementById("withdrawerror").innerHTML = "Your account balance is less than requested amount."
            isError = true;
        }
        else if ($('#withdraw1').val() == "" && this.state.selectvalue == "") {
            error = "please enter your withdraw amount.\n";
            document.getElementById("withdrawerror").innerHTML = "Please enter your withdraw amount."
            isError = true;
        }
        else if ($('#withdraw1').val() != "" && (($('#withdraw1').val() < 5) || ($('#withdraw1').val() > 1000))) {
            error = "withdraw Must  Be  Between 5 To 1000. \n";
            document.getElementById("withdrawerror").innerHTML = "withdraw amount must  be  between 5 to 1000."
            isError = true;
        }
        else if ($('#withdraw1').val().substring(0, 1) == '0') {
            error = "Please enter valid amount. \n";
            document.getElementById("withdrawerror").innerHTML = "Please enter valid amount."
            isError = true;
        }
        else {
            document.getElementById("withdrawerror").innerHTML = "&nbsp;"
        }

        if (isError) {
            return false;
        }
        if (!Withdraw > 0) {
            Withdraw = this.state.selectvalue;
        }
        this.serverRequest = $.get(baseurl + "deposit/maxwd/" + userId + "," + sessionId + "," + Withdraw, function (result) {
            // console.log(result)
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            if (result.items.length > 0)
            {
                if (result.items[0]["message"] == "Proceed") {
                    // window.location = "/build/views/Football/withdraw_card/withdraw_card.html?islog=true&amt=" + Withdraw
                    window.location = "/withdrawcard/?islog=true&amt=" + Withdraw
                }
                else {                  
                    this.setState({ showWithdrawFMsg: true, userMsg: result.items[0]["message"]})
                    return false;
                }
            }                           
            document.getElementById("withdrawerror").innerHTML = "&nbsp;"
        }.bind(this));
       

    },

    select: function (val,id) {
        this.setState({ selectvalue: val })
        $(".topup-round-lightblue").removeClass('selected-topup');
        $("#" + id).addClass('selected-topup')
        $('#withdraw1').val('');
        document.getElementById("withdrawerror").innerHTML = "&nbsp;"
    },
    remove: function () {
        this.setState({ selectvalue: "" })
        $(".topup-round-lightblue").removeClass('selected-topup');
        document.getElementById("withdrawerror").innerHTML = "&nbsp;"
    },
    hideWithdrawFMsg: function () {        
        this.setState({ showWithdrawFMsg: false, userMsg: '' })
    },
    render: function () {
        return (  <div>

                      {this.state.showWithdrawFMsg?<div className="container-fluid bg-error">
                <div className="space-5"></div>
              <div className="container">           
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                    <img src="/images/error.svg" alt="Success" className="" width="30" />
                </div>
                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 no-padding">

                    <span className="sm-txt font-18">{this.state.userMsg}</span>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                    <img src="/images/close-icon.svg" alt="Success" width="20" className="pointer-hand margin-top-5" onClick={this.hideWithdrawFMsg} />
                </div>
            </div>
            <div className="space-5"></div>                                      
     </div>:''}
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-8 col-sm-8 col-xs-12 col-centered">
                                    <div className="space-10"></div>
                                    <div className="row">
                                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-10 margin-top-10 col-centered no-padding">
                                                <div className="topup-round-lightblue topup-value no-margin">+&pound;<input type="tel" pattern="[0-9]*" className="topup-input " id="withdraw1" maxLength='4' onFocus={this.remove} /></div>

                                                <div className="space-5 alert-message" id="withdrawerror">&nbsp;</div>
                                        </div>
                                    </div>

                                {/*<div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 margin-top-10">
                                                <div className="topup-round-lightblue topup-value pointer-hand" id="pound5" onClick={this.select.bind(null, 5, "pound5")}>&pound;5</div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 margin-top-10" >
                                                <div className="topup-round-lightblue topup-value pointer-hand" id="pound10" onClick={this.select.bind(null, 10, "pound10")}>&pound;10</div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 margin-top-10">
                                                <div className="topup-round-lightblue topup-value pointer-hand" id="pound20" onClick={this.select.bind(null, 20, "pound20")}>&pound;20</div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 margin-top-10">
                                                <div className="topup-round-lightblue topup-value" >&pound;<input type="tel" pattern="[0-9]*"  className="topup-input " id="withdraw1" maxLength='4'  onFocus={this.remove}/></div>
                                                <div id="withdrawerror" className="alert-message"> </div>
                                        </div>
                                    </div>*/}
                                  <div className="row">
                                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-10 col-centered">
                                          <button type="submit" className="btn zoola-btn" onClick={this.valdate} id='key'><div className="btn-txt">Request now</div></button>
                                    </div>
                                  </div>
                            </div>
                        </div>
                    </div>
                        <div className="space-10"></div>
                        
                        <div className="space-10"></div>
                        <div className="space-10"></div>
                 </div>
          )
       }

});