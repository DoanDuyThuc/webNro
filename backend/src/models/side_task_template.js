const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('side_task_template', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NAME: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    max_count_lv1: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    max_count_lv2: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    max_count_lv3: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    max_count_lv4: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    max_count_lv5: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'side_task_template',
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
