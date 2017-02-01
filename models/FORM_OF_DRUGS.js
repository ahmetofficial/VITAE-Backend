// Developer: Ahmet Kaymak
// Date: 01.02.2017

'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FORM_OF_DRUGS', {
    form_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
        autoIncrement: true,
          classMethods: {
              associate: function(models) {
                  FORM_OF_DRUGS.hasMany(models.DRUGS);
              }
          }
    },
    form_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    form_description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'FORM_OF_DRUGS',
      timestamps: false
  });
};
