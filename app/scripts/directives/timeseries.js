'use strict';

/**
 * @ngdoc directive
 * @name connectApp.directive:timeSeries
 * @description
 * # timeSeries
 */
angular.module('connectApp')
  .directive('timeSeries', function () {
    return {
      template: '<svg></svg>',
      restrict: 'E',
      replace: 'true',
      templateNamespace: 'svg',
      link: function postLink(scope, element, attrs) {
        $(element).css("height", 200);
        var svg = d3.select(element[0])
          .attr('width', 400)
          .attr('height', 400)
          .style('border', '2px solid #333');
        svg.append("text").text('DAU');




      }
    };
  });
