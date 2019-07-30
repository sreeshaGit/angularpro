//**********--- call getCookie function to read cookie---**********
getCookie()


if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
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
                   <h3>ACCOUNT CREATED</h3>
                </div>
            </div>
        )
    }
});

var JoinGameData = React.createClass({


    getInitialState: function () {
        return {
            items: {},

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



    gotogameSelection:function(){
        window.location = "/build/views/Football/GameSelection/gameSelection.html?islog=" + is_loggedIn + "&isglory=" + true;
    },
    gotoTopUp: function () {
        if (!SupHeaderThis.state.items.status == 'P' || SupHeaderThis.state.items.status == 'T' || SupHeaderThis.state.items.status == 'N') {
            window.location = "/build/views/Football/QuickTopUp/Quick-Top-Up.html?islog=" + is_loggedIn
        }
        else {
            window.location = "/build/views/Football/Glory/topUp/topUp.html?islog=" + is_loggedIn
        }
    },
   
    render: function () {

        return (<div> 
         <div className="space-10"></div>
         
         <div className="row">
            <div className="col-lg-12">
                <p className="text-center"><img className="margin-top-10" src="/images/pz-icon.svg" width="150" /></p>
            </div>
         </div>
         <div className="space-5"></div>
         <div className="row">
            <div className="col-lg-12">
               
            	<h2 className="text-center">Welcome <span>{this.state.items.username}</span>, we've credited your account with  <img alt="5z" src="/images/Z-currency2.svg" width="15"/>5 to get you started.</h2>
               
                <div className="space-10"></div>
                <p className="text-center">You can use them to join games up to a total cost of &pound;5.</p>
            </div>
         </div>

         <div className="space-10"></div>

          <div className="row">
            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12 col-centered ">
            	<button type="submit" className="btn zoola-btn" onClick={this.gotogameSelection}><div className="btn-txt">Join game</div></button>
                <div className="space-5"></div>
                <div className="bg-line margin-left-30 margin-right-30 margin-top-15">
                    <span className="bg-body">or</span>
                </div>
                <div className="space-10"></div>
                <button type="submit" className="btn zoola-btn" onClick={this.gotoTopUp}><div className="btn-txt">Make deposit</div></button>
            </div>
          </div>

    	 
         
         <div className="space-10"></div>
         <div className="col-lg-12">            
             <p className="text-center"><a href="https://playzoola.zendesk.com/hc/en-us/categories/201080409-Promotions-Bonuses" className="underline d-block-m" target="_blank">Playthrough reqiurements apply.</a></p>
         </div>
         <div className="space-10"></div>
         </div>
        )
    }
});


 