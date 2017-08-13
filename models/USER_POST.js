// Developer: Ahmet Kaymak
// Date: 18.02.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('USER_POST', {
        post_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        like_count: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment_count: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_ip: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'USER_POST',
        underscored: true
    }, {
        classMethods: {
            associate: function (models) {
                models.USER_POST.belongsTo(models.USERS, {foreignKey: 'user_id', targetKey: 'user_id'});
            }
        }
    });
};
