import React, { Component } from 'react';
import { observer } from 'mobx-react';
import imageURLs from '../../sharedFiles/imageUrls';
import { getCurrentDayTime } from '../../sharedFiles/commonFunctions';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';

@observer
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime : getCurrentDayTime(),
        }
    }
    componentDidMount() {
        this.interval = setInterval(()=>{
        this.setState({
            currentTime: getCurrentDayTime()
          })
        }, 1000)
          
         
      }
    componentWillUnmount() {
      clearInterval(this.interval);
    }
    render() {
        var arr = this.state.currentTime.split("-");
        var thtext = "app."+arr[2];
        var month = "app."+arr[3];
        return (
            <div className="BLRetail-inFocus-header">
                <div className="BLRetail-logo">
                    <img src={imageURLs.tipicoLogo} className="" alt=""/>
                </div>                
                <span className="BLRetail-inFocus-header__subLogo">
                    {/* IN-FOCUS */}
                    <FormattedMessage id="app.focus" defaultMessage="" />
                </span>
                <span className="BLRetail-inFocus-header__dateTime">- 
                    {/* {this.state.currentTime} */}
                     {} <FormattedMessage id={"app."+arr[0]} defaultMessage="" /> {arr[1]}<FormattedMessage id={thtext} defaultMessage="" /> {} <FormattedMessage id={"app."+arr[3]} defaultMessage="" /> {arr[4]}
                </span>
            </div>
        )
    }
}

export default Header;
