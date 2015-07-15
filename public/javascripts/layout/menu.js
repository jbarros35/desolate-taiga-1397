'use strict';
define([
	'angular',
	'angularRoute',
	'ui-bootstrap',
	'ngDialog',
	'../login/login'
], function(angular) {

	var menu = angular.module('myApp.menu', ['ngRoute','ui.bootstrap','angularRestfulAuth','ngDialog']);

	// menu directive
	menu.directive("topMenu", ['$parse', '$http', '$compile', '$templateCache',
		function($http) {

		  return {
		    restrict: "A",
		    replace: true,
		    scope: false,
		    transclude: true,			
		    templateUrl: "partials/layout/top-menu.html",
		    controller: ['$scope', '$http', '$filter', function ($scope, $http, $filter) {
			}]
		    };
		  }]);
		  
	menu.directive("dropDown", ['$parse', '$http', '$compile', '$templateCache',
			function($http) {
		  return {
		    restrict: "A",
		    replace: true,
		    scope:false,
		    transclude: true,
			link: function($scope, element, attrs) {
	            $scope.changeLogged = function(log) {
	                $scope.logged = log;
	            };	          
	        },
		    templateUrl: "partials/layout/drop-down.html",
		    controller: ['$scope', '$http', 'ngDialog', '$location', '$route','LS', 'Main',
			function ($scope, $http, ngDialog, $location, $route, LS, Main) {
				$scope.user = {};
				$scope.me = function() {
					try {
						if (LS.getData('token')) {
							// check if token is valid
							Main.me(function(res) {						 
								if(res == "Forbidden") {
									$scope.myDetails = res;
									$scope.logged = false;
								} else {
									$scope.logged = true;									
									$scope.user = res;
								}							
							}, function(err) {
								$scope.error = 'Failed to fetch details';
							});
						} else {
							$scope.logged = false;
						}					
						
						console.log(user);
					}catch(err) {
						$scope.logged = false;
					}
				};
			    $scope.me();

				// open login
				$scope.clickToOpen = function () {
					var dialog = ngDialog.open({ template: '/partials/login/loginPopup.html',
					disableAnimation: true,  
					className: 'ngdialog-theme-default', });					
				};
				// log out user
				$scope.logout = function() {
					Main.logout(function() {
						$scope.logged = false;
						//location.reload(true);
						$location.path('/');
						$route.reload();
						//$window.location.reload();												
					}, function() {
						alert("Failed to logout!");
					});
				};
			}]
		    };
		  }]);
	
});

