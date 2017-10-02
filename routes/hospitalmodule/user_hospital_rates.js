// Developer: Ahmet Kaymak
// Date: 24.09.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

//create user hospital rate
router.post('/hospitals/createUserHospitalRates', function (req, res, next) {
    var user_id = req.body.user_id;
    var hospital_id = req.body.hospital_id;
    var disease_id = req.body.disease_id;
    var user_comment = req.body.user_comment;
    var user_rate = req.body.user_rate;
    models.USER_HOSPITAL_RATES.create({
        user_id: user_id,
        hospital_id: hospital_id,
        disease_id: disease_id,
        user_comment: user_comment,
        user_rate: user_rate
    }).then(function () {
        updateHospitalTotalRatingParameter(hospital_id, user_rate, res);
        res.send({status: 'true'});
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

function updateHospitalTotalRatingParameter(hospital_id, new_vote, res) {
    models.HOSPITALS.update(
        {
            total_score: sequelize.literal('total_score+' + new_vote),
            total_vote_number: sequelize.literal('total_vote_number+1')
        },
        {
            fields: ['total_score','total_vote_number'],
            where: {
                hospital_id: hospital_id
            }
        })
}

//hospital rates by hospital_id
router.get('/hospitals/getUserHospitalRates/:hospital_id', function (req, res, next) {
    var hospital_id = req.params.hospital_id;
    models.USER_HOSPITAL_RATES.findAll({
        where: {
            hospital_id: hospital_id
        }
    }).then(function (HOSPITALS) {
            res.send({rates: HOSPITALS});
        }).catch(function (error) {
        res.status(500).json(error)
    });
});

//hospital ranking by a diseaase
router.get('/hospitals/getHospitalRankingByDiseaseId/:disease_id', function (req, res, next) {
    var disease_id = req.params.disease_id;
    models.USER_HOSPITAL_RATES.findAll({
        attributes: ['hospital_id',[models.sequelize.fn('AVG', models.sequelize.col('user_rate')), 'hospital_overal_score']],
        where: {
            disease_id: disease_id
        },
        group: 'hospital_id',
        order: [[models.sequelize.fn('AVG', models.sequelize.col('user_rate')), 'DESC']],
        include:[
            {
                attributes: ['hospital_id', 'hospital_name','hospital_type','latitude','longitude'],
                model:models.HOSPITALS
            }
        ]
    }).then(function (HOSPITALS) {
        res.send({rates: HOSPITALS});
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

module.exports = router;
