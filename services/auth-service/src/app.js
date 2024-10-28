// src/app.js

require('dotenv').config(); // Cargar variables de entorno desde el archivo .env
const express = require('express'); // Importar Express
const authRoutes = require('./routes/authRoutes'); // Importar las rutas de autenticación
const setupSwagger = require('./docs/swagger'); // Importar la configuración de Swagger
const { connectDB } = require('./config/db'); // Importar la función de conexión a la base de datos

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Configurar Swagger solo en desarrollo
if (process.env.NODE_ENV !== 'production') {
    setupSwagger(app); // Configurar Swagger para documentación de API
}

// Puerto de la aplicación
const PORT = process.env.PORT || 4000;

// Iniciar el servidor y conectar a la base de datos
const startServer = async () => {
    try {
        await connectDB(); // Probar la conexión a la base de datos
        app.listen(PORT, () => {
            console.log(`Auth Service is running on port ${PORT}`);
            if (process.env.NODE_ENV !== 'production') {
                console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
            }
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

startServer(); // Llamar a la función que inicia el servidor
