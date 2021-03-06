var express = require('express');
var models = require('../models');
var jwt    = require('jsonwebtoken');
var secret = require('./security');
var router = express.Router();

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res) {
	
	models.user.findOne({
		where:{
			email:req.body.email,password:req.body.password
		}
	}).then(function(user){
		if (user) {
			// if user is found and password is right
			// create a token
			var newtoken = jwt.sign({id:user.id, email:user.email}, secret.key, {
			  expiresInMinutes: 1440 // expires in 24 hours
			});
			
			//console.log('new token'+newtoken);
			// persist token state
			user.updateAttributes({token:newtoken}).then(function(result){
				// return the information including token as JSON
				res.json({
				  success: true,
				  message: 'Enjoy your token!',
				  token: newtoken
				});
			});
			
		} else {
			res.json({ success: false, message: 'Authentication failed. Wrong password.' });	
		}
    });
	
});

router.post('/signup', function(req, res) {
	
	models.user.findOne({
		where:{
			email:req.body.email
		}
	}).then(function(user){
		if (user) {
			// if user is found return error
			res.send({
                type: false,
                data: "User already exists."
            }, 400);
		} else {			
			 models.user.create({email:req.body.email,password:req.body.password})				
				.then(function(newuser) {
					var newtoken = jwt.sign({id:newuser.id, email:req.body.email}, secret.key, {
					 expiresInMinutes: 1440 // expires in 24 hours
					});
					models.profile.create({fullname:req.body.firstName+' '+req.body.lastName}).then(function(profile) {
						newuser.setProfile(profile);
						//TODO newuser.updateAttributes({token:newtoken}).success(function(result){});
					});
					
					res.json({
						  success: true,
						  message: 'new user registered!',
						  token: newtoken
					}, 200);
			});						
		}
    });	
});

router.get('/me', secret.ensureAuthorized, function(req, res) {
	var token = (req.body && req.body.access_token) 
		|| (req.query && req.query.access_token) 
		|| req.headers['x-access-token'];
	models.user.findOne({
		attributes: ['userid','email','token'],
		where:{token: token},
		include: [                
					{
	                    model: models.profile, as: 'Profile', attributes: ['fullname','nickname','photo']
	                }
	            ]
	})
		.then(function(user) {
        if (!user) {
			res.send({
                type: false,
                data: "User not found."
            }, 403);           
        } else {
            res.json({
                type: true,
                user: user
            });
        }
		});
});

module.exports = router;
