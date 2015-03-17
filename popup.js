// Global constants:
var parser = new DOMParser();
function parseURLParams(url) {
  var ret = {}, params = url.replace(/[^\?]*\?/, "").split("&");

  for (var param, i=0; param = params[i]; ++i) {
    var pair = param.split("=").map(decodeURIComponent);
    ret[pair[0]] = pair[1];
  }

  return ret;
}


/**
  Helper for defining abstract base classes

  Methods which must be implemented by subclasses
  are declared with @method declareMethod().
  If a subclass fails to implement a method declared
  in this way a descriptive @member Error will be
  thrown, which is more helpful than
  "Error: undefined is not a function"
*/
var Interface = {
  Error: (function(){

    function InterfaceError(ifaceName, className, methodName) {
      this.message = className + "." + methodName + "() not implemented: "
                               + "required by interface " + ifaceName;
    }

    InterfaceError.prototype = new Error();

    return InterfaceError;

  })(),

  declareMethod: function(iface, methodName) {
    function functionName(f) {
      return f.toString().replace(/function\s*([^\(]*)\(.*/, "$1");
    }
    var ifaceName = functionName(iface),
        className = functionName(this.constructor);

    iface.prototype[methodName] = function() {
      throw new Interface.Error(ifaceName, className, methodName);
    }
  }
};


/**
  Abstract base class for all URL log entries

  Defined as an interface since GIS Service URLs have
  diverse structure, and dedicated subclasses are much
  less fragile than switch(serviceType) statements.
*/
function URLLogEntry() {}
Interface.declareMethod(URLLogEntry, "href");
Interface.declareMethod(URLLogEntry, "label");
Interface.declareMethod(URLLogEntry, "linkText");
Interface.declareMethod(URLLogEntry, "asyncFetchMeta");

/**
  Unified URLLogEntry factory

  URLLogEntry also serves as a namespace and a factory
  for its subclasses.
*/
URLLogEntry.create = function(type, rawURL) {

  var LogEntry = URLLogEntry[type];

  if (LogEntry == null) return null;

  return LogEntry.create(rawURL);
}

/**
  Equality comparision

  Two instances of URLLogEntry are considered
  equivalent if their href are equal.
*/
URLLogEntry.prototype.equals = function(other) {
  return this.href() == other.href();
}



/**
  ArcGIS Service log entry

  TODO(bkietz) ArcGIS service URL taxonomy is diverse enough
  to warrant subclassing URLLogEntry.ArcGIS for each type
*/
URLLogEntry.ArcGIS = function(rawURL) {
  var urlParts = /^(http[^\?]*\/rest\/services\/[^\?]*)\/(\w*Server)\/(.*)$/i.exec(rawURL);
  if (urlParts == null) return null;

  this.urlBase     = urlParts[1];
  this.serviceType = urlParts[2];
  var urlRest      = urlParts[3];

  // augment with layer information, if applicable
  switch (this.serviceType) {
    case "FeatureServer":
      var layerId = /\d*/.exec(urlRest);
      if (layerId != null) {
        this.layerId = layerId[0];
      }
      break;

    case "MapServer":
      var layerId = /\d*/.exec(urlRest);
      if (layerId != null) {
        this.layerId = layerId[0];
        break;
      }
      else if (/tile/i.test(urlRest)) {
        this.layerId = "tiles";
        break;
      }
      else if (/dynamicLayer/i.test(urlRest)) {
        var layerParams = JSON.parse(parseURLParams(rawURL).layer);
        this.layerId = "dynamicLayer:" + layerParams.id;
      }
      break;

    case "GPServer":
      var taskName = urlRest;
      this.layerId = taskName;
      break;

    case "NAServer":
      var layerName = urlRest;
      this.layerId = this.layerName = layerName;
      break;

    case "GlobeServer":
      var layerId = /\d*/.exec(urlRest);
      if (layerId != null) {
        this.layerId = layerId[0];
      }
      break;
  }
}

URLLogEntry.ArcGIS.prototype = new URLLogEntry();

URLLogEntry.ArcGIS.create = function(rawURL) {
  return new URLLogEntry.ArcGIS(rawURL);
}

URLLogEntry.ArcGIS.prototype.href = function() {
  return [this.urlBase, this.serviceType, this.layerId].join('/');
}

URLLogEntry.ArcGIS.prototype.label = function() {
  return "ArcGIS " + this.serviceType;
  // + " @ " + this.urlBase.replace(/^[^\/]*\/\//,"");
}

URLLogEntry.ArcGIS.prototype.linkText = function() {
  return this.layerName || this.layerId;
}

URLLogEntry.ArcGIS.prototype.asyncFetchMeta = function($http) {
  var self = this;
  return $http
    .get(this.href() + "?f=json")
    .then(function(res){
      self.layerName = res.data.name;
      return self;
    });
}



/**
  WMS log entry
*/

URLLogEntry.WMS = function(rawURL) {
  var params = parseURLParams(rawURL);
  this.urlBase = /^(http[^\?]*)\?/i.exec(rawURL)[1];
  this.layers = params.LAYERS;
}

URLLogEntry.WMS.prototype = new URLLogEntry();

URLLogEntry.WMS.create = function(rawURL) {
  return new URLLogEntry.WMS(rawURL);
}

URLLogEntry.WMS.prototype.href = function() {
  return this.urlBase + "?service=WMS&REQUEST=GetCapabilities";
}

URLLogEntry.WMS.prototype.label = function() {
  return "WMS Layers";
}

URLLogEntry.WMS.prototype.linkText = function() {
  return this.layers;
}

URLLogEntry.WMS.prototype.asyncFetchMeta = function($http) {
  var self = this;

  return $http
    .get(this.href())
    .then(function(res){
      //TODO(bkietz)
      //  Every XPath I try against this document fails
      /*
      var doc = parser.parseFromString(res.data, "text/xml");
      var xpath = "//Layer";
      var x = doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null);

      if (window.doc == null) {
        window.doc = [];
        window.x = [];
      }
      window.doc.push(doc);
      window.x.push(x);
      //self.layerTitle =
      */
      return self;
    });
}



/**
  Container for URLLogEntry instances
*/

function URLLog() {
  this.entries = [];
}

URLLog.prototype.pushIfUnique = function(entry) {
  // insert this URLLogEntry only if it is unique
  var copies = this.entries.filter(function(e){ return e.equals(entry); });
  if (copies.length == 0) this.entries.push(entry);
}

URLLog.prototype.map = function(fn) {
  return this.entries.map(fn);
}


/**
  Angular application and controller for popup window
*/

var app = angular.module('GISServiceLog', []);

app.controller('GISServiceLogCtrl', [
  '$scope',
  '$http',
  '$q',
  function($scope, $http, $q) {

    $q(function(resolve, reject) {
      chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
        var servicesByTab = chrome.extension.getBackgroundPage().servicesByTab;
        resolve(servicesByTab[tabs[0].id]);
      });
    }).then(function(rawLog) {
      if (rawLog == null) return;
      console.log(rawLog);

      $scope.urlLog = new URLLog();

      for (var url in rawLog) {
        var type = rawLog[url];
        var entry = URLLogEntry.create(type, url);
        if (entry == null) continue;
        $scope.urlLog.pushIfUnique(entry);
      }

      var promises = $scope.urlLog.map(function(e) {
        return e.asyncFetchMeta($http);
      });

      console.log($scope.urlLog);

      return $q.all(promises);
    });
  }
]);
