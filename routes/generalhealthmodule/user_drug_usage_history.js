// Developer: Ahmet Kaymak
// Date: 31.03.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();

//get user drug number of user spesific disease
router.post('/userDrugUsageHistory/getDrugCountOfDisease/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    var disease_id = req.body.disease_id;
    models.USER_DRUG_USAGE_HISTORY.findAndCountAll({
        where: {
            user_id: user_id,
            disease_id: disease_id
        }
    }).then(function (result) {
        res.send({
                disease_count: result.count
            }
        )
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

module.exports = router;