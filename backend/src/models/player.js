const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('player', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: "account_id"
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    head: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 102
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    have_tennis_space_ship: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    clan_id_sv1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1
    },
    clan_id_sv2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1
    },
    data_inventory: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    data_location: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    data_point: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    data_magic_tree: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    items_body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    items_bag: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    items_box: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    items_box_lucky_round: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    friends: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    enemies: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    data_intrinsic: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    data_item_time: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    data_task: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    data_mabu_egg: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    data_charm: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    skills: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    skills_shortcut: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    pet: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    data_black_ball: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    data_side_task: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    violate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    pointPvp: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    NguHanhSonPoint: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    data_card: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    bill_data: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    data_item_time_sieu_cap: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "'[0,0,0,0,0]'"
    },
    data_goku_egg: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    data_ngokhong_egg: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    info_achievement: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    pointBoss: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    data_thienthan_egg: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    data_hacam_egg: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    pointKarin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    pointNroNamec: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    capChuyenSinh: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    last_time_dd: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    count_open_box: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    point_su_kien: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lvlThienSu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    point_cau_ca: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    data_clan_task: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'player',
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
        name: "account_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "account_id" },
        ]
      },
    ]
  });
};
