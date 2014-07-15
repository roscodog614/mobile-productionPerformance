'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp',
        [
            'ngRoute',
            'myApp.ng-breadcrumbs',
            'ui.bootstrap',
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
                ('/home', {
                        templateUrl: 'partials/home.html',
                        controller: 'ngcMain',
                        label: 'Home'
                    }
                );

                $routeProvider.when
                ('/home/prodPerfSumm', {
                        templateUrl: 'partials/prodPerfSumm.html',
                        controller: 'ngcProdPerfSumm',
                        label: '| Summary'
                    }
                );

                $routeProvider.when
                ('/home/prodPerfSumm/prodPerfDetails', {
                        templateUrl: 'partials/prodPerfDetails.html',
                        controller: 'ngcProdPerfDetails',
                        label: '| Details'
                    }
                );

                $routeProvider.otherwise({ redirectTo: 'home' });
            }
/*
            '$stateProvider',
            '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise("/");

                $stateProvider.state('home', {
                        url: '/home',
                        templateUrl: 'partials/home.html',
                        controller: 'ngcMain',
                    }
                );

                $stateProvider.state('prodPerfSumm', {
                        url: '/prodPerfSumm',
                        templateUrl: 'partials/prodPerfSumm.html',
                        controller: 'ngcProdPerfSumm',
                    }
                );
                $stateProvider.state('prodPerfDetails', {
                        url: '/prodPerfDetails',
                        templateUrl: 'partials/prodPerfDetails.html',
                        controller: 'ngcProdPerfDetails',
                    }
                );
            }
*/
        ]
    );