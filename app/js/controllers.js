'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('ngcMain',
        function($rootScope, $scope, $location, $route, $routeParams, $http, $log, breadcrumbs) {
            $log.log('Loading main controller');

            $scope.mppHeader = "Production Performance";
            $scope.ngsHomeH1 = function () {
                return {background: "green",
                        color: "white",
                        display: "inline"
                };

            };

            $scope.breadcrumbs = breadcrumbs;
        })
    .controller('ngcPlants',
        function ($rootScope, $scope, $location, $route, $routeParams, $http, $log) {
            $log.log('Loading plants controller');

            $scope.plants = [];

            $log.log('Getting plants');
            $http.get('http://oh-devcb-d05:9330/GetAllPlants')
                .success
                (
                    function(data) {
                        $scope.plants = data;
                    }
                );

        }
    )
    .controller('ngcTicketDatePicker',
        function ($rootScope, $scope, $location, $route, $routeParams, $http, $log) {
            $log.log('Loading date picker controller');
            $scope.today =
                function() {
                    $scope.ngmTicketDate = new Date();
                };
            $scope.today();

            $scope.open =
                function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    $scope.opened = true;
                };

            $scope.format = 'MM/dd/yyyy';

        }
    )
    .controller('ngcGetPlantTickets',
        function ($rootScope, $scope, $location, $route, $routeParams, $http, $log, ticketDataService, breadCrumbsDataService) {
            $log.log('Loading get plant tickets controller');

            $scope.tickets =
                function(selectedPlant, selectedDate) {
                    $log.log('Getting tickets for specified date');
                    try {
                        if (selectedPlant !== 'undefined' && selectedDate !== 'undefined') {
                            var formattedDate = (selectedDate.getMonth() + 1) + '/' + selectedDate.getDate() + '/' + selectedDate.getFullYear();

                            $http.get('http://oh-devcb-d05:9330/GetPlantTickets?plant=' + selectedPlant + '&date=' + formattedDate)
                                .success
                                (
                                    function(data) {
                                        ticketDataService.setTickets(data);
                                        breadCrumbsDataService.setBreadCrumbs($scope.breadcrumbs);
                                        $location.url('/home/prodPerfSumm');
                                    }
                                );
                        }
                    } catch (err) {
                        $log.log('Error getting tickets: ' + err);
                    }
                };

        }
    )
    .controller('ngcClear',
        function($rootScope, $scope, $location, $route, $routeParams, $http, $log) {
            $log.log('Loading clear controller');

            $scope.clearFilters =
                function() {
                    $route.reload();
                };
        }
    )
    .controller('ngcProdPerfSumm',
        function ($rootScope, $scope, $location, $route, $routeParams, $http, $log, ticketDataService, breadCrumbsDataService) {
            $scope.tickets = ticketDataService.getTickets();
            $scope.breadcrumbs = $scope.breadcrumbs + breadCrumbsDataService.getBreadCrumbs();

            /*
                        startTime = $scope.tickets.StartTime;
            startTime = (startTime.getMonth() + 1) + '/' + startTime.getDate() + '/' + startTime.getFullYear();
            $scope.tickets.StartTime = startTime;
*/
        }
    )
    .controller('ngcGetDetails',
        function ($rootScope, $scope, $location, $route, $routeParams, $http, $log, detailDataService, breadCrumbsDataService) {
            $scope.details =
                function(selectedTicket) {
                    $log.log('Getting production performance details for selected date');
                    try {
                        if (selectedTicket !== 'undefined') {

                            $http.get('http://oh-devcb-d05:9330/GetPlantProductionRecord?DispatchTicketCode=' + selectedTicket)
                                .success
                                (
                                    function(data) {
                                        detailDataService.setDetails(data);
                                        breadCrumbsDataService.setBreadCrumbs($scope.breadcrumbs);
                                        $location.url('/home/prodPerfSumm/prodPerfDetails');
                                    }
                                );
                        };
                    } catch (err) {
                        $log.log('Error getting production performance details: ' + err);
                    };

                };
        }
    )
    .controller('ngcProdPerfDetails',
        function ($rootScope, $scope, $location, $route, $routeParams, $http, $log, detailDataService, breadCrumbsDataService) {
            $scope.details = detailDataService.getDetails();
            $log.log('details loaded: ' + $scope.details);
            $scope.breadcrumbs = $scope.breadcrumbs + breadCrumbsDataService.getBreadCrumbs();
            $log.log('scope_breadcrumbs: ' + $scope.breadcrumbs);

        }
    );