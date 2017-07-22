// Developer: Ahmet Kaymak
// Date: 19.02.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();

//unfollowing the user
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

//following the user
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

module.exports = router;