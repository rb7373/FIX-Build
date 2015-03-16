angular.module('app').directive("physicsBody", function(Physics) {
  return {
    restrict: "E",
    require: '^physicsCanvas',
    scope: {
      options: "=",
      body: "=",
      type: "@"
    },
    link: function(scope, elements, attrs, canvasCtrl) {
      scope.body = Physics.body(scope.type, scope.options);
      canvasCtrl.world.add(scope.body);
    }
  };
});