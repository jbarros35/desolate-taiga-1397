var models = require('../models');
module.exports = {

	loadPosts : function() {
	  var i;
	  var posts = [];
	  for (i = 0; i < 1000; i++) {		
		posts.push({
			title: "Post id "+i,
			shortdescription: "This is a test post",
			description: "Test post batch was loaded.",
			titleImage: "http://s3-ap-southeast-2.amazonaws.com/wh1.thewebconsole.com/wh/3033/images/Aust-Post-logo.jpg", 
			link: "www.google.com"
			});
	  }
	  models.post.bulkCreate(posts).then(function(){
		console.log("batch ended");
	  });

	}	
};