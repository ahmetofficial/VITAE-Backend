/**
 * Created by SAMSUNG on 1.2.2017.
 */
var models = require('../../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    models.PRESCRIPTION_TYPE.findAll()
        .then(function (PrescriptionType) {
            res.send({data:PrescriptionType});
        })
});

module.exports = router;