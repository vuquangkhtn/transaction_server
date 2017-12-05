var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var  port = process.env.PORT || 3000;
var db = require('./api/app-helpers/dbHelper');
var cors = require('cors');

app.use(cors({credentials: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var userRoute = require('./api/routes/UserRoute'); //importing route
userRoute(app); //register the route

module.exports = app;