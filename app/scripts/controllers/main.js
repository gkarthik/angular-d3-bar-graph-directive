'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
