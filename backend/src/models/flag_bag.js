const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('flag_bag', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    icon_data: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    NAME: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "flag_bag"
    },
    gold: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1
    },
    gem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1
    },
    icon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'flag_bag',
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
