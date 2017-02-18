/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('USER_TYPES', {
        user_type_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        user_type_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'USER_TYPES',
        timestamps: false
    });
};
