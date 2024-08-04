const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('history_receive_goldbar', {
    player_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    player_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    gold_before_receive: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gold_after_receive: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gold_bag_before: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gold_bag_after: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gold_box_before: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gold_box_after: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    time_receive: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'history_receive_goldbar',
    timestamps: false,
    indexes: [
      {
        name: "player_id",
        using: "BTREE",
        fields: [
          { name: "player_id" },
        ]
      },
    ]
  });
};
