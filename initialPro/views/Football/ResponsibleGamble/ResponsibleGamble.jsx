/** @jsx React.DOM */
//**********--- call getCookie function to read cookie---**********
getCookie()

if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}

var ResponsibleGamble = React.createClass({      
   
    gotoMyProfile:function (){
        //window.location ="/build/views/Football/myprofile/myprofile.html?islog=" + is_loggedIn
        window.location = "/myprofile/?islog=" + is_loggedIn
    },
    render: function () {
        return (        <div>
          
            <div className="container-fluid header">
                <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                                    <h3>Responsible gambling</h3>
                            </div>
                        </div>
                </div>
            </div>
            <div className="space-10"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-centered">
                        <div className="zoola-box">
                            <div className="padding-20">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        {/*<div className="myprofile-label"><a href={"/build/views/Football/compliance_deposit_limit/compliance-deposit-limit.html?islog=" + is_loggedIn}>Deposit Limit</a> </div>
							            <div className="myprofile-label"><a href={"/build/views/Football/complianceDepositLimitTimeOut/complianceDepositLimitTimeOut.html?islog=" + is_loggedIn}>Time-out</a></div>
							            <div className="myprofile-label no-padding-bottom"><a href={"/build/views/Football/complianceSelfExclusion/complianceSelfExclusion.html?islog=" + is_loggedIn}>Self-Exclusion</a> </div>*/}
                                        <div className="myprofile-label"><a href={"/compliancedepositlimit/?islog=" + is_loggedIn}>Deposit Limit</a> </div>
							            <div className="myprofile-label"><a href={"/complianceDepositLimitTimeOut/?islog=" + is_loggedIn}>Time-out</a></div>
							            <div className="myprofile-label no-padding-bottom"><a href={"/complianceSelfExclusion/?islog=" + is_loggedIn}>Self-Exclusion</a> </div>

                                    </div>
					            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-10"></div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-centered ">
            	        <button type="submit" className="btn zoola-btn" onClick={this.gotoMyProfile}><div className="btn-txt">Back to my profile</div></button>
                    </div>
                </div>
                <div className="space-10"></div>
            </div>
        </div>
       
        )
    }
});


 