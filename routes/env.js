/**
 * Created by jose on 7/5/2015.
 */
var express = require('express');
var router = express.Router();

router.get('/getEnv', function(req, res) {

    res.json({
        success: true,
        env: process.env.NODE_ENV
    });

});

module.exports = router;