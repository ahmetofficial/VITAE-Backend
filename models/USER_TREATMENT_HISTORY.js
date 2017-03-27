// Developer: Ahmet Kaymak
// Date: 25.03.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('USER_TREATMENT_HISTORY', {
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
        treatment_start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        treatment_finish_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        treatment_effect_on_disease: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }, {
        tableName: 'USER_TREATMENT_HISTORY',
        underscored: true
    });
};
