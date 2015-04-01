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

var WMS_URLs = {
  topp_states_getmap: "http://demo.boundlessgeo.com/geoserver/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=topp%3Astates&CRS=EPSG%3A3857&STYLES=&WIDTH=986&HEIGHT=532&BBOX=-15493510.732907763%2C2001752.0609463188%2C-5846546.267092237%2C7206807.939053681"
};

var ArcGIS_URLs = {
  world_topo_tilemap: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tilemap/2/0/0/8/8",
  world_topo_tile_200: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/2/0/0",
  world_topo_tile_220: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/2/2/0"
};

/*[
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tilemap/2/0/0/8/8",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/2/0/0",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/2/1/0",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/2/2/0",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/2/3/0",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/2/0/1",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/2/1/1",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/2/2/1",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/2/3/1",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/2/0/2",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/2/1/2",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/2/2/2",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/2/3/2",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/2/0/3",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/2/1/3",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/2/2/3",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/2/3/3",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tilemap/16/25304/10504/8/8",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tilemap/16/25312/10504/8/8",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/Council_Dist/FeatureServer/0?f=json",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25305/10507",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25306/10507",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25307/10507",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25308/10507",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25309/10507",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25310/10507",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25311/10507",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25305/10508",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25306/10508",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25307/10508",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25308/10508",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25309/10508",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25310/10508",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25311/10508",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25305/10509",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25306/10509",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25307/10509",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25308/10509",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25309/10509",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25310/10509",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25311/10509",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25305/10510",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25306/10510",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25307/10510",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25308/10510",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25309/10510",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25310/10510",
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25311/10510",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25312/10507",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25312/10508",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25312/10509",
  "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/16/25312/10510",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/streets/FeatureServer/0?f=json",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/Council_D…3A4000%2C%22maxRecordCount%22%3A2000%2C%22maxVertexCount%22%3A250000%7D%5D",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/Parks/FeatureServer/0?f=json",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/streets/F…3A4000%2C%22maxRecordCount%22%3A2000%2C%22maxVertexCount%22%3A250000%7D%5D",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/COB_LAND/FeatureServer/0?f=json",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/Parks/Fea…3A4000%2C%22maxRecordCount%22%3A2000%2C%22maxVertexCount%22%3A250000%7D%5D",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/CityTrees/FeatureServer/0?f=json",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/COB_LAND/…3A4000%2C%22maxRecordCount%22%3A2000%2C%22maxVertexCount%22%3A250000%7D%5D",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/Parks/Fea…alReference%22%3A%7B%22wkid%22%3A102100%2C%22latestWkid%22%3A3857%7D%7D%7D",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/CityTrees…3A4000%2C%22maxRecordCount%22%3A2000%2C%22maxVertexCount%22%3A250000%7D%5D",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/CityTrees…%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&outSR=102100",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/CityTrees…%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&outSR=102100",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/CityTrees…%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&outSR=102100",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/CityTrees…%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&outSR=102100",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/CityTrees…%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&outSR=102100",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/CityTrees…%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&outSR=102100",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/CityTrees…%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&outSR=102100",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/CityTrees…%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&outSR=102100",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/CityTrees…%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&outSR=102100",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/CityTrees…%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&outSR=102100",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/CityTrees…%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&outSR=102100",
  "http://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/CityTrees…%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&outSR=102100"
];*/

describe("parseURLParams", function() {

  it("parses 'search' (GET) URL parameters correctly", function() {

    var url = WMS_URLs.topp_states_getmap;

    expect(parseURLParams(url))
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
  });
*/

});


describe("URLLogEntry.ArcGIS", function() {

  it("yields a URL to a page describing the web service", function() {

    var url = ArcGIS_URLs.world_topo_tilemap;
    var entry = URLLogEntry.ArcGIS.create(url);

    expect(entry.href()).toBe("http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tilemap");
  });

});


describe("URLLogEntry.WMS", function() {

  it("yields a URL to a page describing the web service", function() {

    var url = WMS_URLs.topp_states_getmap;
    var entry = URLLogEntry.WMS.create(url);

    expect(entry.href()).toBe("http://demo.boundlessgeo.com/geoserver/wms?service=WMS&request=GetCapabilities&layers=topp:states");
  });

});


describe("URLLog", function() {

  it("collapses equivalent URLs into one log entry", function() {

    var url1 = ArcGIS_URLs.world_topo_tile_200,
        url2 = ArcGIS_URLs.world_topo_tile_220;
    var entry1 = URLLogEntry.ArcGIS.create(url1),
        entry2 = URLLogEntry.ArcGIS.create(url2);

    var log = new URLLog();

    log.pushIfUnique(entry1);
    log.pushIfUnique(entry2);

    expect(log.entries.length).toBe(1);
  });

});
