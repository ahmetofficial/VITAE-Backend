// Developer: Ahmet Kaymak
// Date: 16.02.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('USERS', {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_type_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mail_activation: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        about_me: {
            type: DataTypes.STRING,
            allowNull: true
        },
        friend_count: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        is_official_user: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        },
        profile_picture_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        device_id: {
            type: DataTypes.STRING,
            allowNull: true,
            primaryKey: true
        },
        device_name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'USERS',
        underscored: true
    });
};
