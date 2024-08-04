const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('skill_template', {
    nclass_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'nclass',
        key: 'id'
      }
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NAME: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    max_point: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 7
    },
    mana_use_type: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TYPE: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    icon_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dam_info: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    slot: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    skills: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'skill_template',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nclass_id" },
          { name: "id" },
        ]
      },
    ]
  });
};
