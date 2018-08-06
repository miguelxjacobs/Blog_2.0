// Defaults
var express = require('express');
var router = express.Router();
var dataBase = require('../db.json')

//GET New page
router.get('/new', function(req, res, next) {
    res.render('new', {title: 'New', posts: Posts.Posts});
});

// Centralizes data to "router"
module.exports = router