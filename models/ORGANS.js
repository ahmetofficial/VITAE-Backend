// Developer: Ahmet Kaymak
// Date: 25.03.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ORGANS', {
        organ_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        organ_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body_system_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, {
        tableName: 'ORGANS',
        underscored: true,
        timestamps: false
    });
};
