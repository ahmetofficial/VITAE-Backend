// Developer: Ahmet Kaymak
// Date: 16.07.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();
var multer = require('multer');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));

const uuidv1 = require('uuid/v1');
var owner_id;
var description;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const photo_id = uuidv1();
        cb(null, photo_id + '.jpg');
        addPhotoToDb(photo_id,owner_id,description);
    }
});

function addPhotoToDb(photo_id,owner_id,description) {
    models.PHOTOS.create({
        photo_id: photo_id,
        description: description,
        owner_id: owner_id,
        location_path: './uploads/' + photo_id + '.jpg'
    })
}

var upload = multer({ storage: storage }).single('photo');

router.post('/upload', function (req, res) {
    owner_id = req.body.owner_id;
    description = req.body.description;
    upload(req, res, function (err) {
        if (err) {
        }

        res.json({
            success: true,
            message: 'Image uploaded!'
        });
    })
});

module.exports = router;