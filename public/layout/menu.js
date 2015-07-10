'use strict';
define([
	'angular',
	'angularRoute',
	'ui-bootstrap',
	'ngDialog',
	'ngStorage',
	'login/login'
], function(angular) {

	var menu = angular.module('myApp.menu', ['ngRoute','ui.bootstrap','angularRestfulAuth','ngDialog']);

	// menu directive
	menu.directive("topMenu", ['$parse', '$http', '$compile', '$templateCache', 'Main', 
		function($parse, $http, $compile, $templateCache, Main) {

		  return {
		    restrict: "A",
		    replace: true,
		    scope: false,
		    transclude: true,			
		    templateUrl: "layout/top-menu.html",				
		    controller: ['$scope', '$http', '$filter', '$localStorage', function ($scope, $http, $filter, $localStorage) {
		    							
			}]
		    };
		  }]);
		  
	menu.directive("dropDown", ['$parse', '$http', '$compile', '$templateCache', 'Main',
			function($parse, $http, $compile, $templateCache, Main) {

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
		    templateUrl: "layout/drop-down.html",					
		    controller: ['$scope', '$http', 'ngDialog', '$location', '$route','$localStorage',
			function ($scope, $http, ngDialog, $location, $route, $localStorage) {
				
				$scope.user = {};
				$scope.me = function() {
					try {
						if ($localStorage.token) {
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
					var dialog = ngDialog.open({ template: '/login/loginPopup.html', 
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

