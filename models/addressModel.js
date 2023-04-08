module.exports = (sequelize, DataTypes) => {

    const Address = sequelize.define("address", {
        type: {
            type: DataTypes.STRING
        },
        line1: {
            type: DataTypes.STRING
        },
        line2: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        zip: {
            type: DataTypes.STRING
        }

    });

    return Address;

}