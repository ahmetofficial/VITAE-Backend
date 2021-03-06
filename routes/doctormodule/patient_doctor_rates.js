// Developer: Ahmet Kaymak
// Date: 28.10.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

//create patient doctor rate
router.post('/doctors/createPatientDoctorRates', function (req, res, next) {
    var patient_id = req.body.patient_id;
    var doctor_id = req.body.doctor_id;
    var disease_id = req.body.disease_id;
    var user_comment = req.body.user_comment;
    var user_rate = req.body.user_rate;
    models.PATIENT_DOCTOR_RATES.create({
        patient_id: patient_id,
        doctor_id: doctor_id,
        disease_id: disease_id,
        user_comment: user_comment,
        user_rate: user_rate
    }).then(function () {
        updateDoctorRatingParameters(doctor_id, user_rate, res);
        res.send({status: 'true'});
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

function updateDoctorRatingParameters(doctor_id, new_vote, res) {
    if (new_vote == 1) {
        models.DOCTORS.update(
            {
                total_score: sequelize.literal('total_score+' + new_vote),
                total_vote_number: sequelize.literal('total_vote_number+1'),
                vote_1_count: sequelize.literal('vote_1_count+1')
            },
            {
                fields: ['total_score', 'total_vote_number', 'vote_1_count'],
                where: {
                    user_id: doctor_id
                }
            })
    } else if (new_vote == 2) {
        models.DOCTORS.update(
            {
                total_score: sequelize.literal('total_score+' + new_vote),
                total_vote_number: sequelize.literal('total_vote_number+1'),
                vote_2_count: sequelize.literal('vote_2_count+1')
            },
            {
                fields: ['total_score', 'total_vote_number', 'vote_2_count'],
                where: {
                    user_id: doctor_id
                }
            })
    } else if (new_vote == 3) {
        models.DOCTORS.update(
            {
                total_score: sequelize.literal('total_score+' + new_vote),
                total_vote_number: sequelize.literal('total_vote_number+1'),
                vote_3_count: sequelize.literal('vote_3_count+1')
            },
            {
                fields: ['total_score', 'total_vote_number', 'vote_3_count'],
                where: {
                    user_id: doctor_id
                }
            })
    } else if (new_vote == 4) {
        models.DOCTORS.update(
            {
                total_score: sequelize.literal('total_score+' + new_vote),
                total_vote_number: sequelize.literal('total_vote_number+1'),
                vote_4_count: sequelize.literal('vote_4_count+1')
            },
            {
                fields: ['total_score', 'total_vote_number', 'vote_4_count'],
                where: {
                    user_id: doctor_id
                }
            })
    } else {
        models.DOCTORS.update(
            {
                total_score: sequelize.literal('total_score+' + new_vote),
                total_vote_number: sequelize.literal('total_vote_number+1'),
                vote_5_count: sequelize.literal('vote_5_count+1')
            },
            {
                fields: ['total_score', 'total_vote_number', 'vote_5_count'],
                where: {
                    user_id: doctor_id
                }
            })
    }
}


//doctor rates by doctor_id
router.get('/doctors/getPatientDoctorRates/:doctor_id', function (req, res, next) {
    var doctor_id = req.params.doctor_id;
    models.PATIENT_DOCTOR_RATES.findAll({
        include: [
            {
                attributes: ['user_id', 'user_name', 'profile_picture_id'],
                model: models.USERS,
                as: 'PATIENT'
            },
            {
                attributes: ['disease_id', 'disease_name'],
                model: models.DISEASES
            }
        ],
        where: {
            doctor_id: doctor_id
        }
    }).then(function (DOCTORS) {
        res.send({rates: DOCTORS});
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//doctor ranking by a diseaase
router.get('/doctors/getDoctorRankingByDiseaseId/:disease_id', function (req, res, next) {
    var disease_id = req.params.disease_id;
    models.PATIENT_DOCTOR_RATES.findAll({
        attributes: ['doctor_id', [models.sequelize.fn('AVG', models.sequelize.col('user_rate')), 'doctor_overall_score']],
        where: {
            disease_id: disease_id
        },
        group: 'doctor_id',
        order: [[models.sequelize.fn('AVG', models.sequelize.col('user_rate')), 'DESC']],
        include: [
            {

                attributes: ['user_id', 'user_name', 'profile_picture_id'],
                model: models.USERS,
                as: 'DOCTOR',
                include: [
                    {
                        attributes: ['user_id', 'clinic_id', 'hospital_id'],
                        model: models.DOCTOR_HAVE_HOSPITAL,
                        include: [
                            {
                                attributes: ['clinic_name'],
                                model: models.CLINICS
                            },
                            {
                                attributes: ['hospital_name', 'latitude', 'longitude'],
                                model: models.HOSPITALS
                            }
                        ]
                    }
                ]
            }
        ]
    }).then(function (HOSPITALS) {
        res.send({rates: HOSPITALS});
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

module.exports = router;
