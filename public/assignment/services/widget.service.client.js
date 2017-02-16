
(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService );
    function WidgetService () {
        var widgets  = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];

        var api = {
            "createWidget" : createWidget,
            "findWidgetsByPageId" : findWidgetsByPageId,
            "findWidgetById":findWidgetById,
            "updateWidget":updateWidget,
            "deleteWidget":deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            widget.pageId=pageId;
            widget._id = (new Date()).getTime().toString();
            widgets.push(widget);
            return widget;
        }

        function findWidgetsByPageId(pageId){
            var wdg = [];
            for(var w in widgets) {
                var widget = widgets[w];
                if(widget.pageId === pageId){
                    wdg.push(widget);
                }
            }
            return wdg;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                var widget = widgets[w];
                if( widget._id === widgetId ) {
                    return angular.copy(widget);
                }
            }
            return null;
        }


        function updateWidget(widgetId, widget) {
            for(var w in widgets) {
                var wd = widgets[w];
                if( wd._id === widgetId ) {
                    widgets[w].widgetType = widget.widgetType;
                    widgets[w].pageId = widget.pageId;
                    widgets[w].size = widget.size;
                    widgets[w].text = widget.text;
                    widgets[w].url = widget.url;
                    widgets[w].width = widget.width;
                    return wd;
                }
            }
            return null;
        }


        function deleteWidget(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    widgets.splice(w, 1);
                }
            }
        }
    }
})();
