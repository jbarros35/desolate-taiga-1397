'use strict';
define([	
	'angular',
	'angularRoute',
	'ngDialog',
	'infinite-scroll',
	'angular-sanitize',
	'mass-complete',
	'login/login',
	'layout/utils'
], function(angular) {

	var home = angular.module('myApp.home', ['ngRoute','ui.bootstrap', 'infinite-scroll',
		'myapp.utils','angularRestfulAuth','ngSanitize', 'MassAutoComplete']);

	home.factory('tagService', function ($http, $q) {
		return {
			findTags: function(q) {
				// the $http API is based on the deferred/promise APIs exposed by the $q service
				// so it returns a promise for us by default
				return $http.get('/api/posts/findTags?name='+q)
					.then(function(response) {
						if (typeof response.data === 'object') {
							return response.data;
						} else {
							// invalid response
							return $q.reject(response);
						}

					}, function(response) {
						// something went wrong
						return $q.reject(response);
					});
			},
			getTags: function() {
				return $http.get('/api/posts/tags').then(function(response){
					if (typeof response.data === 'object') {
						return response.data;
					} else {
						// invalid response
						return $q.reject(response);
					}
				}, function(response) {
					// something went wrong
					return $q.reject(response);
				});
			}
		};
	});

	home.factory('postService', function ($http, $q) {
		return {
			commentsForPost: function(postid) {
				// the $http API is based on the deferred/promise APIs exposed by the $q service
				// so it returns a promise for us by default
				return $http.get('/api/posts/commentsForPost?postid='+postid)
					.then(function(response) {
						if (typeof response.data === 'object') {
							return response.data;
						}
					}, function(response) {
						// something went wrong
						return $q.reject(response);
					});
			},
			saveComment: function(comment) {
				return $http.post('/api/posts/comment', comment)
					.then(function(response){
					if (typeof response.data === 'object') {
						return response.data;
					}
				}, function(response) {
					// something went wrong
					return $q.reject(response);
				});
			},
			viewPost: function(postid) {
				return $http.get('/api/posts/viewpost?postid='+postid).then(function(response) {
					if (typeof response.data === 'object') {
						return response.data;
					}
				}, function(response) {
					// something went wrong
					return $q.reject(response);
				});
			},
			savePost: function(postData){
				return $http.post('/api/posts/', postData)
					.then(function(res){
						return response.data;
					}, function(err){
						return $q.reject(response);
					})
			},
			fetchPosts: function(page, limit) {
				return $http.get('/api/posts/postsLast24h?page='+page+'&limit='+limit)
					.then(function(response){
						if (typeof response.data === 'object') {
							return response.data;
						}
					}, function(response) {
						// something went wrong
						return $q.reject(response);
					})
			},
			featuredPosts: function() {
				return $http.get('api/posts/getFeaturedPosts').then(function(response){
					if (typeof response.data === 'object') {
						return response.data;
					}
				}, function(response) {
					// something went wrong
					return $q.reject(response);
				})
			}
		};
	});

	home.controller('categoryController', function ($scope, tagService, $sce, $q) {

		function suggest_state(term) {
			var results = [];
			var ix = term.lastIndexOf(','),
				lhs = term.substring(0, ix + 1),
				rhs = term.substring(ix + 1);
			term = rhs;
			var q = term.toLowerCase().trim();

			return tagService.findTags(q).then(function(data){
				// Find first 10 states that start with `term`.
				for (var i = 0; i < data.length && results.length < 10; i++) {
					var state = data[i].description;
					if (state.toLowerCase().indexOf(q) === 0)
						results.push({ label: state, value: state });
				}

				results.forEach(function (s) {
					s.value = lhs + s.value;
				});

				return results;
			},  function(error) {
				console.log(error);
			});
		}

		function suggest_state_remote(term) {
			var deferred = $q.defer();
			deferred.resolve(suggest_state(term));
			return deferred.promise;
		}

		function setCategories(selected) {
			$scope.categories = undefined;
			console.log($scope.categories);
			$scope.setCategories(selected.label);
		}

		$scope.updateCategories = function(selected) {
			console.log($scope.categoriesRaw);
			//$scope.updateCategoriesRaw(selected);
		}

		$scope.ac_option_delimited = {
			suggest: suggest_state_remote,
			on_select: setCategories,
			on_error: console.log
		};
	});

	home.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'home/home.html',
			controller: 'homeCtrl'
		}).when('/viewpost/:id', {
			templateUrl: 'home/viewpost.html',
			controller: 'postCtrl'
		});
	}]);
	
	//tagCtrl	
	home.directive("hashtags", [
		function() {
		return {
				restrict: "A",
				replace: true,
				scope: false,
				transclude: true,			
				templateUrl: "home/hashtags.html",				
				controller: ['$scope', '$http', 'tagService', function ($scope, $http, tagService) {
					tagService.getTags().then(function(data){
						if (data) {
							$scope.hashtags = data;
						}
					},  function(error) {
						console.log(error);
					});

				}]
			};
		}
	]);
	
	//
	home.controller('postCtrl', ['$scope', '$http', '$routeParams', 'Main', 'postService', 'ngDialog',
		function($scope,$http,$routeParams,Main,postService,ngDialog) {

		// load post data
		postService.viewPost($routeParams.id).then(function(res){
			if (res) {
				$scope.post = res;
			}
		});
			 $scope.comments = [];
			 $scope.comment = {};

		// load comments
		$scope.loadcomments = function() {
			postService.commentsForPost($routeParams.id).then(function(res){
				if (res) {
					$scope.comments = res;
				}
			});

		}
		$scope.loadcomments();
		// post a new comment
		$scope.saveComment = function(valid) {
			if(valid){		
				
				// get logged data
				Main.me(function(res) {
					$scope.comment.userid = res.user.userid;
					$scope.comment.postid =  $routeParams.id;
						postService.saveComment($scope.comment).then(function(res){
							// reload comments
							$scope.loadcomments();
							//$scope.comments.push($scope.comment);
							$scope.comment = null;
						}, function(error){
							$scope.error = error.data;
							ngDialog.open({ template: 'layout/errormsg.html', scope: $scope });
						});
					/*$http.post('/api/posts/comment', $scope.comment).success(function(res) {
						// reload comments
						$scope.loadcomments();
						//$scope.comments.push($scope.comment);
						$scope.comment = null;														
					}).error(function(err) {
						$scope.error = err.data;
						ngDialog.open({ template: 'layout/errormsg.html', scope: $scope });
					});*/
				},
				function(err) {		
					$scope.error = err.data;
					ngDialog.open({ template: 'layout/errormsg.html', scope: $scope });
				});
				
			}
		}
		// rate post
		$scope.plusone = function() {
			console.log('update vote');
		}
	}]);
	// filter scape html
	home.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);

	home.controller('carouselCtrl',['$scope','postService',
		function($scope,postService) {
			$scope.myInterval = 5000;
			var slides = $scope.slides = [];
			postService.featuredPosts().then(function(res){
				for (var i=0; i<res.length; i++) {
					slides.push({
						image: res[i].titleimage,
						text: res[i].title
					});
				}
			}, function(err) {
				console.log(err);
			});
			
		}
	]);

	home.controller('homeCtrl', ['$scope', '$http', '$interval', '$window','postService',
		function($scope,$http,$interval,$window,postService) {
				
		var page = 0;
		var limit = 10;
		$scope.posts = [];
		var hasmore = true;
		var windowEl = angular.element($window);	
		// load fetch posts	
		$scope.fetchPosts = function() {		
			if (!hasmore) {
				return;
			}
			$scope.busy = true;		
			//$http.get('/api/posts/postsLast24h?page='+page+'&limit='+limit)
			//	.success(function(res) {
			postService.fetchPosts(page,limit).then(function(res){
				if (res && res.length > 0) {
					hasmore = true;
				} else {
					hasmore = false;
				}
				if (res instanceof Array) {
					$scope.posts = $scope.posts.concat(res);
				} else {
					$scope.posts.push(res);
				}
				if (hasmore) {
					page+=limit;
				}

				var columns = 3;
				var width = windowEl.width();
				if (width < 1000 && width > 766) {
					columns = 2;
				} else if (width < 760) {
					columns = 1;
				}

				$scope.columns = columnize($scope.posts, columns);
				$scope.busy = false;
				// calculate the size of screen and how many columns

			}, function(err){
				console.log(err);
			});
		};
		// dinamically adjusts window size and posts blocks
		$(window).on("resize.doResize", function (){
			
			$scope.$apply(function(){
			   //do something to update current scope based on the new innerWidth and let angular update the view.
			   var columns = 3;
			   var width = window.innerWidth;
					if (width < 1000 && width > 766) {
						columns = 2;
					} else if (width < 760) {
						columns = 1;
					}
			   $scope.columns = columnize($scope.posts, columns);
			});
		});

		$scope.$on("$destroy",function (){
			 $(window).off("resize.doResize"); //remove the handler added earlier
		});
		
		// transform data in columns
		function columnize(input, cols) {
		  var i;
		  var arr = [];
		  for(i = 0; i < input.length; i++) {
			var colIdx = i % cols;
			arr[colIdx] = arr[colIdx] || [];
			arr[colIdx].push(input[i]);
		  }
		  return arr;
		}		
		$scope.fetchPosts();
	}]);

	// new post form
	home.directive("whatsnew", ['$parse', '$http','$q',
		function($parse, $http, $compile, $templateCache, $q) {

			return {
		    restrict: "A",
		    replace: true,
		    scope: false,
		    transclude: true,
			link: function($scope, element, attrs) {
	            $scope.changeLogged = function(log) {
	                $scope.logged = log;
	            };
				$scope.setCategories = function(selected) {
					if (!$scope.categories) {
						$scope.categories = [];
					}
					$scope.categories.push(selected);
				}
				$scope.updateCategoriesRaw = function (evt) {
					var value = evt.value;
					$scope.categoriesRaw = value;
				}
	        },
		    templateUrl: "home/whatsnew.html",				
		    controller: ['$scope', '$filter', 'Dialogs', '$localStorage', 'Main','$q','tagService',
				function ($scope, $filter, Dialogs, $localStorage, Main, $q, tagService) {
					var categoriesRaw = {};
					console.log($q);
					// mass autocomplete
					function suggest_state(term) {
						var results = [];
						var ix = term.lastIndexOf(','),
							lhs = term.substring(0, ix + 1),
							rhs = term.substring(ix + 1);
						term = rhs;
						var q = term.toLowerCase().trim();

						return tagService.getTags(q).then(function(data){
							// Find first 10 states that start with `term`.
							for (var i = 0; i < data.length && results.length < 10; i++) {
								var state = data[i].description;
								if (state.toLowerCase().indexOf(q) === 0)
									results.push({ label: state, value: state });
							}

							results.forEach(function (s) {
								s.value = lhs + s.value;
							});

							return results;
						},  function(error) {
							console.log(error);
						});
					}

					function suggest_state_remote(term) {
						var deferred = $q.defer();
						deferred.resolve(suggest_state(term));
						return deferred.promise;
					}

					function setCategories(selected) {
						$scope.categoriesRaw = undefined;
						$scope.setCategories(selected.label);
					}

					$scope.ac_option_delimited = {
						suggest: suggest_state_remote,
						on_select: setCategories,
						on_error: console.log
					};

					// mass autocomplete


				$scope.post = function(valid) {
					if (valid) {
						// get user logged
						$scope.me = function() {
							try {
								if ($localStorage.token) {
									// check if token is valid
									Main.me(function(res) {
										if(res == "Forbidden") {
											$scope.myDetails = res;
										} else {
											$scope.user = res.user;
											var postData = {
												userid:res.user.userid,
												title:$scope.title
											};
											// get categories
											//var categoriesRaw = $scope.categoriesRaw.split(',');
											var categoriesScope = $scope.categories;
											var categories = [];
											// categories inside input
											for (var i = 0; i < categoriesRaw.length; i++) {
												if (categoriesRaw[i].length > 0) {
													categories.push(
														{description: categoriesRaw[i].trim().toLowerCase()});
												}
											}
											// append categories into scope
											for (var i = 0; i < categoriesScope.length; i++) {
												if (categoriesScope[i].length > 0 && categoriesRaw.indexOf(categoriesScope[i]) == -1){
													categories.push(
														{description: categoriesScope[i].trim().toLowerCase()});
												}
											}

											postData.categories = categories;

											// check if there is embeded code
											var regex = /(<([^>]+)>)/ig;
											// if is not embed
											if (!regex.test($scope.description)) {
												postData.description = $scope.description;
												// set type to 1 not embed
												postData.type=1;
												// extract urls
												var urls = findUrls($scope.description);
												var images = [];
												$scope.link = [];
												var hasImages = false;
												var i;
												for (i = 0; i < urls.length; i++) {
													// if there are images
													if (checkImage(urls[i])) {
														hasImages = true;
														images.push(urls[i]);
													} else {
														$scope.link.push(urls[i]);
													}
												}
												var imageLoaded = null;
												// check if has images
												if (hasImages) {
													// get first image that loads on time
													for (i = 0; i < images.length; i++) {
														// async function for testing images timeout
														testImage(images[i],
															function(url, callRes){
																if (callRes == "success") {
																	imageLoaded = url;
																	postData.link=$scope.link[0];
																	postData.titleImage= imageLoaded;
																};
																// save post after loaded and tested images
																savePost(postData);

															}, 1000);
														break;
													}

												} else {
													postData.link=$scope.link[0];
													// save post
													savePost(postData);
												}
											} else {
												// in case of embed posts
												postData.type=2;
												postData.embed = $scope.description;
												// save post
												savePost(postData)
											}
										}
									}, function() {
										$scope.error = 'Failed to get user data';
									});
								} else {
									// TODO redirect to login
									Dialogs.showMsg('User is invalid.', 'error', $scope);
								}

							}catch(err) {
								Dialogs.showMsg(err, 'error', $scope);
							}
						};
						$scope.me();
					}
				};
				// save post using service
				function savePost(postData) {
					postService.savePost(postData).then(function(res){
						$scope.description = null;
						$scope.images = [];
						$scope.link = [];
					}, function(err){
						Dialogs.showMsg(err, 'error', $scope);
						console.log(err);
					});
					/*
					$http.post('/api/posts/', postData)
						.success(function(res) {
							$scope.description = null;	
							$scope.images = [];
							$scope.link = [];							
						})
						.error(function(err) {
							Dialogs.showMsg(err, 'error', $scope);
							console.log(err);
						});*/
				}
				
				function findUrls( text )
				{
						var source = (text || '').toString();
						var urlArray = [];
						var url;
						var matchArray;

						// Regular expression to find FTP, HTTP(S) and email URLs.
						var regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g;

						// Iterate through any URLs in the text.
						while( (matchArray = regexToken.exec( source )) !== null )
						{
							var token = matchArray[0];
							urlArray.push( token );
						}

						return urlArray;
					}
				function checkImage(url) {
					return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
				}
				
				function testImage(url, callback, timeout) {
					timeout = timeout || 1000;
					var timedOut = false, timer;
					var img = new Image();
					img.onerror = img.onabort = function() {
						if (!timedOut) {
							clearTimeout(timer);
							callback(url, "error");
						}
					};
					img.onload = function() {
						if (!timedOut) {
							clearTimeout(timer);
							callback(url, "success");
						}
					};
					img.src = url;
					timer = setTimeout(function() {
						timedOut = true;
						callback(url, "timeout");
					}, timeout); 
				}
				 
			}]
			};
	}]);

});