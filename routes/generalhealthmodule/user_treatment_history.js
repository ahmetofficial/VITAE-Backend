// Developer: Ahmet Kaymak
// Date: 08.04.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

//create user disease history
router.post('/userTreatmentHistory/create', function (req, res, next) {
    var user_id = req.body.user_id;
    var disease_id = req.body.disease_id;
    var treatment_id = req.body.treatment_id;
    var treatment_start_date = req.body.treatment_start_date;
    models.USER_TREATMENT_HISTORY.create({
        user_id: user_id,
        disease_id: disease_id,
        treatment_id: treatment_id,
        treatment_start_date: treatment_start_date,
        count_of_drugs: 0
    }).then(function () {
        res.status(200).json({
            status: 'true'
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//get user disease treatment history
router.get('/userTreatmentHistory/getHistory/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    models.USER_TREATMENT_HISTORY.findAndCountAll({
        where: {user_id: user_id},
        include: [
            {
                attributes: ['treatment_id','treatment_name'],
                model: models.TREATMENTS
            },
            {
                attributes: ['disease_id','disease_name'],
                model: models.DISEASES
            }
        ]
    }).then(function (result) {
        res.send({
                user_treatment_history: result.rows,
                treatment_count: result.count
            }
        )
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//get user's disease treatment history
router.get('/userTreatmentHistory/getDiseaseTreatmentHistory/:user_id/:disease_id', function (req, res, next) {
    var user_id = req.params.user_id;
    var disease_id = req.params.disease_id;

    models.USER_TREATMENT_HISTORY.findAndCountAll({
        where: {user_id: user_id,disease_id:disease_id},
        include: [
            {
                attributes: ['treatment_id','treatment_name'],
                model: models.TREATMENTS
            }
        ]
    }).then(function (result) {
        res.send({
                user_treatment_history: result.rows,
                treatment_count: result.count
            }
        )
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//update count_of_drugs
router.post('/userTreatmentHistory/updateDrugCount', function (req, res, next) {
    var user_id = req.body.user_id;
    var disease_id = req.body.disease_id;
    var treatment_id = req.body.treatment_id;
    models.USER_TREATMENT_HISTORY.update(
        {count_of_drugs: sequelize.literal('count_of_drugs + 1')},
        {
            fields: ['count_of_drugs'],
            where: {
                user_id: user_id,
                disease_id: disease_id,
                treatment_id: treatment_id
            }
        }).then(function () {
        res.status(200).json({
            status: 'true'
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

module.exports = router;