var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        allTestFiles.push(file);
    }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base/javascripts',
    paths: {
        angular: "../bower_components/angular/angular",
        angularRoute: "../bower_components/angular-route/angular-route",
        angularMocks: "../bower_components/angular-mocks/angular-mocks",
        'angular-resource': '../bower_components/angular-resource/angular-resource',
        'ui-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'ngDialog': '../bower_components/ngDialog/js/ngDialog',
        'infinite-scroll':'../bower_components/ngInfiniteScroll/build/ng-infinite-scroll',
        'angular-sanitize' : '../bower_components/angular-sanitize/angular-sanitize',
        'mass-complete':'../bower_components/angular-mass-autocomplete/massautocomplete',
        'angular-touch':'../bower_components/angular-touch/angular-touch',
        'jquery' : '../bower_components/jquery/dist/jquery',
        // directive templates
        'hashtags' : '../partials/home/hashtags.html'
    },
    shim: {
        'jquery': {'exports': '$'},
        'angular' : {'exports' : 'angular'},
        'angularRoute': ['angular'],
        'angularMocks': {
            deps:['angular'],
            'exports':'angular.mock'
        },
        'angular-resource': ['angular'],
        'ui-bootstrap': ['angular'],
        'ngDialog': ['angular'],
        'infinite-scroll': ['angular'],
        'angular-sanitize':['angular'],
        'mass-complete':['angular-sanitize'],
        // directive templates
        'hashtags': { deps: ['angular'] },
    },
    priority: [
        "angular"
    ],
  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
