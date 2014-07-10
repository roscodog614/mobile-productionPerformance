'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ui.bootstrap'])
    .controller('ngcMain',
        function($rootScope, $scope, $log) {
            $log.log('Loading web main controller');

            $scope.mppHeader = "Production Performance";
            $scope.ngsHomeH1 =
                function() {
                    return {
                        background: "green",
                        color: "white",
                        display: "inline"
                    };
                };
        }
    )
    .controller('ngcPlants',
        function($rootScope, $scope, $log, $location, $route, $http) {
            $log.log('Getting plants for plant dropdown');

            $scope.plants = [];

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
        function($rootScope, $scope, $log) {
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
        function ($rootScope, $scope, $log, $location, $route, $routeParams, $http, ticketDataService) {
            $scope.tickets = [];
            $scope.tickets =
                function (selectedPlant, selectedDate) {
                    $log.log('Getting tickets for specified date');
                    try {
                        if (selectedPlant !== 'undefined' && selectedDate !== 'undefined') {
                            var formattedDate = (selectedDate.getMonth() + 1) + '/' + selectedDate.getDate() + '/' + selectedDate.getFullYear();

                            $http.get('http://oh-devcb-d05:9330/GetPlantTickets?plant=' + selectedPlant + '&date=' + formattedDate)
                                .success
                                (
                                    function(data) {
                                        ticketDataService.setTickets(data);
                                        $location.url('/prodPerfSumm');
                                    }
                                );
                        }
                    }
                    catch (err) {
                        $log.log('Error getting tickets: ' + err);
                    }
                };
        }
    )
    .controller('ngcClear',
        function ($rootScope, $scope, $log, $location, $route) {
            $scope.clearFilters =
                function () {
                    $route.reload();
                };
        }
    )
    .controller('ngcProdPerfSumm',
        function ($rootScope, $scope, $filter, $log, $location, ticketDataService) {
            $scope.tickets = [];
            $scope.tickets = ticketDataService.getTickets();
        }
    )
    .controller('ngcGetDetails',
        function ($rootScope, $scope, $log, $location, $route, $routeParams, $http, detailDataService) {
            $scope.details = [];
            $scope.details = 
                function (selectedTicket) {
                    $log.log('Getting production performance details for selected date');
                    try {
                        if (selectedTicket !== 'undefined') {

                            $http.get('http://oh-devcb-d05:9330/GetPlantProductionRecord?DispatchTicketCode=' + selectedTicket)
                            .success
                            (
                                function (data) {
                                    detailDataService.setDetails(data);
                                    $location.url('/prodPerfDetails');
                                }
                            );
                        }
                    }
                    catch (err) {
                        $log.log('Error getting production performance details: ' + err);
                    }

                }
            }
        )

    .controller('ngcProdPerfDetails',
        function ($rootScope, $scope, $filter, $log, $location, detailDataService) {
            $scope.tickets = [];
            $scope.tickets = detailDataService.getDetails();
        }
    )
    ;