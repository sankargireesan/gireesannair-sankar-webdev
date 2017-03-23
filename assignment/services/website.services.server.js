module.exports = function (app, model) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);


    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.userId;
        model
            .websiteModel
            .createWebsiteForUser(userId, website)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }


    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;

        model
            .websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.json(websites);
                }
            );
    }


    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        model
            .websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    res.json(website);
                }
            );
    }


    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;

        model
            .websiteModel
            .updateWebsite(websiteId, website)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
    }


//     function deleteWebsite(req, res) {
//         var websiteId = req.params.websiteId;
//         model
//             .websiteModel
//             .findWebsiteById(websiteId)
//             .then(
//                 function (website) {
//                     console.log(website._user);
//                     return model.userModel.findDeletedWebsite(website._user, website._id);
//                 })
//             .then(function (status) {
//                     model.websiteModel.deleteAfter(website._id)
//                         .then(
//                             function (stat) {
//                                 res.send(200);
//                             }, function (error) {
//                                 res.sendStatus(400);
//                             });
//                 }
//             );
//     }
// };



// deleteWebsite
//
    function deleteWebsite(req, res){
        var websiteId = req.params.websiteId;

        model
            .websiteModel
            .deleteWebsite(websiteId)
            .then(function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }




                //         .then(function (s) {
                //
                //
                //                 res.send(200);
                //             },function (error) {
                //                 res.sendStatus(400);
                //             }
                //
                //         );
                // },
                // function (error) {
                //     res.sendStatus(400);
                // }
            // );
    // }
//

};
