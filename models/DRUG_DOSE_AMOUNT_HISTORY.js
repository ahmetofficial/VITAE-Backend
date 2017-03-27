// Developer: Ahmet Kaymak
// Date: 25.03.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('DRUG_DOSE_AMOUNT_HISTORY', {
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
        drug_dose_in_miligrams: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        drug_dose_start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        drug_dose_finish_date: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'DRUG_DOSE_AMOUNT_HISTORY',
        underscored: true
    });
};
