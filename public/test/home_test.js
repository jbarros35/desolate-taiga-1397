'use strict';
define(['angular','angularMocks','test'], function(angular, mocks, utils) {

    describe('NavCtrl', function() {
        var scope, $location, createController;

        beforeEach(function(){
            module('utils');
        });

        beforeEach(inject(function ($rootScope, $controller, _$location_) {
            $location = _$location_;
            scope = $rootScope.$new();

            createController = function() {
                return $controller('NavCtrl', {
                    '$scope': scope
                });
            };
        }));

        it('should have a method to check if the path is active', function() {
            var controller = createController();
            $location.path('/about');
            expect($location.path()).toBe('/about');
            expect(scope.isActive('/about')).toBe(true);
            expect(scope.isActive('/contact')).toBe(false);
        });

    });

});