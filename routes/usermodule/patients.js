// Developer: Ahmet Kaymak
// Date: 12.03.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

//registering new patient
router.post('/patients/registerPatient', function (req, res) {
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
            birthday: birthday,
            is_blood_alarm_notification_open: 1
        });
        models.USER_CONNECTIONS.create({
            active_user_id: user_id,
            passive_user_id: user_id
        }).then(function () {
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

//get patient profile data data
router.get('/patients/getPatientProfile/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    models.USERS.findById(user_id, {
        attributes: ['user_id', 'user_name', 'about_me', 'friend_count', 'is_official_user', 'is_official_user', 'profile_picture_id'],
        model: models.USERS,
        include: [
            {
                attributes: ['birthday'],
                model: models.PATIENTS,
                where: {
                    user_id: user_id
                }
            }
        ]
    }).then(function (USERS) {
        res.send(USERS);
    }).catch(function (error) {
        res.status(500).json(error)
    });
});


//enable blood alarms
router.get('/patients/enableBloodAlarms/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    models.PATIENTS.update(
        {is_blood_alarm_notification_open: 1},
        {
            fields: ['is_blood_alarm_notification_open'],
            where: {
                user_id: user_id
            }
        }).then(function (USERS) {
        res.send(USERS);
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//disable blood alarms
router.get('/patients/disableBloodAlarms/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    models.PATIENTS.update(
        {is_blood_alarm_notification_open: 0},
        {
            fields: ['is_blood_alarm_notification_open'],
            where: {
                user_id: user_id
            }
        }).then(function (USERS) {
        res.send(USERS);
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//Search similar patient
router.post('/patients/searchSimilarPatient', function (req, res) {
    var search_text = req.body.search_text;
    var user_id = req.body.user_id;
    sequelize.query(
        ' SELECT USERS.user_id,USERS.user_name,USERS.user_type_id,USERS.mail,USERS.profile_picture_id,similarity_count FROM' +
        ' (SELECT user_id, SUM(similarity_count) AS similarity_count FROM' +
        ' ((SELECT user_id, COUNT(disease_id) AS similarity_count FROM USER_DISEASE_HISTORY' +
        ' WHERE disease_id IN (SELECT disease_id FROM USER_DISEASE_HISTORY' +
        ' WHERE user_id = \'' + user_id + '\'' +
        ' GROUP BY disease_id)' +
        ' AND user_id != \'' + user_id + '\'' +
        ' GROUP BY user_id' +
        ' ORDER BY disease_id_count)' +

        ' UNION' +
        ' (SELECT user_id, COUNT(treatment_id) AS similarity_count FROM USER_TREATMENT_HISTORY' +
        ' WHERE treatment_id IN' +
        ' (SELECT treatment_id FROM USER_TREATMENT_HISTORY' +
        ' WHERE disease_id IN' +
        ' (SELECT disease_id FROM USER_DISEASE_HISTORY' +
        ' WHERE user_id = \'' + user_id + '\'' +
        ' GROUP BY disease_id)' +
        ' GROUP BY treatment_id)' +
        ' AND user_id != \'' + user_id + '\'' +
        ' GROUP BY user_id)' +

        ' UNION' +
        ' (SELECT user_id, COUNT(drug_id) AS similarity_count FROM USER_DRUG_USAGE_HISTORY' +
        ' WHERE drug_id IN' +
        ' (SELECT drug_id FROM USER_DRUG_USAGE_HISTORY' +
        ' WHERE treatment_id IN' +
        ' (SELECT treatment_id FROM USER_TREATMENT_HISTORY' +
        ' WHERE disease_id IN' +
        ' (SELECT disease_id FROM USER_DISEASE_HISTORY' +
        ' WHERE user_id = \'' + user_id + '\'' +
        ' GROUP BY disease_id)' +
        ' GROUP BY treatment_id)' +
        ' AND user_id != \'' + user_id + '\'' +
        ' GROUP BY user_id))) SIMILARITIES' +
        ' WHERE user_id IN' +
        ' (SELECT user_id FROM USERS' +
        ' WHERE MATCH (user_name) AGAINST (\'' + search_text + '\' IN NATURAL LANGUAGE MODE))' +
        ' GROUP BY user_id' +
        ' ORDER BY similarity_count DESC)SIMILARITYTABLE' +
        ' INNER JOIN USERS ON USERS.user_id=SIMILARITYTABLE.user_id',
        {type: sequelize.QueryTypes.SELECT}
    ).then(function (USERS) {
        res.send({similar_users: USERS});
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//search patient with full text search
router.post('/patients/searchPatientsFullTextSearch', function (req, res, next) {
    var search_text = req.body.search_text;
    sequelize.query('SELECT user_id,user_name, user_type_id, is_official_user,profile_picture_id FROM USERS WHERE user_type_id=1 and MATCH(user_name) AGAINST("' + search_text + '"IN NATURAL LANGUAGE MODE);'
    ).then(function (USERS) {
        res.send({users: USERS[0]});
    }).catch(function (error) {
        res.status(500).json(error)
    });
});


module.exports = router;