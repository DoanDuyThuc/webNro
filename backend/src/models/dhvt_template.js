const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dhvt_template', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cup: {
      type: DataTypes.STRING(999),
      allowNull: false,
      defaultValue: "0"
    },
    time: {
      type: DataTypes.STRING(999),
      allowNull: false,
      defaultValue: "0"
    },
    gem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    gold: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    min_start: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    min_limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'dhvt_template',
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
