const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('history_transaction', {
    player_1: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    player_2: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    item_player_1: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    item_player_2: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    bag_1_before_tran: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    bag_2_before_tran: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    bag_1_after_tran: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    bag_2_after_tran: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    time_tran: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'history_transaction',
    timestamps: false
  });
};
