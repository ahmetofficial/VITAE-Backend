// Developer: Ahmet Kaymak
// Date: 18.02.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('MESSAGES', {
        conversation_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        sender_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        receiver_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        sender_ip: {
            type: DataTypes.STRING,
            allowNull: true
        },
        message_text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        message_active_for_sender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message_active_for_receiver: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'MESSAGES',
        underscored: true
    });
};
