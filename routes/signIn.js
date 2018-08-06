// Defaults
var express = require('express');
var router = express.Router();
var users = require('../db.json').Users;
var request = require('request');

//GET SignIn page
router.get('/signIn', function(req, res, next) {
    res.render('signIn', {title: 'Sign In', signError: req.app.locals.signError});
});

// Sign in
router.post('/', function(req, res, next) {

    let loggedUser = req.body.client;
    let loggedPass = req.body.credentials;

    // Check users in database
    for(let i = 0; i < users.length; i++) {
        // Match username and password
        if((users[i].client == loggedUser || users[i].client == loggedUser) && users[i].credentials == loggedPass) {
            // Set loggedUser to typed username
            loggedUser = users[i].client;

            // Set signIn variables
            req.app.locals.client = loggedUser;
            req.app.locals.signedIn = true;
            req.app.locals.userIndex = i;
            req.app.locals.signError = "Log In Successful!";

            request({
                url: "http://localhost:3000/Users",
                method: "PATCH",
                form: {
                    loggedIn: true
                }
            });
            // Redirect to homepage upon successful log in
            res.redirect('/');
        }
    };
    // Conditional checking correct details
    if(req.app.locals.client !== loggedUser) {
        // Display message if details are incorrect
        req.app.locals.signError = "Username or Password Incorrect!";
    };
    res.redirect('signIn');
});

// Centralizes data to "router"
module.exports = router