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
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                           <h1> WALLET</h1>
                      </div>
                 </div>
        )
    }
});
//**********--- Balance component ---**********
var Balance= React.createClass({
    render: function () {
        return (
            	     <div className="row">
                           <div className="col-lg-7 col-md-8 col-sm-8 col-sm-12 text-center col-centered">
                                 <div className="topup-round-white"><div className="topup-bal">balance: </div><div className="topup-balance">&pound;23.67 </div></div>
                           </div>
                     </div>
               )
        }
});

$(document).on("keypress","#topup",function (e) {
    var k = e.which;
    
    if (k < 48 || k > 57) {
        if (k != 8) {
            e.preventDefault()
        }
    }
}
)
//**********--- wallet component ---**********
var Wallet = React.createClass({
    getInitialState: function () {
        return {
            selectvalue: [],
        };
    },
    valdate: function (event) {       // Function to validate topup amount
        var Topup = $('#topup').val();
        var isError = false;
        if ($('#topup').val() == "" && this.state.selectvalue == "") {
            error = "please enter your topup value.\n";
            document.getElementById("topuperror").innerHTML = "Please enter your topup amount."
            isError = true;
        }
        else if ($('#topup').val() != "" && (($('#topup').val() < 10) || ($('#topup').val() > 1000))) {
            error = "Topup Must  Be  Between 10 To 1000. \n";
            document.getElementById("topuperror").innerHTML = "Topup amount must  be  between 10 to 1000."
            isError = true;
        }
        else {
            document.getElementById("topuperror").innerHTML = ""

        }

        if (isError) {
            return false;
        }
        if (!Topup > 0) {
            Topup = this.state.selectvalue;
        }
        // window.location = "/build/views/Football/addcard/addcard.html?islog=true&amt=" + Topup
        window.location = "/addcard/?islog=true&amt=" + Topup

    },

    select: function (val,id) {
        this.setState({ selectvalue: val })
        //$("#"+id).addClass('selected-topup').siblings().removeClass('selected-topup');
        $(".topup-round-lightblue").removeClass('selected-topup');
        $("#" + id).addClass('selected-topup')
        $('#topup').val('');
        document.getElementById("topuperror").innerHTML = ""
    },
    remove: function () {
        this.setState({ selectvalue: "" })
        $(".topup-round-lightblue").removeClass('selected-topup');
        document.getElementById("topuperror").innerHTML = ""
    },
    gotoViewstatement:function(){
        //  window.location = "/build/views/Football/Statement/statement.html?islog=" + is_loggedIn
        window.location = "/statement/?islog=" + is_loggedIn
    },
    gotoRemovecard:function(){
        //window.location = "/build/views/Football/removecard/removecard.html?islog=" + is_loggedIn
        window.location = "/removecard/?islog=" + is_loggedIn
    },
    gotoWithdrawfunds:function(){
        //window.location = "/build/views/Football/withdraw/withdraw.html?islog=" + is_loggedIn
        window.location = "/withdraw/?islog=" + is_loggedIn
    },
       render: function () {
           return ( <div>
            <div className="row">
                    <div className="col-lg-7 col-md-8 col-sm-8 col-xs-12 zoola-btn col-centered ">
                        <div className="col-centered quick-topup-box">
                            <div className="padding-20">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 margin-top-10">
                                        <div className="topup-round-lightblue topup-value pointer-hand " id="pound5" onClick={this.select.bind(null, 5, "pound5")}>+&pound;5</div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 margin-top-10">
                                        <div className="topup-round-lightblue topup-value pointer-hand " id="pound10" onClick={this.select.bind(null, 10, "pound10")}>+&pound;10</div>
                                    </div>
                                </div>
                                 <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 margin-top-10">
                                        <div className="topup-round-lightblue topup-value pointer-hand " id="pound20" onClick={this.select.bind(null, 20, "pound20")}>+&pound;20</div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 margin-top-10">
                                        <div className="topup-round-lightblue topup-value pointer-hand " id="pound40" onClick={this.select.bind(null, 40, "pound40")}>+&pound;40</div>
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 margin-top-10">
                                            <div className="topup-round-lightblue topup-value pointer-hand " id="pound60" onClick={this.select.bind(null, 60, "pound60")}>+&pound;60</div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 margin-top-10">
                                    <div className="topup-round-lightblue topup-value" >+&pound;<input type="tel" pattern="[0-9]*"  className="topup-input" id="topup" maxLength='4' onFocus={this.remove} /></div>
                                    <div id="topuperror" className="alert-message"> </div>
                                    </div>
                                 </div>
                            </div>
                              <div className="panel-footer text-center bg-zoola-green border-bottom-radius-16 pointer-hand" onClick={this.valdate}><h3 className="no-margin"><strong>Quick top up</strong></h3></div>
                        </div>
                    </div>
            </div>
                             <div className="space-5"></div>
                             <div className="row">
                                  <div className="col-lg-7 col-md-8 col-sm-8 col-xs-12 zoola-btn col-centered ">
            	                        <button type="submit" className="btn btn-success btn-block col-centered border-radius-16" onClick={this.gotoViewstatement} ><h3 className="no-margin padding-10"><strong>View statement</strong></h3></button>
                                  </div>
                            </div>
                            <div className="space-5"></div>
                            <div className="row">
                               <div className="col-lg-7 col-md-8 col-sm-8 col-xs-12 col-centered text-center">
            	                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            	                          <span className="add-card-title underline" onClick={this.gotoRemovecard}>remove a saved card</span>
            	                  </div>
                                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                          <span className="add-card-title underline" onClick={this.gotoWithdrawfunds}>withdraw funds</span>
                                  </div>
                              </div>
                          </div>
                         <div className="space-10"></div>
                         <div className="space-10"></div>
                 </div>
             )
       }

});

var Supfooter= React.createClass({
    render: function () {
        return (
            	     <div className="row">
                           <div className="col-lg-7 col-md-8 col-sm-8 col-sm-12 text-center col-centered">
                                 <div className="topup-round-white"><div className="topup-bal">promotional currency: </div><div className="topup-balance">3<img src="/images/Z-currency.svg" width="32" className="padding-bottom-10"/></div></div>
                           </div>
                     </div>
               )
        }
});
var Subfooter= React.createClass({
    render: function () {
        return ( <div>
            	        <div className="row">
                             <div className="col-lg-12 text-center">
                                       <h3>Use your Zs to enter &pound;1 and &pound;2 games.</h3>
                             </div>
            	        </div>
                        <div className="row">
                             <div className="col-lg-12 text-center">
                                   <h4>Soon, you will be able to earn more Zs by inviting friends to join you on playzoola!</h4>
                             </div>
                        </div>
                </div>
               )
        }
});
