// Developer: Ahmet Kaymak
// Date: 14.04.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

//full text search by hospital id
router.post('/hospitals/searchByHospitalName', function (req, res, next) {
    var hospital_name = req.body.hospital_name;
    sequelize.query('SELECT hospital_id, hospital_name, hospital_type, total_score, total_vote_number FROM HOSPITALS WHERE MATCH(hospital_name) AGAINST("' + hospital_name + '"IN NATURAL LANGUAGE MODE);'
    ).then(function (HOSPITALS) {
        res.send({hospitals: HOSPITALS[0]});
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//get hospital infos by hospital id
router.get('/hospitals/getHospitalById/:hospital_id', function (req, res, next) {
    var hospital_id = req.params.hospital_id;
    models.HOSPITALS.findById(hospital_id)
        .then(function (HOSPITALS) {
            res.send({hospital: HOSPITALS});
        })
});

//get hospital general rank
router.get('/hospitals/getHospitalGeneralRank/:hospital_id', function (req, res, next) {
    var hospital_id = req.params.hospital_id;
    models.HOSPITALS.findAll({
        order: [['created_at', 'DESC']]
    }).then(function (HOSPITALS) {
        res.send({hospital_rank: HOSPITALS});
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

module.exports = router;
