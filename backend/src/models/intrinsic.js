const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('intrinsic', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NAME: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    param_from_1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    param_to_1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    param_from_2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    param_to_2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    icon: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    gender: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 3
    }
  }, {
    sequelize,
    tableName: 'intrinsic',
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
