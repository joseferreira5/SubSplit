module.exports = function (sequelize, DataTypes) {
    const ServiceShare = sequelize.define('ServiceShare', {
        invitorId: DataTypes.INTEGER,
        inviteeId: DataTypes.INTEGER,
        serviceId: DataTypes.INTEGER,
    });
  
    return ServiceShare;
  };