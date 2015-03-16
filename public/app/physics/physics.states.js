(function() {
    'use strict';
    var physics = angular.module('app.physics');

    physics.config(states);

    function states($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider

            // HOME STATES AND NESTED VIEWS ========================================
            .state('physics', {
                url: '/simulations',
                templateUrl: 'animations/physics'
            })

            // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
            .state('about', {
                // we'll get to this in a bit
            });

    }

})();