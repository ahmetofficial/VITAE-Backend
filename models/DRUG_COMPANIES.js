// Developer: Ahmet Kaymak
// Date: 01.02.2017

'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DRUG_COMPANIES', {
    company_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
        classMethods: {
            associate: function(models) {
              DRUG_COMPANIES.hasMany(models.DRUGS);
            }
        }
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'DRUG_COMPANIES'
  });
};
