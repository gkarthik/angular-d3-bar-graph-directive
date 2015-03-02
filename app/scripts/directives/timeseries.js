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
      scope: {
        jsonFile: '='
      },
      link: function postLink(scope, element, attrs) {
        var w = 600, 
            h = 300,
            mX = 40,
            mY = 30;
        var svg = d3.select(element[0])
          .attr('width', w)
          .attr('height', h)
          .style('border', '2px solid #333');
        scope.$watch('jsonFile', function(newJSON, oldJSON){      
          var data = newJSON;
          var lineData = [];
          for(var t in data){
            data[t].USERS = parseInt(data[t].USERS);
          }

          var x;
          if(data.length > 0 ){
            x = d3.time.scale()
                    .domain([new Date(data[0].DAY), new Date(data[data.length-1].DAY)])
                    .range([0 , w-(2*mX)]);
          } else {
            x = d3.time.scale().domain([]).range([0, w-(2*mX)]);
          }           
          var xAxis = d3.svg.axis()
                        .scale(x)
                        .orient('bottom');
          svg.append('svg:g')
              .attr('class','xaxis axis') 
              .attr('transform', 'translate('+(mX)+', '+parseInt(h-mY)+')')
              .call(xAxis);
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
                            .attr('class', 'lines-circle-wrapper');
          
          var overlayRect = wrapper.append('svg:rect')
                            .attr('height', h-2*mY)
                            .attr('width', w-2*mX)
                            .attr('fill', '#FFF')
                            .attr('transform','translate('+mX+','+parseInt(mY-1)+')');

          overlayRect.on('mouseenter', function(){
            d3.select(this).append('svg:text').attr('class','data-alert').attr('transform', 'translate('+d3.mouse(this)+')').text('Hello World!').style('fill','#000');
          });
          overlayRect.on('mouseleave', function(){
            d3.select(this).selectAll('.data-alert').remove();
          });
          var bars = wrapper.selectAll('.users').data(data);
          
          bars.enter()
            .append('svg:circle')
            .attr('class','users')
            .attr('r', 3)
            .attr('cx', function(d, i){
              var cx = mX+x(new Date(d.DAY));
              if(i > 0){
                lineData[i-1].x2 = cx;
              }
              if(i < data.length-1){
                lineData.push({x1: cx, y1: 0, x2: 0, y2: 0 });
              }
              return cx;
            }) 
            .attr('cy', h-mY)
            .style('fill', 'steelblue');
          bars.transition().duration(500)
            .attr('cy', function(d, i){
              var cY = h-1-mY-y(d.USERS);
              if(i > 0){
                lineData[i-1].y2 = cY;
              }
              if(i < data.length-1){
                lineData[i].y1 = cY;
              }
              return cY; 
            });
          bars.exit().remove(); 
          var lines = wrapper.selectAll('.data-lines').data(lineData);
          lines.enter()
            .append('svg:line')
            .attr('x1', function(d){
              return d.x1;
            })
            .attr('x2', function(d){
              return d.x2;
            })
            .attr('y1', function(d){
              return h-mY;
            })
            .attr('y2', function(d){
              return h-mY;
            })
            .style('stroke', 'steelblue')
            .style('stroke-width', '3px');
          lines.transition().duration(500)
            .attr('y1', function(d){
              return d.y1;
            })
            .attr('y2', function(d){
              return d.y2;
            })
          lines.exit().remove();
        });
      }
    };
  });
