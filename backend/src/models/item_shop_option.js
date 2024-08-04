const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('item_shop_option', {
    item_shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'item_shop',
        key: 'id'
      }
    },
    option_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'item_option_template',
        key: 'id'
      }
    },
    param: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'item_shop_option',
    timestamps: false,
    indexes: [
      {
        name: "item_shop_id",
        using: "BTREE",
        fields: [
          { name: "item_shop_id" },
        ]
      },
      {
        name: "option_id",
        using: "BTREE",
        fields: [
          { name: "option_id" },
        ]
      },
    ]
  });
};
