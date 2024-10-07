const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

const Usuarios = sequelize.define('Usuarios', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['empresa', 'freelancer']],
    },
  },
  documento_identidad: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  localizacion: {
    type: DataTypes.STRING,
  },
  lugar_servicio: {
    type: DataTypes.STRING,
  },
  disponibilidad: {
    type: DataTypes.STRING,
  },
  moneda_deseada: {
    type: DataTypes.STRING,
  },
  rango_salarial_min: {
    type: DataTypes.INTEGER,
  },
  rango_salarial_max: {
    type: DataTypes.INTEGER,
  },
  primer_nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  segundo_nombre: {
    type: DataTypes.STRING,
  },
  primer_apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  segundo_apellido: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'usuarios',
  timestamps: false,
});

module.exports = Usuarios;
