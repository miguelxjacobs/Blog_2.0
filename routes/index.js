var express = require('express');
var router = express.Router();
var Posts = require('../db.json');
var request = require('request');

//can import code directly from file
var Posts = require('../db.json');

// GET homepage
router.get('/', function(req, res, next) {
    request.get({
        // Display new blogs first
        url: 'http://localhost:3000/Posts?_sort=id&_order=desc',
        json: true
    }, function(error, response, body) {
        res.render('index', {title: 'My Favourite Games', post: body});
    });
});

//POST from subscribe
router.post('/', function(req, res, next) {
    request({
        url: "http://localhost:3000/Subscribers",
        method: "POST",
        form: {
            email: req.body.email
        },
        function (error, response, body) {
            res.render('index', {
                message: 'Success'
            });
        }
    });
    res.redirect('/');
});

//GET archive page
router.get('/archive', function(req, res, next) {
    request.get({
        // Display new blogs first
        url: 'http://localhost:3000/Posts?_sort=id&_order=desc',
        json: true
    }, function(error, response, body) {
        res.render('archive', {title: 'Archive', post: body});
    });
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
    request.post({
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
    
    request.patch({
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
        //refresh page after deleting data
        res.redirect('/');
    });
});

/*****************************************************/


//GET SignUp page
router.get('/signUp', function(req, res, next) {
    res.render('signUp', {title: 'Sign Up', regError: req.app.locals.registeredError});
});

router.post('/', function(req, res, next) {

    // Username in use
    let used = false;

    // Set ID to last user ID
    let id = users[users.length - 1].id;

    id = Number(id) + 1;

    // Existence of username check creation
    let userCheck = req.body.client;

    // Check existence of username
    for(let i = 0; i < users.length; i++) {
        if(userCheck == users[i].client) {
            used = true;
        }
    }

    // Condition to create username if no username found
    if(used == false) {
        request({
            url: "http://localhost:3000/Users",
            method: "POST",
            form: {
                id: id,
                client: req.body.client,
                email: req.body.email,
                credentials: req.body.credentials,
                loggedIn: false
            },
            function (error, response, body) {
                res.render('signUp', {
                    message: 'Success'
                });
            }
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
                url: "http://localhost:3000/Users" + users[i].id,
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

  

/*****************************************************/

module.exports = router;