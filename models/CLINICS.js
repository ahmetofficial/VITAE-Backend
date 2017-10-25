

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('CLINICS', {
        clinic_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        clinic_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'CLINICS',
        underscored: true,
        timestamps: false
    });
};
