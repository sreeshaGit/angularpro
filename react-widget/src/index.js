import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppStore from './AppStore';


ReactDOM.render(<App AppStore={new AppStore()}/>, document.getElementById('blsb-widget-content-football'));

