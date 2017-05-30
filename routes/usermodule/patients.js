// Developer: Ahmet Kaymak
// Date: 12.03.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

//get patient profile data data

router.get('/patients/getPatientProfile/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    models.USERS.findById(user_id, {
        attributes: ['user_id','user_name','about_me','friend_count','is_official_user','is_official_user','profile_picture_id'],
        model: models.USERS,
        include:[
            {
                attributes: ['birthday'],
                model: models.PATIENTS,
                where: {
                    user_id:user_id
                }
            }
        ]
    }).then(function (USERS) {
        res.send(USERS);
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//Search similar patient
router.post('/patients/searchSimilarPatient', function (req, res) {
    var search_text = req.body.search_text;
    var user_id = req.body.user_id;
    sequelize.query(
        ' (SELECT user_id, SUM(similarity_count) AS similarity_count FROM'+
        ' ((SELECT user_id, COUNT(disease_id) AS similarity_count FROM USER_DISEASE_HISTORY'+
        ' WHERE disease_id IN (SELECT disease_id FROM USER_DISEASE_HISTORY'+
        ' WHERE user_id = \''+user_id+'\''+
        ' GROUP BY disease_id)'+
        ' AND user_id != \''+user_id+'\''+
        ' GROUP BY user_id'+
        ' ORDER BY disease_id_count)'+

        ' UNION'+
        ' (SELECT user_id, COUNT(treatment_id) AS similarity_count FROM USER_TREATMENT_HISTORY'+
        ' WHERE treatment_id IN'+
        ' (SELECT treatment_id FROM USER_TREATMENT_HISTORY'+
        ' WHERE disease_id IN'+
        ' (SELECT disease_id FROM USER_DISEASE_HISTORY'+
        ' WHERE user_id = \''+user_id+'\''+
        ' GROUP BY disease_id)'+
        ' GROUP BY treatment_id)'+
        ' AND user_id != \''+user_id+'\''+
        ' GROUP BY user_id)'+

        ' UNION'+
        ' (SELECT user_id, COUNT(drug_id) AS similarity_count FROM USER_DRUG_USAGE_HISTORY'+
        ' WHERE drug_id IN'+
        ' (SELECT drug_id FROM USER_DRUG_USAGE_HISTORY'+
        ' WHERE treatment_id IN'+
        ' (SELECT treatment_id FROM USER_TREATMENT_HISTORY'+
        ' WHERE disease_id IN'+
        ' (SELECT disease_id FROM USER_DISEASE_HISTORY'+
        ' WHERE user_id = \''+user_id+'\''+
        ' GROUP BY disease_id)'+
        ' GROUP BY treatment_id)'+
        ' AND user_id != \''+user_id+'\''+
        ' GROUP BY user_id))) SIMILARITIES'+
        ' WHERE user_id IN'+
        ' (SELECT user_id FROM USERS'+
        ' WHERE MATCH (user_name) AGAINST (\''+search_text+'\' IN NATURAL LANGUAGE MODE))'+
        ' GROUP BY user_id'+
        ' ORDER BY similarity_count DESC);',
        { type: sequelize.QueryTypes.SELECT}
    ).then(function (USERS) {
        res.send({users: USERS[0]});
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

module.exports = router;