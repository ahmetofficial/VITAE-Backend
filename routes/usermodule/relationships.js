// Developer: Ahmet Kaymak
// Date: 19.02.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();

//sending friendship/follow request to an user
router.post('/sendFriendshipRequest', function (req, res) {
    var active_user_id = req.body.active_user_id;
    var passive_user_id = req.body.passive_user_id;
    models.RELATIONSHIPS.create({
        active_user_id: active_user_id,
        passive_user_id: passive_user_id,
        status_id: 1
    }).then(function (RELATIONSHIPS) {
        res.status(200).json({
            status: 'true'
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//accepting friendship/follow request of an user
router.post('/acceptFriendshipRequest', function (req, res) {
    var active_user_id = req.body.active_user_id;
    var passive_user_id = req.body.passive_user_id;
    models.RELATIONSHIPS.create({
        active_user_id: active_user_id,
        passive_user_id: passive_user_id,
        status_id: 2
    }).then(function (RELATIONSHIPS) {
        res.status(200).json({
            status: 'true'
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//decline friendship/follow request of an user
router.post('/declineFriendshipRequest', function (req, res) {
    var active_user_id = req.body.active_user_id;
    var passive_user_id = req.body.passive_user_id;
    models.RELATIONSHIPS.create({
        active_user_id: active_user_id,
        passive_user_id: passive_user_id,
        status_id: 3
    }).then(function (RELATIONSHIPS) {
        res.status(200).json({
            status: 'true'
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//cancelling friendship/follow request of an user
router.delete('/cancelFriendshipRequest/:user_id', function(req, res) {
    var active_user_id=req.params.user_id;
    var passive_user_id=req.body.passive_user_id;
    models.RELATIONSHIPS.destroy({
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

//blocking an user
router.post('/blockUser', function (req, res) {
    var active_user_id = req.body.active_user_id;
    var passive_user_id = req.body.passive_user_id;
    models.RELATIONSHIPS.create({
        active_user_id: active_user_id,
        passive_user_id: passive_user_id,
        status_id: 4
    }).then(function (RELATIONSHIPS) {
        res.status(200).json({
            status: 'true'
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//seeing all friendship request
router.get('/getAllFrienshipRequests/:user_id', function (req, res, next) {
    var passive_user_id = req.params.user_id;
    models.RELATIONSHIPS.findAll({
        where: {
            passive_user_id: passive_user_id
        },
        order: [['created_at', 'DESC']]
    }).then(function (RELATIONSHIPS) {
        res.send({data: RELATIONSHIPS});
    })
});

module.exports = router;