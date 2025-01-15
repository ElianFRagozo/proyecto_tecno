const express = require('express');
const cors = require('cors');
const profileRoutes = require('./routes/profileRoutes');
const { connectDB } = require('./config/db'); 

require('dotenv').config();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 4003;

// Configurar CORS para permitir solicitudes desde cualquier origen
app.use(cors({
    origin: '*', // Permitir cualquier origen. Para mayor seguridad, especifica el dominio permitido.
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/profiles', profileRoutes);

connectDB();

// Configuración de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Empresa Service API',
            version: '1.0.0',
            description: 'API para la gestión de perfiles',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Ubicación de las rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
