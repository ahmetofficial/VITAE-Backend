// Developer: Ahmet Kaymak
// Date: 25.03.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('PHOTOS', {
        photo_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location_path: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'PHOTOS',
        underscored: true
    });
};
