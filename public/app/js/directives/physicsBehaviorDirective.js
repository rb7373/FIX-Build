angular.module('app').directive("physicsBehavior", function(Physics) {
  return {
    restrict: "E",
    require: '^physicsCanvas',
    scope: {
      name: "@"
    },
    link: function(scope, elements, attrs, canvasCtrl) {
      canvasCtrl.world.add(Physics.behavior(scope.name));
    }
  };
});