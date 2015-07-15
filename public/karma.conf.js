// Karma configuration
// Generated on Mon Jul 06 2015 22:23:02 GMT-0400 (Horário padrão - Pacífico)
/* global module */
"use strict";
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [

      /*'bower_components/jquery/dist/jquery.js',
      'bower_components/bootstrap/dist/css/bootstrap.min.css',
      'bower_components/angular-mass-autocomplete/massautocomplete.theme.css',
      'bower_components/ngDialog/css/ngDialog.css',
      'bower_components/ngDialog/css/ngDialog-theme-default.css',*/
      //'bower_components/requirejs/require.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-resource/angular-resource.js',
      //'bower_components/ngstorage/ngStorage.js',
      'bower_components/ngDialog/js/ngDialog.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',

      //'bower_components/angular-resource/angular-resource.js',

      //'bower_components/angular-sanitize/angular-sanitize.js',
      //'bower_components/angular-touch/angular-touch.js',
      //'bower_components/angular-loader/angular-loader.js',
      //'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      //'bower_components/requirejs-text/text.js',
      //'bower_components/ngstorage/ngStorage.js',
      //'bower_components/angular-mass-autocomplete/massautocomplete.js',
      //'bower_components/bootstrap/dist/js/bootstrap.js',
      //'bower_components/ngDialog/js/ngDialog.js',
      //'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
      //'bower_components/crypto-js/sha256.js',
      'test/test-main.js',
      'javascripts/login/login.js',
      'javascripts/layout/utils',
      'javascripts/home/home.js',
      'test/*.js',
      'test/teste.js',
      //'layout/menu.js',
      //'profile/signup.js',
      //'layout/utils.js',
      //'app.js',
    ],


    // list of files to exclude
    exclude: [
     'require-config.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

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
