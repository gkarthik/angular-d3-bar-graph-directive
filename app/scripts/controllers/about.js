'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
