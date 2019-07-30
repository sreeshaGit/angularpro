var React = require('react');
//var Slider = require("bootstrap-slider");
var odds = require('odds-converter')
var ReactBootstrapSlider = require('react-bootstrap-slider').default;
var footerThis ;
module.exports = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            sliderval: 10,
            returns: '',
            stake: 1,
            oddmult: 1,
            sc:10,
            sliderValueArray:[],
            sliderMax:0
        };
    },
    componentWillMount:function(){
        var sliderValues = [{ from: 1, to: 20, inc: 1 }, { from: 20, to: 100, inc: 5 }, { from: 100, to: 250, inc: 25 }]
        var sliderValueArray = [];
        var count = 0;
        for (var i = 0; i < sliderValues.length; i++) {
            if (i <= sliderValues.length - 2) {
                for (var j = sliderValues[i]["from"]; j < sliderValues[i]["to"]; j = j + sliderValues[i]["inc"]) {
                    count++;
                    sliderValueArray[count] = j
                }
            }
            if (i == sliderValues.length - 1) {
                for (var j = sliderValues[i]["from"]; j <= sliderValues[i]["to"]; j = j + sliderValues[i]["inc"]) {
                    count++;
                    sliderValueArray[count] = j
                }
            }

        }
        //console.log("count=====================",count)
        //console.log("sliderValueArray==================",sliderValueArray)
        this.setState({"sliderValueArray":sliderValueArray,sliderMax :count})
    },
    componentDidMount: function () {
        var result = this.props.oddsdata;  
        var oddmultiply = 1;
        this.setState({ data: result })    
        for (var i = 0; i < result.length; i++) {    
            var odd = odds.fraction.toDecimal(result[i].FractionalOdds.split('/')[0],result[i].FractionalOdds.split('/')[1]);
            oddmultiply = oddmultiply * odd;

        }   
        var returns = (oddmultiply * this.state.sliderval).toFixed(2);
        var oddmult = oddmultiply.toFixed(2);

        this.setState({ "oddmult": oddmult, "returns": returns, "sliderval": '10' })


      //  loadSliderhr(this.props.fid, this)

    },
    componentWillReceiveProps: function () {      
        var result = this.props.oddsdata;
        var oddmultiply = 1;
        var oddmultiply1 = 1;

        this.setState({ data: result })
        var count = 0;
        for (var i = 0; i < result.length; i++) {
            if (!result[i]['isremoved']) {            
                    count++;
                    var odd = odds.fraction.toDecimal(result[i].FractionalOdds.split('/')[0],result[i].FractionalOdds.split('/')[1]);                   
                    oddmultiply = oddmultiply * odd;            
            }

        }

        var returns = '';
        var oddmult = ''
        oddmult = oddmultiply.toFixed(2);
        if (count == 0) {
            returns = 0;
        }
        else {
            returns = (oddmultiply * this.state.sliderval).toFixed(2);
        }
        this.setState({ "oddmult": oddmult, "returns": returns })
    },


    sliderSlide: function (val) {
        var multipledodds = this.state.oddmult;
        sliderval = val
        if (multipledodds == 1) {
            this.setState({ "sliderval": val, "returns": 0 })
        } else {
            var stake = (sliderval * multipledodds).toFixed(2);
            this.setState({ "sliderval": val, "returns": stake })
        }
    },
    statslink: function () {       
        window.open('http://nagme.betway.com/', "mylink")
    },
    addalltobetslip: function () {
            
        var result = this.props.oddsdata; 
        var selectionidsdata = []
        var displaycount = 0;
        var arrayoutcome = [];
        var addedSelectionId = '';
        var eventid='';
        var allbetslink = "https://sports.betway.com/outcomes/{0}/#/horse-racing/uk-and-ireland ";

        for (var i = 0; i < result.length; i++) {
            if (!result[i]['isremoved'] && displaycount < 5) {
                displaycount++;
                if (!result[i]['isaddedbet']) {

                    var SelectionId = result[i].SelectionId;
                    arrayoutcome.push(SelectionId);
                    selectionidsdata.push({
                        'outcomeId': result[i].SelectionId,                        
                    })
                }
            }
        }
        addedSelectionId = arrayoutcome.join("-"); 
        eventid=arrayoutcome.join(",");                   
        allbetslink = allbetslink.replace("{0}", addedSelectionId)  
        if(SpinSport.Host){
            for(var i = 0; i<arrayoutcome.length;i++){
                //console.log(arrayoutcome[i])
                SpinSport.Host.Sports.AddOutcomeToBetslip(arrayoutcome[i]);
            }
            
        }
        else{
            var msgdata = {
                'data':selectionidsdata,
                'isaddedbet': '',
                'ismulti': true
            }
          //  console.log("msgdata====",msgdata)
            parent.postMessage(JSON.stringify(msgdata), "*");
            //window.open(allbetslink)
        }
    },
    changeValue:function(val){
       // console.log(this.props.fid)
        var currentMySliderValue =this.state.sliderValueArray[ val.target.value];       
        var multipledodds = this.state.oddmult;
        var sliderval = currentMySliderValue
        var stake = (sliderval * multipledodds).toFixed(2);
        if (multipledodds == 1) {
            this.setState({ "sliderval": sliderval, "returns": 0 })
        } else {
            var stake = (sliderval * multipledodds).toFixed(2);
            this.setState({ "sliderval": sliderval, "returns": stake })
        }    
             
        this.setState({"sc": val.target.value})
    },
    render: function () {
        return (
            <div>            
                     <div className="blbw-footer">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                    <div className="blbw-stake-slider">
                        <div className="blbw-stake-label">Stake: <span className="blbw-stake-value" id={this.props.fid + "blbw-slider-value"}>{this.state.sliderval}</span></div>

                        <div className="slider-inner">
                                                  
                            <ReactBootstrapSlider value={this.state.sc}  change={this.changeValue} step={1} max={this.state.sliderMax} min={1} tooltip='hide' handle="custom"/>
                            <div className="blbw-slider-value">
                                <div className="min">1 &nbsp; </div><div className="max">&nbsp; 250</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                    <div className="blbw-returns">
                        Returns
                        <div className="blbw-returns-box">{this.state.returns}</div>
                    </div>
                </div>
                
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center" onClick={this.addalltobetslip}>
                    <button className="btn blbw-btn-bw-green">Add All To Betslip</button>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center" >
                    <div className="blbw-footer-stats">
                        <img src="https://widgets.bettorlogic.com/sportsWidgets/images/stats-icon-yellow.svg" alt="" /><span onClick={this.statslink}>Racing Stats and Results</span>
                    </div>
                </div>
            </div>
                </div>
                         
          </div>

        )
        }
});