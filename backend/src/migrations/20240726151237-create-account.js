'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('account', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ban: {
        defaultValue: 0,
        allowNull: false,
        type: Sequelize.SMALLINT
      },
      point_post: {
        defaultValue: 0,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      last_post: {
        defaultValue: 0,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      role: {
        defaultValue: -1,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      is_admin: {
        defaultValue: 0,
        allowNull: false,
        type: Sequelize.TINYINT(1)
      },
      last_time_login: {
        allowNull: false,
        type: Sequelize.DATE
      },
      last_time_logout: {
        allowNull: false,
        type: Sequelize.DATE
      },
      ip_address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      active: {
        defaultValue: 0,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      thoi_vang: {
        defaultValue: 0,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      server_login: {
        defaultValue: -1,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      bd_player: {
        defaultValue: 1,
        type: Sequelize.DOUBLE
      },
      is_gift_box: {
        defaultValue: 0,
        type: Sequelize.TINYINT(1)
      },
      gift_time: {
        defaultValue: 0,
        type: Sequelize.STRING
      },
      reward: {
        type: Sequelize.TEXT('long')
      },
      tongnap: {
        defaultValue: 0,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      coin: {
        defaultValue: 0,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      vnd: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('account');
  }
};