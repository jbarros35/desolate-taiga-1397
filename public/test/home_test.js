/**
 * Created by jose on 7/6/2015.
 */

define(['angular'], function(angular){

    describe('Unit: Testing RequireJS', function(){
        var ctrl;
        var scope;
        var rootScope;

        beforeEach(angular.mock.module('myApp.home'));

        beforeEach(angular.mock.inject(function($rootScope){
            scope = $rootScope.$new();
            rootScope = $rootScope;
        }));

    });
});

