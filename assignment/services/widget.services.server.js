module.exports = function (app, model) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/page/:pageId/widget", sortWidget);

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    app.post ("/api/upload", upload.single('myFile'), uploadImage);




    function uploadImage(req, res) {

        var widgetId        = req.body.widgetId;
        var pageId          = req.body.pageId;
        var userId          = req.body.userId;
        var websiteId       = req.body.websiteId;
        var name            = req.body.name;
        var url             = req.body.url;
        var text             = req.body.text;
        var width           = req.body.width || 100;
        width = width.toString()+"%";



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



       model
           .widgetModel
           .findWidgetById(widgetId)
           .then(
               function (wid) {
                  // console.log(wid+"skajds");
                   wid.width = width;
                   //console.log("before w"+wid);
                   wid.name = name;
                   wid.text = text;
                   //console.log("before u"+wid);
                   wid.url = new_url;
                   //console.log("before"+wid);
                   wid.save();

                   //console.log(wid);

                   res.redirect("/assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");

               },
               function (err) {
                   res.sendStatus(400);
               }

           );


    }



    function createWidget(req,res) {
        var pageId = req.params.pageId;
        var widget = req.body;

        model
            .widgetModel
            .createWidget(pageId, widget)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }



    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;

        model
            .widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            },
            function (error) {
                res.sendStatus(400).send(error);
            });
    }



    function findWidgetById(req, res){
        var widgetId = req.params.widgetId;

        model
            .widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            },
            function (error) {
                res.sendStatus(400).send(error);
            });
    }


    function updateWidget(req, res){
        var widgetId = req.params.widgetId;
        var widget = req.body;

        model
            .widgetModel
            .updateWidget(widgetId,widget)
            .then(function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });

    }


    function deleteWidget(req, res){
        var widgetId = req.params.widgetId;

        model
            .widgetModel
            .deleteWidget(widgetId)
            .then(function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
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


    function sortWidget(req,res){
        var pageId = req.params.pageId;
        var initial = parseInt(req.query.initial);
        var final = parseInt(req.query.final);
        // console.log(initial+"    "+final);
        model
            .widgetModel
            .reorderWidget(pageId,initial,final)
            .then(
                function(success){
                    res.sendStatus(200);
                },
                function(error){
                    res.statusCode(404).send(error);
                }
            )
    }


};