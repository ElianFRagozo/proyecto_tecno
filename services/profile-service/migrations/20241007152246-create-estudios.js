'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('estudios', {
      estudio_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nivel_estudio: {
        type: Sequelize.STRING,
        allowNull: false
      },
      institucion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ano_inicio: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      ano_fin: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      titulo_obtenido: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('estudios');
  }
};
