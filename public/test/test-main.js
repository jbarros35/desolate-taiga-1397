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
  baseUrl: '/public',

  paths: {
    'jquery': '/base/bower_components/jquery/dist/jquery',
    'angular': '/base/bower_components/angular/angular',
    'angularMocks': '/base/bower_components/angular-mocks/angular-mocks',
    'angularRoute': '/base/bower_components/angular-resource/angular-resource',
    'ngStorage': '/base/bower_components/ngstorage/ngStorage',
    'ngDialog': '/base/bower_components/ngDialog/js/ngDialog',
    'angular-route':   '/base/bower_components/angular-route/angular-route',
    /*'angular-resource': '/base/bower_components/angular-resource/angular-resource',
    'angular-sanitize' : '/base/bower_components/angular-sanitize/angular-sanitize',
    'angular-touch':'/base/bower_components/angular-touch/angular-touch',
    'ui-bootstrap': '/base/bower_components/angular-bootstrap/ui-bootstrap-tpls',
    'ngStorage' : '/base/bower_components/ngstorage/ngStorage.js',
    'ngDialog': '/base/bower_components/ngDialog/js/ngDialog.js',
    'jquery': '/base/bower_components/jquery/dist/jquery',
    'mass-complete':'/base/bower_components/angular-mass-autocomplete/massautocomplete',

    'ngDialog': '/base/bower_components/ngDialog/js/ngDialog.min',
    'text': 		 '/base/bower_components/requirejs-text/text',
    'jasmine-core': '../../node_modules/jasmine-core/lib/jasmine-core',
    'infinite-scroll':'/base/bower_components/ngInfiniteScroll/build/ng-infinite-scroll',*/
      'login':'/base/login/login',
      'home':'/base/home/home',
    'test':'/base/test/teste',
    'app':'/base/app'
  },
  shim: {
    'angular': { exports: 'angular' },
    'angularMocks': { deps: ['angular'] },
    'angularRoute': ['angular'],
   /* 'angular-resource': ['angular'],
    'angularRoute': ['angular'],
    'ui-bootstrap': ['angular'],
    'ngStorage': ['angular'],
    'ngDialog': ['angular'],
    'angular-sanitize':['angular'],
    'mass-complete':['angular-sanitize']*/
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start,

});