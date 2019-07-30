import React, { Component } from 'react';
import { extendObservable} from 'mobx';
import { BrowserRouter as Router } from 'react-router-dom';
import Site from './footBallSite/Site';
import SiteStore from './footBallSite/SiteStore';   
import { observer } from 'mobx-react';
// import './assests/css/styles-sbtech-whiteTheme.css';

@observer
class App extends Component {
    constructor() {
        super();
        extendObservable(this, {
            oddsFormat: 'decimal',
            timeZone: this.getCookie('cTz')?this.getCookie('cTz'):'',

            
        });
       
    }
    /**
      * This function is used to refersh oddsstyle.
    */
    componentWillMount() {
       if (window.BetSlip) {
            window.BetSlip.OnSelectionRemoved["blsbBetslipFootball"] =  (obj) => {
                this.props.AppStore.changedOddStatus = obj;
            }

       }
    }
    componentDidMount() {
       setInterval(() => {
           this.oddStyleChanged();
           let cTzValue = this.getCookie('cTz');
           if (parseInt(this.timeZone) !== parseInt(cTzValue)) {
              this.timeZoneChanged(cTzValue)
           }
        }, 1000);  
    }
    /**
  * This function is used to change Time Zone
  */
    timeZoneChanged(cTzValue) {
        this.timeZone = cTzValue;
    }
    getCookie(cname) {
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
    /**
     * This function is used to change odds format 
     */
    oddStyleChanged() {
        if (window.OddStyle != null) {
            var oddsFormat = Object.keys(window.OddStyle);
            for (var i = 0; i <= oddsFormat.length - 1; i++) { 
                if (window.OddStyle[oddsFormat[i]] == window.currentOddStyle) {
                    this.oddsFormat = oddsFormat[i];
                }
            }
        }
    }
    render() {
        return (
            <Router>
                <div>
                    <div className="App">
                        <Site SiteStore={new SiteStore()} App={this} appStore={this.props.AppStore}/>
                    </div>
                </div>
            </Router>
      );
    }
}

export default observer(App);
