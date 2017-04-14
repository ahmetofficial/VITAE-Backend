/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('CITIES', {
        city_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        state_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        city_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'CITIES',
        underscored: true,
        timestamps: false
    });
};
