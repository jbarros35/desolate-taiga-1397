/**
 * Created by jose on 7/17/2015.
 */
define(['home/home', 'login/login', 'utils/utils', 'hashtags', 'angularMocks', 'ui-bootstrap', 'angularRoute','jquery'], function(hashtags) {
    'use strict';
/*
    describe('Controller: loginCtrl', function () {
        var mainService, lsService, scope, httpBackend;
        var createCtrl;
        beforeEach(module('myApp.home', 'ngRoute','ui.bootstrap', 'infinite-scroll',
            'myapp.utils','angularRestfulAuth','ngSanitize', 'MassAutoComplete'));

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

    });
    */

    describe('Factory: tagService', function () {
        var tagService, scope, httpBackend;
        beforeEach(module('myApp.home'));
        beforeEach(inject(function ($rootScope,_tagService_, $httpBackend) {
            scope = $rootScope.$new();
            tagService = _tagService_;
            httpBackend = $httpBackend;
        }));

        afterEach(function() {
           httpBackend.verifyNoOutstandingExpectation();
           httpBackend.verifyNoOutstandingRequest();
        });

        it ('test /findTags service', function(){
            var findTagsResponse = {
                description: "rock"
            };
            httpBackend.expectGET('/api/posts/findTags?name=rock').respond(200, findTagsResponse);
            tagService.findTags('rock', function(res){
                expect(res).toEqual(findTagsResponse);
            }, function(err){
            });
            httpBackend.flush();
        });

        it ('test /tags service', function(){
            var tagsResponse = [{"description":"rock"},{"description":"techno"},{"description":"punk"},{"description":"indie"}];
            httpBackend.expectGET('/api/posts/tags').respond(200, tagsResponse);
            tagService.getTags(function(res){
                expect(res).toEqual(tagsResponse);
            }, function(err){
            });
            httpBackend.flush();
        });
    });

    describe('Factory: postService', function () {
        var postService, scope, httpBackend;
        beforeEach(module('myApp.home'));
        beforeEach(inject(function ($rootScope,_postService_, $httpBackend) {
            scope = $rootScope.$new();
            postService = _postService_;
            httpBackend = $httpBackend;
        }));

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it ('test /commentsForPost service', function(){
            var comentsResponse = [{
                description: "my comment for post",
                createdAt: "2015-07-18T18:53:23.130Z",
                Profile: {
                    nickname: "jbarros",
                    profileid: 1
                }
            }];
            httpBackend.expectGET('/api/posts/commentsForPost?postid=1').respond(200, comentsResponse);
            postService.commentsForPost(1, function(res){
                expect(res).toEqual(comentsResponse);
            }, function(err){
            });
            httpBackend.flush();
        });

        it ('test /viewPost service', function(){
            var viewPostResponse = {
                postid: 1,
                title: "Grouplove:",
                description: "Grouplove (also typeset as GROUPLOVE) is an American indie rock band " +
                "that was formed in 2009 by Hannah Hooper (vocals, keyboards), Christian Zucconi (vocals, guitar), " +
                "Sean Gadd (bass, vocals), Andrew Wessen (guitar, vocals), and Ryan Rabin (drums). " +
                "Ryan Rabin produced their debut EP, which was originally released independently, " +
                "and was later re-released by Canvasback/Atlantic with a bonus track and their hit song, \"Colours\". " +
                "Their debut album, Never Trust a Happy Song, was also produced by Rabin and was released worldwide on " +
                "September 13, 2011.[1]",
                link: "https://en.wikipedia.org/wiki/Grouplove",
                titleimage: "/assets/img/postsImg/grouplove600.jpg",
                commentsenabled: true,
                createdAt: "2015-07-18T18:56:28.474Z",
                Profile: {
                    profileid: 1
                }
            };
            httpBackend.expectGET('/api/posts/viewpost?postid=1').respond(200, viewPostResponse);
            postService.viewPost(1, function(res){
                expect(res).toEqual(viewPostResponse);
            }, function(err){
            });
            httpBackend.flush();
        });

        it ('test /postsLast24h service', function(){
            var fetchPostsResponse = [{"postid":1,"title":"Grouplove:","shortdescription":"Grouplove (also typeset as GROUPLOVE) is an American indie rock band that was formed in 2009 by Hannah Hooper (vocals, keyboards), Christian Zucconi (vocals, guitar), Sean Gadd (bass, vocals), Andrew Wessen (guitar, vocals), and Ryan Rabin (drums).","link":"https://en.wikipedia.org/wiki/Grouplove","titleimage":"/assets/img/postsImg/grouplove600.jpg","commentsenabled":true,"type":1,"embed":null,"createdAt":"2015-07-18T19:01:10.854Z",
            "Tags":[{"hashid":1,"description":"rock","hashtag_posts":{"createdAt":"2015-07-18T19:01:11.037Z","updatedAt":"2015-07-18T19:01:11.037Z","postid":1,"hashid":1}},
            {"hashid":4,"description":"indie","hashtag_posts":{"createdAt":"2015-07-18T19:01:11.038Z","updatedAt":"2015-07-18T19:01:11.038Z","postid":1,"hashid":4}}]},
            {"postid":2,"title":"Grouplove:","shortdescription":null,"link":null,"titleimage":null,"commentsenabled":true,"type":2,"embed":"<blockquote class=\"twitter-tweet\" lang=\"en\"><p lang=\"en\" dir=\"ltr\">Thank you so much to everyone who came out to celebrate <a href=\"https://twitter.com/LadyGrouplove\">@LadyGrouplove</a> &#39;s clothing line for <a href=\"https://twitter.com/volcomwomens\">@volcomwomens</a> <a href=\"https://twitter.com/Tillys\">@Tillys</a> XO? <a href=\"http://t.co/4SZBFG96dE\">pic.twitter.com/4SZBFG96dE</a></p>&mdash; GROUPLOVE (@GROUPLOVE) <a href=\"https://twitter.com/GROUPLOVE/status/615331559936122881\">June 29, 2015</a></blockquote><script async src=\"//platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>","createdAt":"2015-07-18T19:01:10.855Z","Tags":[{"hashid":1,"description":"rock","hashtag_posts":{"createdAt":"2015-07-18T19:01:11.038Z","updatedAt":"2015-07-18T19:01:11.038Z","postid":2,"hashid":1}},{"hashid":4,"description":"indie","hashtag_posts":{"createdAt":"2015-07-18T19:01:11.038Z","updatedAt":"2015-07-18T19:01:11.038Z","postid":2,"hashid":4}}]}];
            httpBackend.expectGET('/api/posts/postsLast24h?page=0&limit=2').respond(200, fetchPostsResponse);
            postService.fetchPosts(0,2, function(res){
                expect(res).toEqual(fetchPostsResponse);
            }, function(err){
            });
            httpBackend.flush();
        });

        it ('test /featuredPosts service', function(){
            var featuredPostsResponse = [{"postid":5,"title":"Grouplove","titleimage":"assets/img/postsImg/grouplove_colours.jpg"},{"postid":6,"title":"Foster The People","titleimage":"assets/img/postsImg/fosterthepeople.jpg"},{"postid":4,"title":"Grouplove","titleimage":"assets/img/postsImg/grouplove600.jpg"}];
            httpBackend.expectGET('/api/posts/getFeaturedPosts').respond(200, featuredPostsResponse);
            postService.featuredPosts(function(res){
                expect(res).toEqual(featuredPostsResponse);
            }, function(err){
            });
            httpBackend.flush();
        });

        it ('test /savePost service', function(){
            var postRequest = {"title": "my title","shortdescription": "short description", "embed": null, "description": "my description",
                "titleimage": "myimage.src", "link": null, "type": 1, "userid": 1, "categories":[{"description":"rock"}]};
            var postResponse = {"featured":false,"commentsenabled":true,"postid":7,"title":"my title","shortdescription":"my description","embed":null,"description":"my description","titleimage":"myimage.src","link":null,"type":1,"userid":1,"updatedAt":"2015-07-18T19:26:57.021Z","createdAt":"2015-07-18T19:26:57.021Z"};
            httpBackend.expectPOST('/api/posts/').respond(200, postResponse);
            postService.savePost(postRequest, function(res){
                expect(res).toEqual(postResponse);
            }, function(err){
            });
            httpBackend.flush();
        });

        it ('test /saveComment service', function(){
            var commentRequest = {"description": "my description","userid": 1, "postid":1};
            var commentResponse = {"commentid":7,"description":"my description","userid":1,"postid":1,"updatedAt":"2015-07-18T19:32:26.356Z","createdAt":"2015-07-18T19:32:26.356Z"};
            httpBackend.expectPOST('/api/posts/comment').respond(200, commentResponse);
            postService.saveComment(commentRequest, function(res){
                expect(res).toEqual(commentResponse);
            }, function(err){
            });
            httpBackend.flush();
        });
    });
/*
    describe('Directive: hashtags', function () {
        var element, tagService, scope, httpBackend;
        beforeEach(module('myApp.home', 'mytemplates'));
        beforeEach(inject(function($rootScope, $templateCache, $compile, _tagService_, $httpBackend) {
            //$httpBackend.whenGET('partials/home/hashtags.html').respond(200, '');
            var template = $templateCache.get('partials/home/hashtags.html');
            $templateCache.put('partials/home/hashtags.html',template);

            scope = $rootScope.$new();
            tagService = _tagService_;
            httpBackend = $httpBackend;

            var tagsResponse = [{"description":"rock"},{"description":"techno"},{"description":"punk"},{"description":"indie"}];
            httpBackend.expectGET('/api/posts/tags').respond(200, tagsResponse);

            element = angular.element('<div hashtags/>');
            $compile(element)(scope);
            scope.$digest();
            httpBackend.flush();
        }));

        it("test if its not greater than maxlength", function() {
            console.log(element);
            //var text = element.find('textarea');
            //expect(scope.text.length >= element[0].attributes['my-maxlength'].value).toBeTruthy();
        });

    });
*/
    describe('Controller: postCtrl', function() {
        var mainService, lsService, postService, scope, httpBackend;
        var createPostCtrl;
        beforeEach(module('myApp.home','ngDialog','mytemplates'));
        beforeEach(inject(function ($injector, $rootScope, $controller, _$location_,
                                    _Main_, $route, _LS_,
                                    _postService_, $httpBackend) {
            scope = $rootScope.$new();
            mainService = _Main_;
            lsService = _LS_;
            postService = _postService_;
            httpBackend = $httpBackend;
            createPostCtrl = function () {
                return $controller('postCtrl', {
                    $scope: scope, $location: _$location_,
                    $routeParams: {id: 1}
                });
            };
        }));

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it("test postCtrl loadcomments", function() {
            var viewPostResponse = {
                postid: 1,
                title: "Grouplove:",
                description: "Grouplove (also typeset as GROUPLOVE) is an American indie rock band " +
                "that was formed in 2009 by Hannah Hooper (vocals, keyboards), Christian Zucconi (vocals, guitar), " +
                "Sean Gadd (bass, vocals), Andrew Wessen (guitar, vocals), and Ryan Rabin (drums). " +
                "Ryan Rabin produced their debut EP, which was originally released independently, " +
                "and was later re-released by Canvasback/Atlantic with a bonus track and their hit song, \"Colours\". " +
                "Their debut album, Never Trust a Happy Song, was also produced by Rabin and was released worldwide on " +
                "September 13, 2011.[1]",
                link: "https://en.wikipedia.org/wiki/Grouplove",
                titleimage: "/assets/img/postsImg/grouplove600.jpg",
                commentsenabled: true,
                createdAt: "2015-07-18T18:56:28.474Z",
                Profile: {
                    profileid: 1
                }
            };
            httpBackend.expectGET('/api/posts/viewpost?postid=1').respond(200, viewPostResponse);
            var comentsResponse = [{
                description: "my comment for post",
                createdAt: "2015-07-18T18:53:23.130Z",
                Profile: {
                    nickname: "jbarros",
                    profileid: 1
                }
            }];
            httpBackend.expectGET('/api/posts/commentsForPost?postid=1').respond(200, comentsResponse);
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
            //httpBackend.expectGET('/api/users/me').respond(200, meReturn);
            httpBackend.when('GET', 'partials/home/home.html').respond(200, {status: "success"});
            var commentRequest = {"description": "my description","userid": 1, "postid":1};
            var commentResponse = {"commentid":7,"description":"my description","userid":1,"postid":1,"updatedAt":"2015-07-18T19:32:26.356Z","createdAt":"2015-07-18T19:32:26.356Z"};
            //httpBackend.expectPOST('/api/posts/comment').respond(200, commentResponse);
            var postCtrl = createPostCtrl();
            //scope.saveComment(true);
            httpBackend.flush();
            expect(scope.comments).toEqual(comentsResponse);
            expect(scope.post).toEqual(viewPostResponse);
        });

        it("test postCtrl savecomment", function() {
            var viewPostResponse = {
                postid: 1,
                title: "Grouplove:",
                description: "Grouplove (also typeset as GROUPLOVE) is an American indie rock band " +
                "that was formed in 2009 by Hannah Hooper (vocals, keyboards), Christian Zucconi (vocals, guitar), " +
                "Sean Gadd (bass, vocals), Andrew Wessen (guitar, vocals), and Ryan Rabin (drums). " +
                "Ryan Rabin produced their debut EP, which was originally released independently, " +
                "and was later re-released by Canvasback/Atlantic with a bonus track and their hit song, \"Colours\". " +
                "Their debut album, Never Trust a Happy Song, was also produced by Rabin and was released worldwide on " +
                "September 13, 2011.[1]",
                link: "https://en.wikipedia.org/wiki/Grouplove",
                titleimage: "/assets/img/postsImg/grouplove600.jpg",
                commentsenabled: true,
                createdAt: "2015-07-18T18:56:28.474Z",
                Profile: {
                    profileid: 1
                }
            };
            httpBackend.expectGET('/api/posts/viewpost?postid=1').respond(200, viewPostResponse);
            var comentsResponse = [{
                description: "my comment for post",
                createdAt: "2015-07-18T18:53:23.130Z",
                Profile: {
                    nickname: "jbarros",
                    profileid: 1
                }
            }];
            httpBackend.expectGET('/api/posts/commentsForPost?postid=1').respond(200, comentsResponse);
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
            httpBackend.when('GET', 'partials/home/home.html').respond(200, {status: "success"});
            var postCtrl = createPostCtrl();
            httpBackend.flush();
            // me
            httpBackend.expectGET('/api/users/me').respond(200, meReturn);
            // partial load
            httpBackend.when('GET', 'partials/home/home.html').respond(200, {status: "success"});
            // save comment
            var commentResponse = {"commentid":7,"description":"my description","userid":1,"postid":1,"updatedAt":"2015-07-18T19:32:26.356Z","createdAt":"2015-07-18T19:32:26.356Z"};
            httpBackend.expectPOST('/api/posts/comment').respond(200, commentResponse);
            // load partial
            httpBackend.when('GET', 'partials/home/home.html').respond(200, {status: "success"});
            // comments for post
            var comentsResponse = [{
                description: "my comment for post",
                createdAt: "2015-07-18T18:53:23.130Z",
                Profile: {
                    nickname: "jbarros",
                    profileid: 1
                }
            }];
            httpBackend.expectGET('/api/posts/commentsForPost?postid=1').respond(200, comentsResponse);
            scope.saveComment(true);
            httpBackend.flush();
            expect(scope.comments).toEqual(comentsResponse);
            expect(scope.post).toEqual(viewPostResponse);
            expect(scope.comment).toBeNull();
        });

    });

    describe('Controller: homeCtrl', function() {
        var postService, scope, httpBackend;
        var createHomeCtrl;
        beforeEach(module('myApp.home','ngDialog','mytemplates'));
        beforeEach(inject(function ($injector, $rootScope, $controller, _$location_,
                                    $route, _postService_, $httpBackend, $window) {
            scope = $rootScope.$new();
            postService = _postService_;
            httpBackend = $httpBackend;
            createHomeCtrl = function () {
                return $controller('homeCtrl', {
                    $scope: scope, $location: _$location_, $window:$window
                });
            };
        }));

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it("test homeCtrl fetchPosts", function() {
            httpBackend.when('GET', 'partials/home/home.html').respond(200, {status: "success"});
            var fetchPostsResponse = [{"postid":1,"title":"Grouplove:","shortdescription":"Grouplove (also typeset as GROUPLOVE) is an American indie rock band that was formed in 2009 by Hannah Hooper (vocals, keyboards), Christian Zucconi (vocals, guitar), Sean Gadd (bass, vocals), Andrew Wessen (guitar, vocals), and Ryan Rabin (drums).","link":"https://en.wikipedia.org/wiki/Grouplove","titleimage":"/assets/img/postsImg/grouplove600.jpg","commentsenabled":true,"type":1,"embed":null,"createdAt":"2015-07-18T19:01:10.854Z",
                "Tags":[{"hashid":1,"description":"rock","hashtag_posts":{"createdAt":"2015-07-18T19:01:11.037Z","updatedAt":"2015-07-18T19:01:11.037Z","postid":1,"hashid":1}},
                    {"hashid":4,"description":"indie","hashtag_posts":{"createdAt":"2015-07-18T19:01:11.038Z","updatedAt":"2015-07-18T19:01:11.038Z","postid":1,"hashid":4}}]},
                {"postid":2,"title":"Grouplove:","shortdescription":null,"link":null,"titleimage":null,"commentsenabled":true,"type":2,"embed":"<blockquote class=\"twitter-tweet\" lang=\"en\"><p lang=\"en\" dir=\"ltr\">Thank you so much to everyone who came out to celebrate <a href=\"https://twitter.com/LadyGrouplove\">@LadyGrouplove</a> &#39;s clothing line for <a href=\"https://twitter.com/volcomwomens\">@volcomwomens</a> <a href=\"https://twitter.com/Tillys\">@Tillys</a> XO? <a href=\"http://t.co/4SZBFG96dE\">pic.twitter.com/4SZBFG96dE</a></p>&mdash; GROUPLOVE (@GROUPLOVE) <a href=\"https://twitter.com/GROUPLOVE/status/615331559936122881\">June 29, 2015</a></blockquote><script async src=\"//platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>","createdAt":"2015-07-18T19:01:10.855Z","Tags":[{"hashid":1,"description":"rock","hashtag_posts":{"createdAt":"2015-07-18T19:01:11.038Z","updatedAt":"2015-07-18T19:01:11.038Z","postid":2,"hashid":1}},{"hashid":4,"description":"indie","hashtag_posts":{"createdAt":"2015-07-18T19:01:11.038Z","updatedAt":"2015-07-18T19:01:11.038Z","postid":2,"hashid":4}}]}];
            httpBackend.expectGET('/api/posts/postsLast24h?page=0&limit=10').respond(200, fetchPostsResponse);
            var homeCtrl = createHomeCtrl();
            httpBackend.flush();
            expect(scope.posts).toEqual(fetchPostsResponse);
            expect(scope.columns).toBeDefined();
        });

    });
});