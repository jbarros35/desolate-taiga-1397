// Karma configuration
// Generated on Thu Jul 16 2015 18:23:09 GMT-0400 (Horário padrão - Pacífico)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      {pattern:'bower_components/angular/angular.js', included: false},
      {pattern:'bower_components/angular-route/angular-route.js', included: false},
      {pattern:'bower_components/angular-mocks/angular-mocks.js', included: false},
      {pattern:'bower_components/ngDialog/js/ngDialog.js', included: false},
      {pattern:'bower_components/angular-route/angular-route.js',included: false},
      {pattern:'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',included: false},
      {pattern:'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',included: false},
      {pattern:'bower_components/angular-sanitize/angular-sanitize.js',included: false},
      {pattern:'bower_components/angular-mass-autocomplete/massautocomplete.js', included: false},
      {pattern:'bower_components/angular-touch/angular-touch.js',included: false},
      {pattern:'bower_components/jquery/dist/jquery.js',included: false},
      {pattern:'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha256.js',included: false},
      {pattern: 'javascripts/**/*.js', included: false},
      {pattern: 'test/**/*Spec.js', included: false},
        // templates dir
      { pattern: 'partials/home/hashtags.html', included: false },
      { pattern: 'partials/home/home.html', included: false },
      'test-main.js',
    ],

    // list of files to exclude
    exclude: [
      'require-config.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      //'javascripts/**/*.js': ['coverage'],
      'partials/**/*.html':'ng-html2js'
    },

    ngHtml2JsPreprocessor: {
      // Paths by default are relative to DISK root,
      // so we need to make them relative to this folder
      /*cacheIdFromPath : function(filepath) {
        return filepath.substr(filepath.indexOf("appname")+8);
      },*/
      // If your build process changes the path to your templates,
      // use stripPrefix and prependPrefix to adjust it.
      stripPrefix: 'partials/home/',
      //prependPrefix: '/',
      // the name of the Angular module to create
      moduleName: "mytemplates"
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
