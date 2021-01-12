var express = require('express'); //wczytuję biblotekę express
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tin_projekt', {useNewUrlParser: true, useUnifiedTopology: true});

//Views
//app.set("view engine", "ejs");
//app.set("views", __dirname + "/views");
//app.use(express.static(__dirname + '/public'));

//Router i Controller
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//od Piotrka "CORS" z projektu app.js
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var route = require("./routes/routes");
app.use('/', route)

app.listen(3001);
console.log("Uruchomiono na porcie 3001");