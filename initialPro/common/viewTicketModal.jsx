//**********---- Component for view ticket popup ----**********
var ViewTicketModal = React.createClass({
    getInitialState: function () {
        return {
            viewTicketData:[],
            viewTicketMainData:{}
        };
    },
    componentWillMount: function () {
        this.serverRequest = $.get(baseurl+"play/review/"+userId +","+sessionId+","+this.props.ticket, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            var data = result.items;
            var maindata = data[0];
            maindata.ticket_no = data[1]["ticket_no"];
            var startTime = maindata.timestamp;//"20160609170700";
            var str = startTime;
            var year = str.slice(0, 4);
            var month = str.slice(4, 6);
            var day = str.slice(6, 8);
            var hours = str.slice(8, 10);
            var min = str.slice(10, 12);
            var sec = str.slice(12, 14);
            var formatedDate = year + "/" + month + "/" + day + " at  " + hours + ":" + min + ":" + sec;
            this.setState({ viewTicketData: data, viewTicketMainData: maindata, formatedDate: formatedDate });
        }.bind(this));   
    },
    editTicket:function(){
        if(this.props.page=="GV")
        {
            this.props.edit(this.state.viewTicketData,this.props.ticket);
        }
        else{
            //window.location = "/build/views/Football/LeaderBoard/leaderBoard.html?islog=true&plsid="+this.props.pls+"&isglory=false";
              window.location = "/leaderboard/?islog=true&plsid="+this.props.pls+"&isglory=false";b
        }
        
    },
    componentDidMount:function(){
        $(ReactDOM.findDOMNode(this)).modal('show');
        $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideViewTicket);
    },
    render: function () {
        return (
                <div className="modal fade animated bounce" id="ViewTicketModal" tabIndex="-2" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static">
                    <div className="modal-dialog " role="document">
                        <div className="modal-content BuyTicketModal">
                            <div className="modal-header">
                                <img src="/images/close-icon.svg" data-dismiss="modal" className="pointer-hand pull-right " width="25"/>
                                <br />
                	            {/*<h4 className="text-gray text-center no-margin" id="myModalLabel"><div className="ticket-title"><img src="/images/zoola-game-blue-30.svg" className="margin-bottom-5" /><span className="playername-cop1 padding-left-10 padding-right-30">{this.state.viewTicketMainData.game_name}</span></div> {this.state.viewTicketMainData.fxt_name}</h4>*/}
                            </div>
                            <div className="modal-body no-padding">
                                <div className="bg-blue row no-margin">
                                    <h3 className="">Ticket #{this.state.viewTicketMainData.ticket_no}</h3>
                                </div>
                                <div className="space-5"></div>
                                {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                    <div className="space-5"></div>
                                    <div className="kickoff">{this.state.data.status=='O'?<span>{ this.state.days > 0 ?  this.state.days + ' day(s)' : <span>{this.state.showCountDown?<CountDown hours={this.state.hours} minutes={this.state.min} seconds={this.state.sec } self={this} msg="Game live" />:''}</span> }</span> :this.state.data.status=='R'?<CountDown hours={this.state.hours} minutes={this.state.min} seconds={this.state.sec } self={this} msg='Game finished' />:this.state.data.status=='C'?<CountDown hours={this.state.hours} minutes={this.state.min} seconds={this.state.sec } self={this} msg='Game live' />:this.state.data.status=='A'?'Abandoned':''}</div>
                                    <div className="space-5"></div>
                                </div>
                                <div className="row">                               
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right">
                                        <div className="leaderboard-team lb-home-team">
                                            <img src={this.state.data.home_team_id?"/images/football-shirts/numbers/"+this.state.data.home_team_id+".svg":"/images/qn-icon-empty.svg"} />
                                            <span className="lb-team-name mon-txt">{this.state.data.home_team}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-left">
                                        <div className="leaderboard-team lb-away-team">
                                            <img src={this.state.data.away_team_id?"/images/football-shirts/numbers/"+this.state.data.away_team_id+".svg":"/images/qn-icon-empty.svg"} />
                                            <span className="lb-team-name mon-txt">{this.state.data.away_team}</span>
                                        </div>
                                    </div>
                                </div>*/}
                                <div>{
                                    this.state.viewTicketData.map(function (item, index) {
                                        if(index>0)
                                        {
                                            if (index % 2 == 0)
                                            {
                                                return <div className={item.star == 'Y' ? "selected-star-qn game-qns-box padding-10 bg-light-blue margin-10" : "game-qns-box padding-10 bg-light-blue margin-10"} key={index}>
                                                     <div className="row">
                                                        {/*<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 text-center">
                                                            <span className="number"> {item.event_order} </span> {item.event_name =="GOAL" || item.event_name =="SHOT" || item.event_name =="SHOTON" || item.event_name =="SHOTOFF"?<img className="number-img" src="/images/qn-icon-goal.svg" />:item.event_name =="CORNER" || item.event_name =="THROWIN"?<img className="number-img" src="/images/qn-icon-corner.svg" />:item.event_name =="CARD" || item.event_name =="FOUL" || item.event_name =="FREEKICK" || item.event_name =="OFFSIDE"? <img className="number-img" src="/images/qn-icon-ycard.svg" />:item.event_name =="EVENT"?<img className="number-img" src="/images/qn-icon-corner.svg" />:item.event_name =="SAVE" || item.event_name =="BLOCK" || item.event_name =="INTERCEPTIONS" || item.event_name =="CLEARANCE"?<img className="number-img" src="/images/qn-icon-goal.svg" />:<img className="number-img" src="/images/qn-icon-empty.svg" />}
                                                        </div>*/}
                                                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-7">
                                                            <span className="game-question">{item.event}</span>
                                                        </div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-5 text-right">
                                                            {/*{item.star=='Y'?<div className="doble-points text-center"><span className="glyphicon glyphicon-star font-30 blue"></span><br /><span className="blue">DOUBLE<br />POINTS</span></div>:''}*/}
                                                            <div className="bg-dark-blue answer">{item.valuex=="1-90"?item.valuex:item.valuex=='N'?'No':item.valuex=='Y'?'Yes':item.valuex}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            else {
                                                return <div className={item.star == 'Y' ? "selected-star-qn game-qns-box padding-10 bg-dark-blue margin-10" : "game-qns-box padding-10 bg-dark-blue margin-10"} key={index}>
                                                     <div className="row">
                                                        {/*<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 text-center">
                                                            <span className="number"> {item.event_order} </span> {item.event_name =="GOAL" || item.event_name =="SHOT" || item.event_name =="SHOTON" || item.event_name =="SHOTOFF"?<img className="number-img" src="/images/qn-icon-goal.svg" />:item.event_name =="CORNER" || item.event_name =="THROWIN"?<img className="number-img" src="/images/qn-icon-corner.svg" />:item.event_name =="CARD" || item.event_name =="FOUL" || item.event_name =="FREEKICK" || item.event_name =="OFFSIDE"? <img className="number-img" src="/images/qn-icon-ycard.svg" />:item.event_name =="EVENT"?<img className="number-img" src="/images/qn-icon-corner.svg" />:item.event_name =="SAVE" || item.event_name =="BLOCK" || item.event_name =="INTERCEPTIONS" || item.event_name =="CLEARANCE"?<img className="number-img" src="/images/qn-icon-goal.svg" />:<img className="number-img" src="/images/qn-icon-empty.svg" />}
                                                        </div>*/}
                                                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-7">
                                                            <span className="game-question">{item.event}</span>
                                                        </div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-5 text-right">
                                                            {/*{item.star=='Y'?<div className="doble-points text-center"><span className="glyphicon glyphicon-star font-30 blue"></span><br /><span className="blue">DOUBLE<br />POINTS</span></div>:''}*/}
                                                            <div className="bg-light-blue answer">{item.valuex=="1-90"?item.valuex:item.valuex=='N'?'No':item.valuex=='Y'?'Yes':item.valuex}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            
                                    }

                                    })
    }
                                </div>
                                
                                
                                <div className="row no-margin">
                                    <div className="col-lg-12 text-center">
                                        <div className="space-5"></div>
                	                    <h4>Purchased for &pound; {this.state.viewTicketMainData.entry_} <span className="d-block-m">on {this.state.formatedDate}</span></h4>
                                        <div className="space-5"></div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-8 col-centered">
                                    <button className="btn zoola-btn" onClick={this.editTicket}>
                                        {this.props.gamestatus=='O'?<h5 className="" onClick={this.editTicket}>Edit Ticket</h5>:''}
                                    </button>
                                    <div className="space-10"></div>
                                    {/*<button className="btn zoola-btn" onClick="">
                                        <h5 className="">Sell ticket</h5>
                                    </button>*/}
                                </div>
                                
                            </div>
                            
                            <div className="modal-footer">
                                    <p className="ntr-txt text-center underline" data-dismiss="modal">Close</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
        )
}
});