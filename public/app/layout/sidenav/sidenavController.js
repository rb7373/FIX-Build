(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('SidenavController', SidenavController);

    SidenavController.$inject = ['$scope', '$timeout', '$mdSidenav', '$log'];

    /* @ngInject */
    function SidenavController($scope, $timeout, $mdSidenav, $log) {
        /* jshint validthis: true */
        var vm = this;

        vm.toggleLeft = toggleLeft;
        vm.toggleRight = toggleRight;
        vm.title = 'SidenavController';

        ////////////////

        function toggleLeft() {
            $mdSidenav('left').toggle()
                .then(function(){
                    $log.debug("toggle left is done");
                });
        }

        function toggleRight() {
            $mdSidenav('right').toggle()
                .then(function(){
                    $log.debug("toggle right is done");
                });
        }
    }
})();