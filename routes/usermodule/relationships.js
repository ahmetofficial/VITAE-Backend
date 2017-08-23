// Developer: Ahmet Kaymak
// Date: 19.02.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();

//create connection
router.delete('/users/unfollow', function (req, res) {
    var active_user_id = req.body.active_user_id;
    var passive_user_id = req.body.passive_user_id;
    models.USER_CONNECTIONS.destroy({
        where: {
            active_user_id: active_user_id,
            passive_user_id: passive_user_id
        }
    }).then(function () {
        res.status(200).json({
            status: 'true'
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//delete connection
router.post('/users/follow', function (req, res) {
    var active_user_id = req.body.active_user_id;
    var passive_user_id = req.body.passive_user_id;
    models.USER_CONNECTIONS.create({
        active_user_id: active_user_id,
        passive_user_id: passive_user_id
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

function createConnection(user_id, res) {
    models.USER_CONNECTIONS.create({
        active_user_id: user_id,
        passive_user_id: user_id
    });
}

module.exports = router;