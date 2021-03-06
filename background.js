/**
  Copyright 2015 Esri

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

  See the License for the specific language governing permissions and
  limitations under the License.​
*/

var servicesByTab = {},

    // TODO(bkietz) add tests for these
    serviceRegexes = {
    /**
      ### URL format for [ArcGIS rest API][]

      Catalog:     `http://<host>/<instance>/rest/services[/<folderName>]`
      Xyz Service: `http://<catalog-url>/<serviceName>/XyzServer`

      [ArcGIS rest API]: http://resources.arcgis.com/en/help/rest/apiref
     */
      ArcGIS: /^http[^\?]*\/rest\/services\/[^\?]*\/\w*Server/i,

    /**
      ### URL format for [OGC Web Map Service][]

      [OGC Web Map Service]: http://www.opengeospatial.org/standards/wms
     */
      WMS:    /^http[^\?]*\?[^\?]*SERVICE=WMS/i

    };

/**
  Check if the url refers to a GIS service.
  Returns an the name of the RegEx which matchedl or null.
*/
function parseServiceURL(url) {
  for(var type in serviceRegexes) {
    if(serviceRegexes[type].test(url)) {
      return type;
    }
  }
  return null;
}

// use onRequestStart or something...
chrome.webRequest.onBeforeRequest.addListener(function(info) {
  var tabId = info.tabId;
  if (tabId < 0) return;

  // if this tab has not invoked a service before
  if (!(tabId in servicesByTab)) {
    // initialize storage
    servicesByTab[tabId] = {};
  }

  // if we have already observed this service, return
  if (info.url in servicesByTab[tabId]) return;

  var serviceType = parseServiceURL(info.url);
  if (serviceType == null) return;

  // update service display
  chrome.pageAction.show(tabId);

  // store this service URL
  servicesByTab[tabId][info.url] = serviceType;
},
// filters
{
  urls: [ "*://*/*" ]
});

/*
chrome.extension.onMessage.addListener(
  function(message, sender, sendResponse){
    console.log("message to background", arguments);
  });
*/
