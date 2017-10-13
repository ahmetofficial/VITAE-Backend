var models = require('../models');
var express = require('express');
var router = express.Router();

router.post('/updateUserDeviceToken', function(req, res, next) {
    var user_id = req.body.user_id;
    var device_token = req.body.device_token;
    models.USERS.update(
        {
            device_token: device_token
        },
        {
            fields: ['device_token'],
            where: {
                user_id: user_id
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
