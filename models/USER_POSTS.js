// Developer: Ahmet Kaymak
// Date: 18.02.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('USER_POSTS', {
        post_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'USER_POSTS',
        underscored: true
    }, {
        classMethods: {
            associate: function (models) {
                models.USER_POSTS.belongsTo(models.USERS, {foreignKey: 'user_id', targetKey: 'user_id'});
            }
        }
    });
};
