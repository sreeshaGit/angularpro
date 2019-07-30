var ReactDOM = require('react-dom');
var React = require('react');
var load = require('./js/blbw-loadhorsefinder.js');
var d3 = require('./js/d3.min.js');
var progress = require('./js/progress.js');
//var Slider = require('./js/bootstrap-slider.js');
var BLFBSitewidget = require('./views/horsefinder/BLwidgethorsefinder.js');
var ReactBootstrapSlider = require('react-bootstrap-slider').default;

//jquery, bootstrapslider,bootstrap

ReactDOM.render(<BLFBSitewidget />, document.getElementById('FBsitewidget'));
 
//ReactDOM.render(<ReactBootstrapSlider value={10}  step={1} max={30} min={1}   />, document.getElementById('slider'));