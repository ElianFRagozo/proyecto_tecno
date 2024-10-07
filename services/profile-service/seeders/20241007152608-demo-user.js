'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [{
      user_type: 'empresa',
      documento_identidad: '123456789',
      correo: 'empresa@example.com',
      localizacion: 'Valledupar',
      lugar_servicio: 'Oficina',
      disponibilidad: 'Tiempo completo',
      moneda_deseada: 'COP',
      rango_salarial_min: 5000000,
      rango_salarial_max: 10000000,
      primer_nombre: 'Juan',
      segundo_nombre: 'Carlos',
      primer_apellido: 'Pérez',
      segundo_apellido: 'González',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
