module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
        username: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        imagen: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        active: {
            type: DataTypes.BOOLEAN
        }

    });

    return User;

}