// Developer: Ahmet Kaymak
// Date: 25.03.2017

'use strict';

var models = require('../../models/index');
var express = require('express');
var router = express.Router();

//get all disease

router.get('/diseases/getAll', function (req, res, next) {
    models.DISEASES.findAll({
        attributes: ['disease_id','disease_name']
    })
        .then(function (PrescriptionType) {
            {}
            res.send({data: PrescriptionType});
        })
});

module.exports = router;