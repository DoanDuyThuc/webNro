'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Kiểm tra và loại bỏ constraint hiện tại nếu tồn tại
    const [results] = await queryInterface.sequelize.query(`
      SELECT CONSTRAINT_NAME
      FROM information_schema.KEY_COLUMN_USAGE
      WHERE TABLE_NAME = 'forum_comment' AND COLUMN_NAME = 'forumId' AND CONSTRAINT_SCHEMA = DATABASE()
    `);

    if (results.length > 0) {
      await queryInterface.removeConstraint('forum_comment', results[0].CONSTRAINT_NAME);
    }

    // Thêm constraint mới với ON DELETE CASCADE
    await queryInterface.addConstraint('forum_comment', {
      fields: ['forumId'],
      type: 'foreign key',
      name: 'forum_comment_forumId_fkey',
      references: {
        table: 'forum',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    const [results] = await queryInterface.sequelize.query(`
      SELECT CONSTRAINT_NAME
      FROM information_schema.KEY_COLUMN_USAGE
      WHERE TABLE_NAME = 'forum_comment' AND COLUMN_NAME = 'forumId' AND CONSTRAINT_SCHEMA = DATABASE()
    `);

    if (results.length > 0) {
      await queryInterface.removeConstraint('forum_comment', results[0].CONSTRAINT_NAME);
    }

    // Thêm lại constraint cũ nếu cần (ở đây giả sử là NO ACTION)
    await queryInterface.addConstraint('forum_comment', {
      fields: ['forumId'],
      type: 'foreign key',
      name: 'forum_comment_forumId_fkey',
      references: {
        table: 'forum',
        field: 'id',
      },
      onDelete: 'NO ACTION',
    });
  }
};
