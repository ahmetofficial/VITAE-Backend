// Developer: Ahmet Kaymak
// Date: 18.02.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('RELATIONSHIPS', {
        active_user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        passive_user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        status_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, {
        tableName: 'RELATIONSHIPS',
        underscored: true
    }, {
        classMethods: {
            associate: function (models) {
                models.RELATIONSHIPS.hasMany(models.USERS, {foreignKey: 'active_user_id', targetKey: 'user_id'});
                models.RELATIONSHIPS.hasMany(models.USERS, {foreignKey: 'passive_user_id', targetKey: 'user_id'});
            }
        }
    });
};
