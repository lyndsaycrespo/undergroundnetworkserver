module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {

        username: {
            type: DataTypes.STRING, 
            allowNull: false, 
            unique: true
        }, 

        email: {
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        zip: {
            type: DataTypes.INTEGER,
            allowNull: true
        }, 

        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return User;
}