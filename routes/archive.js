// Defaults
var express = require('express');
var router = express.Router();
var dataBase = require('../db.json')

//GET archive page
router.get('/archive', function(req, res, next) {
    res.render('archive', {title: 'Archive', post:Posts.Posts});
});

// Centralizes data to "router"
module.exports = router