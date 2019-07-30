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
                    <h3>Notification preferences</h3>
                </div>
            </div>
        )
    }
});
//**********--- PrefsItem component ---**********
var PrefsItem = React.createClass({
    checkIt: function () {
        this.props.callback(this.props.index, !this.props.checked);
        return;
    },
    render: function () {
        return (
                   <div>
                       <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 no-padding-right">
                            <div className="notification-option">{this.props.obj.name}</div>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center no-padding-right">
                            <div className="checkbox" > 
                                <input type="checkbox" id={this.props.ids} className="styled" checked={this.props.checked} onChange={this.checkIt}/>
                                <label></label>
                            </div>
                                    
                        </div>
                   </div>
        )
    }
});
var Notifications = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            prefs: [],
            checkAll: false,
            checkState: [],
            showSucessMsg: false,
          
        };
    },
    componentWillMount: function () {
        this.serverRequest = $.get(baseurl + "general/ntfpref/" + userId + "," + sessionId, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            var checkState = [];
            for (i = 0; i < result.prefs.length; i++) {
                checkState[i] = result.prefs[i]['preferences']=='Y'?true:false;
            }
            this.setState({ prefs: result.prefs, checkState: checkState })
        }.bind(this));
    },
    checkItem: function (index, value) {
        this.state.checkState[index] = value;
        
        this.setState({
            checkState: this.state.checkState
        });
    },
    Submit: function (unp_id) {
         var isError = false;
         var items=[];
         for (i = 0;i<this.state.prefs.length;i++)
         {
             var ans = $("#cb_" + this.state.prefs[i]['unp_id']).is(":checked") ? "Y" : "N";
             items.push({ "unp_id": this.state.prefs[i]['unp_id'], "unp_preference": ans })
         }
        
         if (isError) {
             return false;
         }
         else {
             this.serverRequest = $.post(baseurl + "general/ntfupdpref/" + userId + "," + sessionId, JSON.stringify({ "items": items }), function (result) {
                 this.setState({ items: result.items, showSucessMsg:true })
            }.bind(this));
         }
       
    }, 
    
    backtonotification: function () { 
        // window.location = "/build/views/Football/Notification/notifications/notifications.html?islog=" + is_loggedIn
        window.location = "/notifications/?islog=" + is_loggedIn
    },
    checkAll: function () {
        var checkStates = [];
        var checkState = true;
        for (var i = 0; i < this.state.checkState.length; i++) {
            checkStates[i] = checkState;
        }
        this.setState({
            checkState: checkStates,
            checkAll: checkState
        });

    },
    unCheckAll: function () {
        var checkStates = [];
        var checkState = false;
        for (var i = 0; i < this.state.checkState.length; i++) {
            checkStates[i] = checkState;
        }
        this.setState({
            checkState: checkStates,
            checkAll: checkState
        });
    },
    hideSucessMsg: function () {
        this.setState({ showSucessMsg: false })
    },
    render: function () {
        var self = this;
        var items = this.state.prefs.map(function (item, index) {
            var id = "cb_" + item.unp_id;
            return (<PrefsItem obj={item} index={index} key={item.unp_id} ids={id} checked={self.state.checkState[index]} callback={self.checkItem} />);
        });
        return (<div> 


                    {this.state.showSucessMsg?<div className="container-fluid bg-success">
                                        <div className="space-5"></div>
                                        <div className="container">
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                                                <img src="/images/success.svg" alt="Success" className="" width="30" />
                                            </div>
                                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 no-padding">

                                               <span className="sm-txt font-18">Preferences saved</span>
                                            </div>
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                                                <img src="/images/close-icon.svg" alt="Success" width="20" className="pointer-hand margin-top-5" onClick={this.hideSucessMsg} />
                                            </div>
                                        </div>
                                       <div className="space-5"></div>
     </div>:''}

                <div className="space-10"></div>
                        <div className="container">
             <div className="row text-center">
              <div className="text-underline ntr-txt" onClick={this.backtonotification}>Back to notifications</div>
             </div>
        <div className="space-10"></div>
        <div className="row ">
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-12 col-centered">

                <div className="zoola-box col-centered notification-pref">
                      <div className="padding-20">
                      <div className="row" >
                               {items} 
                      </div>
                      <div className="row" >
                          <div className="col-lg-12 text-center font-20">
                              <span className="text-underline ntr-txt" onClick={this.checkAll} > Tick all</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <span className="text-underline ntr-txt"  onClick={this.unCheckAll}>Untick all</span>
                          </div>
                      </div>
                      <div className="space-5"></div>
                      <div className="row">
                          <div className="col-lg-10 col-sm-10 col-centered">
                            <button className="btn zoola-btn" onClick={this.Submit}><h5 className="">Save preferences</h5></button>
                          </div>
                      </div>
                      </div>
                      
                </div>
            </div>

        </div>


          <div className="space-10"></div>

</div>
        </div>)
    }
});


 