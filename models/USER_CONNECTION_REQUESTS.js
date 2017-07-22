// Developer: Ahmet Kaymak
// Date: 18.02.2017

'use strict';

var db= require('./index');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('USER_CONNECTION_REQUESTS', {
        active_user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        passive_user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        }
    }, {
        tableName: 'USER_CONNECTION_REQUESTS',
        underscored: true
    });
};
