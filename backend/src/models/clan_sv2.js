const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clan_sv2', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NAME: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    slogan: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    img_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    power_point: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    max_member: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 10
    },
    clan_point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    LEVEL: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    members: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'clan_sv2',
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
