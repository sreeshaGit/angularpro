/** @jsx React.DOM */

var gameid = "";

//**********--- call getCookie function to read cookie---**********
getCookie()
if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}
if (getParameterByName("gameid") && getParameterByName("gameid") != "") {
    gameid = getParameterByName("gameid");
}

//**********--- subheader component ---**********
var Subheader = React.createClass({
    render: function () {
        return (
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                                    <h3>Create game</h3>
                        </div>
                    </div>
        )
    }
});

//**********--- QuestionsDropdown component ---**********
var QuestionsDropdown = React.createClass({
	getInitialState: function () {
        return {
            number: 0,
            questions:[]
        };
    },
	handleChange:function(e){
	    self.props.selectedQuestion = e.target.value;
	},
    render: function () {
        var self = this;
        var id = "question_"+this.props.number
		var optionsState = "";
		var sel = false;
		return (
                 <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-3 text-center">
                        <div className="">
                            <span className="number"> {self.props.number} </span>
                        </div>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-9">
                        <div className="form-group">
                            <div className="zoola-select no-margin bg-white">
                                {self.props.selectedQuestion != ''?
								<select className="" id={id} value={self.props.selectedQuestion} onChange={this.handleChange}>
                                    <option></option>
                                    {
                                        this.props.questions.map(function (item, index) {

                                            return <option className="pointer-hand" value={item.mkt_id } key={index}>{item.question}</option>
                                        })
                                    }
                                </select>:
                                <select className="" id={id}>
                                    <option></option>
                                        {
                                            this.props.questions.map(function (item, index) {

                                                return <option className="pointer-hand" value={item.mkt_id } key={index}>{item.question}</option>
                                            })
                                        }
                                 </select>}
                            </div>
                        </div>
                    </div>
                 </div>
        )
    }
});

//**********--- Creategame component ---**********
var Creategame = React.createClass({
    getInitialState: function () {
        return {
            number: 0,
            questions:[],
			selectedQuestions :[]
        };
    },
    componentWillMount: function () {
        this.serverRequest = $.get(baseurl + "game/create2/" + userId + "," + sessionId + "," + gameid, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            this.setState({ number: result.items[0]['number'], questions: result.items[0]["questions"]})
        }.bind(this));
        
        var QuestionsData =[];
		this.serverRequest = $.get(baseurl+"game/update2/"+ userId+"," + sessionId +"," +gameid, function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                QuestionsData = result.items;
                var selectedquestions =[];
				for(var i = 0;i<QuestionsData.length; i++){
				var mkt_id = QuestionsData[i].mkt_id;
				var dataFilter = this.state.questions.filter(function(d){
				if(d.mkt_id == mkt_id)
                {
					selectedquestions.push({"mkt_id":mkt_id,"num": i,"question":d.question});
                    return true;
				}
                })
				if(selectedquestions.length <= 0){
					selectedquestions = this.state.questions;
				}
				}
			this.setState({selectedQuestions : selectedquestions});
            }.bind(this));
    },
    valdate: function (event) {
        var mkt_id = [];
        var items = [];
        var selQuestions = [];
        for (i = 1; i <= this.state.number; i++) {
            if ($("#question_" + i).val() == '') {
                error = "please select all the above questions.\n";
                document.getElementById("selecterror").innerHTML = "please select all the above questions."
                return false;
            }
            if (selQuestions.indexOf($("#question_" + i).val()) == -1)
            {
                selQuestions.push($("#question_" + i).val())
            }
           else
            {       
                error = "Selection of two same questions are not allowed.\n";
                document.getElementById("selecterror").innerHTML = "Selection of two same questions are not allowed."
                return false;
            }
            items.push({ "num": i, "mkt_id": $("#question_" + i).val() })
        }
        document.getElementById("selecterror").innerHTML = "&nbsp;"
        var select = { "items": items }
        if (this.state.selectedQuestions.length > 0) {
            this.serverRequest = $.post(baseurl + "game/update2/" + userId + "," + sessionId + "," + gameid, JSON.stringify(select), function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
               window.location = "/creategameqns/?islog=" + is_loggedIn + "&gameid=" + result.items[0]["pls_id"]+"&prevGameId="+gameid
            }.bind(this));
        } else {
            this.serverRequest = $.post(baseurl + "game/create2/" + userId + "," + sessionId + "," + gameid, JSON.stringify(select), function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                window.location = "/creategameqns/?islog=" + is_loggedIn + "&gameid=" + result.items[0]["pls_id"]+"&prevGameId="+gameid
            }.bind(this));
        }
    },
    gotoCreatenewgame: function () {
        window.location = "/createnewgame/?islog=" + is_loggedIn + "&editparam=true&gameid=" + gameid      
    },
    render: function () {
        var self = this;
        return ( <div>
         <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                    <span className="tit-txt">SELECT GAME QUESTIONS</span>
                </div>
         </div>
         <div className="space-5"></div>
 		 <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-7 col-xs-12 col-centered">
                <div className="col-centered zoola-box create-game">
                      <div className="padding-30">
                            
                          <div className="space-5"></div>
                          {(function (que,num) {
                              for (i = 1; i <= num; i++)
                              {   
                                  var m = i-1;
                                  var mkt_id = '';
                                  if(self.state.selectedQuestions.length > 0){
                                      mkt_id = self.state.selectedQuestions[m].mkt_id;
                                  }
                                var selQue = self.state.questions.filter(function(d){
                                  if(d.mkt_id == mkt_id)
                                  {     
                                      return true;
                                  }
                                })
                               que.push(<div key={i}><QuestionsDropdown number={i}  questions={self.state.questions}  selectedQuestion={mkt_id}/> <div className="space-5"></div></div>)
                              }
                              return que
                          })([],self.state.number)}                               
                            <div id="selecterror" className="text-center alert-message">&nbsp;</div>
                      </div>                  
                      
                </div>
                <div className="space-5"></div>
                <button className="btn zoola-btn" onClick={this.valdate}><div className="btn-txt">Create game</div></button>
            </div>		
         <div className="space-10"></div>
         <div className="row">
        	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
               {getParameterByName("star") != null || this.state.selectedQuestions.length > 0 ? '':<div className="ntr-txt underline" onClick={this.gotoCreatenewgame}>Go back and edit parameters</div>}
        	</div>
         </div>
        <div className="space-10"></div>
        </div>  
               </div>        
          )
       }

});
