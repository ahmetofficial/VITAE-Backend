// Developer: Ahmet Kaymak
// Date: 20.02.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('USER_RELATIONSHIP_STATUS', {
        relationship_status_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        relationship_status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'USER_RELATIONSHIP_STATUS',
        underscored: true,
        timestamps: false
    });
};
