const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Ajusta el path si es necesario

const Empresa = sequelize.define("Empresa", {
  razonSocial: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "Razón social de la empresa",
  },
  nit: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "NIT de la empresa",
  },
  sector: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "Sector económico al que pertenece la empresa",
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "Teléfono de contacto de la empresa",
  },
}, {
  timestamps: true, // Agrega `createdAt` y `updatedAt`
  tableName: "empresas", // Nombre de la tabla en la base de datos
});

module.exports = Empresa;
