var amt=null,cardname=null;getCookie(),getParameterByName("amt")&&""!=getParameterByName("amt")&&(amt=getParameterByName("amt")),getParameterByName("cardname")&&""!=getParameterByName("cardname")&&(cardname=getParameterByName("cardname")),getParameterByName("islog")&&"true"==getParameterByName("islog")?is_loggedIn=!0:is_loggedIn=!1;var Amount=React.createClass({displayName:"Amount",gotoDashboard:function(){window.location="/dashboard/?islog="+is_loggedIn},getInitialState:function(){return{items:{}}},componentWillMount:function(){this.serverRequest=$.get(baseurl+"general/navbar/"+userId+","+sessionId,function(a){"object"!=typeof a&&(a=JSON.parse(a)),this.setState({items:a.header[0]})}.bind(this))},render:function(){return React.createElement("div",null,React.createElement("div",{className:"container-fluid header"},React.createElement("div",{className:"container"},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center"},React.createElement("h3",null,"WITHDRAWAL"))))),React.createElement("div",{className:"container-fluid subheader"},React.createElement("div",{className:"container no-padding"},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-6 col-md-8 col-sm-8 col-xs-12 text-center col-centered"},React.createElement("div",{className:"topup-round-white"},React.createElement("div",{className:"topup-bal"},"REQUEST AMOUNT: "),React.createElement("div",{className:"topup-balance"},"£",amt," ")))))),React.createElement("div",{className:"container-fluid"},React.createElement("div",{className:"container no-padding"},React.createElement("div",{className:"space-10"}),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-12 col-md-8 col-sm-8 col-xs-12 text-center col-centered"},React.createElement("h2",{className:"text-center font-20"},React.createElement("span",null,this.state.items.username),", you have successfully requested a £",amt," withdrawal!"),React.createElement("div",{className:"space-10"}),React.createElement("p",{className:"text-center"},"If successful, please allow 3-10 days."))),React.createElement("div",{className:"space-10"}),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-6 col-md-5 col-sm-7 col-xs-12 col-centered"},React.createElement("button",{className:"btn zoola-btn",onClick:this.gotoDashboard},React.createElement("div",{className:"btn-txt"},"Go to dashboard")))))),React.createElement("div",{className:"space-10"}),React.createElement("div",{className:"space-10"}))}});