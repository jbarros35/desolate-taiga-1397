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
			templateUrl: 'login/login.html',
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