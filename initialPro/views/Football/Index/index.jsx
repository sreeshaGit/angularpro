/** @jsx React.DOM */

var is_loggedIn = false;

if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
    //ticketCount =1;
    getCookie()
}
else {
    is_loggedIn = false;
    //getCookieForNonAuth()
}
//**********--- Index component ---**********
var Index = React.createClass({
    componentDidMount: function () {
        var self = this;

        $('#myCarousel').carousel({
          interval: 7000
        });

        var self = this;
        $(".carousel").swiperight(function () {
            $(this).carousel('prev');
        });
        $(".carousel").swipeleft(function () {
            $(this).carousel('next');
        });
    },
    handleSubmit: function () {     //**********--- Function to navigate to Signup page---**********
        // window.location = "/build/views/Football/GameSelection/gameSelection.html?islog=" + is_loggedIn
        window.location = "/gameselection/?islog=" + is_loggedIn
    },
    render: function () {
        return ( <div id="content">
                        <div className="container content no-padding">
                            <div className="row star-texture">
                                <div className="space-10"></div>
                                <h1 className="blue text-center">How it works:</h1>
                                <div className="space-5"></div>
                                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 text-center no-padding">
                                    <div className="index-box">
                                        <div className="game-box-top">
                                            <div className="yellow-header text-center"><h3>1. Pick a game</h3></div>
                                            <div className="index-selection-fixture text-center bg-white tm-txt">
                                                <span>Match: Team A vs Team B</span>
                                            </div>
                                        </div>
                                        <div className="text-center"> <h2 className="blue-txt">Zoola game</h2></div>
                                        <div className="text-center">
                                            <div className="capsle-people bg-white players"><img src="/images/people-30.svg" /><span className="people-text">players</span></div>
                                            <div className="capsle-people bg-white"><img src="/images/ticket-30.svg" /><span className="people-text">fee</span></div>
                                            <div className="capsle-people bg-white"><img src="/images/pot-30.svg" /><span className="people-text">pot</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 text-center no-padding">
                                    <div className="index-box">
                                        <div className="game-box-top">
                                            <div className="yellow-header text-center"><h3>2. Make your choice</h3></div>
                                            {/*<div className="question-txt text-center padding-10">
                                                <div className="number">1</div>                                       
                                                <div className="game-name">Will there be a card?</div>
                                                <div className="bg-dark-blue answer">?</div>
                                            </div>
                                        
                                            <div className="question-txt text-center padding-10">
                                                <div className="number">2</div>                                        
                                                <div className="game-name">In what minute will the 1st corner take place?</div>
                                                <div className="bg-dark-blue answer">?</div>
                                            </div>*/}
                                            <div className="space-5"></div>
                                            <div className="row no-margin">
                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                                                    <span className="number margin-top-5">1</span>
                                                </div>
                                                <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 text-left no-padding">
                                                    <span className="game-question">Will there be a card?</span>
                                                </div>
                                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center margin-top-5 no-padding-left">
                                                    <div className="bg-dark-blue answer">?</div>
                                                </div>
                                            </div>
                                            <div className="space-5"></div>
                                            <div className="row no-margin">
                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                                                    <span className="number margin-top-10">2</span>
                                                </div>
                                                <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 text-left no-padding">
                                                    <span className="game-question no-padding-top">In what minute will the 1st corner take place?</span>
                                                </div>
                                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center margin-top-5 no-padding-left">
                                                    <div className="bg-dark-blue answer">?</div>
                                                </div>
                                            </div>
                                        </div>                               
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 text-center no-padding">
                                    <div className="index-box">
                                        <div className="game-box-top">
                                            <div className="yellow-header text-center"><h3>3. Win from the pot</h3></div>
                                            <div className="text-center">
                                            <div className="capsle-people bg-white"><img src="/images/pot-30.svg" /><span className="people-text"> £150</span></div>
                                            </div>
                                            <div className="bird-cool">
                                                <div className="text"><img width="90" src="/images/bird-cool.png" /></div>
                                                <div className="speech"><img src="/images/sbubble.svg" /><span className="people-text">You came 2nd and won £35</span></div>
                                            </div>
                                        </div>                               
                                    </div>
                                </div>
                                
                            </div>
                  
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 col-centered">
                                    
                                    <div className="space-10"></div>
                                    {this.props.isLog?<button className="btn zoola-btn" onClick={this.handleSubmit}><div className="btn-txt">View zoola games</div></button>:<div><button className="btn zoola-btn" data-toggle="modal" data-target="#signup-with-email"><div className="btn-txt">Sign up</div></button>
                                    <div className="space-10"></div>
                                    <p className="underline text-center" onClick={this.handleSubmit}>or view zoola games</p></div>}
                                </div> 
                            </div>

                            <div className="space-10"></div>
                            
                        </div>
                        
                        <div className="container-fluid no-padding dark-grey-bg">
                            <div className="container">
                                <div className="space-10"></div>
                                <div className="row">
                                    <div className="col-lg-12 text-center">
                                        <div className="col-sm-3 col-sm-offset-1">
                                            <img src="/images/stats-shot.png" />
                                        </div>
                                        <div className="col-sm-7 col-sm-offset-1">
                                            <div className="space-10"></div>
                                            <div className="text-center">
                                                <h2>Unique games</h2>
                                                <p className="context-para">Each zoola game is hand-crafted by football experts to be fun, social and easy to play.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-10"></div>
                            </div>
                        </div>
                        <div className="container-fluid light-grey-dark no-padding">
                            <div className="container">
                                <div className="space-10"></div>
                                <div className="row ">
                                    <div className="col-lg-12 text-center">
                                        <div className="col-sm-7 col-sm-offset-1">
                                            <div className="space-10"></div>
                                            <div className="text-center">
                                                <h2>Challenge everyone or just your mates</h2>
                                                <p className="context-para">Take on the world with zoola games that anyone can join or keep it to only those you invite.</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-3 col-sm-offset-1">
                                            <img src="/images/custom-shot.png" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-10"></div>
                            </div>
                        </div>
                        <div className="container-fluid dark-grey-bg no-padding">
                            <div className="container">
                                <div className="space-10"></div>
                                <div className="row">
                                    <div className="col-lg-12 text-center">
                                        <div className="col-sm-3 col-sm-offset-1">
                                            <img src="/images/create-shot.png" />
                                        </div>
                                        <div className="col-sm-7 col-sm-offset-1">
                                            <div className="space-10"></div>
                                            <div className="text-center">
                                                <h2>Everything you need to win</h2>
                                                <p className="context-para">Get up-to-the-second Opta stats as you play so you’re always making an informed decision.</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-10"></div>
                            </div>
                       </div>
             </div>
            )
          }
      });