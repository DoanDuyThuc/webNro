const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('head_avatar', {
    head_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    avatar_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'head_avatar',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "head_id" },
        ]
      },
    ]
  });
};
