// Developer: Ahmet Kaymak
// Date: 01.02.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();

//getAllTheUserData
router.get('/users/getAll', function (req, res, next) {
    models.USERS.findAll()
        .then(function (USERS) {
            res.send({data: USERS});
        })
});

//login authentication
router.post('/users/login', function (req, res) {
    var user_id = req.body.user_id;
    var password = req.body.password;
    models.USERS.findAll({
        where: {
            user_id: user_id,
            password: password
        }
    }).then(function (USERS) {
        if (isNaN(USERS)) {
            res.send({
                status: 'true',
                user_id: user_id
            });
        } else {
            res.status(200).json({
                status: 'false'
            });
        }
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//registering new user
router.post('/users/register', function (req, res) {
    var user_id = req.body.user_id;
    var user_name = req.body.user_name;
    var user_type_id = req.body.user_type_id;
    var mail = req.body.mail;
    var password = req.body.password;
    models.USERS.create({
        user_id: user_id,
        user_name: user_name,
        user_type_id: user_type_id,
        mail: mail,
        password: password,
        mail_activation: false,
        phone_number: req.body.phone_number,
        about_me: req.body.about_me,
        friend_count: 0,
        is_official_user: false,
        profile_picture_id: req.body.profile_picture_id
    }).then(function (USERS) {
        res.status(200).json({
            status: 'true'
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//registering new patient
router.post('/users/registerPatient', function (req, res) {
    var user_id = req.body.user_id;
    var user_name = req.body.user_name;
    var user_type_id = 1;
    var mail = req.body.mail;
    var password = req.body.password;
    var phone_number = req.body.phone_number;
    var about_me = req.body.about_me;
    var profile_picture_id = req.body.profile_picture_id;
    var gender = req.body.gender;
    var blood_type_id = req.body.blood_type_id;
    var birthday = req.body.birthday;
    {
        models.USERS.create({
            user_id: user_id,
            user_name: user_name,
            user_type_id: user_type_id,
            mail: mail,
            password: password,
            mail_activation: false,
            phone_number: phone_number,
            about_me: about_me,
            friend_count: 0,
            is_official_user: false,
            profile_picture_id: profile_picture_id
        });
        models.PATIENTS.create({
            user_id:user_id,
            gender: gender,
            blood_type_id:blood_type_id,
            birthday:birthday
        }).then(function () {
            res.status(200).json({
                status: 'true',
                message: 'creating a patient is succesful'
            });
        }).catch(function (error) {
            res.status(500).json(error)
        });

    }
});

//changing user password
router.put('/users/resetPassword/:user_id', function (req, res) {
    var old_password = req.body.old_password;
    var new_password = req.body.new_password;
    models.USERS.find({
        where: {
            user_id: req.params.user_id,
            password: old_password
        }
    }).then(function (USERS) {
        if (USERS && old_password != new_password) {
            USERS.updateAttributes({
                password: new_password
            }).then(function (USERS) {
                res.status(200).json({
                    status: 'true',
                    message: 'Password has changed successfully'
                });
            }).catch(function (error) {
                res.status(500).json(error)
            });
        }
        else if (USERS && old_password == new_password) {
            res.status(200).json({
                status: 'false',
                message: 'Please enter different password from current password'
            });
        }
        else {
            res.status(200).json({
                status: 'false',
                message: 'Password has not changed, try again!'
            });
        }
    });
});

//changing user_id
router.put('/users/resetUserId/:user_id', function (req, res) {
    var old_user_id = req.params.user_id;
    var new_user_id = req.body.new_user_id;
    models.USERS.find({
        where: {
            user_id: new_user_id
        }
    }).then(function (USERS) {
        if (isNaN(USERS) && old_user_id != new_user_id) {
            USERS.updateAttributes({
                user_id: new_user_id
            }).then(function (USERS) {
                res.status(200).json({
                    status: 'true',
                    message: 'User id has changed successfully'
                });
            }).catch(function (error) {
                res.status(500).json(error)
            });
        }
        else if (isNaN(USERS) && old_user_id == new_user_id) {
            res.status(200).json({
                status: 'false',
                message: 'Please enter different user_id from current user_id'
            });
        }
        else {
            res.status(200).json({
                status: 'false',
                message: 'It has already taken'
            });
        }
    });
});

module.exports = router;