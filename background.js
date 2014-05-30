var servicesByTab = {},
    serviceTypes = {
    /**
        ### URL format for [ArcGIS rest API][]
      
        Catalog:     `http://<host>/<instance>/rest/services[/<folderName>]`
        Xyz Service: `http://<catalog-url>/<serviceName>/XyzServer`
        Layer/Table: `http://<xyz-service-url>/<layerOrTableId>`
        Query:       `http://<layer-or-table-url>/query`
      
        [ArcGIS rest API]: http://resources.arcgis.com/en/help/rest/apiref
     */
      ArcGIS: /^(http.*\/rest\/services\/.*\/\w*Server(\/[^\?]*)?)\?/i,
		
    /**
      ### URL format for [OGC Web Map Service][]
      
      [OGC Web Map Service]: http://www.opengeospatial.org/standards/wms
     */
      WMS:    /^(http.*)\?.*SERVICE=WMS/i
	  
    };

  
var loggedRequests = [];

// use onRequestStart or something...
chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    var serviceUrl,
        serviceType,
        tabId = info.tabId;
  
    for(var type in serviceTypes) {
      if(serviceTypes[type].test(info.url)) {

        loggedRequests.push(info);
    
        serviceUrl = serviceTypes[type].exec(info.url)[1];
      
      if(serviceUrl) {
        serviceType = type;
        break;
      }
    }
  }
  
    // if it was not a service URL, we don't care
    if(!serviceType) return;
  
    // update service display
    chrome.pageAction.show(tabId);
      
    // if this tab has not invoked a service before
    if(!(tabId in servicesByTab)) {
      // initialize storage
      servicesByTab[tabId] = {};
    }
  
    // if we have already observed this service, return
    if(serviceUrl in servicesByTab[tabId]) return;
  
    // store this service URL
    servicesByTab[tabId][serviceUrl] = {type:serviceType};
  },
  // filters
  {
    urls: [
      "*://*/*"
    ]
  });

/*
chrome.extension.onMessage.addListener(
  function(message, sender, sendResponse){
    console.log("message to background", arguments);
  });
*/
