// Defaults
var express = require('express');
var router = express.Router();
var dataBase = require('../db.json')

//GET More page
router.get('/more', function(req, res, next) {
    router.get('http://localhost:3000/Posts',)
    res.render('index', {title: 'The full story...', post: Posts.Posts});
});

router.get('/more/:id', function(req, res, next) {
    let path = req.path;
    let val = path.slice(-1);
    res.render('more', {title: 'more', post: Posts.Posts[val - 1]});
});

// Centralizes data to "router"
module.exports = router