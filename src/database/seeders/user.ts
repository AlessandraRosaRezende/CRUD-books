import { QueryInterface } from 'sequelize'; 

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@admin.com',
        password: 'senhasecretadoadmin',
        name: 'Administrador',
        role: 'admin'
      },
      {
        email: 'user@user.com',
        password: '123456',
        name: 'Usuário',
        role: 'user'
      }
    ], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('users', {});
  },
};