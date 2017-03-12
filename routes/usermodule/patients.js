// Developer: Ahmet Kaymak
// Date: 12.03.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();

//get patient profile data data

router.get('/patients/getPatientProfile/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    models.USERS.findById(user_id, {
        attributes: ['user_id','user_name','about_me','friend_count','is_official_user','is_official_user','profile_picture_id'],
        model: models.USERS,
        include:[
            {
                attributes: ['birthday'],
                model: models.PATIENTS,
                where: {
                    user_id:user_id
                }
            }
        ]
    }).then(function (USERS) {
        res.send(USERS);
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

module.exports = router;