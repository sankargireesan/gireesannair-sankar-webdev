module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var q = require('q');
    // mongoose.Promise = q.Promise;


    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser,
        setModel: setModel,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findDeletedWebsite: findDeletedWebsite,
        findFacebookUser: findFacebookUser,
        findUserByGoogleId: findUserByGoogleId
    };
    return api;

    function setModel(_model) {
        model = _model;
    }


    function findFacebookUser(id) {
        return UserModel.findOne({"facebook.id": id});
    }

    function findUserByGoogleId(id) {
        return UserModel.findOne({"google.id": id});
    }

    function findAllWebsitesForUser(userId) {
        return UserModel
            .findById(userId)
            .populate("websites")
            .exec();
    }

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }


    function findUserByCredentials(username, password) {
        return UserModel.find({
            username: username,
            password: password
        });
    }

    function findUserByUsername(username) {
        return UserModel.find({
            username: username
        });
    }


    function updateUser(userId, user) {
        return UserModel
            .update(
                {
                    _id: userId
                },
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    websites:user.websites
                }
            )
    }

    function deleteUser(userId) {
        return UserModel
            .remove({_id: userId})
    }


    function findDeletedWebsite(userId, websiteId) {
        // console.log(userId);
        // console.log("in user model, web id: " + websiteId);
        var deferred = q.defer();
         UserModel
            .update(
                {_id: userId},
                {$pull: {websites: websiteId}})
                    .then(
                        function (user) {
                            // if(err){
                            //     console.log("in user model, err: " + err);
                            //     deferred.abort(err);
                            // }else {
                            //     console.log(user);
                                deferred.resolve(user);
                            // }
                        },function (err) {
                            // console.log(err);
                            send(err);
                        }
                );


    }


};