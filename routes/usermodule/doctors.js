// Developer: Ahmet Kaymak
// Date: 26.10.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

//get doctor profile data data
router.get('/doctors/getDoctorProfile/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    models.USERS.findById(user_id, {
        attributes: ['user_id', 'user_name', 'about_me', 'friend_count', 'is_official_user', 'is_official_user', 'profile_picture_id'],
        model: models.USERS,
        include: [
            {
                attributes: ['birthday','is_verified'],
                model: models.DOCTORS,
                where: {
                    user_id: user_id
                }
            },{
                attributes: ['user_id','hospital_id','clinic_id'],
                model: models.DOCTOR_HAVE_HOSPITAL,
                where: {
                    user_id: user_id
                },
                include:[
                    {
                        attributes: ['hospital_name'],
                        model: models.HOSPITALS
                    },{
                        attributes: ['clinic_name'],
                        model: models.CLINICS
                    }
                ]
            }
        ]
    }).then(function (USERS) {
        res.send(USERS);
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//registering new doctor
router.post('/doctors/registerDoctor', function (req, res) {
    var user_id = req.body.user_id;
    var user_name = req.body.user_name;
    var user_type_id = 2;
    var mail = req.body.mail;
    var password = req.body.password;
    var phone_number = req.body.phone_number;
    var about_me = req.body.about_me;
    var profile_picture_id = req.body.profile_picture_id;
    var gender = req.body.gender;
    var blood_type_id = req.body.blood_type_id;
    var birthday = req.body.birthday;
    var hospital_id = req.body.hospital_id;
    var clinic_id = req.body.clinic_id;
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
        models.DOCTORS.create({
            user_id: user_id,
            gender: gender,
            blood_type_id: blood_type_id,
            birthday: birthday,
            is_verified:0
        });
        models.DOCTOR_HAVE_HOSPITAL.create({
            user_id: user_id,
            hospital_id: hospital_id,
            clinic_id: clinic_id
        });
        models.USER_CONNECTIONS.create({
            active_user_id: user_id,
            passive_user_id: user_id
        }).then(function () {
            res.status(200).json({
                status: 'true',
                message: 'creating a doctor is succesful'
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

//search doctor with full text search
router.post('/doctors/searchDoctorsFullTextSearch', function (req, res, next) {
    var search_text = req.body.search_text;
    sequelize.query('SELECT user_id,user_name, user_type_id, is_official_user,profile_picture_id FROM USERS WHERE user_type_id=2 and MATCH(user_name) AGAINST("' + search_text + '"IN NATURAL LANGUAGE MODE);'
    ).then(function (USERS) {
        res.send({users: USERS[0]});
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

module.exports = router;
