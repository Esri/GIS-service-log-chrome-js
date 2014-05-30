chrome.tabs.query({active:true,currentWindow:true},
  function(tabs){
    var tab = tabs[0],
        serviceUrls = chrome.extension.getBackgroundPage().servicesByTab[tab.id];
        
    console.log(tab, serviceUrls); 
    
    // modify the popup to display the urls garnered thus far
	document.body.innerHTML = "<h3> Detected GIS services: </h3>";
	
    for(var url in serviceUrls) {
      var type = serviceUrls[url].type,
        describeUrl;
          
      switch(type) {
        case "ArcGIS":
          describeUrl = url;
          break;
          
        case "WMS":
          describeUrl = url + "?service=WMS&REQUEST=GetCapabilities";
          break;
      }
      
      document.body.innerHTML += 
        "<p>" + type + ": " +
		"<a target='_blank' href='"+ describeUrl +"'>"+ 
        url.replace(/^http(s)?:\/\//,"")+
        "</a></p>";
    }
  });