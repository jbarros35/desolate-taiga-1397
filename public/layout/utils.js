/**
 * Utils factory code
 */
'use strict';
 define([
	'angular',
	'angularRoute',
	'ngStorage',
	'ngDialog'
], function(angular) {	
  
/* Controllers */
 var utils = angular.module('myapp.utils', ['ngRoute','ngStorage']);
 
utils.factory('Dialogs', ['$http', '$localStorage', 'ngDialog', function($http, $localStorage,ngDialog){
     
     return {
         showMsg: function(msg,type,$scope) {
            $scope.type = type;
            $scope.msg = msg ? String(msg).replace(/<[^>]+>/gm, '') : "";
            ngDialog.open({ template: 'layout/popupmsg.html', scope: $scope });
         }        
     };
 }]);
 
 });