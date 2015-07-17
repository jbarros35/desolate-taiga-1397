'use strict';
/*define(['angular', 'angularRoute'], function(angular) {

	var app = angular.module('app', ['ngRoute']);
	return app;
});*/

define([
	'angular',
	'angularRoute',
	'angular-resource',
	'ui-bootstrap',
	'javascripts/layout/menu',
	'javascripts/login/login',
	'javascripts/home/home',
	'javascripts/utils/utils',
	'javascripts/profile/signup',
], function(angular) {
	// Declare app level module which depends on views, and components
	var app = angular.module('myApp', [
		'ngRoute',
		'myApp.menu',
		'myApp.home',
		'myApp.signup',
		'myapp.utils',
	]);

	app.factory('httpRequestInterceptor', function ($window) {
		  return {
		    request: function (config) {
		    	if ($window.localStorage['token']) {
					// append token to header						
					config.headers['x-access-token'] = $window.localStorage['token'];
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