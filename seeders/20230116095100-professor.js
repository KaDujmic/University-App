'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('professor', [
      {
        id: '20c1297e-58f6-4587-842b-231ff6583086',
        full_name: 'John Doe',
        address: '1st Blvd',
        email: 'john@example.com',
        phone_number: '+385915969819',
        department_id: '1076625a-bcc5-49ea-b0e5-9ce3f8f0b2bf',
        password: 'test1234',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '805a10d7-1735-4a6c-a4cd-0be767aaeca1',
        full_name: 'Mike Smith',
        address: '4rd Blvd',
        email: 'mike@example.com',
        phone_number: '+3859159692323',
        department_id: 'fc8ea3f5-abe2-4b0c-8fb1-6a1da404f252',
        password: 'test1234',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {}
};
