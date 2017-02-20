// Developer: Ahmet Kaymak
// Date: 01.02.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('DRUGS', {
        drug_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        commercial_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        chemical_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        type_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prescription_type_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        form_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        company_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        general_descriptions: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'DRUGS',
        underscored: true
    });
};
