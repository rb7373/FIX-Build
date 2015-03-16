var express = require("express");
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');

var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function (app, config) {

    function compile(str, path) {
        return stylus(str).set('filename', path);
    };

/*

    switch (config.mode){
        case 'production':
            console.log('** PRODUCTION ON AZURE **');
            console.log('serving from ' + './build/');
            process.chdir('./../../');
            app.use('/', express.static('./build/'));
            break;
        case 'stage':
        case 'build':
            console.log('** BUILD **');
            console.log('serving from ' + './build/');
            app.use('/', express.static('./build/'));
            break;
        default:
            console.log('** DEV **');
            console.log('serving from ' + './src/client/ and ./');
            app.use('/', express.static('./src/client/'));
            app.use('/', express.static('./'));
            break;
    }

    */


    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');

    app.use(morgan('dev')); // log every request to the console
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(multer());
    app.use(stylus.middleware({
        src: config.rootPath + '/public',
        compile: compile
    }));
    app.use(express.static(config.rootPath + '/public'));
    app.use(session({
        secret: 'fix-app',
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

};