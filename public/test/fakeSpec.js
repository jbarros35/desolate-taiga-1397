/**
 * Created by jose on 7/12/2015.
 */
/*global module, inject */

define(['fake/fake', 'angularMocks',], function(app) {
    'use strict';
    describe('fakeController', function () {
        var scope, $location, createController, window;
        beforeEach(module('fakeApp'));

        beforeEach(inject(function ($rootScope, $controller, _$location_, _$window_) {
            $location = _$location_;
            scope = $rootScope.$new();
            window = _$window_;
            //console.log('window inject');
            createController = function () {
                return $controller('fakeController', {
                    $scope: scope,
                    $window : window
                });
            };
        }));

        it('should have message', function () {
            var controller = createController();
            $location.path('/');
            expect($location.path()).toBe('/');
            expect(scope.message).toEqual('This is Add new order screen');
        });

        it('store message', function() {
            var controller = createController();
            scope.storeValue();
            expect(scope.getValue()).toEqual('This is Add new order screen');
        });
    });

});
