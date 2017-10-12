// Developer: Ahmet Kaymak
// Date: 13.10.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();
const uuidv1 = require('uuid/v1');

//create blood alarm
router.post('/bloodAlarm/create', function (req, res, next) {
    var user_id = req.body.user_id;
    var blood_type_id = req.body.blood_type_id;
    var hospital_id = req.body.hospital_id;
    var alarm_level = req.body.alarm_level;
    models.BLOOD_ALARM.create({
        blood_alarm_id: uuidv1(),
        user_id: user_id,
        blood_type_id: blood_type_id,
        hospital_id: hospital_id,
        alarm_status: 1,
        alarm_level: alarm_level
    }).then(function () {
        res.send({status: true});
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//get blood alarms
router.get('/bloodAlarm/getAllBloodAlarms', function (req, res, next) {
    models.BLOOD_ALARM.findAll({
        include:[
            {
                model: models.BLOOD_TYPES
            },{
                attributes:['hospital_id','hospital_name','latitude','longitude'],
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


module.exports = router;