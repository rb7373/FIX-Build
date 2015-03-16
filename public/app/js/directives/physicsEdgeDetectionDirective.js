angular.module('app').directive("physicsEdgeDetection", function (Physics) {
        return {
            restrict: "E",
            require: '^physicsCanvas',
            scope: {
                minX: "@",
                minY: "@",
                maxX: "@",
                maxY: "@",
                restitution: "@"
            },
            link: function (scope, elements, attrs, canvasCtrl) {
                var bounds = Physics.aabb(parseInt(scope.minX),
                    parseInt(scope.minY),
                    parseInt(scope.maxX),
                    parseInt(scope.maxY));
                canvasCtrl.world.add(Physics.behavior('edge-collision-detection', {
                    aabb: bounds,
                    restitution: parseFloat(scope.restitution)
                }));
            }
        };
    });