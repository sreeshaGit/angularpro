var React = require('react');
var Toggle = require('react-bootstrap-toggle').default;
var InputRange = require('react-input-range');
var Quicksearch =require('./Quicksearch');
var AZsearch =require('./AZsearch');

module.exports =React.createClass({
    getInitialState: function () {
        return {
            data:[],
            quick: true,
            a2z: false,
            toggleActive:false,
            values: { min: 2, max: 10 },
            isview:false
        };
    },
    componentWillMount: function () {        
        //this.serverRequest = $.get("http://horseracewidget.bettorlogic.com/Services/HorseRaceService.svc/GetAllTimeformCategories", function (result) {
        //    if (typeof result != 'object') {
        //        result = JSON.parse(result)
        //    }
        //    this.setState({ data:result})
        //}.bind(this));

        fetch('http://horseracewidget.bettorlogic.com/Services/HorseRaceService.svc/GetAllTimeformCategories') 
            .then(function(response){
                console.log("result================================",response)
                if (response.status !== 200) {  
                    console.log('Looks like there was a problem. Status Code: ' +  
                      response.status);  
                    return;  
                }
                response.json().then(function(result) {  })
            })

    },
    handleChange(values) {
        this.setState({ values });
    },
    classchangefunction: function (direction) {
        console.log(direction)
        if (direction == 'Quick') {
            this.setState({ quick: true })
            this.setState({ a2z: false })

        }

        if (direction == 'a2z') {
            this.setState({ a2z: true })
            this.setState({ quick: false })
        }


    },
    onToggle:function(){
        this.setState({toggleActive:!this.state.toggleActive})
    },
    render: function () {
        var self = this;
        return (
        <div>
                 <div className="blbw-header">
            <div className="title">Horse<span className="sub-title bw-green">Finder</span></div>
                 </div>
        <div className="blbw-hf-search">
            {this.state.isview?'':<div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                    <div className={this.state.quick ? "search-tab active" : "search-tab"} href="#quick-search" data-toggle="tab" onClick={self.classchangefunction.bind(null,'Quick')}>
                        <div className="tab-txt divider">Quick Search</div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                    <div className={this.state.a2z ? "search-tab active" : "search-tab"} href="#az-search" data-toggle="tab" onClick={self.classchangefunction.bind(null,'a2z')}>
                        <div className="tab-txt">A-Z Search</div>
                    </div>
                </div>
            </div>}
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="tab-content">
                        <div className="tab-pane active" id="quick-search">
                            <Quicksearch parentThis={this}/>
                        </div>

                        <div className="tab-pane" id="az-search">                                            
                           <AZsearch />
                        </div>




                    </div>
                </div>
            </div>          

        </div>

            </div>
             
        )
        }
});