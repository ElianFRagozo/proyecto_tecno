'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['empresa', 'freelancer']]
        }
      },
      documento_identidad: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      correo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      localizacion: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lugar_servicio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      disponibilidad: {
        type: Sequelize.STRING,
        allowNull: true
      },
      moneda_deseada: {
        type: Sequelize.STRING,
        allowNull: true
      },
      rango_salarial_min: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      rango_salarial_max: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      primer_nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      segundo_nombre: {
        type: Sequelize.STRING,
        allowNull: true
      },
      primer_apellido: {
        type: Sequelize.STRING,
        allowNull: false
      },
      segundo_apellido: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};
