// Developer: Ahmet Kaymak
// Date: 25.03.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('DISEASES', {
        disease_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        disease_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        disease_reason_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        incubation_period_in_days: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        is_chronic: {
            type: DataTypes.INTEGER(1),
            allowNull: true
        },
        gender_factor: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rate_of_appearance: {
            type: "DOUBLE(10,5)",
            allowNull: true
        },
        body_system_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        organ_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, {
        tableName: 'DISEASES',
        underscored: true,
        timestamps: false
    });
};
