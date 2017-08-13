// Developer: Ahmet Kaymak
// Date: 18.02.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('USER_POST_COMMENT', {
        post_comment_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        post_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_ip: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'USER_POST_COMMENT',
        underscored: true
    });
};
