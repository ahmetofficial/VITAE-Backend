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
db.BLOOD_TYPES = require('../models/BLOOD_TYPES.js')(sequelize, Sequelize);
db.DRUG_COMPANIES = require('../models/DRUG_COMPANIES.js')(sequelize, Sequelize);
db.DRUGS = require('../models/DRUGS.js')(sequelize, Sequelize);
db.FORM_OF_DRUGS = require('../models/FORM_OF_DRUGS.js')(sequelize, Sequelize);
db.GENERAL_DRUG_TYPE_GROUPS = require('../models/GENERAL_DRUG_TYPE_GROUPS.js')(sequelize, Sequelize);
db.PATIENTS = require('../models/PATIENTS.js')(sequelize, Sequelize);
db.PHOTOS = require('../models/PHOTOS.js')(sequelize, Sequelize);
db.PRESCRIPTION_TYPE = require('../models/PRESCRIPTION_TYPE.js')(sequelize, Sequelize);
db.RELATIONSHIP_STATUS = require('../models/RELATIONSHIP_STATUS.js')(sequelize, Sequelize);
db.RELATIONSHIPS = require('../models/RELATIONSHIPS.js')(sequelize, Sequelize);
db.TYPES_OF_DRUGS = require('../models/TYPES_OF_DRUGS.js')(sequelize, Sequelize);
db.USER_POSTS = require('../models/USER_POSTS.js')(sequelize, Sequelize);
db.USER_TYPES = require('../models/USER_TYPES.js')(sequelize, Sequelize);
db.USERS = require('../models/USERS.js')(sequelize, Sequelize);

///////////////////////////////////ASSOCIATIONS///////////////////////////////////////

//DRUG_COMPANIES

//DRUGS

//FORM_OF_DRUGS

//GENERAL_DRUG_TYPE_GROUPS

//PATIENTS
db.PATIENTS.hasMany(db.USER_POSTS,{foreignKey: 'user_id', targetKey: 'user_id'});

//PHOTOS

//PRESCRIPTION_TYPE

//RELATIONSHIPS
db.RELATIONSHIPS.belongsTo(db.USERS, {foreignKey: 'active_user_id', targetKey: 'user_id'});
db.RELATIONSHIPS.belongsTo(db.USERS, {foreignKey: 'passive_user_id', targetKey: 'user_id'});

//RELATIONSHIP_STATUS

//TYPES_OF_DRUGS

//USERS
db.USERS.hasMany(db.RELATIONSHIPS, {foreignKey: 'active_user_id', targetKey: 'user_id'});
db.USERS.hasMany(db.RELATIONSHIPS, {foreignKey: 'passive_user_id', targetKey: 'user_id'});
db.USERS.hasMany(db.USER_POSTS,{foreignKey: 'user_id', targetKey: 'user_id'});
db.USERS.hasMany(db.PATIENTS,{foreignKey: 'user_id', targetKey: 'user_id'});
db.USERS.belongsTo(db.USER_TYPES, {foreignKey: 'user_type_id', targetKey: 'user_type_id'});

//USER_POSTS
db.USER_POSTS.belongsTo(db.USERS, {foreignKey: 'user_id', targetKey: 'user_id'});
db.USER_POSTS.belongsTo(db.PATIENTS, {foreignKey: 'user_id', targetKey: 'user_id'});

//USER_TYPES
db.USER_TYPES.hasMany(db.USERS, {foreignKey: 'user_type_id', targetKey: 'user_type_id'});

module.exports = db;
