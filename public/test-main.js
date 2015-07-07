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
  }
});*/
for (var file in window.__karma__.files) {
  if (TEST_REGEXP.test(file)) {
    allTestFiles.push(file);
  }
}

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/public',

  paths: {
    angular: '/bower_components/angular/angular',
    angularMocks: '/bower_components/angular-mocks/angular-mocks',
    'jquery': '/bower_components/jquery/dist/jquery',
    'jasmine-core': '../node_modules/jasmine-core/lib/jasmine-core',
    'app':'app'
  },
  shim: {
    angular: { exports: 'angular' },
    angularMocks: { deps: ['angular'] }
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start,


});