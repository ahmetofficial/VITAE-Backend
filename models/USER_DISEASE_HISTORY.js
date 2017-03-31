// Developer: Ahmet Kaymak
// Date: 25.03.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('USER_DISEASE_HISTORY', {
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
        disease_start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        disease_finish_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        disease_level_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        disease_state_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        count_of_treatments: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        count_of_drugs: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, {
        tableName: 'USER_DISEASE_HISTORY',
        underscored: true
    });
};
