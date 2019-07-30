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
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                    <h1>PAY NOW</h1>
                </div>
            </div>
        )
    }
});
var Paynow = React.createClass({
    //gotogameSelection: function () {
    //    window.location = "/build/views/Football/GameSelection/gameSelection.html?islog=" + is_loggedIn + "&isglory=" + true;
    //},
    render: function () {
        return (<div>
    <div className="container no-padding">
            <div className="row">
                <div className="col-lg-6 col-md-8 col-sm-8 col-sm-12 text-center col-centered">
                    <div className="topup-round-white"><div className="topup-bal">amount: </div><div className="topup-balance"><i className="fa fa-gbp "> </i>10</div></div>
                </div>

            </div>

        
    </div>
        <div className="space-10"></div>    
    
    </div>
    
       )
          }
          });