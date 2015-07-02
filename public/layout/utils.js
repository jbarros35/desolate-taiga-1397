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

     utils.directive('myMaxlength', function() {
         return {
             require: 'ngModel',
             link: function (scope, element, attrs, ngModelCtrl) {
                 var maxlength = Number(attrs.myMaxlength);
                 function fromUser(text) {
                     if (text.length > maxlength) {
                         var transformedInput = text.substring(0, maxlength);
                         ngModelCtrl.$setViewValue(transformedInput);
                         ngModelCtrl.$render();
                         return transformedInput;
                     }
                     return text;
                 }
                 ngModelCtrl.$parsers.push(fromUser);
             }
         };
     });
 });