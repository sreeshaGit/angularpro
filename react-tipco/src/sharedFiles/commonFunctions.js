
export function getCurrentDayTime(){
        // var weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var weekday=["sun","mon","tue","wed","thurs","fri","sat"];
        // var monthNames = ["January", "February", "March", "April", "May", "June",
        // "July", "August", "September", "October", "November", "December"];
        var monthNames = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
        var time_display = "";
        var UTC_date = new Date(new Date()).toUTCString();
        var today = new Date(UTC_date);
        // var day = weekday[today.getDay()-1];
        var day = weekday[today.getDay()];
        var date = today.getDate();
        var month = monthNames[today.getMonth()];
        var time = format_time(today);
        var dateStr = '';
        if(date === 1 || date===21 || date === 31){
            dateStr = 'st';
        } else if (date === 2 || date === 22){
            dateStr = 'nd';
        }else if(date === 3 || date === 23){
            dateStr = 'rd';
        }else{
            dateStr = 'th';
        }
        time_display = day+"-"+date+'-'+dateStr+'-'+month+"-"+time
        return time_display;
    }

    function format_time(date_obj) {
        var hour = date_obj.getHours();
        var minute = date_obj.getMinutes();
        var amPM = "";
        if(minute < 10) {
          minute = "0" + minute;
        }
        return hour + ":" + minute + amPM;
      }

      export function getMatchDayTime(val){
        
            var time_display = "";
            var today = new Date();
            var offset = new Date().getTimezoneOffset() * 60000;
            var localTimeZone = new Date(val);
            localTimeZone.setTime(localTimeZone.getTime() - offset);
            var hours = localTimeZone.getHours();
            var minutes = localTimeZone.getMinutes();
            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            if(hours<10) {
                hours='0'+hours;
            }
            if(minutes<10) {
                minutes='0'+minutes;
            }
                var date = localTimeZone.getDate();
                var month = localTimeZone.getMonth()+1;
                if(date<10) {
                    date='0'+date;
                }
                if(month<10) {
                    month='0'+month;
                }
                var dayDifference = localTimeZone.getDate() - today.getDate();
                if(dayDifference === 0){
                    // time_display = "Today - "+hours+":"+minutes;
                    time_display = "today-"+hours+":"+minutes;
                }
                else if(dayDifference === 1){
                    // time_display = "Tomorrow - "+hours+":"+minutes;
                    time_display = "tomorrow-"+hours+":"+minutes;
                }
                else{
                    // var monthnme = monthNames[today.getMonth()];
                    var monthnme = monthNames[localTimeZone.getMonth()];
                    // time_display = date+" "+monthnme+" - "+hours+":"+minutes;
                    time_display = date+"-"+monthnme+"-"+hours+":"+minutes;
                }
            return time_display;
        }

        export function fixtureTimeFormate(val){
            
                var time_display = "";
                var today = new Date();
                var UTC_date = new Date(val).toUTCString();
                var localTimeZone = new Date(UTC_date);
                var hours = localTimeZone.getHours();
                var minutes = localTimeZone.getMinutes();
                if(hours<10) {
                    hours='0'+hours;
                }
                if(minutes<10) {
                    minutes='0'+minutes;
                }
                    var date = localTimeZone.getDate();
                    var month = localTimeZone.getMonth()+1;
                    var year = localTimeZone.getFullYear();
                    if(date<10) {
                        date='0'+date;
                    }
                    if(month<10) {
                        month='0'+month;
                    }
                    var dayDifference = localTimeZone.getDate() - today.getDate();
                    if(dayDifference === 0){
                        time_display = "Today - "+hours+":"+minutes;
                    }
                    else if(dayDifference === 1){
                        time_display = "Tomorrow - "+hours+":"+minutes;
                    }
                    else{
                        time_display = date+"/"+month+"/"+year+" "+hours+":"+minutes;
                    }
                return time_display;
            }        
    
    export function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }