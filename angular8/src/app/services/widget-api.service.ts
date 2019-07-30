import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class WidgetApiService {

  constructor(private http: HttpClient) {}

  getTennisBets(){
   // return this.http.get<any>(`http://qaproducts.bettorlogic.com/Default-Site/GetLiveBets.json`);
   return this.http.get<any>(`https://qabetonlinelivelogic.bettorlogic.com/Sports/Tennis/TennisLiveLogicService.svc/GetLiveBets`);
  
  }

  getIceHockeyBets(){
    return this.http.get<any>(`https://qabetonlinelivelogic.bettorlogic.com/Service/LiveLogicService.svc/getlivebets`);
  }

  getSoccerBets(){
    return this.http.get<any>(`https://qabetonlinelivelogic.bettorlogic.com/Soccer/Service/SoccerLiveLogicService.svc/GetSoccerLiveBets`);
  }
  getConfig(){
    return this.http.get<any>('../../../assets/js/config.json');
  }

  getIceHockeyEvent(eventId){
    return this.http.get<any>(`https://qabetonlinelivelogic.bettorlogic.com/Service/LiveLogicService.svc/getlivebetsbyevent?eventid=`+ eventId);
  }

  getTennisEvent(eventId){
   // return this.http.get<any>(`https://qabetonlinelivelogic.bettorlogic.com/Service/LiveLogicService.svc/getlivebetsbyevent?eventid=`+ eventId);
   return this.http.get<any>(`https://qabetonlinelivelogic.bettorlogic.com/Sports/Tennis/TennisLiveLogicService.svc/GetLiveBetsByEvent?eventId=`+eventId);
  }

  getSoccerEvent(eventId){
   // return this.http.get<any>(`https://qabetonlinelivelogic.bettorlogic.com/Service/LiveLogicService.svc/getlivebetsbyevent?eventid=`+ eventId);
   return this.http.get<any>(`https://qabetonlinelivelogic.bettorlogic.com/Soccer/H2H/Service/SoccerLiveLogicService.svc/GetSoccerEventWidget?eventId=`+ eventId);
  }

  getHtoHData(eventId){
    return this.http.get<any>(`https://qabetonlinelivelogic.bettorlogic.com/Soccer/H2H/Service/SoccerLiveLogicService.svc/GetSoccerHead2HeadWidget?eventId=` + eventId);
  }

}
