module.exports = function (sequelize, DataTypes) {
    const Invites = sequelize.define('invites', {
        token: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true }
        },
        // make sure this is a comma-separated list like: 1,2,3,4
        serviceIds: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    return Invites;
};