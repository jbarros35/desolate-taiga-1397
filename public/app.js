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
	'layout/utils',
	'profile/signup'
], function(angular) {
	// Declare app level module which depends on views, and components
	var app = angular.module('myApp', [
		'ngRoute',
		'myApp.menu',
		'ngStorage',
		'myApp.home',
		'myApp.signup',
		'myapp.utils'
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

	// Http Intercpetor to check auth failures for xhr requests
	app.config(['$routeProvider', '$httpProvider',function($routeProvider, $httpProvider) {
		
		$httpProvider.interceptors.push('httpRequestInterceptor');

		$routeProvider.when('/404', {
           templateUrl: '404.html'           
        }).otherwise({redirectTo: '/404'});			
		
	}]);
	return app;

});