var express = require('express');
var models = require('../models');
var router = express.Router();
var secret = require('./security');


router.get('/postsLast24h', function(req, res) {
	var today = new Date();
	var yesterday = new Date(today);
	yesterday.setDate(today.getDate() - 1);	
	models.post.findAll({
			limit: req.query.limit ? req.query.limit : 100,
			offset: req.query.page ? req.query.page : 0,
			order: '"createdAt" DESC',
			order: 'postid asc',
			attributes: ['postid', 'title','shortdescription','link','titleimage','commentsenabled','type','embed','createdAt'],
			//where:['"createdAt" between ? and ?', yesterday, today]
			include: [                
				/*{
                    model: models.profile, as: 'Profile', attributes: ['profileid','nickname']
                },*/ 
                {
                	model: models.hashtag, as: 'Tags', attributes: ['hashid','description']
                }
            ]
		}).then(function(posts){
			res.json(posts);
		});
});

router.get('/viewpost', function(req, res) {
	models.post.findOne({			
			attributes: ['postid', 'title','description','link','titleimage','commentsenabled','createdAt'],
			where: {postid:req.query.postid},
			include: [                
				{
                    model: models.profile, as: 'Profile', attributes: ['profileid']
                }
            ]
		}).then(function(posts){
			res.json(posts);
		});
});
// save a new post
router.post('/', secret.ensureAuthorized, function(req, res) {
	
	var sequelize = models.sequelize;	
	var newpost;
	// create categories
	var tags = req.body.categories;
	sequelize.transaction({autocommit: false}, function (t) {		
		
		return models.post.build().updateAttributes({
				title: req.body.title,
				shortdescription: req.body.description.substring(0,255),
				description: req.body.description,
				titleImage: req.body.titleImage, 
				link: req.body.link,
				userid: req.body.userid	
			}, {transaction: t}).then(function(post){
				newpost = post;
				for (var i = 0; i < tags.length;i++) {

				return models.hashtag.findOrCreate(
						{where: {description: tags[i].description},
						defaults: {description: tags[i].description},
						transaction: t}).spread(function(tag, created) {
						return newpost.addTag(tag, {transaction: t});
					});				
				}
			});
		
	}).then(function (result) {
	    // Transaction has been committed
	    // result is whatever the result of the promise chain returned to the transaction callback is
	    if (newpost) {
			res.json(newpost);
		}
	    console.log(result);
	}).catch(function (e) {
	    // Transaction has been rolled back
	    // err is whatever rejected the promise chain returned to the transaction callback is
	     res.status(500).send({
                type: false,
                data: e
            });	    
		throw e;
	});
});
// save comment
router.post('/comment', secret.ensureAuthorized, function(req, res) {
	models.comment.build().updateAttributes({		
		description: req.body.description,
		userid: req.body.userid,
		postid: req.body.postid
		}).then(function(post){
			res.json(post);
	});
});
// get posts from desired post
router.get('/commentsForPost', function(req, res) {
	models.comment.findAll({
		attributes: ['description', 'createdAt'],
		where: {postid:req.query.postid},
		limit: req.query.limit ? req.query.limit : 10,
		offset: req.query.page ? req.query.page : 0,
		include: [                
					{
	                    model: models.profile, as: 'Profile', attributes: ['nickname', 'profileid']
	                }
	            ],
		order: '"createdAt" desc',		
		}).then(function(post){
			res.json(post);
	});
});

// get 10 most popular tags list
router.get('/tags', function(req, res) {
	models.hashtag.findAll({
			limit: 10,
			offset: 0,			
			//order: 'postid asc',
			attributes: ['description'],	
		}).then(function(posts){
			res.json(posts);
		});
});

module.exports = router;
