getCookie(),getParameterByName("islog")&&"true"==getParameterByName("islog")?is_loggedIn=!0:is_loggedIn=!1;var Subheader=React.createClass({displayName:"Subheader",render:function(){return React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding"},React.createElement("h3",null,"CREATE ACCOUNT")))}}),Profile=React.createClass({displayName:"Profile",getInitialState:function(){return{files:[],fileslist:[],teams:[],items:[],selectedAvatar:"",selectedTeam:"",avatars:[],avatarsListed:[]}},componentWillMount:function(){var a=[{avatar_id:123},{avatar_id:2},{avatar_id:3},{avatar_id:4},{avatar_id:5},{avatar_id:6},{avatar_id:7},{avatar_id:8},{avatar_id:9},{avatar_id:10},{avatar_id:11},{avatar_id:12},{avatar_id:13},{avatar_id:14},{avatar_id:15},{avatar_id:16},{avatar_id:17},{avatar_id:18},{avatar_id:19},{avatar_id:20},{avatar_id:21},{avatar_id:22},{avatar_id:23},{avatar_id:24},{avatar_id:25},{avatar_id:26},{avatar_id:27},{avatar_id:28},{avatar_id:29},{avatar_id:30},{avatar_id:31},{avatar_id:32}],b=a.length,c=6,d=Math.ceil(b/c),e=[];for(i=0;i<d;i++)e.push(a.slice(i*c,(i+1)*c));this.setState({avatars:a,avatarsListed:e}),this.serverRequest=$.get(baseurl+"registration/form/"+userId+","+sessionId,function(a){"object"!=typeof a&&(a=JSON.parse(a));var b=a.files[0].teams.length,c=6,e=(Math.ceil(b/c),[]);for(i=0;i<d;i++)e.push(a.files[0].teams.slice(i*c,(i+1)*c));this.setState({teams:a.files[0].teams,fileslist:e})}.bind(this))},componentDidMount:function(){$("#txtDate").keyup(function(a){if(193!=a.keyCode&&111!=a.keyCode)if(console.log(a.keyCode),8!=a.keyCode)2==$(this).val().length?$(this).val($(this).val()+"/"):5==$(this).val().length&&$(this).val($(this).val()+"/");else{var b=$(this).val();5==$(this).val().length?$(this).val(b.substring(0,4)):2==$(this).val().length&&$(this).val(b.substring(0,1))}else{var b=$(this).val(),c=$(this).val().length;$(this).val(b.substring(0,c-1))}})},submitForm:function(){var a={},b=!1;a.firstname=$("#Name").val();var c={items:[{username:$("#Name").val(),usr_image:this.state.selectedAvatar,team_id:this.state.selectedTeam,confirm1:$("#checkbox1").is(":checked")?"Y":"N",confirm2:$("#checkbox2").is(":checked")?"Y":"N"}]};return console.log(c),console.log(c.items[0].username),""==c.items[0].username||null==c.items[0].username?(error="please select user Name.\n",document.getElementById("nameerror").innerHTML="please select user Name.",b=!0):document.getElementById("nameerror").innerHTML="",""==c.items[0].usr_image||null==c.items[0].usr_image?(error="please select avatar.\n",document.getElementById("pickerror").innerHTML="please select avatar.",b=!0):document.getElementById("pickerror").innerHTML="",""==c.items[0].team_id||null==c.items[0].team_id?(error="please select your team.\n",document.getElementById("teamerror").innerHTML="please select your team.",b=!0):document.getElementById("teamerror").innerHTML="","N"==c.items[0].confirm1||"N"==c.items[0].confirm2?(error="please conform your age & select the terms and conditions.\n",document.getElementById("checkerror").innerHTML="please confirm your age & select the terms and conditions .",b=!0):document.getElementById("checkerror").innerHTML="",!b&&void(this.serverRequest=$.post(baseurl+"user/signupdate/"+userId+","+sessionId+",N",JSON.stringify(c),function(a){if(c.items)return window.location="/build/views/Football/Glory/joinGame/join-game.html?islog=true",!1}.bind(this)))},selectAvatar:function(a){this.setState({selectedAvatar:a}),$(".thumb").removeClass("selected-avatar"),$("#avatar_"+a).addClass("selected-avatar")},selectTeam:function(){$(".team-name").removeClass("selected-team"),console.log($("#team_"+$("#FavTem").val())),$("#team_"+$("#FavTem").val()).addClass("selected-team")},ontwitterchange:function(){},changeTeam:function(a){console.log(a),$(".team-name").removeClass("selected-team"),$("#team_"+a).addClass("selected-team"),$("#FavTem").val(a),this.setState({selectedTeam:a})},render:function(){var a=this;return React.createElement("div",null,React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-6 col-md-6 col-sm-6 col-xs-12 padding-right-20 padding-left-20"},React.createElement("div",{className:"space-10"}),React.createElement("div",{className:"login-box col-centered"},React.createElement("div",{className:"padding-30"},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-12"},React.createElement("div",{className:"tit-txt"},"Choose a username*")),React.createElement("div",{className:"col-lg-12 col-md-12 col-sm-12 col-xs-12"},React.createElement("div",{className:"form-group"},React.createElement("input",{type:"text",className:"form-control",placeholder:"PZalias",defaultValue:"",minLength:"1",id:"Name"}),React.createElement("div",{id:"nameerror"})))))),React.createElement("div",{className:"space-10"}),React.createElement("div",{className:"login-box col-centered"},React.createElement("div",{className:"padding-30"},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-12 col-md-12 col-sm-12 col-xs-12"},React.createElement("div",{className:"tit-txt"},"Pick an avatar*"),React.createElement("div",{className:"form-group"},React.createElement("div",{id:"thumbcarousel",className:"carousel slide avatar-slider","data-interval":"false"},React.createElement("div",{className:"carousel-inner"},this.state.avatarsListed.map(function(b,c){return React.createElement("div",{className:0==c?"item active":"item",key:c},React.createElement("div",{className:"row text-center"},b.map(function(b,c){return React.createElement("div",{"data-target":"#carousel",key:c,"data-slide-to":"0",className:"thumb",onClick:a.selectAvatar.bind(null,b.avatar_id),id:"avatar_"+b.avatar_id},React.createElement("img",{src:"/images/animals-Modified/"+b.avatar_id+".svg"}))})))}),React.createElement("div",{id:"pickerror"})),React.createElement("a",{className:"left carousel-control",href:"#thumbcarousel",role:"button","data-slide":"prev"},React.createElement("span",{className:"fa fa-angle-left font-40"})),React.createElement("a",{className:"right carousel-control",href:"#thumbcarousel",role:"button","data-slide":"next"},React.createElement("span",{className:"fa fa-angle-right font-40"})))))))),React.createElement("div",{className:"space-10"})),React.createElement("div",{className:"col-lg-6 col-md-6 col-sm-6 col-xs-12 pull-right padding-right-20 padding-left-20"},React.createElement("div",{className:"space-10"}),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-12"},React.createElement("ul",{className:"nav nav-tabs zoola-tabs",id:"myTab"},React.createElement("li",{className:"active"},React.createElement("a",{"data-target":"#accountP-p-league","data-toggle":"tab"},"PREMIER LEAGUE")),React.createElement("li",null,React.createElement("a",{"data-target":"#accountP-championship","data-toggle":"tab"},"CHAMPIONSHIP"))),React.createElement("div",{className:"tab-content zoola-tab-content"},React.createElement("div",{className:"tab-pane active",id:"accountP-p-league"},React.createElement("div",{className:"col-lg-12"},React.createElement("div",{className:"tit-txt"},"Select your team")),React.createElement("div",{className:"space-5"}),React.createElement("div",{className:"form-group"},React.createElement("div",{id:"teamcarousel",className:"carousel slide teamcarousel","data-interval":"false"},React.createElement("div",{className:"carousel-inner"},React.createElement("div",{className:"item active"},React.createElement("div",{className:"row "},this.state.fileslist.map(function(b,c){return React.createElement("div",{className:"premier-team pointer-hand",onClick:a.selectTeam.bind(null,b.team_id),key:c},React.createElement("img",{width:"135",alt:"",src:"/images/football-shirts/Arsenal/"+b.team_id+".svg"}),React.createElement("span",{className:"team-name tm-txt",id:"team_"+b.team_id},b.name))})))),React.createElement("a",{className:"left carousel-control",href:"#teamcarousel",role:"button","data-slide":"prev"},React.createElement("span",{className:"fa fa-angle-left font-40"})),React.createElement("a",{className:"right carousel-control",href:"#teamcarousel",role:"button","data-slide":"next"},React.createElement("span",{className:"fa fa-angle-right font-40"}))))),React.createElement("div",{className:"tab-pane",id:"accountP-championship"},React.createElement("div",{classNameclassName:"space-5"}),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center"},React.createElement("div",{className:"premier-team"},React.createElement("img",{src:"/images/football-shirts/Crystal_Palace.svg",width:"135",alt:""}),React.createElement("span",{className:"team-name tm-txt"},"Crystal Palace"))),React.createElement("div",{className:"col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center"},React.createElement("div",{className:"premier-team"},React.createElement("img",{src:"/images/football-shirts/Everton.svg",width:"135",alt:""}),React.createElement("span",{className:"team-name tm-txt"},"Everton")))),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center"},React.createElement("div",{className:"premier-team"},React.createElement("img",{src:"/images/football-shirts/Hotspur.svg",width:"135",alt:""}),React.createElement("span",{className:"team-name tm-txt"},"Hotspur"))),React.createElement("div",{className:"col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center"},React.createElement("div",{className:"premier-team"},React.createElement("img",{src:"/images/football-shirts/Leicester.svg",width:"135",alt:""}),React.createElement("span",{className:"team-name tm-txt"},"Leicester")))),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center"},React.createElement("div",{className:"premier-team"},React.createElement("img",{src:"/images/football-shirts/Liverpool.svg",width:"135",alt:""}),React.createElement("span",{className:"team-name tm-txt"},"Liverpool"))),React.createElement("div",{className:"col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center"},React.createElement("div",{className:"premier-team"},React.createElement("img",{src:"/images/football-shirts/Manchester_City.svg",width:"135",alt:""}),React.createElement("span",{className:"team-name tm-txt"},"Manchester City")))),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center"},React.createElement("div",{className:"premier-team"},React.createElement("img",{src:"/images/football-shirts/Manchester_Uni.svg",width:"135",alt:""}),React.createElement("span",{className:"team-name tm-txt"},"Manchester Uni"))),React.createElement("div",{className:"col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center"},React.createElement("div",{className:"premier-team"},React.createElement("img",{src:"/images/football-shirts/Newcastle.svg",width:"135",alt:""}),React.createElement("span",{className:"team-name tm-txt"},"Newcastle")))),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center"},React.createElement("div",{className:"premier-team"},React.createElement("img",{src:"/images/football-shirts/Norwich.svg",width:"135",alt:""}),React.createElement("span",{className:"team-name tm-txt"},"Norwich"))),React.createElement("div",{className:"col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center"},React.createElement("div",{className:"premier-team"},React.createElement("img",{src:"/images/football-shirts/Southampton.svg",width:"135",alt:""}),React.createElement("span",{className:"team-name tm-txt"},"Southampton")))),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center"},React.createElement("div",{className:"premier-team"},React.createElement("img",{src:"/images/football-shirts/Stoke_City.svg",width:"135",alt:""}),React.createElement("span",{className:"team-name tm-txt"},"Stoke City"))),React.createElement("div",{className:"col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center"},React.createElement("div",{className:"premier-team"},React.createElement("img",{src:"/images/football-shirts/Sunderland.svg",width:"135",alt:""}),React.createElement("span",{className:"team-name tm-txt"},"Sunderland"))))),React.createElement("div",{id:"teamerror"})))),React.createElement("div",{className:"space-10"}),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-12 col-md-12 col-sm-12 col-xs-12"},React.createElement("div",{className:"forgotten"},React.createElement("div",{className:"checkbox margin-bottom-15"},React.createElement("input",{id:"checkbox1",className:"styled",type:"checkbox"}),React.createElement("label",null,"  I'm over 18")),React.createElement("div",{className:"checkbox"},React.createElement("input",{id:"checkbox2",className:"styled",type:"checkbox"}),React.createElement("label",null,"  I agree to the  ",React.createElement("a",{href:"",className:"underline"},"Terms and Conditions"),"."))),React.createElement("div",{className:"alert-message"}," "))),React.createElement("div",{id:"checkerror"}),React.createElement("div",{className:"space-10"}),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-12 col-md-12 col-sm-12 col-xs-12 col-centered "},React.createElement("button",{type:"submit",className:"btn zoola-btn",onClick:this.submitForm},React.createElement("div",{className:"btn-txt"},"Complete sign up")))))),React.createElement("div",{className:"space-10"}))}});