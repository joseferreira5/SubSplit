module.exports = function (sequelize, DataTypes) {
    const UserService = sequelize.define('UserService', {
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [1] }
        },
        priceSelected: DataTypes.STRING,
    });

    return UserService;
};