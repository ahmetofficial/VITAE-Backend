// Developer: Ahmet Kaymak
// Date: 13.10.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();
const uuidv1 = require('uuid/v1');

var FCM = require('fcm-node');
var serverKey = 'AAAATo6KBmk:APA91bH90b6T6ta3vTC58SpfJGlftEDofRcba1H0SFQT_Z85WBSM69AAllBTbiWqdlXc-X-8lFzcdzCmtCyDXJYcPwavrvVNu3bNxd7ub2r_CATjLWM68HMNxTYEiTFxipNAnx7ki6nT'; //put your server key here
var fcm = new FCM(serverKey);

var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: 'registration_token',
    collapse_key: 'your_collapse_key',

    notification: {
        title: 'Title of your push notification',
        body: 'Body of your push notification'
    },

    data: {  //you can send only notification or only data(or include both)
        my_key: 'my value',
        my_another_key: 'my another value'
    }
};

fcm.send(message, function (err, response) {
    if (err) {
        console.log("Something has gone wrong!");
    } else {
        console.log("Successfully sent with response: ", response);
    }
});

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

/*
function send() {
    var message = "Hey! you got this notification.";
    var title = "DigitSTORY Notification";
    var token = "<Your Device Token for Android>" *;
    var message = {
        to: token,
        notification: {
            title: "Kan Alarmı", //title of notification
            body: "A RH+ kana ihityaç var", //content of the notification
            sound: "default"
        },
        data: data //payload you want to send with your notification
    };
    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Notification not sent");
            res.json({success: false})
        } else {
            console.log("Successfully sent with response: ", response);
            res.json({success: true})
        }
    });

}
*/

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