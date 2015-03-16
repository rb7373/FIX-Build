angular.module('app').directive("canvasAnimationDirective", function() {
  return {
    restrict: 'EA',
    scope: {
      color: '='
    },
    template: "<canvas width='400' height='400' style = 'border:blue 1px solid;'/>",
    link: function(scope, element, attrs) {
      //console.log(element);
      scope.canvas = element.find('canvas')[0];
      scope.context = scope.canvas.getContext('2d');

      scope.init = function() {

        console.log("Iniciando canvas");

        window.addEventListener('resize', scope.onWindowResize, false);
        document.addEventListener('mousemove', scope.onDocumentMouseMove, false);

      };

      scope.onWindowResize = function() {
        console.log(window.innerWidth);
        console.log(window.innerHeight);
      }

      element.bind('mousemove', function(event) {
        if (true) {
          // get current mouse position
          if (event.offsetX !== undefined) {
            currentX = event.offsetX;
            currentY = event.offsetY;
          } else {
            currentX = event.layerX - event.currentTarget.offsetLeft;
            currentY = event.layerY - event.currentTarget.offsetTop;
          }

          // set current coordinates to last one
          lastX = currentX;
          lastY = currentY;
        }

      });

      scope.init();


    }
  };
});