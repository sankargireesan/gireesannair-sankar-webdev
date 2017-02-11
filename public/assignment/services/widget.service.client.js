
(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService );
    function WidgetService () {
        var widgets  = [
                { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
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
            widgets.push(widget);
        }

        function findWidgetsByPageId(pageId){
            for(var w in widgets) {
                var widget = widgets[w];
                if(widget.pageId === pageId){
                    return angular.copy(widget);
                }
            }
            return null;
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
            for(var w in widget) {
                var wd = widgets[p];
                if( wd._id === widgetId ) {
                    widgets[w].widgetType = widget.widgetType;
                    widgets[w].pageId = widget.pageId;
                    widgets[w].size = widget.size;
                    widgets[w].text = widget.text;
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
