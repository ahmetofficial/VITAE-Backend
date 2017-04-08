/// Developer: Ahmet Kaymak
// Date: 09.04.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();

//create user drug usage history
router.post('/userDrugUsageHistory/create', function (req, res, next) {
    var user_id = req.body.user_id;
    var disease_id = req.body.disease_id;
    var treatment_id = req.body.treatment_id;
    var drug_id = req.body.drug_id;
    var drug_usage_start_date = req.body.drug_usage_start_date;
    var drug_usage_finish_date = req.body.drug_usage_finish_date;
    var drug_effect_on_disease = req.body.drug_effect_on_disease;
    models.USER_DRUG_USAGE_HISTORY.create({
        user_id: user_id,
        disease_id: disease_id,
        treatment_id: treatment_id,
        drug_id: drug_id,
        drug_usage_start_date: drug_usage_start_date,
        drug_usage_finish_date: drug_usage_finish_date,
        drug_effect_on_disease: drug_effect_on_disease
    }).then(function () {
        res.status(200).json({
            status: 'true'
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//get user drug usage history
router.get('/userDrugUsageHistory/getHistory/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    models.USER_DRUG_USAGE_HISTORY.findAndCountAll({
        where: {user_id: user_id},
        include: [
            {
                attributes: ['treatment_id', 'treatment_name'],
                model: models.TREATMENTS
            },
            {
                attributes: ['disease_id', 'disease_name'],
                model: models.DISEASES
            },
            {
                attributes: ['drug_id', 'commercial_name'],
                model: models.DRUGS
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