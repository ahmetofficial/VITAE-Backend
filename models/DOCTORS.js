// Developer: Ahmet Kaymak
// Date: 20.02.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('DOCTORS', {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        gender: {
            type: DataTypes.INTEGER(2),
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
        is_verified:{
            type: DataTypes.INTEGER(1),
            allowNull: false
        }
    }, {
        tableName: 'DOCTORS',
        underscored: true,
        timestamps: false
    });
};
