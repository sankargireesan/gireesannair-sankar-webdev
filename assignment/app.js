module.exports = function(app){
    require("./services/user.services.server")(app);
    require("./services/page.services.server")(app);
    require("./services/website.services.server")(app);
    require("./services/widget.services.server")(app);
}