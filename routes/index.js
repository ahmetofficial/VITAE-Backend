var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  models.FORM_OF_DRUGS.findAll()
      .then(function (PrescriptionType) {
          res.send({data:PrescriptionType});
      })
});

module.exports = router;
