const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

const HabilidadBlanda = sequelize.define('HabilidadBlanda', {
    habilidad_id: {
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
    habilidad: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'habilidades_blandas',
    timestamps: false
});

module.exports = HabilidadBlanda;
