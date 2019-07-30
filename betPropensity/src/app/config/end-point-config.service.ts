/**
 * This file used to point live and uat end points.
 */
import { Injectable } from '@angular/core';

var baseUrl = "";

 let uatEndPoint ="https://betprop.uat.truewavetech.com";
 let prodEndPoint ="https://betprop.demo.truewavetech.com"

 

  if (window.location.hostname.includes('localhost') || window.location.hostname.includes('qabetpropensity.bettorlogic.com') || window.location.hostname.includes('betpropensityuat.bettorlogic.com')){
      baseUrl = uatEndPoint;     
   } else{
      baseUrl=prodEndPoint;    
   }

export const apiConfigurations = {
    "baseUrl": baseUrl
}
