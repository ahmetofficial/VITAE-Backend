// Developer: Ahmet Kaymak
// Date: 25.03.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('DRUG_USAGE_GAP_PERIODS', {
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
        drug_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        drug_usage_gap_start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        drug_usage_gap_finish_date: {
            type: DataTypes.DATE,
            allowNull: false,
            primaryKey: true
        }
    }, {
        tableName: 'DRUG_USAGE_GAP_PERIODS',
        underscored: true
    });
};
