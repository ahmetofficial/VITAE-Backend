// Developer: Ahmet Kaymak
// Date: 25.03.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('TREATMENTS', {
        treatment_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        treatment_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avarage_period_in_days: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        body_system_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        organ_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        avarage_succes_rate: {
            type: "DOUBLE(10,5)",
            allowNull: true
        }
    }, {
        tableName: 'TREATMENTS',
        underscored: true,
        timestamps: false
    });
};
