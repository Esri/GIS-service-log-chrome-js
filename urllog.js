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

    function InterfaceError(ifaceName, methodName) {
      this.message = methodName + "() not implemented:\n"
                               + "required by interface " + ifaceName;
    }

    InterfaceError.prototype = new Error();

    return InterfaceError;

  })(),

  declareMethod: function(iface, methodName) {
    function functionName(f) {
      return f.toString().replace(/function\s*([^\(]*)\(.*/, "$1");
    }

    iface.prototype[methodName] = function() {
      var ifaceName = functionName(iface);

      throw new Interface.Error(ifaceName, methodName);
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
  var urlParts = /^(http[^\?]*\/rest\/services\/[^\?]*)\/(\w*Server)(.*)$/i.exec(rawURL);
  if (urlParts == null) return null;

  this.urlBase     = urlParts[1];
  this.serviceType = urlParts[2];
  var urlRest      = urlParts[3];

  // augment with layer information, if applicable
  switch (this.serviceType) {
    case "FeatureServer":
      var layerId = /^\/(\d+)/.exec(urlRest);
      if (layerId != null) {
        this.layerId = layerId[1];
      }
      break;

    case "MapServer":
      var layerId = /^\/(\d+)/.exec(urlRest);
      if (layerId != null) {
        this.layerId = layerId[1];
        break;
      }
      else if (/^\/tile/i.test(urlRest)) {
        this.layerName = this.layerId = "tilemap";
        break;
      }
      else if (/\/dynamicLayer/i.test(urlRest)) {
        //TODO(bkietz) this is broken- produces incorrect href.
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
      var layerId = /^\/(\d+)/.exec(urlRest);
      if (layerId != null) {
        this.layerId = layerId[1];
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
  return this.layerName || this.layerId || this.serviceType;
}

URLLogEntry.ArcGIS.prototype.asyncFetchMeta = function($http) {
  var self = this;
  return $http
    .get(this.href() + "?f=json")
    .then(function(res) {
      if (self.layerName == null) {
        self.layerName = res.data.name;
      }
      return self;
    });
}



/**
  WMS log entry

  TODO(bkietz) WMS.create should probably emit one entry for each layer...
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
  return this.urlBase + "?service=WMS&request=GetCapabilities&layers=" + this.layers;
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
