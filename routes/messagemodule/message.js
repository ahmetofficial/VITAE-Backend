// Developer: Ahmet Kaymak
// Date: 14.08.2017

'use strict';

var models = require('../../models');
var express = require('express'),
    fs = require('fs'),
    path=require('path');
var router = express.Router();
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var uuidv1 = require('uuid/v1');

//get user messages
router.post('/message/getMessages', function (req, res, next) {
    var conversation_id = req.body.conversation_id;
    var sender_id = req.body.sender_id;
    var receiver_id = req.body.receiver_id;
    models.MESSAGES.findAll({
        attributes:['conversation_id','sender_id','receiver_id','message_id','message_text',
            'status','message_active_for_sender','message_active_for_receiver','created_at'],
        where:{
            conversation_id:conversation_id
        },
        order:[['created_at', 'ASC']]
    }).then(function (MESSAGES) {
        res.send({messages: MESSAGES});
    }).catch(function (error) {
        res.status(500).json(error)
    });
});


router.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


module.exports = router;