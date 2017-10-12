// Developer: Ahmet Kaymak
// Date: 12.10.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('USER_LOCATION', {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        latitude: {
            type: DataTypes.STRING,
            allowNull: false
        },
        longitude: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'USER_LOCATION',
        underscored: true
    });
};
