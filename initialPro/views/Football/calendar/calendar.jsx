/** @jsx React.DOM */
//**********--- call getCookie function to read cookie---**********
getCookie()


if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}

//**********--- Subheader component ---**********
var Head = React.createClass({
    render: function () {
        return (
            <div>
               <div className="container-fluid header">
                  <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                               <h3>CALENDER</h3>
                            </div>
                        </div>
                  </div>
               </div>
         <div className="space-5"></div>        
        </div>           
        )
    }
});



//**********--- Calendar component ---**********
var Calendar= React.createClass({
    render: function () {
        return (
                    <div>
                        <div className="container">                          
                    <div className="space-5"></div>
               <div className="row">

            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pz-calendar">
                <ul id="myTab" className="nav nav-tabs zoola-tabs">
                    <li className="active"><a data-toggle="tab" data-target="#p-league">PREMIER LEAGUE</a></li>
                    <li><a data-toggle="tab" data-target="#championship">CHAMPIONSHIP</a></li>
                </ul>
                <div className="tab-content zoola-tab-content">
                    <div id="p-league" className="tab-pane active bg-none">
                        <div className="row">
                        	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                           		<div className="kickoff underline">&lt;&lt;PREVIOUS RESULTS</div>
                        	 </div>
                        </div>
                        <div className="space-5"></div>
                        <div className="row">
                        	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                           		<div className="pz-calendar-date">4 August 2016</div>
                        	 </div>
                        </div>
                        <div className="row">

                            	<div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 text-center">
                                  <div className="game-box margin-top-15">
                                        <div className="game-box-top">
                                            <div className="row"><div className="score-box-stats">2 - 0</div></div>
                                            <div className="game-selection-fixture">
                                                <img className="fixture-img-left" src="/images/football-shirts/numbers/357.svg"/>
                                                <span className="tm-txt">Crystal Palace vs Southampton</span>
                                                <img className="fixture-img-right" src="/images/football-shirts/numbers/117.svg"/>
                                            </div>
                                            <br/>
                                        </div>
                                        <div className="gbx-kickoff-time bg-dark-blue smt-txt">
                                            TOMORROW 9PM
                                        </div>
                                        <div className="space-5"></div>
                                  </div>
                            	</div>

                               <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 text-center">
                                  <div className="game-box margin-top-15">
                                        <div className="game-box-top">
                                            <div className="row"><div className="score-box-stats">2 - 0</div></div>
                                            <div className="game-selection-fixture">
                                                <img className="fixture-img-left" src="/images/football-shirts/numbers/357.svg"/>
                                                <span className="tm-txt">Crystal Palace vs Southampton</span>
                                                <img className="fixture-img-right" src="/images/football-shirts/numbers/117.svg"/>
                                            </div>
                                            <br/>
                                        </div>
                                        <div className="gbx-kickoff-time bg-dark-blue smt-txt">
                                            TOMORROW 9PM
                                        </div>
                                        <div className="space-5"></div>
                                  </div>
                               </div>

                               <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 text-center">
                                  <div className="game-box margin-top-15">
                                        <div className="game-box-top">
                                            <div className="row"><div className="score-box-stats">2 - 0</div></div>
                                            <div className="game-selection-fixture">
                                                <img className="fixture-img-left" src="/images/football-shirts/numbers/357.svg"/>
                                                <span className="tm-txt">Crystal Palace vs Southampton</span>
                                                <img className="fixture-img-right" src="/images/football-shirts/numbers/117.svg"/>
                                            </div>
                                            <br/>
                                        </div>
                                        <div className="gbx-kickoff-time bg-dark-blue smt-txt">
                                            TOMORROW 9PM
                                        </div>
                                        <div className="space-5"></div>
                                  </div>
                               </div>
                        </div>


                        <div className="space-10"></div>
                        <div className="row">
                        	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                           		<div className="pz-calendar-date">6 August 2016</div>
                        	 </div>
                        </div>
                        <div className="row">

                            	<div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 text-center">
                                  <div className="game-box margin-top-15">
                                        <div className="game-box-top">
                                            <div className="row"><div className="score-box-stats">2 - 0</div></div>
                                            <div className="game-selection-fixture">
                                                <img className="fixture-img-left" src="/images/football-shirts/numbers/357.svg"/>
                                                <span className="tm-txt">Crystal Palace vs Southampton</span>
                                                <img className="fixture-img-right" src="/images/football-shirts/numbers/117.svg"/>
                                            </div>
                                            <br/>
                                        </div>
                                        <div className="gbx-kickoff-time bg-dark-blue smt-txt">
                                            TOMORROW 9PM
                                        </div>
                                        <div className="space-5"></div>
                                  </div>
                            	</div>

                               <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 text-center">
                                  <div className="game-box margin-top-15">
                                        <div className="game-box-top">
                                            <div className="row"><div className="score-box-stats">2 - 0</div></div>
                                            <div className="game-selection-fixture">
                                                <img className="fixture-img-left" src="/images/football-shirts/numbers/357.svg"/>
                                                <span className="tm-txt">Crystal Palace vs Southampton</span>
                                                <img className="fixture-img-right" src="/images/football-shirts/numbers/117.svg"/>
                                            </div>
                                            <br/>
                                        </div>
                                        <div className="gbx-kickoff-time bg-dark-blue smt-txt">
                                            TOMORROW 9PM
                                        </div>
                                        <div className="space-5"></div>
                                  </div>
                               </div>
                        </div>


                        <div className="space-10"></div>
                        <div className="row">
                        	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                           		<div className="pz-calendar-date">4 August 2016</div>
                        	 </div>
                        </div>
                        <div className="row">

                            	<div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 text-center">
                                  <div className="game-box margin-top-15">
                                        <div className="game-box-top">
                                            <br/>
                                            <div className="game-selection-fixture">
                                                <img className="fixture-img-left" src="/images/football-shirts/numbers/357.svg"/>
                                                <span className="tm-txt">Crystal Palace vs Southampton</span>
                                                <img className="fixture-img-right" src="/images/football-shirts/numbers/117.svg"/>
                                            </div>
                                            <br/>
                                        </div>
                                        <div className="gbx-kickoff-time bg-dark-blue smt-txt">
                                            TOMORROW 9PM
                                        </div>
                                        <div className="space-5"></div>
                                  </div>
                            	</div>

                               <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 text-center">
                                  <div className="game-box margin-top-15">
                                        <div className="game-box-top">
                                            <br/>
                                            <div className="game-selection-fixture">
                                                <img className="fixture-img-left" src="/images/football-shirts/numbers/357.svg"/>
                                                <span className="tm-txt">Crystal Palace vs Southampton</span>
                                                <img className="fixture-img-right" src="/images/football-shirts/numbers/117.svg"/>
                                            </div>
                                            <br/>
                                        </div>
                                        <div className="gbx-kickoff-time bg-dark-blue smt-txt">
                                            TOMORROW 9PM
                                        </div>
                                        <div className="space-5"></div>
                                  </div>
                               </div>

                               <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 text-center">
                                  <div className="game-box margin-top-15">
                                        <div className="game-box-top">
                                            <br/>
                                            <div className="game-selection-fixture">
                                                <img className="fixture-img-left" src="/images/football-shirts/numbers/357.svg"/>
                                                <span className="tm-txt">Crystal Palace vs Southampton</span>
                                                <img className="fixture-img-right" src="/images/football-shirts/numbers/117.svg"/>
                                            </div>
                                            <br/>
                                        </div>
                                        <div className="gbx-kickoff-time bg-dark-blue smt-txt">
                                            TOMORROW 9PM
                                        </div>
                                        <div className="space-5"></div>
                                  </div>
                               </div>
                        </div>


                    </div>
                    <div id="championship" className="tab-pane bg-none">
                        <div className="space-5"></div>
                        <div className="row">

                        </div>
                    </div>
                </div>
            </div>
               </div>

        <div className="space-5"></div>

        <div className="space-5"></div>

        <div className="space-5"></div>
                        </div> 
          </div> 
         
        )
    }
});
