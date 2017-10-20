// Developer: Ahmet Kaymak
// Date: 18.02.2017

'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('MESSAGE_CONVERSATION', {
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
        sender_ip: {
            type: DataTypes.STRING,
            allowNull: true
        },
        conversation_active_for_sender: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        conversation_active_for_receiver: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'MESSAGE_CONVERSATION',
        underscored: true
    });
};
