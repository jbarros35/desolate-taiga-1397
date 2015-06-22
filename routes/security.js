var jwt    = require('jsonwebtoken');
var keyval = 'mykeysign123456';
module.exports = {
	key: keyval,
	
	ensureAuthorized : function(req, res, next) {
		var bearerToken;
		var token = (req.body && req.body.access_token) 
		|| (req.query && req.query.access_token) 
		|| req.headers['x-access-token'];
		
		if (token) {		
			try {
				var decoded = jwt.decode(token, keyval);
				console.log(decoded);
				// check token time
				if (decoded.expiresInMinutes <= Date.now()) {
				  res.send('Access token has expired', 400);
				}
				console.log('token exp time:'+decoded.expiresInMinutes - Date.now());
				next();
			} catch (err) {
				console.log(err);
				res.send(err,500);
			}
			
		} else {
			res.send(403);
		}
	}
};