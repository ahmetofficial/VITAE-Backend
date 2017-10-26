// Developer: Ahmet Kaymak
// Date: 19.02.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

//delete connection
router.delete('/users/unfollow', function (req, res) {
    var active_user_id = req.body.active_user_id;
    var passive_user_id = req.body.passive_user_id;
    models.USER_CONNECTIONS.destroy({
        where: {
            active_user_id: active_user_id,
            passive_user_id: passive_user_id
        }
    });
    models.USERS.update(
        {friend_count: sequelize.literal('friend_count - 1')},
        {
            fields: ['friend_count'],
            where: {
                user_id: active_user_id
            }
        }).then(function () {
        res.status(200).json({
            status: 'true'
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//create connection
router.post('/users/follow', function (req, res) {
    var active_user_id = req.body.active_user_id;
    var passive_user_id = req.body.passive_user_id;
    models.USER_CONNECTIONS.create({
        active_user_id: active_user_id,
        passive_user_id: passive_user_id
    });
    models.USERS.update(
        {friend_count: sequelize.literal('friend_count + 1')},
        {
            fields: ['friend_count'],
            where: {
                user_id: active_user_id
            }
        }).then(function () {
        res.status(200).json({
            status: 'true'
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//controlling are users connected
router.post('/users/areUsersConnected', function (req, res, next) {
    var active_user_id = req.body.active_user_id;
    var passive_user_id = req.body.passive_user_id;
    models.USER_CONNECTIONS.findAll({
        where: {
            active_user_id: active_user_id,
            passive_user_id: passive_user_id
        }
    }).then(function (RELATIONSHIPS) {
        res.send({relationship: RELATIONSHIPS});
    });
});


module.exports = router;