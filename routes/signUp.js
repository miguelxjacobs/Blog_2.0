// Defaults
var express = require('express');
var router = express.Router();
var users = require('../db.json');
var request = require('request');

//GET SignUp page
router.get('/signUp', function(req, res, next) {
    res.render('signUp', {title: 'Sign Up', regError: req.app.locals.registeredError});
});

router.post('/', function(req, res, next) {

    // Username in use
    let used = false;

    // Existence of username check creation
    let userCheck = req.body.client;

    // Check existence of username
    for(let i = 0; i < users.length; i++) {
        if(userCheck == users[i].client) {
            used = true;
        }
    }

    console.log(used);

    // Condition to create username if no username found
    if(used == false) {
        let obj = {
            "client": req.body.client,
            "email": req.body.email,
            "credentials": req.body.credentials,
            "loggedIn": false
        }
        request.post({
            url: 'http://localhost:3000/Users',
            body: obj,
            json: true
        }, function (error, response, body) {
            res.render('signUp', {
                message: 'Success'
            });
        });
        req.app.locals.regError = "Account Successfully Created!";

        // Automatically navigate to signIn page upon successful registration
        res.redirect('signIn');
    }

    // If username is already used
    else if(used == true) {
        req.app.locals.regError = "Username already in use, please select a different username!";
    }

    res.redirect('/signUp');
});

// Centralizes data to "router"
module.exports = router