/**
 * Created by jose on 7/17/2015.
 */
define(['login/login', 'angularMocks', 'angularRoute'], function() {
    'use strict';

    describe('Controller: loginCtrl', function () {
        var mainService, lsService, scope, httpBackend;
        var createCtrl;
        beforeEach(module('angularRestfulAuth', 'ngDialog'));

        beforeEach(inject(function ($injector, $rootScope, $controller, _$location_, _Main_, $route, _LS_, $httpBackend) {
            scope = $rootScope.$new();
            mainService = _Main_;
            lsService = _LS_;
            httpBackend = $httpBackend;
            createCtrl = function () {
                return $controller('loginCtrl', {
                    $scope: scope, $location: _$location_
                });
            };
        }));

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('test loginCtrl in development', function(){
            var env = {success: true, env: "development"};
            var login = {   "email": "josecarlos.barros@gmail.com",
                "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"
            };
            var loginReturn = {
                success: true,
                message: "Enjoy your token!",
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9" +
                ".eyJlbWFpbCI6Impvc2VjYXJsb3MuYmFycm9zQGdtYWlsLmNvbSIsImlhdCI6MTQzNzE1MDQ0NSwiZXhwIjoxNDM3MjM2ODQ1fQ" +
                ".qKG6rlTM8u62kJHU93AXotBbUWP3bk7PZCzeUAfmguk"
            };
            httpBackend.expectGET('/api/env/getEnv').respond(200, env);
            scope.changeLogged = function(val) {
                scope.logged = val;
            }
            var loginCtrl = createCtrl();
            scope.password = '123456';
            scope.email = 'josecarlos.barros@gmail.com';
            httpBackend.flush();
            expect(scope.logged).toBeTruthy();
        });

        it('test loginCtrl login success', function(){
            var env = {success: true, env: "production"};
            var loginReturn = {
                success: true,
                message: "Enjoy your token!",
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9" +
                ".eyJlbWFpbCI6Impvc2VjYXJsb3MuYmFycm9zQGdtYWlsLmNvbSIsImlhdCI6MTQzNzE1MDQ0NSwiZXhwIjoxNDM3MjM2ODQ1fQ" +
                ".qKG6rlTM8u62kJHU93AXotBbUWP3bk7PZCzeUAfmguk"
            };
            httpBackend.expectGET('/api/env/getEnv').respond(200, env);
            httpBackend.expectPOST('/api/users/authenticate').respond(200, loginReturn);
            scope.changeLogged = function(val) {
                scope.logged = val;
            }
            var loginCtrl = createCtrl();
            scope.password = '123456';
            scope.email = 'josecarlos.barros@gmail.com';
            scope.submitForm(true);
            httpBackend.flush();
            expect(scope.logged).toBeTruthy();
            expect(lsService.getData('token')).toEqual("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9" +
                ".eyJlbWFpbCI6Impvc2VjYXJsb3MuYmFycm9zQGdtYWlsLmNvbSIsImlhdCI6MTQzNzE1MDQ0NSwiZXhwIjoxNDM3MjM2ODQ1fQ" +
                ".qKG6rlTM8u62kJHU93AXotBbUWP3bk7PZCzeUAfmguk");
        });

        it('test loginCtrl login error', function(){
            var env = {success: true, env: "production"};
            var loginReturn = {
                success: false,
                message: "Authentication failed. Wrong password."
            };
            httpBackend.expectGET('/api/env/getEnv').respond(200, env);
            httpBackend.expectPOST('/api/users/authenticate').respond(200, loginReturn);
            scope.changeLogged = function(val) {
                scope.logged = val;
            }
            var loginCtrl = createCtrl();
            scope.password = '678910';
            scope.email = 'josecarlos.barros@gmail.com';
            scope.submitForm(true);
            httpBackend.flush();
            expect(scope.logged).toBeFalsy();
            expect(scope.message).toEqual('Wrong name or password');
        });
    });

    describe('Factory: Main', function () {
        var mainService, lsService, scope, httpBackend;
        var loginReturn = {
            success: true,
            message: "Enjoy your token!",
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9" +
            ".eyJlbWFpbCI6Impvc2VjYXJsb3MuYmFycm9zQGdtYWlsLmNvbSIsImlhdCI6MTQzNzE1MDQ0NSwiZXhwIjoxNDM3MjM2ODQ1fQ" +
            ".qKG6rlTM8u62kJHU93AXotBbUWP3bk7PZCzeUAfmguk"
        };
        var meReturn = {
            type: true,
            user: {
                userid: 1,
                email: "josecarlos.barros@gmail.com",
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9" +
                ".eyJlbWFpbCI6Impvc2VjYXJsb3MuYmFycm9zQGdtYWlsLmNvbSIsImlhdCI6MTQzNTQzNjMyOSwiZXhwIjoxNDM1NTIyNzI5fQ" +
                ".olCGwv3TYKfWYk5gDHr13miIP9e-jEj6eLvt4Jxz40k",
                Profile: {
                    fullname: "Jose Carlos Barros",
                    nickname: "jbarros",
                    photo: "assets/img/users/nicolas_cage.jpg"
                }
            }
        };
        beforeEach(module('angularRestfulAuth'));
        beforeEach(inject(function ($rootScope, _Main_, _LS_, $httpBackend) {
            scope = $rootScope.$new();
            mainService = _Main_;
            lsService = _LS_;
            httpBackend = $httpBackend;
        }));

        afterEach(function() {
           httpBackend.verifyNoOutstandingExpectation();
           httpBackend.verifyNoOutstandingRequest();
        });

        it ('should be loaded', function() {
            expect(mainService).toBeDefined();
            expect(lsService).toBeDefined();
        });

        it ('test /me service', function(){
            httpBackend.expectGET('/api/users/me').respond(200, meReturn);
            mainService.me(function(res){
                expect(res).toEqual(meReturn);
            }, function(err){
            });
            httpBackend.flush();
        });

        it ('test /authenticate service', function(){
            var login = {   "email": "josecarlos.barros@gmail.com",
                "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"
            };
            httpBackend.expectPOST('/api/users/authenticate').respond(200, loginReturn);
            mainService.signin(login, function(res){
                expect(res).toEqual(loginReturn);
            }, function(err){
            });
            httpBackend.flush();
        });

        it ('test /signup service', function(){
            var postRequest = {"email":"user1@gmail.com",
                "password":"8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
                "firstName":"jose", "lastName":"surname"};
            var postReturn = {
                success: true,
                message: "new user registered!",
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9" +
                ".eyJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTQzNzE1NDA1MSwiZXhwIjoxNDM3MjQwNDUxfQ" +
                ".GEkQ0HmiWVwEufPKnzhxlwwHml-Om6g2q9niwDMKgRc"
            };
            httpBackend.expectPOST('/api/users/signup').respond(200, postReturn);
            mainService.signup(postRequest, function(res){
                expect(res).toEqual(postReturn);
            }, function(err){
            });
            httpBackend.flush();
        });

        it ('test /env service', function(){
            var env = {success: true, env: "development"};
            httpBackend.expectGET('/api/env/getEnv').respond(200, env);
            mainService.env(function(res){
                expect(res.env).toEqual('development');
            }, function(err){
            });
            httpBackend.flush();
        });

        it ('should store token', function() {
            var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9' +
                '.eyJlbWFpbCI6Impvc2VjYXJsb3MuYmFycm9zQGdtYWlsLmNvbSIsImlhdCI6MTQzNzE1MDQ0NSwiZXhwIjoxNDM3MjM2ODQ1fQ' +
                '.qKG6rlTM8u62kJHU93AXotBbUWP3bk7PZCzeUAfmguk';
            lsService.setData('token', token);
            expect(lsService.getData('token')).toEqual(token);
        });

    });
});