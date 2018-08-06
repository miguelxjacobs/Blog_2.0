// Defaults
var express = require('express');
var router = express.Router();
var dataBase = require('../db.json')

//GET delete page
router.get('/delete/:id', function(req, res, next) {
    router.get('http://localhost:3000/Posts',)
    res.render('delete', {title: 'My Favourite Games', post: Posts.Posts});
});

// Centralizes data to "router"
module.exports = router