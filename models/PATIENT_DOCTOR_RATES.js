// Developer: Ahmet Kaymak
// Date: 24.05.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('PATIENT_DOCTOR_RATES', {
        patient_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        doctor_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        disease_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        user_rate: {
            type: "DOUBLE(2,1)",
            allowNull: false
        },
        user_comment: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'PATIENT_DOCTOR_RATES',
        underscored: true
    });
};
