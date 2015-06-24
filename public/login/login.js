'use strict';
 define([
	'angular',
	'angularRoute',
	'ngStorage',
	'ngDialog'
], function(angular) {	
  
/* Controllers */
 var login = angular.module('angularRestfulAuth', ['ngRoute','ngStorage']);
 
    login.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/login', {
			templateUrl: 'login/loginPage.html',
			controller: 'loginCtrl'
		});
	}]);
	
	login.factory("flash", function($rootScope) {
	  var queue = [];
	  var currentMessage = "";

	  $rootScope.$on("$routeChangeSuccess", function() {
		currentMessage = queue.shift() || "";
	  });

	  return {
		setMessage: function(message) {
		  queue.push(message);
		},
		getMessage: function() {
		  return currentMessage;
		}
	  };
	});
	
	login.controller('loginCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main', 'ngDialog', '$window', '$route',
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
		$scope.goSignup = function() {
			console.log('signup');
			ngDialog.closeAll();
			$location.path('/signup');
			$route.reload();			
		};
		// log out user		         
        $scope.token = $localStorage.token;
    }]);
	
	login.factory('Main', ['$http', '$localStorage', function($http, $localStorage){
        var baseUrl = "/api/users";
        function changeUser(user) {
            angular.extend(currentUser, user);
        }
 
        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }
 
        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }
 
        var currentUser = getUserFromToken();
 
        return {
            save: function(data, success, error) {
                $http.post(baseUrl + '/signin', data).success(success).error(error);
            },
            signin: function(data, success, error) {
                $http.post(baseUrl + '/authenticate', data).success(success).error(error);
            },
			signup: function(data, success, error) {
                $http.post(baseUrl + '/signup', data).success(success).error(error);
            },
            me: function(success, error) {
                $http.get(baseUrl + '/me', {handleError:true}).success(success).error(error);
            },
            logout: function(success) {
                changeUser({});
                delete $localStorage.token;
                success();
            }
        };
    }]);
});