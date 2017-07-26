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
app.use(bodyParser.json());

const uuidv1 = require('uuid/v1');
var owner_id;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const photo_id = uuidv1();
        cb(null, photo_id + '.jpg');
        addPhotoToDb(photo_id,owner_id);
    }
});

function addPhotoToDb(photo_id,owner_id) {
    models.PHOTOS.create({
        photo_id: photo_id,
        owner_id: owner_id,
        location_path: 'uploads/' + photo_id + '.jpg'
    })
}

var upload = multer({ storage: storage }).single('photo');

router.post('/upload/:owner_id', function (req, res) {
    owner_id=req.params.owner_id;
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