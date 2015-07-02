'use strict';

if(window.__karma__) {
	var allTestFiles = [];
	var TEST_REGEXP = /spec\.js$/;

	var pathToModule = function(path) {
		return path.replace(/^\/base\/app\//, '').replace(/\.js$/, '');
	};

	Object.keys(window.__karma__.files).forEach(function(file) {
		if (TEST_REGEXP.test(file)) {
			// Normalize paths to RequireJS module names.
			allTestFiles.push(pathToModule(file));
		}
	});
}

require.config({
	waitSeconds: 0,
	paths: {
		angular: 		'bower_components/angular/angular.min',
		angularRoute:   'bower_components/angular-route/angular-route.min',
		'ui-bootstrap': 'bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
		angularMocks:   'bower_components/angular-mocks/angular-mocks',
		'angular-resource': 'bower_components/angular-resource/angular-resource.min',
		text: 		 'bower_components/requirejs-text/text',
		'ngStorage': 'bower_components/ngstorage/ngStorage.min',
		ngDialog: 'bower_components/ngDialog/js/ngDialog.min',
		'infinite-scroll':'bower_components/ngInfiniteScroll/build/ng-infinite-scroll',
		'angucomplete':'bower_components/angucomplete/angucomplete'
	},
	shim: {
		'angular' : {'exports' : 'angular'},
		'angularRoute': ['angular'],
		'angularMocks': {
			deps:['angular'],
			'exports':'angular.mock'
		},
		'ui-bootstrap': ['angular'],
		'angular-resource': ['angular'],
		'ngStorage': ['angular'],
		'ngDialog': ['angular'],
		'angucomplete':['angular']
	},
	priority: [
		"angular"
	],
	deps: window.__karma__ ? allTestFiles : [],
	callback: window.__karma__ ? window.__karma__.start : null,
	baseUrl: window.__karma__ ? '/base/app' : '',
});

require([	
	'angular',
	'app'
	], function(angular, app) {		
		var $html = angular.element(document.getElementsByTagName('html')[0]);
		angular.element().ready(function() {
			// bootstrap the app manually
			angular.bootstrap(document, ['myApp']);
		});
	}
);

var globalConfig = {
	    serviceURL: 'http://localhost:3000/api'
};