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
        var w = 600, 
            h = 300,
            mX = 40,
            mY = 30;
        var svg = d3.select(element[0])
          .attr('width', w)
          .attr('height', h)
          .style('border', '2px solid #333');
        d3.json(attrs.jsonFile, function(data){
          for(var t in data){
            data[t].USERS = parseInt(data[t].USERS);
          }
          var x = d3.time.scale()
                    .domain([new Date(data[0].DAY), new Date(data[data.length-1].DAY)])
                    .range([0 , w-(2*mX)]);
          var xAxis = d3.svg.axis()
                        .scale(x)
                        .orient('bottom');
          svg.append('svg:g')
              .attr('class','xaxis axis') 
              .attr('transform', 'translate('+mX+', '+parseInt(h-mY)+')')
              .call(xAxis);
              console.log(Math.min.apply(0,_.pluck(data, 'USERS') ));
          var y = d3.scale.linear()
                    .domain([ Math.min.apply(0,_.pluck(data, 'USERS') ), Math.max.apply(0, _.pluck(data, 'USERS'))])
                                                                          .range([0 , parseInt(h-(2*mY))]);
          var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient('left');
          svg.append('svg:g')
              .attr('class','yaxis axis') 
              .attr('transform', 'translate('+mX+', '+mY+')')
              .call(yAxis);

          var wrapper = svg.append('svg:g')
                            .attr('translate','transform('+parseInt(mX+10)+',0)');
          
          wrapper.selectAll('.users').data(data).enter()
            .append('svg:rect')
            .attr('class','users')
            .attr('height', function(d){
              return y(d.USERS);
            })
            .attr("x", function(d){
              return mX+x(new Date(d.DAY));
            })
            .attr("y", function(d){
              return h-1-mY-y(d.USERS);
            })
            .attr('width', 10)
            .style("fill", "steelblue");
        });
      }
    };
  });
