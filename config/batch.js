var models = require('../models');
module.exports = {

	loadPosts : function() {
	  var i;
	  var posts = [];
	  models.user.create({email: "josecarlos.barros@gmail.com",
		password: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"}).then(function(user){

		for (i = 0; i < 100; i++) {		
		posts.push({
			userid: user.id,
			title: "Grouplove:"+i,
			shortdescription: "Grouplove (also typeset as GROUPLOVE) is an American indie rock band that was formed in 2009 by Hannah Hooper (vocals, keyboards), Christian Zucconi (vocals, guitar), Sean Gadd (bass, vocals), Andrew Wessen (guitar, vocals), and Ryan Rabin (drums).",
			description: "Grouplove (also typeset as GROUPLOVE) is an American indie rock band that was formed in 2009 by Hannah Hooper (vocals, keyboards), Christian Zucconi (vocals, guitar), Sean Gadd (bass, vocals), Andrew Wessen (guitar, vocals), and Ryan Rabin (drums). Ryan Rabin produced their debut EP, which was originally released independently, and was later re-released by Canvasback/Atlantic with a bonus track and their hit song, \"Colours\". Their debut album, Never Trust a Happy Song, was also produced by Rabin and was released worldwide on September 13, 2011.[1]",
			titleImage: "https://cdn.tutsplus.com/vector/uploads/2013/11/chris-flower-600.png", 
			link: "https://en.wikipedia.org/wiki/Grouplove"
			});
	  }
	   models.post.bulkCreate(posts).then(function(){
		console.log("batch ended");
	  });
	});	  
	  
	 

	}	
};