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
                user_id: user_id,
                user_type_id: USERS[0].user_type_id
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

//get users friends
router.get('/users/getFriends/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    models.USERS.findAll({
        attributes: ['user_id', 'user_name', 'profile_picture_id','user_type_id'],
        include: [
            {
                attributes: [],
                model: models.USER_CONNECTIONS,
                where: {
                    active_user_id: user_id,
                    passive_user_id: {$ne: user_id}
                }
            }
        ],
        order: [['user_name', 'ASC']]
    }).then(function (USERS) {
        res.send({users: USERS});
    });
});

//get user patient friends for conversation
router.get('/users/getFriendsWithConversationStatus/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    models.USERS.findAll({
        attributes: ['user_id', 'user_name', 'profile_picture_id'],
        include: [
            {
                attributes: [],
                model: models.USER_CONNECTIONS,
                where: {
                    active_user_id: user_id,
                    passive_user_id: {$ne: user_id}
                }
            },
            {
                attributes:['conversation_id'],
                model: models.MESSAGE_CONVERSATION,
                as: 'RECEIVER'
            }, {
                attributes:['conversation_id'],
                model: models.MESSAGE_CONVERSATION,
                as: 'SENDER'
            }
        ],
        order: [['user_name', 'ASC']]
    }).then(function (USERS) {
        res.send({users_for_conversation: USERS});
    });
});

//changing user password
router.put('/users/resetPassword/:user_id', function (req, res) {
    var password = req.body.password;
    var user_id = req.params.user_id;
    models.USERS.find({
        where: {
            user_id: user_id
        }
    }).then(function (USERS) {
        if (USERS) {
            USERS.updateAttributes({
                password: password
            }).then(function (USERS) {
                res.status(200).json({
                    status: 'true',
                    message: 'Password has changed successfully'
                });
            }).catch(function (error) {
                res.status(500).json(error)
            });
        } else {
            res.status(200).json({
                status: 'false',
                message: 'Password has not changed, try again!'
            });
        }
    });
});

//check user_id avaibility
router.get('/users/isUserIdAvaible/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    models.USERS.find({
        where: {
            user_id: user_id
        }
    }).then(function (USERS) {
        if (USERS == null) {
            res.status(200).json({
                status: 'true'
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

//changing mail
router.put('/users/resetMail/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    var mail = req.body.mail;
    models.USERS.find({
        where: {
            user_id: user_id
        }
    }).then(function (USERS) {
        if (USERS) {
            USERS.updateAttributes({
                mail: mail
            }).then(function (USERS) {
                res.status(200).json({
                    status: 'true',
                    message: 'Mail has changed successfully'
                });
            }).catch(function (error) {
                res.status(500).json(error)
            });
        } else {
            res.status(200).json({
                status: 'false',
                message: 'Mail name hasn\'t changed successfully'
            });
        }
    });
});

//changing user_name
router.put('/users/resetUserName/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    var user_name = req.body.user_name;
    models.USERS.find({
        where: {
            user_id: user_id
        }
    }).then(function (USERS) {
        if (USERS) {
            USERS.updateAttributes({
                user_name: user_name
            }).then(function (USERS) {
                res.status(200).json({
                    status: 'true',
                    message: 'User name has changed successfully'
                });
            }).catch(function (error) {
                res.status(500).json(error)
            });
        } else {
            res.status(200).json({
                status: 'false',
                message: 'User name hasn\'t changed successfully'
            });
        }
    });
});

//changing about_me
router.put('/users/resetAboutMe/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    var about_me = req.body.about_me;
    models.USERS.find({
        where: {
            user_id: user_id
        }
    }).then(function (USERS) {
        if (USERS) {
            USERS.updateAttributes({
                about_me: about_me
            }).then(function (USERS) {
                res.status(200).json({
                    status: 'true',
                    message: 'About me has changed successfully'
                });
            }).catch(function (error) {
                res.status(500).json(error)
            });
        } else {
            res.status(200).json({
                status: 'false',
                message: 'About me hasn\'t changed successfully'
            });
        }
    });
});

//get user information by user_id
router.get('/users/getUserInformation/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    models.USERS.findById(user_id, {
        model: models.USERS,
        where: {
            user_id: user_id
        }
    }).then(function (USERS) {
        res.send(USERS);
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//save user location
router.post('/users/saveLocation', function (req, res) {
    var user_id = req.body.user_id;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    models.USER_LOCATION.findOne({
        where: {
            user_id: user_id
        }
    }).then(function (foundItem) {
        if (!foundItem) {
            models.USER_LOCATION.create({
                user_id: user_id,
                latitude: latitude,
                longitude: longitude
            }).then(function () {
                res.status(200).json({
                    status: 'true'
                });
            }).catch(function (error) {
                res.status(500).json({
                    status: 'false'
                })
            })
        } else {
            models.USER_LOCATION.update(
                {
                    latitude: latitude,
                    longitude: longitude
                },
                {
                    fields: ['latitude','longitude'],
                    where: {
                        user_id: user_id
                    }
                }).then(function () {
                res.status(200).json({
                    status: 'true'
                });
            }).catch(function (error) {
                res.status(500).json({
                    status: 'false'
                })
            });
        }
    })
});

//check user device
router.post('/users/checkUserDevice', function (req, res) {
    var user_id = req.body.user_id;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    models.USER_LOCATION.findOne({
        where: {
            user_id: user_id
        }
    }).then(function (foundItem) {
        if (!foundItem) {
            models.USER_LOCATION.create({
                user_id: user_id,
                latitude: latitude,
                longitude: longitude
            }).then(function () {
                res.status(200).json({
                    status: 'true'
                });
            }).catch(function (error) {
                res.status(500).json({
                    status: 'false'
                })
            })
        } else {
            models.USER_LOCATION.update(
                {
                    latitude: latitude,
                    longitude: longitude
                },
                {
                    fields: ['latitude','longitude'],
                    where: {
                        user_id: user_id
                    }
                }).then(function () {
                res.status(200).json({
                    status: 'true'
                });
            }).catch(function (error) {
                res.status(500).json({
                    status: 'false'
                })
            });
        }
    })
});

module.exports = router;