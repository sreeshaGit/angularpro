var userimage;
var username;
var FlyzooApi = {};
$.getScript("/build/common/config.js", function () {
    //console.log("Load was performed.");
});
if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    this.serverRequest = $.get(baseurl+"general/navbar/"+userId+","+sessionId, function (result) {
                    if(typeof result != 'object')
                    {
                        result = JSON.parse(result)
                    }
    if(result.header[0].status != 'L'){
    $.ajax({
        type: "GET",
        url: baseurl + "fixture/chat/" + userId + "," + sessionId,
        async: false,
        success: function (result) {
            //console.log(result)
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            if (result.user[0]['usr_image'] == "" || result.user[0]['usr_image'] == null) {
                userimage = 24;
            }
            else {
                userimage = result.user[0]['usr_image'];
                username = result.user[0]['username']
            }
            var friends = [];
            this.serverRequest = $.get(baseurl + "game/invite/" + userId + "," + sessionId + ",0", function (result) {
                //this.serverRequest = $.get(baseurl + "game/invite/10013," + sessionId + ",0", function (result) {
                if (typeof result != 'object') {
                    result = JSON.parse(result)
                }
                var usersList = result.items;
                usersList.map(function (item,index) {
                    friends.push(item.fr_usr_id);
                })


                FlyzooApi = FlyzooApi || {};
                FlyzooApi.UserId = userId;
                FlyzooApi.UserName = username;
                FlyzooApi.Friends = friends;
            //FlyzooApi.Avatar = "http://localhost:8000/images/animals-Modified/" + userimage + ".svg ";
            FlyzooApi.Avatar = "https://playzoola.com/images/animals-Modified/" + userimage + ".svg ";
                (function () {
                    window._FlyzooApplicationId = FlyzooApplicationId;
                    var fz = document.createElement('script'); fz.type = 'text/javascript'; fz.async = true;
                    fz.src = '//widget.flyzoo.co/scripts/flyzoo.start.js';
                    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(fz, s);
                })();
            }.bind(this));
        }
    });
    }
}.bind(this));
}