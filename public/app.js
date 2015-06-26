'use strict';

define([
	'angular',
	'angularRoute',
	'angular-resource',
	'ngStorage',
	'ui-bootstrap',
	'layout/menu',
	'login/login',
	'home/home',
	'profile/signup'
], function(angular, angularRoute) {
	// Declare app level module which depends on views, and components
	var app = angular.module('myApp', [
		'ngRoute',
		'myApp.menu',
		'ngStorage',
		'myApp.home',
		'myApp.signup'
	]);
	
	app.config(['$routeProvider', '$httpProvider',function($routeProvider, $httpProvider) {
		$routeProvider.when('/404', {
           templateUrl: '404.html'           
        }).otherwise({redirectTo: '/404'});	
		
		var interceptor = ['$q','$location','$localStorage',function($q,$location,$localStorage){
			var service = {
				'request': function (config) {	
					// append token to header
                    config.headers = config.headers || {};
					// check if token exists
                    if ($localStorage.token) {
						// append token to header						
						config.headers['x-access-token'] = $localStorage.token;						
                    }
                    return config;
                },				
				'response': function(response){
				  return promise.then(
					function success(response) {
					return response;
				  },
				  function error(response) {					
					if(response.status === 401){
					  $location.path('/login');
					  return $q.reject(response);
					}
					else{
					  return $q.reject(response); 
					}
				  });
				}
			};
			return service;
			$httpProvider.interceptors.push(interceptor);
		}];

		// TODO $http.defaults.headers.common['x-access-token'] = $localStorage.token;

		
		/*function($q, $location, $localStorage) {
            return {
                'request': function (config) {	
					// append token to header
                    config.headers = config.headers || {};
					// check if token exists
                    if ($localStorage.token) {						
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;					
						// append token to header						
						config.headers['x-access-token'] = $localStorage.token;
						
                    } else {
						//console.log('no token provided');
						//$location.path('/login');
					}
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/');
                    }
					return response;
                    //return $q.reject(response);
                }
            };
        }*/
		
	}]);
	return app;

});