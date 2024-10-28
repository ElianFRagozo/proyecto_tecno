'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('experiencia_laboral', 'fecha_fin', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null, // Permite valores nulos si la fecha de finalización no está definida.
      description: 'Fecha de finalización del cargo',
    });
    await queryInterface.addColumn('experiencia_laboral', 'actualmente', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      description: 'Indica si el usuario sigue en el cargo actualmente',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('experiencia_laboral', 'fecha_fin');
    await queryInterface.removeColumn('experiencia_laboral', 'actualmente');
  }
};
