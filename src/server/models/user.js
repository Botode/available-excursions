const { Model } = require('sequelize');

/**
 * email
 * password
 */

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        field: 'email',
      },
      password: {
        type: DataTypes.STRING,
        field: 'password',
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
