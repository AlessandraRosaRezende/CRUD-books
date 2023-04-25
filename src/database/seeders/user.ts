import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@admin.com',
        password: 'senhasecretadoadmin',
        name: 'Administrador',
      },
      {
        email: 'user@user.com',
        password: '123456',
        name: 'Usuário',
      },
    ], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('users', {});
  },
};
