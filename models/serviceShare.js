module.exports = function (sequelize, DataTypes) {
    const ServiceShare = sequelize.define('serviceShare', {
        invitorId: DataTypes.INTEGER,
        inviteeId: DataTypes.INTEGER,
        serviceId: DataTypes.INTEGER,
    });
  
    return ServiceShare;
  };