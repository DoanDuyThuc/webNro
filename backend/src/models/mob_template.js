const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mob_template', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TYPE: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    NAME: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    range_move: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    speed: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    dart_type: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    percent_dame: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 5
    },
    percent_tiem_nang: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 50
    }
  }, {
    sequelize,
    tableName: 'mob_template',
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
