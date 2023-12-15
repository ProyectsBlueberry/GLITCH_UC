'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('indices', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
         },
         id_user: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: "users",
               key: "id",
            },
         },
         title_regular: {
            type: Sequelize.STRING,
            allowNull: false
         },
         title_bold: {
            type: Sequelize.STRING,
            allowNull: false
         },
         video_loop: {
            type: Sequelize.STRING,
            allowNull: false
         },
         about_us: {
            type: Sequelize.TEXT,
            allowNull: false
         },
         scholarships: {
            type: Sequelize.TEXT,
            allowNull: false
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
      await queryInterface.dropTable('indices');
   }
};