// Developer: Ahmet Kaymak
// Date: 01.02.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();

router.get('/drugs/getAll', function(req, res, next) {
    models.DRUGS.findAll()
        .then(function (PrescriptionType) {
            res.send({data:PrescriptionType});
        })
});

router.post('/drugs/create', function(req, res) {
    models.DRUGS.create({
        commercial_name:req.body.commercial_name,
        chemical_name: req.body.chemical_name,
        type_id: req.body.type_id,
        prescription_type_id: req.body.prescription_type_id,
        form_id: req.body.form_id,
        company_id: req.body.company_id,
        general_descriptions: req.body.general_descriptions
    }).then(function(user) {
        res.json(DRUGS);
    });
});

router.post('/drugs/getDrugByName', function (req, res) {
    var commercial_name = req.body.search_text;
    models.DRUGS.findAll({
        attributes: ['drug_id', 'commercial_name'],
        where:{
            commercial_name: {
                $like: "%"+commercial_name+"%"
            }
        }
    }).then(function (DRUGS) {
        res.send({drug_list: DRUGS});
    })
});
module.exports = router;