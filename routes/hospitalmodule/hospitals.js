// Developer: Ahmet Kaymak
// Date: 14.04.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

//full text search by hospital id
router.post('/hospitals/searchByHospitalName', function (req, res, next) {
    var hospital_name = req.body.hospital_name;
    sequelize.query('SELECT hospital_name, hospital_type, overall_score FROM HOSPITALS WHERE MATCH(hospital_name) AGAINST("'+hospital_name+'"IN NATURAL LANGUAGE MODE);'
    ).then(function (HOSPITALS) {
        res.send({hospitals: HOSPITALS[0]});
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

module.exports = router;