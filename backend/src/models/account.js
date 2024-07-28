'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  account.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    ban: DataTypes.SMALLINT,
    point_post: DataTypes.INTEGER,
    last_post: DataTypes.INTEGER,
    role: DataTypes.INTEGER,
    is_admin: DataTypes.TINYINT(1),
    last_time_login: DataTypes.DATE,
    last_time_logout: DataTypes.DATE,
    ip_address: DataTypes.STRING,
    active: DataTypes.INTEGER,
    thoi_vang: DataTypes.INTEGER,
    server_login: DataTypes.INTEGER,
    bd_player: DataTypes.DOUBLE,
    is_gift_box: DataTypes.TINYINT(1),
    gift_time: DataTypes.STRING,
    reward: DataTypes.TEXT('long'),
    tongnap: DataTypes.INTEGER,
    coin: DataTypes.INTEGER,
    vnd: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'account',
  });
  return account;
};