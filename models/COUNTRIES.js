/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('COUNTRIES', {
        country_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        binary_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        triple_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_code: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, {
        tableName: 'COUNTRIES',
        underscored: true,
        timestamps: false
    });
};
