var express = require('express');
var router = express.Router();
var request = require('request');

//can import code directly from file
var Posts = require('../db.json');

// GET homepage
router.get('/', function(req, res, next) {
    router.get('http://localhost:8000/posts',)
    res.render('index', {title: 'Blog', posts: Posts.posts});
});

//GET all blog posts page
router.get('/posts', function(req, res, next) {
    res.render('posts', {title: 'Posts'});
});

//GET a new page
router.get('/new', function(req, res, next) {
    res.render('new', {title: 'New'});
});

// POST new page
router.post('/new', function(req, res, next) {

    //assign blog to variable
    let obj = {
        "title": req.body.title,
        "image": req.body.image,
        "content": req.body.content,
        "author": req.body.author
    }

    // logic that saves data
    request.post( {
        url: 'http://localhost:8000/posts',
        data: obj,
        json: true,
    },  function(error, response, body) {
            // res.send(body);
            res.redirect('/new');
    });
});

//GET all blog posts
router.get('/contact', function(req, res, next) {
    res.render('contact', {title: 'Contact'});
});

module.exports = router;