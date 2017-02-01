// Developer: Ahmet Kaymak
// Date: 01.02.2017

module.exports = function(sequelize, DataTypes) {
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
      allowNull: false,
        classMethods: {
            associate: function(models) {
                DRUGS.belongsTo(models.TYPES_OF_DRUGS);
            }
        }
    },
    prescription_type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
        classMethods: {
            associate: function(models) {
                DRUGS.belongsTo(models.PRESCRIPTION_TYPE);
            }
        }
    },
    form_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
        classMethods: {
            associate: function(models) {
                DRUGS.belongsTo(models.FORM_OF_DRUGS);
            }
        }
    },
    company_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
        classMethods: {
            associate: function(models) {
                DRUGS.belongsTo(models.DRUG_COMPANIES);
            }
        }
    },
    general_descriptions: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'DRUGS'
  });
};
