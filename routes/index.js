var express = require('express');
var router = express.Router();
var Posts = require('../db.json');
var request = require('request');

//can import code directly from file
var Posts = require('../db.json');

// GET homepage
router.get('/', function(req, res, next) {
    router.get('http://localhost:3000/Posts',)
    res.render('index', {title: 'My Favourite Games', post: Posts.Posts});
});

//GET archive page
router.get('/archive', function(req, res, next) {
    res.render('archive', {title: 'Archive', post:Posts.Posts});
});

//GET all blog posts
router.get('/posts', function(req, res, next) {
    res.render('posts', {title: 'Posts'});
});

//GET new page
router.get('/new', function(req, res, next) {
    res.render('new', {title: 'New', posts: Posts.Posts});
});

//GET readMore page
router.get('/more', function(req, res, next) {
    router.get('http://localhost:3000/Posts',)
    res.render('index', {title: 'The full story...', post: Posts.Posts});
});

router.get('/more/:id', function(req, res, next) {
    let path = req.path;
    let val = path.slice(-1);
    res.render('more', {title: 'more', post: Posts.Posts[val - 1]});
});

//POST new blog
router.post('/new', function(req, res, next) {
    let path = req.path;
    let val = path.slice(-1);

    let date = new Date();
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();
    let currentDate = year + "/" + month + "/" + day;

    let obj = {
        "title": req.body.title,
        "image": req.body.image,
        "date": currentDate,
        "content": req.body.content,
        "author": req.body.author,
    }
    request.post( {
        url: 'http://localhost:3000/Posts',
        body: obj,
        json: true
    }, function (error, response, body) {
        //refresh page after sending data
        res.redirect('/new');
    });
});

//GET edit page
router.get('/edit/:id', function(req, res, next) {
    let path = req.path;
    let val = path.slice(-1);

    let date = new Date();
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();

    let currentDate = year + "/" + month + "/" + day;
    res.render('edit', {
        posts: Posts.Posts[val - 1],

        currentDate: currentDate
    });
});

//UPDATE edited post
router.post('/edit/:id', function(req, res, next) {
    let obj = {
        "title": req.body.title,
        "image": req.body.image,
        "date": req.body.datetime,
        "content": req.body.content,
        "author": req.body.author,
    }
    console.log(obj);
    request.patch( {
        url: 'http://localhost:3000/Posts/' + req.params.id,
        body: obj,
        json: true
    }, function (error, response, body) {
        //refresh page after sending data
        res.redirect('/');
    });
});

// GET delete page
router.get('/delete/:id', function(req, res, next) {
    router.get('http://localhost:3000/Posts',)
    res.render('delete', {title: 'My Favourite Games', post: Posts.Posts});
});

//DELETE post
router.post('/delete/:id', function(req, res, next) {
    request.delete( {
        url: 'http://localhost:3000/Posts/' + req.params.id,
        json: true
    }, function (error, response, body) {
        //refresh page after sending data
        res.redirect('/');
    });
});

module.exports = router;