const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://user:password@localhost:5432/database');

const Empresa = sequelize.define('Empresa', {
  razonSocial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sector: {
    type: DataTypes.STRING,
  },
  telefono: {
    type: DataTypes.STRING,
  },
});

module.exports = { Empresa, sequelize };
