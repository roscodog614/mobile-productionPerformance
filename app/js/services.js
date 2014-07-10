'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
    .service('dataService',
        function() {
            var resultTickets = [];
            this.setTickets = function(tickets) {
                resultTickets = tickets;
            };

            this.getTickets = function() {
                return resultTickets;
            }
        });
  value('version', '0.1');
