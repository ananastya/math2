var express = require('express');
var router = express.Router();
var User = require('/models/user');

/* GET home page. */
router.get('/helloworld', function(req, res, next) {
    console.log('!!!?????????????????')
    User.find({}, function(err, users) {
        console.log(users);
        console.log('!!!!!!!!!!!!!!!!!!!!!')
        res.render('helloworld', { title: 'Hello, world', user: users });
    });
    
});

module.exports = router;
