/*var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});*/

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
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'angularRoute': ['angular'],
        'angularMocks': {
            deps:['angular'],
            'exports':'angular.mock'
        },
        'angular-resource': ['angular'],
        'ui-bootstrap': ['angular'],
        'ngDialog': ['angular'],
    },
    priority: [
        "angular"
    ],
  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
