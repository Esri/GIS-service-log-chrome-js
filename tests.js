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

var WMS_URLs = [
  "http://demo.boundlessgeo.com/geoserver/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=topp%3Astates&CRS=EPSG%3A3857&STYLES=&WIDTH=986&HEIGHT=532&BBOX=-15493510.732907763%2C2001752.0609463188%2C-5846546.267092237%2C7206807.939053681"
];

describe("parseURLParams", function() {

  it("parses 'search' (GET) URL parameters correctly", function() {

    expect(parseURLParams(WMS_URLs[0]))
      .toEqual({
        SERVICE: 'WMS',
        VERSION: '1.3.0',
        REQUEST: 'GetMap',
        FORMAT:  'image/png',
        TRANSPARENT: 'true',
        LAYERS:  'topp:states',
        CRS:     'EPSG:3857',
        STYLES:  '',
        WIDTH:   '986',
        HEIGHT:  '532',
        BBOX:    '-15493510.732907763,2001752.0609463188,-5846546.267092237,7206807.939053681'
      });
  });

});


describe("Interface", function() {

  // declare a trivial interface
  function AdderInterface() {}
  Interface.declareMethod(AdderInterface, "add");


  it("throws a helpful error when an unimplemented method is called", function() {
    function EmptyAdder() {}
    EmptyAdder.prototype = new AdderInterface();
    var empty = new EmptyAdder();

    try {
      empty.add(1, 2);
    }
    catch (e) {
      expect(e instanceof Interface.Error).toBe(true);
      expect(e.message).toBe("add() not implemented:\nrequired by interface AdderInterface");
    }
  });


  it("does not throw when an implemented method is called", function() {
    function ImplementsAdder() {}
    ImplementsAdder.prototype = new AdderInterface();
    ImplementsAdder.prototype.add = function(a,b) { return a+b; }
    var impl = new ImplementsAdder();

    var impl_add = function() { impl.add(1, 2); };
    expect(impl_add).not.toThrow();
  });

});


describe("URLLogEntry", function() {

/*
  // this is a test of the background page's functionality
  it("distinguishes between URLs of different service types", function() {
    URLLogEntry.create(WMS_URLs[0]);
  });
*/

});


describe("URLLogEntry.ArcGIS", function() {

  it("yields a URL to a page describing the web service", function() {
    var entry = URLLogEntry.ArcGIS.create("");
  });

});


describe("URLLogEntry.WMS", function() {

  var entry = URLLogEntry.WMS.create(WMS_URLs[0]);

  it("yields a URL to a page describing the web service", function() {
    // GetCapabilities is an XML file describing the WMS server's capabilities
    //   http://docs.geoserver.org/stable/en/user/services/wms/reference.html
    expect(entry.href()).toBe("http://demo.boundlessgeo.com/geoserver/wms?service=WMS&request=GetCapabilities&layers=topp:states");
  });

});
