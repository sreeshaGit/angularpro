//**********---- Component for Mini dash ----**********
var MiniDash = React.createClass({
    getInitialState: function () {
        return {
            data:{}
        };
    },
    componentWillMount: function () {
        this.serverRequest = $.get(baseurl + "play/minidash/" + userId + "," + sessionId + "," + this.props.uid, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            this.setState({ "data": result.items[0] })
        }.bind(this));
        //var result={"items":[{"usr_id":"6187","username":"Testor","team_id":"43"}]};
       
    },
    sendFriendReq: function () {
        this.serverRequest = $.get(baseurl + "play/friendreq/" + userId + "," + sessionId + "," + this.props.uid + ",MDASH", function (result) {
        $("#minidashboard-mobile").modal('hide')
        }.bind(this));
    },
    componentDidMount:function(){
        $(ReactDOM.findDOMNode(this)).modal('show');
        $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideMD);
    },
    render: function () {
        return (
                    <div className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="login-with-social" id="minidashboard-mobile" data-backdrop="static">
                       <div className="modal-dialog modal-sm">
                         <div className="modal-content zoola-box bg-blue">
        	                 <div className="social-header">
            	                  <img src="/images/close-icon-white.svg" width="20" className="pull-right pointer-hand" data-dismiss="modal"/>
                             </div>
        	            <div className="social-body">
            	            <div className="space-5"></div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                   <img src={"/images/animals-Modified/" + this.state.data.usr_image + ".svg"} width="200"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right">
                                    <div className="minidashboard-team">							            
                                        <img src={this.state.data.team_id != 0 ? this.state.data.comp_id == 8 ? "/images/jerseys/EPL/" + this.state.data.team_id + ".svg" : this.state.data.comp_id == 10 ? "/images/jerseys/EC/" + this.state.data.team_id + ".svg" : "/images/football-shirts/numbers/" + this.state.data.team_id + ".svg" : "/images/undef.svg"} alt="" />
                                        <div className="team-name tm-txt">{this.state.data.team_name}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                	            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
						            <div className="mol-lg">{this.state.data.username}</div>
                	            </div>
                            </div>
				            <div className="space-5"></div>
                            {/* <div className="row">
                	            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
						            <img src="/images/add-friendplus.svg" alt=""/>
                	            </div>
                            </div>
                            <div className="space-5"></div>
                            <div className="row">
                                <div className="col-lg-10 col-sm-10 col-centered">
                                    <button type="submit" className="btn zoola-btn" onClick={this.sendFriendReq}><h5 className="">Add mate</h5></button>
                                </div>
                            </div> */}
                            <div className="space-5"></div>

        	                 </div>
                         </div>
                     </div>
                  </div>
                )
    }
});