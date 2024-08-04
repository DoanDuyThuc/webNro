const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('task_sub_template', {
    task_main_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    NAME: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    max_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1
    },
    notify: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    npc_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1
    },
    map: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'task_sub_template',
    timestamps: false,
    indexes: [
      {
        name: "task_main_id",
        using: "BTREE",
        fields: [
          { name: "task_main_id" },
        ]
      },
    ]
  });
};
