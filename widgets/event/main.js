var load = require('./js/blbw-load.js');
var ReactDOM = require('react-dom');
var React = require('react');

//var Slider = require('./js/bootstrap-slider.js');
var BLFBEventwidget = require('./views/eventpregame/BLFBEventwidget.js');
var ReactBootstrapSlider = require('react-bootstrap-slider').default;

//jquery, bootstrapslider,bootstrap
setTimeout(function(){ReactDOM.render(<BLFBEventwidget/>, document.getElementById('BLwidget'));
},100)
 
//ReactDOM.render(<ReactBootstrapSlider value={10}  step={1} max={30} min={1}   />, document.getElementById('slider'));