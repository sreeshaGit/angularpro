/*This file contains HTML for footer component*/
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import OddsButton from '../../common/oddsButton';



@observer
class Footer extends Component {
    constructor() {
        super();
        this.state = {
            returns: '',
            initialReturns: true,
            oddsMultiply: 1,
        }
       
    };
    /**
     * This function automatically calls on initial load and used to accquire data from the service.
    */
    componentWillReceiveProps() {
        let getBestBets = [];
        this.oddsMultiply = 1;
        for (let i = 0; i < this.props.data.length; i++) {
            if (getBestBets.length < 5) {
                getBestBets.push(this.props.data[i]);
                this.oddsMultiply = this.oddsMultiply * getBestBets[i].odds;
            }
        }
    }
    /**
     * This method is used to bind the data into HTML
    */
    render() {
        const {footerStore, data, store, type, parentStore,App} = this.props;
       
        return (
            <div className="BLSBT-widget-footer">
                <div className="BLSBT-stake">
                    <div className="row">
                        <div className="col-6">
                            {store.staticData.stake}
                        </div>
                        <div className="col-6 text-right">
                            {this.props.type === 'accaAttack' ? this.props.stack : '10' }
                        </div>
                    </div>
                </div>
                <div className="BLSBT-returns">
                    <div className="row">
                        <div className="col-4">
                           <span className="BLSBT-returns__txt"> {store.staticData.returns}</span>
                        </div>
                        <div className="col-8 text-right">
                        <span className="BLSBT-returns__value">{this.props.type == 'accaAttack' ? (this.oddsMultiply * this.props.stack).toFixed(2):(this.oddsMultiply*10).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="space-5"></div>
                </div>
                {/* <div className="row">
                    <div className="blsbtech-stake">
                        {store.staticData.stake}: {this.props.type === 'accaAttack' ? <input type="text"
                            maxLength="4"
                            name="stake" value={this.props.stack} disabled="disabled"/> : <input type="text"
                                maxLength="4"
                                name="stake" value="10" disabled="disabled" />}
                    </div> 
                    <div className="blsbtech-return">
                        <div className="blsbtech-returnsBox">
                            {store.staticData.returns}:<span className="blsbtech-returnAmount">{this.props.type == 'accaAttack' ? (this.oddsMultiply * this.props.stack).toFixed(2):(this.oddsMultiply*10).toFixed(2)}</span>
                        </div>
                    </div>
                </div> */}
                <button type="button" className="BLSBT-btn BLSBT-btn-addAllToBetslip" onClick={() => footerStore.addAllToBetslip(data, type, parentStore,App)}>{store.staticData.addalltobetslip}</button>
                </div>
        );
    }
};
export default observer(Footer);