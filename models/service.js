module.exports = function(sequelize, DataTypes) {
    const Service = sequelize.define("service", {
      serviceName: DataTypes.STRING,
      basePrice: DataTypes.STRING,
      premiumPrice: DataTypes.STRING
    });

    Service.associate = function(models) {
        Service.belongsToMany(models.User, { 
            through: UserService 
        });
    };  

    return Service;
  };