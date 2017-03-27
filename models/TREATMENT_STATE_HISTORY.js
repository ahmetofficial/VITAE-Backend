// Developer: Ahmet Kaymak
// Date: 25.03.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('TREATMENT_STATE_HISTORY', {
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
        treatment_state_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        treatment_state_start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        treatment_state_finish_date: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'TREATMENT_STATE_HISTORY',
        underscored: true
    });
};
