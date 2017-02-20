// Developer: Ahmet Kaymak
// Date: 01.02.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('GENERAL_DRUG_TYPE_GROUPS', {
        general_type_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        general_type_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'GENERAL_DRUG_TYPE_GROUPS',
        underscored: true,
        timestamps: false
    });
};
