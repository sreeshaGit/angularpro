//**********--- call getCookie function to read cookie---**********
getCookie()


if (getParameterByName("islog") && getParameterByName("islog") == 'true') {  //**********--- Condition to check User Login ---**********
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
                    <h3>CREATE ACCOUNT</h3>
                </div>
            </div>
        )
    }
});

//**********--- Component for Account Profile ---**********
var Profile = React.createClass({
    getInitialState: function () {
        return {
            files: [],
            fileslist: [],            
            teams: [],
            items: [],
            selectedAvatar: "",
            selectedTeam: "",
            avatars: [],
            avatarsListed: []
         };
    },      
            componentWillMount: function () {      
                var Avatars = [
              {
                  "avatar_id": 123,
              },
              {
                  "avatar_id": 2,
              },
              {
                  "avatar_id": 3,

              },
              {
                  "avatar_id": 4,

              },
              {
                  "avatar_id": 5,

              },
              {
                  "avatar_id": 6,

              },
              {
                  "avatar_id": 7,

              },
              {
                  "avatar_id": 8,
              },
              {
                  "avatar_id": 9,
              },
              {
                  "avatar_id": 10,
              },
              {
                  "avatar_id": 11,
              },
              {
                  "avatar_id": 12,
              },
              {
                  "avatar_id": 13,
              },
              {
                  "avatar_id": 14,
              },
              {
                  "avatar_id": 15,
              },
              {
                  "avatar_id": 16,
              },
              {
                  "avatar_id": 17,
              },
              {
                  "avatar_id": 18,
              },
              {
                  "avatar_id": 19,
              },
              {
                  "avatar_id": 20,
              },
              {
                  "avatar_id": 21,
              },
              {
                  "avatar_id": 22,
              },
              {
                  "avatar_id": 23,
              },
              {
                  "avatar_id": 24,
              },
              {
                  "avatar_id": 25,
              },
              {
                  "avatar_id": 26,
              },
              {
                  "avatar_id": 27,
              },
              {
                  "avatar_id": 28,
              },
              {
                  "avatar_id": 29,
              },
              {
                  "avatar_id": 30,
              },
              {
                  "avatar_id": 31,
              },
              {
                  "avatar_id": 32,
              },
                ];
                var totalItems = Avatars.length;
                var itemsPerPage = 6;
                var pages = Math.ceil(totalItems / itemsPerPage);
                var ava = [];
                for (i = 0; i < pages; i++)
                {
                    ava.push(Avatars.slice(i * itemsPerPage, (i + 1) * itemsPerPage))
                }      
                this.setState({ "avatars": Avatars, "avatarsListed": ava })
       
                this.serverRequest = $.get(baseurl + "registration/form/" + userId + "," + sessionId, function (result) {
                    if (typeof result != 'object') {
                        result = JSON.parse(result)
                    }
                    var totalItems = result.files[0].teams.length;
                    var itemsPerPage = 6;
                    var pages1 = Math.ceil(totalItems / itemsPerPage);
                    var mem = [];
                    for (i = 0; i < pages; i++) {
                        mem.push(result.files[0].teams.slice(i * itemsPerPage, (i + 1) * itemsPerPage))
                    }
                    this.setState({ teams: result.files[0].teams,fileslist:mem})
           
                }.bind(this));
            },
        componentDidMount: function () {
            var self = this;
            $("#txtDate").keyup(function (e) {
                if (e.keyCode != 193 && e.keyCode != 111) {
                    console.log(e.keyCode);
                    if (e.keyCode != 8) {
                        if ($(this).val().length == 2) {
                            $(this).val($(this).val() + "/");
                        } else if ($(this).val().length == 5) {
                            $(this).val($(this).val() + "/");
                        }
                   
                    } else {
                        var temp = $(this).val();
                        if ($(this).val().length == 5) {
                            $(this).val(temp.substring(0, 4));
                        } else if ($(this).val().length == 2) {
                            $(this).val(temp.substring(0, 1));
                        }
                   
                    }
                } else {
                    var temp = $(this).val();
                    var tam = $(this).val().length;
                    $(this).val(temp.substring(0, tam - 1));
                }
            });
            //$("#txtDate").mask("99/99/9999");
        },  
        submitForm: function () {  //**********--- Function to read Submit Form  ---**********
            var obj = {};
            var isError = false;
            obj.firstname = $("#Name").val()
            var data1 = {
                "items": [{
                    "username": $("#Name").val(),
                    "usr_image": this.state.selectedAvatar,
                    "team_id": this.state.selectedTeam,
                    "confirm1": $("#checkbox1").is(":checked")?"Y":"N",
                    "confirm2": $("#checkbox2").is(":checked") ? "Y" :"N"
                }]
            }

            console.log(data1);
            //var value = event.target.value;    
            console.log(data1.items[0].username);
            if (data1.items[0].username == "" || data1.items[0].username == null) {
                error = "please select user Name.\n";
                document.getElementById("nameerror").innerHTML = "please select user Name."
                isError = true;
            } else {
                document.getElementById("nameerror").innerHTML = ""
            }

            if (data1.items[0].usr_image == "" || data1.items[0].usr_image == null) {
                error = "please select avatar.\n";
                document.getElementById("pickerror").innerHTML = "please select avatar."
                isError = true;
            }
            else {
                document.getElementById("pickerror").innerHTML = ""
            }
            if (data1.items[0].team_id == "" || data1.items[0].team_id == null) {
                error = "please select your team.\n";
                document.getElementById("teamerror").innerHTML = "please select your team."
                isError = true;
            }
            else {
                document.getElementById("teamerror").innerHTML = ""
            }
     
            if (data1.items[0].confirm1 == "N" || data1.items[0].confirm2 == "N") {
                error = "please conform your age & select the terms and conditions.\n";
                document.getElementById("checkerror").innerHTML = "please confirm your age & select the terms and conditions ."
                isError = true;
            }
            else {
                document.getElementById("checkerror").innerHTML = ""
            }       
            if (isError) {
                return false;         
            }
        
            else {
                this.serverRequest = $.post(baseurl + "user/signupdate/" + userId + "," + sessionId + ",N", JSON.stringify(data1), function (data) {
                    if (data1.items) {                  
                        window.location = "/build/views/Football/Glory/joinGame/join-game.html?islog=true"
                        return false;
                    }
                }.bind(this));
            }
    
    },
    selectAvatar: function (id) {
        this.setState({ "selectedAvatar": id });
        $(".thumb").removeClass('selected-avatar');
        $("#avatar_" + id).addClass('selected-avatar');

    },
    selectTeam: function () {
        $(".team-name").removeClass('selected-team');
        console.log($("#team_" + $("#FavTem").val()))
        $("#team_" + $("#FavTem").val()).addClass('selected-team')
    },
    ontwitterchange: function () {

    },
    changeTeam: function (id) {
        console.log(id);
        $(".team-name").removeClass('selected-team');
        $("#team_" + id).addClass('selected-team');
        $("#FavTem").val(id)
        this.setState({ selectedTeam: id })
    },
       render: function () {
        var self = this;
               return (<div>
                  
 		            <div className="row">                      
                       <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 padding-right-20 padding-left-20">
                            <div className="space-10"></div>
                            <div className="login-box col-centered">
                                <div className="padding-30">
                                    <div className="row">
                                        <div className="col-lg-12">
                                                <div className="tit-txt">
                                                   Choose a username*
                                                </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="form-group">
                                                  <input type="text" className="form-control" placeholder="PZalias" defaultValue="" minLength="1" id="Name"/>
                                                <div id="nameerror"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-10"></div>

                            <div className="login-box col-centered">
                                <div className="padding-30">
                                    <div className="row">
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="tit-txt">
                                                Pick an avatar*
                                            </div>
                                            <div className="form-group">
                                                <div id="thumbcarousel" className="carousel slide avatar-slider" data-interval="false">
                                                    <div className="carousel-inner">
                                                        {
                                                        this.state.avatarsListed.map(function (element,index) {
                                                        return <div className={index==0?"item active":'item'} key={index}>
                                                            <div className="row text-center">
                                                                {
                                                                element.map(function (item, index) {
                                                                return <div data-target="#carousel" key={index} data-slide-to="0" className="thumb" onClick={self.selectAvatar.bind(null, item.avatar_id)} id={"avatar_" + item.avatar_id }><img src={"/images/animals-Modified/" + item.avatar_id + ".svg"} /></div>
                                                                })
                                                                }
                                                            </div>
                                                             </div>
                                                        })
                                                        }
                                                        <div id="pickerror"></div>
                                                    </div>
                                                    <a className="left carousel-control" href="#thumbcarousel" role="button" data-slide="prev">
                                                        <span className="fa fa-angle-left font-40"></span>
                                                    </a>
                                                    <a className="right carousel-control" href="#thumbcarousel" role="button" data-slide="next">
                                                        <span className="fa fa-angle-right font-40"></span>
                                                    </a>
                                                </div>
                                            </div>
                                      </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-10"></div>
                           
                            

                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pull-right padding-right-20 padding-left-20">
                                <div className="space-10"></div>
                                <div className="row">
                                <div className="col-lg-12">
                                    <ul className="nav nav-tabs zoola-tabs" id="myTab">
                                            <li className="active">
                                                <a data-target="#accountP-p-league" data-toggle="tab">PREMIER LEAGUE</a>
                                            </li>
                                        <li>
                                                <a data-target="#accountP-championship" data-toggle="tab">CHAMPIONSHIP</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content zoola-tab-content">
                                        <div className="tab-pane active" id="accountP-p-league">
                                            <div className="col-lg-12">
                                                <div className="tit-txt">
                                                    Select your team
                                                </div>
                                            </div>
                                            <div className="space-5"></div>
                                            <div className="form-group">
                                                <div id="teamcarousel" className="carousel slide teamcarousel" data-interval="false">
                                                    <div className="carousel-inner">
                                                        <div className="item active">
                                                    	    <div className="row ">
                                                                {
                                                                this.state.fileslist.map(function (item, index) {
                                                                return <div className="premier-team pointer-hand" onClick={self.selectTeam.bind(null,item.team_id)} key={index}>
                                        	                        <img width="135" alt="" src={"/images/football-shirts/Arsenal/" + item.team_id + ".svg" } /><span className="team-name tm-txt" id={"team_" + item.team_id }>{item.name}</span>
                                                                 </div>
                                                                })
                                                                }

                                                    	    </div>
                                                        </div>
                                                    </div>
                                                    <a className="left carousel-control" href="#teamcarousel" role="button" data-slide="prev">
                                                        <span className="fa fa-angle-left font-40"></span>
                                                    </a>
                                                    <a className="right carousel-control" href="#teamcarousel" role="button" data-slide="next">
                                                        <span className="fa fa-angle-right font-40"></span>
                                                    </a>
                                                </div>
                                            </div>
                                                
                                        </div>
                                        <div className="tab-pane" id="accountP-championship">
                                            <div classNameclassName="space-5"></div>
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                                                    <div className="premier-team">
                                                        <img src="/images/football-shirts/Crystal_Palace.svg" width="135" alt="" /><span className="team-name tm-txt">Crystal Palace</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                                                    <div className="premier-team">
                                                        <img src="/images/football-shirts/Everton.svg" width="135" alt="" /><span className="team-name tm-txt">Everton</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                                                    <div className="premier-team">
                                                        <img src="/images/football-shirts/Hotspur.svg" width="135" alt="" /><span className="team-name tm-txt">Hotspur</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                                                    <div className="premier-team">
                                                        <img src="/images/football-shirts/Leicester.svg" width="135" alt="" /><span className="team-name tm-txt">Leicester</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                                                    <div className="premier-team">
                                                        <img src="/images/football-shirts/Liverpool.svg" width="135" alt="" /><span className="team-name tm-txt">Liverpool</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                                                    <div className="premier-team">
                                                        <img src="/images/football-shirts/Manchester_City.svg" width="135" alt="" /><span className="team-name tm-txt">Manchester City</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                                                    <div className="premier-team">
                                                        <img src="/images/football-shirts/Manchester_Uni.svg" width="135" alt="" /><span className="team-name tm-txt">Manchester Uni</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                                                    <div className="premier-team">
                                                        <img src="/images/football-shirts/Newcastle.svg" width="135" alt="" /><span className="team-name tm-txt">Newcastle</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                                                    <div className="premier-team">
                                                        <img src="/images/football-shirts/Norwich.svg" width="135" alt="" /><span className="team-name tm-txt">Norwich</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                                                    <div className="premier-team">
                                                        <img src="/images/football-shirts/Southampton.svg" width="135" alt="" /><span className="team-name tm-txt">Southampton</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                                                    <div className="premier-team">
                                                        <img src="/images/football-shirts/Stoke_City.svg" width="135" alt="" /><span className="team-name tm-txt">Stoke City</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                                                    <div className="premier-team">
                                                        <img src="/images/football-shirts/Sunderland.svg" width="135" alt="" /><span className="team-name tm-txt">Sunderland</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div id="teamerror"></div>
                                    </div>
                                </div>
                                </div>
                                <div className="space-10"></div>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="forgotten">
                                            <div className="checkbox margin-bottom-15">
                                                <input id="checkbox1" className="styled" type="checkbox" />
                                                <label>
                                                    &nbsp; I'm over 18
                                                </label>                                               
                                            </div>
                                            <div className="checkbox" >
                                                <input id="checkbox2" className="styled" type="checkbox" />
                                                <label>
                                                    &nbsp; I agree to the &nbsp;<a href="" className="underline">Terms and Conditions</a>.
                                                </label>
                                                
                                            </div>
                                        </div>
                                        <div  className="alert-message"> </div>
                                    </div>
                                </div> 
                                <div id="checkerror"></div>                       
                            <div className="space-10"></div>
                                 

                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-centered ">
            	                    <button type="submit" className="btn zoola-btn" onClick={this.submitForm}><div className="btn-txt">Complete sign up</div></button>
                                </div>
                            </div>

                            </div>
                            </div>
         <div className="space-10"></div>

                       </div>)
                             }
                             });                 