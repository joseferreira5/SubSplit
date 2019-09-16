module.exports = function (sequelize, DataTypes) {
  const Service = sequelize.define("service", {
    name: DataTypes.STRING,
    basePrice: DataTypes.FLOAT,
    premiumPrice: DataTypes.FLOAT
  });

  Service.associate = function (models) {
    Service.belongsToMany(models.users, {
      as: 'Users',
      through: models.userService
    });
  };

  return Service;
};