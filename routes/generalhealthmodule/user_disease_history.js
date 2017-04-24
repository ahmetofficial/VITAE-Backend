// Developer: Ahmet Kaymak
// Date: 25.03.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();

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
        count_of_drugs:0,
        count_of_treatments:0
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
        where:{user_id: user_id},
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

module.exports = router;