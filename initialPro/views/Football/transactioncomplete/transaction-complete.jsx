/** @jsx React.DOM */
//**********--- call getCookie function to read cookie---**********
getCookie()

if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}

//**********--- Component to display Transaction complete text  ---**********
var Transaction = React.createClass({
    render: function () {
        return (
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                    <h1>TRANSACTION COMPLETE</h1>
                </div>
               )
                       }
});
//**********--- Component to display amount  ---**********
var Amount= React.createClass({
    render: function () {
        return (
                   <div className="col-lg-6 col-md-8 col-sm-8 col-sm-12 text-center col-centered">
                    <div className="topup-round-white"><div className="topup-bal">amount: </div><div className="topup-balance"><i className="fa fa-gbp "> </i>10 </div></div>
                   </div>
               )
                       }
});
//**********--- Component to display reference ---**********
var Ref= React.createClass({
    render: function () {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                <p className="text-center font-20"><i className="fa fa-gbp "> </i>10 was been added to your wallet! Ref #2929123 </p>
            </div>
                )
                       }
});




