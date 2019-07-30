class TipicoAPI {
  constructor() {
    // var uatEndPoint = "http://qabanners.bettorlogic.com/V6/Tipico_Ebet/Services/BannerService.svc";
    // var qaEndPoint = "http://qatipicoservices.bettorlogic.com/Services/BannerService.svc";
    var uatEndPoint = "http://tipicouatservices.bettorlogic.com/Services/BannerService.svc";
    this.baseUrl = "";
    if (window.location.hostname.match('tipicouat.bettorlogic.com')) {
      this.baseUrl = uatEndPoint;
    } else if (window.location.hostname.match('qatipico.bettorlogic.com')) {
      // this.baseUrl = qaEndPoint;
      this.baseUrl = uatEndPoint;
    } else {
      // this.baseUrl = qaEndPoint;
      this.baseUrl = uatEndPoint;
    }
  }

  getBannerStats(data, callback) {
    // fetch(this.baseUrl + '/GetBannerStats/?userId=' + data.userId + '&country=' + data.country + '&language=de').then(response => {
      fetch(this.baseUrl + '/getBannerStats/?userId=' + data.userId + '&country=' + data.country + '&language='+data.language).then(response => {
      if (response.ok) {
        response.json().then(json => {
          callback(json);
        });
      }
    });
  }
}

export default TipicoAPI;