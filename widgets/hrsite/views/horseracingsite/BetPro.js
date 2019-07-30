var React = require('react');
var $ = require("jquery");
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
var Popover = require('react-bootstrap/lib/Popover');
var Overlay = require('react-bootstrap/lib/Overlay');
var Carousel = require('react-bootstrap/lib/Carousel');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');
var Dropdown = require('react-bootstrap/lib/Dropdown');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');

var Odds = require('./Odds.js');
var Footer = require('./Footer.js');
module.exports = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            trebledata:[],
            treble3bets: [],
            treble3betsid: [],
            tipped3bets: [],
            tipped3betsid: [],
            activeInd: 0,
            addtobet: true,
           
        };
    },   
    componentDidMount: function () {      
        var self = this;              
        var corsuelSec = 0;
        if( this.props.parentThis.state.data.length>2 && this.props.parentThis.state.trebledata.length>2){   
            setInterval(function () {
                if (self.state.isMouseHover) {

                    corsuelSec = 0
                }
                else {
                    corsuelSec = corsuelSec + 1;
                }
                if (corsuelSec == 30) {
                    if (self.props.parentThis.state.activeInd==0) {
                        self.props.parentThis.setState({ activeInd: 1 })
                    }
                    else {
                        self.props.parentThis.setState({ activeInd: 0 })
                    }
                    corsuelSec = 0
                }

            }, 1000)
        }
    },
    changeMouseEnter: function () {       
        this.setState({ isMouseHover: true })
    },
    changeMouseOut: function () {       
        this.setState({ isMouseHover: false })
    },

    addbetformosttipped: function (ind, id) {          
        var addToBetslip = "https://sports.betway.com/outcomes/{0}/#/horse-racing/uk-and-ireland";
        addToBetslip = addToBetslip.replace("{0}", id)
        var horseracingbetsdata = this.props.parentThis.state.data;
        var tipped3bets = this.props.parentThis.state.tipped3bets;
        var changeIndex = -1;
        horseracingbetsdata.filter(function (item, index) {
            if (item.SelectionId == id) {
                changeIndex = index;
            }
        })
        if (tipped3bets[ind]['isaddedbet']) {
            tipped3bets[ind]['isaddedbet'] = false;
            horseracingbetsdata[changeIndex]['isaddedbet'] = false;
        }
        else {
            tipped3bets[ind]['isaddedbet'] = true;
            horseracingbetsdata[changeIndex]['isaddedbet'] = true;
              //window.open(addToBetslip, "mylink")
           
        }

        this.setState({ data: horseracingbetsdata, tipped3bets: tipped3bets })
    
    },
    addtreblebet: function (ind, id) {          
        var treblebetsdata = this.props.parentThis.state.trebledata;
        var treble3bets = this.props.parentThis.state.treble3bets;
        var addToBetslip = "https://sports.betway.com/outcomes/{0}/#/horse-racing/uk-and-ireland";
        addToBetslip = addToBetslip.replace("{0}", id)      
        var changeIndex = -1;
        treblebetsdata.filter(function (item, index) {
            if (item.SelectionId == id) {
                changeIndex = index;
            }
        })    
        if (treble3bets[ind]['isaddedbet']) {
            treble3bets[ind]['isaddedbet'] = false;
            treblebetsdata[changeIndex]['isaddedbet'] = false;
        } else {
            treble3bets[ind]['isaddedbet'] = true;
            treblebetsdata[changeIndex]['isaddedbet'] = true;
          //  window.open(addToBetslip, "mylink")
        }
        this.setState({ treblebets: treblebetsdata, treble3bets: treble3bets })  
    },

    render: function () {
        
        var self = this;   
        return (

        <div>
          <div className="bw-content">
            <div id="" className="blbw-carousel" onMouseOver={this.changeMouseEnter} onMouseOut={this.changeMouseOut}>{/*   <!-- slider -->*/}
               <Carousel control={true} activeIndex={this.props.parentThis.state.activeInd} indicators={false} pauseOnHover={true}  onSlideEnd={this.slideEnd}>
				
                    {this.props.parentThis.state.treble3bets.length?<Carousel.Item>
                        <div className="">{/*<!-- item 1 -->*/}
                            <div className="blbw-top-bets animated fadeIn timeform-treble">
                                {

                                    this.props.parentThis.state.treble3bets.map(function (item, index) {
                                        var trebleurl = item.SilkImageURL;
                                        var Trainer = item.TrainerName;
                                        var Jockey = item.JockeyName;
                                        var star = item.StarRating;
                                        var name = "Trainer / Jockey";
                                        return   <div className="row blbw-top-market horse-racing bg-white blbw-height-55">
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                                <div className="blbw-jersey">
                                                    <img src={"http://content-cache.betfair.com/feeds_images/Horses/SilkColours/" + trebleurl} alt="" />
                                                </div>
                                            </div>
                                           <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                                    <OverlayTrigger trigger={['hover', 'focus' ]}
                                        placement={index==0?"bottom":"top"}
                                        ref='pop'
                                        overlay={
                                        <Popover id="popover-trainer">
                                            <div>Trainer/Jockey</div><div>{item.TrainerName + " / " + item.JockeyName }</div>
                                        </Popover>
                                                                    }
                                            >
                                              <div className="blbw-match">{item.HorseNameNoSuffix}
                                                <div className="blbw-hr-time">{item.RaceTime + " " + item.CourseName}</div>
                              </div>
                        </OverlayTrigger>
               </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                    <OverlayTrigger trigger={['hover', 'focus' ]}
                                        placement={index==0?"bottom":"top"}
                                        ref='pop'
                                        overlay={
                                                <Popover id="popover-horsedesc">
                                                    <div>{item.Comments}</div>
                                                </Popover>
                                        }
                            >
                        <div className="blbw-rating">                                      
                            {(function (que, num) {
                                for (var i = 1; i <= num;i++)
                                {
                                                
                                    que.push(
                                        <i className="fa fa-star star-yellow" aria-hidden="true"></i>)
                                }
                                for (var i = 1; i <= 5-num;i++)
                                {                                                
                                    que.push(
                                        <i className="fa fa-star" aria-hidden="true"></i>)
                                }
                                return que
                            })([], item.StarRating)}
                                            </div>
                                    
                                   
                                           </OverlayTrigger>
                                     
                                        </div>
                                    <Odds odds={item.FractionalOdds} isaddedbet={item.isaddedbet}  addbet={self.addtreblebet} ind={index} SelectionId={item.SelectionId}/>

                                    </div>
                           
    })
}

                        </div>

<div id="footer">
        <Footer fid="Treble" oddsdata={ this.props.parentThis.state.treble3bets} />
</div>
</div>{/*<!-- end item -->*/}
</Carousel.Item>:''}
{this.props.parentThis.state.tipped3bets.length?  <Carousel.Item>
     <div className="">{/*<!-- item 2 -->*/}
         <div className="blbw-top-bets animated fadeIn topbets">
             {
                            
                 this.props.parentThis.state.tipped3bets.map(function (item, index) {
                     var url = item.SilkImageURL;

                     return <div className="row blbw-top-market horse-racing bg-white blbw-height-55">
                                 <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                     <div className="blbw-jersey">
                                         <img src={"http://content-cache.betfair.com/feeds_images/Horses/SilkColours/" + url} alt="" />
                                         <OverlayTrigger trigger={[ 'click']}
                     placement={index==0?"bottom":"top"}
                     ref='pop'
                     overlay={
                     <Popover id="popover-newspaper">
                         <div>{item.Tips }</div>
                     </Popover>
                     }
                >

 <div className="badge blbw-badge tips" data-placement="top-right" >{item.TipsCount}</div>
                 </OverlayTrigger>


 </div>
</div>
<div className="col-lg-5 col-md-5 col-sm-5 col-xs-5">

                <OverlayTrigger trigger={['hover', 'focus' ]}
                     placement={index==0?"bottom":"top"}
                     ref='pop'
                     overlay={
                     <Popover id="popover-trainer">
                         <div>Trainer/Jockey</div><div>{item.TrainerName + " / " + item.JockeyName }</div>
                     </Popover>
                                                                    }
                                            id="trainer">
                                              <div className="blbw-match">{item.HorseNameNoSuffix}
                             <div className="blbw-hr-time">{item.RaceTime + " " + item.CourseName}</div>
           </div>
     </OverlayTrigger>

</div>
<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
            <OverlayTrigger trigger={['hover', 'focus' ]}
                     placement={index==0?"bottom":"top"}
                     ref='pop'
                     overlay={
                        <Popover id="popover-horsedesc">
                            <div>{item.Comments}</div>
                        </Popover>
                     }
                >
                <div className="blbw-rating" data-placement="top-left" >
                                                
                    {(function (que, num) {
                        for (var i = 1; i <= num;i++)
                        {
                            que.push(
                            <i className="fa fa-star star-yellow" aria-hidden="true"></i>)
                        }
                        for (var i = 1; i <= 5-num;i++)
                        {
                            que.push(
                            <i className="fa fa-star" aria-hidden="true"></i>)
                        }
                        return que
                    })([], item.StarRating)}
                                     </div>
                         </OverlayTrigger>
              </div>
                 <Odds odds={item.FractionalOdds}  addbet={self.addbetformosttipped} isaddedbet={item.isaddedbet} ind={index} SelectionId={item.SelectionId}/>
                 </div>

})
}
<div id="footer">
<Footer fid="tipped" oddsdata={ this.props.parentThis.state.tipped3bets} />
</div>
</div>
</div>{/*<!-- end item -->*/}
</Carousel.Item>:''}
</Carousel>

</div> {/*<!-- end slider -->*/}

    </div>
    <div className="hr-tips-popover">

    </div>
<div className="hr-odds-popover">

</div>
<div className="hr-rating-popover">

</div>

</div>
    )
}
});