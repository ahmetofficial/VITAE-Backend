'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var db = {};

if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function (file) {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Models
db.BLOOD_ALARM = require('../models/BLOOD_ALARM.js')(sequelize, Sequelize);
db.BLOOD_TYPES = require('../models/BLOOD_TYPES.js')(sequelize, Sequelize);
db.BODY_SYSTEM = require('../models/BODY_SYSTEMS')(sequelize, Sequelize);
db.CITIES = require('../models/CITIES')(sequelize, Sequelize);
db.CLINICS = require('../models/CLINICS')(sequelize, Sequelize);
db.COUNTRIES = require('../models/COUNTRIES')(sequelize, Sequelize);
db.DOCTORS = require('../models/DOCTORS')(sequelize, Sequelize);
db.DOCTOR_HAVE_HOSPITAL=require('../models/DOCTOR_HAVE_HOSPITAL')(sequelize, Sequelize);
db.DISEASE_PRIOR_REASON = require('../models/DISEASE_PRIOR_REASON')(sequelize, Sequelize);
db.DISEASES = require('../models/DISEASES')(sequelize, Sequelize);
db.DRUG_COMPANIES = require('../models/DRUG_COMPANIES.js')(sequelize, Sequelize);
db.DRUG_DOSE_AMOUNT_HISTORY = require('../models/DRUG_DOSE_AMOUNT_HISTORY.js')(sequelize, Sequelize);
db.DRUG_USAGE_GAP_PERIODS = require('../models/DRUG_USAGE_GAP_PERIODS.js')(sequelize, Sequelize);
db.DRUG_USAGE_STATE_HISTORY = require('../models/DRUG_USAGE_STATE_HISTORY.js')(sequelize, Sequelize);
db.DRUGS = require('../models/DRUGS.js')(sequelize, Sequelize);
db.FORM_OF_DRUGS = require('../models/FORM_OF_DRUGS.js')(sequelize, Sequelize);
db.GENERAL_DRUG_TYPE_GROUPS = require('../models/GENERAL_DRUG_TYPE_GROUPS.js')(sequelize, Sequelize);
db.HOSPITALS = require('../models/HOSPITALS')(sequelize, Sequelize);
db.MESSAGE_CONVERSATION = require('../models/MESSAGE_CONVERSATION')(sequelize, Sequelize);
db.MESSAGES = require('../models/MESSAGES')(sequelize, Sequelize);
db.NEIGHBORHOODS = require('../models/NEIGHBORHOODS')(sequelize, Sequelize);
db.ORGANS = require('../models/ORGANS.js')(sequelize, Sequelize);
db.PATIENT_DOCTOR_RATES = require('../models/PATIENT_DOCTOR_RATES')(sequelize, Sequelize);
db.PATIENTS = require('../models/PATIENTS.js')(sequelize, Sequelize);
db.PHOTOS = require('../models/PHOTOS.js')(sequelize, Sequelize);
db.PRESCRIPTION_TYPE = require('../models/PRESCRIPTION_TYPE.js')(sequelize, Sequelize);
db.RELATIONSHIP_STATUS = require('../models/RELATIONSHIP_STATUS.js')(sequelize, Sequelize);
db.STATES = require('../models/STATES.js')(sequelize, Sequelize);
db.TOWNS = require('../models/TOWNS.js')(sequelize, Sequelize);
db.TREATMENT_GAP_PERIODS = require('../models/TREATMENT_GAP_PERIODS.js')(sequelize, Sequelize);
db.TREATMENT_STATE_HISTORY = require('../models/TREATMENT_STATE_HISTORY.js')(sequelize, Sequelize);
db.TREATMENTS = require('../models/TREATMENTS.js')(sequelize, Sequelize);
db.TYPES_OF_DRUGS = require('../models/TYPES_OF_DRUGS.js')(sequelize, Sequelize);
db.USER_BLOCKED_USERS = require('../models/USER_BLOCKED_USERS.js')(sequelize, Sequelize);
db.USER_CONNECTION_REQUESTS = require('../models/USER_CONNECTION_REQUESTS.js')(sequelize, Sequelize);
db.USER_CONNECTIONS = require('../models/USER_CONNECTIONS.js')(sequelize, Sequelize);
db.USER_DISEASE_HISTORY = require('../models/USER_DISEASE_HISTORY.js')(sequelize, Sequelize);
db.USER_DRUG_USAGE_HISTORY = require('../models/USER_DRUG_USAGE_HISTORY.js')(sequelize, Sequelize);
db.USER_LOCATION = require('../models/USER_LOCATION')(sequelize, Sequelize);
db.USER_POST = require('../models/USER_POST.js')(sequelize, Sequelize);
db.USER_POST_COMMENT = require('../models/USER_POST_COMMENT')(sequelize, Sequelize);
db.USER_POST_HAVE_PHOTOS = require('../models/USER_POST_HAVE_PHOTOS')(sequelize, Sequelize);
db.USER_POST_LIKE = require('../models/USER_POST_LIKE')(sequelize, Sequelize);
db.USER_TREATMENT_HISTORY = require('../models/USER_TREATMENT_HISTORY.js')(sequelize, Sequelize);
db.USER_TYPES = require('../models/USER_TYPES.js')(sequelize, Sequelize);
db.USERS = require('../models/USERS.js')(sequelize, Sequelize);
db.USER_HOSPITAL_RATES = require('../models/USER_HOSPITAL_RATES')(sequelize, Sequelize);

///////////////////////////////////ASSOCIATIONS///////////////////////////////////////

//BLOOD_TYPES
db.BLOOD_TYPES.hasMany(db.BLOOD_ALARM, {foreignKey: 'blood_type_id', targetKey: 'blood_type_id'});

//BLOOD_ALARM
db.BLOOD_ALARM.belongsTo(db.BLOOD_TYPES, {foreignKey: 'blood_type_id', targetKey: 'blood_type_id'});
db.BLOOD_ALARM.belongsTo(db.HOSPITALS, {foreignKey: 'hospital_id', targetKey: 'hospital_id'});
db.BLOOD_ALARM.belongsTo(db.USERS, {foreignKey: 'user_id', targetKey: 'user_id'});

//CLINICS
db.CLINICS.hasMany(db.DOCTOR_HAVE_HOSPITAL, {foreignKey: 'clinic_id', targetKey: 'clinic_id'});

//DISEASES
db.DISEASES.hasMany(db.USER_DISEASE_HISTORY, {foreignKey: 'disease_id', targetKey: 'disease_id'});
db.DISEASES.hasMany(db.USER_DRUG_USAGE_HISTORY, {foreignKey: 'disease_id', targetKey: 'disease_id'});
db.DISEASES.hasMany(db.USER_TREATMENT_HISTORY, {foreignKey: 'disease_id', targetKey: 'disease_id'});
db.DISEASES.hasMany(db.USER_HOSPITAL_RATES, {foreignKey: 'disease_id', targetKey: 'disease_id'});
db.DISEASES.hasMany(db.PATIENT_DOCTOR_RATES, {foreignKey: 'disease_id', targetKey: 'disease_id'});

//DOCTOR_HAVE_HOSPITAL
db.DOCTOR_HAVE_HOSPITAL.belongsTo(db.CLINICS, {foreignKey: 'clinic_id', targetKey: 'clinic_id'});
db.DOCTOR_HAVE_HOSPITAL.belongsTo(db.HOSPITALS, {foreignKey: 'hospital_id', targetKey: 'hospital_id'});
db.DOCTOR_HAVE_HOSPITAL.belongsTo(db.USERS, {foreignKey: 'user_id', targetKey: 'user_id'});

//DOCTORS
db.DOCTORS.belongsTo(db.USERS, {foreignKey: 'user_id', targetKey: 'user_id'});
db.DOCTORS.hasMany(db.PATIENT_DOCTOR_RATES, {foreignKey: 'doctor_id', targetKey: 'user_id'});
db.DOCTORS.hasMany(db.DOCTOR_HAVE_HOSPITAL, {foreignKey: 'user_id', targetKey: 'user_id'});

//DRUG_COMPANIES

//DRUGS
db.DISEASES.hasMany(db.USER_DRUG_USAGE_HISTORY, {foreignKey: 'drug_id', targetKey: 'drug_id'});

//FORM_OF_DRUGS

//HOSPITAL
db.HOSPITALS.hasMany(db.USER_HOSPITAL_RATES, {foreignKey: 'hospital_id', targetKey: 'hospital_id'});
db.HOSPITALS.hasMany(db.BLOOD_ALARM, {foreignKey: 'hospital_id', targetKey: 'hospital_id'});
db.HOSPITALS.hasMany(db.DOCTOR_HAVE_HOSPITAL, {foreignKey: 'hospital_id', targetKey: 'hospital_id'});

//GENERAL_DRUG_TYPE_GROUPS

//MESSAGES
db.MESSAGES.belongsTo(db.USERS, {foreignKey: 'sender_id', targetKey: 'user_id'});
db.MESSAGES.belongsTo(db.USERS, {foreignKey: 'receiver_id', targetKey: 'user_id'});
db.MESSAGES.belongsTo(db.MESSAGE_CONVERSATION, {foreignKey: 'conversation_id', targetKey: 'conversation_id'});

//MESSAGE_CONVERSATION
db.MESSAGE_CONVERSATION.belongsTo(db.USERS, {as: 'SENDER', foreignKey: 'sender_id', targetKey: 'user_id'});
db.MESSAGE_CONVERSATION.belongsTo(db.USERS, {as: 'RECEIVER', foreignKey: 'receiver_id', targetKey: 'user_id'});
db.MESSAGE_CONVERSATION.hasMany(db.MESSAGES, {foreignKey: 'conversation_id', targetKey: 'conversation_id'});

//PATIENT_DOCTOR_RATES
db.PATIENT_DOCTOR_RATES.belongsTo(db.PATIENTS, {as:'PATIENT',foreignKey: 'patient_id', targetKey: 'user_id'});
db.PATIENT_DOCTOR_RATES.belongsTo(db.DOCTORS, {as:'DOCTOR',foreignKey: 'doctor_id', targetKey: 'user_id'});
db.PATIENT_DOCTOR_RATES.belongsTo(db.USERS, {as:'PATIENT',foreignKey: 'patient_id', targetKey: 'user_id'});
db.PATIENT_DOCTOR_RATES.belongsTo(db.USERS, {as:'DOCTOR',foreignKey: 'doctor_id', targetKey: 'user_id'});
db.PATIENT_DOCTOR_RATES.belongsTo(db.DISEASES, {foreignKey: 'disease_id', targetKey: 'disease_id'});

//PATIENTS
db.PATIENTS.hasMany(db.USER_POST, {foreignKey: 'user_id', targetKey: 'user_id'});
db.PATIENTS.hasMany(db.PATIENT_DOCTOR_RATES, {foreignKey: 'patient_id', targetKey: 'user_id'});

//PHOTOS
db.PHOTOS.hasMany(db.USER_POST_HAVE_PHOTOS, {foreignKey: 'photo_id', targetKey: 'photo_id'});

//PRESCRIPTION_TYPE

//RELATIONSHIP_STATUS

//TYPES_OF_DRUGS

//TREATMENTS
db.TREATMENTS.hasMany(db.USER_TREATMENT_HISTORY, {foreignKey: 'treatment_id', targetKey: 'treatment_id'});

//USER_CONNECTIONS
db.USER_BLOCKED_USERS.belongsTo(db.USERS, {foreignKey: 'active_user_id', targetKey: 'user_id'});
db.USER_BLOCKED_USERS.belongsTo(db.USERS, {foreignKey: 'passive_user_id', targetKey: 'user_id'});

//USER_CONNECTIONS
db.USER_CONNECTION_REQUESTS.belongsTo(db.USERS, {foreignKey: 'active_user_id', targetKey: 'user_id'});
db.USER_CONNECTION_REQUESTS.belongsTo(db.USERS, {foreignKey: 'passive_user_id', targetKey: 'user_id'});

//USER_CONNECTIONS
db.USER_CONNECTIONS.belongsTo(db.USERS, {foreignKey: 'active_user_id', targetKey: 'user_id'});
db.USER_CONNECTIONS.belongsTo(db.USERS, {foreignKey: 'passive_user_id', targetKey: 'user_id'});

//USER_DISEASE_HISTORY
db.USER_DISEASE_HISTORY.belongsTo(db.USERS, {foreignKey: 'user_id', targetKey: 'user_id'});
db.USER_DISEASE_HISTORY.belongsTo(db.DISEASES, {foreignKey: 'disease_id', targetKey: 'disease_id'});

//USER_DRUG_USAGE_HISTORY
db.USER_DRUG_USAGE_HISTORY.belongsTo(db.USERS, {foreignKey: 'user_id', targetKey: 'user_id'});
db.USER_DRUG_USAGE_HISTORY.belongsTo(db.DISEASES, {foreignKey: 'disease_id', targetKey: 'disease_id'});
db.USER_DRUG_USAGE_HISTORY.belongsTo(db.TREATMENTS, {foreignKey: 'treatment_id', targetKey: 'treatment_id'});
db.USER_DRUG_USAGE_HISTORY.belongsTo(db.DRUGS, {foreignKey: 'drug_id', targetKey: 'drug_id'});

//USER_LOCATION
db.USER_LOCATION.belongsTo(db.USERS, {foreignKey: 'user_id', targetKey: 'user_id'});

//USER_TREATMENT_HISTORY
db.USER_TREATMENT_HISTORY.belongsTo(db.USERS, {foreignKey: 'user_id', targetKey: 'user_id'});
db.USER_TREATMENT_HISTORY.belongsTo(db.DISEASES, {foreignKey: 'disease_id', targetKey: 'disease_id'});
db.USER_TREATMENT_HISTORY.belongsTo(db.TREATMENTS, {foreignKey: 'treatment_id', targetKey: 'treatment_id'});

//USERS
db.USERS.hasMany(db.BLOOD_ALARM, {foreignKey: 'user_id', targetKey: 'user_id'});
db.USERS.hasMany(db.USER_BLOCKED_USERS, {foreignKey: 'active_user_id', targetKey: 'user_id'});
db.USERS.hasMany(db.USER_BLOCKED_USERS, {foreignKey: 'passive_user_id', targetKey: 'user_id'});
db.USERS.hasMany(db.USER_CONNECTION_REQUESTS, {foreignKey: 'active_user_id', targetKey: 'user_id'});
db.USERS.hasMany(db.USER_CONNECTION_REQUESTS, {foreignKey: 'passive_user_id', targetKey: 'user_id'});
db.USERS.hasMany(db.USER_CONNECTIONS, {foreignKey: 'active_user_id', targetKey: 'user_id'});
db.USERS.hasMany(db.USER_CONNECTIONS, {foreignKey: 'passive_user_id', targetKey: 'user_id'});
db.USERS.hasMany(db.USER_POST, {foreignKey: 'user_id', targetKey: 'user_id'});
db.USERS.hasMany(db.USER_HOSPITAL_RATES, {foreignKey: 'user_id', targetKey: 'user_id'});
db.USERS.hasMany(db.USER_POST_COMMENT, {foreignKey: 'user_id', targetKey: 'user_id'});
db.USERS.hasMany(db.USER_POST_LIKE, {foreignKey: 'user_id', targetKey: 'user_id'});
db.USERS.hasMany(db.USER_LOCATION, {foreignKey: 'user_id', targetKey: 'user_id'});
db.USERS.hasMany(db.PATIENTS, {foreignKey: 'user_id', targetKey: 'user_id'});
db.USERS.hasMany(db.USER_DISEASE_HISTORY, {foreignKey: 'user_id', targetKey: 'user_id'});
db.USERS.hasMany(db.USER_DRUG_USAGE_HISTORY, {foreignKey: 'user_id', targetKey: 'user_id'});
db.USERS.hasMany(db.USER_TREATMENT_HISTORY, {foreignKey: 'user_id', targetKey: 'user_id'});
db.USERS.hasMany(db.MESSAGES, {foreignKey: 'sender_id', targetKey: 'user_id'});
db.USERS.hasMany(db.MESSAGES, {foreignKey: 'receiver_id', targetKey: 'user_id'});
db.USERS.hasMany(db.MESSAGE_CONVERSATION, {as: 'RECEIVER',foreignKey: 'receiver_id', targetKey: 'user_id'});
db.USERS.hasMany(db.MESSAGE_CONVERSATION, {as: 'SENDER',foreignKey: 'sender_id', targetKey: 'user_id'});
db.USERS.hasMany(db.DOCTOR_HAVE_HOSPITAL, {foreignKey: 'user_id', targetKey: 'user_id'});
db.USERS.hasMany(db.DOCTORS, {foreignKey: 'user_id', targetKey: 'user_id'});
db.USERS.hasMany(db.DOCTOR_HAVE_HOSPITAL, {foreignKey: 'user_id', targetKey: 'user_id'});
db.USERS.belongsTo(db.USER_TYPES, {foreignKey: 'user_type_id', targetKey: 'user_type_id'});

//USER_POST
db.USER_POST.belongsTo(db.USERS, {foreignKey: 'user_id', targetKey: 'user_id'});
db.USER_POST.belongsTo(db.PATIENTS, {foreignKey: 'user_id', targetKey: 'user_id'});
db.USER_POST.hasMany(db.USER_POST_COMMENT, {foreignKey: 'post_id', targetKey: 'post_id'});
db.USER_POST.hasMany(db.USER_POST_LIKE, {foreignKey: 'post_id', targetKey: 'post_id'});
db.USER_POST.hasMany(db.USER_POST_HAVE_PHOTOS, {foreignKey: 'post_id', targetKey: 'post_id'});

//USER_POST_COMMENT
db.USER_POST_COMMENT.belongsTo(db.USERS, {foreignKey: 'user_id', targetKey: 'user_id'});
db.USER_POST_COMMENT.belongsTo(db.USER_POST, {foreignKey: 'post_id', targetKey: 'post_id'});

//USER_POST_HAVE_PHOTOS
db.USER_POST_HAVE_PHOTOS.belongsTo(db.PHOTOS, {foreignKey: 'photo_id', targetKey: 'photo_id'});
db.USER_POST_HAVE_PHOTOS.belongsTo(db.USER_POST, {foreignKey: 'post_id', targetKey: 'post_id'});

//USER_POST_LIKE
db.USER_POST_LIKE.belongsTo(db.USERS, {foreignKey: 'user_id', targetKey: 'user_id'});
db.USER_POST_LIKE.belongsTo(db.USER_POST, {foreignKey: 'post_id', targetKey: 'post_id'});

//USER_TYPES
db.USER_TYPES.hasMany(db.USERS, {foreignKey: 'user_type_id', targetKey: 'user_type_id'});

//USER_HOSPITAL_RATES
db.USER_HOSPITAL_RATES.belongsTo(db.DISEASES, {foreignKey: 'disease_id', targetKey: 'disease_id'});
db.USER_HOSPITAL_RATES.belongsTo(db.USERS, {foreignKey: 'user_id', targetKey: 'user_id'});
db.USER_HOSPITAL_RATES.belongsTo(db.HOSPITALS, {foreignKey: 'hospital_id', targetKey: 'hospital_id'});

module.exports = db;
