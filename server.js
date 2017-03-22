var express = require('express');
var app = express();

// to parse JSON from HTTP request.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// require ("./test/app.js")(app);

require("./assignment/app.js")(app);
// var assignment =
//     assignment(app);

var port = process.env.PORT || 3000;

app.listen(port);