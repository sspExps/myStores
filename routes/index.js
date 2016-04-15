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

function getData() {
    return new Promise(function(resolve, reject)  {
        fs.readFile('message.txt', 'utf8', function(err, data) {
            if (err) {
                dataMsg = "";
            }
            dataMsg = data;
            return resolve(data);
        });
    });
}

router.get('/update', checkAuth, function(req, res) {
    getData().then(function(dataMsg) {
        res.render('update', {
            title: 'MyStores',
            msg: JSON.parse(dataMsg)
        });
    }, function(error) {
        console.log("Error");
    });
});
router.post('/save', function(req, res) {
    var post = req.body;
    console.log(post);
    fs.writeFile('message.txt', JSON.stringify(post), function(err) {
        if (err) {
            res.render('saved', {
                msg: 'Error!!! Please try again..'
            });
        }
    });
    res.redirect('/');
});



router.post('/login', function(req, res) {
    var post = req.body;
    if (post.username === 'sam' && post.password === 'samWelcome') {
        req.session.user_id = 101123;
        res.redirect('/update');
    } else {
        res.render('login', {
            title: 'You are not authorized to view this page',
            msg: "Please check your username/password"
        });

    }
});
/* GET home page. */
router.get('/', function(req, res, next) {
    getData().then(function(dataMsg) {
        res.render('index', {
            title: 'MyStores',
            msg: dataMsg
        });
    }, function(error) {
        console.log("Error");
    });
});


module.exports = router;
