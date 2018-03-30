var express = require('express');
var path = require('path');    // https://nodejs.org/docs/latest/api/path.html
var bodyParser = require('body-parser');  // parsing raw data of request object( get , post ) to json
var session = require('express-session'); // $ npm install express-session
var cookieParser = require('cookie-parser'); // $ npm install cookie-parser
var expressValidator = require('express-validator');
var flash = require('connect-flash'); // $ npm install connect-flash
var async = require('async');  // for marking function async to sync
var request = require('request');   // request library for calling another server with (get and post)
var passport = require('passport'); //  authentication and maintaining sessions for users
var pug = require('pug');
var compression = require('compression');
var mongoose = require('mongoose');
var CONFIG = require('./config/config.js');

var app = express();  // express initialization

mongoose.connect(CONFIG.DB_URL,function(err){
    console.log("db is connected..",err);
});


app.use(bodyParser.urlencoded({ extended: true }));  // calling body parser for urlencoded (x-www-urlencoded format)


app.use(bodyParser.json({ limit: '50mb' })); // bodyParser - Initializing/Configuration

app.use(session({ secret: 'NodeProject', resave: true, saveUninitialized: true ,cookie: {maxAge: 80000} })); // express-session - Initializing/Configuration

app.use(cookieParser('nodeProject')); // cookieParser - Initializing/Configuration cookie: {maxAge: 8000},
app.use(passport.initialize());     // passport - Initializing
app.use(passport.session()); // passport - User Session Initializing
app.use(expressValidator());
app.use(flash()); // flash - Initializing
app.use(compression()); //use compression middleware to compress and serve the static content.
app.use("/app", express.static(path.join(__dirname, '/app'))); // Serving Static Files (https://expressjs.com/en/starter/static-files.html)
app.set('view engine', 'pug');

require("./routes/index.js")(app,passport); // call the file from routes folder

app.listen(CONFIG.PORT, function () {
    console.log('Example app listening on port ',CONFIG.PORT);
});