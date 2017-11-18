// Developer: Ahmet Kaymak
// Date: 20.02.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('PATIENTS', {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        gender: {
            type: DataTypes.INTEGER(2),
            allowNull: false
        },
        blood_type_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: false
        },
        is_blood_alarm_notification_open: {
            type: DataTypes.INTEGER(2),
            allowNull: false
        },
        is_similar_patient_search_open: {
            type: DataTypes.INTEGER(2),
            allowNull: false
        }
    }, {
        tableName: 'PATIENTS',
        underscored: true,
        timestamps: false
    });
};
