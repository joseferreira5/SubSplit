module.exports = function (sequelize, DataTypes) {
  const Service = sequelize.define("Service", {
    name: DataTypes.STRING,
    basePrice: DataTypes.FLOAT,
    premiumPrice: DataTypes.FLOAT
  });

  Service.associate = function (models) {
    Service.belongsToMany(models.User, {
      as: 'User',
      through: models.UserService
    });
  };

  return Service;
};