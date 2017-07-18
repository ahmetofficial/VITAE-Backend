// Developer: Ahmet Kaymak
// Date: 16.07.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();
var multer = require('multer');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
var uuid = require('uuid');

//specifying storage directory of images
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: Storage }).array(3); //Field name and max count

router.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

router.post("/upload", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
});

module.exports = router;