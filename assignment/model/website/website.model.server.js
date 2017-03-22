module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel",WebsiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        findAllPagesForWebsite: findAllPagesForWebsite,
        setModel: setModel
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
        return WebsiteModel.findById(websiteId);
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


    function deleteWebsite(websiteId) {

            findWebsiteById(websiteId)
            .then(function (websiteObj) {
                model.userModel
                    .findUserById(websiteObj._user)
                    .then(function (userObj) {
                        userObj.websites.pull(websiteObj._id);
                        userObj.save();
                        return WebsiteModel.remove({_id : websiteId});
                    });
            });


    }

    function deleteAfter(websiteId) {
        return WebsiteModel.remove({_id : websiteId})
    }

    function findAllPagesForWebsite(websiteId) {
        return WebsiteModel
            .findById(websiteId)
            .populate("pages")
            .exec();
    }

};