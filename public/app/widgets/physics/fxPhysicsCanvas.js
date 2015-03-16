(function () {
    'use strict';

    angular
        .module('app.physics')
        .directive('fxPhysicsCanvas', fxPhysicsCanvas);

    fxPhysicsCanvas.$inject = ['Physics'];

    /* @ngInject */
    function fxPhysicsCanvas(Physics) {
        // Usage:
        // 
        // Creates:
        // 
        var directive = {
            compile: compile,
            controller: controller,
            transclude: true,
            restrict: 'E',
            templateUrl: 'fxPhysicsCanvas',
            scope: {
                width: '@',
                height: '@'
            }
        };
        return directive;

        function compile() {
            return {
                pre: preLink,
                post: postLink
            }
        }

        function preLink(scope, element) {
            var canvas = element[0].querySelector('canvas');
            var renderer = Physics.renderer('canvas', {
                el: canvas,
                width: scope.width,
                height: scope.height
            });

            Physics(function (world) {
                scope.world = world;
                world.add(renderer);
            });
        }

        function postLink(scope) {
            Physics.util.ticker.on(function (time) {
                scope.world.step(time);
            });

            scope.world.on('step', function () {
                scope.world.render();
            });

            Physics.util.ticker.start();
        }

        function controller($scope) {
            /* jshint validthis: true */
            var vm = this;
            vm.add = add;

            function add(thing) {
                $scope.world.add(thing);
            }
        }

    }
})();
