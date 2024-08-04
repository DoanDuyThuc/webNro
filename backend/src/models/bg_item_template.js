const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bg_item_template', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    layer: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dx: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dy: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'bg_item_template',
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
    ]
  });
};
