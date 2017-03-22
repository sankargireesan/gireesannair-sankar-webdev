module.exports = function(app){

    var model = require("./model/models.server")();

    require("./services/user.services.server")(app, model);
    require("./services/page.services.server")(app, model);
    require("./services/website.services.server")(app, model);
    require("./services/widget.services.server")(app, model);
};