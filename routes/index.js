var express = require('express');
var router = express.Router();
var User = require('./../models/user');
var Task = require('./../models/task');

function needAuth(req, res, next) {
    if (!req.cookies.user) {
        console.log('need_login')
        res.redirect('/login?next=' + req.url)
        console.log('res!!!!!!!!!!!!!!!!!!!!!', req.url.split('/')[1])
    }
    else {
        console.log('without auth', req.url)
        User.findOne({'_id': req.cookies.user}, function (err, data) {
            if (data) {
                next()
            }
            else {
                console.log('user with such +id is not found')
                res.redirect('/login?next=' + req.url)
                console.log('res!!!!!!!!!!!!!!!!!!!!!', req.url.split('/')[1])
            }

        })

    }
}

/* GET home page. */
router.get('/', needAuth, function (req, res, next) {
    console.log('render index page')
    res.render('index', {user: req.cookies.user});
});

/* POST login */
router.post('/login', function (req, res, next) {
    console.log('LOGIN handler')
    console.log(req.body)
    User.findOne({'name': req.body.login, password: req.body.password}, function (err, data) {
        console.log('findOne data')
        console.log(data)
        if (data) {
            res.cookie('user', data._id)
            if (req.body.next) {
                console.log('redirect to', req.body.next)
                // res.redirect(req.body.next)
                res.send({status: 1, next: req.body.next})
            }
        }
        else {
            res.send({status: 0, msg: 'Неверный логин или пароль'})
        }

    })


});

/* GET hello page. */
router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Войдите под своим именем'});
});


/* GET hello page. */
router.get('/helloworld', function (req, res, next) {
    console.log('wewew')
    User.find({}, function (err, users) {
        console.log(users);
        console.log('!!!!!!!!!!!!!!!!!!!!!')
        res.render('helloworld', {title: 'Hello, world', user: users});

    });
});

/* POST save task. */
router.post('/send_task', function (req, res, next) {
    console.log('send_task handler')
    console.log(req.body)

    Task.findOne({ _id: req.body._id}, function (err, doc){
        console.log('???????????')
        console.log(doc)
    });
    Task.update({_id: req.body._id}, {
        $push: {
            answers: {
                answer: req.body.answer,
                time_start: req.body.timeStart,
                time_end: req.body.timeEnd,
                user: {
                    id: req.body.user_id
                }
            }
        }
    }, function () {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        Task.findOne({ user_id: req.body.user_id}, function (err, doc){
            console.log(doc)
        });
    })
    console.log()
    res.send(req.body)


});


/* POST get task. */
router.post('/get_task', function (req, res, next) {
    console.log('get_task handler')
    if (req.body.random) {
        console.log('get task RANDOM')
        Task.count().exec(function (err, count) {

            var random = Math.floor(Math.random() * count);

            Task.findOne().skip(random).exec(
                function (err, result) {
                    console.log('random_result', result)
                    res.send(result)
                });

        });
    }


});

module.exports = router;
