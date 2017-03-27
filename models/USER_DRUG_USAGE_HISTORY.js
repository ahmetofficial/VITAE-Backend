// Developer: Ahmet Kaymak
// Date: 25.03.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('USER_DRUG_USAGE_HISTORY', {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        disease_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        treatment_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        drug_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        drug_usage_start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        drug_usage_finish_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        drug_effect_on_disease: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, {
        tableName: 'USER_DRUG_USAGE_HISTORY',
        underscored: true
    });
};
