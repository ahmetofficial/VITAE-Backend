// Developer: Ahmet Kaymak
// Date: 20.02.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('BLOOD_TYPES', {
        blood_type_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        blood_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rh_factor: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'BLOOD_TYPES',
        underscored: true,
        timestamps: false
    });
};
