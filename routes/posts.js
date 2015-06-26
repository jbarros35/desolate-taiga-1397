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
			//order: '"createdAt" DESC',
			order: 'postid asc',
			attributes: ['postid', 'title','shortdescription','link','titleimage','commentsenabled','createdAt'],
			//where:['"createdAt" between ? and ?', yesterday, today]
			include: [                
				{
                    model: models.profile, as: 'Profile', attributes: ['profileid']
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
	models.post.build().updateAttributes({
		title: req.body.title,
		shortdescription: req.body.description.substring(0,255),
		description: req.body.description,
		titleImage: req.body.titleImage, 
		link: req.body.link
		}).then(function(post){
			res.json(post);
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
