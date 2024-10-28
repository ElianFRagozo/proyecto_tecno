const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

const ExperienciaLaboral = sequelize.define('ExperienciaLaboral', {
    experiencia_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuarios',
            key: 'user_id'
        },
        allowNull: false
    },
    nombre_empresa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cargo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      otro_cargo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fecha_fin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      actualmente: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    funciones_responsabilidades: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    logros: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'experiencia_laboral',
    timestamps: false
});

module.exports = ExperienciaLaboral;
