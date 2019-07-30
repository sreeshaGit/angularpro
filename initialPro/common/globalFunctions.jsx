
var sessionId = '';
var userId = '';
var cookieData;
//**********--- Function to read query string  ---**********
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//**********--- Condition to check cookie and read cookie values---**********
function getCookie1(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function getCookie() {
    if (document.cookie) {
        //var parts = document.cookie.split(";");
        cookieData = getCookie1('PZdata');//document.cookie.split("=")[1];
        //console.log(cookieData)
        if (cookieData != "" && cookieData != null)
        {
            cookieData = JSON.parse(cookieData);
            userId = cookieData.userId;
            sessionId = cookieData.session_id;
        }
        
    }
    else {
        //window.location = "build/views/Football/GameSelection/gameSelection.html?islog=false"
        window.location = "/gameselection/?islog=false"
    }
}

function getCookieForNonAuth() {
    if (document.cookie) {
        cookieData = getCookie1('PZdata');//document.cookie.split("=")[1];
        //console.log(cookieData)
        if (cookieData != "" && cookieData != null) {
            cookieData = JSON.parse(cookieData);
            userId = cookieData.userId;
            sessionId = cookieData.session_id;
        }
    }
    
}
//**********--- Function to override $.post method---**********
$.postJSON = function (url, data, callback) {
    return jQuery.ajax({
        'type': 'POST',
        'url': url,
        'contentType': 'application/json',
        'data': data,
        'dataType': 'json',
        'success': callback
    });
};

function removeURLParameter(url, parameter) {
    var urlparts = url.split('?');
if (urlparts.length >= 2) {
        var prefix = encodeURIComponent(parameter) + '=';
        var pars = urlparts[1].split(/[&;]/g);
        
        for (var i = pars.length; i-- > 0;) {
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }
        url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
        console.log("url == ", url);
        return url;
    } else {
        return url;
    }
}