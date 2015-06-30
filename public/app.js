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
	
	app.factory('httpRequestInterceptor', function ($localStorage) {
		  return {
		    request: function (config) {
		    	if ($localStorage.token) {
					// append token to header						
					config.headers['x-access-token'] = $localStorage.token;						
                }
		      return config;
		    }
		  };
		});
	/*
	app.factory('httpResponseInterceptor',['$q','$location',function($q,$location){
		  return {
		    response: function(response){
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
		  }
		}]);
	*/
	// Http Intercpetor to check auth failures for xhr requests
	app.config(['$routeProvider', '$httpProvider',function($routeProvider, $httpProvider) {
		
		$httpProvider.interceptors.push('httpRequestInterceptor');
		
		//$httpProvider.interceptors.push('httpResponseInterceptor');
		 
		$routeProvider.when('/404', {
           templateUrl: '404.html'           
        }).otherwise({redirectTo: '/404'});			
		
	}]);
	return app;

});