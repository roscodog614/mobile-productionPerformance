'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ui.bootstrap'])
    .controller('ngcMain',
        function($rootScope, $scope, $log) {
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
        function ($rootScope, $scope, $log, $location, $route, $routeParams, $http, dataService) {
            $scope.tickets = [];
            $scope.tickets =
                function(selectedPlant, selectedDate) {
                    var formattedDate = (selectedDate.getMonth() + 1) + '/' + selectedDate.getDate() + '/' + selectedDate.getFullYear();

                    $http.get('http://oh-devcb-d05:9330/GetPlantTickets?plant=' + selectedPlant + '&date=' + formattedDate)
                        .success
                        (
                            function(data) {
                                dataService.setTickets(data);
                                $scope.tickets = data;
                                $location.url('/prodPerfSumm');
                            }
                        );
                };
        }
    )


    .controller('ngcProdPerfSumm',
        function ($rootScope, $scope, $filter, $log, $location, dataService) {
            $scope.tickets = [];
            $scope.tickets = dataService.getTickets();
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

;
