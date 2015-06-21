'use strict';
define([
	'angular',
	'angularRoute',
	'login/login',
	'ui-bootstrap',
	'ngDialog',
	'ngStorage'
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
			link: function(scope, element, attrs) {
			scope.logged = false;
			scope.$watch(function(){return scope.logged;}, function(value) {
			  scope.logged = value;
			});
			},
		    templateUrl: "layout/top-menu.html",				
		    controller: ['$scope', '$http', '$filter', '$localStorage', function ($scope, $http, $filter, $localStorage) {
				$scope.me = function() {
					try {
						if ($localStorage.token) {
							$scope.logged = true;
						} else {
							$scope.logged = false;
						}
					
						Main.me(function(res) {
						 console.log('try me');
							if(res == "Forbidden") {
								$scope.myDetails = res;
								$scope.logged = false;
							} else {
								$scope.logged = true;
							}							
						}, function() {
							$scope.error = 'Failed to fetch details';
						});
					}catch(err) {
						$scope.logged = false;
					}
				};
			    $scope.me();							
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
		    controller: ['$scope', '$http', '$filter', 'ngDialog', '$location', '$window', '$route','$localStorage',
			function ($scope, $http, $filter, ngDialog, $location,  $window, $route, $localStorage) {		    	
				
				var logged = $scope.logged;
				if ($localStorage.token) {
					$scope.logged = true;
				} else {
					$scope.logged = false;
				}
				// open login
				$scope.clickToOpen = function () {
					var dialog = ngDialog.open({ template: 'popupTmpl.html', disableAnimation: true,  
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
		  
	menu.controller('loginCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main', 'ngDialog', '$window', '$route',
		function($rootScope, $scope, $location, $localStorage, Main, ngDialog, $window, $route) {			
        $scope.submitForm = function(isValid) {
			if (!isValid) return;			
			var hash = CryptoJS.SHA256($scope.password);			
			var encrypted = hash.toString(CryptoJS.enc.Base64);
			var formData = {
                email: $scope.email,
                password: encrypted
            };
			
			//console.log(encrypted);
            Main.signin(formData, 
			// success
			function(res) {				
                if (res.success == false) {
                    //console.log(res.data);   
					$scope.message='Wrong name or password';
					//$rootScope.error = 'Failed to signin';					
                } else {
					if (res.token) {
						ngDialog.closeAll();
						$localStorage.token = res.token;
						//console.log($localStorage.token);
						$scope.changeLogged(true);						
					} else {
						$scope.message='Failed to signin, no token provided';
						//$rootScope.error = 'Failed to signin';
					}
                }
            }, // error
			function(error) {				
				//console.log(error);
				$scope.message = 'Failed to signin, service error.';
                //$rootScope.error = 'Failed to signin';
            })
        };
 
        $scope.signup = function() {
            var formData = {
                email: $scope.email,
                password: $scope.password
            }
 
            Main.save(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    $localStorage.token = res.data.token;
                    $location.path('/home');   
                }
            }, function() {
                $rootScope.error = 'Failed to signup';
            })
        };
 
        $scope.me = function() {
            Main.me(function(res) {
                $scope.myDetails = res;
            }, function() {
                $rootScope.error = 'Failed to fetch details';
            })
        };
         
        $scope.token = $localStorage.token;
    }]);
	
});

