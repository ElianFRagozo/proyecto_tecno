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
