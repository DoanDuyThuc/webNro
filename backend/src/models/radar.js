const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('radar', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    iconId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    rank: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    max: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 60
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    template: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    body: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: "[]"
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: ""
    },
    info: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      defaultValue: ""
    },
    options: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      defaultValue: "[]"
    },
    require: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: -1
    },
    require_level: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    aura_id: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: -1
    }
  }, {
    sequelize,
    tableName: 'radar',
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
