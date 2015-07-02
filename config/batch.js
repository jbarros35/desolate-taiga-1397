var models = require('../models');
module.exports = {

	loadPosts : function() {
	  var i;
	  var posts = [];
	  models.user.create({email: "josecarlos.barros@gmail.com",
		password: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
		token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Impvc2VjYXJsb3MuYmFycm9zQGdtYWlsLmNvbSIsImlhdCI6MTQzNTQzNjMyOSwiZXhwIjoxNDM1NTIyNzI5fQ.olCGwv3TYKfWYk5gDHr13miIP9e-jEj6eLvt4Jxz40k"}).then(function(user){
			// set profile
			models.profile.create(
			{fullname:'Jose Carlos Barros', 
			nickname:'jbarros',
			userid:user.userid,
			photo: 'assets/img/users/nicolas_cage.jpg'})
			.then(function(profile) {
			// tags
			var description = ['rock','techno','punk','indie'];
			var tags = [];
			for (i = 0; i < description.length;i++) {
				models.hashtag.create({description:description[i]}).then(function(tag){
					tags.push(tag);
				});
			}
			// create posts
			//for (i = 0; i < 100; i++) {		
				posts.push({
					userid: profile.profileid,
					title: "Grouplove:",
					shortdescription: "Grouplove (also typeset as GROUPLOVE) is an American indie rock band that was formed in 2009 by Hannah Hooper (vocals, keyboards), Christian Zucconi (vocals, guitar), Sean Gadd (bass, vocals), Andrew Wessen (guitar, vocals), and Ryan Rabin (drums).",
					description: "Grouplove (also typeset as GROUPLOVE) is an American indie rock band that was formed in 2009 by Hannah Hooper (vocals, keyboards), Christian Zucconi (vocals, guitar), Sean Gadd (bass, vocals), Andrew Wessen (guitar, vocals), and Ryan Rabin (drums). Ryan Rabin produced their debut EP, which was originally released independently, and was later re-released by Canvasback/Atlantic with a bonus track and their hit song, \"Colours\". Their debut album, Never Trust a Happy Song, was also produced by Rabin and was released worldwide on September 13, 2011.[1]",
					titleimage: "/assets/img/postsImg/grouplove600.jpg", 
					type: 1,
					link: "https://en.wikipedia.org/wiki/Grouplove"
					});

				posts.push({
					userid: profile.profileid,
					title: "Grouplove:",
				embed: "<blockquote class=\"twitter-tweet\" lang=\"en\"><p lang=\"en\" dir=\"ltr\">"+
				"Thank you so much to everyone who came out to celebrate "+
				"<a href=\"https://twitter.com/LadyGrouplove\">@LadyGrouplove</a> &#39;s clothing line for "+
				"<a href=\"https://twitter.com/volcomwomens\">@volcomwomens</a> "+
				"<a href=\"https://twitter.com/Tillys\">@Tillys</a> XO🎉 "+
				"<a href=\"http://t.co/4SZBFG96dE\">pic.twitter.com/4SZBFG96dE</a>"+
				"</p>&mdash; GROUPLOVE (@GROUPLOVE) <a href=\"https://twitter.com/GROUPLOVE/status/615331559936122881\">"+
				"June 29, 2015</a></blockquote>"+
				"<script async src=\"//platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>",
					type: 2});

				posts.push({
						userid: profile.profileid,
						title: "Foster the People",
						embed: "<iframe src=\"https://www.youtube.com/embed/SDTZ7iX4vTQ\" class=\"img-responsive\" frameborder=\"0\" allowfullscreen></iframe>",
						type: 2});
		  //}		

		for (var i = 0; i < posts.length;i++) {
			models.post.create(posts[i]).then(function(post){
				post.addTag(tags[0]);
				post.addTag(tags[3]);
			});
		}

		  
		 /* models.post.bulkCreate(posts).then(function(postList){
		  	for (var i = 0; i < postList.length;i++) {
				console.log(postList[i]);
				postList[i].addTag(tags[0]);
				postList[i].addTag(tags[3]);
		  	}		  	
			console.log("batch ended");
		  });*/

		});
		
	});
	}	
};