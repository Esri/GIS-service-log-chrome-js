# GIS-service-log-chrome-js

Chrome Extension for easy grabbination of GIS service URLs

![Screenshot.png should go here][screenshot]

## Features
* Displays an icon if a GIS web service was invoked
* Clicking the icon spawns a popup displaying the raw urls of the detected services
* Currently detects WMS and ArcGIS REST

## Instructions

1. Fork and then clone the repo. 
2. Follow the instructions [here](http://developer.chrome.com/extensions/getstarted#unpacked). 
   TL;DR: go to chrome://extensions, enable developer mode, click 
   “Load unpacked extension” and open the path to the repository root.

## Requirements

* Google Chrome
* Site which invokes a GIS web service. [For example](http://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer?f=jsapi)

## Resources

* [ArcGIS for JavaScript API Resource Center](http://help.arcgis.com/en/webapi/javascript/arcgis/index.html)
* [ArcGIS Blog](http://blogs.esri.com/esri/arcgis/)
* [twitter@esri](http://twitter.com/esri)

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

## Licensing
Copyright 2013 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license.txt](license.txt) file.

[](Esri Tags: GIS Web Mapping WMS REST)
[](Esri Language: JavaScript)​
[screenshot]: Screenshot.png "The popup will display links to any detected GIS web services"
