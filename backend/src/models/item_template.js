const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('item_template', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TYPE: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gender: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    NAME: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    icon_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    part: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_up_to_up: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    power_require: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gold: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    gem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    head: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1
    },
    body: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1
    },
    leg: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1
    }
  }, {
    sequelize,
    tableName: 'item_template',
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
