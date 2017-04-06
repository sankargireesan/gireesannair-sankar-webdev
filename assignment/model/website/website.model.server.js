module.exports = function () {

    var model = {};
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel",WebsiteSchema);

    var q = require('q');
    // mongoose.Promise = q.Promise;

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        findAllPagesForWebsite: findAllPagesForWebsite,
        setModel: setModel,
        // deleteAfter:deleteAfter
};
    return api;


    function setModel(_model) {
        model = _model;
    }

    function createWebsiteForUser(userId, website){
        return WebsiteModel
            .create(website)
            .then(function (websiteObj) {
                model.userModel
                    .findUserById(userId)
                    .then(function (userObj) {
                        userObj.websites.push(websiteObj);
                        websiteObj._user=userObj._id;
                        websiteObj.save();
                        return userObj.save();
                    });
            });
    }



    function findAllWebsitesForUser(userId) {
        return model.userModel.findAllWebsitesForUser(userId);
    }


    function findWebsiteById(websiteId) {
        var deferred = q.defer();
         WebsiteModel.findById(websiteId, function (err, website) {
             if(err) {
                 deferred.abort(err);
             } else {
                 deferred.resolve(website);

             }
         });
                return deferred.promise;
            }



    function updateWebsite(websiteId,website) {
        return WebsiteModel
            .update(
                {
                    _id:websiteId
                },
                {
                    name: website.name,
                    description: website.description
                }
            )
    }

    function findAllPagesForWebsite(websiteId) {
        return WebsiteModel
            .findById(websiteId)
            .populate("pages")
            .exec();
    }

    // function deleteWebsite(websiteId) {
    //     var deferred = q.defer();
    //     findWebsiteById(websiteId)
    //         .then(function (websiteObj) {
    //             return model
    //                 .userModel
    //                 .findDeletedWebsite(websiteObj._user, websiteId)
    //                 .then(function (st) {
    //                     send(st);
    //                 },function (err) {
    //                     send(err);
    //                 });
    //         });
    // }



    //                     userObj.websites.pull(websiteObj._id)
    //                         .then(function (status) {
    //                             userObj.save(function () {
    //                                 return WebsiteModel.findOneAndRemove({_id : websiteId});
    //                             });
    //                                 // .then(function (s) {
    //                                 //     return WebsiteModel.findOneAndRemove({_id : websiteId});
    //                                 // },function (error) {
    //                                 //     return error;
    //                                 // });
    //
    //                         });
    //
    //                 });
    //         });
    //
    //
    // }
    //
    //
    //
    //
    //
    // function deleteAfter(websiteId) {
    //
    //     var deferred = q.defer();
    //     WebsiteModel.remove({_id : websiteId}, function (err, website) {
    //         if(err) {
    //             console.log("in website model, err: " + err);
    //             deferred.abort(err);
    //         } else {
    //             deferred.resolve(website);
    //         }
    //     });
    //     return deferred.promise;
    // }

    //
    // function deleteWebsite(websiteId) {
    //     var deferred = q.defer();
    //
    //     WebsiteModel.findById(websiteId, function (err, website) {
    //         if (err) {
    //             deferred.abort(err);
    //         } else {
    //             deferred.resolve(model.userModel.findUserById(website._user,function (err, user){
    //                 if(err) {
    //                     deferred.abort(err);
    //                 } else {
    //
    //                     deferred.resolve(user.websites.pull(websiteId), function (err,user) {
    //                         if(err) {
    //                             deferred.abort(err);
    //                         } else {
    //                             deferred.resolve(status);
    //                         }
    //                     });
    //                 }
    //             });
    //             }));
    //         }
    //     });
    //
    // }






        // model.userModel.findUserById(websiteObj._user,function (err, user) {
        //     if(err) {
        //         deferred.abort(err);
        //     } else {
        //
        //         deferred.resolve(user.websites.pull(websiteId));
        //     }
        //     });


    // function deleteWebsite(websiteId){
    //     var deferred = q.defer();
    //
    //     WebsiteModel.findById(websiteId, function (err, website) {
    //         if (err) {
    //             deferred.abort(err);
    //         } else {
    //
    //             deferred.resolve(model.userModel.findUserById(website._user), function (err, user) {
    //                 if (err) {
    //                     deferred.abort(err);
    //                 } else {
    //
    //                     deferred.resolve(user.websites.pull(websiteId), function (err, user) {
    //                         if (err) {
    //                             deferred.abort(err);
    //                         } else {
    //
    //                             deferred.resolve(model.userModel.findDeletedWebsite(user, websiteId),function (err, user) {
    //                                 if (err) {
    //                                     deferred.abort(err);
    //                                 } else {
    //
    //                                     deferred.resolve();
    //                                 }
    //                             });
    //                         }
    //                     });
    //                 }
    //                     });
    //                 }
    //             });
    //         return deferred.promise;
    //     }



    //     WebsiteModel.remove({_id : websiteId}, function (err, status) {
    //         if(err) {
    //             deferred.abort(err);
    //         } else {
    //             deferred.resolve(status);
    //
    //         }
    //     });
    //     return deferred.promise;
    // }


// Without user getting deleted

    function deleteWebsite(websiteId){

        var deferred = q.defer();

        WebsiteModel.remove({_id : websiteId}, function (err, status) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(status);

            }
        });
        return deferred.promise;
    }

    // function deleteWebsite(websiteId) {
    //     var deferred = q.defer();
    //     findWebsiteById(websiteId)
    //         .then(function (websiteObj) {
    //             model
    //                 .userModel
    //                 .findUserById(websiteObj._user)
    //                 .then(function (userObj) {
    //                     userObj.websites.pull(websiteObj._id)
    //                         .then(function (status) {
    //                             userObj.save()
    //                                 .then(function (s) {
    //                                     deferred.resolve(WebsiteModel.remove({_id: websiteId}));
    //
    //
    //                                 });
    //
    //                         });
    //                 });
    //
    //         });
    //     return deferred.promise;
    //
    // }










};