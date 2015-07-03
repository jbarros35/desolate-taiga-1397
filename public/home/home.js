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

	home.controller('categoryController', function ($scope, $sce, $q) {

		var states = ['Alabama', 'Alaska', 'California', 'New york'];

		function suggest_state(term) {
			var q = term.toLowerCase().trim();
			var results = [];

			// Find first 10 states that start with `term`.
			for (var i = 0; i < states.length && results.length < 10; i++) {
				var state = states[i];
				if (state.toLowerCase().indexOf(q) === 0)
					results.push({ label: state, value: state });
			}

			return results;
		}

		function suggest_state_delimited(term) {
			var ix = term.lastIndexOf(','),
				lhs = term.substring(0, ix + 1),
				rhs = term.substring(ix + 1),
				suggestions = suggest_state(rhs);

			suggestions.forEach(function (s) {
				s.value = lhs + s.value;
			});

			return suggestions;
		};

		$scope.ac_option_delimited = {
			suggest: suggest_state_delimited
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
	home.directive("hashtags", ['$http', 
		function($http) {
		return {
				restrict: "A",
				replace: true,
				scope: false,
				transclude: true,			
				templateUrl: "home/hashtags.html",				
				controller: ['$scope', '$http', function ($scope, $http) {
					// select all tags
					$http.get('/api/posts/tags').success(function(res) {
						if (res) {
							$scope.hashtags = res;
						}	
					});
				}]
			};
		}
	]);
	
	//
	home.controller('postCtrl', ['$scope', '$http', '$routeParams', 'Main', 'ngDialog', 
	                             function($scope,$http,$routeParams,Main,ngDialog) {		
		// load post data
		$http.get('/api/posts/viewpost?postid='+$routeParams.id)
				.success(function(res) {
			if (res) {
				$scope.post = res;
			}	
		});
		$scope.comments = [];
		$scope.comment = {};
		// load comments
		$scope.loadcomments = function() {
			$http.get('/api/posts/commentsForPost?postid='+$routeParams.id)
				.success(function(res) {
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
								
					$http.post('/api/posts/comment', $scope.comment).success(function(res) {
						// reload comments
						$scope.loadcomments();
						//$scope.comments.push($scope.comment);
						$scope.comment = null;														
					}).error(function(err) {
						$scope.error = err.data;
						ngDialog.open({ template: 'layout/errormsg.html', scope: $scope });
					});
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

	home.controller('homeCtrl', ['$scope', '$http', '$interval', '$window',function($scope,$http,$interval,$window) {
				
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
			$http.get('/api/posts/postsLast24h?page='+page+'&limit='+limit)
				.success(function(res) {
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

					// calculate the size of screen and how many columns
					
					var columns = 3;
					var width = windowEl.width();
					if (width < 1000 && width > 766) {
						columns = 2;
					} else if (width < 760) {
						columns = 1;
					}
					
					$scope.columns = columnize($scope.posts, columns);
					$scope.busy = false;
				})
				.error(function(err) {
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
		
		function print(input) {
		 var i;		  
		  for(i = 0; i < input.length; i++) {
			console.log(input[i].id);
		  }
		}
		
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
	home.directive("whatsnew", ['$parse', '$http',
		function($parse, $http, $compile, $templateCache) {
			return {
		    restrict: "A",
		    replace: true,
		    scope: false,
		    transclude: true,
			link: function($scope, element, attrs) {
	            $scope.changeLogged = function(log) {
	                $scope.logged = log;
	            };	          
	        },
		    templateUrl: "home/whatsnew.html",				
		    controller: ['$scope', '$http', '$filter', 'Dialogs', '$localStorage', 'Main',
				function ($scope, $http, $filter, Dialogs, $localStorage, Main) {

				$scope.dirty = {};

				var states = ['Alabama', 'Alaska', 'California'];

				function suggest_state_delimited(term) {
					var ix = term.lastIndexOf(','),
						lhs = term.substring(0, ix + 1),
						rhs = term.substring(ix + 1),
						suggestions = suggest_state(rhs);

					suggestions.forEach(function (s) {
						s.value = lhs + s.value;
					});

					return suggestions;
				};

				$scope.ac_option_delimited = {
					suggest: suggest_state_delimited
				};

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
											var postData = {userid:res.user.userid};
											// get categories
											var categoriesRaw = $scope.categories.title.split(",");
											var categories = [];
											for (var i = 0; i < categoriesRaw.length; i++) {
												if (categoriesRaw[i].length > 0) {
													categories.push(
														{description: categoriesRaw[i].trim().toLowerCase()});
												}
											}
											postData.categories = categories;

											// check if there is embeded code
											var regex = /(<([^>]+)>)/ig;
											// if is not embed
											if (!regex.test($scope.description)) {
												postData.description = $scope.description;
												postData.type=1;
												// get title if exists
												var linebreaks = $scope.description.split("\n");
												if (linebreaks[0]) {
													postData.title = linebreaks[0].substring(0,140);
												}
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
																savePost(postData);

															}, 1000);
														break;
													}

												} else {
													postData.link=$scope.link[0];
													savePost(postData);
												}
											} else {
												// in case of embed posts
												postData.type=2;
												postData.embed = $scope.description;
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
					$http.post('/api/posts/', postData)
						.success(function(res) {
							$scope.description = null;	
							$scope.images = [];
							$scope.link = [];							
						})
						.error(function(err) {
							Dialogs.showMsg(err, 'error', $scope);
							console.log(err);
						});
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
	// display all posts in the home page
	home.directive("posts", ['$parse', '$http',  
		function($parse, $http, $compile, $templateCache) {
			 return {
		    restrict: "A",
		    replace: true,
		    scope: false,
		    transclude: true,
			link: function($scope, element, attrs) {
	            $scope.addpost = function(post) {
	                $scope.posts.push(post);
	            };	          
	        },
		    templateUrl: "home/post.html",				
		    controller: ['$scope', '$http', '$interval', 
			function ($scope, $http, $interval) {								
				//$scope.posts = [];
				$scope.fetchPosts = function() {					
					
					$http.get('/api/posts/postsLast24h')
						.success(function(res) {							
							if (res instanceof Array) {
								$scope.posts = res;
							} else {
								if ($scope.posts) {							
									$scope.posts.push(res);
								} else {
									$scope.posts = [];
									$scope.posts.push(res);
								}
							}							
						})
						.error(function(err) {
							console.log(err);
						});
					
				};
				
				// first fetch
				$scope.fetchPosts();
				
				// fetch posts of last 24h at some interval
			    //$interval(function() {$scope.fetchPosts();}, 5000);		
			}]
			};
	}]);
	/*
	home.directive('myMaxlength', function() {
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
	*/
});

