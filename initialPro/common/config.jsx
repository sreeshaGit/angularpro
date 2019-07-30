var baseurl = "http://apex.zoolalondon.com/zoola/pzdev/";
var paymentURL = "https://hpp.sandbox.realexpayments.com/pay";
var ENV = 'LOCAl';
var requiredPath = 'FULLPATH';
var FlyzooApplicationId = '';
var FB_APPID = '';
//playzoolamobileuat.bettorlogic.com
if (ENV == 'MOBILEUAT') {
    baseurl = "http://apex.zoolalondon.com/zoola/pzlive/";
    paymentURL = "https://hpp.realexpayments.com/pay";
    FB_APPID = '631830156970171';
    FlyzooApplicationId = '578e26724fb4d50cf8e6aa51577a03844fb4d521a8fbd653';
}//playzoolasportsit.bettorlogic.com
else if (ENV == 'SIT') {
    FB_APPID = '631830156970171';
    FlyzooApplicationId = '577a04414fb4d521a8fbd657577a03844fb4d521a8fbd653';
}//dev.playzoola.com
else if (ENV = 'DEV') {
    FB_APPID = '1832766513626295';
    FlyzooApplicationId = '578e06aebb547e11047ad110577a03844fb4d521a8fbd653';
}//testing.playzoola.com
else if (ENV == 'TESTING') {
    FB_APPID = '1832766513626295';
    FlyzooApplicationId = '57976abfbb547e2024758237577a03844fb4d521a8fbd653';
}//production.playzoola.com
else if (ENV == 'PROD') {
    baseurl = "http://apex.zoolalondon.com/zoola/pzlive/";
    paymentURL = "https://hpp.realexpayments.com/pay";
    FB_APPID = '1832766513626295';
    FlyzooApplicationId = '57976aedbb547e2024758272577a03844fb4d521a8fbd653';
}//www.playzoola.com
else if (ENV = 'LIVE') {
    baseurl = "http://apex.zoolalondon.com/zoola/pzlive/";
    paymentURL = "https://hpp.realexpayments.com/pay";
    FB_APPID = '1832766513626295';
    FlyzooApplicationId = '57976b21bb547e20247582d0577a03844fb4d521a8fbd653';
}else{
	FB_APPID = '631830156970171';
    FlyzooApplicationId = '578e26724fb4d50cf8e6aa51577a03844fb4d521a8fbd653';
}