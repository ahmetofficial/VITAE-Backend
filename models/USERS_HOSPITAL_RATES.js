// Developer: Ahmet Kaymak
// Date: 24.05.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('USERS_HOSPITAL_RATES', {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        hospital_id: {
            type: DataTypes.INTEGER(11),
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
        tableName: 'USER_HOSPITAL_RATES',
        underscored: true
    });
};
