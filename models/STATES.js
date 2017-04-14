/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('STATES', {
        state_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        country_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        state_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_code: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, {
        tableName: 'STATES',
        underscored: true,
        timestamps: false
    });
};
