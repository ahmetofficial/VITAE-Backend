// Developer: Ahmet Kaymak
// Date: 25.03.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

router.get('/userHealthHistory/getHistory/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    models.USER_DISEASE_HISTORY.findAndCountAll({
        attributes: ['disease_start_date', 'disease_level_id', 'disease_state_id', 'count_of_treatments', 'count_of_drugs'],
        where: {user_id: user_id},
        include: [
            {
                attributes: ['disease_name'],
                model: models.DISEASES
            },
            {
                attributes: ['treatment_start_date', 'count_of_drugs'],
                model: models.USER_TREATMENT_HISTORY,
                where: {
                    user_id: user_id
                },
                include: [
                    {
                        attributes: ['treatment_name'],
                        model: models.TREATMENTS
                    },
                    {
                        attributes:['drug_usage_start_date'],
                        model: models.USER_DRUG_USAGE_HISTORY,
                        where: {
                            user_id: user_id
                        },
                        include: [
                            {
                                attributes:['commercial_name'],
                                model: models.DRUGS
                            }
                        ]
                    }
                ]

            }
        ]
    }).then(function (result) {
        res.send({
                user_disease_history: result.rows
            }
        )
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//create user disease history
router.post('/userDiseaseHistory/create', function (req, res, next) {
    var user_id = req.body.user_id;
    var disease_id = req.body.disease_id;
    var disease_start_date = req.body.disease_start_date;
    var disease_level_id = req.body.disease_level_id;
    var disease_state_id = req.body.disease_state_id;
    models.USER_DISEASE_HISTORY.create({
        user_id: user_id,
        disease_id: disease_id,
        disease_start_date: disease_start_date,
        disease_level_id: disease_level_id,
        disease_state_id: disease_state_id,
        count_of_drugs: 0,
        count_of_treatments: 0
    }).then(function () {
        res.status(200).json({
            status: 'true'
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//get user disease history
router.get('/userDiseaseHistory/getHistory/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    models.USER_DISEASE_HISTORY.findAndCountAll({
        where: {user_id: user_id},
        include: [
            {
                model: models.DISEASES
            }
        ]
    }).then(function (result) {
        res.send({
                user_disease_history: result.rows,
                disease_count: result.count
            }
        )
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//update count_of_treatments
router.post('/userDiseaseHistory/updateTreatmentCount', function (req, res, next) {
    var user_id = req.body.user_id;
    var disease_id = req.body.disease_id;
    models.USER_DISEASE_HISTORY.update(
        {count_of_treatments: sequelize.literal('count_of_treatments + 1')},
        {
            fields: ['count_of_treatments'],
            where: {
                user_id: user_id,
                disease_id: disease_id
            }
        }).then(function () {
        res.status(200).json({
            status: 'true'
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//update count_of_drugs
router.post('/userDiseaseHistory/updateDrugCount', function (req, res, next) {
    var user_id = req.body.user_id;
    var disease_id = req.body.disease_id;
    models.USER_DISEASE_HISTORY.update(
        {count_of_drugs: sequelize.literal('count_of_drugs + 1')},
        {
            fields: ['count_of_drugs'],
            where: {
                user_id: user_id,
                disease_id: disease_id
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