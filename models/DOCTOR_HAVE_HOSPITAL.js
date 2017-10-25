/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('DOCTOR_HAVE_HOSPITAL', {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        hospital_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        clinic_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }, {
        tableName: 'DOCTOR_HAVE_HOSPITAL',
        underscored: true
    });
};
