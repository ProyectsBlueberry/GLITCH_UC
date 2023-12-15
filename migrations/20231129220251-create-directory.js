"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("directories", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         id_user: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: "users",
               key: "id",
            },
         },
         prefix: {
            type: Sequelize.STRING,
            allowNull: true,
         },
         name: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         job: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         email: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         extension: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         public: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("directories");
   },
};
