var React = require('react');
var Toggle = require('react-bootstrap-toggle').default;
var InputRange = require('react-input-range');
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
var Popover = require('react-bootstrap/lib/Popover');
var Overlay = require('react-bootstrap/lib/Overlay');
var Odds =require('./Odds');

module.exports =React.createClass({
    getInitialState: function () {
        return {
            quick: true,
            a2z: false,
            toggleActive:false,
            values: { min: 2, max: 10 },
            horsedata:[],
            horsedata1:[],
            filterHorses:[],
            selectedIndex:-1,
            letters:[],
            fildata:[],
            oddselid:0,
            selectedletter:'',
            filterHorsedata:[],
            show:false,
            totalPages: 0,
            itemsPerPage: 0,
            activePage: 0,
            filtereditems:[],
            showletterEle:0
        };
    },    
    componentWillMount: function () {
        var self = this;               
        fetch('http://horseracewidget.bettorlogic.com/Services/HorseRaceService.svc/GetBetwayHorsesInformationBasedOnFilter/,/0/,/0') 
            .then(function(response){
                console.log("result================================",response)
                if (response.status !== 200) {  
                    console.log('Looks like there was a problem. Status Code: ' +  
                      response.status);  
                    return;  
                }
                response.json().then(function(result) {self.setState({ horsedata:result,filterHorsedata:result})  })
            })        
        var result = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
        var filteredLetters=[
            ["A","B","C","D","E","F","G","H","I","J"],
            ["I","J","K","L","M","N","O","P","Q","R"],
            ["Q","R","S","T","U","V","W","X","Y","Z"]
        ];
        var itemPerpage = 9;
        var totPages = Math.ceil(result.length / itemPerpage);
        var filtereditems = result.slice(0, itemPerpage);
        
        
        this.setState({letters:result,itemsPerPage: itemPerpage, activePage: 1, filtereditems: filteredLetters[0],filteredLetters:filteredLetters,totalPages: totPages})
    },
    searchHorses:function(){ // Function to seperate menu items based on login or not 
        //console.log("gfhfghgfh")
        var data = this.state.horsedata
        var filterHorses = data.filter(function (item) {
            if(item.HorseNameNoSuffix.toLowerCase().indexOf($("#horsesearch").val().toLowerCase()) != -1)
            {                       
                return true                                   
            }           
        });       
        this.setState({filterHorsedata:filterHorses})   
    },
    //displaytip:function(ind){
    //    //console.log("ind",ind)
    //    this.setState({selectedIndex:ind}) 
    //    console.log("ind",this.state.selectedIndex)
    //    if(this.state.selectedIndex!=-1 && document.getElementById("view-more" + this.state.selectedIndex).className.indexOf("in")>0  ){
    //        var classes = document.getElementById("view-more" + this.state.selectedIndex).className;
    //        classes = classes.replace("in", ""); 
    //        document.getElementById("view-more" + this.state.selectedIndex).className = classes;
    //        document.getElementById("arrow" + this.state.selectedIndex).className = "collapsed";
    //    }
    //},
    filter:function(ind,letter){
        console.log("ind===================",ind)
        console.log("this.state.filtereditems.length-1=============",this.state.filtereditems.length-1)
        this.setState({selectedletter:ind})
        this.setState({ activePage: letter })
        if(ind==this.state.filtereditems.length-1)
        {
            console.log("blog1===========================",this.state.filteredLetters)
            var showletterEle = this.state.showletterEle
            console.log("showletterEle=====================",showletterEle)
            if(showletterEle < this.state.filteredLetters.length-1){
                this.setState({filtereditems:this.state.filteredLetters[showletterEle+1],showletterEle:showletterEle+1})
            }
            
        }
        else if(ind==0){
            var showletterEle = this.state.showletterEle
            if(showletterEle>=1){
                this.setState({filtereditems:this.state.filteredLetters[showletterEle-1],showletterEle:showletterEle-1})
            }
            
        }
        var fildata = this.state.horsedata                 
        var filterHorsedata = fildata.filter(function (d) {           
            console.log(d.HorseNameNoSuffix.startsWith(letter))
            if(d.HorseNameNoSuffix.startsWith(letter)){  
                return true;
            }
                       
        });
        this.setState({filterHorsedata:filterHorsedata})
        
    },
    addbet:function(selid){
        //console.log("dhfgdfjhg")
        var self=this;
        var oddadd=this.state.oddselid;
        if(oddadd==selid){
            this.setState({oddselid:0})
            this.setState({ show: !this.state.show })
        }else{
            this.setState({oddselid:selid})
            //var addToBetslip = "https://sports.betway.com/outcomes/{0}/#/horse-racing/uk-and-ireland";
            addToBetslip = addToBetslip.replace("{0}", selid)
            window.location.href=addToBetslip;
            self.refs.popover.show()
            setTimeout(function () { self.refs.popover.hide(); }, 2000)
        }
       
    },
    render: function () {
     
        var self = this;
        return (
            <div>
        <div className="row">
                                <div className="az-search">
                                    <div className="inner-addon right-addon">
                                        <i className="glyphicon glyphicon-search"></i>
                                        <input type="text" className="form-control" placeholder="Search for horses, jockeys & trainers" id="horsesearch" onChange={this.searchHorses}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="results-txt">
                                    Horses A-Z
                                </div>
                            </div>
                            <div className="row">
                                <div className="search-by-letter">
                                    <ul>                                                                           
                                             {this.state.filtereditems.map(function(d,ind){
                                                 return <li  key={ind}  onClick={self.filter.bind(null,ind,d)} className={self.state.activePage == d?"active":""}>{d}</li>
                                             })}
 
                                         {/*return <li className={self.state.selectedletter == index?"active":""} onClick={self.filter.bind(null,index,item)} >{item}</li>*/}                                                                                                                                                                               
                                    </ul>
                                </div>
                            </div>
                                       <div className="row">
                                <div className="blbw-hf-searchresults" id="nested2">
                                     {
                                         this.state.filterHorsedata.map(function(item,index){
                                             return <div className="panel">
                                        <table className="race-table">
                                            <tr>
                                                <td className="collapsed" id={"arrow"+index} data-target={"#view-more" + index} data-toggle="collapse" data-parent="#nested2">
                                                    <span className="race-toggle"></span>
                                                    <img className="silk" src={"http://content-cache.betfair.com/feeds_images/Horses/SilkColours/" + item.SilkImageURL} alt="" />
                                                    <div className="race-details">
                                                        <div className="jocky">
                                                            <span>{item.HorseNameNoSuffix}</span>
                                                            <span className="horse-rating">
                                                                {(function (que, num) {
                                                                    for (var i = 1; i <= num;i++)
                                                                    {
                                                                        que.push(
                                                                        <i className="fa fa-star star-yellow" aria-hidden="true"></i>)
                                                                    }
                                                                    for (i = 1; i <= 5-num;i++)
                                                                    {
                                                                        que.push(
                                                                        <i className="fa fa-star" aria-hidden="true"></i>)
                                                                    }
                                                                    return que
                                                                })([], item.StarRating)}
                                                            </span>
                                                        </div>
                                                        <div className="race-course">
                                                            {item.RaceTime} {item.CourseName}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={self.state.oddselid==item.SelectionId?"odds active":"odds"} onClick={self.addbet.bind(null,item.SelectionId)}>
                                                    <Odds odds={item.Odds}/>
                                                </td>

                                            </tr>
                                        </table>
                                        <div className="panel-collapse collapse blbw-collapse" id={"view-more" + index}>
                                            <div className="rtb">
                                                {item.Comments}
                                            </div>
                                        </div>
                                    </div>   
})
}   
                                </div>
                            </div>
                                          
        </div>
        )
}
});