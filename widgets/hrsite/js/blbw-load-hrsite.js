(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-75134853-1', 'auto');
ga('create', 'UA-75134853-3', 'auto', 'BL');
ga('send', 'pageview');
ga('BL.send', 'pageview');


var head = document.getElementsByTagName('head')[0];
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://widgets.bettorlogic.com/sportsWidgets/css/blbw-bootstrap-hrsite.css';
link.media = 'all';
head.appendChild(link);


var head = document.getElementsByTagName('head')[0];
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://widgets.bettorlogic.com/sportsWidgets/css/blbw-style-hrsite.css';
link.media = 'all';
head.appendChild(link);



//var script_tag = document.createElement('script');
//script_tag.setAttribute("type", "text/javascript");
//script_tag.setAttribute("src",
//    "js/blbw-js-hrsite.js");
//if (script_tag.readyState) {
//    script_tag.onreadystatechange = function () { // For old versions of IE
//        if (this.readyState == 'complete' || this.readyState == 'loaded') {
//            jQuery = window.jQuery.noConflict(true);
//        }
//    };
//} else { // Other browsers
    
//            setTimeout(function () {
//                var script_tag = document.createElement('script');
//                script_tag.setAttribute("type", "text/javascript");
//                script_tag.setAttribute("src",
//                    "/build/views/horseracingsite/horseracingsite.js");
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
//            }, 1000)

       
//}
//// Try to find the head, otherwise default to the documentElement
//(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);



//function loadSliderHrsite(fid,scope) {
//    var sliderValues = [{ from: 1, to: 20, inc: 1 }, { from: 20, to: 100, inc: 5 }, { from: 100, to: 250, inc: 25 }]
//    var sliderValueArray = [];
//    var count = 0;
//    for (i = 0; i < sliderValues.length; i++) {
//        if (i <= sliderValues.length - 2) {
//            for (j = sliderValues[i]["from"]; j < sliderValues[i]["to"]; j = j + sliderValues[i]["inc"]) {
//                count++;
//                sliderValueArray[count] = j
//            }
//        }
//        if (i == sliderValues.length - 1) {
//            for (j = sliderValues[i]["from"]; j <= sliderValues[i]["to"]; j = j + sliderValues[i]["inc"]) {
//                count++;
//                sliderValueArray[count] = j
//            }
//        }

//    }
//    /*---- Jquery Range Slider -----------*/
//    var mySlider = new Slider("#" + fid + "blbw-slider", {
//        tooltip: 'hide',
//        step: 1,
//        min: 1,
//        max: count,
//        value: 10
//    });

//    mySlider.on("slide", function (slideEvent) {
//        var currentMySliderValue = sliderValueArray[mySlider.getValue()];
//        //console.log(currentMySliderValue);
//        scope.sliderSlide(currentMySliderValue)
//        document.getElementById(fid + "blbw-slider-value").innerHTML = currentMySliderValue;


//    });
//    mySlider.on("change", function (slideEvent) {
//        var currentMySliderValue1 = sliderValueArray[mySlider.getValue()];
//        // console.log(mySlider.getValue());
//        scope.sliderSlide(currentMySliderValue1)
//        document.getElementById(fid + "blbw-slider-value").innerHTML = currentMySliderValue1;
//    });

//}


