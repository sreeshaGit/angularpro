/** @jsx React.DOM */


var isglory = false;
//**********--- call getCookie function to read cookie---**********
getCookie()

if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}
if (getParameterByName("isglory") && getParameterByName("isglory") == 'true') {
    isglory = true;
}
else {
    isglory = false;
}
//**********--- Component to display quick Deposit---**********
//var Subheader = React.createClass({
//                render: function () {
//                    return (
//                        <div className="container-fluid header">
//                        <div className="container">
//                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding" >
//                            <h3>DEPOSIT ACCOUNT</h3>   
//                        </div> 
//                        </div>
//                        </div> 
//                           )
//    }
//});
//**********---- component for road to glory while signup process---**********
//var SubGlory = React.createClass({
//    render: function () {
//        if(isglory)
//        {
//            return <div className="container-fluid R2G-subheader">
//                    <div className="container">
//                        <RoadGlory stepno="3" />
//                    </div>
//                   </div>
//        }
//        else{
//            return <div></div>
//        }
        
//    }
//});
//**********---Component to display balance ---**********
var Balance = React.createClass({
    getInitialState: function () {
        return {
            items: {},   
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
            <div>
                <div className="container-fluid header">
                        <div className="container">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                            <h3>{this.state.items.status == 'T'||this.state.items.status == 'P'?<span>DEPOSIT ACCOUNT</span>:<span>DEPOSIT ACCOUNT</span>}</h3>
                        </div>
                        </div>
                </div> 
             <div className="container-fluid subheader"  >
              <div className="container no-padding">
              <div className="col-lg-7 col-md-8 col-sm-8 col-sm-12 text-center col-centered">
                  <div className="topup-round-white"><div className="topup-bal">CURRENT BALANCE:</div><div className="topup-balance">&pound;{this.state.items.balance}</div></div>
                </div>
                </div>
                </div>
                </div>
                    )
        }
});
$(document).on("keypress", "#deposit-limit", function (e) {
    var k = e.which;

    if (k < 48 || k > 57) {
        if (k != 8) {
            e.preventDefault()
        }
    }
}
)

var Depositlimit = React.createClass({
    depositLimit: function () {
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
            document.getElementById("topuperror").innerHTML = "&nbsp;";

        }

        if (isError) {
            return false;
        }
        var selectedValue = $('input[name=limit]:checked').val();
        if (selectedValue != '' && selectedValue != null) {
            var data1 = { "items": [{ "usr_limit": Topup, "usr_limit_duration": selectedValue }]}
            document.getElementById("valueerror").innerHTML = "&nbsp;";
            this.serverRequest = $.post(baseurl + "admin/depositlimit/" + userId + "," + sessionId, JSON.stringify(data1), function (result) {
                $("#deposit-limit").modal('hide')
                TopupThis.componentWillMount();
            }.bind(this)); 
            
        }
        else {
            document.getElementById("valueerror").innerHTML = "Please select checkbox."
        }
    },
    render: function () {
        return (
              <div className="modal-dialog modal-sm">
       
        <div className="modal-content zoola-box self-exclusion no-padding">
          <div className="social-header">
              <h2 className="text-center">SET A DEPOSIT LIMIT</h2>
            </div>
          <div className="social-body">
              <div className="space-5"></div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <div className="topup-round-lightblue topup-value bg-light-blue no-margin margin-top-30">&pound;<input type="text" className="topup-input" id="number" maxLength='4'/></div>
                        <div id="topuperror" className="alert-message">&nbsp;</div>
                    </div>
                     <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding">
                        <div className="form-group">
                          <div className="checkbox">
                            <input type="radio" name="limit" className="styled" id="" value="per day"/>
                            <label className="tit-txt">per day</label>
                         </div>
                        </div>
                        <div className="form-group">
                          <div className="checkbox">
                            <input type="radio" name="limit" className="styled" id="" value="per week"/>
                            <label className="tit-txt">per week</label>
                         </div>
                        </div>
                        <div className="form-group">
                          <div className="checkbox">
                            <input type="radio" name="limit" className="styled" id="" value="per month"/>
                            <label className="tit-txt">per month</label>
                         </div>
                        </div>
                    </div>
                    <div id="valueerror" className="alert-message text-center">&nbsp;</div>
                </div>
                <div className="space-5"></div>
                <div className="row">
                     <div className="col-lg-12">
                        <p>
                            A request to set or reduce an existing limit will be applied immediately.<br />
                            A request to increase or remove an existing limit will be subject to a 24 hour review period from receipt of request.
                        </p>
                     </div>
                </div>
               
                <div className="space-5"></div>
                <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12 col-centered">
                        <button className="btn zoola-btn bg-dark-dark-blue" onClick={this.depositLimit}><h5 className="light-blue">Set limit now</h5></button>
                    </div>
                </div>
                <div className="space-5"></div>
                <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12 col-centered">
                        <button className="btn zoola-btn" data-dismiss="modal"><h5 className="blue" >Not now</h5></button>
                    </div>
                </div>
            </div>
        </div> 
    </div>
                    )
        }
});

$(document).on("keypress","#quick",function (e) {
    var k = e.which;
    if (k < 48 || k > 57) {
        if (k != 8) {
            e.preventDefault()
                    }
                          }
}
)
//**********---Component to display topup value---**********
var TopupThis;
var Topup = React.createClass({
    getInitialState: function () {
        return {
            items: {},
            selectvalue: [],
            cards: [],
            Depositlim: {},
            quickerror:'',
            item:{},
            quick1:false,
            disablePaynow:false
        };
    },
    componentWillMount: function (itemName) {
        TopupThis = this;
        //this.serverRequest = $.get(baseurl + "admin/depositlimit/" + userId + ',' + sessionId, function (result) {
        //    if (typeof result != 'object') {
        //        result = JSON.parse(result)
        //    }
        //    if(result.items.length>0){
        //        this.setState({ Depositlim: result.items[0]});
        //    }
        //    //Phase2-38 : BL- Deposit limit should not appear after setting DL or depositing - only show for first deposit 
        //    if(jQuery.isEmptyObject(this.state.Depositlim)){
        //        $('#deposit-limit').modal('show');    
        //    }else{
        //        if(this.state.Depositlim.deposit_limit > 0){
        //            $("#deposit-limit").modal('hide');
        //        }
        //    }//Phase2-38 
        //}.bind(this));
        this.serverRequest = $.get(baseurl + "general/navbar/" + userId + "," + sessionId, function (result) {
            // console.log(result)
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            this.setState({ item: result.header[0] })
        }.bind(this));
        this.serverRequest = $.get(baseurl + "deposit/topup/" + userId + ',' + sessionId, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            this.setState({ cards: result.cards });
        }.bind(this));
        //var data = {
        //    "cards": [{ "pyr_id": "1000", "nickname": "My blue card", "card_type": "VISA", "digits": "446291xxxxxx1234", "expiry": "1217" }]
        //}
        //this.setState({ cards: data.cards });
    },
    validate: function (event) { //Function to validate topup values
        var Quick = $('#quick').val()>0?$('#quick').val():this.state.selectvalue;
        //debugger;
        //console.log(Number($('#quick').val()) > Number(this.state.Depositlim.deposit_limit),"   ",$('#quick').val(),"   ",this.state.Depositlim.deposit_limit)
        //console.log(Number(this.state.selectvalue) > Number(this.state.Depositlim.deposit_limit),"  ",this.state.selectvalue,"  ",this.state.Depositlim.deposit_limit)
        var isError = false;        
        if ($('#quick').val() == "" && this.state.selectvalue == "") {
            error = "please enter your topup value.\n";
            document.getElementById("quickerror").innerHTML = "Please enter your topup amount."
            document.getElementById("quickerror2").innerHTML = "&nbsp;";
            return false;
        } 
         
       else if ($('#quick').val() != "" && (($('#quick').val() < 5) || ($('#quick').val() > 1000))) {
            error = "Topup Must  Be  Between 5 To 1000. \n";
            document.getElementById("quickerror").innerHTML = "Topup amount must  be between 5 to 1000."
            document.getElementById("quickerror2").innerHTML = "&nbsp;";
            return false;
       }
       else if ($('#quick').val().substring(0, 1) == '0') {
           error = "Please enter valid amount. \n";
           document.getElementById("quickerror").innerHTML = "Please enter valid amount."
           document.getElementById("quickerror2").innerHTML = "&nbsp;";
           return false;
       } 
       //else if(this.state.Depositlim.deposit_limit &&(this.state.Depositlim.deposit_limit!= "" && (Number(($('#quick').val()) > Number(this.state.Depositlim.deposit_limit)) || (Number(this.state.selectvalue) > Number(this.state.Depositlim.deposit_limit))))){
       //    //this.setState({quickerror:" Sorry you have exceeded your set deposit limit.Please contact Customer service(link) to make any changes"})
       //        $("#alert-modal7").modal('show');
       //   // document.getElementById("quickerror2").innerHTML = "Sorry we are unable to process your payment."     
       //     return false;
       //}      
       else {
           //this.serverRequest = $.get(baseurl + "admin/checkdepositlimit/" + userId + "," + sessionId + ","+ 30, function (result) {
           //    if (typeof result != 'object') {
           //        result = JSON.parse(result)
           //    }
           //    if (result.items[0]['status'] == 'N') {
           //        //document.getElementById('quickerror').innerHTML = result.items[0]['status_msg']
           //        //this.setState({quickerror:result.items[0]['status_msg']})
           //        //$("#alert-modal").modal('show');
           //        //return false;
           //        document.getElementById("quickerror2").innerHTML = "Sorry we are unable to process your payment."       
           //        isError = true;
           //    }
           //    else {                   
           //        document.getElementById("quickerror").innerHTML = "&nbsp;";
           //    }
           //}.bind(this));
           $.ajax({
               type: "GET",
               url: baseurl + "admin/checkdepositlimit/" + userId + "," + sessionId + ","+ Quick,
               async: false,
               success: function (result) {
                   if (typeof result != 'object') {
                       result = JSON.parse(result)
                   }
                   if (result.items[0]['status'] == 'N') {
                       //document.getElementById('quickerror').innerHTML = result.items[0]['status_msg']
                       //this.setState({quickerror:result.items[0]['status_msg']})
                       //$("#alert-modal").modal('show');
                       //return false;
                       document.getElementById("quickerror2").innerHTML = result.items[0]['status_msg'] 
                       isError = true;
                   }
                   else {                   
                       document.getElementById("quickerror2").innerHTML = "&nbsp;";
                   }
               }
           });
       }
        if (isError) {
            return false;
        }
        if (!Quick > 0) {
            Quick = this.state.selectvalue;
        }
        document.getElementById("quickerror2").innerHTML = "&nbsp;";
        //if (this.state.items.status == 'P' || this.state.items.status == 'T') {
        //    window.location = "/build/views/Football/addcard/addcard.html?islog=" + is_loggedIn + "&amt=" + Quick
        //}

        //if (this.state.cards.length == 0) {
            this.serverRequest = $.get(baseurl + "deposit/newcard/" + userId + "," + sessionId + "," + Quick, function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                this.setState({ items: result.items[0] })
                $('#pay').submit();
            }.bind(this));           
        //}
        //else {
        //    window.location = "/build/views/Football/addcard/addcard.html?islog=" + is_loggedIn + "&amt=" + Quick
        //}
    },
    select: function (val, id) {
        this.setState({ selectvalue: val })
        $(".topup-round-lightblue").removeClass('selected-topup');
        //$("#" + id).addClass('selected-topup');
        $('#quick').val('');
        document.getElementById("quickerror").innerHTML = "&nbsp;";
        if(this.state.selectvalue == val&&this.state.quick1 ==true){
            this.setState({ quick1: false });
            $("#" + id).removeClass('selected-topup');
            this.setState({ selectvalue: "" })
        }
        else{
            this.setState({ quick1: true });
            $("#" + id).addClass('selected-topup');
        }
    },
    remove: function () {
        this.setState({ selectvalue: "" })
        $(".topup-round-lightblue").removeClass('selected-topup');
        document.getElementById("quickerror").innerHTML = "&nbsp;";
    },
    agree: function () {
        $("#alert-modal7").modal('hide');
    },
    gotoPayment: function (pyrid) {   
        console.log("gotoPayment====");
        var Quick = $('#quick').val()>0?$('#quick').val():this.state.selectvalue;
        //console.log(this.state.selectvalue)
        var isError = false;
        if ($('#quick').val() == "" && this.state.selectvalue == "") {
            error = "please enter your topup value.\n";
            document.getElementById("quickerror").innerHTML = "Please enter your topup amount."
            isError = true;
        } 
       
        else if ($('#quick').val() != "" && (($('#quick').val() < 5) || ($('#quick').val() > 1000))) {
            error = "Topup Must  Be  Between 5 To 1000. \n";
            document.getElementById("quickerror").innerHTML = "Topup amount must  be between 5 to 1000."
            isError = true;
        }
        else if ($('#quick').val().substring(0, 1) == '0') {
            error = "Please enter valid amount. \n";
            document.getElementById("quickerror").innerHTML = "Please enter valid amount."
            isError = true;
        }
        //else if(this.state.Depositlim.deposit_limit &&(this.state.Depositlim.deposit_limit!= "" && (Number(($('#quick').val()) > Number(this.state.Depositlim.deposit_limit)) || (Number(this.state.selectvalue) > Number(this.state.Depositlim.deposit_limit))))){
        //    //this.setState({quickerror:" Sorry you have exceeded your set deposit limit.Please contact Customer service(link) to make any changes"})
        //    $("#alert-modal7").modal('show');
        //    //document.getElementById("quickerror2").innerHTML = "Sorry we are unable to process your payment."    
        //    isError = true;
        //}       
        else {
            //this.serverRequest = $.get(baseurl + "admin/checkdepositlimit/" + userId + "," + sessionId+","+ Quick, function (result) {
            //    if (typeof result != 'object') {
            //        result = JSON.parse(result)
            //    }
            //    if (result.items[0]['status'] == 'N') {
            //        //document.getElementById('quickerror').innerHTML = result.items[0]['status_msg']
            //        //this.setState({quickerror:result.items[0]['status_msg']})
            //        //$("#alert-modal").modal('show');
            //        //return false;
            //        document.getElementById("quickerror2").innerHTML = "Sorry we are unable to process your payment."
            //        isError = true;
            //    }
            //    else {                   
            //        document.getElementById("quickerror2").innerHTML = "&nbsp;";
            //    }
            //}.bind(this)); 
            
            $.ajax({
                type: "GET",
                url: baseurl + "admin/checkdepositlimit/" + userId + "," + sessionId + ","+ Quick,
                async: false,
                success: function (result) {
                    if (typeof result != 'object') {
                        result = JSON.parse(result)
                    }
                    if (result.items[0]['status'] == 'N') {
                        //document.getElementById('quickerror').innerHTML = result.items[0]['status_msg']
                        //this.setState({quickerror:result.items[0]['status_msg']})
                        //$("#alert-modal").modal('show');
                        //return false;
                        document.getElementById("quickerror2").innerHTML = result.items[0]['status_msg']       
                        isError = true;
                    }
                    else {                   
                        document.getElementById("quickerror2").innerHTML = "&nbsp;";
                    }
                }
            });
        }
        if (isError) {
            return false;
        }
        if (!Quick > 0) {
            Quick = this.state.selectvalue;
        }
        document.getElementById("quickerror").innerHTML = "&nbsp;";
        this.setState({"disablePaynow":true})
        this.serverRequest = $.get(baseurl+"deposit/paynow/" + userId + ','+sessionId+","+pyrid+","+ Quick, function (result) {    
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
                if (result.items[0]["message"] == "success") {
                    //window.location="/build/views/Football/GameSelection/gameSelection.html?islog="+is_loggedIn
                    window.location="/gameselection/?islog="+is_loggedIn;
                }
                else{
                    //window.location="/build/views/Football/GameSelection/gameSelection.html?islog="+is_loggedIn
                    window.location="/gameselection/?islog="+is_loggedIn;
                }           
        }.bind(this));
    },
    render: function () {
        var self = this;
        return (
                 <div>
                     <div className="row">
                       <div className="col-lg-7 col-md-8 col-sm-8 col-xs-12 col-centered">
                            <div className="col-centered quick-topup-box">
                                  <div className="padding-20">                                 
                                        <div className="row">
                                           <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 margin-top-10">
                                             <div className="topup-round-lightblue topup-value pointer-hand " id="pound5" onClick={this.select.bind(null, 5, "pound5")}>+&pound;5</div>
                                           </div>
                                           <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 margin-top-10">
                                              <div className="topup-round-lightblue topup-value pointer-hand" id="pound10" onClick={this.select.bind(null, 10, "pound10")}>+&pound;10</div>
                                           </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 margin-top-10">
                                                <div className="topup-round-lightblue topup-value pointer-hand " id="pound20" onClick={this.select.bind(null, 20, "pound20")}>+&pound;20</div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 margin-top-10">
                                                <div className="topup-round-lightblue topup-value pointer-hand " id="pound50" onClick={this.select.bind(null, 50, "pound50")}>+&pound;50</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 margin-top-10">
                                                    <div className="topup-round-lightblue topup-value pointer-hand " id="pound100" onClick={this.select.bind(null, 100, "pound100")}>+&pound;100</div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 margin-top-10">
                                            <div className="topup-round-lightblue topup-value" >+&pound;<input type="tel" pattern="[0-9]*"  className="topup-input" id="quick" maxLength='4'  onFocus={this.remove}/></div>
                                            <div id="quickerror" className="alert-message">&nbsp;</div>
                                            </div>
                                        </div>
                                      <div id="quickerror2" className="alert-message text-center">&nbsp;</div>
                                  </div>
                                  
                             </div>
                           
                             <div className="space-10"></div>                           
                           {this.state.cards.length==0?<div className="col-lg-10 col-md-10 col-sm-10 col-xs-12 col-centered">     
                                <button type="submit" className="btn zoola-btn" onClick={this.validate}><div className="btn-txt">{this.state.item.status == 'T'||this.state.item.status == 'P'?<span>Deposit</span>:<span>Deposit</span>}</div></button>
                             </div>:
                           <div>
                             {
                                this.state.cards.map(function(item,index){
                                    return <div key={index}><div className="zoola-box col-centered add-new-card" >
                                             <div className="padding-30 padding-bottom-15">
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                      <div className="form-group tit-txt margin-bottom-10">
                                                    Nickname: <span>{item.nickname}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="form-group tit-txt margin-bottom-10">
                                                    VISA: <span>{item.digits}</span>
                                                </div>
                                            </div>
                                        </div>
                                         <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="form-group tit-txt">
                                                    Exp: <span>{item.expiry[0]+""+item.expiry[1]+"/"+item.expiry[2]+""+item.expiry[3]}</span>
                                                </div>
                                            </div>
                                         </div>
                                     </div>
                                    
                                 </div>
                                 <button className="btn zoola-btn margin-bottom-30" onClick={self.gotoPayment.bind(null,item.pyr_id)} disabled={self.state.disablePaynow} ><div className="btn-txt" >Pay now</div></button>
                                 </div>
                                })}
                             
                           </div>}  
                          </div>
                       </div>   
                        <div className="space-10"></div>
                        <div className="space-5"></div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <p>To add / Remove cards, Please Contact <a href="https://playzoola.zendesk.com/hc/en-us/articles/209629225--Our-contact-details" target="_" className="underline">Customer Support</a></p>
                            </div>
                        </div>
            
                        <div className="space-5"></div>
                        <div className="space-10"></div>

                    <div className="modal fade animated fadeIn" tabIndex="-1" role="dialog" aria-labelledby="Alert-Modal" id="alert-modal7" data-keyboard="true">
                                                    <div className="modal-dialog modal-sm ">

                                                        <div className="modal-content zoola-box alet-modal">
                                                          <div className="social-header">
                                                              <img src="/images/close-icon.svg" width="20" className="pull-right pointer-hand" data-dismiss="modal" />
                                                          </div>
                                                          <div className="social-body">
                                                              <div className="space-5"></div>
                                                                <div className="row">
                                                                  <div className="col-lg-12">
                                                                      <p>Sorry you have reached your Deposit Limit. <br />Please contact  <a className="underline" href="https://playzoola.zendesk.com/hc/en-us" target="_black">Customer service</a> to make any changes</p>
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



{/*<form method="POST" id="pay" action={paymentURL}>
 <input type="hidden" name="MERCHANT_ID" value={this.state.items.merchant_id}/>
 <input type="hidden" name="ORDER_ID" value={this.state.items.order_id}/>
 <input type="hidden" name="AMOUNT" value={this.state.items.amount}/>
 <input type="hidden" name="CURRENCY" value={this.state.items.currency}/>
 <input type="hidden" name="TIMESTAMP" value={this.state.items.timestamp}/>
 <input type="hidden" name="SHA1HASH" value={this.state.items.sha1hash}/>
 <input type="hidden" name="AUTO_SETTLE_FLAG" value={this.state.items.auto_settle_flag}/>
 <input type="hidden" name="RETURN_TSS" value={this.state.items.return_tss}/>
 <input type="hidden" name="CUST_NUM" value={this.state.items.cust_num}/>
 <input type="hidden" name="PROD_ID" value={this.state.items.prod_id}/>
 <input type="hidden" name="VAR_REF" value={this.state.items.var_ref}/>
 <input type="hidden" name="COMMENT1" value={this.state.items.comment1}/>
 <input type="hidden" name="OFFER_SAVE_CARD" value={this.state.items.offer_save_card}/>
 <input type="hidden" name="PAYER_REF" value={this.state.items.payer_ref}/>
 <input type="hidden" name="PMT_REF" value={this.state.items.pmt_ref}/>
 <input type="hidden" name="PAYER_EXISTS" value={this.state.items.payer_exists}/>     
 </form>*/}
<form method="POST" id="pay" action={paymentURL}>
 <input type="hidden" name="HPP_VERSION" value="2"/>
 <input type="hidden" name="MERCHANT_ID" value={this.state.items.merchant_id} />
 <input type="hidden" name="ORDER_ID" value={this.state.items.order_id} />
 <input type="hidden" name="AMOUNT" value={this.state.items.amount} />
 <input type="hidden" name="CURRENCY" value={this.state.items.currency} />
 <input type="hidden" name="TIMESTAMP" value={this.state.items.timestamp} />
 <input type="hidden" name="SHA1HASH" value={this.state.items.sha1hash} />
 <input type="hidden" name="AUTO_SETTLE_FLAG" value={this.state.items.auto_settle_flag} />
 <input type="hidden" name="RETURN_TSS" value={this.state.items.return_tss} />
 <input type="hidden" name="CUST_NUM" value={this.state.items.cust_num} />
 <input type="hidden" name="PROD_ID" value={this.state.items.prod_id} />
 <input type="hidden" name="VAR_REF" value={this.state.items.var_ref} />
 <input type="hidden" name="COMMENT1" value={this.state.items.comment1} />
 <input type="hidden" name="OFFER_SAVE_CARD" value="0" />
 <input type="hidden" name="PAYER_REF" value={this.state.items.payer_ref} />
 <input type="hidden" name="PMT_REF" value={this.state.items.pmt_ref} />
 <input type="hidden" name="PAYER_EXIST" value="0" />
 <input type="hidden" name="CARD_STORAGE_ENABLE" value="1" />
</form>
                     
                   </div>
               )
           }
           });
            

            
            
            
          
          
