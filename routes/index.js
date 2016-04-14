var express = require('express');
var router = express.Router();
var fs = require('fs');
var dataMsg = [];

function checkAuth(req, res, next) {
    if (!req.session.user_id) {
        res.render('login', {
            title: 'You are not authorized to view this page'
        });
    } else {
        next();
    }
}
router.get('/update', checkAuth, function (req, res) {
    res.render('update');
});
router.post('/save', function (req, res) {
    var post = req.body;
    fs.writeFile('message.txt', post.msg.trim(), function (err) {
        if (err) {
            res.render('saved', {
                msg: 'Error!!! Please try again..'
            });
        }
    });
    res.redirect('/');
});



router.post('/login', function (req, res) {
    var post = req.body;
    if (post.username === 'sam' && post.password === 'samWelcome') {
        req.session.user_id = 101123;
        res.redirect('/update');
    } else {
        res.render('login', {
            title: 'You are not authorized to view this page'
            , msg: "Please check your username/password"
        });

    }
});
/* GET home page. */
router.get('/', function (req, res, next) {
    fs.readFile('message.txt', 'utf8', function (err, data) {
        if (err) {
            dataMsg = "";
        }
        dataMsg = data;
        res.render('index', {
        title: 'Express'
        , msg: dataMsg
         });
    });
});


module.exports = router;