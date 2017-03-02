module.exports = function (app) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    // app.put("/api/page/:pageId/widget", sortWidget);

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    app.post ("/api/upload", upload.single('myFile'), uploadImage);





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


    function uploadImage(req, res) {


        var widgetId        = req.body.widgetId;
        var pageId          = req.body.pageId;
        var userId          = req.body.userId;
        var websiteId       = req.body.websiteId;
        var url             = req.body.url;
        var width           = req.body.width || 100;



        if(url){
            var new_url = url;
        }
        else {

            var myFile = req.file;
            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename;     // new file name in upload folder
            var path = myFile.path;         // full path of uploaded file
            var destination = myFile.destination;  // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;
            new_url = req.protocol+'://'+req.get('host')+'/uploads/'+filename;
        }



        for(var w in widgets) {
            if(widgets[w]._id == widgetId){
                widgets[w].widgetId = widgetId;
                widgets[w].widgetType = "IMAGE";
                widgets[w].pageId = pageId;
                widgets[w].width = width.toString();
                widgets[w].url = new_url;
            }
        }

        res.redirect("/assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");

    }


    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        widget.pageId=pageId;
        widget._id = (new Date()).getTime().toString();
        widgets.push(widget);
        res.json(widget);
    }

    function findAllWidgetsForPage(req, res){
        var pageId = req.params.pageId;
        var wdg = [];
        for(var w in widgets) {
            var widget = widgets[w];
            if(widget.pageId == pageId){
                wdg.push(widget);
            }
        }
        res.json(wdg);
    }

    function findWidgetById(req, res){
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            var widget = widgets[w];
            if( widget._id == widgetId ) {
                res.json(widget);
                return;
            }
        }
        return null;
    }


    function updateWidget(req, res){
        var widgetId = req.params.widgetId;
        var widget = req.body;
        for(var w in widgets) {
            if( widgets[w]._id == widgetId ) {
                widgets[w].widgetType = widget.widgetType;
                widgets[w].pageId = widget.pageId;
                widgets[w].size = widget.size;
                widgets[w].text = widget.text;
                widgets[w].url = widget.url;
                widgets[w].width = widget.width;
                res.json(widgets[w]);
            }
        }
        return null;
    }


    function deleteWidget(req, res){
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id == widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
            }
        }
        res.sendStatus(400);
    }

    // function sortWidget(req, res) {
    //     var pageId = req.params.pageId;
    //     var initial = req.query.initial;
    //     var final = req.query.final;
    //     var widg = [];
    //
    //     for(var w in widgets) {
    //         if(widgets[w].pageId == pageId){
    //             widg.push(widgets[w]);
    //         }
    //     }
    //
    //
    //
    //     var temp = widg[initial];
    //     if (initial== final)
    //         return;
    //     else if(initial > final){
    //         return;
    //     }
    //     else{
    //         for (var m = initial; m <final;m++) {
    //             var widgetId = widg[m]._id;
    //             var widget = widg[(parseInt(m) + 1).toString()];
    //
    //             for (var w in widgets) {
    //                 if (widgets[w]._id == widgetId) {
    //                     widgets[w].widgetType = widget.widgetType;
    //                     widgets[w]._id = widget._id;
    //                     widgets[w].pageId = widget.pageId;
    //                     widgets[w].size = widget.size;
    //                     widgets[w].text = widget.text;
    //                     widgets[w].url = widget.url;
    //                     widgets[w].width = widget.width;
    //                 }
    //             }
    //         }
    //
    //             widgetId = widg[final]._id;
    //             widget = temp;
    //
    //             for(var w in widgets) {
    //                 if( widgets[w]._id == widgetId ) {
    //                     widgets[w].widgetType = widget.widgetType;
    //                     widgets[w]._id = widget._id;
    //                     widgets[w].pageId = widget.pageId;
    //                     widgets[w].size = widget.size;
    //                     widgets[w].text = widget.text;
    //                     widgets[w].url = widget.url;
    //                     widgets[w].width = widget.width;
    //                 }
    //             }
    //         }
    //
    //
    //     }


};