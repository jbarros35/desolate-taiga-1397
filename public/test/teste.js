/**
 * Utils factory code
 */
'use strict';
define(['angular'], function(angular) {

var teste = angular.module('teste', []);

teste.controller('NavCtrl', function($scope, $location) {
    $scope.isActive = function(route) {
        return route === $location.path();
    };
});

});