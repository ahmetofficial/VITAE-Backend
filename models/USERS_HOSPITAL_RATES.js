// Developer: Ahmet Kaymak
// Date: 24.05.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('USERS_HOSPITAL_RATES', {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_rate: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        hospital_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        clinic_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        user_comment: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'USERS_HOSPITAL_RATES',
        underscored: true
    });
};
