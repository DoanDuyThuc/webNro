'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Forum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Forum.belongsTo(models.account, { foreignKey: 'accountId' });
      Forum.hasMany(models.forum_comment, { foreignKey: 'forumId' });
    }
  }
  Forum.init({
    name: DataTypes.STRING,
    avartar: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    accountId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Forum',
  });
  return Forum;
};