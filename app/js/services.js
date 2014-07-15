'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
    .service('ticketDataService',
        function() {
            var resultTickets;
            this.setTickets = function(tickets) {
                resultTickets = tickets;
            };

            this.getTickets = function() {
                return resultTickets;
            }
        })
    .service('detailDataService',
        function() {
            var resultDetails;
            this.setDetails = function(details) {
                resultDetails = details;
            };

            this.getDetails = function() {
                return resultDetails;
            }
        }
    )
    .service('breadCrumbsDataService',
        function() {
            var resultBreadCrumbs;
            this.setBreadCrumbs = function(breadCrumbs) {
                resultBreadCrumbs = breadCrumbs;
            };

            this.getBreadCrumbs = function() {
                return resultBreadCrumbs;
            }
        });