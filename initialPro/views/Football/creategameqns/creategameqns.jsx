/** @jsx React.DOM */

var star = false;
var gameid =""

//**********--- call getCookie function to read cookie---**********
getCookie()

if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}
if (getParameterByName("gameid") && getParameterByName("gameid") != '') {
    gameid = getParameterByName("gameid");
}
if (getParameterByName("star") && getParameterByName("star") != '') {
    star = getParameterByName("star");
}

//**********--- Component to display heading ---**********
var Head = React.createClass({
    render: function () {
        return (
        <div>
          <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                    <h3>CREATE GAME</h3>
                </div>
            </div>
          </div>
        </div>
               )
            }
});
//**********---- Component to display slider-1 (slider with labels)----**********
var Slider1 = React.createClass({
    getInitialState: function () {
        return {
            answer:0
        };
    },
    componentDidMount: function () {
        var self=this
        $('.single-slider').jRange({
            from: this.props.start,
            to: this.props.end,
            scale: this.props.val,
            format: '%s',
            width: 250,
            showLabels: false,
            snap: true,
            onstatechange:function(){
                var data = self.props.data;
                var index = self.props.ind;
                data[index].answer=$('.single-slider').jRange('getValue');
                self.props.self.setState({uniqedata:data})

            }
        });
    },
    
    render: function () {
        var self = this;
        return (
        <input type="hidden" className="single-slider" value={this.state.answer} />            
        )
}
});

//**********---- Component to display slider-2 (slider with pointer value in circle)----**********
var Slider2 = React.createClass({
    componentDidMount: function () {
        var self=this
        $('.single-slider2').jRange({
            from: 0,
            to: 90,
            step: 1,
            scale: [0,90],
            format: '%s',
            width: 250,
            showLabels: true,
            snap: true,
            theme: 'theme-blue',
            onstatechange:function(){
                var data = self.props.data;
                var index = self.props.ind;
                data[index].answer=$('.single-slider2').jRange('getValue');
                self.props.self.setState({uniqedata:data})
            }
        });
    },
    render: function () {
        return (
                      <input type="hidden" className="single-slider2" value={this.props.val} />
        )
}
});

//**********---- Component to display switch button for selecting YES or NO values----**********
var Switch2 = React.createClass({
    changeSwitch:function(event){ // Function to capture the switch change event
        var data = this.props.data;
        var index = this.props.ind;
        //console.log($("#cmn-toggle-1").is(":checked"))
        data[index].answer=$("#cmn-toggle-1").is(":checked");
        this.props.self.setState({uniqedata:data})
    },
    render: function () {
        return (<div className="padding-top-20">
                    <div className="zoola-toggle">
                        <span className="med-cop1">{this.props.val[0]=='Y'?'YES':'NO'}</span>
                        <input id="cmn-toggle-1" className="cmn-toggle cmn-toggle-round" type="checkbox" onChange={this.changeSwitch} />
                        <label htmlFor="cmn-toggle-1"></label>
                        <span className="med-cop1">{this.props.val[1]=='N'?'NO':'YES'}</span>
                    </div>
                </div>
        )
    }
});

//**********---- Component to display switch button with 3 options----**********
var Switch3 = React.createClass({

    handle3switch:function(event){// Function to capture the switch change event
        var data = this.props.data;
        var index = this.props.ind;
        data[index].answer=$("#"+event.target.id).html();
        this.props.self.setState({uniqedata:data})
        $("#"+event.target.id).addClass('active').siblings().removeClass('active');
    },
    render: function () {
        return (
        <div className="padding-top-20" onClick={this.handle3switch}>
            <div className="time-tag-big">
                    <div className="left" id="switchLeft">{this.props.val[0]}</div>
                    <div className="middle active " id="switchMiddle">{this.props.val[1]}</div>
                    <div className="right " id="switchRight">{this.props.val[2]}</div>
            </div>
        </div>
        )
}
});

//**********---- Component to display buttons for question options  ----**********
var BUTTONS = React.createClass({
    clickButton: function(index,item){ // Function to call when a button is selected
        var data = this.props.data;
        var ind = this.props.ind;
        data[ind].answer=item;
        this.props.self.setState({uniqedata:data})
        $("#time"+index).addClass('active').siblings().removeClass('active');
    },
    render: function () {
        var self = this;
        return (
        <div className="padding-top-20 time-zoola">
            {
                this.props.val.map(function (item, index) {
                    return <div className="time-tags pointer-hand" key={index} id={"time"+index} onClick={self.clickButton.bind(null,index,item)}><span className="time">{item}</span>{index<5?"mins":""}</div>
                    })
            }
        </div>
        )
    }
});

//**********---- Component to display check boxes for question options from with user can select two check boxes ----**********
var CHECKBOX = React.createClass({
    getInitialState: function () {
        return {
            answers: [],
            ansIndex:[]
        };
    },
    handleClick:function(index,item){ // Function to handle click event on check box
        var ans=[]
        if(this.state.answers.indexOf(item) == -1)
        {
            if(this.state.answers.length<2){
                ans=this.state.answers;
                ans.push(item);
                this.setState({answers:ans});
                $("#check"+index+" .close-icon").html("<img src='/images/close-icon-15.svg'/>")
            }
        }
        else{
            var i = this.state.answers.indexOf(item)
            this.state.answers.splice(i,1);
            this.setState({answers:this.state.answers})
            $("#check"+index+" .close-icon").html("&nbsp; &nbsp; &nbsp;")
        }
        var data = this.props.data;
        var ind = this.props.ind;
        data[ind].answer=(this.state.answers.length<2)?this.state.answers[0]:this.state.answers[0]+'/'+this.state.answers[1];
        this.props.self.setState({uniqedata:data})
    },
    render: function () {
        var self =this;
        return (
        <div className="padding-top-10 first-events">
            {
                this.props.val.map(function (item, index) {
                    return <div className="close-tag" key={index} onClick={self.handleClick.bind(null,index,item)} id={"check"+index}>
                                <span className="close-icon">&nbsp; &nbsp; &nbsp;</span>
                                <span className="med-cop2">{item}</span>
                            </div>
                })
            }
        </div>
         )
   }
});

var plsid= getParameterByName("gameid");
//**********---- Component to display dropdown in tablet view ----**********
var Optdrop = React.createClass({
    handleSlelect:function(item){
        //console.log("handleSlelect");
        //var data = this.props.data;
        var data = this.props.self.state.uniqedata;
        var ind = this.props.ind;

        //console.log(ind);
        //console.log($("#"+this.props.ids).val())
        //data[ind].answer=$("#"+this.props.ids).val();
       // this.props.self.setState({uniqedata:data})
        //console.log('data == ',data);
        if(this.props.queType=="2SWITCH")
        {
            if($("#"+this.props.ids).val()=="YES")
            {
                data[ind].answer='Y';
            }
            else{
                data[ind].answer='N';
            }
            data[ind].pic_id= data[ind]['picValues'][data[ind]['values'].indexOf( data[ind].answer)]['pic_id']
        }
        else if(this.props.queType=="SLIDER"){
            //console.log($("#"+this.props.ids).val())
            data[ind].answer=$("#"+this.props.ids).val();
            if(this.props.option=='Y' ){
                var picid;
                if( $("#"+this.props.ids).val()==0)
                {
                    var picval = data[ind]['picValues'].filter(function(d){
                        if(d.pic_value2==0)
                        {
                            return true;
                        }
                    })
                    if(picval.length>0)
                    {
                        picid=picval[0]['pic_id'];
                    }
                }else{
                    var picval = data[ind]['picValues'].filter(function(d){
                        if(d.pic_value2.includes("-"))
                        {
                            return true;
                        }
                    })
                    if(picval.length>0)
                    {
                        picid=picval[0]['pic_id'];
                    }
                }
                        
                data[ind].pic_id= picid
            }
            else{
                // console.log("nooption---------------",data[index]['picValues'][0]['pic_id'])
                picid=data[ind]['picValues'][0]['pic_id']
                data[ind].pic_id= data[ind]['picValues'][0]['pic_id']
            }
            // console.log("option==",self.props.option,"   picid=",picid);
                
        }
        else{
            data[ind].answer=$("#"+this.props.ids).val();
            data[ind].pic_id= data[ind]['picValues'][data[ind]['values'].indexOf( data[ind].answer)]['pic_id']
        }
        //console.log(data[ind]);
        this.props.self.setState({uniqedata:data})
    },
    componentWillReceiveProps:function(){
        var data = this.props.self.state.uniqedata;
        var ind = this.props.ind;
        //console.log("dropdown==",data)
        if(data[ind].answer=='Y')
        {
            $("#"+this.props.ids).val('YES');
        }
        else if(data[ind].answer=='N')
        {
            $("#"+this.props.ids).val('NO');
        }
        else if(data[ind].answer!='No Answer' && data[ind].answer!=''){
            $("#"+this.props.ids).val(data[ind].answer);
        }
        else if(data[ind].answer!='No Answer'){
            $("#"+this.props.ids).val('');
        }
       
    },
    render: function () {
        var self=this;
        return (
            <div className="zoola-select bg-white">
               <select className="" onChange={this.handleSlelect} id={this.props.ids}>
                     <option value=""></option>
        {
            this.props.val.map(function (item, index) {

                if(self.props.queType=="SLIDER")
                //if(self.props.queType=="SLIDER1")
                {
                    var vals = item.split("-");
                    var start = vals[0]
                    var end = vals[1];
                    var e;
                    var que=[];
                    var opt=start;
                    if(isNaN(e)){
                        e = end.split('+')
                        if(e.length==0)
                        {
                           e = end.split('-')
                        }
                        e=e[0];
                    }
                    while(opt<=e){
                        if (opt==e)
                        {
                            que.push(<option className="pointer-hand" value={end}>{end}</option>)
                        }else{
                            que.push(<option className="pointer-hand" value={opt}>{opt}</option>)
                        }
                        opt++;
                    }
                return que
            }else{
                if(item=='Y'){
                    return <option key={index} className="pointer-hand" value="YES">YES</option>
                } else if(item=='N') {
                    return <option key={index} className="pointer-hand" value="NO">NO</option>
                } else if(item=='1-90'){
                    var que=[];
                    var opt=1;
                    while(opt<=90){
                        que.push(<option className="pointer-hand" value={opt}>{opt}</option>)
                    opt++;
                }
                return que
                } else {
                    return <option value={item} key={index} className="pointer-hand" >{item}</option>
                }
           }

                
            })
        }
        </select>

   </div>
        )
    }
});
 
//**********---- Component to display dropdown for start question ----**********
var OptdropQue = React.createClass({
    getInitialState:function(){
        return {
            staroption:0
        }
    },
    componentWillMount:function(){
        
        

    },
    componentWillReceiveProps:function(){
        var data = this.props.self.state.uniqedata;
        //console.log(data)
        var starOption = data.filter(function(d){
            if(d.isStar)
            {
                return true
            }
        })
        //console.log("starOption==",starOption)
        if(starOption.length>0)
        {
            this.setState({staroption:starOption[0]['evi_id']})
            $("#OptdropQue"+this.props.ind).val(starOption[0]['evi_id'])
        }
       
    },
    handleSlelect:function(){
        var data = this.props.self.state.uniqedata;
        var item = $("#OptdropQue"+this.props.ind).val()
        //console.log(item)
       
        for(i=0;i<data.length;i++){
           
            if(data[i].evi_id == item){
                //console.log(data[i].evi_id)
                data[i].isStar=true;
            }
            else{
                data[i].isStar=false;
            }
        }
        this.props.self.setState({uniqedata:data});
    },
    render: function () {
        var self=this;
        var ids= "OptdropQue"+this.props.ind;
         return (
            <div className="zoola-select bg-white">
               <select className="starQuestion" id={ids} onChange={this.handleSlelect}>
                     <option></option>
                     {
                        this.props.data.map(function (item, index) {
                            return <option key={index} className="pointer-hand" value={item.evi_id} >{item.evi_number}</option>
                        })
                     }
             </select>
          </div>
        )
    }
});






//**********---- Component to display questions ----**********

var Questions = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            uniqedata:[],
            viewTicketData:[],
            viewTicketMainData:{},
            showCreateAnother:false,
            showBP:false,
            mainBPData:{},
            showLastQuestion:false,
            showViewTicket:false,
            selectedTicket: 0,
            showOpta:false,
            selectedOpta:0,
            selectedOptaName: "",
            mainData:{},
            selectedQuestions:[],
            headerComp : [],
            startTime:"",
            hours:0,
            min:0,
            sec:0,
            days:0,
            showCountDown:false,
            iskickoff:false,
            isaddedtowl:false,
            preStatus:''
        };
    },
    handleHideBP: function(){ // Function to hide break points popup
        this.setState({showBP:false});
    },
    handleshowBP: function(item){ // Function to show break points popup
        this.setState({showBP:true,mainBPData:item});
    },
    handleHideOpta: function(){ // Function to hide OPTA popup
        this.setState({showOpta:false,selectedOpta:0,selectedOptaName:""});
    },
    handleShowOpta: function(id,name){ // Function to show OPTA popup
        this.setState({showOpta:true,selectedOpta:id,selectedOptaName:name});
    },
    componentWillMount: function () {
        QuestionsThis=this;
        if (is_loggedIn == false){
            this.serverRequest = $.get(baseurl+"fixture/pregame2/"+plsid, function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                var data1= result.items;
                var uData = [];
                var uids =[];
                for(i = 0; i< data1.length; i++){
                    if(uids.indexOf(data1[i].evi_id) === -1){
                        
                        data1[i]["isStar"] = false;
                        data1[i]["answer"]="No Answer"
                        data1[i]["picValues"]=[];
                        data1[i]["picValues"].push({pic_value1:data1[i]['pic_value1'],pic_value2:data1[i]['pic_value2']});
                        uData.push(data1[i]);
                        uids.push(data1[i].evi_id);
                    }
                    else{
                        uData[uids.indexOf(data1[i].evi_id)]["picValues"].push({pic_value1:data1[i]['pic_value1'],pic_value2:data1[i]['pic_value2']})
                    }
                }
                for(j=0; j<uData.length; j++){
                    uData[j]["picValues"].sort(function(a, b) {
                        return parseFloat(a.pic_value1) - parseFloat(b.pic_value1);
                    });
                    uData[j]['values'] =[]
                    for(k=0;k<uData[j]['picValues'].length;k++){
                        uData[j]['values'].push(uData[j]['picValues'][k]['pic_value2'])
                       
                    }
                }
                
                this.setState({ data:data1,uniqedata: uData})
                
            }.bind(this));
        }
        else{
            this.serverRequest = $.get(baseurl+"game/update2/"+ userId+"," + sessionId +"," +gameid, function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                this.setState({selectedQuestions : result.items});
            }.bind(this));

            this.serverRequest = $.get(baseurl+"play/game2/"+ userId+"," + sessionId +"," +plsid, function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                var data1= result.items;
                var uData = [];
                var uids =[];
               
                //console.log('this.state.selectedQuestions == ',this.state.selectedQuestions);
                //for(var j=0;j<this.state.selectedQuestions.length;j++){
                //    var mkt_id = this.state.selectedQuestions[j].mkt_id;
                //    console.log('ddddd === ',mkt_id);
                //    for(i = 0; i< data1.length; i++){
                //        console.log('data1.length == ',data1[i].evi_market_id);
                //        if(data1[i].evi_market_id == mkt_id){
                //            if(uids.indexOf(data1[i].evi_id) === -1){
                //                console.log('ssssss');                        
                //                data1[i]["isStar"] = false;
                //                data1[i]["answer"]="No Answer"
                //                data1[i]["picValues"]=[];
                //                data1[i]["picValues"].push({pic_value1:data1[i]['pic_value1'],pic_value2:data1[i]['pic_value2'],pic_id:data1[i]['pic_id']});
                //                uData.push(data1[i]);
                //                uids.push(data1[i].evi_id);
                //            }
                //            else{
                //                console.log('wwwwww');
                //                uData[uids.indexOf(data1[i].evi_id)]["picValues"].push({pic_value1:data1[i]['pic_value1'],pic_value2:data1[i]['pic_value2'],pic_id:data1[i]['pic_id']})
                //            }
                //        }
                //    }
                //    console.log('uData =========== ',uData);
                //}


                for(i = 0; i< data1.length; i++){
                    //console.log(data1[i]['pic_value1'])
                    //var mkt_id = '';
                    //if(this.state.selectedQuestions.length > 0 && i < this.state.selectedQuestions.length){
                    //    mkt_id = this.state.selectedQuestions[i].mkt_id;
                    //}
                    //console.log('mt_id === ',mkt_id);
                    //console.log('data1[i].evi_market_id == ',data1[i].evi_market_id);
                    //console.log('sssssss === ',data1[i].evi_market_id == mkt_id);
                    //if(data1[i].evi_market_id == mkt_id){

                      
                    if(uids.indexOf(data1[i].evi_id) === -1){
                        //console.log(data1[i])
                        //console.log('ssssss');                        
                        data1[i]["isStar"] = false;
                        data1[i]["answer"]="No Answer"
                        data1[i]["picValues"]=[];
                        data1[i]["picValues"].push({pic_value1:data1[i]['pic_value1'],pic_value2:data1[i]['pic_value2'],pic_id:data1[i]['pic_id']});
                        uData.push(data1[i]);
                        uids.push(data1[i].evi_id);
                    }
                    else{
                        //console.log('wwwwww');
                        uData[uids.indexOf(data1[i].evi_id)]["picValues"].push({pic_value1:data1[i]['pic_value1'],pic_value2:data1[i]['pic_value2'],pic_id:data1[i]['pic_id']})
                    }
                  //  }
                }
               // console.log('uData === ',uData);
                for(j=0; j<uData.length; j++){
                    
                    uData[j]["picValues"].sort(function(a, b) {
                        return parseFloat(a.pic_value1) - parseFloat(b.pic_value1);
                    });
                    uData[j]['values'] =[]
                    for(k=0;k<uData[j]['picValues'].length;k++){
                        uData[j]['values'].push(uData[j]['picValues'][k]['pic_value2'])
                    }
                   
                }
                
                
                uniqedata = uData;
                //console.log('uniqedata === ',uniqedata);
                this.setState({ data:data1,uniqedata: uData})
                
            }.bind(this));
        }
		
		this.serverRequest = $.get(baseurl+"game/update2/"+ userId+"," + sessionId +"," +plsid, function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                var QuestionsData = result.items;
                
		}.bind(this));


        this.serverRequest = $.get(baseurl+"play/game1/"+ userId+"," + sessionId+"," +plsid, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            console.log('result === ',result);
            console.log('result.items === ',result.items);
            this.setState({headerComp:result.items[0]});
            var tkts = result.items[0]['tickets'];
		       
            if(tkts[0]==0)
            {
                tkts=[]
            }
            if(result.items[0]['status']!='O' && this.state.preStatus=='O'){
                QuestionsThis.componentWillMount()
                document.getElementById("BuyticketF").style.display = "block"
            }
            else{

                this.setState({preStatus:result.items[0]['status']})
            }
            var isAddedToWL;
            this.setState({isaddedtowl:result.items[0]['watchlist']=='N'?false:true})
            this.setState({ data: result.items[0],tickets:tkts })
            maindata = result.items[0];
            startTime = maindata.start_time;//"20160609171200";
            var str = startTime;
            var year = str.slice(0, 4);
            var month = str.slice(4, 6);
            var day = str.slice(6, 8);
            var hours = str.slice(8, 10);
            var min = str.slice(10, 12);
            var sec = str.slice(12, 14);
            var formatedDate = year + "/" + month + "/" + day + " " + hours + ":" + min + ":" + sec;
            this.setState({startTime:formatedDate});
            // date
            var matchDay = new Date(formatedDate);
            var today = new Date();
            var days = diffdates('d', today, matchDay);
            this.setState({"days":days})
            var hours = '';
            var min = '';
            var sec = '';
            var delta = Math.abs(matchDay - today) / 1000;
            if (days == 0)
            {
                // calculate (and subtract) whole hours
                hours = Math.floor(delta / 3600) % 24;
                this.setState({"hours":hours})
                delta -= hours * 3600;

                // calculate (and subtract) whole minutes
                min = Math.floor(delta / 60) % 60;
                this.setState({"min":min})
                delta -= min * 60;

                // what's left is seconds
                sec = Math.floor(delta % 60);  // in theory the modulus is not required
                this.setState({"sec":sec})
            }
            //if(TicketsThis)
            //    TicketsThis.updateTickets(tkts);
            this.setState({"showCountDown":true})
            console.log('this.state.headerthis === ',this.state.headerComp);
        }.bind(this));
        
		//$.ajax({
		//    type: "GET",
		//    url: baseurl+"play/game1/"+ userId+"," + sessionId+"," +plsid,
		//    async: false,
		//    success: function (result) {
		//        if (typeof result != 'object') {
		//            result = JSON.parse(result)
		//        }
		//        var tkts = result.items[0]['tickets'];
		       
		//        if(tkts[0]==0)
		//        {
		//            tkts=[]
		//        }
		//        if(result.items[0]['status']!='O' && this.state.preStatus=='O'){
		//            QuestionsThis.componentWillMount()
		//            document.getElementById("BuyticketF").style.display = "block"
		//        }
		//        else{

		//            this.setState({preStatus:result.items[0]['status']})
		//        }
		//        var isAddedToWL;
		//        this.setState({isaddedtowl:result.items[0]['watchlist']=='N'?false:true})
		//        this.setState({ data: result.items[0],tickets:tkts })
		//        maindata = result.items[0];
		//        startTime = maindata.start_time;//"20160609171200";
		//        var str = startTime;
		//        var year = str.slice(0, 4);
		//        var month = str.slice(4, 6);
		//        var day = str.slice(6, 8);
		//        var hours = str.slice(8, 10);
		//        var min = str.slice(10, 12);
		//        var sec = str.slice(12, 14);
		//        var formatedDate = year + "/" + month + "/" + day + " " + hours + ":" + min + ":" + sec;
		//        self.setState({startTime:formatedDate});
		//        // date
		//        var matchDay = new Date(formatedDate);
		//        var today = new Date();
		//        var days = diffdates('d', today, matchDay);
		//        this.setState({"days":days})
		//        var hours = '';
		//        var min = '';
		//        var sec = '';
		//        var delta = Math.abs(matchDay - today) / 1000;
		//        if (days == 0)
		//        {
		//            // calculate (and subtract) whole hours
		//            hours = Math.floor(delta / 3600) % 24;
		//            self.setState({"hours":hours})
		//            delta -= hours * 3600;

		//            // calculate (and subtract) whole minutes
		//            min = Math.floor(delta / 60) % 60;
		//            self.setState({"min":min})
		//            delta -= min * 60;

		//            // what's left is seconds
		//            sec = Math.floor(delta % 60);  // in theory the modulus is not required
		//            self.setState({"sec":sec})
		//        }
		//        if(TicketsThis)
		//            TicketsThis.updateTickets(tkts);
		//        this.setState({"showCountDown":true})
		//    }
		//});
        
    },
    changeStar: function(index){ // Function to call when a star is selected
        var data = this.state.uniqedata;
        for(i=0;i<data.length;i++){
            if(i==index){
                data[i].isStar=true;
                $('.starQuestion').val(data[i].evi_id);
            }
            else{
                data[i].isStar=false;
            }
        }
        var filterdata = data.filter(function (d) {
            return d.isStar == true;
        });
        
        if(filterdata.length>0)
        {
            this.setState({showLastQuestion:true})
        }
        this.setState({uniqedata:data})
    },
    viewTicketClick:function(id){ // Function to show view ticket popup
        this.setState({showViewTicket:true,selectedTicket:id})
    },
    handleHideViewTicket:function(){ // Function to hide view ticket popup
        this.setState({showViewTicket:false,selectedTicket:0})
    },
    handleCreateAnother:function(){ // Function to show view ticket popup
        this.setState({showCreateAnother:!this.state.showCreateAnother})
    },
    gotoLogin:function(){ //Function to navigate to login page
        //window.location="/build/views/Football/Login/login.html"
        window.location="/login"
    },
    gotoSelectQuestions: function(){
        var prevGameid = getParameterByName("prevGameId")
        //window.location = "/build/views/Football/Creategame/Creategame.html?islog=" + is_loggedIn + "&gameid=" + prevGameid + "&star="+star
        window.location = "/creategame/?islog=" + is_loggedIn + "&gameid=" + prevGameid + "&star="+star
    },
    cancelTicketModal: function () {
        $("#BuyTicketModal").modal('hide');
    },
    submitQuestions:function(){ // Function to post questions
        var postdata=[];
        var data =this.state.uniqedata
        var obj={};
        for(i=0;i<data.length;i++)
        {
            //obj.pls_id=1;
            obj.pls_id=plsid;
            obj.evi_id=data[i]['evi_id'];
            obj.pic_id=data[i]['pic_id'];
            obj.pic_no = data[i]['answer'] == "No Answer" ? '' : data[i]['answer'];
            if(data[i]['isStar'])
            {
                obj.star='Y'
            }
            else{
                obj.star='N'
            }
            
            postdata[i]=obj;
            obj={};
        }
		this.serverRequest = $.post(baseurl + "play/game4/" + userId + "," + sessionId, JSON.stringify({ "items": postdata }), function (result) {
		    // window.location = '/build/views/Football/Gamecreated/Gamecreated.html?islog=' + is_loggedIn + '&gameid=' + gameid
		    window.location = "/gamecreated/?islog=" + is_loggedIn + "&gameid=" + gameid
        })
        $("#BuyTicketModal").modal('hide');
    },
    valudateAnswersDropDown:function(id){
        var data =this.state.uniqedata;
        for(i=0;i<data.length;i++)
        {console.log('111111 === ',data[i]['answer']);
            console.log('')
            if(data[i]['answer'] =="" || data[i]['answer']==null || data[i]['answer']=='No Answer')
            {
                $("#"+id).html("Please complete all questions and choose your double points question.");
                return false;
            }
        }
        if($("#OptdropQuestar").val() == null || $("#OptdropQuestar").val() == '')
        {
            $("#"+id).html("Please ensure you have selected the question you want double points for.");
            return false;
        }
		
        $("#"+id).html("");
        $("#BuyTicketModal").modal('show')
        //setTimeout(function(){$("#BuyTicketModal").modal('show');},500)
    },
    valudateAnswers:function(id){
        var data =this.state.uniqedata;
        for(i=0;i<data.length;i++)
        {
            
            if(data[i]['evi_ui_type']=='MINISLIDER' && (data[i]['answer']=="" ||data[i]['answer']==null ||data[i]['answer']=='No Answer'))
            {
                data[i].answer=data[i]['values'][0];       
                data[i].pic_id= data[i]['picValues'][0]['pic_id']
            }
            if(data[i]['evi_ui_type']=='3SWITCH' && (data[i]['answer']=="" ||data[i]['answer']==null ||data[i]['answer']=='No Answer'))
            {
                data[i].answer=$("#switchMiddle_"+i).html();
                data[i].pic_id=data[i]['picValues'][data[i]['values'].indexOf( $("#switchMiddle_"+i).html())]['pic_id']
            }
            if(data[i]['evi_ui_type']=='2SWITCH' && (data[i]['answer']=="" ||data[i]['answer']==null ||data[i]['answer']=='No Answer'))
            {
                var ids = "switch2_"+i
                data[i].answer=$("#"+ids).is(":checked")?data[i]['values'][1]:data[i]['values'][0];
                data[i].pic_id= data[i]['picValues'][data[i]['values'].indexOf( data[i].answer)]['pic_id']
            }
            if(data[i]['evi_ui_type']!='MINISLIDER' && data[i]['evi_ui_type']!='2SWITCH' && data[i]['evi_ui_type']!='3SWITCH' && data[i]['evi_ui_type']!='SLIDER' )
            {
                if(data[i]['answer']=="" ||data[i]['answer']==null ||data[i]['answer']=='No Answer')
                {
                    $("#"+id).html("Please answer all the questions and ");
                    return false;
                }
                
            }
            if(data[i]['evi_ui_type']=="SLIDER"){
                var ids = "slider2_"+i;
                if($('#'+ids).jRange('getValue')==0)
                {
                    data[i].answer=$('#'+ids).jRange('getValue');
                    if(data[i].evi_ui_options=='Y' ){
                        var picid;
                        
                        var picval = data[i]['picValues'].filter(function(d){
                            if(d.pic_value2==0)
                            {
                                return true;
                            }
                        })
                        if(picval.length>0)
                        {
                            picid=picval[0]['pic_id'];
                        }
                        
                        
                        data[i].pic_id= picid
                    }
                    else{
                        // console.log("nooption---------------",data[i]['picValues'][0]['pic_id'])
                        picid=data[i]['picValues'][0]['pic_id']
                        data[i].pic_id= data[i]['picValues'][0]['pic_id']
                    }
                    //console.log(data[i])
                }
            }
        }
        //console.log($("#OptdropQuestar").val()=='')
        //console.log(data)
        this.setState({uniqedata:data})
        if($("#OptdropQuestar").val() == null || $("#OptdropQuestar").val() == '')
        {
            $("#"+id).html("Pick your double point question.");
            return false;
        }
        $("#"+id).html("");
        setTimeout(function(){$("#BuyTicketModal").modal('show');},1000)
        
    },
    render: function () {
        var self = this;
        var sliderval =0;
       
        return (
           <div>
                <div className="container">
                <div className="space-5"></div>
                <div className="row">
        	        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                       <h2 className="">No zoola game likes to be empty.</h2>
                       <div className="space-10"></div>
                       <p className="font-20 text-center">Please answer the questions to enter the first ticket.</p>
        	        </div>
                </div>
		        <div className="space-10"></div>
                <div className="row">
            <div className="panel panel-default">
                {
                    this.state.uniqedata.map(function (item, index) {
                        var id=index+"_1";
                        var id2=index+"_2";
                        if(self.props.ticketCount==0 || !self.props.isLog){
                            if(index%2==0)
                            {
                                return  <div className={item.isStar?"selected-star-qn game-qns-box bg-light-blue no-padding-bottom":"game-qns-box bg-light-blue no-padding-bottom"} key={item.evi_id}>
                                               <div className="row">
                                                   <div className="col-lg-1 col-md-1 col-sm-1 col-xs-2 text-center">
                                                               <a className="" onClick={self.handleshowBP.bind(null,item)}>
                                                                    <span className="number">{item.evi_number} </span> 
                                                               </a>
                                                           </div>
                                                   <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center hidden-xs no-padding">
                                                                <div className="zoola-btn-viewstats" onClick={self.handleShowOpta.bind(null,item.evi_id,item.evi_name)}>VIEW STATS</div>
                                                           </div>
                                                           <div className="col-lg-6 col-md-6 col-sm-7 col-xs-6 ">
                                                               <span className="game-question">{item.evi_desc}</span>
                                                           </div>
                                                     
                                                     <div className="col-lg-3 col-md-3 col-sm-2 col-xs-4 text-center no-padding-left">
                                                                <Optdrop val={item.values} self={self} data={self.state.uniqedata} ind={index} ids={id2} queType={item.evi_ui_type}/>
                                                           </div>

                                </div>
                                <div className="row visible-xs">
                                                           <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center col-centered padding-top-10">
                                                                <div className="viewstats" onClick={self.handleShowOpta.bind(null,item.evi_id,item.evi_name)}>View Stats</div>
                                                           </div>
                                                       </div>
             </div>
                    }
                    else{
                                return   <div className={item.isStar?"selected-star-qn game-qns-box bg-dark-blue no-padding-bottom selected-star-qn":"game-qns-box bg-dark-blue no-padding-bottom"} key={item.evi_id}>
                                                            <div className="row">
                                                                <div className="col-lg-1 col-md-1 col-sm-1 col-xs-2 text-center">
                                                                    <a className="" onClick={self.handleshowBP.bind(null,item)}>
                                                                        <span className="number">{item.evi_number} </span>
                                                                    </a>
                                                                </div>
                                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center hidden-xs no-padding">
                                                                    <div className="zoola-btn-viewstats" onClick={self.handleShowOpta.bind(null,item.evi_id,item.evi_name)}>VIEW STATS</div>
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-7 col-xs-6">
                                                                    <span className="game-question">{item.evi_desc} </span>
                                                                </div>

                                                                 <div className="col-lg-3 col-md-3 col-sm-2 col-xs-4 text-center no-padding-left">
                                                                      <Optdrop val={item.values} self={self} data={self.state.uniqedata} ind={index} ids={id2} queType={item.evi_ui_type}/>
                                                                 </div>
                                                        </div>
                                                        <div className="row visible-xs">
                                                               <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center col-centered padding-top-10">
                                                                    <div className="viewstats" onClick={self.handleShowOpta.bind(null,item.evi_id,item.evi_name)}>View Stats</div>
                                                               </div>
                                                            </div>
</div>
}
}
})
}
            {this.state.uniqedata.length%2 ==0?<div className="game-qns-box bg-star-qn margin-bottom-10">
                                	<div className="row">
                                    	<div className="col-lg-1 col-md-1 col-sm-1 col-xs-2 text-center">
                                        	<span className="number z-star z-star-icon"> <span className="glyphicon glyphicon-star yellow"> </span></span>
                                    	</div>
                                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center hidden-xs no-padding">

                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-7 col-xs-6">
                                        	<span className="game-question no-padding-top">Win double points on question number:</span>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-2 col-xs-4 text-center no-padding-left">
                                        	<OptdropQue self={self} data={self.state.uniqedata} ind="star"/>
                                        </div>
                                        
                                	</div>

                                </div>:<div className="game-qns-box bg-star-qn margin-bottom-10">
                                	    <div className="row">
                                    	    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-2 text-center">
                                        	      <span className="number z-star z-star-icon"> <span className="glyphicon glyphicon-star yellow"> </span></span>
                                            </div>
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center hidden-xs no-padding">

                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-7 col-xs-6">
                                        	    <span className="game-question no-padding-top">Win double points on question number:</span>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-2 col-xs-4 text-center no-padding-left">
                                        	    <OptdropQue self={self} data={self.state.uniqedata} ind="star"/>
                                            </div>
                                            
                                        </div>
                         </div>}

                         <div id="questions_error" className="text-center alert-message"></div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-centered no-padding"><button className="btn zoola-btn margin-top-20" onClick={self.valudateAnswersDropDown.bind(null,"questions_error")}>
                            <div className="btn-txt" >Join Game</div>
                              </button></div>
                <div className="space-10"></div>
                   <div className="row">
                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                         <div className="ntr-txt underline" onClick={this.gotoSelectQuestions}>Go back and change the questions</div>
                       </div>
                   </div>
                   <div className="space-10"></div>
                    <div>

                        {this.state.showBP?<BreakPointsPopUp handleHideBP={this.handleHideBP} data={this.state.mainBPData} />:''}                          
                        </div>



        <div className="modal fade animated bounce" id="BuyTicketModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static">
                          <div className="modal-dialog " role="document">
                            <div className="modal-content BuyTicketModal">
								<div className="modal-header">
                                      <img src="/images/close-icon.svg" data-dismiss="modal" className="pointer-hand pull-right" width="25" />
                	                 <br />
								</div>
								<div className="modal-body no-padding">
									<div className="bg-blue row no-margin">
									<h3 className="">Ticket #1 <span className="d-block-m">Confirmation</span></h3>
								</div>
                                   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                        <div className="space-5"></div>
                                        {/*<div className="kickoff">{this.state.headerComp.status=='O'?<span>{ this.state.days > 0 ?  this.state.days + ' day(s)' : <span>{this.state.showCountDown?<CountDown hours={this.state.hours} minutes={this.state.min} seconds={this.state.sec } self={this.state.headerComp} msg="Game live" />:''}</span> }</span> :this.state.headerComp.status=='R'?<CountDown hours={this.state.hours} minutes={this.state.min} seconds={this.state.sec} self={this.state.headerComp} msg='Game finished' />:this.state.headerComp.status=='C'?<CountDown hours={this.state.hours} minutes={this.state.min} seconds={this.state.sec} self={this.state.headerComp} msg='Game live' />:this.state.headerComp.status=='A'?'Abandoned':''}</div>*/}
										
                                        <div className="space-5"></div>
                                   </div>
                                   <div className="row">                               
            	                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                	                        <div className="leaderboard-team lb-home-team">
											<img src={this.state.headerComp.home_team_id ? this.state.headerComp.competition_id == 8 ? "/images/jerseys/EPL/" + this.state.headerComp.home_team_id + ".svg" : this.state.headerComp.competition_id == 10 ? "/images/jerseys/EC/" + this.state.headerComp.home_team_id + ".svg" : "/images/football-shirts/numbers/" + this.state.headerComp.home_team_id + ".svg" : "/images/qn-icon-empty.svg"}/>
											<span className="lb-team-name mon-txt">{this.state.headerComp.home_team}</span>
											</div>
            	                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                	                        <div className="leaderboard-team lb-away-team">
											<img src={this.state.headerComp.away_team_id ? this.state.headerComp.competition_id == 8 ? "/images/jerseys/EPL/" + this.state.headerComp.away_team_id + ".svg" : this.state.headerComp.competition_id == 10 ? "/images/jerseys/EC/" + this.state.headerComp.away_team_id + ".svg" : "/images/football-shirts/numbers/" + this.state.headerComp.away_team_id + ".svg" : "/images/qn-icon-empty.svg"}/>
											
											<span className="lb-team-name mon-txt">{this.state.headerComp.away_team}</span>
											</div>
                                        </div>
                                    </div>

 <div>
     {
         this.state.uniqedata.map(function (item, index) {
             if(index%2==0){
                 return <div className={item.isStar?"selected-star-qn game-qns-box padding-10 bg-light-blue margin-10":"game-qns-box padding-10 bg-light-blue margin-10"} key={item.evi_id}>
                                 <div className="row no-margin">
                                     <div className="col-lg-1 col-md-1 col-sm-1 col-xs-4 hidden-xs">
                        	              <span className="number"> {item.evi_number} </span>
                                      </div>
                                     <div className="col-lg-8 col-md-8 col-sm-8 col-xs-7">
                                         <span className="game-question">{item.evi_desc}</span>
                                     </div>
                                     <div className="col-lg-3 col-md-3 col-sm-3 col-xs-5 text-right">
                                        <div className="bg-dark-blue answer"> {item.evi_ui_type=='2SWITCH'?item.answer=='Y'?'YES':'NO':item.answer}</div>
                                     </div>
                                 </div>
                         </div>
             }
             else{
                 return <div className={item.isStar?"selected-star-qn game-qns-box padding-10 bg-dark-blue margin-10":"game-qns-box padding-10 bg-dark-blue margin-10"} key={item.evi_id}>
                                 <div className="row no-margin">
                                     <div className="col-lg-1 col-md-1 col-sm-1 col-xs-4 hidden-xs">
                        	              <span className="number"> {item.evi_number} </span>
                                      </div>
                                     <div className="col-lg-8 col-md-8 col-sm-8 col-xs-7">
                                         <span className="game-question">{item.evi_desc}</span>
                                     </div>
                                     <div className="col-lg-3 col-md-3 col-sm-3 col-xs-5 text-right">
                                         <div className="bg-light-blue answer"> {item.evi_ui_type=='2SWITCH'?item.answer=='Y'?'YES':'NO':item.answer}</div>
                                     </div>
                                 </div>
                         </div>
             }
                                               
         })
     }
 </div>
 <div className="row no-margin">
     <div className="col-lg-12 text-center">
         <div className="space-5"></div>
         
         <div className="space-5"></div>
     </div>
 </div>
 <div className="col-lg-4 col-md-4 col-sm-4 col-xs-8 col-centered">
     <button className="btn zoola-btn" onClick={this.submitQuestions}>
         <h5 className="">{this.state.isEditTicket?"Save ticket":"Buy now"}</h5>
     </button>
 </div>
</div>
<div className="modal-footer">
      <p className="ntr-txt text-center underline" onClick={this.cancelTicketModal}>Cancel Ticket</p>
</div>
</div>
</div>
</div>

    {this.state.showOpta?this.state.selectedOptaName=="GOAL" || this.state.selectedOptaName=="SHOT" || this.state.selectedOptaName=="SHOTON" || this.state.selectedOptaName=="SHOTSOFFTARGET"?<OptaPopupAttack handleHideOpta={this.handleHideOpta} eid={this.state.selectedOpta} />:this.state.selectedOptaName=="CARD" || this.state.selectedOptaName=="FOUL" || this.state.selectedOptaName=="FREEKICK" || this.state.selectedOptaName=="OFFSIDE"?<OptaPopupDiscipline handleHideOpta={this.handleHideOpta} eid={this.state.selectedOpta} />:this.state.selectedOptaName=="SAVE" || this.state.selectedOptaName=="BLOCK" || this.state.selectedOptaName=="INTERCEPTIONS" || this.state.selectedOptaName=="CLEATANCE"?<OptaPopupDefence handleHideOpta={this.handleHideOpta} eid={this.state.selectedOpta} />:this.state.selectedOptaName =="CORNER" || this.state.selectedOptaName =="THROWIN"?<OptaPopupDeadball handleHideOpta={this.handleHideOpta} eid={this.state.selectedOpta} />:'':''}
    <div className="modal fade animated bounce" tabIndex="-1" role="dialog" aria-labelledby="Alert-Modal" id="alert-modal" data-backdrop="static">
        <div className="modal-dialog modal-sm ">

            <div className="modal-content zoola-box alet-modal">
                <div className="social-header">
                    <img src="/images/close-icon.svg" width="20" className="pull-right pointer-hand" data-dismiss="modal"/>

                </div>
                <div className="social-body">
                    <div className="space-5"></div>
                    <div className="row">
                        <div className="col-lg-12">
                            <p>You can't join in to &pound;5+ games with your promotional Money.</p>
                        </div>
                    </div>
                    <div className="space-5"></div>
                    <div className="row">
                        <div className="col-lg-10 col-sm-10 col-centered">
                            <button type="submit" className="btn zoola-btn" onClick={this.gotoTopup}><h5 className="">Deposit</h5></button>
                        </div>
                    </div>
                    <div className="space-5"></div>

                </div>
            </div>
        </div>
    </div>
</div>
         
</div>
                    </div>
                    <div className="space-5"></div>
                    </div>
        )
}
});

//**********--- Function to calculate no.of days between two dates ---**********
// datepart: 'y', 'm', 'w', 'd', 'h', 'n', 's'
function diffdates(datepart, fromdate, todate) {	
    datepart = datepart.toLowerCase();
    var diff = todate - fromdate;	
    var divideBy = { w:604800000, 
        d:86400000, 
        h:3600000, 
        n:60000, 
        s:1000 };	
    return Math.floor( diff/divideBy[datepart]);
}

//**********--- Count down timer component ---**********
var endTime = '';
var CountDown = React.createClass({
    getInitialState: function () {
        return {  countdown: "",endTime:''};
    },
    twoDigits: function (n) {
        return (n <= 9 ? "0" + n : n);
    },
    updateTimer: function () {
        msLeft = this.state.endTime - (+new Date);
        if (msLeft < 1000) { 
            this.setState({ countdown: this.props.msg });
            this.props.self.changeGameStart();
            scoresThis.changeGameStart();
            GLThis.changeGameStart()
            //h2hThis.changeGameStart();
        } else {
            time = new Date(msLeft);
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            if (hours != 0 && hours>0)
            {
                countDownValue = ("in " + hours + " hour(s)");
                this.setState({ countdown: countDownValue })
            }
            else if (mins != 0 && mins>0) {
                countDownValue = ("in " + this.twoDigits(mins) + " minutes");
                this.setState({ countdown: countDownValue })
            }
            else {
                
                countDownValue = ("in " + this.twoDigits(time.getUTCSeconds()) + " seconds");
                this.setState({ countdown: countDownValue })
            }

            setTimeout(this.updateTimer, time.getUTCMilliseconds() + 500);
        }
    },
    componentWillMount: function () {
        var element, endTime, hours, mins, msLeft, time, countDownValue;

        var Totalmins = 0, endtim;
        if (this.props.hours > 0)
        {
            Totalmins = (this.props.hours * 60);
           
        }
        endtim = (+new Date) + 1000 * (60 * (Totalmins + this.props.minutes) + this.props.seconds) + 500;
        this.setState({ endTime: endtim });
        setTimeout(this.updateTimer, 1000);
    },
    render: function () {

        return (
                    <span>{this.state.countdown}</span>

        )
    }
});
        //**********---- Component for break points popup ----**********
        var BreakPointsPopUp = React.createClass({
                              getInitialState: function () {
                              return {
                              bp:[],
                              mainData:{},
                              };

                              },
                              componentWillMount: function () {
                              this.serverRequest = $.get(baseurl+"play/points/"+userId+","+sessionId +","+this.props.data.evi_id, function (result) {
                              if (typeof result != 'object') {
                              result = JSON.parse(result)
                              }
                              this.setState({mainData:result.items[0],bp:result.items})
                              }.bind(this));

                              },
                              componentDidMount:function(){
                              $(ReactDOM.findDOMNode(this)).modal('show');
                              $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideBP);
                              },
                              render: function () {
                              return (
            <div className="modal fade animated bounce" id="BreakdownPointModal" tabIndex="-3" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static">
              <div className="modal-dialog " role="document">
                <div className="modal-content BuyTicketModal">
                  <div className="modal-header">
                         <img src="/images/close-icon.svg" data-dismiss="modal" className="pointer-hand pull-right" width="25" /><br />

                  </div>
                  <div className="modal-body no-padding">
                        <div className="bg-blue row no-margin">
                            <h3 className="">Point Breakdown</h3>
                        </div>
                        <div className="space-5"></div>
                        <div className="row no-margin">
                            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-2 text-center">
                                <span className="number"> {this.state.mainData.event_order} </span>
                            </div>
                            <div className="col-lg-7 col-md-7 col-sm-7 col-xs-10">
                                <span className="game-question">{this.state.mainData.event}</span>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-center margin-top-5">
                                {this.state.mainData.result!="NA"?<div className="bg-dark-blue answer">{this.state.mainData.result}</div>:''}
                            </div>
                        </div>
                        <div className="space-5"></div>
                        <div>
                            {
                            this.state.bp.map(function (item, index) {
                            if(index>0){
                            if(index%2==1)
                            {
                            return  <div className="row no-margin" key={index}>
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-dark-blue padding-20">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                <p className="no-margin">{item.description}</p>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                <div className="tit-txt"><strong>{item.points}</strong></div>
                                                            </div>
                                                        </div>
                                            </div>
                            }
                            else{
                            return <div className="row no-margin" key={index}>
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-light-blue padding-20">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                <p className="no-margin">{item.description}</p>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                <div className="tit-txt"><strong>{item.points}</strong></div>
                                                            </div>
                                                        </div>
                                            </div>
                            }

                            }

                            })
                            }
                        </div>
                        <div className="modal-footer">
                        </div>
                  </div>

                </div>
              </div>
            </div>
        )
      }
    });

        //**********---- Component for attack OPTA popup ----**********
        var OptaPopupAttack = React.createClass({
            getInitialState: function () {
                return {
                    team_stat:[],
                    Alast_3_games:[],
                    Hlast_3_games:[],
                    previous_meetings:[],
                    Atop_scorers:[],
                    Htop_scorers:[]
                };
            },
            componentWillMount: function () {
                var eid = this.props.eid
                this.serverRequest = $.get(baseurl + "opta/attack/" + eid, function (result) {
                    if (typeof result != 'object') {
                        result = JSON.parse(result)
                    }
                    last_away=[];
                    last_home=[];
                    for(i=0;i                    <result.last_3_games.length;i++) {
                                                     var k=Object.keys(result.last_3_games[i]);
                                                     var isA=k[0].startsWith('a');
                                                     var isH=k[0].startsWith('h');
                                                     if(isA)
                                                     {
                                                     last_away.push(result.last_3_games[i])
                                                     }
                                                     else{
                                                     last_home.push(result.last_3_games[i])
                                                     }
                                                     }
                                                     var scores_away=[];
                                                     var scores_home=[];
                                                     for(i=0;i<result.top_scorers.length;i++)
                    {
                        var k = Object.keys(result.top_scorers[i]);
                        var isA = k[0].startsWith('a');
                        var isH = k[0].startsWith('h');
                        if(isA)
                        {
                            scores_away.push(result.top_scorers[i])
                        }
                        else{
                            scores_home.push(result.top_scorers[i])
                        }
                    }
                    //this.setState({team_stat:result.team_stat,last_3_games:result.last_3_games,previous_meetings:result.previous_meetings,top_scorers:result.top_scorers})
                    this.setState({team_stat:result.team_stat,Alast_3_games:last_away,Hlast_3_games:last_home,Atop_scorers:scores_away,Htop_scorers:scores_home,previous_meetings:result.previous_meetings,})
                }.bind(this));
            },
            componentDidMount:function(){
                $(ReactDOM.findDOMNode(this)).modal('show');
                $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideOpta);
            },
            render: function () {
                return (
                      <div className="modal fade animated bounce" id="stats-opta"  tabIndex="-3" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static">
                        <div className="modal-dialog " role="document">
                          <div className="modal-content BuyTicketModal">
                            <div className="modal-header opta-header">
                                {/*<img src="/images/close-icon.svg" data-dismiss="modal" className="pointer-hand pull-right" width="30" />*/}
                                {this.state.team_stat.length>0? <div className="row text-center">
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                          <img src="/images/close-icon.svg" data-dismiss="modal" className="pointer-hand pull-right" width="25" />
                                          <span className="stats margin-right-10">STATS</span><span className="powered-by padding-right-5">powered by </span><img src="/images/opta-bg.png" alt="" width="85" className="" />
                                       </div>
                                </div>:''}
                            </div>
      <div className="modal-body no-padding">
            <div className="bg-blue row no-margin">
                <h3 className="">ATTACK</h3>
            </div>
                <div className="space-10"></div>
                {this.state.team_stat.length>0?                <div className="">
                    <div className="row">
            	                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center">
                	                <div className="leaderboard-team lb-home-team">
                    	                <img src={this.state.team_stat[1]['h_team_uid']?"/images/football-shirts/numbers/"+this.state.team_stat[1]['h_team_uid']+".svg":"/images/qn-icon-empty.svg"} />
                                        <span className="lb-team-name mon-txt">{findShortName(this.state.team_stat[1]['h_team_name'])}</span>
                                        <div className="sm-txt text-center games-played"><div className="d-block-m">(home)</div><div className="">{this.state.team_stat[1]['h_game_count']} games played</div></div>
                	                </div>

            	                </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center hidden-xs">
                        <div>
                            <div className="comparison bg-light-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/goals.svg" className="left-img" alt="" width="35" />
                                            <span>{this.state.team_stat[3]['h_goal_count']}</span>
                                	    </div>
                                        <div className="comp-heading"> Goals scored</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[3]['a_goal_count']}</span>
                                            <img src="/images/opta-icons/goals.svg" className="right-img" alt="" width="35" />
                                        </div>
                            </div>
                            <div className="comparison bg-dark-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/target.svg" className="left-img" alt="" width="35" />
                                            <span>{this.state.team_stat[4]['h_on_trgt_cnt']}</span>
                                	    </div>
                                        <div className="comp-heading"> On target</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[4]['a_on_trgt_cnt']}</span>
                                            <img src="/images/opta-icons/target.svg" className="right-img" alt="" width="35" />
                                        </div>
                            </div>
                            <div className="comparison bg-light-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/offtarget.svg" className="left-img" alt="" width="35" />
                                            <span>{this.state.team_stat[5]['h_off_trgt_cnt']}</span>
                                	    </div>
                                        <div className="comp-heading">Off target</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[5]['a_off_trgt_cnt']}</span>
                                            <img src="/images/opta-icons/offtarget.svg" className="right-img" alt="" width="35" />
                                        </div>
                            </div>
                            <div className="comparison bg-dark-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/shot-ac.svg" className="left-img" alt="" width="35" />
                                            <span>{this.state.team_stat[6]['h_srt_accuracy_per']}</span>
                                	    </div>
                                        <div className="comp-heading"> Shot accuracy (%)</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[6]['a_srt_accuracy_per']}</span>
                                            <img src="/images/opta-icons/shot-ac.svg" className="right-img" alt="" width="35" />
                                        </div>
                            </div>
                            <div className="comparison bg-light-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/conv-rate.svg" className="left-img" alt="" width="35" />
                                            <span>{this.state.team_stat[7]['h_con_rate_per']}</span>
                                	    </div>
                                        <div className="comp-heading"> Conversion rate (%)</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[7]['a_con_rate_per']}</span>
                                            <img src="/images/opta-icons/conv-rate.svg" className="right-img" alt="" width="35" />
                                        </div>
                            </div>
                            <div className="comparison bg-dark-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/assists.svg" className="left-img" alt="" width="35" />
                                            <span>{this.state.team_stat[8]['h_assist_cnt']}</span>
                                	    </div>
                                        <div className="comp-heading">Assists</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[8]['a_assist_cnt']}</span>
                                            <img src="/images/opta-icons/assists.svg" className="right-img" alt="" width="35" />
                                        </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center">
                	                <div className="leaderboard-team lb-away-team">
                    	                <img src={this.state.team_stat[2]['a_team_uid']?"/images/football-shirts/numbers/"+this.state.team_stat[2]['a_team_uid']+".svg":"/images/qn-icon-empty.svg"} />
                                        <span className="lb-team-name mon-txt">{findShortName(this.state.team_stat[2]['a_team_name'])}</span>
                	                    <div className="sm-txt text-center games-played"><div className="d-block-m">(away)</div><div className="">{this.state.team_stat[2]['a_game_count']} games played</div></div>
                	                </div>

                    </div>
                    </div>
                <div className="space-5"></div>
                <div className="row no-margin visible-xs">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center col-centered">
                                   <div>
                            	    <div className="comparison bg-light-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/goals.svg" className="left-img" alt="" width="35" />
                                            <span>{this.state.team_stat[3]['h_goal_count']}</span>
                                	    </div>
                                        <div className="comp-heading"> Goals scored</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[3]['a_goal_count']}</span>
                                            <img src="/images/opta-icons/goals.svg" className="right-img" alt="" width="35" />
                                        </div>
                            	    </div>
                                    <div className="comparison bg-dark-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/target.svg" className="left-img" alt="" width="35" />
                                            <span>{this.state.team_stat[4]['h_on_trgt_cnt']}</span>
                                	    </div>
                                        <div className="comp-heading"> On target</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[4]['a_on_trgt_cnt']}</span>
                                            <img src="/images/opta-icons/target.svg" className="right-img" alt="" width="35" />
                                        </div>
                                    </div>
                                    <div className="comparison bg-light-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/offtarget.svg" className="left-img" alt="" width="35" />
                                            <span>{this.state.team_stat[5]['h_off_trgt_cnt']}</span>
                                	    </div>
                                        <div className="comp-heading">Off target</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[5]['a_off_trgt_cnt']}</span>
                                            <img src="/images/opta-icons/offtarget.svg" className="right-img" alt="" width="35" />
                                        </div>
                                    </div>
                                    <div className="comparison bg-dark-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/shot-ac.svg" className="left-img" alt="" width="35" />
                                            <span>{this.state.team_stat[6]['h_srt_accuracy_per']}</span>
                                	    </div>
                                        <div className="comp-heading"> Shot accuracy (%)</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[6]['a_srt_accuracy_per']}</span>
                                            <img src="/images/opta-icons/shot-ac.svg" className="right-img" alt="" width="35" />
                                        </div>
                                    </div>
                                    <div className="comparison bg-light-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/conv-rate.svg" className="left-img" alt="" width="35" />
                                            <span>{this.state.team_stat[7]['h_con_rate_per']}</span>
                                	    </div>
                                        <div className="comp-heading"> Conversion rate (%)</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[7]['a_con_rate_per']}</span>
                                            <img src="/images/opta-icons/conv-rate.svg" className="right-img" alt="" width="35" />
                                        </div>
                                    </div>
                                    <div className="comparison bg-dark-blue">
                                	    <div className="comp-left">
                                    	    <img src="/images/opta-icons/assists.svg" className="left-img" alt="" width="35" />
                                            <span>{this.state.team_stat[8]['h_assist_cnt']}</span>
                                	    </div>
                                        <div className="comp-heading">Assists</div>
                                        <div className="comp-right">
                                    	    <span>{this.state.team_stat[8]['a_assist_cnt']}</span>
                                            <img src="/images/opta-icons/assists.svg" className="right-img" alt="" width="35" />
                                        </div>
                                    </div>
                                   </div>
                                </div>

                </div>
                </div>:''}

                <div className="space-5"></div>
                   <div className="bg-blue row no-margin">
                       <h3 className="">LAST 3 GAMES</h3>
                   </div>
                <div className="space-5"></div>
                <div className="row no-margin">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                        {
                        this.state.Hlast_3_games.map(function(item,index){

                        return  <div className="last-3-game" key={index}>
                            	                        <div className="last-3-game-left bg-light-blue">
                                	                        <img src={item.h_h_team_uid?"/images/football-shirts/numbers/"+item.h_h_team_uid+".svg":"/images/qn-icon-empty.svg"} className="left-img" alt="" width="35" />
                                                            <div className="last3game-text">{findShortName(item.h_h_team_name)}</div>
                            	                        </div>
                            	                        <div className="score-box1">{item.h_home_score}-{item.h_h_away_score}</div>
                                                        <div className="last-3-game-right bg-light-blue">
                                	                        <img src={item.h_a_team_uid?"/images/football-shirts/numbers/"+item.h_a_team_uid+".svg":"/images/qn-icon-empty.svg"} className="left-img" alt="" width="35" />
                                	                        <div className="last3game-text">{findShortName(item.h_a_team_name)}</div>
                                                        </div>
                                            </div>
                        })
                        }
                    </div>
                    <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center no-padding-left">
                                <div className="hidden-xs"><div className="opta-vline"></div></div>
                                {
                                this.state.Alast_3_games.map(function(item,index){

                                return  <div className="last-3-game" key={index}>
                            	                            <div className="last-3-game-left bg-light-blue">
                                	                            <img src={item.a_h_team_uid?"/images/football-shirts/numbers/"+item.a_h_team_uid+".svg":"/images/qn-icon-empty.svg"} className="left-img" alt="" width="35" />
                                                                <div className="last3game-text">{findShortName(item.a_h_team_name)}</div>
                            	                            </div>
                            	                            <div className="score-box1">{item.a_a_home_score}-{item.a_a_away_score}</div>
                                                            <div className="last-3-game-right bg-light-blue">
                                	                            <img src={item.a_a_team_uid?"/images/football-shirts/numbers/"+item.a_a_team_uid+".svg":"/images/qn-icon-empty.svg"} className="left-img" alt="" width="35" />
                                	                            <div className="last3game-text">{findShortName(item.a_a_team_name)}</div>
                                                            </div>
                                                </div>
                                })
                                }

                            </div>
                </div>
                <div className="space-5"></div>
                        <div className="bg-blue row no-margin">
                            <h3 className="">TOP SCORERS</h3>
                        </div>
                        <div className="space-5"></div>
                <div className="row no-margin">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                        {
                        this.state.Htop_scorers.map(function(item,index){
                        return <div className="last-3-game" key={index}>
                                                <img className="top-score-timg margin-right-10" width="40" src={self.state.team_stat[1]['h_team_uid']?"/images/football-shirts/numbers/"+self.state.team_stat[1]['h_team_uid']+".svg":"/images/qn-icon-empty.svg"} />
                            	                <div className="capsle-top-score"><span>{item.h_goals_scored}</span><img src="/images/profile-4.png" width="40" /></div>
                                                <div className="capsle-top-score-right bg-light-blue">
                                	                <div className="top-score-text">{item.h_player_name}</div>
                                                </div>
                                    </div>

                        })
                        }
                   </div>

                   <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>
                           <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center no-padding-left">
                               <div className="hidden-xs"><div className="opta-vline"></div></div>
                               {
                                   this.state.Atop_scorers.map(function(item,index){
                               return   <div className="last-3-game" key={index}>
                            	                        <div className="capsle-top-score-left bg-light-blue">
                                	                        <div className="top-score-text">{item.a_player_name}</div>
                            	                        </div>
                                                        <div className="capsle-top-score2"><img src="/images/profile-1.png" width="40" /><span>{item.a_goals_scored}</span></div>
                                                        <img className="top-score-timg margin-left-10" width="40" src={self.state.team_stat[2]['a_team_uid']?"/images/football-shirts/numbers/"+self.state.team_stat[2]['a_team_uid']+".svg":"/images/qn-icon-empty.svg"} />
                                        </div>
                               })
                               }
                           </div>
              </div>
                <div className="modal-footer">
                    <p className="ntr-txt text-center underline no-margin-bottom" data-dismiss="modal">Close</p>
                </div>
          </div>
        </div>
     </div>
    </div>
)
    }
            });

        //**********---- Component for discipline OPTA popup ----**********
        var OptaPopupDiscipline = React.createClass({
            getInitialState: function () {
                return {
                    team_stat:[],
                    Alast_3_games:[],
                    Hlast_3_games:[],
                    previous_meetings:[],
                    Atop_card:[],
                    Htop_card:[]
                };
            },
            componentWillMount: function () {
        var eid = this.props.eid
        this.serverRequest = $.get(baseurl+"opta/discipline/"+eid, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            last_away=[];
            last_home=[];
            for(i=0;i<result.last_3_games.length;i++)
            {
                var k = Object.keys(result.last_3_games[i]);
                var isA = k[0].startsWith('a');
                var isH = k[0].startsWith('h');
                if(isA)
                {
                    last_away.push(result.last_3_games[i])
                }
                else{
                    last_home.push(result.last_3_games[i])
                }
            }
            var cards_away=[];
            var cards_home=[];
            for(i=0;i<result.top_card_holders.length;i++)
            {
                var k = Object.keys(result.top_card_holders[i]);
                var isA = k[0].startsWith('a');
                var isH = k[0].startsWith('h');
                if(isA)
                {
                    cards_away.push(result.top_card_holders[i])
                }
                else{
                    cards_home.push(result.top_card_holders[i])
                }
            }
            this.setState({team_stat:result.team_stat,Alast_3_games:last_away,Hlast_3_games:last_home,Atop_card:cards_away,Htop_card:cards_home})
            }.bind(this));
    },
    componentDidMount:function(){
        $(ReactDOM.findDOMNode(this)).modal('show');
        $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideOpta);
    },
    render: function () {
    var self =this;
        return (
                <div className="modal fade animated bounce" id="opta-discipline" tabIndex="-3" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static">
                    <div className="modal-dialog " role="document">
                        <div className="modal-content BuyTicketModal">
                            <div className="modal-header opta-header">

                                {this.state.team_stat.length>0?<div className="row text-center">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                    <img src="/images/close-icon.svg" data-dismiss="modal" className="pointer-hand pull-right" width="25" />
                                    <span className="stats margin-right-10">STATS</span><span className="powered-by padding-right-5">powered by </span><img src="/images/opta-bg.png" alt="" width="85" className="" />
                                </div>
                                </div>:''}
                            </div>
                            <div className="modal-body no-padding">

                                <div className="bg-blue row no-margin">
                                    <h3 className="">DISCIPLINE</h3>
                                </div>
                                <div className="space-5"></div>
                                {this.state.team_stat.length>0?<div className="">

                                    <div className="row">
            	                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center">
                	                        <div className="leaderboard-team lb-home-team">
                    	                        <img src={this.state.team_stat[1]['h_team_uid']?"/images/football-shirts/numbers/"+this.state.team_stat[1]['h_team_uid']+".svg":"/images/qn-icon-empty.svg"} />
                                                <span className="lb-team-name mon-txt">{findShortName(this.state.team_stat[1]['h_team_name'])}</span>
                                                <div className="sm-txt text-center games-played"><div className="d-block-m">(home)</div><div className="">{this.state.team_stat[1]['h_game_count']} games played</div></div>
                	                        </div>

            	                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 hidden-xs">
                                            <div>
                                                <div className="comparison bg-light-blue">
                                                    <div className="comp-left">
                                                        <img src="/images/opta-icons/foulW.svg" className="left-img" alt="" width="35" />
                                                        <span>{this.state.team_stat[3]['h_fouls_wn_cnt']}</span>
                                                    </div>
                                                    <div className="comp-heading">Fouls won</div>
                                                    <div className="comp-right">
                                                        <span>{this.state.team_stat[3]['a_fouls_wn_cnt']}</span>
                                                        <img src="/images/opta-icons/foulW.svg" className="right-img" alt="" width="35" />
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                                    <div className="comp-left">
                                                        <img src="/images/opta-icons/foulC.svg" className="left-img" alt="" width="35" />
                                                        <span>{this.state.team_stat[4]['h_fouls_conc_cnt']}</span>
                                                    </div>
                                                    <div className="comp-heading">Fouls conceded</div>
                                                    <div className="comp-right">
                                                        <span>{this.state.team_stat[4]['a_fouls_conc_cnt']}</span>
                                                        <img src="/images/opta-icons/foulC.svg" className="right-img" alt="" width="35" />
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                                    <div className="comp-left">
                                                        <img src="/images/opta-icons/card_y.svg" className="left-img" alt="" width="35" />
                                                        <span>{this.state.team_stat[5]['h_yel_crd_cnt']}</span>
                                                    </div>
                                                    <div className="comp-heading">Yellow cards</div>
                                                    <div className="comp-right">
                                                        <span>{this.state.team_stat[5]['a_yel_crd_cnt']}</span>
                                                        <img src="/images/opta-icons/card_y.svg" className="right-img" alt="" width="35" />
                                                    </div>
                                                </div>
                                                <div className={this.state.team_stat[6]['h_red_crd_cnt'] > 0?"comparison bg-dark-blue":"comparison bg-dark-blue hide"}>
                                                    <div className="comp-left">
                                                        <img src="/images/opta-icons/card_r.svg" className="left-img" alt="" width="35" />
                                                        <span>{this.state.team_stat[6]['h_red_crd_cnt']}</span>
                                                    </div>
                                                    <div className="comp-heading">Red cards</div>
                                                    <div className="comp-right">
                                                        <span>{this.state.team_stat[6]['a_red_crd_cnt']}</span>
                                                        <img src="/images/opta-icons/card_r.svg" className="right-img" alt="" width="35" />
                                                    </div>
                                                </div>
                                                <div className={this.state.team_stat[6]['h_red_crd_cnt'] > 0? "comparison bg-light-blue":"comparison bg-dark-blue"}>
                                                    <div className="comp-left">
                                                        <img src="/images/opta-icons/offside.svg" className="left-img" alt="" width="35" />
                                                        <span>{this.state.team_stat[7]['h_offsides_cnt']}</span>
                                                    </div>
                                                    <div className="comp-heading">Offsides</div>
                                                    <div className="comp-right">
                                                        <span>{this.state.team_stat[7]['a_offsides_cnt']}</span>
                                                        <img src="/images/opta-icons/offside.svg" className="right-img" alt="" width="35" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center">
                	                        <div className="leaderboard-team lb-away-team">
                    	                        <img src={this.state.team_stat[2]['a_team_uid']?"/images/football-shirts/numbers/"+this.state.team_stat[2]['a_team_uid']+".svg":"/images/qn-icon-empty.svg"} />
                                                <span className="lb-team-name mon-txt">{findShortName(this.state.team_stat[2]['a_team_name'])}</span>
                	                            <div className="sm-txt text-center games-played"><div className="d-block-m">(away)</div><div className="">{this.state.team_stat[2]['a_game_count']} games played</div></div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="space-5"></div>
                                    <div className="row no-margin visible-xs">
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-centered text-center">
                                            <div>
                                                <div className="comparison bg-light-blue">
                                                    <div className="comp-left">
                                                        <img src="/images/opta-icons/foulW.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[3]['h_fouls_wn_cnt']}</span>
                                                    </div>
                                                    <div className="comp-heading">Fouls won</div>
                                                    <div className="comp-right">
                                                        <span>{this.state.team_stat[3]['a_fouls_wn_cnt']}</span>
                                                        <img src="/images/opta-icons/foulW.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                                    <div className="comp-left">
                                                        <img src="/images/opta-icons/foulC.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[4]['h_fouls_conc_cnt']}</span>
                                                    </div>
                                                    <div className="comp-heading">Fouls conceded</div>
                                                    <div className="comp-right">
                                                        <span>{this.state.team_stat[4]['a_fouls_conc_cnt']}</span>
                                                        <img src="/images/opta-icons/foulC.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                                    <div className="comp-left">
                                                        <img src="/images/opta-icons/card_y.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[5]['h_yel_crd_cnt']}</span>
                                                    </div>
                                                    <div className="comp-heading">Yellow cards</div>
                                                    <div className="comp-right">
                                                        <span>{this.state.team_stat[5]['a_yel_crd_cnt']}</span>
                                                        <img src="/images/opta-icons/card_y.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                                    <div className="comp-left">
                                                        <img src="/images/opta-icons/card_r.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[6]['h_red_crd_cnt']}</span>
                                                    </div>
                                                    <div className="comp-heading">Red cards</div>
                                                    <div className="comp-right">
                                                        <span>{this.state.team_stat[6]['a_red_crd_cnt']}</span>
                                                        <img src="/images/opta-icons/card_r.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                                    <div className="comp-left">
                                                        <img src="/images/opta-icons/offside.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[7]['h_offsides_cnt']}</span>
                                                    </div>
                                                    <div className="comp-heading">Offsides</div>
                                                    <div className="comp-right">
                                                        <span>{this.state.team_stat[7]['a_offsides_cnt']}</span>
                                                        <img src="/images/opta-icons/offside.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>:''}
                            <div className="space-5"></div>
                            <div className="bg-blue row no-margin">
                                <h3 className="">LAST 3 GAMES</h3>
                            </div>
                            <div className="space-5"></div>
                                <div className="row no-margin">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                                            {
                                                this.state.Hlast_3_games.map(function(item,index){

                                                 return  <div className="last-3-game" key={index}>
                            	                            <div className="last-3-game-left-dead-ball bg-light-blue last-3-discipline">
                                	                            <img src={item.h_h_team_uid?"/images/football-shirts/numbers/"+item.h_h_team_uid+".svg":"/images/qn-icon-empty.svg"} className="dead-ball-img-left" alt="" width="35"/>
                                                                <div className="last3game-left-text discipline-y-card">
                                    	                            <span className="lst3-middle"><img src="/images/opta-icons/card_y.svg" width="25"/>{item.h_h_yel_cnt}</span>
                                                                    <span className={item.h_h_red_cnt>0?"lst3-middle":"lst3-middle hide"}><img src="/images/opta-icons/card_r.svg" width="25" />{item.h_h_red_cnt}</span>
                                                                </div>
                            	                            </div>
                            	                            <div className="opta-v-divider"></div>
                                                            <div className="last-3-game-right-dead-ball bg-light-blue last-3-discipline">
                                	                            <img src={item.h_a_team_uid?"/images/football-shirts/numbers/"+item.h_a_team_uid+".svg":"/images/qn-icon-empty.svg"} className="dead-ball-img-right" alt="" width="35"/>
                                	                            <div className="last3game-right-text discipline-y-card">
                                    	                            <span className={item.h_a_red_cnt>0?"lst3-middle":"lst3-middle hide"}>{item.h_a_red_cnt}<img src="/images/opta-icons/card_r.svg" width="25"/></span>
                                                                    <span className="lst3-middle">{item.h_a_yel_cnt}<img src="/images/opta-icons/card_y.svg" width="25"/></span>
                                	                            </div>
                                                            </div>
                        	                            </div>
                                            })
                                        }
                                    </div>
                                    <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center no-padding-left">
                                        <div className="hidden-xs"><div className="opta-vline"></div></div>
                                        {
                                            this.state.Alast_3_games.map(function(item,index){

                                                    return  <div className="last-3-game" key={index}>
                                                                <div className="last-3-game-left-dead-ball bg-light-blue last-3-discipline">
                                                                    <img src={item.a_h_team_uid?"/images/football-shirts/numbers/"+item.a_h_team_uid+".svg":"/images/qn-icon-empty.svg"} className="dead-ball-img-left" alt="" width="35"/>
                                                                    <div className="last3game-left-text discipline-y-card">
                                                                        <span className="lst3-middle"><img src="/images/opta-icons/card_y.svg" width="25"/>{item.a_h_yel_cnt}</span>
                                                                        <span className={item.a_h_red_cnt>0?"lst3-middle":"lst3-middle hide"}><img src="/images/opta-icons/card_r.svg" width="25"/>{item.a_h_red_cnt}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="opta-v-divider"></div>
                                                                <div className="last-3-game-right-dead-ball bg-light-blue last-3-discipline">
                                                                    <img src={item.a_a_team_uid?"/images/football-shirts/numbers/"+item.a_a_team_uid+".svg":"/images/qn-icon-empty.svg"} className="dead-ball-img-right" alt="" width="35"/>
                                                                    <div className="last3game-right-text discipline-y-card">
                                                                        <span className={item.a_a_red_cnt>0?"lst3-middle":"lst3-middle hide"}>{item.a_a_red_cnt}<img src="/images/opta-icons/card_r.svg" width="25" /></span>
                                                                        <span className="lst3-middle">{item.a_a_yel_cnt}<img src="/images/opta-icons/card_y.svg" width="25"/></span>

                                                                    </div>
                                                                </div>
                                                            </div>

                                         })
                                     }
                                </div>
                             </div>
                             <div className="space-5"></div>
                             <div className="bg-blue row no-margin">
                                <h3 className="">TOP CARDED</h3>
                             </div>
                                <div className="space-5"></div>
                                    <div className="row no-margin">
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                                            {
                                                    this.state.Htop_card.map(function(item,index){

                                                  return <div className="last-3-game" key={index}>
                                                            <img className="top-score-timg margin-right-10" src={self.state.team_stat[1]['h_team_uid']?"/images/football-shirts/numbers/"+self.state.team_stat[1]['h_team_uid']+".svg":"/images/qn-icon-empty.svg"} width="40"/>
                            	                            <div className="capsle-top-score"><span>{item.h_cnt_of_crd}</span><img src="/images/profile-1.png" width="40" /></div>
                                                            <div className="capsle-top-score-right bg-light-blue">
                                	                            <div className="top-score-text">{item.h_player_name}</div>
                                                            </div>
                                                         </div>

                                                })
                                            }
                                        </div>
                                        <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center no-padding-left">
                                            <div className="hidden-xs"><div className="opta-vline"></div></div>
                                            {
                                                    this.state.Atop_card.map(function(item,index){

                                                     return <div className="last-3-game" key={index}>
                                                                <div className="capsle-top-score-left bg-light-blue">
                                	                                <div className="top-score-text">{item.a_player_name}</div>
                                                                </div>
                                                                <div className="capsle-top-score text-left"><img src="/images/profile-4.png" width="40" /><span>{item.a_cnt_of_crd}</span></div>
                                                                <img className="top-score-timg margin-left-10" src={self.state.team_stat[2]['a_team_uid']?"/images/football-shirts/numbers/"+self.state.team_stat[2]['a_team_uid']+".svg":"/images/qn-icon-empty.svg"} width="40"/>
                                                            </div>


                                                })
                                            }

                                        </div>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <p className="ntr-txt text-center underline no-margin-bottom" data-dismiss="modal">Close</p>
                            </div>
                        </div>
                    </div>
        </div>
     )
   }
});

 //**********---- Component for defence OPTA popup ----**********
 var OptaPopupDefence = React.createClass({
    getInitialState: function () {
        return {
                 team_stat:[],
                 Alast_3_games:[],
                 Hlast_3_games:[],
                 previous_meetings:[],
                 top_defenders:[]
               };
    },
    componentWillMount: function () {
        var eid = this.props.eid
        this.serverRequest = $.get(baseurl+"opta/defence/"+eid, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
             }
             last_away=[];
             last_home=[];
             for(i=0;i<result.last_3_games.length;i++) {
                  var k=Object.keys(result.last_3_games[i]);
                  var isA=k[0].startsWith('a');
                  var isH=k[0].startsWith('h');
                  if(isA)
                                                                   {
                                                                   last_away.push(result.last_3_games[i])
                                                                   }
                                                                   else{
                                                                   last_home.push(result.last_3_games[i])
                                                                   }
                                                                   }
                                                                   this.setState({team_stat:result.team_stat,Alast_3_games:last_away,Hlast_3_games:last_home,previous_meetings:result.previous_meetings,top_defenders:result.top_defenders})
                                                                   }.bind(this));
                                                                   },
                                                                   componentDidMount:function(){
                                                                   $(ReactDOM.findDOMNode(this)).modal('show');
                                                                   $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideOpta);
                                                                   },
                                                                   render: function () {
                                                                   var self=this;
                                                                   return (
                    <div className="modal fade animated bounce" id="opta-defence" tabIndex="-3" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static">
                      <div className="modal-dialog " role="document">
                        <div className="modal-content BuyTicketModal">
                          <div className="modal-header opta-header">

                	             {this.state.team_stat.length>0?<div className="row text-center">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                        <img src="/images/close-icon.svg" data-dismiss="modal" className="pointer-hand pull-right" width="25" />
                                        <span className="stats margin-right-10">STATS</span><span className="powered-by padding-right-5">powered by </span><img src="/images/opta-bg.png" alt="" width="85" className="" />
                                    </div>

                	             </div>:''}
                          </div>
                          <div className="modal-body no-padding">

                                <div className="bg-blue row no-margin">
                                    <h3 className="">DEFENCE</h3>
                                </div>
                                <div className="space-5"></div>
                                {this.state.team_stat.length>0?<div className="">
                                    <div className="row">
            	                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center">
                	                        <div className="leaderboard-team lb-home-team">
                    	                        <img src={this.state.team_stat[1]['h_team_uid']?"/images/football-shirts/numbers/"+this.state.team_stat[1]['h_team_uid']+".svg":"/images/qn-icon-empty.svg"} />
                                                <span className="lb-team-name mon-txt">{findShortName(this.state.team_stat[1]['h_team_name'])}</span>
                                                <div className="sm-txt text-center games-played"><div className="d-block-m">(home)</div><div className="">{this.state.team_stat[1]['h_game_count']} games played</div></div>
                	                        </div>

            	                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 hidden-xs">
                                            <div>
                            	                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/goalsC.svg" className="left-img" alt="" width="35" />
                                                        <span>{this.state.team_stat[3]['h_gls_con_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading"> Goals conceded</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[3]['a_gls_con_cnt']}</span>
                                                        <img src="/images/opta-icons/goalsC.svg" className="right-img" alt="" width="35" />
                                                    </div>
                            	                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/clean-sheet.svg" className="left-img" alt="" width="35" />
                                                        <span>{this.state.team_stat[4]['h_cln_sheets_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading">Clean sheets</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[4]['a_cln_sheets_cnt']}</span>
                                                        <img src="/images/opta-icons/clean-sheet.svg" className="right-img" alt="" width="35" />
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/shots-ontarget-faced.svg" className="left-img" alt="" width="35" />
                                                        <span>{this.state.team_stat[5]['h_sht_trg_fac_ct']}</span>
                                	                </div>
                                                    <div className="comp-heading">Shots faced on target</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[5]['a_sht_trg_fac_ct']}</span>
                                                        <img src="/images/opta-icons/shots-ontarget-faced.svg" className="right-img" alt="" width="35" />
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/tackleW.svg" className="left-img" alt="" width="35" />
                                                        <span>{this.state.team_stat[6]['h_tkl_won_per']}</span>
                                	                </div>
                                                    <div className="comp-heading">Tackles won (%)</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[6]['a_tkl_won_per']}</span>
                                                        <img src="/images/opta-icons/tackleW.svg" className="right-img" alt="" width="35" />
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/duel.svg" className="left-img" alt="" width="35" />
                                                        <span>{this.state.team_stat[7]['h_duel_won_per']}</span>
                                	                </div>
                                                    <div className="comp-heading">Duel lost</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[7]['a_duel_won_per']}</span>
                                                        <img src="/images/opta-icons/duel.svg" className="right-img" alt="" width="35" />
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/saves.svg" className="left-img" alt="" width="35" />
                                                        <span>{this.state.team_stat[8]['h_gl_kpr_sav_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading">Goal keeper saves</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[8]['a_gl_kpr_sav_cnt']}</span>
                                                        <img src="/images/opta-icons/saves.svg" className="right-img" alt="" width="35" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center">
                	                        <div className="leaderboard-team lb-away-team">
                    	                        <img src={this.state.team_stat[2]['a_team_uid']?"/images/football-shirts/numbers/"+this.state.team_stat[2]['a_team_uid']+".svg":"/images/qn-icon-empty.svg"} />
                                                <span className="lb-team-name mon-txt">{findShortName(this.state.team_stat[2]['a_team_name'])}</span>
                	                            <div className="sm-txt text-center games-played"><div className="d-block-m">(away)</div><div className="">{this.state.team_stat[2]['a_game_count']} games played</div></div>
                	                        </div>

                                        </div>
                                    </div>
                                    <div className="space-5"></div>
                                    <div className="row no-margin visible-xs">
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center col-centered">
                                            <div>
                            	                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/goalsC.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[3]['h_gls_con_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading"> Goals conceded</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[3]['a_gls_con_cnt']}</span>
                                                        <img src="/images/opta-icons/goalsC.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                            	                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/clean-sheet.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[4]['h_cln_sheets_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading">Clean sheets</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[4]['a_cln_sheets_cnt']}</span>
                                                        <img src="/images/opta-icons/clean-sheet.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/shots-ontarget-faced.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[5]['h_sht_trg_fac_ct']}</span>
                                	                </div>
                                                    <div className="comp-heading">Shots faced on target</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[5]['a_sht_trg_fac_ct']}</span>
                                                        <img src="/images/opta-icons/shots-ontarget-faced.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/tackleW.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[6]['h_tkl_won_per']}</span>
                                	                </div>
                                                    <div className="comp-heading">Tackles won (%)</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[6]['a_tkl_won_per']}</span>
                                                        <img src="/images/opta-icons/tackleW.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/duel.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[7]['h_duel_won_per']}</span>
                                	                </div>
                                                    <div className="comp-heading">Duel lost</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[7]['a_duel_won_per']}</span>
                                                        <img src="/images/opta-icons/duel.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/saves.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[8]['h_gl_kpr_sav_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading">Goal keeper saves</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[8]['a_gl_kpr_sav_cnt']}</span>
                                                        <img src="/images/opta-icons/saves.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>:''}

                                <div className="space-10"></div>

                                <div className="bg-blue row no-margin">
                                    <h3 className="">LAST 3 GAMES</h3>
                                </div>
                                <div className="space-5"></div>
                                <div className="row no-margin">
                     	            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                                         {
                                             this.state.Hlast_3_games.map(function(item,index){

                                                     return <div className="last-3-game" key={index}>
                            	                            <div className="last-3-game-left bg-light-blue">
                                	                            <img src={item.h_h_team_uid?"/images/football-shirts/numbers/"+item.h_h_team_uid+".svg":"/images/qn-icon-empty.svg"} className="left-img" alt="" width="35" />
                                                                <div className="last3game-text">{findShortName(item.h_h_team_name)}</div>
                            	                            </div>
                            	                            <div className="score-box1">{item.h_home_score}-{item.h_away_score}</div>
                                                            <div className="last-3-game-right bg-light-blue">
                                	                            <img src={item.h_a_team_uid?"/images/football-shirts/numbers/"+item.h_a_team_uid+".svg":"/images/qn-icon-empty.svg"} className="left-img" alt="" width="35" />
                                	                            <div className="last3game-text">{findShortName(item.h_a_team_name)}</div>
                                                            </div>
                                                     </div>

                                             })
                                         }

                     	            </div>
                                    <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center no-padding-left">
                                        <div className="hidden-xs"><div className="opta-vline"></div></div>
                                        {
                                            this.state.Alast_3_games.map(function(item,index){

                                                    return <div className="last-3-game" key={index}>
                            	                                    <div className="last-3-game-left bg-light-blue">
                                	                                    <img src={item.a_h_team_uid?"/images/football-shirts/numbers/"+item.a_h_team_uid+".svg":"/images/qn-icon-empty.svg"} className="left-img" alt="" width="35" />
                                                                        <div className="last3game-text">{findShortName(item.a_h_team_name)}</div>
                            	                                    </div>
                            	                                    <div className="score-box1">{item.a_home_score}-{item.a_away_score}</div>
                                                                    <div className="last-3-game-right bg-light-blue">
                                	                                    <img src={item.a_a_team_uid?"/images/football-shirts/numbers/"+item.a_a_team_uid+".svg":"/images/qn-icon-empty.svg"} className="left-img" alt="" width="35" />
                                	                                    <div className="last3game-text">{findShortName(item.a_a_team_name)}</div>
                                                                    </div>
                                                             </div>


                                            })
                                        }
                                    </div>
                                </div>
                                <div className="space-5"></div>

                                <div className="bg-blue row no-margin">
                                    <h3 className="">TOP DEFENDERS</h3>
                                </div>
                                <div className="space-5"></div>
                                {this.state.top_defenders.map(function(item,index){
                                    return <div className="row no-margin" key={index}>
                    	                <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12 text-center no-padding-right">
                                            <div className="last-3-game">
                                                <img src={self.state.team_stat[1]['h_team_uid']?"/images/football-shirts/numbers/"+self.state.team_stat[1]['h_team_uid']+".svg":"/images/qn-icon-empty.svg"} alt="" className="top-score-timg margin-right-10" width="40" />
                            	                <div className="capsle-top-score"><span>{item.h_cnt_of_eve}</span><img src="/images/profile-4.png" width="40"/></div>
                                                <div className="capsle-top-score-right bg-light-blue">
                                	                <div className="top-score-text">{item.h_player_name}</div>
                                                </div>
                                            </div>
                    	                </div>
                                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center no-padding">
								                <div className="top-defenders-text"> {item.event_type}</div>
                                        </div>
                                        <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12 text-center no-padding-left">
                                            <div className="last-3-game">
                                                <div className="capsle-top-score-left bg-light-blue">
                                	                <div className="top-score-text">{item.a_player_name}</div>
                                                </div>
                                                <div className="capsle-top-score text-left"><img src="/images/profile-1.png" width="40"/><span>{item.a_cnt_of_eve}</span></div>
                                                <img src={self.state.team_stat[2]['a_team_uid']?"/images/football-shirts/numbers/"+self.state.team_stat[2]['a_team_uid']+".svg":"/images/qn-icon-empty.svg"} alt="" className="top-score-timg margin-left-10" width="40" />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>
                                     </div>
                                })}


                          </div>
                          <div className="modal-footer">
                                <p className="ntr-txt text-center underline no-margin-bottom" data-dismiss="modal">Close</p>
                          </div>

                        </div>
                      </div>
                    </div>
            )
        }
});

        //**********---- Component for deadball OPTA popup ----**********
        var OptaPopupDeadball = React.createClass({
            getInitialState: function () {
        return {
            team_stat:[],
            last_3_games:[],
            Hlast_3_games:[],
            Alast_3_games:[],
            previous_meetings:[],
            top_score:[],
            Atop_score:[],
            Htop_score:[]
        };
    },
    componentWillMount: function () {
        var eid = this.props.eid
        this.serverRequest = $.get(baseurl+"opta/deadball/"+eid, function (items) {
            if (typeof items != 'object') {
                items = JSON.parse(items)
            }
            last_away=[];
            last_home=[];
            for(i=0;i<items.last_3_games.length;i++)
            {
                var k = Object.keys(items.last_3_games[i]);
                var isA = k[0].startsWith('a');
                var isH = k[0].startsWith('h');
                if(isA)
                {
                    last_away.push(items.last_3_games[i])
                }
                else{
                    last_home.push(items.last_3_games[i])
                }
            }
            var scores_away=[];
            var scores_home=[];
            for(i=0;i<items.top_pass_accuracy.length;i++)
            {
                var k = Object.keys(items.top_pass_accuracy[i]);
                var isA = k[0].startsWith('a');
                var isH = k[0].startsWith('h');
                if(isA)
                {
                    scores_away.push(items.top_pass_accuracy[i])
                }
                else{
                    scores_home.push(items.top_pass_accuracy[i])
                }
            }
            this.setState({team_stat:items.team_stat,Alast_3_games:last_away,Hlast_3_games:last_home,Atop_score:scores_away,Htop_score:scores_home})
            }.bind(this));
        },
    componentDidMount:function(){
        $(ReactDOM.findDOMNode(this)).modal('show');
        $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideOpta);
    },
    render: function () {
        var self =this;
        return (
                   <div className="modal fade animated bounce" id="opta-dead-ball" tabIndex="-3" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static">
                      <div className="modal-dialog " role="document">
                        <div className="modal-content BuyTicketModal">
                          <div className="modal-header opta-header">
                              {this.state.team_stat.length>0? <div className="row text-center">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                        <img src="/images/close-icon.svg" data-dismiss="modal" className="pointer-hand pull-right" width="25" />
                                        <span className="stats margin-right-10">STATS</span><span className="powered-by padding-right-5">powered by </span><img src="/images/opta-bg.png" alt="" width="85" className="" />
                                    </div>

                	             </div>:''}
                          </div>
                          <div className="modal-body no-padding">
                                <div className="bg-blue row no-margin">
                                    <h3 className="">DEAD BALL</h3>
                                </div>
                                <div className="space-5"></div>
                                {this.state.team_stat.length>0?<div className="">
                                    <div className="row">
            	                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center">
                	                        <div className="leaderboard-team lb-home-team">
                    	                        <img src={this.state.team_stat[1]['h_team_uid']?"/images/football-shirts/numbers/"+this.state.team_stat[1]['h_team_uid']+".svg":"/images/qn-icon-empty.svg"} />
                                                <span className="lb-team-name mon-txt">{findShortName(this.state.team_stat[1]['h_team_name'])}</span>
                                                <div className="sm-txt text-center games-played"><div className="d-block-m">(home)</div><div className="">{this.state.team_stat[1]['h_game_count']} games played</div></div>
                	                        </div>

            	                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center hidden-xs">
                                            <div>
                            	                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/corner.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[3]['h_corner_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading">Corners</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[3]['a_corner_cnt']}</span>
                                                        <img src="/images/opta-icons/corner.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                            	                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/throw-in.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[4]['h_throw_in_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading"> Throw-ins</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[4]['a_throw_in_cnt']}</span>
                                                        <img src="/images/opta-icons/throw-in.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/cornerC.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[5]['h_crnr_conc_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading">Corners conceded</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[5]['a_crnr_conc_cnt']}</span>
                                                        <img src="/images/opta-icons/cornerC.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/throw-inC.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[6]['h_throwin_conc_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading"> Throw-ins conceded</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[6]['a_throwin_conc_cnt']}</span>
                                                        <img src="/images/opta-icons/throw-inC.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/crossac.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[7]['h_crs_acc_per']}</span>
                                	                </div>
                                                    <div className="comp-heading"> Cross accuracy (%)</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[7]['a_crs_acc_per']}</span>
                                                        <img src="/images/opta-icons/crossac.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/pass.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[8]['h_pass_acc_per']}</span>
                                	                </div>
                                                    <div className="comp-heading">Pass accuracy (%)</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[8]['a_pass_acc_per']}</span>
                                                        <img src="/images/opta-icons/pass.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center">
                	                        <div className="leaderboard-team lb-away-team">
                    	                        <img src={this.state.team_stat[2]['a_team_uid']?"/images/football-shirts/numbers/"+this.state.team_stat[2]['a_team_uid']+".svg":"/images/qn-icon-empty.svg"} />
                                                <span className="lb-team-name mon-txt">{findShortName(this.state.team_stat[2]['a_team_name'])}</span>
                	                            <div className="sm-txt text-center games-played"><div className="d-block-m">(away)</div><div className="">{this.state.team_stat[2]['a_game_count']} games played</div></div>
                	                        </div>

                                        </div>
                                    </div>
                                    <div className="space-5"></div>

                                    <div className="row no-margin visible-xs">
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center col-centered">
                                            <div>
                            	                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/corner.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[3]['h_corner_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading">Corners</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[3]['a_corner_cnt']}</span>
                                                        <img src="/images/opta-icons/corner.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                            	                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/throw-in.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[4]['h_throw_in_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading"> Throw-ins</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[4]['a_throw_in_cnt']}</span>
                                                        <img src="/images/opta-icons/throw-in.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/cornerC.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[5]['h_crnr_conc_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading">Corners conceded</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[5]['a_crnr_conc_cnt']}</span>
                                                        <img src="/images/opta-icons/cornerC.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/throw-inC.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[6]['h_throwin_conc_cnt']}</span>
                                	                </div>
                                                    <div className="comp-heading"> Throw-ins conceded</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[6]['a_throwin_conc_cnt']}</span>
                                                        <img src="/images/opta-icons/throw-inC.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-light-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/crossac.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[7]['h_crs_acc_per']}</span>
                                	                </div>
                                                    <div className="comp-heading"> Cross accuracy (%)</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[7]['a_crs_acc_per']}</span>
                                                        <img src="/images/opta-icons/crossac.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                                <div className="comparison bg-dark-blue">
                                	                <div className="comp-left">
                                    	                <img src="/images/opta-icons/pass.svg" className="left-img" alt="" width="35"/>
                                                        <span>{this.state.team_stat[8]['h_pass_acc_per']}</span>
                                	                </div>
                                                    <div className="comp-heading">Pass accuracy (%)</div>
                                                    <div className="comp-right">
                                    	                <span>{this.state.team_stat[8]['a_pass_acc_per']}</span>
                                                        <img src="/images/opta-icons/pass.svg" className="right-img" alt="" width="35"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>:''}
                                <div className="space-10"></div>
                                <div className="bg-blue row no-margin">
                                    <h3 className="">LAST 3 GAMES</h3>
                                </div>
                                 <div className="space-5"></div>
                                <div className="row no-margin">
                     	            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                                         {
                                             this.state.Hlast_3_games.map(function(item,index){
                                                     return <div className="last-3-game" key={index}>
                            	                                <div className="last-3-game-left-dead-ball bg-light-blue">
                                	                                <img src={item.h_h_team_uid?"/images/football-shirts/numbers/"+item.h_h_team_uid+".svg":"/images/qn-icon-empty.svg"} className="dead-ball-img-left" alt="" width="35" />
                                                                    <div className="last3game-left-text">
                                    	                                <span className="lst3-middle"><img src="/images/opta-icons/throw-in.svg" width="25" />{item.h_h_cor_cnt}</span>
                                                                        <span className="lst3-middle"><img src="/images/opta-icons/corner.svg" width="25" />{item.h_h_tr_in_cnt}</span>
                                                                    </div>
                            	                                </div>
                            	                                <div className="opta-v-divider"></div>
                                                                <div className="last-3-game-right-dead-ball bg-light-blue">
                                	                                <img src={item.h_a_team_uid?"/images/football-shirts/numbers/"+item.h_a_team_uid+".svg":"/images/qn-icon-empty.svg"} className="dead-ball-img-left" alt="" width="35" />
                                	                                <div className="last3game-right-text">
                                    	                                <span className="lst3-middle">{item.h_a_cor_cnt}<img src="/images/opta-icons/throw-in.svg" width="25" /></span>
                                                                        <span className="lst3-middle">{item.h_a_tr_in_cnt}<img src="/images/opta-icons/corner.svg" width="25" /></span>
                                	                                </div>
                                                                </div>
                                                             </div>


                                             })
                                         }

                     	            </div>
                                    <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center no-padding-left">
                                        <div className="hidden-xs"><div className="opta-vline"></div></div>
                                        {
                                            this.state.Alast_3_games.map(function(item,index){

                                                    return <div className="last-3-game" key={index}>
                            	                                <div className="last-3-game-left-dead-ball bg-light-blue">
                                	                                <img src={item.a_h_team_uid?"/images/football-shirts/numbers/"+item.a_h_team_uid+".svg":"/images/qn-icon-empty.svg"} className="dead-ball-img-left" alt="" width="35" />
                                                                    <div className="last3game-left-text">
                                    	                                <span className="lst3-middle"><img src="/images/opta-icons/throw-in.svg" width="25" />{item.a_h_cor_cnt}</span>
                                                                        <span className="lst3-middle"><img src="/images/opta-icons/corner.svg" width="25" />{item.a_h_tr_in_cnt}</span>
                                                                    </div>
                            	                                </div>
                            	                                <div className="opta-v-divider"></div>
                                                                <div className="last-3-game-right-dead-ball bg-light-blue">
                                	                                <img src={item.a_a_team_uid?"/images/football-shirts/numbers/"+item.a_a_team_uid+".svg":"/images/qn-icon-empty.svg"} className="dead-ball-img-right" alt="" width="35" />
                                	                                <div className="last3game-right-text">
                                    	                                <span className="lst3-middle">{item.a_a_cor_cnt}<img src="/images/opta-icons/throw-in.svg" width="25" /></span>
                                                                        <span className="lst3-middle">{item.a_a_tr_in_cnt}<img src="/images/opta-icons/corner.svg" width="25" /></span>
                                	                                </div>
                                                                </div>
                                                    </div>


                                            })
                                        }

                                    </div>
                                </div>

                                {/*<div className="bg-blue row no-margin">
                                    <h3 className="">TOP CROSSING ACCURACY</h3>
                                </div>
                                <div className="space-5"></div>
                                <div className="row no-margin">
                    	            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                                        {
                                            this.state.Htop_score.map(function(item,index){
                                                        return <div className="last-3-game" key={index}>
                            	                                    <img src="/images/football-shirts/numbers/114.svg" alt="" className="top-score-timg margin-right-10" width="40" />
                                                                    <div className="capsle-top-score"><span>{item.h_acc_ps_per}</span><img src="/images/profile-4.png" width="40" /></div>
                                                                    <div className="capsle-top-score-right bg-light-blue">
                                	                                    <div className="top-score-text">{item.h_player_name}</div>
                                                                    </div>
                                                                </div>
                                            })
                                        }
                    	            </div>
                                    <div className="col-xs-12 visible-xs"><div className="opta-line"></div></div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                                        {
                                             this.state.Atop_score.map(function(item,index){

                                             return <div className="last-3-game"  key={index}>
                                                        <div className="capsle-top-score-left bg-light-blue">
                                	                        <div className="top-score-text">{item.a_player_name}</div>
                                                        </div>
                                                        <div className="capsle-top-score"><img src="/images/profile-1.png" width="40" />{item.a_acc_ps_per}</div>
                                                        <img src="/images/football-shirts/numbers/114.svg" alt="" className="top-score-timg margin-left-10" width="40" />
                                                    </div>


                                            })
                                        }

                                    </div>
                                </div>*/}

                          </div>
                          <div className="modal-footer">
                                <p className="ntr-txt text-center underline no-margin-bottom" data-dismiss="modal">Close</p>
                          </div>
                        </div>
                      </div>
                    </div>
            )
        }
    });

        // function to set slider value when number on scale is clicked
        $(document).on('click', '.scale ins', function (event) { // Function to make labels in (slider with labels) clickable
            var val = $(event.target).html();
            //if (val == '6+') {
            //    val = '6'
            //}
            //$('.single-slider').jRange('setValue', val);
            var id = $(this).closest('.slider-container').siblings('.single-slider').attr('id');
            if(isNaN(val))
            {
                var v = val.split('+');
                val=v[0];
            }
            $('#'+id).jRange('setValue', val);
        });
        // function to set slider value when plus is clicked
        $(document).on('click','.icon-plus',function(event){

            var id = $(this).closest('.slider-container').siblings('.single-slider2').attr('id');
            var val = (parseInt($('#'+id).jRange('getValue')) +1)
            $('#'+id).jRange('setValue', ""+val);
        });

        // function to set slider value when minus is clicked
        $(document).on('click','.icon-minus',function(event){

            var id = $(this).closest('.slider-container').siblings('.single-slider2').attr('id');
            var val = parseInt($('#'+id).jRange('getValue')) -1
            $('#'+id).jRange('setValue', ""+val);
        });
        function findShortName(lname) { //Function to convert long team names to short names
            var teamNames = [
                {
                    lname: "AFC Bournemouth",
                    sname: "B'mouth"
                },
                {
                    lname: "Arsenal",
                    sname: "Arsenal"
                },
                {
                    lname: "Aston Villa",
                    sname: "A Villa"
                },
                {
                    lname: "Chelsea",
                    sname: "Chelsea"
                }, {
                    lname: "Crystal Palace",
                    sname: "C Palace"
                },
                {
                    lname: "Everton ",
                    sname: "Everton"
                },
                {
                    lname: "Leicester City",
                    sname: "Leicester"
                }, {
                    lname: "Liverpool",
                    sname: "Liverpool"
                },
                {
                    lname: "Manchester City",
                    sname: "Man City"
                },
                {
                    lname: "Manchester United",
                    sname: "Man Utd"
                },
                {
                    lname: "Newcastle United",
                    sname: "Newcastle"
                },
                {
                    lname: "Norwich City",
                    sname: "Norwich"
                },
                {
                    lname: "Southampton",
                    sname: "So'ton"
                }, {
                    lname: "Stoke City",
                    sname: "Stoke"
                },
                {
                    lname: "Sunderland",
                    sname: "S'Land"
                },
                {
                    lname: "Swansea City",
                    sname: "Swansea"
                },
                {
                    lname: "Tottenham Hotspur",
                    sname: "Tottenham"
                },
                {
                    lname: "Watford",
                    sname: "Watford"
                },
                {
                    lname: "West Bromwich Albion",
                    sname: "W Brom"
                },
                {
                    lname: "West Ham United",
                    sname: "West Ham"
                }

            ];
            var filterdata = teamNames.filter(function (d) {
                return d.lname == lname;
            });
            //console.log("filterdata==",filterdata)
            if (filterdata.length > 0) {
                return filterdata[0]['sname'];
            }
            else {
                return lname;
            }
        }

//**********--- Component to display Questions ---**********
//var Questions= React.createClass({



//    render: function () {
//        return (
//        <div>
//          <div className="container">
//		<div className="space-5"></div>
//        <div className="row">
//        	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
//               <h3 className="no-margin-bottom">No zoola game likes to be empty</h3>
//               <span className="font-20 text-center">Please answer the questions to enter the first ticket.</span>
//        	</div>
//        </div>
//		<div className="space-10"></div>
// 		<div className="row">

//            <div className="panel-body">
//                <div className="game-qns bg-light-blue">
//                    <div className="row">
//                        <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 padding-top-20 text-center">
//                            <span className="number"> 1 </span> <img className="number-img" src="/images/qn-icon-goal.svg" />

//                        </div>
//                        <div className="col-lg-1 col-md-2 col-sm-1 col-xs-12 text-left padding-top-20 padding-bottom-20">
//                            <span className="view-stats pointer-hand" data-toggle="modal" data-target="#stats-opta"><div className="left"><img src="/images/opta.png" /></div><div className="right border-radius-bottom">STATS</div> </span>

//                        </div>

//                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 med-cop1 padding-top-10">
//                            <span className="game-question">How many goals will there be? </span>
//                        </div>
//                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 visible-md visible-lg text-center padding-bottom-10">
//                            <input type="hidden" className="single-slider" value="23" />
//                        </div>
//                        <div className="col-lg-5 col-md-5 col-sm-4 col-xs-6 visible-sm visible-xs text-center">
//                            <div className="zoola-select">
//                                <select>
//                                    <option></option>
//                                    <option className="pointer-hand">Southampton vs West Ham</option>
//                                    <option className="pointer-hand">Manchester United vs Manchester City</option>
//                                    <option className="pointer-hand">Everton vs Stoke</option>
//                                    <option className="pointer-hand">Tottenham Hotspur vs AFC Bournemouth</option>
//                                    <option className="pointer-hand">Norwich vs Crystal Palace</option>
//                                </select>
//                            </div>
//                        </div>

//                    </div>

//                </div>
//                <div className="game-qns ">
//                    <div className="row">
//                        <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 padding-top-20 text-center">
//                            <span className="number"> 2 </span> <img className="number-img" src="/images/qn-icon-corner.svg" />

//                        </div>
//                        <div className="col-lg-1 col-md-2 col-sm-1 col-xs-12 text-left padding-top-20 padding-bottom-20">
//                            <span className="view-stats pointer-hand" data-toggle="modal" data-target="#opta-dead-ball"><div className="left"><img src="/images/opta.png" /></div><div className="right border-radius-bottom">STATS</div> </span>

//                        </div>

//                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 med-cop1 padding-top-10">
//                            <span className="game-question">In what minute will the first corner take place? </span>
//                        </div>
//                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 visible-md visible-lg text-center padding-bottom-10">
//                            <input type="hidden" className="single-slider2" value="23" />
//                        </div>
//                        <div className="col-lg-4 col-md-4 col-sm-2 col-xs-6 visible-sm visible-xs text-center">
//                            <div className="zoola-select">
//                                <select>
//                                    <option></option>
//                                    <option className="pointer-hand">Southampton vs West Ham</option>
//                                    <option className="pointer-hand">Manchester United vs Manchester City</option>
//                                    <option className="pointer-hand">Everton vs Stoke</option>
//                                    <option className="pointer-hand">Tottenham Hotspur vs AFC Bournemouth</option>
//                                    <option className="pointer-hand">Norwich vs Crystal Palace</option>
//                                </select>
//                            </div>
//                        </div>

//                    </div>

//                </div>
//                <div className="game-qns bg-light-blue">
//                    <div className="row">
//                        <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 padding-top-20 text-center">
//                            <span className="number"> 3 </span> <img className="number-img" src="/images/qn-icon-ycard.svg" />

//                        </div>
//                        <div className="col-lg-1 col-md-2 col-sm-1 col-xs-12 text-left padding-top-20 padding-bottom-20">
//                            <span className="view-stats pointer-hand" data-toggle="modal" data-target="#opta-defence"><div className="left"><img src="/images/opta.png" /></div><div className="right border-radius-bottom">STATS</div> </span>

//                        </div>

//                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 med-cop1 padding-top-10">
//                            <span className="game-question">Will there be a card? </span>
//                        </div>
//                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 visible-md visible-lg text-center padding-bottom-10">
//                            <div className="padding-top-20 zoola-toggle">
//                               <span className="med-cop1"> YES </span>

//                                    <input id="cmn-toggle-1" className="cmn-toggle cmn-toggle-round" type="checkbox"/>
//                                    <label for="cmn-toggle-1"></label>

//                                <span className="med-cop1"> NO </span>
//                            </div>
//                        </div>
//                        <div className="col-lg-4 col-md-4 col-sm-2 col-xs-6 visible-sm visible-xs text-center">
//                            <div className="zoola-select">
//                                <select>
//                                    <option></option>
//                                    <option className="pointer-hand">Southampton vs West Ham</option>
//                                    <option className="pointer-hand">Manchester United vs Manchester City</option>
//                                    <option className="pointer-hand">Everton vs Stoke</option>
//                                    <option className="pointer-hand">Tottenham Hotspur vs AFC Bournemouth</option>
//                                    <option className="pointer-hand">Norwich vs Crystal Palace</option>
//                                </select>
//                            </div>
//                        </div>

//                    </div>

//                </div>
//                <div className="game-qns ">
//                    <div className="row">
//                        <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 padding-top-20 text-center">
//                            <span className="number"> 4 </span> <img className="number-img" src="/images/qn-icon-ycard.svg" />

//                        </div>
//                        <div className="col-lg-1 col-md-2 col-sm-1 col-xs-12 text-left padding-top-20 padding-bottom-20">
//                            <span className="view-stats pointer-hand" data-toggle="modal" data-target="#opta-discipline"><div className="left"><img src="/images/opta.png" /></div><div className="right border-radius-bottom">STATS</div> </span>

//                        </div>

//                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 med-cop1 padding-top-10">
//                            <span className="game-question">Who will get the first yellow card? </span>
//                        </div>
//                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 visible-md visible-lg text-left">
//                            <div className="padding-top-20">
//                                <div className="time-tag-big"><div className="left ">home</div><div className="middle active">no card</div><div className="right ">away</div> </div>
//                            </div>
//                        </div>
//                        <div className="col-lg-4 col-md-4 col-sm-2 col-xs-6 visible-sm visible-xs text-center">
//                            <div className="zoola-select">
//                                <select>
//                                    <option></option>
//                                    <option className="pointer-hand">Southampton vs West Ham</option>
//                                    <option className="pointer-hand">Manchester United vs Manchester City</option>
//                                    <option className="pointer-hand">Everton vs Stoke</option>
//                                    <option className="pointer-hand">Tottenham Hotspur vs AFC Bournemouth</option>
//                                    <option className="pointer-hand">Norwich vs Crystal Palace</option>
//                                </select>
//                            </div>
//                        </div>

//                    </div>

//                </div>
//                <div className="game-qns bg-light-blue">
//                    <div className="row">
//                        <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 padding-top-20 text-center">
//                            <span className="number"> 5 </span> <img className="number-img" src="/images/qn-icon-goal.svg" />

//                        </div>
//                        <div className="col-lg-1 col-md-2 col-sm-1 col-xs-12 text-left padding-top-20 padding-bottom-20">
//                            <span className="view-stats pointer-hand" data-toggle="modal" data-target="#"><div className="left"><img src="/images/opta.png" /></div><div className="right border-radius-bottom">STATS</div> </span>

//                        </div>

//                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 med-cop1 padding-top-10">
//                            <span className="game-question">When will the first home save take place? </span>
//                        </div>
//                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 visible-md visible-lg text-left">
//                            <div className="padding-top-20 time-zoola">
//                                <div className="time-tags"><span className="time">01-15</span> mins</div>
//                                <div className="time-tags"><span className="time">01-15</span> mins</div>
//                                <div className="time-tags"><span className="time">01-15</span> mins</div>
//                                <div className="time-tags"><span className="time">01-15</span> mins</div>
//                            </div>

//                        </div>
//                        <div className="col-lg-4 col-md-4 col-sm-2 col-xs-6 visible-sm visible-xs text-center">
//                            <div className="zoola-select">
//                                <select>
//                                    <option></option>
//                                    <option className="pointer-hand">Southampton vs West Ham</option>
//                                    <option className="pointer-hand">Manchester United vs Manchester City</option>
//                                    <option className="pointer-hand">Everton vs Stoke</option>
//                                    <option className="pointer-hand">Tottenham Hotspur vs AFC Bournemouth</option>
//                                    <option className="pointer-hand">Norwich vs Crystal Palace</option>
//                                </select>
//                            </div>
//                        </div>

//                    </div>
//                </div>

//                <div className="game-qns ">
//                    <div className="row">
//                        <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 padding-top-20 text-center">
//                            <span className="number"> 6 </span> <img className="number-img" src="/images/qn-icon-corner.svg" />

//                        </div>
//                        <div className="col-lg-1 col-md-2 col-sm-1 col-xs-12 text-left padding-top-20 padding-bottom-20">
//                            <span className="view-stats pointer-hand" data-toggle="modal" data-target="#"><div className="left"><img src="/images/opta.png" /></div><div className="right border-radius-bottom">STATS</div> </span>

//                        </div>

//                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 med-cop1 padding-top-10">
//                            <span className="game-question">Which will be the first two events to occur? </span>
//                        </div>
//                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 visible-md visible-lg text-left">
//                            <div className="padding-top-10 first-events">
//                                <div className="close-tag">
//                                        <span className="close-icon">&nbsp; &nbsp; &nbsp;</span>
//                                        <span className="med-cop2">2nd corner</span>
//                                </div>
//                                 <div className="close-tag">
//                                        <span className="close-icon"><img src="images/close-icon-15.svg" /></span>
//                                        <span className="med-cop2 ">1st card</span>
//                                 </div>
//                                 <div className="close-tag">
//                                        <span className="close-icon"><img src="images/close-icon-15.svg" /></span>
//                                        <span className="med-cop2 ">5th throw in</span>
//                                 </div>
//                                 <div className="close-tag">
//                                        <span className="close-icon">&nbsp; &nbsp; &nbsp;</span>
//                                        <span className="med-cop2 ">2nd foul</span>
//                                 </div>
//                            </div>

//                        </div>
//                        <div className="col-lg-4 col-md-4 col-sm-2 col-xs-6 visible-sm visible-xs text-center">
//                            <div className="zoola-select">
//                                <select>
//                                    <option></option>
//                                    <option className="pointer-hand">Southampton vs West Ham</option>
//                                    <option className="pointer-hand">Manchester United vs Manchester City</option>
//                                    <option className="pointer-hand">Everton vs Stoke</option>
//                                    <option className="pointer-hand">Tottenham Hotspur vs AFC Bournemouth</option>
//                                    <option className="pointer-hand">Norwich vs Crystal Palace</option>
//                                </select>
//                            </div>
//                        </div>

//                    </div>

//                </div>

//                <div className="game-qns bg-light-blue">
//                    <div className="row">
//                        <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 padding-top-20 text-center">
//                            <span className="number"> 7 </span> <img className="number-img" src="/images/qn-icon-goal.svg" />

//                        </div>
//                        <div className="col-lg-1 col-md-2 col-sm-1 col-xs-12 text-left padding-top-20 padding-bottom-20">
//                            <span className="view-stats pointer-hand" data-toggle="modal" data-target="#"><div className="left"><img src="/images/opta.png" /></div><div className="right border-radius-bottom">STATS</div> </span>

//                        </div>

//                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 med-cop1 padding-top-10">
//                            <span className="game-question">Which fixture will receive the first card? </span>
//                        </div>

//                        <div className="col-lg-4 col-md-4 col-sm-2 col-xs-6  text-center">
//                            <div className="zoola-select">
//                                <select>
//                                    <option></option>
//                                    <option className="pointer-hand">Southampton vs West Ham</option>
//                                    <option className="pointer-hand">Manchester United vs Manchester City</option>
//                                    <option className="pointer-hand">Everton vs Stoke</option>
//                                    <option className="pointer-hand">Tottenham Hotspur vs AFC Bournemouth</option>
//                                    <option className="pointer-hand">Norwich vs Crystal Palace</option>
//                                </select>
//                            </div>
//                        </div>

//                    </div>
//                </div>

//                <div className="game-qns  margin-bottom-10">
//                    <div className="row">
//                        <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 padding-top-20 text-center">
//                            <span className="number"> <span className="glyphicon glyphicon-star font-20 blue"></span></span>

//                        </div>
//                        <div className="col-lg-1 col-md-2 col-sm-1 col-xs-12 text-left padding-top-20 padding-bottom-20">
//                        </div>

//                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 med-cop1 padding-top-10">
//                            <span className="game-question">Pick a "Star Question" and earn double points on it </span>
//                        </div>

//                        <div className="col-lg-4 col-md-4 col-sm-2 col-xs-6 visible-sm visible-xs text-center">
//                            <div className="zoola-select">
//                                <select>
//                                    <option></option>
//                                    <option className="pointer-hand">Southampton vs West Ham</option>
//                                    <option className="pointer-hand">Manchester United vs Manchester City</option>
//                                    <option className="pointer-hand">Everton vs Stoke</option>
//                                    <option className="pointer-hand">Tottenham Hotspur vs AFC Bournemouth</option>
//                                    <option className="pointer-hand">Norwich vs Crystal Palace</option>
//                                </select>
//                            </div>
//                        </div>

//                    </div>
//                </div>

//                <div className="game-qns bg-zoola-green text-center pointer-hand">
//                    <h2 className="panel-title">Enter ticket</h2>
//                </div>

//            </div>



// 		</div>
//         <div className="space-10"></div>
//         <div className="row">
//        	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
//               <div className="text-underline light-blue-light font-25">Go back and change the questions</div>
//        	</div>
//         </div>
//        <div className="space-10"></div>
//          </div>

//        </div>
//               )
//            }
//});

        