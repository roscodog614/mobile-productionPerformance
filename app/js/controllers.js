'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ui.bootstrap'])
    .controller('ngcMain',
        function($rootScope, $scope, $log, $location, $route, $http) {
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

            $scope.tickets = [];
            $scope.tickets =
                function(selectedPlant, selectedDate) {
                    var formattedDate = (selectedDate.getMonth() + 1) + '/' + selectedDate.getDate() + '/' + selectedDate.getFullYear();

                    $http.get('http://oh-devcb-d05:9330/GetPlantTickets?plant=' + selectedPlant + '&date=' + formattedDate)
                        .success
                        (
                            function(data) {
                                $scope.tickets = data;
                                alert('Length: ' + $scope.tickets.length);
                                alert('TicketCode 0:' + $scope.tickets[0].DispatchTicketCode);
                            }
                        );
                    $location.path('/prodPerfSumm');
                };
            
            /*
             $scope.myPlant = $routeParams.myPlant;
             $scope.myDate = $routeParams.myDate;
             */
        }
    )
    .controller('ngcTicketDatePicker',
        function($rootScope, $scope, $log, $location, $route, $http) {
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
/*
    .controller('ngcSearch',
        function($rootScope, $scope, $log, $location, $route, $routeParams, $http) {
            $scope.tickets = [];
            $scope.tickets =
                function(selectedPlant, selectedDate) {
                    alert($scope.ngmPlant);
                    var formattedDate = (selectedDate.getMonth() + 1) + '/' + selectedDate.getDate() + '/' + selectedDate.getFullYear();

                    $http.get('http://oh-devcb-d05:9330/GetPlantTickets?plant=' + selectedPlant + '&date=' + formattedDate)
                        .success
                        (
                            function(data) {
                                $scope.tickets = data;
                                alert('Length: ' + $scope.tickets.length);
                                alert('TicketCode 0:' + $scope.tickets[0].DispatchTicketCode);
                            }
                        );
                };
            alert('Length2: ' + $scope.tickets.length);
            $location.path('/prodPerfSumm');
            /*
             $scope.myPlant = $routeParams.myPlant;
             $scope.myDate = $routeParams.myDate;
             #1#
        }
    )
*/


/*
    .controller('ngcProdPerfSumm',
        function ($rootScope, $scope, $filter, $log, $location, $routeParams, $http) {
            alert($scope.ngmPlant);
        }
    )
*/

        .controller('ngcClear',
    function ($rootScope, $scope, $log, $location, $route, $http) {
        $scope.clearFilters =
            function () {
                $route.reload();
            };
    }
)

;
