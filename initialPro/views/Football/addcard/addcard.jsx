/** @jsx React.DOM */

var amt =0;
//**********--- call getCookie function to read cookie---**********
getCookie()

if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}
if (getParameterByName("amt") && getParameterByName("amt") != 0) {
    amt = getParameterByName("amt");
}

//**********--- Subheader component ---**********
var Subheader = React.createClass({
    render: function () {
        return (
                        <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                    <h3>TOP UP ACCOUNT</h3>
                              </div>
                        </div>
        )
    }
});

var Balance= React.createClass({
    render: function () {
        return (
            	     <div className="row">
                              <div className="col-lg-6 col-md-8 col-sm-8 col-xs-12 text-center col-centered">
                                         <div className="topup-round-white"><div className="topup-bal">AMOUNT YOU ARE ADDING: </div><div className="topup-balance" >&pound;{amt}</div></div>
                              </div>
                     </div>
               )
        }
});

$(document).on("keypress","#password",function (event){
        if (event.ctrlKey==true && (event.which == '118' || event.which == '86')) {
            event.preventDefault();
        }
    });

//**********--- Addcard component ---**********
var Addcard = React.createClass({
    getInitialState: function () {
        return {
            items: {},
            cards: [],
            removeCardId:0
        };
    },
    componentWillMount: function () {      
        this.serverRequest = $.get(baseurl+"deposit/topup/" + userId + ','+sessionId, function (result) {
            if(typeof result != 'object')
            {
                result = JSON.parse(result)
            }
            this.setState({ cards: result.cards });
        }.bind(this));
        //var data = {
        //    "cards": [{ "pyr_id": "1000", "nickname": "My blue card", "card_type": "VISA", "digits": "446291xxxxxx1234", "expiry": "1217" }]
        //}
        //this.setState({ cards: data.cards });
    },
    gotoPayment: function (pyrid) {
       
        //this.serverRequest = $.get(baseurl+"deposit/newcard/" + userId + ','+sessionId+"," + amt, function (result) {
        //    if(typeof result != 'object')
        //    {
        //        result = JSON.parse(result)
        //    }
        //    this.setState({ items: result.items[0] })
        //    $('#pay').submit();
        //}.bind(this));
        //console.log("pyrid==",pyrid)
        this.serverRequest = $.get(baseurl+"deposit/paynow/" + userId + ','+sessionId+","+pyrid+","+ amt, function (result) {
            console.log(result)
        }.bind(this));
    },
    gotoNewPayment: function () {
       
        this.serverRequest = $.get(baseurl+"deposit/newcard/" + userId + ','+sessionId+"," + amt, function (result) {
            if(typeof result != 'object')
            {
                result = JSON.parse(result)
            }
            this.setState({ items: result.items[0] })
            $('#pay').submit();
        }.bind(this));
        
    },
    cardtype:function(){
        var cardtype = $('#cardtype').val();

        if ($('#cardtype').val() == "") {
            document.getElementById("cardtypeerror").innerHTML = "Please enter your cardtype"
            return false
        }
        else {
            document.getElementById("cardtypeerror").innerHTML = "&nbsp;";
        }
    },
    cardname:function(){
        var cardnickname = $('#cardnickname').val();

        if ($('#cardnickname').val() == "") {
            document.getElementById("cardnicknameerror").innerHTML = "Please enter your card nickname"
            return false
        }
        else {
            document.getElementById("cardnicknameerror").innerHTML = "&nbsp;";
        }
    },
   
    password:function(){
        var password = $('#password').val();

        if ($('#password').val() == "") {
            document.getElementById("passworderror").innerHTML = "Please enter your password"
            return false
        }
        else {
            document.getElementById("passworderror").innerHTML = "&nbsp;";
        }
    },
    //validate: function (event) {
        // var isError = "";
        // var cardtype = $('#cardtype').val();
        // var cardnickname = $('#cardnickname').val();
        // var password = $('#password').val();      

        // if ($('#cardtype').val() == "") {
        //     document.getElementById("cardtypeerror").innerHTML = "Please enter your cardtype"
        //     isError = true;
        // }
   
        // if ($('#cardnickname').val() == "") {
        //     document.getElementById("cardnicknameerror").innerHTML = "Please enter your card nickname"
        //     isError = true;
        //}
        // if ($('#password').val() == "") {
        //     document.getElementById("passworderror").innerHTML = "Please enter your password"
        //    isError = true;
        // }
        // if (isError) {
        //     return false
        // }
        // else {
        //     document.getElementById("cardtypeerror").innerHTML = "&nbsp;";
        //     document.getElementById("cardnicknameerror").innerHTML = "&nbsp;";
        //     document.getElementById("passworderror").innerHTML = "&nbsp;";
        //     this.serverRequest = $.get(baseurl+"user/pwd/" + userId + ','+sessionId+"," + password, function (result) {
        //         if(typeof result != 'object')
        //         {
        //             result = JSON.parse(result)
        //         }
        //         this.setState({ items: result.items[0] })
        //         if(result.items[0]['valid_password']=="N"){
        //             document.getElementById("passworderror").innerHTML = "Password you entered is incorrect"
        //         }

        //     }.bind(this));   
             //}
        
        
           
        
                              
    // },
    cnfYes:function(){
        this.removeCard()
    },
    cnfNo:function(){
        $("#alert-modal").modal('hide');
    },
    removeCardCnf :function(id){
        this.setState({removeCardId:id})
        $("#alert-modal").modal('show');
    },
    removeCard:function(id){
        this.serverRequest = $.get(baseurl + "deposit/remove/" + userId + "," + sessionId + "," + this.state.removeCardId, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            $("#alert-modal").modal('hide');
            this.setState({removeCardId:0})
            this.componentWillMount();
        }.bind(this));
    },
    render: function () {
        var self = this;
           return ( <div>
             
                 <div className="row ">
                 {this.state.cards.length ==0 ?<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-centered">
                        <div className="tit-txt hidden-xs">&nbsp;</div>
                        <div className="zoola-box col-centered add-card-box-empty">
                            <div className="padding-20">
							    <div className="space-10"></div>
                                <div className="space-10"></div>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                	    <div className="saved-cards">
                                            Pay using new card
                                	    </div>
                                    </div>
                                </div>
                                <div className="space-10"></div>

                                <div className="space-10"></div>
                            </div>
                        </div>
                        <button type="submit" className="btn zoola-btn" onClick={this.gotoNewPayment}><div className="btn-txt" >Add card</div></button>
                  </div>  :''}
            {
            this.state.cards.map(function (item, index) {
                return <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12"  key={index}>                
                {index == 0 ?<div className="tit-txt text-center">USE EXISTING CARD</div> : <div className="tit-txt hidden-xs">&nbsp;</div>}               
                          <div >
                        <div className="zoola-box col-centered add-new-card" >
                            <div className="close-btn" onClick={self.removeCardCnf.bind(null, item.pyr_id)}><img src="/images/close-icon.svg" className="pointer-hand pull-right" width="10" alt="Remove card"/></div>                       
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
                                           VISA <span>{item.digits}</span>
                                	    </div>
                                    </div>
                                </div>
                                 <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                	    <div className="form-group tit-txt">
                                           Exp.<span>{item.expiry[0]+""+item.expiry[1]+"/"+item.expiry[2]+""+item.expiry[3]}</span>
                                	    </div>
                                    </div>
                                 </div>
                          </div>                       
                                          
                        </div>  
                         <button className="btn zoola-btn margin-bottom-30"  onClick={self.gotoPayment.bind(null,item.pyr_id)}><div className="btn-txt">Pay now</div></button>                  
                        </div>
                      </div>
            })
             }                 
  { self.state.cards.length == 1 ?                  
                   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="tit-txt hidden-xs">&nbsp;</div>
                     <div className="col-centered add-card-box-empty">
                      <div className="padding-20">
							<div className="space-5"></div>
                            <div className="space-5"></div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                	<div className="saved-cards">
                                      1 saved card maximum
                                	</div>
                                </div>
                            </div>
                            <div className="space-5"></div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                	<p className="text-center">
                                      {/*<a href={"/build/views/Football/removecard/removecard.html?islog=" + is_loggedIn} className="underline">delete a card </a> to add another */}
                                        <a href={"/removecard/?islog=" + is_loggedIn} className="underline">delete a card </a> to add another
                                	</p>
                                </div>
                            </div>
                            <div className="space-10"></div>
                      </div>
                </div>
                  </div>
                  :''            
                  }           
            </div>
            <div className="space-10"></div>
    <div className="modal fade animated bounce" tabIndex="-1" role="dialog" aria-labelledby="Alert-Modal" id="alert-modal" databackdrop="static">
                                                    <div className="modal-dialog modal-sm ">

                                                        <div className="modal-content zoola-box alet-modal">
        	                                                <div className="social-header">
            	                                                <img src="/images/close-icon.svg" width="20" className="pull-right pointer-hand" data-dismiss="modal" />
        	                                                </div>
        	                                                <div className="social-body">
            	                                                <div className="space-5"></div>
                                                                <div className="row">
                	                                                <div className="col-lg-12">
                    	                                                <p>Do you want to remove this card?</p>
                	                                                </div>
                                                                </div>
                                                                <div className="space-5"></div>
                                                               <div className="row">
                                                                    <div className="col-lg-5 col-sm-5 col-md-5">
                                                                        <button type="submit" className="btn zoola-btn" onClick={this.cnfYes}><h5 className="">YES</h5></button>
                                                                    </div>
                                                                   <div className="col-lg-5 col-sm-5 col-md-5">
                                                                        <button type="submit" className="btn zoola-btn" onClick={this.cnfNo}><h5 className="">NO</h5></button>
                                                                   </div>
                                                                </div>
                                                                <div className="space-5"></div>
        	                                                </div>
                                                        </div>
                                                    </div>
    </div>
 <form method="POST" id="pay" action={paymentURL}>
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
 <input type="hidden" name="OFFER_SAVE_CARD" value={this.state.items.offer_save_card} />
 <input type="hidden" name="PAYER_REF" value={this.state.items.payer_ref} />
 <input type="hidden" name="PMT_REF" value={this.state.items.pmt_ref} />
 <input type="hidden" name="PAYER_EXISTS" value={this.state.items.payer_exists} />

     </form>
   
               </div>
             )
       }

});
