const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('item_shop', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tab_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    temp_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_new: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    is_sell: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    type_sell: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    icon_spec: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'item_shop',
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
        name: "tab_id",
        using: "BTREE",
        fields: [
          { name: "tab_id" },
        ]
      },
      {
        name: "temp_id",
        using: "BTREE",
        fields: [
          { name: "temp_id" },
        ]
      },
    ]
  });
};
