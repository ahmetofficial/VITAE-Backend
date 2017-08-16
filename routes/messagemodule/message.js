// Developer: Ahmet Kaymak
// Date: 14.08.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var uuidv1 = require('uuid/v1');

//create message
router.post('/message/createMessage', function (req, res, next) {
    var conversation_id = req.body.conversation_id;
    var sender_id = req.body.sender_id;
    var receiver_id = req.body.receiver_id;
    var message_text = req.body.message_text;
    var sender_ip = req.body.sender_ip;
    models.USER_POST.create({
        conversation_id:conversation_id,
        sender_id:sender_id,
        receiver_id:receiver_id,
        message_id: uuidv1(),
        sender_ip:sender_ip,
        message_text: message_text,
        status:0,
        message_active_for_sender:1,
        message_active_for_receiver:1
    }).then(function () {
        res.status(200).json({
            status: 'true'
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
});


module.exports = router;