// Developer: Ahmet Kaymak
// Date: 01.02.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

//getAllTheUserData
router.get('/users/getAll', function (req, res, next) {
    models.USERS.findAll()
        .then(function (USERS) {
            res.send({data: USERS});
        })
});

//get users friends
router.get('/users/getFriends/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    models.USERS.findAll({
        attributes: ['user_id', 'user_name'],
        include: [
            {
                attributes: [],
                model: models.RELATIONSHIPS,
                where: {
                    active_user_id: user_id,
                    passive_user_id: {$ne: user_id},
                    status_id: 1
                }
            }
        ],
        order: [['user_name', 'ASC']]
    }).then(function (USERS) {
        res.send({users: USERS});
    });
});

//controlling are users connected
router.post('/users/areUsersConnected', function (req, res, next) {
    var active_user_id = req.body.active_user_id;
    var passive_user_id = req.body.passive_user_id;
    models.RELATIONSHIPS.findAll({
        where: {
            $or: [
                {
                    active_user_id: active_user_id,
                    passive_user_id: passive_user_id,
                    status_id: 1
                }, {
                    active_user_id: passive_user_id,
                    passive_user_id: active_user_id,
                    status_id: 1
                }
            ]
        }
    }).then(function (RELATIONSHIPS) {
        res.send({relationship: RELATIONSHIPS});
    });
});

//user follower number
router.get('/users/followerCount/:passive_user_id', function (req, res, next) {
    var passive_user_id = req.params.passive_user_id;
    models.RELATIONSHIPS.count({
        where: {
            passive_user_id: passive_user_id,
            status_id: 1
        }
    }).then(function (result) {
        res.send({
                follower_number: result - 1
            }
        )
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//user follow number
router.get('/users/followCount/:active_user_id', function (req, res, next) {
    var active_user_id = req.params.active_user_id;
    models.RELATIONSHIPS.count({
        where: {
            active_user_id: active_user_id,
            status_id: 1
        }
    }).then(function (result) {
        res.send({
                follow_number: result - 1
            }
        )
    }).catch(function (error) {
        res.status(500).json(error)
    });
});


//update user about me
router.post('/users/updateUserAboutMe', function (req, res, next) {
    var user_id = req.body.user_id;
    var about_me = req.body.about_me;
    models.USERS.update(
        {about_me: about_me},
        {
            fields: ['about_me'],
            where: {
                user_id: user_id
            }
        }).then(function () {
        res.status(200).json({
            status: 'true'
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
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
            user_id: user_id,
            gender: gender,
            blood_type_id: blood_type_id,
            birthday: birthday
        });
        models.RELATIONSHIPS.create({
            active_user_id: user_id,
            passive_user_id: user_id,
            status_id: 1
        })
            .then(function () {
                res.status(200).json({
                    status: 'true',
                    message: 'creating a patient is succesful'
                });
            }).catch(function (error) {
            //noinspection JSAnnotator
            res.status(500).json({
                status: 'false',
                error
            })
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

router.post('/users/searchByUserInfo', function (req, res, next) {
    var search_text = req.body.search_text;
    sequelize.query('SELECT user_id,user_name, user_type_id, is_official_user,profile_picture_id FROM USERS WHERE MATCH(user_name) AGAINST("' + search_text + '"IN NATURAL LANGUAGE MODE);'
    ).then(function (USERS) {
        res.send({users: USERS[0]});
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

module.exports = router;