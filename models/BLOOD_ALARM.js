// Developer: Ahmet Kaymak
// Date: 20.02.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('BLOOD_ALARM', {
        blood_alarm_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        blood_type_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        hospital_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        alarm_status: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        alarm_level: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        contact_number:{
            type: DataTypes.STRING,
            allowNull: true
        },
        alarm_result: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        user_review:{
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'BLOOD_ALARM',
        underscored: true
    });
};
