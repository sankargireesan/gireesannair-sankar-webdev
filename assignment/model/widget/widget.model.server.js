module.exports = function () {
    var q = require('q');
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);
    // mongoose.Promise = require('bluebird');



    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        setModel: setModel
    };
    return api;


    function setModel(_model) {
        model = _model;
    }



    // function createWidget(pageId, widget){
    //     var deffered = q.defer();
    //     widget._page=pageId;
    //     WidgetModel
    //         .create(widget, function (err, widget) {
    //             if(err) {
    //                 deffered.abort(err);
    //             } else {
    //                 deffered.resolve(widget);
    //             }
    //         })
    //         .then(function (widgetObj) {
    //             model.pageModel
    //                 .findPageById(pageId)
    //                 .then(function (pageObj) {
    //                     pageObj.widgets.push(widgetObj);
    //                     widgetObj._page=pageObj._id;
    //                     widgetObj.index = pageObj.widgets.length;
    //                     pageObj.save();
    //                     return widgetObj.save();
    //                 });
    //         });
    // }


    function createWidget(pageId, widget){
        var deferred = q.defer();
        widget._page = pageId;
        WidgetModel.create(widget,function (err, wid) {
            if(err) {
                deferred.abort(err);
            } else {

                model.pageModel.findPageById(pageId)
                    .then(function (page) {
                        page.widgets.push(wid);
                        wid._page = page._id;
                        page.save();
                        wid.index = page.widgets.length;


                        deferred.resolve(wid.save());
                    }

                )


            }
        });
        return deferred.promise;
    }


    //         model.userModel.findPageById(pageId).push(widget)
    //         .then(
    //             function(widgets){
    //                 widget.index = widgets.length;
    //                 return WidgetModel.create(widget);
    //             }
    //         );
    // }



    function findAllWidgetsForPage(pageId) {
        return WidgetModel.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }


    function updateWidget(widgetId, widget) {
        var deferred = q.defer();
        WidgetModel
            .update({_id: widgetId},
                {$set: widget})
            .then(function(status){
                deferred.resolve(200);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
        return deferred.promise;

    }

    function deleteWidget(widgetId) {
        var deferred = q.defer();
        WidgetModel
            .remove({_id: widgetId})
            .then(function (status) {
                deferred.resolve(200);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
        return deferred.promise;
    }



    function reorderWidget(pageId, start, end){
        return model.pageModel
            .findPageById(pageId)
            .then(
                function (pageObj) {
                    WidgetModel.find({_page: pageObj}).sort({index: 1})
                        .then(
                            function (widgets) {
                                widgets[start].index = widgets[end].index;
                                widgets[start].save();
                                if(start < end) {
                                    for(var w in widgets) {
                                        if(w > start && w <= end) {
                                            widgets[w].index--;
                                            widgets[w].save();
                                        }
                                    }
                                } else {
                                    for(var w in widgets) {
                                        if(w >= end && w < start) {
                                            widgets[w].index++;
                                            widgets[w].save();
                                        }
                                    }
                                }
                                // model.pageModel.updatewidgetorder(pageObj,widgets.sort({index: 1}));
                            }
                        );
                }
            );
    }
};