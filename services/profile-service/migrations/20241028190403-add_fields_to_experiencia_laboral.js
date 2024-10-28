'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('experiencia_laboral', 'nombre_empresa', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Sin especificar', // Valor por defecto para registros existentes
      description: 'Nombre de la empresa',
    });
    await queryInterface.addColumn('experiencia_laboral', 'cargo', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Sin especificar', 
      description: 'Cargo desempeñado',
    });
    await queryInterface.addColumn('experiencia_laboral', 'otro_cargo', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'Sin especificar', 
      description: 'Otro cargo no listado',
    });
    await queryInterface.addColumn('experiencia_laboral', 'fecha_inicio', {
      type: Sequelize.DATE,
      allowNull: true,
      description: 'Fecha de inicio del cargo',
    });

    // Luego, actualiza todos los registros con fecha_inicio null
    await queryInterface.sequelize.query(`
      UPDATE experiencia_laboral
      SET fecha_inicio = NOW()
      WHERE fecha_inicio IS NULL;
    `);

    // Finalmente, cambia la columna para que no permita valores nulos
    await queryInterface.changeColumn('experiencia_laboral', 'fecha_inicio', {
      type: Sequelize.DATE,
      allowNull: false,
    });
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
