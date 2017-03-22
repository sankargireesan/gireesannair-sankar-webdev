module.exports = function (app, model) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);


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
        var userId = req.params.userId;
        var newUser = req.body;

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
};