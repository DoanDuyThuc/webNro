const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const account = sequelize.define('account', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "username"
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    ban: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    point_post: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    last_post: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    last_time_login: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "2002-05-07 07:00:00"
    },
    last_time_logout: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "2002-05-07 07:00:00"
    },
    ip_address: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    thoi_vang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    server_login: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1
    },
    bd_player: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 1
    },
    is_gift_box: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    gift_time: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "0"
    },
    reward: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tongnap: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    coin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    vnd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'account',
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
      {
        name: "username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
    ]
  });

  account.associate = (models) => {
    account.hasMany(models.Forum, { foreignKey: 'accountId' });
  };

  return account;
};
