const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

const Estudio = sequelize.define('Estudio', {
    estudio_id: {
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
    nivel_estudio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    institucion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ano_inicio: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    ano_fin: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    titulo_obtenido: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'estudios',
    timestamps: false
});

module.exports = Estudio;
