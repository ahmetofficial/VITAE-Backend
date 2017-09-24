// Developer: Ahmet Kaymak
// Date: 24.09.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

//create user hospital rate
router.post('/hospitals/createUserHospitalRates', function (req, res, next) {
    var user_id = req.body.user_id;
    var hospital_id= req.body.hospital_id;
    var disease_id = req.body.disease_id;
    var user_comment = req.body.user_comment;
    var user_rate = req.body.user_rate;
    models.USER_HOSPITAL_RATES.create({
        user_id: user_id,
        hospital_id: hospital_id,
        disease_id: disease_id,
        user_comment: user_comment,
        user_rate: user_rate
    }).then(function () {
        res.status(200).json({
            status: 'true'
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//hospital rates by hospital_id
router.get('/hospitals/getUserHospitalRates/:hospital_id', function (req, res, next) {
    var hospital_id = req.params.hospital_id;
    models.USER_HOSPITAL_RATES.findById(hospital_id)
        .then(function (HOSPITALS) {
            res.send({hospital: HOSPITALS});
        }).catch(function (error) {
        res.status(500).json(error)
    });
});

module.exports = router;
