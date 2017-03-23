module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var PageModel = mongoose.model("PageModel", PageSchema);


    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        findAllWidgetsForPage: findAllWidgetsForPage,
        setModel: setModel,
        updatewidgetorder:updatewidgetorder
    };
    return api;


    function setModel(_model) {
        model = _model;
    }

    function createPage(websiteId, page){
        return PageModel
            .create(page)
            .then(function (pageObj) {
                model.websiteModel
                    .findWebsiteById(websiteId)
                    .then(function (websiteObj) {
                        websiteObj.pages.push(pageObj);
                        pageObj._website=websiteObj._id;
                        pageObj.save();
                        return websiteObj.save();
                    });
            });
    }



    function findAllPagesForWebsite(websiteId) {
        return model.websiteModel.findAllPagesForWebsite(websiteId);
    }


    function findPageById(pageId) {
        return PageModel.findById(pageId)
            .then(function (page) {
                return page;
            });
    }


    function updatePage(pageId,page) {
        return PageModel
            .update(
                {
                    _id:pageId
                },
                {
                    name: page.name,
                    title: page.title,
                    description: page.description
                }
            )
    }

    function updatewidgetorder(pageId,widgets) {
        return PageModel
            .update(
                {
                    _id:pageId
                },
                {
                    widgets: widgets
                }
            )
    }



    function deletePage(pageId) {

        findPageById(pageId)
            .then(function (pageObj) {
                model.websiteModel
                    .findWebisteById(pageObj._website)
                    .then(function (websiteObj) {
                        websiteObj.pages.pull(pageObj._id);
                        return websiteObj.save();
                    });
            });

        return PageModel
            .remove({_id : pageId})
    }

    // function findAllWidgetsForPage(pageId) {
    //     return PageModel
    //         .findById(pageId)
    //         .populate("widgets")
    //         .exec();
    // }


    function findAllWidgetsForPage(pageId) {
        var deffered = q.defer();


        PageModel
            .findById(pageId, function(err, page) {
                model.widgetModel
                    .find({_id: {$in: page.widgets}}, function(err, widgets) {
                        if(err){
                            deffered.reject(err);
                        }
                        else{
                            widgets.sort(function(a, b) {
                                return page.widgets.indexOf(a._id) - page.widgets.indexOf(b._id);
                            });
                            deffered.resolve(widgets);
                        }
                    });
            });


        return deffered.promise;
    }

};