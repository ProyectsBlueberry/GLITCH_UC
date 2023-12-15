'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {

      await queryInterface.bulkInsert('users', [
         {
            name: 'Cesar',
            email: 'cesarblueberry1@gmail.com',
            password: await bcrypt.hash('Pa$$w0rd', saltRounds),
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            name: 'Sebastian',
            email: 'sebastianblueberry1@gmail.com',
            password: await bcrypt.hash('Pa$$w0rd', saltRounds),
            createdAt: new Date(),
            updatedAt: new Date(),
         },
      ], {});


      await queryInterface.bulkInsert('academic_levels', [
         {
            id: 1,
            level: 'Bachillerato',
            id_user: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: 2,
            level: 'Licenciaturas',
            id_user: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: 3,
            level: 'Lic. Ejecutivas',
            id_user: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: 4,
            level: 'Diplomados',
            id_user: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: 5,
            level: 'Posgrados',
            id_user: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
         },
      ]);
      await queryInterface.bulkInsert('Categories', [
         {
            id_level: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id_level: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id_level: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id_level: 4,
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id_level: 5,
            createdAt: new Date(),
            updatedAt: new Date(),
         },
      ]);
      await queryInterface.bulkInsert('indices', [
         {

            title_regular: 'Nullam maximus lacus eget mi volutpat',
            title_bold: 'Nullam maximus lacus eget mi volutpat',
            video_loop: 'Nullam maximus lacus eget mi volutpat',
            about_us: '<p>Texto de ejemplo</p>',
            scholarships: '<p>Texto de ejemplo</p>',
            id_user: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
         }
      ]);

   },


   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete('users', null, {});
      await queryInterface.bulkDelete('academic_levels', null, {});
      await queryInterface.bulkDelete('categories', null, {});
      await queryInterface.bulkDelete('indices', null, {});
   }
};