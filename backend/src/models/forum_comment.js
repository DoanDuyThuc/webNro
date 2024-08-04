'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class forum_comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      forum_comment.belongsTo(models.Forum, { foreignKey: 'forumId' });

    }
  }
  forum_comment.init({
    name: DataTypes.STRING,
    avartar: DataTypes.STRING,
    content: DataTypes.STRING,
    forumId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'forum_comment',
  });
  return forum_comment;
};