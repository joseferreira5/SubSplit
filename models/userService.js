module.exports = function(sequelize, DataTypes) {
  const UserService = sequelize.define('UserService', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    priceSelected: DataTypes.STRING
  });

  return UserService;
};
