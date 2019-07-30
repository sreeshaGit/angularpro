
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
                    <h3>ACCOUNT CREATED</h3>
                </div>
            </div>
        )
    }
});
//**********--- Component for Complete Membership ---**********
var Completemembership = React.createClass({
    gotoquick: function () {
        window.location = "/build/views/Football/QuickTopUp/Quick-Top-Up.html?islog=" + is_loggedIn + "&isglory=" + true;
    },
    render: function () {
        return (<div>
                     <div className="space-10"></div>
                     <div className="row">
                        <div className="col-lg-12">
                            <h2 className="text-center">Bradley23, Thank you for creating your account!</h2>
                            <div className="space-5"></div>
                            <p className="text-center">
                                    You're almost ready to get going. To complete your playzoola membership, you'll need to add some funds to your account.
                            </p>
                        </div>
                     </div>
                     <div className="space-10"></div>
                     <div className="row">
                            <div className="col-lg-6 col-sm-6 col-centered">
                                <button type="submit" className="btn zoola-btn" onClick={this.gotoquick}><div className="btn-txt">Top up</div></button>
                            </div>
                     </div>
                     <div className="space-10"></div>
                     <div className="space-10"></div>
                     <div className="row">
                            <div className="col-lg-12 col-sm-12">
                                <p className="text-center">If you would like to make a deposit later, you can go <span className="underline">back to games</span></p>
                            </div>
                     </div>
                </div>
                       )
                         }
});


