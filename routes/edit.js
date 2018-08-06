// Defaults
var express = require('express');
var router = express.Router();
var dataBase = require('../db.json')

//GET delete page
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

// Centralizes data to "router"
module.exports = router