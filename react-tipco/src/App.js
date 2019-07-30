import React, { Component } from 'react';
import { Router, Switch, Route } from "react-router-dom";
import { observer } from 'mobx-react';
import Home from './bcComponents/homePage/homePage';
import HomeStore from './bcComponents/homePage/homePageStore';
import AppStore  from './AppStore';
import "react-alice-carousel/lib/alice-carousel.css";
import "./assets/BLRetail-Tipico-cardLayout-Styles.css";

@observer
class App extends Component {
	constructor(props) {
		super(props);
		this.appstore = new AppStore(this);
		this.homeStore = new HomeStore(this);
	}
	render() {
		return (
			<Router history={this.appstore.history}>
			<Switch>
			<Route exact path="/" render={(props) => <Home homeStore={this.homeStore} {...props} />} />
			<Route exact path="/:langCode" render={(props) => <Home homeStore={this.homeStore} {...props}/>} />
			</Switch>
		  </Router>
		)
	}
}

export default App;
