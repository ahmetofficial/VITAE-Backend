/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TYPES_OF_DRUGS', {
    type_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
        classMethods: {
            associate: function(models) {
                TYPES_OF_DRUGS.hasMany(models.DRUGS);
            }
        }
    },
    type_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    general_type_id: {
      type: DataTypes.STRING,
      allowNull: false,
        classMethods: {
            associate: function(models) {
                GENERAL_DRUG_TYPE_GROUPS.belongsTo(models.TYPES_OF_DRUGS);
            }
        }
    }
  }, {
    tableName: 'TYPES_OF_DRUGS'
  });
};
