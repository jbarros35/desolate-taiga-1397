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
			attributes: ['postid', 'title','shortdescription','link','titleImage','createdAt'],
			//where:['"createdAt" between ? and ?', yesterday, today]
			include: [
                {
                    model: models.user, as: 'User', attributes: ['id']
                },
				{
                    model: models.profile, as: 'Profile', attributes: ['profileid']
                }
            ]
		}).then(function(posts){
			res.json(posts);
		});
});

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
module.exports = router;
