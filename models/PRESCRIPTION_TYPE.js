// Developer: Ahmet Kaymak
// Date: 01.02.2017

'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PRESCRIPTION_TYPE', {
    prescription_type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
        autoIncrement: true,
        classMethods: {
            associate: function(models) {
                PRESCRIPTION_TYPE.hasMany(models.DRUGS);
            }
        }
    },
    prescription_type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'PRESCRIPTION_TYPE',
      timestamps: false
  });
};
