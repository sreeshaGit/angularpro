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
                    <h3>NOTIFICATIONS</h3>
                </div>
            </div>
        )
    }
});
var Notified = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            notifications: [],
            ntf_id: []
            
        };
    },
    componentWillMount: function () {
        this.serverRequest = $.get(baseurl + "general/notify/"+ userId + "," + sessionId, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            for (i = 0; i < result.notifications.length; i++) {
                var str = result.notifications[i]["datetime"];
                var year = str.slice(0, 4);
                var month = str.slice(4, 6);
                var day = str.slice(6, 8);
                var hours = str.slice(8, 10);
                var min = str.slice(10, 12);
                var sec = str.slice(12, 14);
                var formatedDate = year + "/" + month + "/" + day + " " + hours + ":" + min + ":" + sec;
                var msgDate = new Date(formatedDate);
                var today = new Date();
                var days = diffdates('d', msgDate, today);
                if (days == 0)
                {
                    formatedDate = "Today, " + hours + ":" + min
                }
                else if (days == 1)
                {
                    formatedDate = "Yesterday, " + hours + ":" + min
                }
                else {
                    formatedDate = day + "/" + month + "/" + year + ", " + hours + ":" + min ;
                }
                //formatedDate.setDate(formatedDate.getDate() - 1);
                //console.log(formatedDate.setDate(formatedDate.getDate() - 1))

                result.notifications[i]["format_date"] = formatedDate

            }
            //console.log(result.notifications)
                this.setState({ notifications: result.notifications })
        }.bind(this));

        
        
    },
    markasread: function (ntf_id) { 
       // console.log(ntf_id);
        var self = this;
        this.serverRequest = $.get(baseurl + "general/notifyupd/" + userId + "," + sessionId + "," + ntf_id, function (result) {
            
            self.componentWillMount()
        }.bind(this));
    },
    gotopreferences: function () {
        //window.location = "/build/views/Football/Notification/notificationPreferences/notificationPreferences.html?islog=" + is_loggedIn
        window.location = "/notificationPreferences/?islog=" + is_loggedIn
    },
	friReqUpdate:function(type,ufrID){
		console.log(type," == ",ufrID)
		this.serverRequest = $.get(baseurl + "play/friendrequpd/" + userId + "," + sessionId + "," + ufrID+","+type, function (result) {
           //console.log(result)
		   var self = this;
		   self.componentWillMount();
        }.bind(this));
	},
    render: function () {
        var self = this;
        return (<div> 
                <div className="space-10"></div>
                    <div className="container">
                        <div className="row text-center">
                                <div className="text-underline ntr-txt" onClick={this.markasread.bind(null, 0)}>Mark all as read</div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  
                                <div className="text-underline ntr-txt" onClick={this.gotopreferences}>Preferences</div></div>
                                <div className="space-10"></div>
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-11">
                                                    
                                            {
                                            this.state.notifications.map(function (item, index) {
                                                if (item.read == 'Y') {
                                                    return <div className="notification " key={index}>
               		                                <div className="notification-time">{item.format_date} GMT</div>
                                                    <div className="notification-info">
                    	                                <div className="notification-game-icon">
                                                            <img />
                                                        </div> <span> {item.content} &nbsp;&nbsp;&nbsp;</span>
                                                             {item.ntf_ntt_id == 2?<span><a className="pointer-hand" onClick={self.friReqUpdate.bind(null,'A',item.ufr_id)}>Accept</a>,<a className="pointer-hand" onClick={self.friReqUpdate.bind(null,'B',item.ufr_id)}>Block</a> or <a className="pointer-hand" onClick={self.friReqUpdate.bind(null,'D',item.ufr_id)}>Decline</a></span>:<span></span>}     
                                                    </div>
                                                            
                                                </div>
                                                }
                                                else if (item.read == 'N') {
                                                    return <div className="notification unread" key={index}>
               		                                <div className="notification-time">{item.format_date} GMT
                                                        <div className="notif-unread" onClick={self.markasread.bind(null, item.ntf_id)}></div></div>
                                                    <div className="notification-info">
                    	                                <div className="notification-game-icon">
                                                        <img />
                                                        </div> <span> {item.content} &nbsp;&nbsp;&nbsp;</span>  
															{item.ntf_ntt_id == 2?<span><a className="pointer-hand" onClick={self.friReqUpdate.bind(null,'A',item.ufr_id)}>Accept</a>,<a className="pointer-hand" onClick={self.friReqUpdate.bind(null,'B',item.ufr_id)}>Block</a> or <a className="pointer-hand" onClick={self.friReqUpdate.bind(null,'D',item.ufr_id)}>Decline</a></span>:<span></span>}      
                                                    </div>
                                                    
                                                </div>
                                                }
                                            })
                                            }
                                        </div>
                                    </div>
                           <div className="space-10"></div>
                  </div>
                    </div>)
                }
            });

//**********--- Function to calculate no.of days between two dates ---**********
// datepart: 'y', 'm', 'w', 'd', 'h', 'n', 's'
function diffdates(datepart, fromdate, todate) {
    datepart = datepart.toLowerCase();
    var diff = todate - fromdate;
    var divideBy = {
        w: 604800000,
        d: 86400000,
        h: 3600000,
        n: 60000,
        s: 1000
    };
    return Math.floor(diff / divideBy[datepart]);
}

 