/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('TOWNS', {
        town_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        city_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        town_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'TOWNS',
        underscored: true,
        timestamps: false
    });
};
