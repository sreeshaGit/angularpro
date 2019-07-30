(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-1515961-1', 'auto');
ga('create', 'UA-75134853-3', 'auto', 'BL');

var head = document.getElementsByTagName('head')[0];
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://widgets.bettorlogic.com/sportsWidgets/css/blbw-bootstrap-event.css';
link.media = 'all';
head.appendChild(link);


var head = document.getElementsByTagName('head')[0];
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://widgets.bettorlogic.com/sportsWidgets/css/blbw-style-event.css';
link.media = 'all';
head.appendChild(link);

var script_tag = document.createElement('script');
script_tag.setAttribute("type", "text/javascript");
script_tag.setAttribute("src",
    "https://widgets.bettorlogic.com/sportsWidgets/js/blbw-event-js.js");
if (script_tag.readyState) {
    script_tag.onreadystatechange = function () { // For old versions of IE
        if (this.readyState == 'complete' || this.readyState == 'loaded') {
            jQuery = window.jQuery.noConflict(true);
        }
    };
} else { // Other browsers
    
//            setTimeout(function () {
//                var script_tag = document.createElement('script');
//                script_tag.setAttribute("type", "text/javascript");
//                script_tag.setAttribute("src",
//                    "/build/views/eventpregame/eventpregame.js");
//                if (script_tag.readyState) {
//                    script_tag.onreadystatechange = function () { // For old versions of IE
//                        if (this.readyState == 'complete' || this.readyState == 'loaded') {
//                            scriptLoadHandler();
//                        }
//                    };
//                } else { // Other browsers
//                    // console.log("topbets loaded ...")
//                }
//                // Try to find the head, otherwise default to the documentElement
//                (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
//            }, 2000)

       
}
// Try to find the head, otherwise default to the documentElement
(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);







