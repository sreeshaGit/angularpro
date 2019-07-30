/** @jsx React.DOM */

var editparam = null;

//**********--- call getCookie function to read cookie---**********
getCookie()


if (getParameterByName("editparam") && getParameterByName("editparam") != "") {
    editparam = getParameterByName("editparam");
}

if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}
//**********--- Component to display  text  ---**********
var Head= React.createClass({
    render: function () {
        return (
            <div>
            <div className="container">
            <div className="row">
                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
				 {editparam != null ?<h3>EDIT GAME</h3>:<h3>CREATE GAME</h3>}
                 </div>
            </div>
        </div>
        </div>         
               )
                       }
});
//**********--- Component to display  Game parameters ---**********
var Parameter = React.createClass({
    getInitialState: function () {
        return {
            fixtureItems: [],
            entry: [],
            entrant: [],
            format: [],
            display: [],
            starq: [],
            gameParams : [],
            gameName: "",
            selFixtureName : "",
            selEntryVal : "",
            selEntrants : "",
            selQuestions : "",
            charNo : 0
        };
    },

    createGame: function () {// Function to validate the game parameters
        var newGameData = { "items": [{ "id": editparam != null ? getParameterByName('gameid') : 0, "name": $("#gamename").val(), "fxt_id": $("#fixture").val(), "value": $("#fee").val(), "type": $("#public").val(), "stara": $("#star").val(), "return": $("#noofque").val() }] }
        isError = false;
        if (newGameData.items[0]['name'] == "" || newGameData.items[0]['name'] == null)
        {
            $("#gamenameerror").html("Please enter game name.")
            isError = true;
        }       
        if (newGameData.items[0]['fxt_id'] == "" || newGameData.items[0]['fxt_id'] == null) {
            $("#fixtureerror").html("Please select fixture.")
            isError = true;
        }
        if (newGameData.items[0]['value'] == "" || newGameData.items[0]['value'] == null) {
            $("#fee_error").html("Please select entry fee.")
            isError = true;
        }
        //if (newGameData.items[0]['val'] == "" || newGameData.items[0]['val'] == null) {
        //    $("#entrantserror").html("Please select max entrants.")
        //    isError = true;
        //}
        if (newGameData.items[0]['type'] == "" || newGameData.items[0]['type'] == null) {
            $("#typeerror").html("Please select type.")
            isError = true;
        }
        if (newGameData.items[0]['return'] == "" || newGameData.items[0]['return'] == null) {
            $("#noofque_error").html("Please select number of questions.")
            isError = true;
        }       
        if (isError) {
            return false;
        }
        $("#gamenameerror").html("&nbsp;");
        $("#fixtureerror").html("&nbsp;");
        $("#fee_error").html("&nbsp;");
        $("#entrantserror").html("&nbsp;");
        $("#typeerror").html("&nbsp;");
        $("#noofque_error").html("&nbsp;");
        $("#starterror").html("&nbsp;");
        this.serverRequest = $.post(baseurl + "game/create1/" + userId + ","+sessionId, JSON.stringify(newGameData), function (result) {
        if (result != -1) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            //window.location = '/build/views/Football/Creategame/Creategame.html?islog=' + is_loggedIn + '&gameid=' + result.items[0]['crg_id'];
            window.location = "/creategame/?islog=" + is_loggedIn + "&gameid=" + result.items[0]['crg_id'];
        }
        }.bind(this));
    },
    componentWillMount: function () {
        this.serverRequest = $.get(baseurl + "game/create1/" + userId + ","+sessionId, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            this.setState({ fixtureItems: result.items })
            this.setState({ entry: result.values })
            this.setState({ entrant: result.entrants })
            this.setState({ format: result.formats })
            this.setState({ display: result.questions })
            this.setState({ starq: result.star_qu })
        }.bind(this));

        //console.log('editparam == ',editparam);
        if(editparam != null){
            var gameid = getParameterByName("gameid");
            this.serverRequest = $.get(baseurl + "game/update1/" + userId + ","+sessionId + ","+gameid, function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                var fix = '';var fee = '';var entr = '';var que='';
                this.setState({gameName : result.items[0].gamename})
                var selFixture = this.state.fixtureItems.filter(function(d){
                    if(d.fxt_id == result.items[0].fxt_id)
                    { 
                        fix = d.fxt_id;
                        return true;
                    }
                });
                this.setState({selFixtureName:fix});
                var selVal = this.state.entry.filter(function(d){
                    if(d.value == result.items[0].value)
                    { 
                        fee = d.value;
                        return true;
                    }
                });
                this.setState({ selEntryVal: fee });
                var selEntrant = this.state.entrant.filter(function(d){
                    if(d.type == result.items[0].format)
                    { 
                        entr = d.type;
                        return true;
                    }
                });
                this.setState({ selEntrants: entr});
                
                var selQue = this.state.display.filter(function(d){
                    if(d.display == result.items[0].questions)
                    { 
                        que = d.display;
                        return true;
                    }
                });
                this.setState({ selQuestions: que });
                this.setState({gameParams:result.items});
            }.bind(this));
        }
    },
    handleChange:function(e){
        this.setState({selFixtureName:e.target.value});
    },
    changeEntryVal:function(e){
        this.setState({selEntryVal:e.target.value});
    },
    changeEntrants:function(e){     
        this.setState({selEntrants:e.target.value});
    },
    changeQuestions:function(e){
        this.setState({selQuestions:e.target.value});
    },
    validate:function(e){
        var gameName = $('#gamename').val();
        if((gameName.length == this.state.charNo) && gameName.length == 20){
             $("#gamename_error").html("Game Name cannot be more than 20 characters");
        }
        this.setState({charNo:gameName.length});
    },
    render: function () {
        return (
            <div>
            <div className="container">
		    <div className="space-10"></div>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                    <span className="tit-txt">GAME PARAMETERS</span>
                </div>
            </div>
            <div className="space-5"></div>
 		    <div className="row">		    
            <div className="col-lg-6 col-md-7 col-sm-7 col-xs-12 col-centered">
                <div className="col-centered zoola-box create-game">
                      <div className="padding-30">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="tit-txt">
                                        Game Name: 
                                    </div>
                                    <div className="form-group">
                                        {this.state.gameName == '' && editparam== null?
                                        <input type="text" className="form-control" placeholder="Custom name" id="gamename" maxLength="20" onKeyUp={this.validate}/>:
                                        <input type="text" className="form-control" placeholder="Custom name" id="gamename" maxLength="20" value={this.state.gameName} onKeyUp={this.validate} />}
                                        <div id="gamename_error" className="alert-message">&nbsp;</div>
                                    </div>
                                    
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="tit-txt">
                                        Match:
                                    </div>
                                    <div className="form-group">
                                        <div className="zoola-select no-margin bg-white">
                                            {editparam== null?
                                        	<select className="" id="fixture">
                                            	<option></option>
                                        	    {
                                        	    this.state.fixtureItems.map(function (item, index) {
                                                    
                                        	        return <option className="pointer-hand" value={item.fxt_id} key={index} defaultValue={item.fxt_id=="143"?"selected":""}>{item.fxt_name}</option>
                                        	    })
                                        	    }
                                        	</select>:
                                            <select className="" id="fixture" value={this.state.selFixtureName} onChange={this.handleChange}>
                                            	<option></option>
                                                {
                                                this.state.fixtureItems.map(function (item, index) {

                                                return <option className="pointer-hand" value={item.fxt_id} key={index} defaultValue={item.fxt_id=="143"?"selected":""}>{item.fxt_name}</option>
                                                })
                                                }
                                            </select>}
                                        </div>
                                        <div id="fixtureerror" className="alert-message">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="tit-txt">
                                        Entry fee:
                                    </div>
                                    <div className="form-group">
                                        <div className="zoola-select no-margin bg-white">
                                            {editparam== null?
                                        	<select className="" id="fee">
                                            	<option></option>
                                        	    {
                                        	    this.state.entry.map(function(item,index){
                                        	    return <option className="pointer-hand" value={item.value} key={index}>{item.entry}</option>
                                        	    })
                                        	    }

                                        	</select> :
                                            <select className="" id="fee" value={this.state.selEntryVal} onChange={this.changeEntryVal}>
                                            	<option></option>
                                                {
                                                this.state.entry.map(function(item,index){
                                                return <option className="pointer-hand" value={item.value} key={index}>{item.entry}</option>
                                                })
                                                }

                                            </select>}
                                        </div>
                                         <div id="fee_error" className="alert-message">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                            
                            {/*<div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="tit-txt">
                                        Max. entrants:
                                    </div>
                                    <div className="form-group">
                                        <div className="zoola-select no-margin bg-white">
                                        	<select className="" id="entrants">
                                            	<option></option>
                                        	    {
                                        	    this.state.entrant.map(function(item,index){
                                        	    return
                                                    <option className="pointer-hand" value={item.val} key={index}>{item.entrant}</option>
                                        	    })
                                        	    }
                                        	</select>
                                        </div>
                                         <div id="entrantserror"></div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                    
                                </div>
                            </div>
                            <div className="space-5"></div>*/}
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="tit-txt">
                                        Public/ Private:
                                    </div>
                                    <div className="form-group">
                                        <div className="zoola-select no-margin bg-white">
                                            {editparam== null?
                                        	<select className="" id="public">
                                            	<option></option>
                                        	    {
                                        	    this.state.entrant.map(function(item,index){
                                        	    return <option className="pointer-hand" value={item.type} key={index}>{item.format}</option>
                                        	    })
                                        	    }
                                        	</select>:
                                            <select className="" id="public" value={this.state.selEntrants} onChange={this.changeEntrants}>
                                            	<option></option>
                                                {
                                                this.state.entrant.map(function(item,index){
                                                return <option className="pointer-hand" value={item.type} key={index}>{item.format}</option>
                                                })
                                                }
                                            </select>}
                                        </div>
                                        <div id="typeerror" className="alert-message">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="tit-txt">
                                        Number of questions:
                                    </div>
                                    <div className="form-group">
                                        <div className="zoola-select no-margin bg-white">
                                            {editparam == null?
                                            <select className="" id="noofque">
                                            	    <option></option>
                                                {
                                                this.state.display.map(function (item, index) {
                                                    return <option className="pointer-hand" value={item.return} key={index }>{item.display}</option>
                                                })
                                                }
                                            </select>:
                                            <select className="" id="noofque" value={this.state.selQuestions} onChange={this.changeQuestions}>
                                            	    <option></option>
                                                {
                                                this.state.display.map(function (item, index) {
                                                return <option className="pointer-hand" value={item.return} key={index }>{item.display}</option>
                                                })
                                                }
                                            </select>
                                            }
                                        </div>
                                        <div id="noofque_error" className="alert-message">&nbsp;</div>
                                    </div>
                                </div>
                            </div>                                                       
                     </div>
                     
                </div>
                <div className="space-10"></div>
                <button className="btn zoola-btn" onClick={this.createGame}><div className="btn-txt">Next</div></button>
            </div>
 		</div>
         <div className="space-10"></div>
            </div> 
        </div>      
               )
                       }
});