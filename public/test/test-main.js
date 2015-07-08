var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
/*Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
   var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
   allTestFiles.push(normalizedTestModule);
    //allTestFiles.push(file);
  }
});*/

for (var file in window.__karma__.files) {
  if (TEST_REGEXP.test(file)) {
    allTestFiles.push(file);
  }
}

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/www/scripts',

  paths: {
    angular: '/bower_components/angular/angular',
    angularMocks: '/bower_components/angular-mocks/angular-mocks',
    angularRoute:   '/bower_components/angular-route/angular-route',
    'angular-resource': '../bower_components/angular-resource/angular-resource',
    'angular-sanitize' : 'bower_components/angular-sanitize/angular-sanitize.min',
    'angular-touch':'bower_components/angular-touch/angular-touch',
    'ui-bootstrap': 'bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
    'ngStorage' : '/bower_components/ngstorage/ngStorage.js',
    'ngDialog': '/bower_components/ngDialog/js/ngDialog.js',
    'jquery': '../bower_components/jquery/dist/jquery',
    'mass-complete':'bower_components/angular-mass-autocomplete/massautocomplete.min',
    'ngStorage': 'bower_components/ngstorage/ngStorage.min',
    ngDialog: 'bower_components/ngDialog/js/ngDialog.min',
    text: 		 'bower_components/requirejs-text/text',
    'jasmine-core': '../../node_modules/jasmine-core/lib/jasmine-core',
    'infinite-scroll':'bower_components/ngInfiniteScroll/build/ng-infinite-scroll',
    'app':'/app'
  },
  shim: {
    angular: { exports: 'angular' },
    'angularRoute': ['angular'],
    'angular-resource': ['angular'],
    angularMocks: { deps: ['angular'] },
    'ui-bootstrap': ['angular'],
    'ngStorage': ['angular'],
    'ngDialog': ['angular'],
    'angular-sanitize':['angular'],
    'mass-complete':['angular-sanitize']
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start,


});