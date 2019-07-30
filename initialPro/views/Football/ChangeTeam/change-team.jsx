//**********--- call getCookie function to read cookie---**********
getCookie()

if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
    ticketCount = 1;
}
else {
    is_loggedIn = false;
}

//**********---- Component to display header ----**********
var Header = React.createClass({
    render: function () {
        return (
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                       <h3>CHANGE YOUR TEAM</h3>
                    </div>
                </div>
        )
    }
});

//**********---- Component to display Tab view for premier league and championship ----**********
var Tabview = React.createClass({
    getInitialState: function () {
        return {
            premierTeams: [],
            championshipTeams: [],
            favteam: "",
            selectedTeam:""
        };
    },
    componentWillMount: function () {
        var prmierTeams = [
    {
        "team_id": 1,
        "name": "Man Utd"
    },
	{
	    "team_id": 3,
	    "name": "Arsenal"
	},
	{
	    "team_id": 6,
	    "name": "Tottenham"
	},
	{
	    "team_id": 8,
	    "name": "Chelsea"
	},
	{
	    "team_id": 11,
	    "name": "Everton"
	},
	{
	    "team_id": 13,
	    "name": "Leicester"
	},
	{
	    "team_id": 14,
	    "name": "Liverpool"
	},
	{
	    "team_id": 20,
	    "name": "So'ton"
	},
	{
	    "team_id": 21,
	    "name": "West Ham"
	},
	{
	    "team_id": 25,
	    "name": "M'Boro"
	},
	{
	    "team_id": 31,
	    "name": "C Palace"
	}, {
	    "team_id": 35,
	    "name": "W Brom"
	}, {
	    "team_id": 43,
	    "name": "Man City"
	}, {
	    "team_id": 56,
	    "name": "S'Land"
	}, {
	    "team_id": 57,
	    "name": "Watford"
	}, {
	    "team_id": 80,
	    "name": "Swansea"
	}, {
	    "team_id": 88,
	    "name": "Hull City"
	}, {
	    "team_id": 90,
	    "name": "Burnley"
	}, {
	    "team_id": 91,
	    "name": "B'mouth"
	}, {
	    "team_id": 110,
	    "name": "Stoke"
	}
        ];

        var ChampTeams = [
        {
            "team_id": 2,
            "name": "Leeds"
        },
        {
            "team_id": 4,
            "name": "Newcastle"
        },
        {
            "team_id": 5,
            "name": "Blackburn"
        },
        {
            "team_id": 7,
            "name": "Aston Villa"
        },
        {
            "team_id": 17,
            "name": "Notts Forest "
        },
        {
            "team_id": 19,
            "name": "Sheffield Wed"
        },
        {
            "team_id": 24,
            "name": "Derby"
        },
        {
            "team_id": 36,
            "name": "Brighton and Hove"
        },
        {
            "team_id": 37,
            "name": "Barnsley"
        },
        {
            "team_id": 38,
            "name": "Huddersfield "
        },
        {
            "team_id": 39,
            "name": "Wolves "
        }, {
            "team_id": 40,
            "name": "Ipswich"
        }, {
            "team_id": 41,
            "name": "Birmingham"
        }, {
            "team_id": 45,
            "name": "Norwich"
        }, {
            "team_id": 52,
            "name": "QPR"
        }, {
            "team_id": 54,
            "name": "Fulham"
        }, {
            "team_id": 72,
            "name": "Rotherham"
        }, {
            "team_id": 94,
            "name": "Brentford"
        }, {
            "team_id": 97,
            "name": "Cardiff"
        }, {
            "team_id": 107,
            "name": "Preston"
        }, {
            "team_id": 108,
            "name": "Reading"
        }, {
            "team_id": 111,
            "name": "Wigan"
        }, {
            "team_id": 113,
            "name": "Bristol City"
        }, {
            "team_id": 587,
            "name": "Burton"
        }
        ];

        this.setState({ "premierTeams": prmierTeams, "championshipTeams": ChampTeams })
    },
    componentDidMount: function () {
        this.serverRequest = $.get(baseurl +"registration/team/" + userId + "," + sessionId, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            this.setState({ favteam: result.image[0], selectedTeam: result.image[0] });
            $(".team-name").removeClass('selected-team');
            $("#teamPre_" + this.state.favteam.team_id).addClass("selected-team");
           
        }.bind(this));


    },
    selectTeam: function (id, comp) {
        console.log(id)
        if (comp == 'P')
        {
            this.setState({"selectedTeam":id,"compName":'P'});
            $(".team-name").removeClass('selected-team');
            $("#teamPre_" + id).addClass("selected-team");
        }
        else if (comp == 'C') {
            this.setState({"selectedTeam":id,"compName":'C'});
            $(".team-name").removeClass('selected-team');
            $("#teamCham_" + id).addClass("selected-team");
        }
        
      
    },
    chooseTeam: function () {
        
        var data = { "item": [{ "team_id": this.state.selectedTeam, "comp_id": this.state.compName == 'P' ? 8 : this.state.compName == 'C'?10:'' }] }
        this.serverRequest = $.post(baseurl + "registration/team/" + userId + "," + sessionId, JSON.stringify(data), function (result) {
            console.log("success")
            //window.location = "/build/views/Football/myprofile/myprofile.html?islog=" + is_loggedIn
            window.location = "/myprofile/?islog=" + is_loggedIn
        }.bind(this));
    },
    render: function () {
        var self = this;
        return (
                <div>
                    <div className="space-10"></div>
                    
                    <div className="row ">
                        <div className="col-lg-12 col-md-12 col-sm-11 col-xs-12 col-centered">
                           <div className="row">
                    	        <div className="col-lg-12">
	                                <ul id="myTab" className="nav nav-tabs zoola-tabs">
                                        <li className="active"><a data-toggle="tab" data-target="#p-league">PREMIER LEAGUE</a></li>
                                        <li><a data-toggle="tab" data-target="#championship">CHAMPIONSHIP</a></li>
	                                </ul>
                                    <div className="tab-content zoola-tab-content">
                                        <div id="p-league" className="tab-pane active">
                                            <div className="space-5"></div>
                              	            <div className="row mobile-text-center">
                                                {
                                                    this.state.premierTeams.map(function (item, index) {
                                                        return <div className="premier-team pointer-hand" onClick={self.selectTeam.bind(null,item.team_id,'P')} key={index}>
                                        	                        <img width="135" alt="" src={"/images/jerseys/EPL/" + item.team_id + ".svg" }/><span className="team-name tm-txt" id={"teamPre_" + item.team_id }>{item.name}</span>
                                    	                        </div>
                                                    })
                                                }
                              	            </div>
                                        </div>
                                        <div id="championship" className="tab-pane">
                                            <div className="space-5"></div>
                                            <div className="row mobile-text-center">
                                                    {
                                                        this.state.championshipTeams.map(function (item, index) {
                                                            return <div className="premier-team pointer-hand" onClick={self.selectTeam.bind(null, item.team_id,'C')} key={index}>
                                        	                                <img width="135" alt="" src={"/images/jerseys/EC/" + item.team_id + ".svg" } /><span className="team-name tm-txt" id={"teamCham_" + item.team_id }>{item.name}</span>
                                                                </div>
                                                        })
                                                    }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-10"></div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-centered no-padding">    
                                        <button className="btn zoola-btn" onClick={this.chooseTeam}><div className="btn-txt">Choose</div></button>
                                    </div>
                    	        </div>
                           </div>
                        </div>
                    </div>

                    <div className="space-10"></div>
		            <div className="row">
				        <div className="col-lg-12 text-center">
					        <p>Note: you can only change your <br />team once every 30 days. </p>
				        </div>
		            </div>
		            <div className="space-10"></div>
              </div>
        )
    }
});