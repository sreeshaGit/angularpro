
var head = document.getElementsByTagName('head')[0];
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'css/blbw-bootstrap.css';
link.media = 'all';
head.appendChild(link);


var head = document.getElementsByTagName('head')[0];
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'css/blbw-style-hf.css';
link.media = 'all';
head.appendChild(link);

var head = document.getElementsByTagName('head')[0];
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'css/bootstrap2-toggle.css';
link.media = 'all';
head.appendChild(link);

var head = document.getElementsByTagName('head')[0];
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'css/index.css';
link.media = 'all';
head.appendChild(link);

var script_tag = document.createElement('script');
script_tag.setAttribute("type", "text/javascript");
script_tag.setAttribute("src",
    "js/blbw-js.js");
if (script_tag.readyState) {
    script_tag.onreadystatechange = function () { // For old versions of IE
        if (this.readyState == 'complete' || this.readyState == 'loaded') {
            jQuery = window.jQuery.noConflict(true);
        }
    };
} else { // Other browsers

    setTimeout(function () {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type", "text/javascript");
        script_tag.setAttribute("src",
            "/build/views/horsefinder/horsefinder.js");
        if (script_tag.readyState) {
            script_tag.onreadystatechange = function () { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    scriptLoadHandler();
                }
            };
        } else { // Other browsers
            // console.log("topbets loaded ...")
        }
        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    }, 2000)


}
// Try to find the head, otherwise default to the documentElement
(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);







