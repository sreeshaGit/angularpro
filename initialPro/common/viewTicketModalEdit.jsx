//**********---- Component for view ticket popup ----**********
var ViewTicketModal = React.createClass({
    getInitialState: function () {
        return {
            viewTicketData:[],
            viewTicketMainData: {},
            uniqedata: [],
            isEdit:false
        };
    },
    componentWillMount: function () {
        var self = this
        this.serverRequest = $.get(baseurl+"play/game2/"+ userId+"," + sessionId +"," +this.props.plsid, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            var data1= result.items;
            var uData = [];
            var uids =[];
               
            for(i = 0; i< data1.length; i++){
                //console.log(data1[i]['pic_value1'])
                if(uids.indexOf(data1[i].evi_id) === -1){
                    //console.log(data1[i])
                        
                    data1[i]["isStar"] = false;
                    data1[i]["answer"]=" "
                    data1[i]["picValues"]=[];
                    data1[i]["picValues"].push({pic_value1:data1[i]['pic_value1'],pic_value2:data1[i]['pic_value2'],pic_id:data1[i]['pic_id']});
                    uData.push(data1[i]);
                    uids.push(data1[i].evi_id);
                }
                else{
                    uData[uids.indexOf(data1[i].evi_id)]["picValues"].push({pic_value1:data1[i]['pic_value1'],pic_value2:data1[i]['pic_value2'],pic_id:data1[i]['pic_id']})
                }
            }
                
            for(j=0; j<uData.length; j++){
                    
                uData[j]["picValues"].sort(function(a, b) {
                    return parseFloat(a.pic_value1) - parseFloat(b.pic_value1);
                });
                uData[j]['values'] =[]
                for(k=0;k<uData[j]['picValues'].length;k++){
                    uData[j]['values'].push(uData[j]['picValues'][k]['pic_value2'])
                }
                   
            }
                
            //console.log(uData)
            uniqedata = uData
            this.setState({uniqedata: uData})
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
                //var uniqedata1= [].concat(QuestionsThis.state.uniqedata);
                //console.log("uniqedata1=== QuestionsThis.state.uniqedata==",uniqedata1=== QuestionsThis.state.uniqedata)
                //uniqedata.push(QuestionsThis.state.uniqedata)
                //for(i=0;i<QuestionsThis.state.uniqedata.length;i++)
                //{
                //    uniqedata1.push(QuestionsThis.state.uniqedata[i])
                //}
                var uniqedata1 = self.state.uniqedata;
               // console.log(uniqedata1)
                for (i = 0; i < uniqedata1.length; i++)
                {
                    var ansData = data.filter(function (d) {
                        if (uniqedata1[i].evi_number == d.event_order) {
                            return true;
                        }
                    });
                    if(ansData.length>0)
                    {
                        uniqedata1[i].answer = ansData[0].valuex;
                        uniqedata1[i].isStar = ansData[0].star=='Y'?true:false;
                    }
                }
                //console.log(uniqedata1)
                self.setState({ viewTicketData: data, viewTicketMainData: maindata, formatedDate: formatedDate, uniqedata: uniqedata1 });
            }.bind(this)); 
            //console.log(uData)         
        }.bind(this));
          
    },
    editTicket:function(){
        //console.log("editTicket")
        //if(this.props.page=="GV")
        //{
        //    this.props.edit(this.state.viewTicketData,this.props.ticket);
        //}
        //else{
        //    window.location = "/build/views/Football/LeaderBoard/leaderBoard.html?islog=true&plsid="+this.props.pls+"&isglory=false";
        //}
        this.setState({isEdit:true})
        var self =this
        setTimeout(function(){
            var data = self.state.uniqedata;
            var starOption = data.filter(function(d){
                if(d.isStar)
                {
                    return true
                }
            })
            //console.log("starOption==",starOption)
            if(starOption.length>0)
            {
                //self.setState({staroption:starOption[0]['evi_id']})
                $("#OptdropQuestar1").val(starOption[0]['evi_id'])
            }
        },100) 
        
        
    },
    componentDidMount:function(){
        $(ReactDOM.findDOMNode(this)).modal('show');
        $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideViewTicket);
    },
    submitQuestions:function(){ // Function to post questions
        var self =this;
        var postdata=[];
        var data =this.state.uniqedata
        var obj = {};
        for (i = 0; i < data.length; i++) {
            if (data[i]['answer'] == "" || data[i]['answer'] == null || data[i]['answer'] == 'No Answer') {
                $("#EditError").html("Please answer all the questions and choose star question");
                return false;
            }
        }
        $("#EditError").html("");
        for(i=0;i<data.length;i++)
        {
            
            obj.upl_id = this.props.ticket;
            obj.evi_id=data[i]['evi_id'];
            obj.pic_id=data[i]['pic_id'];
            obj.pic_no=data[i]['answer']=="No Answer"?'':data[i]['answer'];
            if(data[i]['isStar'])
            {
                obj.star='Y'
            }
            else{
                obj.star='N'
            }
            
            postdata[i]=obj;
            obj={};
        }
        
            this.serverRequest = $.post(baseurl+"play/update/"+ userId + "," + sessionId,JSON.stringify({"items":postdata}) ,function (result) {
                $("#ViewTicketModal").modal('hide');
                //GLThis.componentWillMount();
                //headerThis.componentWillMount();
                //SupHeaderThis.componentWillMount();
                //self.setState({editTicketId:0,isEditTicket:false});
                //var data = self.state.uniqedata
                //for(i = 0; i< data.length; i++){
                //    data[i]["isStar"] = false;
                //    data[i]["answer"]="No Answer"
                //    if(data[i]['evi_ui_type']=='MINISLIDER')
                //    {
                //        var ids = "slider1_"+i
                //        $('#'+ids).jRange('setValue',"0")
                //    }
                //    else if(data[i]['evi_ui_type']=='2SWITCH')
                //    {
                //        //var ids = "switch2_"+i
                //        //console.log(ids);
                //        var ids = "switch2_"+i
                //        var checkBoxes = $('#'+ids);
                //        checkBoxes.prop("checked", false);
                //    }
                //    else if(data[i]['evi_ui_type']=='SLIDER')
                //    {
                //        var ids = "slider2_"+i
                //        $('#'+ids).jRange('setValue',"0")
                //    }
                   
                //}
                //self.setState({uniqedata:data});
                //$("#OptdropQuestar").val('');
               // window.location="/build/views/Football/Glory/joinedSetupProfile/joinedSetupProfile.html?islog="+is_loggedIn+"&plsid="+plsid;
            })
        
        
        
        $("#BuyTicketModal").modal('hide');
    },
    render: function () {
        var self= this;

        return (
                <div className="modal fade animated fadeIn" id="ViewTicketModal" tabIndex="-2" role="dialog" aria-labelledby="myModalLabel" data-keyboard="true">
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
                                    this.state.uniqedata.map(function (item, index) {
                                        var id2 = index + "_3";
                                        
                                            if (index % 2 == 0)
                                            {
                                                return <div className={item.isStar? "selected-star-qn game-qns-box padding-10 bg-light-blue margin-10" : "game-qns-box padding-10 bg-light-blue margin-10"} key={index}>
                                                     <div className="row">
                                                        {/*<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 text-center">
                                                            <span className="number"> {item.event_order} </span> {item.event_name =="GOAL" || item.event_name =="SHOT" || item.event_name =="SHOTON" || item.event_name =="SHOTOFF"?<img className="number-img" src="/images/qn-icon-goal.svg" />:item.event_name =="CORNER" || item.event_name =="THROWIN"?<img className="number-img" src="/images/qn-icon-corner.svg" />:item.event_name =="CARD" || item.event_name =="FOUL" || item.event_name =="FREEKICK" || item.event_name =="OFFSIDE"? <img className="number-img" src="/images/qn-icon-ycard.svg" />:item.event_name =="EVENT"?<img className="number-img" src="/images/qn-icon-corner.svg" />:item.event_name =="SAVE" || item.event_name =="BLOCK" || item.event_name =="INTERCEPTIONS" || item.event_name =="CLEARANCE"?<img className="number-img" src="/images/qn-icon-goal.svg" />:<img className="number-img" src="/images/qn-icon-empty.svg" />}
                                                        </div>*/}
                                                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-7">
                                                            <span className="game-question">{item.evi_desc}</span>
                                                        </div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-5 text-right">
                                                            {/*{item.star=='Y'?<div className="doble-points text-center"><span className="glyphicon glyphicon-star font-30 blue"></span><br /><span className="blue">DOUBLE<br />POINTS</span></div>:''}*/}
                                                            {!self.state.isEdit?<div className="bg-dark-blue answer">{item.valuex == "1-90" ? item.answer : item.answer == 'N' ? 'No' : item.answer == 'Y' ? 'Yes' : item.answer}</div>
                                                             :<OptdropEdit val={item.values} self={self} data={self.state.uniqedata} ind={index} ids={id2} queType={item.evi_ui_type} ans={item.answer}/>}
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            else {
                                                return <div className={item.isStar? "selected-star-qn game-qns-box padding-10 bg-dark-blue margin-10" : "game-qns-box padding-10 bg-dark-blue margin-10"} key={index}>
                                                     <div className="row">
                                                        {/*<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 text-center">
                                                            <span className="number"> {item.event_order} </span> {item.event_name =="GOAL" || item.event_name =="SHOT" || item.event_name =="SHOTON" || item.event_name =="SHOTOFF"?<img className="number-img" src="/images/qn-icon-goal.svg" />:item.event_name =="CORNER" || item.event_name =="THROWIN"?<img className="number-img" src="/images/qn-icon-corner.svg" />:item.event_name =="CARD" || item.event_name =="FOUL" || item.event_name =="FREEKICK" || item.event_name =="OFFSIDE"? <img className="number-img" src="/images/qn-icon-ycard.svg" />:item.event_name =="EVENT"?<img className="number-img" src="/images/qn-icon-corner.svg" />:item.event_name =="SAVE" || item.event_name =="BLOCK" || item.event_name =="INTERCEPTIONS" || item.event_name =="CLEARANCE"?<img className="number-img" src="/images/qn-icon-goal.svg" />:<img className="number-img" src="/images/qn-icon-empty.svg" />}
                                                        </div>*/}
                                                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-7">
                                                            <span className="game-question">{item.evi_desc}</span>
                                                        </div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-5 text-right">
                                                            {/*{item.star=='Y'?<div className="doble-points text-center"><span className="glyphicon glyphicon-star font-30 blue"></span><br /><span className="blue">DOUBLE<br />POINTS</span></div>:''}*/}
                                                            {!self.state.isEdit?<div className="bg-light-blue answer">{item.valuex=="1-90"?item.valuex:item.answer=='N'?'No':item.answer=='Y'?'Yes':item.answer}</div>
                                                            :<OptdropEdit val={item.values} self={self} data={self.state.uniqedata} ind={index} ids={id2} queType={item.evi_ui_type} ans={item.answer}/>}
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            
                                    

                                    })
    }
                                    {self.state.isEdit? <div className="game-qns-box bg-star-qn margin-10">
                                <div className="row">


                                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-7">
                                        	<span className="game-question">Which of the questions do you want to double points for?</span>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-5 text-right">
                                        	<OptdropQue self={self} data={self.state.uniqedata} ind="star1" />
                                        </div>

                                </div>
                                </div>:''}
                                <div id="EditError" className="text-center sm-txt"></div>
                                </div>
                                
                                
                                <div className="row no-margin">
                                    <div className="col-lg-12 text-center">
                                        <div className="space-5"></div>
                	                    <h4>Ticket ref #{this.props.ticket} purchased for &pound; {this.state.viewTicketMainData.entry_} <span className="d-block-m">on {this.state.formatedDate}</span></h4>
                                        <div className="space-5"></div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-8 col-centered">
                                    {this.props.gamestatus=='O'?!self.state.isEdit?<button className="btn zoola-btn" onClick={this.editTicket}>
                                        <h5 className="" onClick={this.editTicket}>Edit Ticket</h5>
                                    </button>
                                    :<button className="btn zoola-btn" onClick={this.submitQuestions}>
                                        <h5 className="">Update Ticket</h5>
                                    </button>:''}

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