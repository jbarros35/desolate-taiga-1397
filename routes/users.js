var express = require('express');
var models = require('../models');
var jwt    = require('jsonwebtoken');
var secret = require('./security');
var router = express.Router();

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res) {
	
	models.User.findOne({
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
			
			console.log('new token'+newtoken);
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
	
	models.User.findOne({
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
			var newtoken = null;
			models.sequelize.transaction(function (t) {
				
				models.User.create({email:req.body.email,password:req.body.password}, {transaction: t})
					.success(function(newuser){
						
						newtoken = jwt.sign({id:newuser.id, email:req.body.email}, secret.key, {
						  expiresInMinutes: 1440 // expires in 24 hours
						});
						
						// persist token state
						newuser.updateAttributes({token:newtoken}, {transaction: t}).success(function(result){
						// create profile
						models.Profile.create({fullname:req.body.firstName+req.body.lastName}, {transaction: t})
								
								.success(function(profile) {
									// set profile to user
									newuser.setProfiles(profile).then(function(res){});
							}).error(function(err){
												console.log('error2')
												t.rollback();
											});					
						}).error(function(err){
							console.log('error2')
							t.rollback();
						});;
					}).error(function(err){
                console.log('error2')
                t.rollback();
            });
			}).then(function (result) {
			console.log('closed transaction');
			  // Transaction has been committed
			  // result is whatever the result of the promise chain returned to the transaction callback
				res.json({
						  success: true,
						  message: 'new user registered!',
						  token: newtoken
				}, 200);
			}).catch(function (err) {
				console.log('rollback transaction');
			  // Transaction has been rolled back
			  // err is whatever rejected the promise chain returned to the transaction callback			  
			  res.send({type:false, data:"Transaction error."},500);
			  throw new Error();
			});		
		}
    });	
});

router.get('/me', secret.ensureAuthorized, function(req, res) {
	var token = (req.body && req.body.access_token) 
		|| (req.query && req.query.access_token) 
		|| req.headers['x-access-token'];
	models.User.findOne({where:{token: token}})
		.then(function(user) {
        if (!user) {
			res.send({
                type: false,
                data: "User not found."
            }, 403);           
        } else {
            res.json({
                type: true,
                data: {
					id:user.id,
					email:user.email
				}
            });
        }
		});
});

module.exports = router;
