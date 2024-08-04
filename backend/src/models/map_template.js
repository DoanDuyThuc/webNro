const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('map_template', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NAME: {
      type: DataTypes.STRING(55),
      allowNull: false
    },
    zones: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    max_player: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 15
    },
    data: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: "[]"
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    planet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    bg_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    tile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    bg_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    waypoints: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    mobs: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    npcs: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'map_template',
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
