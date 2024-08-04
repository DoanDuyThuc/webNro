const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('small_version', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    x1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    x2: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    x3: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    x4: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'small_version',
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
