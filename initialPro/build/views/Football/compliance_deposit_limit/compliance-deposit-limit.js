getCookie(),getParameterByName("islog")&&"true"==getParameterByName("islog")?is_loggedIn=!0:is_loggedIn=!1,$(document).on("keypress","#number",function(a){var b=a.which;(b<48||b>57)&&8!=b&&a.preventDefault()});var AccountCreated=React.createClass({displayName:"AccountCreated",render:function(){return React.createElement("div",null,React.createElement("div",{className:"container-fluid header"},React.createElement("div",{className:"container"},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding"},React.createElement("h3",null,"DEPOSIT LIMIT"))))),React.createElement("div",{className:"space-5"}),React.createElement("div",{className:"container"},React.createElement("div",{className:"space-5"}),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-12 col-md-12 col-sm-12 col-xs-12 text-justify"},React.createElement("p",{className:"purple"},"Playzoola encourages its players to gamble responsibly. We recommend that you review your gambling activity on a regular basis, and ensure to take steps to make sure you're the one in control. For more information, see our",React.createElement("a",{href:"https://playzoola.zendesk.com/hc/en-us/categories/200960809-Responsible-Gambling",className:"underline purple",target:"_blank"}," Responsible Gambling Policy.")))),React.createElement("div",{className:"space-10"})))}});$('input[name="limit"]').on("change",function(){$('input[name="limit"]').prop("checked",function(){return this.defaultChecked})});var DepositLimit=React.createClass({displayName:"DepositLimit",getInitialState:function(){return{Depositlim:{},number:"",isDepositLimit:!1,depositLimit1:!1,depositAlready:!1}},componentWillMount:function(a){this.serverRequest=$.get(baseurl+"admin/depositlimit/"+userId+","+sessionId,function(a){"object"!=typeof a&&(a=JSON.parse(a)),a.items.length>0&&a.items[0].deposit_limit&&a.items[0].deposit_limit>0&&a.items[0].duration&&a.items[0].duration.length>0&&this.setState({Depositlim:a.items[0],isDepositLimit:!0,depositAlready:!0});var b=this;setTimeout(function(){b.setState({isDepositLimit:!0})},1e3)}.bind(this))},depositLimit:function(){if(this.state.depositAlready)return $("#alert-modal1").modal("show"),!1;var a=$("#number").val(),b=!1;if(""==$("#number").val()?(error="please enter your Deposit Limit.\n",document.getElementById("topuperror").innerHTML="Please enter your deposit limit.",b=!0):""!=$("#number").val()&&($("#number").val()<5||$("#number").val()>1e3)?(error="Deposit limit must Be  Between 5 To 1000. \n",document.getElementById("topuperror").innerHTML="Deposit limit must  be  between 5 to 1000.",b=!0):"0"==$("#number").val().substring(0,1)?(error="Please enter valid amount. \n",document.getElementById("topuperror").innerHTML="Please enter valid amount.",b=!0):document.getElementById("topuperror").innerHTML="",b)return!1;var c=$("input[name=limit]:checked").val();if(""!=c&&null!=c){var d={items:[{usr_limit:a,usr_limit_duration:c}]};document.getElementById("valueerror").innerHTML="",this.serverRequest=$.post(baseurl+"admin/depositlimit/"+userId+","+sessionId,JSON.stringify(d),function(a){window.location="/build/views/Football/myprofile/myprofile.html?islog="+is_loggedIn}.bind(this))}else document.getElementById("valueerror").innerHTML="Please select deposit limit."},gotoMyProfile:function(){window.location="/myprofile/?islog="+is_loggedIn},radioClicked:function(a){"showPopup"==a?$("#alert-modal1").modal("show"):""==$("#number").val()?this.setState({depositLimit1:!1}):this.setState({depositLimit1:!0})},alreadyDeposit:function(){$("#alert-modal1").modal("show")},render:function(){this.state.Depositlim.deposit_limit;return React.createElement("div",null,this.state.isDepositLimit?React.createElement("div",null,React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-6 col-md-6 col-sm-7 col-xs-12 col-centered"},React.createElement("div",{className:"tit-txt text-center"},"SET A DEPOSIT LIMIT"),React.createElement("div",{className:"zoola-box col-centered self-exclusion"},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-6 col-md-6 col-sm-6 col-xs-6"},React.createElement("div",{className:"topup-round-lightblue topup-value bg-light-blue"},"£",this.state.Depositlim.deposit_limit?React.createElement("input",{type:"text",className:"topup-input ",defaultValue:""+this.state.Depositlim.deposit_limit,id:"number",onClick:this.alreadyDeposit,maxLength:"4",readOnly:!0}):React.createElement("input",{type:"text",className:"topup-input ",id:"number",onClick:this.radioClicked,maxLength:"4"})),React.createElement("div",{id:"topuperror",className:"alert-message"}," ")),React.createElement("div",{className:"col-lg-6 col-md-6 col-sm-6 col-xs-6"},React.createElement("div",{className:"form-group"},React.createElement("div",{className:"checkbox"},"per day"==this.state.Depositlim.duration?React.createElement("input",{type:"radio",name:"limit",id:"perDay",value:"per day",onClick:this.alreadyDeposit,readOnly:!0,checked:"checked"}):React.createElement("input",{type:"radio",name:"limit",id:"",onClick:void 0==this.state.Depositlim.duration?this.radioClicked.bind(null,""):this.radioClicked.bind(null,"showPopup"),value:"per day"}),React.createElement("label",{className:"tit-txt"},"per day"))),React.createElement("div",{className:"form-group"},React.createElement("div",{className:"checkbox"},"per week"==this.state.Depositlim.duration?React.createElement("input",{type:"radio",name:"limit",id:"perWeek",value:"per week",onClick:this.alreadyDeposit,readOnly:!0,checked:"checked"}):React.createElement("input",{type:"radio",name:"limit",id:"",onClick:void 0==this.state.Depositlim.duration?this.radioClicked.bind(null,""):this.radioClicked.bind(null,"showPopup"),value:"per week"}),React.createElement("label",{className:"tit-txt"},"per week"))),React.createElement("div",{className:"form-group"},React.createElement("div",{className:"checkbox"},"per month"==this.state.Depositlim.duration?React.createElement("input",{type:"radio",name:"limit",id:"perMonth",onClick:this.alreadyDeposit,readOnly:!0,value:"per month",checked:"checked"}):React.createElement("input",{type:"radio",name:"limit",id:"",onClick:void 0==this.state.Depositlim.duration?this.radioClicked.bind(null,""):this.radioClicked.bind(null,"showPopup"),value:"per month"}),React.createElement("label",{className:"tit-txt"},"per month")))),React.createElement("div",{id:"valueerror",className:"alert-message text-center"}," ")),React.createElement("div",{className:"space-5"}),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-12 text-justify"},React.createElement("p",null,"A request to set or reduce an existing limit will be applied immediately.",React.createElement("br",null),"A request to increase or remove an existing limit will be subject to a 24 hour review period from receipt of request."))),React.createElement("div",{className:"space-5"}),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-10 col-md-10 col-sm-10 col-xs-12 col-centered"},React.createElement("button",{className:this.state.depositLimit1?"btn zoola-btn":"btn zoola-btn bg-dark-dark-blue",onClick:this.depositLimit},React.createElement("h5",{className:this.state.depositLimit1?"":"light-blue"},"Set limit now"))))))),React.createElement("div",{className:"space-5"}),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-12 col-md-12 col-sm-12 col-xs-12"})),React.createElement("div",{className:"space-10"}),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-6 col-md-6 col-sm-6 col-xs-12 col-centered "},React.createElement("button",{type:"submit",className:"btn zoola-btn",onClick:this.gotoMyProfile},React.createElement("div",{className:"btn-txt"},"Back to my profile")))),React.createElement("div",{className:"space-10"}),React.createElement("div",{className:"social-body"},React.createElement("div",{className:"modal fade animated fadeIn",tabIndex:"-1",role:"dialog","aria-labelledby":"Alert-Modal",id:"alert-modal1","data-keyboard":"true"},React.createElement("div",{className:"modal-dialog modal-sm "},React.createElement("div",{className:"modal-content zoola-box alet-modal"},React.createElement("div",{className:"social-header"},React.createElement("img",{src:"/images/close-icon.svg",width:"20",className:"pull-right pointer-hand","data-dismiss":"modal"})),React.createElement("div",{className:"social-body"},React.createElement("div",{className:"space-5"}),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-12"},React.createElement("p",null,"Please contact  ",React.createElement("a",{className:"underline",href:"https://playzoola.zendesk.com/hc/en-us/articles/209629225--Our-contact-details",target:"_blank"},"Customer Service")," to make any changes."))),React.createElement("div",{className:"space-5"}),React.createElement("div",{className:"space-5"}))))))):"")}});