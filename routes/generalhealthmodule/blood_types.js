// Developer: Ahmet Kaymak
// Date: 20.02.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();

router.get('/bloodTypes/getAll', function (req, res, next) {
    models.BLOOD_TYPES.findAll()
        .then(function (PrescriptionType) {
            res.send({data: PrescriptionType});
        })
});

router.get('/bloodTypes/getBloodType', function (req, res) {
    var blood_type_id = req.body.blood_type_id;
    models.BLOOD_TYPES.findById(blood_type_id, {}).then(function (PrescriptionType) {
        res.send({bloodType: PrescriptionType});
    })
});

router.post('/bloodTypes/getBloodId', function (req, res) {
    var blood_type = req.body.blood_type;
    var rh_factor = req.body.rh_factor;
    models.BLOOD_TYPES.findAll({
        where: {
            blood_type:blood_type,
            rh_factor:rh_factor
        }
    }).then(function (PrescriptionType) {
        res.send({bloodType: PrescriptionType});
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

module.exports = router;