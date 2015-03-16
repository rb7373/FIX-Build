(function () {
    'use strict';

    angular
        .module('app.physics')
        .directive('fxPhysicsBody', fxPhysicsBody);

    fxPhysicsBody.$inject = ['Physics'];

    /* @ngInject */
    function fxPhysicsBody(Physics) {
        // Usage:
        // 
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'E',
            require: '^fxPhysicsCanvas',
            scope: {
                options: '=',
                body: '=',
                type: '@'
            }
        };
        return directive;

        function link(scope, element, attrs, canvas) {
            scope.body = Physics.body(scope.type, scope.options);
            canvas.add(scope.body);
        }
    }
})();