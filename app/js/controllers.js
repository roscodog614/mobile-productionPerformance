'use strict';

/* Controllers */

    angular.module('myApp.controllers', ['ui.bootstrap'])
    .controller('ctrlrMain',
        function ($rootScope, $scope, $log, $location, $route, $http) {
            $scope.mppHeader = "Production Performance";
            $scope.ngsHomeH1 =
                function () {
                    return {
                        background: "green",
                        color: "white",
                        display: "inline"
                    };
                };
        }
    )
    .controller('ctrlrPlants',
        function ($rootScope, $scope, $log, $location, $route, $http) {
            $scope.plants =
                function () {
                    $http.get('http://oh-devcb-d05:9330/GetAllPlants')
                        .success
                        (
                            function(data)
                            {
                                $scope.plants = data;
                            }
                        );
                };

            $scope.ngmPlant = $scope.plants();
        }
    )

    .controller('ctrlrTicketDatePicker',
        function ($rootScope, $scope, $log, $location, $route, $http) {
            $scope.today =
                function () {
                    $scope.ngmTicketDate = new Date();
                };
            $scope.today();

            $scope.open =
                function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    $scope.opened = true;
                };

            $scope.format = 'MM/dd/yyyy';
        }
    )
    .controller('ctrlrClear',
    function ($rootScope, $scope, $log, $location, $route, $http) {
        $scope.clearFilters =
            function () {
                $route.reload();
            };
    }
)

    .controller('ctrlrSearch',
        function ($rootScope, $scope, $filter, $log, $location, $routeParams, $http) {
            $scope.ticketSearch =
                function (plant, ticketDate) {
                    var formattedDate = (ticketDate.getMonth() + 1) + '/' + ticketDate.getDate() + '/' + ticketDate.getFullYear();

                    alert(plant + ', ' + formattedDate);
                    alert("http://oh-devcb-d05:9330/GetPlantTickets?plant=" + plant + "&date=" + formattedDate);


                    /*                    $location.path("/prodPerf");*/
                    /*
                     $scope.selectedPlant = $routeParams.selectedPlant;
                     $scope.selectedDate = $routeParams.selectedDate;
                     */

                    /*$location.path("/performanceSummary/"+selectedPlant+formattedDate);*/

                    /* alert(newPath);*/
                    /*
                     alert('http://oh-devcb-d05:9330/GetPlantTickets?plant=ngmPlant&date=ticketDate');
                     .success(
                     function(data)
                     {
                     $scope.ticketSummary = data;
                     alert($scope.ticketSummary);
                     }
                     );
                     */
                };
        }
    )

    .controller('ctrlrPerfSum',
        function ($rootScope, $scope, $log, $location, $route, $routeParams, $http) {
            /*
             $scope.myPlant = $routeParams.myPlant;
             $scope.myDate = $routeParams.myDate;
             */
        }
    )
;
