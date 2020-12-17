const sequelize = require("../db");

module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('message', {
        info: {
            type: DataTypes.STRING
        }, 

        urgency: {
            type: DataTypes.STRING
        }, 
        
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Message;
};
