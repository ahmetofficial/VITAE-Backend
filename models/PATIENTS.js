// Developer: Ahmet Kaymak
// Date: 20.02.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('PATIENTS', {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        blood_type_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: false
        },
        relationship_status_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, {
        tableName: 'PATIENTS',
        underscored: true,
        timestamps: false
    });
};