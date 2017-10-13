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
        res.send({status: true});
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//get blood alarms
router.get('/bloodAlarm/getAllBloodAlarms', function (req, res, next) {
    models.BLOOD_ALARM.findAll({
        where:{
            alarm_status:1
        },
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

//finish of blood alarm
router.post('/bloodAlarm/finishBloodAlarm', function (req, res, next) {
    var blood_alarm_id = req.body.blood_alarm_id;
    var alarm_result = req.body.alarm_result;
    var user_review = req.body.user_review;
    models.BLOOD_ALARM.update(
        {
            alarm_result: alarm_result,
            user_review:user_review,
            alarm_status:0
        },
        {
            fields: ['alarm_result','user_review','alarm_status'],
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