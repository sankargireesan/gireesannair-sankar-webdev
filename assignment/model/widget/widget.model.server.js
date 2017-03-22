module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        createWidget: createWidget,
        // findAllWidgetsForPage: findAllWidgetsForPage,
        // findWidgetById: findWidgetById,
        // updateWidget: updateWidget,
        // deleteWidget: deleteWidget,
        //reorderWidget: reorderWidget,
        setModel: setModel
    };
    return api;


    function setModel(_model) {
        model = _model;
    }


    function createWidget(pageId, widget){
        return WidgetModel
            .create(widget)
            .then(function (widgetObj) {
                model.pageModel
                    .findPageById(pageId)
                    .then(function (pageObj) {
                        pageObj.widgets.push(widgetObj);
                        widgetObj._page=pageObj._id;
                        pageObj.save();
                        return widgetObj.save();
                    });
            });
    }

};