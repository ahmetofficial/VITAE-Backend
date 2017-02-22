// Developer: Ahmet Kaymak
// Date: 01.02.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();

router.get('/formOfDrugs/getAll', function(req, res, next) {
    models.FORM_OF_DRUGS.findAll()
        .then(function (PrescriptionType) {
            res.send({data:PrescriptionType});
        })
});

module.exports = router;
