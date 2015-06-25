'use strict';
define([	
	'angular',
	'angularRoute',	
	'infinite-scroll'
], function(angular) {

	var home = angular.module('myApp.home', ['ngRoute','ui.bootstrap', 'infinite-scroll']);

	home.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'home/home.html',
			controller: 'homeCtrl'
		});
	}]);
	
	home.controller('homeCtrl', ['$scope', '$http', '$interval', '$window',function($scope,$http,$interval,$window) {
		console.log('home ctrl');		
		var page = 0;
		var limit = 10;
		$scope.posts = [];
		
		var windowEl = angular.element($window);		
		$scope.fetchPosts = function() {		
			$scope.busy = true;		
			$http.get('/api/posts/postsLast24h?page='+page+'&limit='+limit)
				.success(function(res) {					
					if (res instanceof Array) {
						$scope.posts = $scope.posts.concat(res);
					} else {
						$scope.posts.push(res);
					}
					
					page+=limit;
					// calculate the size of screen and how many columns
					var columns = 3;
					if (windowEl.innerWidth < 1000 && windowEl.innerWidth > 766) {
						columns = 2;
					} else if (windowEl.innerWidth < 760) {
						columns = 1;
					}
					$scope.columns = columnize($scope.posts, columns);
					$scope.busy = false;
				})
				.error(function(err) {
					console.log(err);
				});
				
		};
		
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

	// 
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
		    controller: ['$scope', '$http', '$filter', function ($scope, $http, $filter) {				
				$scope.post = function(valid) {
					if (valid) {
						var postData = {
							description: $scope.description
						};
						// get title if exists
						var linebreaks = $scope.description.split("\n");
						if (linebreaks[0]) {
							postData.title = linebreaks[0];
						}
						// extract urls
						var urls = findUrls($scope.description);
						var images = [];
						$scope.link = [];
						var hasImages = false;
						var i;						
						for (i = 0; i < urls.length; i++) {
							// if there is images
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
						
					}
				};
				
				function savePost(postData) {
					$http.post('/api/posts/', postData)
						.success(function(res) {
							$scope.description = null;	
							$scope.images = [];
							$scope.link = [];							
						})
						.error(function(err) {
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
							console.log(res);
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
});

