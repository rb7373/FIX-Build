(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('TopbarController', TopbarController);

    TopbarController.$inject = ['$scope', '$element'];

    /* @ngInject */
    function TopbarController($scope, $element) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'TopbarController';

        activate();

        ////////////////

        function activate() {

        }
    }
})();