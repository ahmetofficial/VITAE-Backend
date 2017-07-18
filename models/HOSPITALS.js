/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('HOSPITALS', {
        hospital_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },hospital_user_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hospital_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hospital_type: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        establishement_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        total_score: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        total_vote_number: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        overall_score: {
            type: "DOUBLE(10,5)",
            allowNull: false
        },
        is_active: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        },
        website: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: true
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: true
        },
        latitude: {
            type: DataTypes.STRING,
            allowNull: true
        },longitude: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'HOSPITALS',
        underscored: true
    });
};
