import React, { Component } from 'react';
import { extendObservable } from "mobx";
import { observer } from "mobx-react";

@observer
class DateFormat extends Component {
    constructor() {
        super();
        extendObservable(this, {
            dateFormat: '',
            months: [],
            currentDate: ''
        })
    }
    componentWillMount() {
        this.currentDate = this.getDateFormat(this.props.date, this.props.timeZone); 
        
    }
    componentWillReceiveProps(nextProps) {
        this.currentDate = this.getDateFormat(nextProps.date, nextProps.timeZone);
    }
    getDateFormat(date,timezone) { 
        let d;
        let date2;
        let date1;
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        if (date.indexOf('Z') >= 0) {
            d = date
        } else {
            if (timezone == 0 || timezone == '') {
                d = date;
                date1 = new Date(d);
            } else {
                d = date;
                date2 = new Date(d);
                date2 = date2.setHours(date2.getHours() + parseInt(timezone));  
                //var formatedDate = new date()
                //console.log("year===",date2.getFullYear() , "date====",date2.getDate() , "hours====",date2.getHours())
                //console.log("hoyrs add===",(date2.getHours()+parseInt(timezone)))

                //date1 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(), (date2.getHours()+timezone), date2.getMinutes());
                date1 = new Date(date2);
                // console.log("date1====",date1)
            }
            //else if (timezone > 0) {
            //    d = date + ' UTC-' + timezone
            //    //console.log("date2====", date)
            //    //console.log("d2====", d)

            //} else if (timezone < 0) {
            //    d = date + ' UTC' + '+' + (-(timezone));
            //    //console.log("date3====", date)
            //    //console.log("d3====", d)
            //}
        }
        // date1 = new Date(d); 
        //console.log("final Date====",date1)
        return this.addZero(date1.getDate()) + ' '
            + months[date1.getMonth()] + ' '
            + this.addZero(date1.getHours()) + ':' + this.addZero(date1.getMinutes());
    }
    addZero(num) {
        return num < 10 ? '0' + num : num
    }
    render() {
        return (
            <div>
                {this.currentDate}
            </div>
        );
    }  
};
export default observer(DateFormat);