// Developer: Ahmet Kaymak
// Date: 16.07.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs-extra');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json());

const uuidv1 = require('uuid/v1');
var owner_id;
var post_photo_id;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const photo_id = uuidv1();
        var file1 = photo_id.toString().charAt(0);
        var file2 = photo_id.toString().charAt(1);
        var file3 = photo_id.toString().charAt(2);
        var file4 = photo_id.toString().charAt(3);
        var file5 = photo_id.toString().charAt(4);
        var file6 = photo_id.toString().charAt(5);
        var file7 = photo_id.toString().charAt(6);
        var file8 = photo_id.toString().charAt(7);
        var file9 = photo_id.toString().charAt(9);
        var file10 = photo_id.toString().charAt(10);
        var file11 = photo_id.toString().charAt(11);
        var file12 = photo_id.toString().charAt(12);
        var directory = file1 + '/' + file2 + '/' + file3 + '/' + file4 + '/' + file5 + '/' + file6 + '/'
            + file7 + '/' + file8 + '/' + file9 + '/' + file10 + '/' + file11 + '/' + file12 + '/';

        fs.mkdirp('uploads/'+directory, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log('başarılı')
            }
        });

        cb(null, photo_id + '.jpg');
        createPhoto(photo_id, owner_id, directory);
        updateUserProfilePicture(owner_id, photo_id,directory);
        changePhotoDirectory(photo_id,directory);
    }
});
var storagePostPicture = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const photo_id = uuidv1();
        post_photo_id=photo_id;
        var file1 = photo_id.toString().charAt(0);
        var file2 = photo_id.toString().charAt(1);
        var file3 = photo_id.toString().charAt(2);
        var file4 = photo_id.toString().charAt(3);
        var file5 = photo_id.toString().charAt(4);
        var file6 = photo_id.toString().charAt(5);
        var file7 = photo_id.toString().charAt(6);
        var file8 = photo_id.toString().charAt(7);
        var file9 = photo_id.toString().charAt(9);
        var file10 = photo_id.toString().charAt(10);
        var file11 = photo_id.toString().charAt(11);
        var file12 = photo_id.toString().charAt(12);
        var directory = file1 + '/' + file2 + '/' + file3 + '/' + file4 + '/' + file5 + '/' + file6 + '/'
            + file7 + '/' + file8 + '/' + file9 + '/' + file10 + '/' + file11 + '/' + file12 + '/';

        fs.mkdirp('uploads/'+directory, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log('başarılı')
            }
        });
        cb(null, photo_id + '.jpg');
        createPhoto(photo_id, owner_id, directory);
        changePhotoDirectory(photo_id,directory);
    }
});

function createPhoto(photo_id, owner_id,directory) {
    models.PHOTOS.create({
        photo_id: photo_id,
        owner_id: owner_id,
        location_path: 'uploads/' + directory + photo_id + '.jpg'
    });
}

function updateUserProfilePicture(user_id, profile_picture_id) {
    models.USERS.find({
        where: {
            user_id: user_id
        }
    }).then(function (USERS) {
        USERS.updateAttributes({
            profile_picture_id: profile_picture_id
        });
    });
}

function changePhotoDirectory(photo_id,directory) {
    fs.move('uploads/'+photo_id+'.jpg', 'uploads/'+directory+photo_id+'.jpg', function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('pow!')
        }
    });
}

var uploadPostPhoto = multer({storage: storagePostPicture}).single('photo');
var upload = multer({storage: storage}).single('photo');

router.post('/uploadProfilePicture/:owner_id', function (req, res) {
    owner_id = req.params.owner_id;
    upload(req, res, function (err) {
        if (err) {
        }
        res.json({
            success: true,
            message: 'Image uploaded!'
        });
    })
});

router.post('/uploadUserPostPhoto/:owner_id', function (req, res) {
    owner_id = req.params.owner_id;
    uploadPostPhoto(req, res, function (err) {
        if (err) {
        }
        res.json({
            photo_id: post_photo_id,
            success: true,
            message: 'Image uploaded!'
        });
    })
});

module.exports = router;