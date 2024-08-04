const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shop', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    npc_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'npc_template',
        key: 'id'
      }
    },
    tag_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    type_shop: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'shop',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "npc_id",
        using: "BTREE",
        fields: [
          { name: "npc_id" },
        ]
      },
    ]
  });
};
