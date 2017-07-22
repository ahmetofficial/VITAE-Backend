// Developer: Ahmet Kaymak
// Date: 18.02.2017

'use strict';

var db= require('./index');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('USER_CONNECTIONS', {
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
        tableName: 'USER_CONNECTIONS',
        underscored: true
    });
};
