(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('SidenavLeftController', SidenavLeftController);

    SidenavLeftController.$inject = ['$scope', '$timeout', '$mdSidenav', '$log'];

    /* @ngInject */
    function SidenavLeftController($scope, $timeout, $mdSidenav, $log) {
        /* jshint validthis: true */
        var vm = this;

        vm.close = close;

        ////////////////

        function close() {
            $mdSidenav('left').close()
                .then(function(){
                    $log.debug("close LEFT is done");
                });
        }
    }
})();