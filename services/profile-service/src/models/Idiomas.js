const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

const Idioma = sequelize.define('Idioma', {
    idioma_id: {
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
    idioma: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nivel: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'idiomas',
    timestamps: false
});

module.exports = Idioma;
