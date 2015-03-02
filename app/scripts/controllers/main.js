'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.dauJSON = [];
    $http.get('/sample-data/dailyusers.json').
      success(function(data, status, headers, config) {
        $scope.dauJSON = data;
      }).
      error(function(data, status, headers, config) {
        console.log("error getting dau data.");
      });
  });
