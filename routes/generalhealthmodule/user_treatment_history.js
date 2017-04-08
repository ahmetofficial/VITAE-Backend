// Developer: Ahmet Kaymak
// Date: 08.04.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();

//create user disease history
router.post('/userTreatmentHistory/create', function (req, res, next) {
    var user_id = req.body.user_id;
    var disease_id = req.body.disease_id;
    var treatment_id = req.body.treatment_id;
    var disease_start_date = req.body.disease_start_date;
    var disease_effect_on_disease = req.body.disease_effect_on_disease;
    models.USER_TREATMENT_HISTORY.create({
        user_id: user_id,
        disease_id: disease_id,
        treatment_id: treatment_id,
        disease_start_date: disease_start_date,
        disease_effect_on_disease: disease_effect_on_disease
    }).then(function () {
        res.status(200).json({
            status: 'true'
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//get user disease history
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

module.exports = router;