'use strict';
define([
	'angular',
	'angularRoute',
	'login/login',
	'ui-bootstrap',
	'ngDialog',
	'ngStorage'
], function(angular) {

	var signup = angular.module('myApp.signup', ['ngRoute','ui.bootstrap','angularRestfulAuth']);
	
	signup.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/signup', {
			templateUrl: 'profile/signup.html',
			controller: 'signupCtrl'
		});
	}]);
	
	signup.controller('signupCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main', '$window', '$route',
		function($rootScope, $scope, $location, $localStorage, Main, $window, $route) {
			var user = {};
			$scope.register = function() {
				console.log('register'+user);
			};
		}			        
    ]);
	
});

