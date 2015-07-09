/**
 * Utils factory code
 */
'use strict';
define(['angular'], function(angular) {

var utils = angular.module('utils', []);

utils.controller('NavCtrl', function($scope, $location) {
    $scope.isActive = function(route) {
        return route === $location.path();
    };
});

});