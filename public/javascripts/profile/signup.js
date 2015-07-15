'use strict';
define([
	'angular',
	'angularRoute',
	'../login/login',
	'ui-bootstrap',
	'ngDialog',
], function(angular) {

	var signup = angular.module('myApp.signup', ['ngRoute','ui.bootstrap','angularRestfulAuth']);
	
	signup.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/signup', {
			templateUrl: 'partials/profile/signup.html',
			controller: 'signupCtrl'
		});
	}]);
	
	signup.controller('signupCtrl', ['$rootScope', '$scope', '$location', 'Main', '$window', '$route','ngDialog',
		function($rootScope, $scope, $location, Main, $window, $route, ngDialog) {
			var user = {};
			
			$scope.register = function() {
				console.log('register'+user);
				Main.signup(user, 
				// success
				function(res) {				
					if (res.success == false) {
						//console.log(res.data);   
						$scope.error='Failed to signup.';											
					} else {
						if (res.token) {							
							// save token
							$window.localStorage['token'] = res.token;
							//console.log($localStorage.token);
							$scope.changeLogged(true);
							var dialog = ngDialog.open({ 
								template: 'popUpMsg.html', 
								disableAnimation: true,  
								className: 'ngdialog-theme-default', });							
						} else {
							$scope.error='Failed to signin.';							
						}
					}
            }, // error
			function(error) {				
				//console.log(error);
				$scope.error = 'Failed to signin, service error.';
               
            });
		};
		$scope.goHome = function() {
			console.log('home');
			ngDialog.closeAll();
			$location.path('/');
			$route.reload();				
		};
		}			        
    ]);
	
});

