module.exports = function (app, model) {


    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    var cookieParser  = require('cookie-parser');
    var session       = require('express-session');

    app.use(session({
        secret: process.env.SESSION_SECRET || 'top secret',
        resave: true,
        saveUninitialized: true}));

    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    app.post('/api/login', passport.authenticate('local'), login);
    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post('/api/logout', logout);
    app.post("/api/register", register);
    app.get("/api/loggedIn", loggedIn);

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/assignment/index.html#/user',
            failureRedirect: '/assignment/index.html#/login'
        }));


    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/index.html#/user',
            failureRedirect: '/assignment/index.html#/login'
        }));


    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };


    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID || '427892120892105',
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET || '6acaae4221843d11a8061ae8439acd74',
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL || 'http://localhost:3000/auth/facebook/callback'
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    // allows Passport to maintain session information for the currently logged in user.
    function serializeUser(user, done) {
        done(null, user);
    }

    //method to retrieve the currently logged in user from the encrypted cookie created in serializeUser
    function deserializeUser(user, done) {
        model.userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


    // passport local strategy allows implementing simple username and password based authentication

    function localStrategy(username, password, done) {
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user.length>0 && user[0].username === username && user[0].password === password) {
                        return done(null, user[0]);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function googleStrategy(token, refreshToken, profile, done) {
        model
            .userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }


    function facebookStrategy(token, refreshToken, profile, done) {
        // console.log(profile);
        model
            .userModel
            .findFacebookUser(profile.id)
            .then(
                function(facebookUser) {
                    if(facebookUser) {
                        return done(null, facebookUser);
                    } else {
                        facebookUser = {
                            username: profile.displayName.replace(/ /g,''),
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        model
                            .userModel
                            .createUser(facebookUser)
                            .then(
                                function(user) {
                                    done(null, user);
                                }
                            );
                    }
                }
            );
    }

    function login(req, res) {
        var user = req.user;
         res.json(user);
    }


    function register (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user.length>0) {
                        res.status(400).send("Username already in use");
                        return;
                    } else {
                        //req.body.password = bcrypt.hashSync(req.body.password);
                        return model.userModel
                                .createUser(req.body);
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(user) {
                    if(user) {
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        })
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }






    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }



    function createUser(req, res) {
        var newUser = req.body;
        model
            .userModel
            .createUser(newUser)
            .then(
                function (user) {
                    res.json(user._doc);
                },
                function (error) {
                   res.sendStatus(400).send(error);
                }
        );

    }


    // use find user to determine whether query contains username and password or just username.
    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
        else
            res.send(req.user);
    }

    function findUserByUsername(req, res) {

        var username = req.query.username;

        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (users) {
                    if(users.length){
                        res.send(users[0]._doc);
                    } else {
                        res.sendStatus(400).send(error);
                    }

                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        model
            .userModel
            .findUserByCredentials(username,password)
            .then(
                function (users) {
                    if(users.length){
                        res.send(users[0]._doc);
                    } else {
                        res.sendStatus(400).send(error);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function findUserById(req, res) {
        var userId = req.params['userId'];
        model
            .userModel
            .findUserById(userId)
            .then(
                function (user) {
                    if(user){
                        res.send(user._doc);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )

    }


    function updateUser(req, res) {
        var userId = req.user._id;
        var newUser = req.body;
        // userId =  userId || newUser.facebook.id;

        model
            .userModel
            .updateUser(userId,newUser)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
    }


    function deleteUser(req, res) {
        var userId = req.params.userId;

        model
            .userModel
            .deleteUser(userId)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }
};