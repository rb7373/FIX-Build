(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('SidenavRightController', SidenavRightController);

    SidenavRightController.$inject = ['$scope', '$timeout', '$mdSidenav', '$log'];

    /* @ngInject */
    function SidenavRightController($scope, $timeout, $mdSidenav, $log) {
        /* jshint validthis: true */
        var vm = this;

        vm.close = close;

        ////////////////

        function close() {
            $mdSidenav('right').close()
                .then(function(){
                    $log.debug("close RIGHT is done");
                });
        };
    }
})();