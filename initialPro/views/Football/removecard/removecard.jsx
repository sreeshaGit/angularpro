/** @jsx React.DOM */

var amt =0;
//**********--- call getCookie function to read cookie---**********
getCookie()

if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}

//**********--- Subheader component ---**********
var Subheader = React.createClass({
    render: function () {
        return (
                          <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                            <h1>  Remove card</h1>
                                 </div>
                         </div>
        )
    }
});

//**********--- Removecard component ---**********
var Removecard = React.createClass({
    getInitialState: function () {
        return {
            items:{},
            cards: []
        };
    },
    componentWillMount: function () {
        this.serverRequest = $.get(baseurl + "deposit/topup/" + userId + ',' + sessionId, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            this.setState({ cards: result.cards });
        }.bind(this));
        //var data = {
        //    "cards": [{ "pyr_id": "1000", "nickname": "My blue card", "card_type": "VISA", "digits": "446291xxxxxx1234", "expiry": "1217" },
        //               { "pyr_id": "1000", "nickname": "My blue card", "card_type": "VISA", "digits": "446291xxxxxx1234", "expiry": "1217" },
        //              { "pyr_id": "1000", "nickname": "My blue card", "card_type": "VISA", "digits": "446291xxxxxx1234", "expiry": "1217" }]
        //}
        //this.setState({ cards: data.cards });
    },
    remove:function(id){
        this.serverRequest = $.get(baseurl + "deposit/remove/" + userId + "," + sessionId + "," + id, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            this.componentWillMount();
        }.bind(this));
    },
    render: function () {
        var self = this;
        return ( <div>
            <div className="space-10"></div>
            <div className="row " >
        {
          this.state.cards.map(function (item, index) {
          return <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <div className="zoola-box col-centered">
                         <div className="padding-30">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                	<div className="form-group tit-txt">
                                      Nickname: <span>{item.nickname}</span>
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
                      </div>
                      
                </div>
                <button className="btn zoola-btn bg-zoola-red" onClick={self.remove.bind(null, item.pyr_id)}><div className="btn-txt white">Remove card</div></button>
                <div className="space-10"></div>
                <div className="space-10"></div>
            </div>
               })
               }
                {this.state.cards.length==0?<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12" >
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
          <div className="space-10"></div>
		  <div className="space-10"></div>
                  </div>
             )
       }

});
