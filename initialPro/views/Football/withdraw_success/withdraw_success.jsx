/** @jsx React.DOM */

var amt = null;
var cardname = null;

//**********--- call getCookie function to read cookie---**********
getCookie()

if (getParameterByName("amt") && getParameterByName("amt") != '') {
    amt = getParameterByName("amt");
}
if (getParameterByName("cardname") && getParameterByName("cardname") != '') {
    cardname = getParameterByName("cardname");
}
if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}

//**********--- Component to display withdraw amount ---**********
var Amount = React.createClass({
    gotoDashboard: function () {// Function to navigate to dashboard page.
        //  window.location = "/build/views/Football/Dashboard/dashboard.html?islog=" + is_loggedIn
        window.location = "/dashboard/?islog=" + is_loggedIn
    },

    getInitialState: function () {
        return {
            items: {}
        };
    },
    componentWillMount: function () {
        this.serverRequest = $.get(baseurl + "general/navbar/" + userId + "," + sessionId, function (result) {
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
        <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
              <h3>WITHDRAWAL</h3>
            </div>
        </div>
  </div>
           </div>
<div className="container-fluid subheader">
      <div className="container no-padding">
       		<div className="row">
            	<div className="col-lg-6 col-md-8 col-sm-8 col-xs-12 text-center col-centered">
                	<div className="topup-round-white"><div className="topup-bal">REQUEST AMOUNT: </div><div className="topup-balance">&pound;{amt} </div></div>
            	</div>

       		</div>
      </div>
</div>
<div className="container-fluid">
      <div className="container no-padding">
	        <div className="space-10"></div>
       		<div className="row">
            	<div className="col-lg-12 col-md-8 col-sm-8 col-xs-12 text-center col-centered">
                	<h2 className="text-center font-20">
                	<span>{this.state.items.username}</span>, you have successfully requested a &pound;{amt} withdrawal! 
                	</h2>
                    <div className="space-10"></div>
                    <p className="text-center">
                        If successful, please allow 3-10 days.
                    </p>
            	</div>

       		</div>
	        <div className="space-10"></div>
            <div className="row">
		        <div className="col-lg-6 col-md-5 col-sm-7 col-xs-12 col-centered">
			        <button className="btn zoola-btn" onClick={this.gotoDashboard}><div className="btn-txt">Go to dashboard</div></button>
		        </div>
            </div>
      </div>
</div>
<div className="space-10"></div>
<div className="space-10"></div>
</div>
               )
                       }
});
