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
      // TODO(bkietz) $scope.urlLog should probably be populated
      //   only once then cached, with a refresh button.
      //   (Better yet, send a message from background when new urls are available for this tab.)
      //   Currently it is generated every time the popup is opened

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
