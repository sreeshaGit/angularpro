/** @jsx React.DOM */

var amt = null;
var cardname = null;
//**********--- call getCookie function to read cookie---**********
getCookie()


if (getParameterByName("amt") && getParameterByName("amt") != '') {
    amt = getParameterByName("amt");
}
if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}



//**********--- Component to display withdraw text  ---**********
var Head = React.createClass({
    render: function () {
        return (
           <div>
            <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                    <h3>WITHDRAWAL</h3>
                </div>
            </div>
            </div>
           </div>
               )
                       }
});
//**********--- Component to display Amount ---**********
var Amount = React.createClass({
    render: function () {
        return (
           <div>
             <div className="container no-padding">
                  <div className="row">
                      <div className="col-lg-6 col-md-8 col-sm-8 col-xs-12 text-center col-centered">
                         <div className="topup-round-white"><div className="topup-bal">REQUEST AMOUNT: </div><div className="topup-balance">&pound;{amt} </div></div>
                      </div>

                  </div>
             </div>
           </div>
               )
                       }
});

//**********--- Component to display withdraw cards---**********
var Cards = React.createClass({
    getInitialState: function () {
        return {
           cards:[]
        };
    },
  
    componentWillMount: function () {
        this.serverRequest = $.get(baseurl + "deposit/topup/" + userId +","+ sessionId, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            this.setState({ cards: result.cards });
        }.bind(this));
        //var data = { "cards": [{"pyr_id": "1000", "nickname": "My blue card", "card_type": "VISA", "digits": "446291xxxxxx1234", "expiry": "1217" }, { "pyr_id": "1001", "nickname": "My blue card", "card_type": "VISA", "digits": "446291xxxxxx1234", "expiry": "1217" }] }
        //this.setState({ cards: data.cards });
    },
    
    sendToCard: function (id,ind) {//**********--- function to validate password.---**********     
        var isError = "";
        var password = $('#password_' + ind).val();
        if (password == "" || password==null) {
            document.getElementById("passworderror_" + ind).innerHTML = "Please enter your password"
            return false;
        }
        else {
            document.getElementById("passworderror_" + ind).innerHTML = "&nbsp;";
        }
        this.serverRequest = $.get(baseurl + "user/pwd/" + userId + ',' + sessionId + "," + password, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            this.setState({ items: result.items[0] })
            if (result.items[0]['valid_password'] == "N") {
                document.getElementById("passworderror_"+ind).innerHTML = "Password you entered is incorrect"
            }
            else {
                
                var selectedcard = this.state.cards.filter(function (item) {
                    if (item.pyr_id == id) {
                        return true;
                    }
                })
                cardname = selectedcard[0]['nickname']
                this.serverRequest = $.get(baseurl + "deposit/withdraw/" + userId + "," + sessionId + "," + id + ',' + amt * 100, function (result) {
                    if (typeof result != 'object') {
                        result = JSON.parse(result)
                    }
                    // window.location = "/build/views/Football/withdraw_success/withdraw_success.html?islog=" + is_loggedIn + "&amt=" + amt + "&cardname=" + cardname
                    window.location = "/withdrawsuccess/?islog=" + is_loggedIn + "&amt=" + amt + "&cardname=" + cardname
                }.bind(this));
                
            }
        }.bind(this));
        
    },
    render: function () {
        var self = this;
        return (
        <div>        
        <div className="row ">
            {
            this.state.cards.map(function (item, index) {
            return <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12" key={index}>
                        <div className="zoola-box col-centered ">
                              <div className="padding-30 padding-bottom-10">
                                     <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                	        <div className="form-group tit-txt">
                                              <span>{item.nickname}</span>
                                	        </div>
                                        </div>
                                     </div>
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                	        <div className="form-group tit-txt">
                                               VISA <span>{item.digits}</span>
                                	        </div>
                                        </div>
                                    </div>
                                     <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                	        <div className="form-group tit-txt">
                                               Exp. <span>{item.expiry[0]+""+item.expiry[1]+"/"+item.expiry[2]+""+item.expiry[3]}</span>
                                	        </div>
                                        </div>
                                     </div>
							        <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                	        <div className="">
                                               <div className="tit-txt">Password:</div>
                                               <div className="">
                                                  <input type="password" className="form-control" required="required"  id={"password_"+index}/>
                                                  <span id={"passworderror_"+index} className="space-5">&nbsp;</span>
                                               </div>
                                	        </div>
                                        </div>
							        </div>
                              </div>                              
                        </div>
                        <button className="btn zoola-btn" onClick={self.sendToCard.bind(null, item.pyr_id,index) }><div className="btn-txt">Send to card</div></button>
                        <div className="space-10"></div>
                        <div className="space-10"></div>
                    </div>
            })
            }
            {this.state.cards.length==0?<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="space-10"></div>
                <div className="space-10"></div>
                  <div className="zoola-box col-centered">
                      <div className="space-10"></div>
                      <div className="space-10"></div>
                         <div className="padding-30">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                	<div className="form-group tit-txt">
                                	    No cards available
                                	</div>
                                </div>
                            </div>


                         </div>
                      <div className="space-10"></div>
                      <div className="space-10"></div>
                  </div>
                <div className="space-10"></div>
                <div className="space-10"></div>
             </div>:''}      
        </div>
        <div className="space-10"></div>
        </div>

               )
                       }
});