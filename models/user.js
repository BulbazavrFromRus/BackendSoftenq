'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Role,
          {
            through:'UserRoles',
            foreignKey: 'userId',
            as: 'roles'
          }
          )
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
      password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};