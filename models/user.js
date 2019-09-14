module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("Users", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [1] }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [1] }
        },
        email: {
            type: DataTypes.STRING,
            validate: { isEmail: true }
        },
        password: {
            type: DataTypes.STRING,
            validate: { len: [8] }
        },
    });

    User.associate = function(models) {
        User.belongsTo(models.User, {
            as: 'primary'
        });
    };

    return User;
};