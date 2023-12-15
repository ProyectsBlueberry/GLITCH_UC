'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('our_graduates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      alt_image: {
        type: Sequelize.STRING
      },
      video: {
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
    await queryInterface.dropTable('our_graduates');
  }
};