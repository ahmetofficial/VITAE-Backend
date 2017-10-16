// Developer: Ahmet Kaymak
// Date: 13.10.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();
const uuidv1 = require('uuid/v1');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

////var FCM = require('fcm-node');
//var fcm = new FCM(serverKey);

var FCM = require('fcm-push');
var serverKey = 'AAAATo6KBmk:APA91bH90b6T6ta3vTC58SpfJGlftEDofRcba1H0SFQT_Z85WBSM69AAllBTbiWqdlXc-X-8lFzcdzCmtCyDXJYcPwavrvVNu3bNxd7ub2r_CATjLWM68HMNxTYEiTFxipNAnx7ki6nT';
var fcm = new FCM(serverKey);

var bloodTypes = ['undefined', '0 Rh+', 'O Rh-', 'A Rh+', 'A Rh-', 'B Rh+', 'B Rh-', 'AB Rh+', 'AB Rh-'];

//create blood alarm
router.post('/bloodAlarm/create', function (req, res, next) {
    var user_id = req.body.user_id;
    var blood_type_id = req.body.blood_type_id;
    var hospital_id = req.body.hospital_id;
    var alarm_level = req.body.alarm_level;
    var contact_number = req.body.contact_number;
    models.BLOOD_ALARM.create({
        blood_alarm_id: uuidv1(),
        user_id: user_id,
        blood_type_id: blood_type_id,
        hospital_id: hospital_id,
        alarm_status: 1,
        alarm_level: alarm_level,
        contact_number: contact_number
    }).then(function () {
        models.HOSPITALS.findAll({
            where: {
                hospital_id: hospital_id
            }
        }).then(function (HOSPITALS) {
            var hospital_name = HOSPITALS[0].hospital_name;
            var hospital_latitude = HOSPITALS[0].latitude;
            var hospital_longitude = HOSPITALS[0].longitude;
            //sendPushNotification(hospital_name,hospital_latitude,hospital_longitude,blood_type_id,res);
            sequelize.query(
                ' SELECT USER_LOCATION.user_id,USERS.device_token,( 6371 * acos( cos( radians(' + hospital_latitude + ') ) ' +
                ' * cos( radians( USER_LOCATION.latitude ) ) ' +
                ' * cos( radians( USER_LOCATION.longitude ) - radians(' + hospital_longitude + ') ) ' +
                ' + sin( radians(' + hospital_latitude + ') ) ' +
                ' * sin( radians( USER_LOCATION.latitude ) ) ) ) AS distance ' +
                ' FROM USER_LOCATION ' +
                ' JOIN USERS ' +
                ' ON USERS.user_id=USER_LOCATION.user_id ' +
                ' JOIN PATIENTS ' +
                ' ON USERS.user_id=PATIENTS.user_id ' +
                ' WHERE PATIENTS.blood_type_id=' + blood_type_id + ' ' +
                ' HAVING distance < 10 ',
                {type: sequelize.QueryTypes.SELECT}
            ).then(function (USERS) {
                for (var i in USERS) {
                    var token = USERS[i].device_token;
                    var message = {
                        to: token,
                        //collapse_key: 'your_collapse_key',
                        data: {
                            your_custom_data_key: 'your_custom_data_value'
                        },
                        notification: {
                            title: bloodTypes[blood_type_id],
                            body: hospital_name
                        }
                    };
                    fcm.send(message, function(err, response){
                        if (err) {
                            console.log("Something has gone wrong!");
                        } else {
                            console.log("Successfully sent with response: ", response);
                        }
                    });
                }
            }).catch(function (error) {

            });
        }).catch(function (error) {
            res.status(500).json(error)
        });
        res.send({status: true});
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//get blood alarms
router.get('/bloodAlarm/getAllBloodAlarms', function (req, res, next) {
    models.BLOOD_ALARM.findAll({
        where: {
            alarm_status: 1
        },
        include: [
            {
                model: models.BLOOD_TYPES
            }, {
                attributes: ['hospital_id', 'hospital_name', 'latitude', 'longitude'],
                model: models.HOSPITALS
            }
        ]

    }).then(function (BLOOD_ALARM) {
        res.send({
            blood_alarms: BLOOD_ALARM
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//get blood alarms
router.get('/bloodAlarm/getBloodAlarmsByBloodType/:blood_type_id', function (req, res, next) {
    var blood_type_id=req.params.blood_type_id;
    models.BLOOD_ALARM.findAll({
        where: {
            alarm_status: 1,
            blood_type_id:blood_type_id
        },
        include: [
            {
                model: models.BLOOD_TYPES
            }, {
                attributes: ['hospital_id', 'hospital_name', 'latitude', 'longitude'],
                model: models.HOSPITALS
            }
        ]

    }).then(function (BLOOD_ALARM) {
        res.send({
            blood_alarms: BLOOD_ALARM
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//update level of blood alarm
router.post('/bloodAlarm/updateBloodAlarmLevel', function (req, res, next) {
    var blood_alarm_id = req.body.blood_alarm_id;
    var alarm_level = req.body.alarm_level;
    models.BLOOD_ALARM.update(
        {
            alarm_level: alarm_level
        },
        {
            fields: ['alarm_level'],
            where: {
                blood_alarm_id: blood_alarm_id
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
});

//finish of blood alarm
router.post('/bloodAlarm/finishBloodAlarm', function (req, res, next) {
    var blood_alarm_id = req.body.blood_alarm_id;
    var alarm_result = req.body.alarm_result;
    var user_review = req.body.user_review;
    models.BLOOD_ALARM.update(
        {
            alarm_result: alarm_result,
            user_review: user_review,
            alarm_status: 0
        },
        {
            fields: ['alarm_result', 'user_review', 'alarm_status'],
            where: {
                blood_alarm_id: blood_alarm_id
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
});


module.exports = router;