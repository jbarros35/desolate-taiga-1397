var express = require('express');
var models = require('../models');
var router = express.Router();
var secret = require('./security');

router.get('/postsLast24h', function(req, res) {
	var today = new Date();
	var yesterday = new Date(today);
	yesterday.setDate(today.getDate() - 1);	
	models.Post.findAll({
	limit: 100,
	order: '"createdAt" DESC',
	attributes: ['id', 'title','shortdescription','link','titleImage'],
	where:['"createdAt" between ? and ?', yesterday, today],
	})
		.then(function(posts){
			res.json(posts);
	});
});

router.post('/', secret.ensureAuthorized, function(req, res) {
	models.Post.build().updateAttributes({
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
