'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('generals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      duration: {
        allowNull: true,
        type: Sequelize.STRING
      },
      mode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      start: {
        allowNull: false,
        type: Sequelize.DATE
      },
      banner: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pdf: {
        allowNull: false,
        type: Sequelize.STRING
      },
      RVOE: {
        allowNull: false,
        type: Sequelize.STRING
      },
      id_offer:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
           model: "academic_offers",
           key: "id",
        }, onDelete:'CASCADE'
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
    await queryInterface.dropTable('generals');
  }
};