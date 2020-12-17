const sequelize = require("../db");

module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('event', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }, 

        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        
        address: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        
        city: {
            type: DataTypes.STRING,
            allowNull: false
        }, 

        state: {
            type: DataTypes.STRING,
            allowNull: false
        }, 

        zip: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Event;
};
