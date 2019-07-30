
/** @jsx React.DOM */
//**********--- call getCookie function to read cookie---**********
getCookie()


if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}
//**********--- gamename component ---**********
var GameName = React.createClass({
        render: function () {
            return (
            <div>
                <div className="container">
                  <div className="space-5"></div>
                  <div className="space-5"></div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                            <div className="match-stats-team">
                                <img src="/images/football-shirts/numbers/43.svg" className="bg-none"/>
                                <div className="match-team-name">West Ham</div>
                            </div>
                	            <div className="match-vs">vs</div>
                            <div className="match-stats-team">
                                <img src="/images/football-shirts/numbers/31.svg" className="bg-none"/>
                                <div className="match-team-name">Crystal Palace</div>
                            </div>
                        </div>
                    </div>
                    <div className="space-10"></div>
                </div>
                
            </div>
        )
        }
});


//**********--- slider component ---**********
    var Slider = React.createClass({
        render: function () {
            return (
        <div>
            <div className="container-fluid bg-dark-blue matchstats-slider">
                 <div className="container">
                    <div className="space-5"></div>
                    <div className="row ">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                            <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
                                 <div className="carousel-inner tm-txt font-18">
                                        <div className="item active">
                                            "Facts about this match. <br />Lorem ipsum dolor sit amet, consectetur <br /> adipisicing elit, sed do eiusmod"

                                        </div>
                                        <div className="item">
                                            "Facts about this match. <br />Lorem ipsum dolor sit amet, consectetur <br /> adipisicing elit, sed do eiusmod"
                                        </div>
                                        <div className="item">
                                            "Facts about this match. <br />Lorem ipsum dolor sit amet, consectetur <br /> adipisicing elit, sed do eiusmod"
                                        </div>


                                     
                                 </div>
                                 <ol className="carousel-indicators">
                                    <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
                                    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                                    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                                 </ol>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>                         
        </div>   
             )
            }
    });

//**********--- Zoolagame component ---**********
var Zoolagame = React.createClass({
    render: function () {
        return (
            <div>
             
      

        <div className="space-5"></div>
        <div className="row">
           
            	<div className="panel panel-default">
            	 
                	<div className="panel-heading">
                        <h1 className="panel-title">
                            ZOOLA GAMES
                        </h1>
                	</div>
                    <div id="up-coming-matches" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="collapseOne">
                    	<div className="panel-body">
                        	<div className="row">
                        	   
                            	<div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 text-center ">
                                  <div className="game-box">
                                        <div className="game-box-top">
                                            <br />
                                            <div className="game-selection-fixture">
                                                <img className="fixture-img-left" src="/images/football-shirts/numbers/43.svg" />
                                                <span className="tm-txt">Crystal Palace vs West Ham</span>
                                                <img className="fixture-img-right" src="/images/football-shirts/numbers/31.svg" />
                                            </div>
                                            <br />
                                        </div>
                                        <div className="gbx-name bg-blue">
                                            <span className="gm-txt">West Ham Fan</span>
                                        </div>
                                        <div className="gbx-people-pot text-center">
                                            <div className="capsle-people bg-white mon-txt"><img src="/images/people-30.svg" /> <span className="people-text">41</span></div>
                                            <div className="capsle-people bg-white mon-txt"><img src="/images/ticket-30.svg" /> <span className="people-text">&pound;20</span></div>
                                            <div className="capsle-people bg-white mon-txt"><img src="/images/pot-30.svg" /> <span className="people-text">&pound;2000</span></div>

                                        </div>
                                        <div className="gbx-kickoff-time bg-dark-blue smt-txt">
                                            TOMORROW 9PM
                                        </div>
                                       <div className="space-5"></div>
                                       <div className="col-lg-10 col-centered text-center"><button className="btn zoola-btn"><h5>View game</h5></button></div>
                                       <div className="space-5"></div>
                                  </div>
                            	</div>

                                <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 text-center ">
                                  <div className="game-box">
                                        <div className="game-box-top">
                                            <br />
                                            <div className="game-selection-fixture">
                                                <img className="fixture-img-left" src="/images/football-shirts/numbers/43.svg" />
                                                <span className="tm-txt">Crystal Palace vs West Ham</span>
                                                <img className="fixture-img-right" src="/images/football-shirts/numbers/31.svg" />
                                            </div>
                                            <br />
                                        </div>
                                        <div className="gbx-name bg-blue">
                                            <span className="gm-txt">West Ham Fan</span>
                                        </div>
                                        <div className="gbx-people-pot text-center">
                                            <div className="capsle-people bg-white mon-txt"><img src="/images/people-30.svg" /> <span className="people-text">41</span></div>
                                            <div className="capsle-people bg-white mon-txt"><img src="/images/ticket-30.svg" /> <span className="people-text">&pound;20</span></div>
                                            <div className="capsle-people bg-white mon-txt"><img src="/images/pot-30.svg" /> <span className="people-text">&pound;2000</span></div>

                                        </div>
                                        <div className="gbx-kickoff-time bg-dark-blue smt-txt">
                                            TOMORROW 9PM
                                        </div>
                                       <div className="space-5"></div>
                                       <div className="col-lg-10 col-centered text-center"><button className="btn zoola-btn"><h5>View game</h5></button></div>
                                       <div className="space-5"></div>
                                  </div>
                                </div>

                                <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 text-center ">
                                  <div className="game-box">
                                        <div className="game-box-top">
                                            <br />
                                            <div className="game-selection-fixture">
                                                <img className="fixture-img-left" src="/images/football-shirts/numbers/43.svg" />
                                                <span className="tm-txt">Crystal Palace vs West Ham</span>
                                                <img className="fixture-img-right" src="/images/football-shirts/numbers/31.svg" />
                                            </div>
                                            <br />
                                        </div>
                                        <div className="gbx-name bg-blue">
                                            <span className="gm-txt">West Ham Fan</span>
                                        </div>
                                        <div className="gbx-people-pot text-center">
                                            <div className="capsle-people bg-white mon-txt"><img src="/images/people-30.svg"/> <span className="people-text">41</span></div>
                                            <div className="capsle-people bg-white mon-txt"><img src="/images/ticket-30.svg"/> <span className="people-text">&pound;20</span></div>
                                            <div className="capsle-people bg-white mon-txt"><img src="/images/pot-30.svg"/> <span className="people-text">&pound;2000</span></div>

                                        </div>
                                        <div className="gbx-kickoff-time bg-dark-blue smt-txt">
                                            TOMORROW 9PM
                                        </div>
                                       <div className="space-5"></div>
                                       <div className="col-lg-10 col-centered text-center"><button className="btn zoola-btn"><h5>View game</h5></button></div>
                                       <div className="space-5"></div>
                                  </div>
                                </div>

                                <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 text-center ">
                                  <div className="game-box">
                                        <div className="game-box-top">
                                            <br/>
                                            <div className="game-selection-fixture">
                                                <img className="fixture-img-left" src="/images/football-shirts/numbers/43.svg" />
                                                <span className="tm-txt">Crystal Palace vs West Ham</span>
                                                <img className="fixture-img-right" src="/images/football-shirts/numbers/31.svg" />
                                            </div>
                                            <br/>
                                        </div>
                                        <div className="gbx-name bg-blue">
                                            <span className="gm-txt">West Ham Fan</span>
                                        </div>
                                        <div className="gbx-people-pot text-center">
                                            <div className="capsle-people bg-white mon-txt"><img src="/images/people-30.svg" /> <span className="people-text">41</span></div>
                                            <div className="capsle-people bg-white mon-txt"><img src="/images/ticket-30.svg" /> <span className="people-text">&pound;20</span></div>
                                            <div className="capsle-people bg-white mon-txt"><img src="/images/pot-30.svg" /> <span className="people-text">&pound;2000</span></div>

                                        </div>
                                        <div className="gbx-kickoff-time bg-dark-blue smt-txt">
                                            TOMORROW 9PM
                                        </div>
                                       <div className="space-5"></div>
                                       <div className="col-lg-10 col-centered text-center"><button className="btn zoola-btn"><h5>View game</h5></button></div>
                                       <div className="space-5"></div>
                                  </div>
                                </div>

                        	</div>
                            <div className="space-10"></div>
                            <div className="row">
                            
                            	<div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 col-centered">
                                	<button className="btn zoola-btn"><div className="btn-txt">More</div></button>
                            	</div>
                            </div>
                            <div className="space-10"></div>
                    	</div>
                    </div>
            	</div>
        </div>
    
                </div>
        )
    }
});


//**********--- Last Meeting component ---**********
var Meeting= React.createClass({
    render: function () {
        return (
            <div>
           
           <div className="space-5"></div>
        <div className="row">           
            	<div className="panel panel-default">            	  
                	<div className="panel-heading">
                        <h1 className="panel-title">
                            <a className="accordion-toggle pointer-hand " data-toggle="collapse" data-parent="#accordion" href="#past-matches">
                                LAST MEETINGS
                            </a>
                        </h1>
                	</div>
                    <div id="past-matches" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="collapseOne">
                    	<div className="panel-body">
                        	<div className="space-5"></div>
                        	<div className="row">
                        	  
                            	<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                                	<div className="last-3-game">
                                    	<div className="last-3-game-left bg-light-blue">
											<img src="/images/football-shirts/numbers/357.svg" className="left-img" width="35"/>
                                            <div className="last3game-text">Germany</div>
                                    	</div>
                                        <div className="score-box1">2-1</div>
                                    	<div className="last-3-game-right bg-light-blue">
											<img src="/images/football-shirts/numbers/507.svg" className="left-img" width="35"/>
                                            <div className="last3game-text">Slovakia</div>
                                    	</div>
                                	</div>
                                    <div className="last-3-game">
                                    	<div className="last-3-game-left bg-light-blue">
											<img src="/images/football-shirts/numbers/357.svg" className="left-img" width="35"/>
                                            <div className="last3game-text">Germany</div>
                                    	</div>
                                        <div className="score-box1">2-1</div>
                                    	<div className="last-3-game-right bg-light-blue">
											<img src="/images/football-shirts/numbers/507.svg" className="left-img" width="35"/>
                                            <div className="last3game-text">Slovakia</div>
                                    	</div>
                                    </div>
                                    <div className="last-3-game">
                                    	<div className="last-3-game-left bg-light-blue">
											<img src="/images/football-shirts/numbers/357.svg" className="left-img" width="35"/>
                                            <div className="last3game-text">Germany</div>
                                    	</div>
                                        <div className="score-box1">2-1</div>
                                    	<div className="last-3-game-right bg-light-blue">
											<img src="/images/football-shirts/numbers/507.svg" className="left-img" width="35"/>
                                            <div className="last3game-text">Slovakia</div>
                                    	</div>
                                    </div>
                            	</div>
                                <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                                	<div className="last-3-game">
                                    	<div className="last-3-game-left bg-light-blue">
											<img src="/images/football-shirts/numbers/357.svg" className="left-img" width="35"/>
                                            <div className="last3game-text">Germany</div>
                                    	</div>
                                        <div className="score-box1">2-1</div>
                                    	<div className="last-3-game-right bg-light-blue">
											<img src="/images/football-shirts/numbers/507.svg" className="left-img" width="35"/>
                                            <div className="last3game-text">Slovakia</div>
                                    	</div>
                                	</div>
                                    <div className="last-3-game">
                                    	<div className="last-3-game-left bg-light-blue">
											<img src="/images/football-shirts/numbers/357.svg" className="left-img" width="35"/>
                                            <div className="last3game-text">Germany</div>
                                    	</div>
                                        <div className="score-box1">2-1</div>
                                    	<div className="last-3-game-right bg-light-blue">
											<img src="/images/football-shirts/numbers/507.svg" className="left-img" width="35"/>
                                            <div className="last3game-text">Slovakia</div>
                                    	</div>
                                    </div>
                                    <div className="last-3-game">
                                    	<div className="last-3-game-left bg-light-blue">
											<img src="/images/football-shirts/numbers/357.svg" className="left-img" width="35"/>
                                            <div className="last3game-text">Germany</div>
                                    	</div>
                                        <div className="score-box1">2-1</div>
                                    	<div className="last-3-game-right bg-light-blue">
											<img src="/images/football-shirts/numbers/507.svg" className="left-img" width="35"/>
                                            <div className="last3game-text">Slovakia</div>
                                    	</div>
                                    </div>
                                </div>
                        	</div>
                    	</div>
                    </div>
            	</div>
        </div>                                                
           
           </div>
        )
    }
});



//**********--- Last Matches component ---**********
var Matches= React.createClass({
    render: function () {
        return (
            <div>
         
                <div className="space-5"></div>
        <div className="row">
            
            <div className="panel panel-default">
              
                <div className="panel-heading">
                    <h1 className="panel-title">
                        <a className="accordion-toggle pointer-hand " data-toggle="collapse" data-parent="#accordion" href="#last-3matches">
                            LAST 3 MATCHES
                        </a>
                    </h1>
                </div>
                <div id="last-3matches" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="collapseOne">
                    <div className="panel-body">
                        <div className="space-5"></div>
                        <div className="row">
                         
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                                <div className="last-3-game">
                                    <div className="last-3-game-left bg-light-blue">
                                        <img src="/images/football-shirts/numbers/357.svg" className="left-img" width="35"/>
                                        <div className="last3game-text">Germany</div>
                                    </div>
                                    <div className="score-box1">2-1</div>
                                    <div className="last-3-game-right bg-light-blue">
                                        <img src="/images/football-shirts/numbers/507.svg" className="left-img" width="35"/>
                                        <div className="last3game-text">Slovakia</div>
                                    </div>
                                </div>
                                <div className="last-3-game">
                                    <div className="last-3-game-left bg-light-blue">
                                        <img src="/images/football-shirts/numbers/357.svg" className="left-img" width="35"/>
                                        <div className="last3game-text">Germany</div>
                                    </div>
                                    <div className="score-box1">2-1</div>
                                    <div className="last-3-game-right bg-light-blue">
                                        <img src="/images/football-shirts/numbers/507.svg" className="left-img" width="35"/>
                                        <div className="last3game-text">Slovakia</div>
                                    </div>
                                </div>
                                <div className="last-3-game">
                                    <div className="last-3-game-left bg-light-blue">
                                        <img src="/images/football-shirts/numbers/357.svg" className="left-img" width="35"/>
                                        <div className="last3game-text">Germany</div>
                                    </div>
                                    <div className="score-box1">2-1</div>
                                    <div className="last-3-game-right bg-light-blue">
                                        <img src="/images/football-shirts/numbers/507.svg" className="left-img" width="35"/>
                                        <div className="last3game-text">Slovakia</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>

                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center no-padding-left">
                            	<div className="hidden-xs"><div className="opta-vline"></div></div>
                                <div className="last-3-game">
                                    <div className="last-3-game-left bg-light-blue">
                                        <img src="/images/football-shirts/numbers/357.svg" className="left-img" width="35"/>
                                        <div className="last3game-text">Germany</div>
                                    </div>
                                    <div className="score-box1">2-1</div>
                                    <div className="last-3-game-right bg-light-blue">
                                        <img src="/images/football-shirts/numbers/507.svg" className="left-img" width="35"/>
                                        <div className="last3game-text">Slovakia</div>
                                    </div>
                                </div>
                                <div className="last-3-game">
                                    <div className="last-3-game-left bg-light-blue">
                                        <img src="/images/football-shirts/numbers/357.svg" className="left-img" width="35"/>
                                        <div className="last3game-text">Germany</div>
                                    </div>
                                    <div className="score-box1">2-1</div>
                                    <div className="last-3-game-right bg-light-blue">
                                        <img src="/images/football-shirts/numbers/507.svg" className="left-img" width="35"/>
                                        <div className="last3game-text">Slovakia</div>
                                    </div>
                                </div>
                                <div className="last-3-game">
                                    <div className="last-3-game-left bg-light-blue">
                                        <img src="/images/football-shirts/numbers/357.svg" className="left-img" width="35"/>
                                        <div className="last3game-text">Germany</div>
                                    </div>
                                    <div className="score-box1">2-1</div>
                                    <div className="last-3-game-right bg-light-blue">
                                        <img src="/images/football-shirts/numbers/507.svg" className="left-img" width="35"/>
                                        <div className="last3game-text">Slovakia</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
             
           </div>
        )
    }
});

//**********--- Attack component ---**********
var Attack= React.createClass({
    render: function () {
        return (
            <div>
          
                  <div className="space-5"></div>
        <div className="row">
           
            <div className="panel panel-default">
              
                <div className="panel-heading">
                    <h1 className="panel-title">
                        <a className="accordion-toggle pointer-hand " data-toggle="collapse" data-parent="#accordion" href="#match-stats-attack">
                            ATTACk
                        </a>
                    </h1>
                </div>
                <div id="match-stats-attack" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="collapseOne">
                    <div className="panel-body">
                        <div className="space-5"></div>
                        <div className="row">
                          
                            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-12 col-centered">
                            	<div className="zoola-box bg-dark-blue padding-15 text-center">
                                	<h3 className="blue no-margin">GOLAS</h3>
                            	</div>
                            </div>
                        </div>
                        <div className="row">
                          
                        	<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-right">
                            	<div className="space-10 hidden-xs"></div><div className="space-5 hidden-xs"></div>
                                <div className="leaderboard-team lb-home-team no-margin-right">
                                    <img src="/images/football-shirts/numbers/43.svg" />
                                    <span className="lb-team-name mon-txt">West Ham</span>
                                    <div className="sm-txt text-center games-played"><div className="d-block-m">(home)</div><div className="">32 games played</div></div>
                                </div>
                        	</div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center hidden-xs">
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/goals.svg" className="left-img" alt="" width="35" />
                                        <span>36</span>
                                    </div>
                                    <div className="comp-heading"> Goals scored</div>
                                    <div className="comp-right">
                                        <span>54</span>
                                        <img src="/images/opta-icons/goals.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/target.svg" className="left-img" alt="" width="35" />
                                        <span>141</span>
                                    </div>
                                    <div className="comp-heading"> On target</div>
                                    <div className="comp-right">
                                        <span>153</span>
                                        <img src="/images/opta-icons/target.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/offtarget.svg" className="left-img" alt="" width="35" />
                                        <span>183</span>
                                    </div>
                                    <div className="comp-heading">Off target</div>
                                    <div className="comp-right">
                                        <span>201</span>
                                        <img src="/images/opta-icons/offtarget.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/shot-ac.svg" className="left-img" alt="" width="35" />
                                        <span>43.5</span>
                                    </div>
                                    <div className="comp-heading"> Shot accuracy (%)</div>
                                    <div className="comp-right">
                                        <span>43.2</span>
                                        <img src="/images/opta-icons/shot-ac.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/conv-rate.svg" className="left-img" alt="" width="35" />
                                        <span>11.1</span>
                                    </div>
                                    <div className="comp-heading"> Conversion rate (%)</div>
                                    <div className="comp-right">
                                        <span>15.5</span>
                                        <img src="/images/opta-icons/conv-rate.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/assists.svg" className="left-img" alt="" width="35" />
                                        <span>201</span>
                                    </div>
                                    <div className="comp-heading">Assists</div>
                                    <div className="comp-right">
                                        <span>141</span>
                                        <img src="/images/opta-icons/assists.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>

                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-left">
                            	<div className="space-10 hidden-xs"></div><div className="space-5 hidden-xs"></div>
                                <div className="leaderboard-team lb-away-team no-margin-left">
                                    <img src="/images/football-shirts/numbers/31.svg" />
                                    <span className="lb-team-name mon-txt">Crystal Palace</span>
                                    <div className="sm-txt text-center games-played"><div className="d-block-m">(away)</div><div className="">45 games played</div></div>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                           
                        	<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center visible-xs">
                            	<div className="space-10"></div>
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/goals.svg" className="left-img" alt="" width="35" />
                                        <span>36</span>
                                    </div>
                                    <div className="comp-heading"> Goals scored</div>
                                    <div className="comp-right">
                                        <span>54</span>
                                        <img src="/images/opta-icons/goals.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/target.svg" className="left-img" alt="" width="35" />
                                        <span>141</span>
                                    </div>
                                    <div className="comp-heading"> On target</div>
                                    <div className="comp-right">
                                        <span>153</span>
                                        <img src="/images/opta-icons/target.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/offtarget.svg" className="left-img" alt="" width="35" />
                                        <span>183</span>
                                    </div>
                                    <div className="comp-heading">Off target</div>
                                    <div className="comp-right">
                                        <span>201</span>
                                        <img src="/images/opta-icons/offtarget.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/shot-ac.svg" className="left-img" alt="" width="35" />
                                        <span>43.5</span>
                                    </div>
                                    <div className="comp-heading"> Shot accuracy (%)</div>
                                    <div className="comp-right">
                                        <span>43.2</span>
                                        <img src="/images/opta-icons/shot-ac.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/conv-rate.svg" className="left-img" alt="" width="35" />
                                        <span>11.1</span>
                                    </div>
                                    <div className="comp-heading"> Conversion rate (%)</div>
                                    <div className="comp-right">
                                        <span>15.5</span>
                                        <img src="/images/opta-icons/conv-rate.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/assists.svg" className="left-img" alt="" width="35" />
                                        <span>201</span>
                                    </div>
                                    <div className="comp-heading">Assists</div>
                                    <div className="comp-right">
                                        <span>141</span>
                                        <img src="/images/opta-icons/assists.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                        	</div>
                        </div>
                        <div className="space-5"></div>
                        <div className="row">
                           
                            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-12 col-centered">
                            	<div className="zoola-box bg-dark-blue padding-15 text-center">
                                	<h3 className="blue no-margin">TOP SCORERS</h3>
                            	</div>
                            </div>
                        </div>
                         <div className="row no-margin">
                    	    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                                <div className="last-3-game">
                                    <img className="top-score-timg margin-right-10" width="40" src="/images/football-shirts/numbers/43.svg" />
                                    <div className="capsle-top-score"><span>20</span><img src="/images/profile-4.png" width="40" /></div>
                                    <div className="capsle-top-score-right bg-light-blue">
                                        <div className="top-score-text">Yohan Cabaye</div>
                                    </div>
                                </div>
                                <div className="last-3-game">
                                    <img className="top-score-timg margin-right-10" width="40" src="/images/football-shirts/numbers/43.svg" />
                                    <div className="capsle-top-score"><span>20</span><img src="/images/profile-4.png" width="40" /></div>
                                    <div className="capsle-top-score-right bg-light-blue">
                                        <div className="top-score-text">Yohan Cabaye</div>
                                    </div>
                                </div>
                                <div className="last-3-game">
                                    <img className="top-score-timg margin-right-10" width="40" src="/images/football-shirts/numbers/43.svg" />
                                    <div className="capsle-top-score"><span>20</span><img src="/images/profile-4.png" width="40" /></div>
                                    <div className="capsle-top-score-right bg-light-blue">
                                        <div className="top-score-text">Yohan Cabaye</div>
                                    </div>
                                </div>
                    	    </div>
                           <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>
                           <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center no-padding-left">
                           		<div className="hidden-xs"><div className="opta-vline"></div></div>
                                <div className="last-3-game">
                                    <div className="capsle-top-score-left bg-light-blue">
                                        <div className="top-score-text">Dimitri Payet</div>
                                    </div>
                                    <div className="capsle-top-score2"><img src="/images/profile-1.png" width="40" /><span>10</span></div>
                                    <img className="top-score-timg margin-left-10" width="40" src="/images/football-shirts/numbers/31.svg" />
                                </div>
                                <div className="last-3-game">
                                    <div className="capsle-top-score-left bg-light-blue">
                                        <div className="top-score-text">Dimitri Payet</div>
                                    </div>
                                    <div className="capsle-top-score2"><img src="/images/profile-1.png" width="40" /><span>10</span></div>
                                    <img className="top-score-timg margin-left-10" width="40" src="/images/football-shirts/numbers/31.svg" />
                                </div>
                                <div className="last-3-game">
                                    <div className="capsle-top-score-left bg-light-blue">
                                        <div className="top-score-text">Dimitri Payet</div>
                                    </div>
                                    <div className="capsle-top-score2"><img src="/images/profile-1.png" width="40" /><span>10</span></div>
                                    <img className="top-score-timg margin-left-10" width="40" src="/images/football-shirts/numbers/31.svg" />
                                </div>
                           </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>

                    
           </div>
        )
    }
});


//**********--- Defence component ---**********
var Defence= React.createClass({
    render: function () {
        return (
            <div>
         

               <div className="space-5"></div>
        <div className="row">
            
            <div className="panel panel-default">
            
                <div className="panel-heading">
                    <h1 className="panel-title">
                        <a className="accordion-toggle pointer-hand collapsed" data-toggle="collapse" data-parent="#accordion" href="#match-stats-defence">
                            DEFENCE
                        </a>
                    </h1>
                </div>
                <div id="match-stats-defence" className="panel-collapse collapse" role="tabpanel" aria-labelledby="collapseOne">
                    <div className="panel-body">
                        <div className="space-5"></div>
                        <div className="row">
                           
                            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-12 col-centered">
                            	<div className="zoola-box bg-dark-blue padding-15 text-center">
                                	<h3 className="blue no-margin">GOLAS</h3>
                            	</div>
                            </div>
                        </div>
                        <div className="row">
                      
                        	<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-right">
                            	<div className="space-10 hidden-xs"></div><div className="space-5 hidden-xs"></div>
                                <div className="leaderboard-team lb-home-team no-margin-right">
                                    <img src="/images/football-shirts/numbers/43.svg" />
                                    <span className="lb-team-name mon-txt">West Ham</span>
                                    <div className="sm-txt text-center games-played"><div className="d-block-m">(home)</div><div className="">32 games played</div></div>
                                </div>
                        	</div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center hidden-xs">
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/goalsC.svg" className="left-img" alt="" width="35" />
                                        <span>36</span>
                                    </div>
                                    <div className="comp-heading"> Goals scored</div>
                                    <div className="comp-right">
                                        <span>54</span>
                                        <img src="/images/opta-icons/goalsC.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/clean-sheet.svg" className="left-img" alt="" width="35" />
                                        <span>141</span>
                                    </div>
                                    <div className="comp-heading"> Clean sheets</div>
                                    <div className="comp-right">
                                        <span>153</span>
                                        <img src="/images/opta-icons/clean-sheet.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/shots-ontarget-faced.svg" className="left-img" alt="" width="35" />
                                        <span>183</span>
                                    </div>
                                    <div className="comp-heading">Shots faced on target</div>
                                    <div className="comp-right">
                                        <span>201</span>
                                        <img src="/images/opta-icons/shots-ontarget-faced.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/tackleW.svg" className="left-img" alt="" width="35" />
                                        <span>43.5</span>
                                    </div>
                                    <div className="comp-heading">Tackles won (%)</div>
                                    <div className="comp-right">
                                        <span>43.2</span>
                                        <img src="/images/opta-icons/tackleW.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/duel.svg" className="left-img" alt="" width="35" />
                                        <span>11.1</span>
                                    </div>
                                    <div className="comp-heading">Duel lost</div>
                                    <div className="comp-right">
                                        <span>15.5</span>
                                        <img src="/images/opta-icons/duel.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/saves.svg" className="left-img" alt="" width="35" />
                                        <span>201</span>
                                    </div>
                                    <div className="comp-heading">Goal keeper saves</div>
                                    <div className="comp-right">
                                        <span>141</span>
                                        <img src="/images/opta-icons/saves.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>

                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-left">
                            	<div className="space-10 hidden-xs"></div><div className="space-5 hidden-xs"></div>
                                <div className="leaderboard-team lb-away-team no-margin-left">
                                    <img src="/images/football-shirts/numbers/31.svg" />
                                    <span className="lb-team-name mon-txt">Crystal Palace</span>
                                    <div className="sm-txt text-center games-played"><div className="d-block-m">(away)</div><div className="">45 games played</div></div>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            
                        	<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center visible-xs">
                            	<div className="space-10"></div>
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/goalsC.svg" className="left-img" alt="" width="35" />
                                        <span>36</span>
                                    </div>
                                    <div className="comp-heading"> Goals scored</div>
                                    <div className="comp-right">
                                        <span>54</span>
                                        <img src="/images/opta-icons/goalsC.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/clean-sheet.svg" className="left-img" alt="" width="35" />
                                        <span>141</span>
                                    </div>
                                    <div className="comp-heading"> Clean sheets</div>
                                    <div className="comp-right">
                                        <span>153</span>
                                        <img src="/images/opta-icons/clean-sheet.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/shots-ontarget-faced.svg" className="left-img" alt="" width="35" />
                                        <span>183</span>
                                    </div>
                                    <div className="comp-heading">Shots faced on target</div>
                                    <div className="comp-right">
                                        <span>201</span>
                                        <img src="/images/opta-icons/shots-ontarget-faced.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/tackleW.svg" className="left-img" alt="" width="35" />
                                        <span>43.5</span>
                                    </div>
                                    <div className="comp-heading">Tackles won (%)</div>
                                    <div className="comp-right">
                                        <span>43.2</span>
                                        <img src="/images/opta-icons/tackleW.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/duel.svg" className="left-img" alt="" width="35" />
                                        <span>11.1</span>
                                    </div>
                                    <div className="comp-heading">Duel lost</div>
                                    <div className="comp-right">
                                        <span>15.5</span>
                                        <img src="/images/opta-icons/duel.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/saves.svg" className="left-img" alt="" width="35" />
                                        <span>201</span>
                                    </div>
                                    <div className="comp-heading">Goal keeper saves</div>
                                    <div className="comp-right">
                                        <span>141</span>
                                        <img src="/images/opta-icons/saves.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                        	</div>
                        </div>
                        <div className="space-5"></div>
                        <div className="row">
                          
                            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-12 col-centered">
                            	<div className="zoola-box bg-dark-blue padding-15 text-center">
                                	<h3 className="blue no-margin">TOP DEFENDERS</h3>
                            	</div>
                            </div>
                        </div>
                        <div className="row no-margin">
                    	    <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12 text-center no-padding-right">
                                <div className="last-3-game">
                                    <img src="/images/football-shirts/numbers/43.svg" alt="" className="top-score-timg margin-right-10" width="40" />
                                    <div className="capsle-top-score"><span>18</span><img src="/images/profile-4.png" width="40" /></div>
                                    <div className="capsle-top-score-right bg-light-blue">
                                        <div className="top-score-text">Yohan Cabaye</div>
                                    </div>
                                </div>
                    	    </div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center no-padding">
                                    <div className="top-defenders-text"> Keeper total saves</div>
                            </div>
                            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12 text-center no-padding-left">
                                <div className="last-3-game">
                                    <div className="capsle-top-score-left bg-light-blue">
                                        <div className="top-score-text">Dimitri Payet</div>
                                    </div>
                                    <div className="capsle-top-score text-left"><img src="images/profile-1.png" width="40" /><span>20</span></div>
                                    <img src="/images/football-shirts/numbers/31.svg" alt="" className="top-score-timg margin-left-10" width="40" />
                                </div>
                            </div>
                            <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>
                        </div>
                       <div className="row no-margin">
                    	    <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12 text-center no-padding-right">
                                <div className="last-3-game">
                                    <img src="/images/football-shirts/numbers/43.svg" alt="" className="top-score-timg margin-right-10" width="40" />
                                    <div className="capsle-top-score"><span>18</span><img src="/images/profile-4.png" width="40" /></div>
                                    <div className="capsle-top-score-right bg-light-blue">
                                        <div className="top-score-text">Yohan Cabaye</div>
                                    </div>
                                </div>
                    	    </div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center no-padding">
                                    <div className="top-defenders-text"> Keeper total saves</div>
                            </div>
                            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12 text-center no-padding-left">
                                <div className="last-3-game">
                                    <div className="capsle-top-score-left bg-light-blue">
                                        <div className="top-score-text">Dimitri Payet</div>
                                    </div>
                                    <div className="capsle-top-score text-left"><img src="/images/profile-1.png" width="40" /><span>20</span></div>
                                    <img src="/images/football-shirts/numbers/31.svg" alt="" className="top-score-timg margin-left-10" width="40" />
                                </div>
                            </div>
                            <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>
                       </div>
                       <div className="row no-margin">
                    	    <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12 text-center no-padding-right">
                                <div className="last-3-game">
                                    <img src="/images/football-shirts/numbers/43.svg" alt="" className="top-score-timg margin-right-10" width="40" />
                                    <div className="capsle-top-score"><span>18</span><img src="/images/profile-4.png" width="40" /></div>
                                    <div className="capsle-top-score-right bg-light-blue">
                                        <div className="top-score-text">Yohan Cabaye</div>
                                    </div>
                                </div>
                    	    </div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center no-padding">
                                    <div className="top-defenders-text"> Keeper total saves</div>
                            </div>
                            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12 text-center no-padding-left">
                                <div className="last-3-game">
                                    <div className="capsle-top-score-left bg-light-blue">
                                        <div className="top-score-text">Dimitri Payet</div>
                                    </div>
                                    <div className="capsle-top-score text-left"><img src="/images/profile-1.png" width="40" /><span>20</span></div>
                                    <img src="/images/football-shirts/numbers/31.svg" alt="" className="top-score-timg margin-left-10" width="40" />
                                </div>
                            </div>
                            <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>
                       </div>

                    </div>
                </div>
            </div>
        </div>

                     </div>
           
        )
    }
});

//**********---Discipline component ---**********
var Discipline= React.createClass({
    render: function () {
        return (
            <div>
         
                    <div className="space-5"></div>
        <div className="row">
            
            <div className="panel panel-default">
               
                <div className="panel-heading">
                    <h1 className="panel-title">
                        <a className="accordion-toggle pointer-hand collapsed" data-toggle="collapse" data-parent="#accordion" href="#match-stats-discipline">
                            DISCIPLINE
                        </a>
                    </h1>
                </div>
                <div id="match-stats-discipline" className="panel-collapse collapse" role="tabpanel" aria-labelledby="collapseOne">
                    <div className="panel-body">
                        <div className="space-5"></div>
                        <div className="row">
                           
                            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-12 col-centered">
                            	<div className="zoola-box bg-dark-blue padding-15 text-center">
                                	<h3 className="blue no-margin">GOLAS</h3>
                            	</div>
                            </div>
                        </div>
                        <div className="row">
                          
                        	<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-right">
                            	<div className="space-10 hidden-xs"></div><div className="space-5 hidden-xs"></div>
                                <div className="leaderboard-team lb-home-team no-margin-right">
                                    <img src="/images/football-shirts/numbers/43.svg" />
                                    <span className="lb-team-name mon-txt">West Ham</span>
                                    <div className="sm-txt text-center games-played"><div className="d-block-m">(home)</div><div className="">32 games played</div></div>
                                </div>
                        	</div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center hidden-xs">
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/foulW.svg" className="left-img" alt="" width="35" />
                                        <span>36</span>
                                    </div>
                                    <div className="comp-heading">Fouls won</div>
                                    <div className="comp-right">
                                        <span>54</span>
                                        <img src="/images/opta-icons/foulW.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/foulC.svg" className="left-img" alt="" width="35" />
                                        <span>141</span>
                                    </div>
                                    <div className="comp-heading">Fouls conceded</div>
                                    <div className="comp-right">
                                        <span>153</span>
                                        <img src="/images/opta-icons/foulC.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/card_y.svg" className="left-img" alt="" width="35" />
                                        <span>183</span>
                                    </div>
                                    <div className="comp-heading">Yellow cards</div>
                                    <div className="comp-right">
                                        <span>201</span>
                                        <img src="/images/opta-icons/card_y.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/card_r.svg" className="left-img" alt="" width="35" />
                                        <span>43.5</span>
                                    </div>
                                    <div className="comp-heading">Red cards</div>
                                    <div className="comp-right">
                                        <span>43.2</span>
                                        <img src="/images/opta-icons/card_r.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/offside.svg" className="left-img" alt="" width="35" />
                                        <span>11.1</span>
                                    </div>
                                    <div className="comp-heading">Offsides</div>
                                    <div className="comp-right">
                                        <span>15.5</span>
                                        <img src="/images/opta-icons/offside.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/saves.svg" className="left-img" alt="" width="35" />
                                        <span>201</span>
                                    </div>
                                    <div className="comp-heading">Goal keeper saves</div>
                                    <div className="comp-right">
                                        <span>141</span>
                                        <img src="/images/opta-icons/saves.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>

                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-left">
                            	<div className="space-10 hidden-xs"></div><div className="space-5 hidden-xs"></div>
                                <div className="leaderboard-team lb-away-team no-margin-left">
                                    <img src="/images/football-shirts/numbers/31.svg" />
                                    <span className="lb-team-name mon-txt">Crystal Palace</span>
                                    <div className="sm-txt text-center games-played"><div className="d-block-m">(away)</div><div className="">45 games played</div></div>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            
                        	<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center visible-xs">
                            	<div className="space-10"></div>
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/foulW.svg" className="left-img" alt="" width="35" />
                                        <span>36</span>
                                    </div>
                                    <div className="comp-heading">Fouls won</div>
                                    <div className="comp-right">
                                        <span>54</span>
                                        <img src="/images/opta-icons/foulW.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/foulC.svg" className="left-img" alt="" width="35" />
                                        <span>141</span>
                                    </div>
                                    <div className="comp-heading">Fouls conceded</div>
                                    <div className="comp-right">
                                        <span>153</span>
                                        <img src="/images/opta-icons/foulC.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/card_y.svg" className="left-img" alt="" width="35" />
                                        <span>183</span>
                                    </div>
                                    <div className="comp-heading">Yellow cards</div>
                                    <div className="comp-right">
                                        <span>201</span>
                                        <img src="/images/opta-icons/card_y.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/card_r.svg" className="left-img" alt="" width="35" />
                                        <span>43.5</span>
                                    </div>
                                    <div className="comp-heading">Red cards</div>
                                    <div className="comp-right">
                                        <span>43.2</span>
                                        <img src="/images/opta-icons/card_r.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/offside.svg" className="left-img" alt="" width="35" />
                                        <span>11.1</span>
                                    </div>
                                    <div className="comp-heading">Offsides</div>
                                    <div className="comp-right">
                                        <span>15.5</span>
                                        <img src="/images/opta-icons/offside.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/saves.svg" className="left-img" alt="" width="35" />
                                        <span>201</span>
                                    </div>
                                    <div className="comp-heading">Goal keeper saves</div>
                                    <div className="comp-right">
                                        <span>141</span>
                                        <img src="/images/opta-icons/saves.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                        	</div>
                        </div>
                        <div className="space-5"></div>
                        <div className="row">
                           
                            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-12 col-centered">
                            	<div className="zoola-box bg-dark-blue padding-15 text-center">
                                	<h3 className="blue no-margin">TOP CARDED</h3>
                            	</div>
                            </div>
                        </div>
                        <div className="row no-margin">
                    	    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                                <div className="last-3-game">
                                    <img className="top-score-timg margin-right-10" width="40" src="/images/football-shirts/numbers/43.svg" />
                                    <div className="capsle-top-score"><span>20</span><img src="/images/profile-4.png" width="40" /></div>
                                    <div className="capsle-top-score-right bg-light-blue">
                                        <div className="top-score-text">Yohan Cabaye</div>
                                    </div>
                                </div>
                                <div className="last-3-game">
                                    <img className="top-score-timg margin-right-10" width="40" src="/images/football-shirts/numbers/43.svg" />
                                    <div className="capsle-top-score"><span>20</span><img src="/images/profile-4.png" width="40" /></div>
                                    <div className="capsle-top-score-right bg-light-blue">
                                        <div className="top-score-text">Yohan Cabaye</div>
                                    </div>
                                </div>
                                <div className="last-3-game">
                                    <img className="top-score-timg margin-right-10" width="40" src="/images/football-shirts/numbers/43.svg" />
                                    <div className="capsle-top-score"><span>20</span><img src="/images/profile-4.png" width="40" /></div>
                                    <div className="capsle-top-score-right bg-light-blue">
                                        <div className="top-score-text">Yohan Cabaye</div>
                                    </div>
                                </div>
                    	    </div>
                           <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>
                           <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center no-padding-left">
                           		<div className="hidden-xs"><div className="opta-vline"></div></div>
                                <div className="last-3-game">
                                    <div className="capsle-top-score-left bg-light-blue">
                                        <div className="top-score-text">Dimitri Payet</div>
                                    </div>
                                    <div className="capsle-top-score2"><img src="/images/profile-1.png" width="40" /><span>10</span></div>
                                    <img className="top-score-timg margin-left-10" width="40" src="/images/football-shirts/numbers/31.svg" />
                                </div>
                                <div className="last-3-game">
                                    <div className="capsle-top-score-left bg-light-blue">
                                        <div className="top-score-text">Dimitri Payet</div>
                                    </div>
                                    <div className="capsle-top-score2"><img src="/images/profile-1.png" width="40" /><span>10</span></div>
                                    <img className="top-score-timg margin-left-10" width="40" src="/images/football-shirts/numbers/31.svg" />
                                </div>
                                <div className="last-3-game">
                                    <div className="capsle-top-score-left bg-light-blue">
                                        <div className="top-score-text">Dimitri Payet</div>
                                    </div>
                                    <div className="capsle-top-score2"><img src="/images/profile-1.png" width="40" /><span>10</span></div>
                                    <img className="top-score-timg margin-left-10" width="40" src="/images/football-shirts/numbers/31.svg" />
                                </div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>          
            </div>
          
        )
    }
});

//**********---Deadball component ---**********
    var Deadball= React.createClass({
        render: function () {
            return (
                <div>
          
            
            <div className="space-5"></div>
        <div className="row">
          
            <div className="panel panel-default">
               
                <div className="panel-heading">
                    <h1 className="panel-title">
                        <a className="accordion-toggle pointer-hand collapsed" data-toggle="collapse" data-parent="#accordion" href="#match-stats-deadball">
                            DEAD BALL
                        </a>
                    </h1>
                </div>
                <div id="match-stats-deadball" className="panel-collapse collapse" role="tabpanel" aria-labelledby="collapseOne">
                    <div className="panel-body">
                        <div className="space-5"></div>
                        <div className="row">
                          
                            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-12 col-centered">
                            	<div className="zoola-box bg-dark-blue padding-15 text-center">
                                	<h3 className="blue no-margin">GOLAS</h3>
                            	</div>
                            </div>
                        </div>
                        <div className="row">
                        
                        	<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-right">
                            	<div className="space-10 hidden-xs"></div><div className="space-5 hidden-xs"></div>
                                <div className="leaderboard-team lb-home-team no-margin-right">
                                    <img src="/images/football-shirts/numbers/43.svg" />
                                    <span className="lb-team-name mon-txt">West Ham</span>
                                    <div className="sm-txt text-center games-played"><div className="d-block-m">(home)</div><div className="">32 games played</div></div>
                                </div>
                        	</div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center hidden-xs">
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/corner.svg" className="left-img" alt="" width="35" />
                                        <span>36</span>
                                    </div>
                                    <div className="comp-heading">Corners</div>
                                    <div className="comp-right">
                                        <span>54</span>
                                        <img src="/images/opta-icons/corner.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/throw-in.svg" className="left-img" alt="" width="35" />
                                        <span>141</span>
                                    </div>
                                    <div className="comp-heading">Throw-ins</div>
                                    <div className="comp-right">
                                        <span>153</span>
                                        <img src="/images/opta-icons/throw-in.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/cornerC.svg" className="left-img" alt="" width="35" />
                                        <span>183</span>
                                    </div>
                                    <div className="comp-heading">Corners conceded</div>
                                    <div className="comp-right">
                                        <span>201</span>
                                        <img src="/images/opta-icons/cornerC.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/throw-inC.svg" className="left-img" alt="" width="35" />
                                        <span>43.5</span>
                                    </div>
                                    <div className="comp-heading">Throw-ins conceded</div>
                                    <div className="comp-right">
                                        <span>43.2</span>
                                        <img src="/images/opta-icons/throw-inC.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/crossac.svg" className="left-img" alt="" width="35" />
                                        <span>11.1</span>
                                    </div>
                                    <div className="comp-heading">Cross accuracy (%)</div>
                                    <div className="comp-right">
                                        <span>15.5</span>
                                        <img src="/images/opta-icons/crossac.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/pass.svg" className="left-img" alt="" width="35" />
                                        <span>201</span>
                                    </div>
                                    <div className="comp-heading">Pass accuracy (%)</div>
                                    <div className="comp-right">
                                        <span>141</span>
                                        <img src="/images/opta-icons/pass.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>

                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-left">
                            	<div className="space-10 hidden-xs"></div><div className="space-5 hidden-xs"></div>
                                <div className="leaderboard-team lb-away-team no-margin-left">
                                    <img src="/images/football-shirts/numbers/31.svg" />
                                    <span className="lb-team-name mon-txt">Crystal Palace</span>
                                    <div className="sm-txt text-center games-played"><div className="d-block-m">(away)</div><div className="">45 games played</div></div>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                           
                        	<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center visible-xs">
                            	<div className="space-10"></div>
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/corner.svg" className="left-img" alt="" width="35" />
                                        <span>36</span>
                                    </div>
                                    <div className="comp-heading">Corners</div>
                                    <div className="comp-right">
                                        <span>54</span>
                                        <img src="/images/opta-icons/corner.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="images/opta-icons/throw-in.svg" className="left-img" alt="" width="35" />
                                        <span>141</span>
                                    </div>
                                    <div className="comp-heading">Throw-ins</div>
                                    <div className="comp-right">
                                        <span>153</span>
                                        <img src="/images/opta-icons/throw-in.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/cornerC.svg" className="left-img" alt="" width="35" />
                                        <span>183</span>
                                    </div>
                                    <div className="comp-heading">Corners conceded</div>
                                    <div className="comp-right">
                                        <span>201</span>
                                        <img src="/images/opta-icons/cornerC.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/throw-inC.svg" className="left-img" alt="" width="35" />
                                        <span>43.5</span>
                                    </div>
                                    <div className="comp-heading">Throw-ins conceded</div>
                                    <div className="comp-right">
                                        <span>43.2</span>
                                        <img src="/images/opta-icons/throw-inC.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-light-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/crossac.svg" className="left-img" alt="" width="35" />
                                        <span>11.1</span>
                                    </div>
                                    <div className="comp-heading">Cross accuracy (%)</div>
                                    <div className="comp-right">
                                        <span>15.5</span>
                                        <img src="/images/opta-icons/crossac.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                                <div className="comparison bg-dark-blue">
                                    <div className="comp-left">
                                        <img src="/images/opta-icons/pass.svg" className="left-img" alt="" width="35" />
                                        <span>201</span>
                                    </div>
                                    <div className="comp-heading">Pass accuracy (%)</div>
                                    <div className="comp-right">
                                        <span>141</span>
                                        <img src="/images/opta-icons/pass.svg" className="right-img" alt="" width="35" />
                                    </div>
                                </div>
                        	</div>
                        </div>
                        <div className="space-5"></div>
                    </div>
                </div>
            </div>
        </div>

        <div className="space-10"></div>   
           </div>
          
            )
        }
    });