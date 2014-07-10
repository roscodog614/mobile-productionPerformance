'use strict';


// Declare app level module which depends on filters, and services
angular.module
    (
        'myApp',
        [
            'ngRoute',
            'myApp.filters',
            'myApp.services',
            'myApp.directives',
            'myApp.controllers'
        ]
    )
    .config
    (
        [
            '$routeProvider',
            function($routeProvider) {
                $routeProvider.when
                (
                    '/home',
                    {
                        templateUrl: 'partials/home.html',
                        controller: 'ngcMain'
                    }
                );

                $routeProvider.when
                (
                    '/prodPerfSumm',
                    {
                        templateUrl: 'partials/prodPerfSumm.html',
                        controller: 'ngcProdPerfSumm'
                    }
                );

                $routeProvider.when
                (
                    '/prodPerfDetails',
                    {
                        templateUrl: 'partials/prodPerfDetails.html',
                        controller: 'ngcProdPerfDetails'
                    }
                );

                $routeProvider.otherwise({ redirectTo: '/home' });
            }
        ]
    );