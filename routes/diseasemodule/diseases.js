// Developer: Ahmet Kaymak
// Date: 25.03.2017

'use strict';

var models = require('../../models/index');
var express = require('express');
var router = express.Router();

//get all disease

router.get('/diseases/getAll', function (req, res, next) {
    models.DISEASES.findAll({
        attributes: ['disease_id', 'disease_name']
    })
        .then(function (DISEASES) {
            res.send({data: DISEASES});
        })
});

router.post('/diseases/getDiseaseByName', function (req, res) {
    var disease_name = req.body.search_text;
    models.DISEASES.findAll({
        attributes: ['disease_id', 'disease_name'],
        where:{
            disease_name: {
                $like: "%"+disease_name+"%"
            }
        }
    }).then(function (DISEASES) {
        res.send({disease_list: DISEASES});
    })
});

module.exports = router;