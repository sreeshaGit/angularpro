
//**********--- call getCookie function to read cookie---**********
getCookie()



if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}
//**********--- Component to render text fields---**********
var Invites = React.createClass({
    gotoGameselection: function(){
        window.location = "/build/views/Football/GameSelection/gameSelection.html?islog=true"
    },
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

    render: function () {
        return (
        <div>
               <div className="container-fluid header">
                 <div className="container">
                     <div className="row">
                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                           <h3>INVITES SENT</h3>
                       </div>
                     </div>
                  </div>
               </div>
              <div className="container-fluid">
                    <div className="container">
                        <div className="row">
                            <div className="space-10"></div>
                            <div className="col-lg-12">
                                <h2 className="text-center">
                                        <span>{this.state.items.username} </span>your invites have been sent.
                                </h2>
                                <div className="space-10"></div>                                
                            </div>
                        </div>
                        <div className="space-10"></div>
                        <div className="row">
                            <div className="col-lg-6 col-md-8 col-sm-8 col-xs-12 col-centered ">
            	                <button type="submit" className="btn zoola-btn" onClick={this.gotoGameselection}><div className="btn-txt">View game</div></button>
                            </div>
                        </div>
                        <div className="space-10"></div>
                        <div className="space-10"></div>
                         <div className="space-10"></div>
    <div className="space-10"></div>
    <div className="space-10"></div>
    <div className="space-10"></div>
     <div className="space-10"></div><br/>
    <div className="space-10"></div><br/>
    <div className="space-10"></div><br />
                    </div>
              </div>
      
        </div>         
           )
    }
});

