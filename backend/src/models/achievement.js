const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('achievement', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    info1: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    info2: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    count_purpose: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gem: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'achievement',
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
