// Developer: Ahmet Kaymak
// Date: 20.02.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();

router.get('/bloodTypes/getAll', function(req, res, next) {
    models.BLOOD_TYPES.findAll()
        .then(function (PrescriptionType) {
            res.send({data:PrescriptionType});
        })
});

module.exports = router;