var jwt    = require('jsonwebtoken');
var keyval = process.env.tokenKey
module.exports = {
	key: keyval,
	
	ensureAuthorized : function(req, res, next) {
		var bearerToken;
		var token = (req.body && req.body.access_token) 
		|| (req.query && req.query.access_token) 
		|| req.headers['x-access-token'];
		console.log('token received:'+token);
		if (token) {		
			try {
				var decoded = jwt.decode(token, keyval);				
				// check token time
				if (decoded.expiresInMinutes <= Date.now()) {
				  res.send('Access token has expired', 400);
				}
				console.log('token exp time:'+decoded.expiresInMinutes - Date.now());
				next();
			} catch (err) {
				console.log('token error:'+err);
				res.send(err,500);
			}
			
		} else {
			console.log('token not received!');
			res.send(403);
		}
	}
};