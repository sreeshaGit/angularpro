var load = require('./js/blbw-load-hrsite.js');
var ReactDOM = require('react-dom');
var React = require('react');

//var Slider = require('./js/bootstrap-slider.js');
var BLHRSitewidget = require('./views/horseracingsite/BLHRSitewidget.js');
var ReactBootstrapSlider = require('react-bootstrap-slider').default;

//jquery, bootstrapslider,bootstrap
setTimeout(function(){ReactDOM.render(<BLHRSitewidget/>, document.getElementById('BLwidget'));
},100)
 
//ReactDOM.render(<ReactBootstrapSlider value={10}  step={1} max={30} min={1}   />, document.getElementById('slider'));