angular.module('qualityControlApp')
  .directive('chart',function(){
    return{
      restrict:'AE',
      replace:true,
      scope:{
        option:'@'
      },
      link:function(scope,element,attr){
        function init(){
          var option=JSON.parse(scope.option);
          option.chart = option.chart || {};
          option.chart.renderTo = option.chart.renderTo || element[0];
          var chartObj = new Highcharts.Chart(option);
        }
        init();
        attr.$observe("option",function(){
          init();
        })
      }
    }
})
