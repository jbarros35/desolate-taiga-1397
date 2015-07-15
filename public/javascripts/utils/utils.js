/**
 * Utils factory code
 */
'use strict';
 define([
	'angular',
	'angularRoute',
	'ngDialog'
], function(angular) {	
  
/* Controllers */
 var utils = angular.module('myapp.utils', ['ngRoute']);
 
    utils.factory('Dialogs', ['$http', 'ngDialog', function($http, $window, ngDialog){

         return {
             showMsg: function(msg,type,$scope) {
                $scope.type = type;
                $scope.msg = msg ? String(msg).replace(/<[^>]+>/gm, '') : "";
                ngDialog.open({ template: 'partials/layout/popupmsg.html', scope: $scope });
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