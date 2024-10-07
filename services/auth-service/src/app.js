// src/app.js

require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const setupSwagger = require('./docs/swagger');

const app = express();
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Configurar Swagger solo en desarrollo
if (process.env.NODE_ENV !== 'production') {
    setupSwagger(app);
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Auth Service is running on port ${PORT}`);
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    }
});
