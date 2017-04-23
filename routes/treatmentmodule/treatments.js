// Developer: Ahmet Kaymak
// Date: 23.04.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();

//search by treatment name
router.post('/treatments/getTreatmenyByName', function (req, res) {
    var treatment_name = req.body.search_text;
    models.TREATMENTS.findAll({
        attributes: ['treatment_id', 'treatment_name'],
        where:{
            treatment_name: {
                $like: "%"+treatment_name+"%"
            }
        }
    }).then(function (TREATMENTS) {
        res.send({treatment_list: TREATMENTS});
    })
});
module.exports = router;
