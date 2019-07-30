var React = require('react');
var Toggle = require('react-bootstrap-toggle').default;
var InputRange = require('react-input-range');
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
var Popover = require('react-bootstrap/lib/Popover');
var Overlay = require('react-bootstrap/lib/Overlay');
var ct;
var Odds =require('./Odds');
module.exports =React.createClass({
    getInitialState: function () {
        return {
            data:[],
            items:[],
            horses:[],
            quick: true,
            a2z: false,
            toggleActive:false,
            values: { min: 1, max: 100 },
            selectedfilterid:0,
            selectedoptionids:[],
            selectedoptionName:[],
            result:false,            
            filterdata:[],
            selectracecourse:"",
            selectedracecourse:"",
            noofhorses:'',
            horseslength:'',
            selectedstar:"",
            isCirclurprogress:false,
            oddselid:0,
            sliderMin:1,
            sliderMax:100,
            percentratio:''
        };
    },   
    componentWillMount: function () {
        var self = this;       
        fetch('http://horseracewidget.bettorlogic.com/Services/HorseRaceService.svc/GetAllTimeformCategories') 
            .then(function(response){
                console.log("result================================",response)
                if (response.status !== 200) {  
                    console.log('Looks like there was a problem. Status Code: ' +  
                      response.status);  
                    return;  
                }
                response.json().then(function(result) {self.setState({ data:result})  })
            })

        fetch('http://horseracewidget.bettorlogic.com/Services/HorseRaceService.svc/GetAllBetwayRaceCourses') 
           .then(function(response){
               console.log("result================================",response)
               if (response.status !== 200) {  
                   console.log('Looks like there was a problem. Status Code: ' +  
                     response.status);  
                   return;  
               }
               response.json().then(function(result) {
                   self.setState({ items:result,selectracecourse:result[0].Name,selectedracecourse:result[0].Name})  
                   fetch(' http://horseracewidget.bettorlogic.com/Services/HorseRaceService.svc/GetBetwayHorsesInformationBasedOnFilter/,/1,100/'+result[0].Name+'/0')
                   .then(function(response){
                       console.log("result============================== ==************",response)
                       if (response.status !== 200) {  
                           console.log('Looks like there was a problem. Status Code: ' +  
                             response.status);  
                           return;  
                       }
                       response.json().then(function(result) {
                           self.setState({ filterdata:result,noofhorses:result.length,horseslength:result.length}) 
                           self.loadprogress();
                       })
                   })
               
               })
           })

     

    },
    loadprogress:function(){
        var noofhorses = this.state.horseslength;       
        var filhorses = this.state.filterdata.length;       
        var percentratio = (filhorses/noofhorses)*100;
        this.setState({percentratio:percentratio})
       
        var el = document.getElementById('graph'); // get canvas
        //alert("loadprocesss")
        if(el != null && !this.state.isCirclurprogress)
        {
            var options = {
                percent:  el.getAttribute('data-percent') || 25,
                size: el.getAttribute('data-size') || 190,
                lineWidth: el.getAttribute('data-line') || 10,
                rotate: el.getAttribute('data-rotate') || -135,
                progress: 90
            }

            var canvas = document.createElement('canvas');
            var span = document.createElement('span');
            
            var att = document.createAttribute("id");
            att.value = "progressTxt";
            span.setAttributeNode(att)
            span.innerHTML = options.percent + '<div class="h-txt">horses</div>';
    
            if (typeof(G_vmlCanvasManager) !== 'undefined') {
                G_vmlCanvasManager.initElement(canvas);
            }

            var ctx = canvas.getContext('2d');
            ct= ctx;
            canvas.width = canvas.height = options.size;

            el.appendChild(span);
            el.appendChild(canvas);

            ctx.translate(options.size / 2, options.size / 2); // change center
            ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

            //imd = ctx.getImageData(0, 0, 240, 240);
            var radius = (options.size - options.lineWidth) / 2;

            var drawCircle = function(color, lineWidth, percent) {
                percent = Math.min(Math.max(0, percent || 1), 1);
                ctx.beginPath();
                ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
                ctx.strokeStyle = color;
                ctx.lineCap = 'round'; // butt, round or square
                ctx.lineWidth = lineWidth
                ctx.stroke();
            };

            drawCircle('#FFF', 2, 0.75);
            drawCircle('#46932e', 8, this.state.percentratio / 133);
            this.setState({isCirclurprogress:true})
        }
    },
    reDraw:function(){
        ct.beginPath();
        ct.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
        ct.strokeStyle = color;
        ct.lineCap = 'round'; // butt, round or square
        ct.lineWidth = lineWidth
        ct.stroke();
    },
    onToggle:function(){
        this.setState({toggleActive:!this.state.toggleActive})
    },
    isselect:function(filid,name){  
        //console.log(name)
        var self=this;
        var selectedoptions;
        var selectedcourse;
        var selectedstar;
        var opt=this.state.selectedoptionids;  
        var selectednames = this.state.selectedoptionName;
        if(opt.indexOf(filid)==-1){           // push id if not exist     
            opt.push(filid)            
            }
        else{            
            opt.splice(opt.indexOf(filid),1)            
        }

        if(selectednames.indexOf(name)==-1){          // push name if not exist      
            selectednames.push(name)            
        }
        else{            
            selectednames.splice(selectednames.indexOf(name),1)            
        }
        
        console.log(opt)
        this.setState({selectedoptionids:opt,selectedoptionName:selectednames})
        setTimeout(function(){
            self.filterHorses();
        },)
    },
    filterHorses:function(){
        //alert("haskjdfhk")
        var self = this;
        var selectedoptions;
        var selectedcourse;
        var selectedstar;
        if(this.state.selectedoptionids.length == 0){
            selectedoptions = ',';
        }
        else{
            selectedoptions = this.state.selectedoptionids.join(',');
        }
        selectedcourse = this.state.selectracecourse;
        if(this.state.selectedstar == ''){
            selectedstar = 0;
        }
        else{
            selectedstar = this.state.selectedstar;
        }
        console.log("calling service==========")
        fetch('http://horseracewidget.bettorlogic.com/Services/HorseRaceService.svc/GetBetwayHorsesInformationBasedOnFilter/'+ selectedoptions + "/"+this.state.sliderMin+","+this.state.sliderMax+"/" + selectedcourse + "/" + selectedstar)
            .then(function(response){
                console.log("result================================",response)
                if (response.status !== 200) {  
                    console.log('Looks like there was a problem. Status Code: ' +  
                      response.status);  
                    return;  
                }
                response.json().then(function(result) {self.setState({ filterdata:result,noofhorses:result.length,isCirclurprogress:false})  })
                document.getElementById('graph').innerHTML='';
                setTimeout(function(){
                    self.loadprogress();
                })
            })
    },
    backclick:function(){        
        this.setState({result:false})
        this.props.parentThis.setState({isview:false})
        document.getElementsByTagName("canvas")[0].style.display='block';
        document.getElementById("progressTxt").style.display='block';
        
    },
    clicktest:function(){  
        console.log("clicktest")
        var self = this; 
        this.setState({result:true,isCirclurprogress:false})
        this.props.parentThis.setState({isview:true})
        document.getElementsByTagName("canvas")[0].style.display='none';
        document.getElementById("progressTxt").style.display='none';
  
    },
    handleChange(values) {
        console.log(values)
        var self = this;
        this.setState({ sliderMin:values.min,sliderMax:values.max});
        setTimeout(function(){
            self.filterHorses();
        },100)
        this.setState({ values });
    },
    
    reset:function(){ 
        var self = this;
        var racecourse = this.state.selectedracecourse;
        var Min = 1;
        var Max = 100;
        //console.log(racecourse);
        //console.log(Min) 
        var noofhorses = this.state.horseslength
        this.setState({selectedoptionids:[],selectedstar:'',selectracecourse:racecourse,sliderMin:Min,sliderMax:Max,noofhorses:noofhorses});       
        setTimeout(function(){
            self.filterHorses();
        },100)
    },
    selectstar:function(ind){     
        var self=this;
        //var star=this.state.selectedstar;   
        //if(star.indexOf(ind)==-1){               
        //    star.push(ind)            
        //}
        //else{
        //    star.splice(star.indexOf(ind),1)
        //}      
        //console.log(ind)
        this.setState({selectedstar:ind})
        setTimeout(function(){
            self.filterHorses();
        },100)
    },
    selectracecourse:function(){
        //alert("fhfjfjfj")
        //console.log(this.refs.codes.value)
        var self=this;
        var val = this.refs.codes.value;
        //var data1 = this.state.horses;
        ////console.log("data1===",data1.length)
        //var filterdata1 = data1.filter(function (d) {  
        //    //console.log("d.CourseName=", d.CourseName)
        //    //console.log("result==============",d.CourseName === val)
        //    if (d.CourseName === val)
        //    {
        //        //console.log("fghdhgd==========",true)
        //        return true;
        //    }
                
        //});
        //console.log(filterdata1)
        //console.log(val)       
            this.setState({selectracecourse:val})           
        setTimeout(function(){
            self.filterHorses();
        },100)
        
    },
    addalltobetslip: function () {      
        var result = this.state.filterdata;       
        var displaycount = 0;
        var arrayoutcome = [];
        var addedSelectionId = '';
        var allbetslink = "https://sports.betway.com/outcomes/{0}/#/horse-racing/uk-and-ireland ";

        for (var i = 0; i < result.length; i++) {            
                    var SelectionId = result[i].SelectionId;
                    arrayoutcome.push(SelectionId);              
        }
        //console.log(arrayoutcome)
        addedSelectionId = arrayoutcome.join("-");
        //console.log(addedSelectionId)
        allbetslink = allbetslink.replace("{0}", addedSelectionId)
        // console.log(allbetslink)       
        //window.open(allbetslink)
        
        betslip.add_ext([{
            'outcomeId': addedSelectionId,
        }])               

    },
    addbet:function(selid){

        var self=this;
        var oddadd=this.state.oddselid;
        if(oddadd==selid){
            this.setState({oddselid:0})
            this.setState({ show: !this.state.show })
        }else{
            this.setState({oddselid:selid})
            var addToBetslip = "https://sports.betway.com/outcomes/{0}/#/horse-racing/uk-and-ireland";
            addToBetslip = addToBetslip.replace("{0}", selid)
            //window.location.href=addToBetslip;
            
        }
    },

    render: function () {
        var self = this;
        var options = {
            strokeWidth: 2
        };

        // For demo purposes so the container has some dimensions.
        // Otherwise progress bar won't be shown
        var containerStyle = {
            width: '200px',
            height: '200px'
        };
        
        return (
        <div>
             {this.state.result?<div>   
                               <div className="row">
                <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center">
                    <span className="back-btn glyphicon glyphicon-chevron-left" onClick={self.backclick}></span>
                </div>
                <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 results-txt">
                    Showing {this.state.noofhorses} Results
                </div>
                    
            </div>
                <div className="row">
                <div className="blbw-hf-searchresults" id="nested1">
                     {
                         self.state.filterdata.map(function(item,index){
                             return <div className="panel">
                        <table className="race-table">
                            <tr>
                                <td className="collapsed" id={"arrow"+index} data-target={"#view-more" + index} data-toggle="collapse" data-parent="#nested1">
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
                    
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center" onClick={this.addalltobetslip}>
                    <button className="btn blbw-btn-betslip">Add All To Betslip</button>
                </div>
            </div></div>:<div><div className="quick-search">
                                <div class="chart" id="graph" data-percent={this.state.noofhorses}></div>
                                
                                    <button className="btn blbw-btn-betslip blbw-btn-view" onClick={this.clicktest}>View</button>
                                <div className="blbw-search-reset" onClick={this.reset}>
                                    <img src="images/reset-icon.png" width="20"/>
                                </div>
                            </div>
                            <div className="blbw-odds-rangeslider">
                                <InputRange
                                maxValue={100}
                                minValue={1}
                                value={this.state.values}
                                onChange={this.handleChange} />
                            </div>
<div className="blbw-timeform">
    <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 timeform-toggle">
             <Toggle
        onClick={this.onToggle}
        on={<span><img src="images/timeform.png" /></span>}
        off={<span><img src="images/timeform.png" /></span>}                                                
        width={100}
        height={30}
        active={this.state.toggleActive}
                                              />
                                    </div>
                                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-center">
                                {this.state.toggleActive?<div className="blbw-rating">                                            
                                {(function (que, num) {                                               
                                            for (var i = 1; i <= num;i++)
                                {
                                                que.push(
                                                <i className={self.state.selectedstar >= i?"fa fa-star star-yellow":"fa fa-star"} onClick={self.selectstar.bind(null,i)}></i>)
                                }
                                    //for (var i = 1; i <= 5-num;i++)
                                    //{
                                    //    que.push(
                                    //    <i className="fa fa-star" onClick={self.selectstar.bind(null,i)}></i>)
                                    //}
                                          return que
                                })([], 5)} 
                                        </div>:<div className="blbw-rating disable">                                           
                                            {(function (que, num) {
                                                for (var i = 1 ; i <= num; i++)
                                                {                             
                                                    que.push(                                                               
                                                     <i className="fa fa-star"></i>)                             
                                            }
                                            return que
                                            })([], 5)} 
                                        </div>}
                                         


                                    </div>
                                </div>
                            </div>
                            <div className="blbw-hf-filters">
                                <div className="row">
                                    <div className="space-5"></div>
                                    <div className="f-txt">Select from the filters below to find your best horse racing bets.</div>
                                    <div className="space-5"></div>
                                </div>
                                <div className="row">
                                    <div className="filter-dropdown">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 todays-raced">
                                                Today's Raced
                                            </div>
                                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                                <div className="filter-select">                                                   
                                                     <select onChange={self.selectracecourse} ref={"codes"}>
            {                                                         
                                                         this.state.items.map(function (item, index) {
                                                             return <option key={index} ><img src="/images/flag.png" />{item.Name}</option>
                                })
                                }
                                                    </select> 
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <ul className="filters">
                                        {
                                            this.state.data.map(function(item,index){
                                                return <li className={self.state.selectedoptionids.indexOf(item.FilterID) != -1?"active":""} key={index} onClick={self.isselect.bind(null,item.FilterID,item.CategoryName)}>{item.CategoryName}</li>
                                            })
                                        }                                      
                                    </ul>
                                </div>
                                <div className="row">
                                    <div className="space-5"></div>
                                </div>
                            </div> </div>  } 
            </div>
             
        )
        }
});