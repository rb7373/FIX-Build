(function() {
    'use strict';

    angular.module('app', [
        /*
         * Everybody has access to these.
         * We could place these under every feature area,
         * but this is easier to maintain.
         */
        'app.core',
        'app.physics',
        'app.widgets', // needs core
        'app.layout'

        /*
         * Feature areas
         */
    ]);

})();