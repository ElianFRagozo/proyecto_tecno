const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configura la conexión a la base de datos usando la URL de la base de datos desde las variables de entorno
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

// Prueba la conexión
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

// Exporta la conexión y la función de conexión
module.exports = { sequelize, connectDB };
