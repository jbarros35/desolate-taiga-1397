/**
 * Created by jose on 7/12/2015.
 */
'use strict';

define(['angular', 'angularRoute'], function(angular) {
    var app = angular.module('fakeApp', ['ngRoute']);

    app.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'partials/home.html',
                    controller: 'fakeController'
                })
                .when('/404', {
                    templateUrl: 'partials/404.html',
                })
                .otherwise({
                    redirectTo: '/404'
                });
        }
    ]);

    app.controller('fakeController', function ($scope, $window) {
        if ($window) {
            console.log('window is defined');
        }
        $scope.message = 'This is Add new order screen';
        $scope.storeValue = function() {
            $window.localStorage['value'] = $scope.message;
        }
        $scope.getValue = function() {
            return $window.localStorage['value'];
        }
    });

    return app;
});