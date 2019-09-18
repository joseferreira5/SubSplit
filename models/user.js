module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
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
            allowNull: false,
            validate: { isEmail: true }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [8] }
        },
    });

    User.associate = function(models) {
        User.hasMany(models.Invites, {
            as: 'Invites'
        });

        User.belongsToMany(models.Service, {
            as: 'Services',
            through: models.UserService,
        });
    };

    return User;
};