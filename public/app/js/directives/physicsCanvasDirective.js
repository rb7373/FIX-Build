angular.module('app').directive("physicsCanvas", function(Physics) {
  return {
    restrict: "E",
    transclude: true,
    template: "<canvas width={{width}} height={{height}}></canvas><div ng-transclude></div>",
    scope: {
      width: "@",
      height: "@",
      init: "&"
    },
    controller: function() {
      var me = this;

      me.world = Physics();
      me.world.on("step", function() {
        me.world.render();
      });

      var start = function() {
        Physics.util.ticker.on(function(time) {
          me.world.step(time);
        });
        Physics.util.ticker.start()
      };
      me.ticker = {
        start: start
      };
    },
    compile: function(element, attributes) {
      return {
        pre: function(scope, element, attrs, ctrl) {},
        post: function(scope, element, attrs, ctrl) {
          var canvas = element.find("canvas");
          var renderer = Physics.renderer('canvas', {
            el: canvas[0],
            width: scope.width,
            height: scope.height
          });
          ctrl.world.add(renderer);
          canvas.attr("style", "");
          if (scope.init) {
            scope.init({
              "world": ctrl.world
            });
          }
          ctrl.ticker.start();
        }
      };
    }
  };
});