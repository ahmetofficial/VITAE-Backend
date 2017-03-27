// Developer: Ahmet Kaymak
// Date: 25.03.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('TREATMENT_GAP_PERIODS', {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        disease_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        treatment_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        gap_start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        gap_finish_date: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'TREATMENT_GAP_PERIODS',
        underscored: true
    });
};
