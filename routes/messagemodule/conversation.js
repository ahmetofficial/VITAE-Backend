// Developer: Ahmet Kaymak
// Date: 15.08.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var uuidv1 = require('uuid/v1');

//create conversation
router.post('/conversation/createConversation', function (req, res, next) {
    var sender_id = req.body.sender_id;
    var receiver_id = req.body.receiver_id;
    var sender_ip = req.body.sender_ip;
    models.MESSAGE_CONVERSATION.create({
        conversation_id: uuidv1(),
        sender_id: sender_id,
        receiver_id: receiver_id,
        sender_ip: sender_ip,
        conversation_active_for_sender: 1,
        conversation_active_for_receiver: 1
    }).then(function () {
        res.status(200).json({
            status: 'true'
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//get conversations
router.get('/conversation/getConversations/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    models.MESSAGE_CONVERSATION.findAll({
        where: {
            $or: [
                {
                    sender_id: user_id,
                    conversation_active_for_sender: 1
                }
                ,
                {
                    receiver_id: user_id,
                    conversation_active_for_receiver: 1
                }
            ]
        }, include: [
            {
                attributes: ['user_id', 'user_name', 'profile_picture_id'],
                model: models.USERS,
                as: 'RECEIVER'
            },
            {
                attributes: ['user_id', 'user_name', 'profile_picture_id'],
                model: models.USERS,
                as: 'SENDER'
            }
        ],
        order: [['updated_at', 'DESC']]
    }).then(function (MESSAGE_CONVERSATION) {
        res.send({conversation: MESSAGE_CONVERSATION});
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//dismiss conversation for an user
router.get('/conversation/dismissConversation/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    models.MESSAGE_CONVERSATION.find({
        attributes: ['conversation_id', 'sender_id', 'receiver_id'],
        where: {
            $or: [
                {
                    sender_id: user_id
                }
                ,
                {
                    receiver_id: user_id
                }
            ]
        }
    }).then(function (MESSAGE_CONVERSATION) {
        if (MESSAGE_CONVERSATION.sender_id == user_id) {
            MESSAGE_CONVERSATION.update(
                {conversation_active_for_sender: 0},
                {
                    fields: ['conversation_active_for_sender'],
                    where: {
                        sender_id: user_id
                    }
                }).then(function () {
                res.status(200).json({
                    status: 'true'
                })
            }).catch(function (error) {
                res.status(500).json(error)
            });
        } else if (MESSAGE_CONVERSATION.receiver_id == user_id) {
            MESSAGE_CONVERSATION.update(
                {conversation_active_for_receiver: 0},
                {
                    fields: ['conversation_active_for_receiver'],
                    where: {
                        sender_id: user_id
                    }
                }).then(function () {
                res.status(200).json({
                    status: 'true'
                })
            }).catch(function (error) {
                res.status(500).json(error)
            });
        }
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

module.exports = router;