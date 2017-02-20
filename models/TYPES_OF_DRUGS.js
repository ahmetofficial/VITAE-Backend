/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('TYPES_OF_DRUGS', {
        type_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        type_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        general_type_id: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'TYPES_OF_DRUGS',
        underscored: true
    });
};
