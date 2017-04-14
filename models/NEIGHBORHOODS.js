/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('NEIGHBORHOODS', {
        neighborhood_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        town_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        neighborhood_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zip_code: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, {
        tableName: 'NEIGHBORHOODS',
        underscored: true,
        timestamps: false
    });
};
